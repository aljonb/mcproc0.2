import { ALL_MEDICAL_ITEMS, MedicalItem } from './data';

// Normalize text for matching
export function normalizeText(text: string): string {
  let normalized = text
    .toLowerCase()
    .replace(/\s+/g, ' ') // collapse whitespace
    .replace(/[^\w\s\/+\-]/g, '') // keep only alphanumeric, spaces, and medical chars
    .trim();
  
  // Expand common medical abbreviations to improve matching
  normalized = normalized
    .replace(/\bcontr\b/g, 'contrast')     // contr. -> contrast
    .replace(/\bw\b/g, 'with')             // w/ -> with (but not w/o)
    .replace(/\bwo\b/g, 'without')         // w/o -> without
    .replace(/\bwwo\b/g, 'wwithout')       // w/w/o intermediate step
    .replace(/\bwwithout\b/g, 'with without'); // w/w/o -> with without
  
  return normalized;
}

// Check if a text contains a medical item (provider or procedure)
// Returns the longest/most specific match to handle cases where multiple items match
export function findMedicalItem(text: string): MedicalItem | null {
  const normalizedText = normalizeText(text);
  let bestMatch: { item: MedicalItem, length: number } | null = null;
  
  for (const item of ALL_MEDICAL_ITEMS) {
    for (const variation of item.variations) {
      const normalizedVariation = normalizeText(variation);
      if (normalizedText.includes(normalizedVariation)) {
        // Keep track of the longest match
        if (!bestMatch || normalizedVariation.length > bestMatch.length) {
          bestMatch = { item, length: normalizedVariation.length };
        }
      }
    }
    
    // Special handling for EMG Upper/Lower - check if key terms exist even with text in between
    if (item.canonical === "EMG Upper") {
      if (normalizedText.includes("emg") && normalizedText.includes("upper")) {
        const matchLength = "emg upper".length;
        if (!bestMatch || matchLength > bestMatch.length) {
          bestMatch = { item, length: matchLength };
        }
      }
      if (normalizedText.includes("nerve conduction") && normalizedText.includes("upper")) {
        const matchLength = "nerve conduction upper".length;
        if (!bestMatch || matchLength > bestMatch.length) {
          bestMatch = { item, length: matchLength };
        }
      }
    }
    
    if (item.canonical === "EMG Lower") {
      if (normalizedText.includes("emg") && normalizedText.includes("lower")) {
        const matchLength = "emg lower".length;
        if (!bestMatch || matchLength > bestMatch.length) {
          bestMatch = { item, length: matchLength };
        }
      }
      if (normalizedText.includes("nerve conduction") && normalizedText.includes("lower")) {
        const matchLength = "nerve conduction lower".length;
        if (!bestMatch || matchLength > bestMatch.length) {
          bestMatch = { item, length: matchLength };
        }
      }
    }
  }
  
  return bestMatch?.item || null;
}

// Parse date from text (handles various formats)
export function parseDate(dateStr: string): Date | null {
  try {
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date;
    }
  } catch {
    // ignore
  }
  return null;
}

// Check if an order is within 6 months or newer
export function isOrderRecent(orderDate: Date): boolean {
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  return orderDate >= sixMonthsAgo;
}

// Extract date from a line of text (looks for common date patterns)
export function extractDate(text: string): Date | null {
  // Common date patterns: MM/DD/YYYY, YYYY-MM-DD, MM-DD-YYYY, etc.
  const datePatterns = [
    /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/,  // MM/DD/YYYY or MM-DD-YYYY
    /(\d{4}[-/]\d{1,2}[-/]\d{1,2})/,    // YYYY-MM-DD or YYYY/MM/DD
    /(\d{1,2}[-/]\d{1,2}[-/]\d{2})/,    // MM/DD/YY
  ];
  
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      const date = parseDate(match[1]);
      if (date) return date;
    }
  }
  
  return null;
}

// Parse orders from text input
export interface Order {
  text: string;
  date: Date | null;
  medicalItem: MedicalItem | null;
  lineNumber: number;
}

export function parseOrders(input: string): Order[] {
  const lines = input.split('\n').filter(line => line.trim());
  const orders: Order[] = [];
  
  lines.forEach((line, index) => {
    const date = extractDate(line);
    const medicalItem = findMedicalItem(line);
    
    if (medicalItem) {
      orders.push({
        text: line.trim(),
        date,
        medicalItem,
        lineNumber: index + 1
      });
    }
  });
  
  return orders;
}

// Parse appointments from text input
export interface Appointment {
  text: string;
  medicalItem: MedicalItem | null;
  lineNumber: number;
}

export function parseAppointments(input: string): Appointment[] {
  const lines = input.split('\n').filter(line => line.trim());
  const appointments: Appointment[] = [];
  
  lines.forEach((line, index) => {
    const medicalItem = findMedicalItem(line);
    
    if (medicalItem) {
      appointments.push({
        text: line.trim(),
        medicalItem,
        lineNumber: index + 1
      });
    }
  });
  
  return appointments;
}

// Check if notes contain exclusion phrases for a medical item
export const EXCLUSION_PATTERNS = [
  'refused',
  'declined',
  'patient refused',
  'pt refused',
  'patient declined',
  'pt declined',
  'has own',
  'has their own',
  'outside',
  'established with',
  'established w/',
  'not candidate',
  'contraindicated',
  'already done',
  'completed',
  'done elsewhere',
  'done at outside',
  'seeing elsewhere',
  'seeing outside',
  'won\'t do',
  'will not do',
  'does not want',
  'doesn\'t want'
];

export function checkNotesForExclusion(notes: string, medicalItem: MedicalItem): boolean {
  const normalizedNotes = normalizeText(notes);
  const itemVariations = medicalItem.variations.map(v => normalizeText(v));
  
  // Check if notes mention this medical item
  const mentionsItem = itemVariations.some(variation => 
    normalizedNotes.includes(variation)
  );
  
  if (!mentionsItem) {
    return false; // Notes don't mention this item at all
  }
  
  // Check if any exclusion pattern appears near the medical item mention
  for (const pattern of EXCLUSION_PATTERNS) {
    const normalizedPattern = normalizeText(pattern);
    
    // Look for the pattern in proximity to any variation of the medical item
    for (const variation of itemVariations) {
      const itemIndex = normalizedNotes.indexOf(variation);
      if (itemIndex === -1) continue;
      
      // Check 100 chars before and after the item mention
      const contextStart = Math.max(0, itemIndex - 100);
      const contextEnd = Math.min(normalizedNotes.length, itemIndex + variation.length + 100);
      const context = normalizedNotes.substring(contextStart, contextEnd);
      
      if (context.includes(normalizedPattern)) {
        return true; // Found exclusion pattern near the item
      }
    }
  }
  
  return false;
}

// Main analysis function
export interface MissingProcedure {
  item: string;
  category: string;
  orderText: string;
  reason: string;
}

export function analyzeMissingProcedures(
  ordersInput: string,
  appointmentsInput: string,
  notesInput: string
): MissingProcedure[] {
  const orders = parseOrders(ordersInput);
  const appointments = parseAppointments(appointmentsInput);
  const missing: MissingProcedure[] = [];
  
  // Filter orders to only those within 6 months
  const recentOrders = orders.filter(order => {
    if (!order.date) {
      // If no date found, include it to be safe
      return true;
    }
    return isOrderRecent(order.date);
  });
  
  // Check each recent order
  for (const order of recentOrders) {
    if (!order.medicalItem) continue;
    
    // Check if there's a matching appointment
    const hasAppointment = appointments.some(apt => 
      apt.medicalItem?.canonical === order.medicalItem?.canonical
    );
    
    if (hasAppointment) {
      continue; // Has appointment, not missing
    }
    
    // Check if notes exclude this item
    const excludedByNotes = checkNotesForExclusion(notesInput, order.medicalItem);
    
    if (excludedByNotes) {
      continue; // Excluded by notes
    }
    
    // This is a missing procedure
    missing.push({
      item: order.medicalItem.canonical,
      category: order.medicalItem.category || 'unknown',
      orderText: order.text,
      reason: hasAppointment 
        ? 'Has appointment' 
        : excludedByNotes 
        ? 'Addressed in notes' 
        : 'No appointment found'
    });
  }
  
  // Deduplicate by canonical item name (keep first occurrence)
  const seen = new Set<string>();
  const deduplicated = missing.filter(item => {
    if (seen.has(item.item)) {
      return false;
    }
    seen.add(item.item);
    return true;
  });
  
  return deduplicated;
}

