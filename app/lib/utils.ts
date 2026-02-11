import { ALL_MEDICAL_ITEMS, MedicalItem } from './data';

// Normalize text for matching
export function normalizeText(text: string): string {
  let normalized = text
    .toLowerCase()
    .replace(/(\d)([a-z])/g, '$1 $2') 
    .replace(/([a-z])(\d)/g, '$1 $2')
    .replace(/\s+/g, ' ') // collapse whitespace
    .replace(/[^\w\s\/+\-]/g, ' ') // keep only alphanumeric, spaces, and medical chars (replace others with space)
    .trim()
    .replace(/\s+/g, ' '); // collapse any new whitespace created
  
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
      
      // Use word boundary matching for ALL variations to prevent false matches
      // Also allow matching after digits (for date concatenation like "09242025electrocardiogram")
      // e.g., "gi" shouldn't match inside "neurologist"
      // e.g., "cardio" shouldn't match inside "electrocardiogram"
      // Escape special regex characters in the variation
      const escapedVariation = normalizedVariation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      
      // Match at word boundary OR after a digit (for dates), and before word boundary
      const regex = new RegExp(`(?:\\b|(?<=\\d))${escapedVariation}\\b`);
      
      if (regex.test(normalizedText)) {
        if (!bestMatch || normalizedVariation.length > bestMatch.length) {
          bestMatch = { item, length: normalizedVariation.length };
        }
      } 
      // FALLBACK: Simple includes check with space boundaries (since we normalized everything to spaces)
      // This handles cases where regex boundaries might be tricky
      else {
         const paddedText = ' ' + normalizedText + ' ';
         const paddedVariation = ' ' + normalizedVariation + ' ';
         if (paddedText.includes(paddedVariation)) {
            if (!bestMatch || normalizedVariation.length > bestMatch.length) {
              bestMatch = { item, length: normalizedVariation.length };
            }
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
  // Common numeric date patterns: MM/DD/YYYY, YYYY-MM-DD, MM-DD-YYYY, etc.
  const datePatterns = [
    /(\d{1,2}[-/]\d{1,2}[-/]\d{2,4})/,  // MM/DD/YYYY or MM-DD-YYYY
    /(\d{4}[-/]\d{1,2}[-/]\d{1,2})/,    // YYYY-MM-DD or YYYY/MM/DD
    /(\d{1,2}[-/]\d{1,2}[-/]\d{2})/,    // MM/DD/YY
  ];
  
  // Try numeric patterns first
  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      const date = parseDate(match[1]);
      if (date) return date;
    }
  }
  
  // Handle month name formats: "January 15, 2026", "Jan 15, 2026", etc.
  const monthNamePatterns = [
    /(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s+(\d{4})/i,
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\.?\s+(\d{1,2}),?\s+(\d{4})/i,
  ];
  
  for (const pattern of monthNamePatterns) {
    const match = text.match(pattern);
    if (match) {
      const monthNames: { [key: string]: number } = {
        january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
        july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
        jan: 0, feb: 1, mar: 2, apr: 3, jun: 5,
        jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
      };
      
      const monthKey = match[1].toLowerCase().replace(/\.$/, '');
      const month = monthNames[monthKey];
      const day = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);
      
      if (month !== undefined) {
        const date = new Date(year, month, day);
        if (!isNaN(date.getTime())) {
          return date;
        }
      }
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
  date: Date | null;
  isCancelled?: boolean;
  cancellationReason?: string;
  isCompleted?: boolean;
}

export function parseAppointments(input: string): Appointment[] {
  const lines = input.split('\n').filter(line => line.trim());
  const appointments: Appointment[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const medicalItem = findMedicalItem(line);
    
    if (medicalItem) {
      // Extract date from the appointment line
      const date = extractDate(line);
      
      // Check previous lines for status
      let isCancelled = false;
      let cancellationReason = '';
      let isCompleted = false;

      // Look back up to 3 lines to find status info
      for (let j = Math.max(0, i - 3); j < i; j++) {
        const prevLine = lines[j].toLowerCase();

        // Check if this appointment was cancelled
        if (prevLine.includes('x cancelled')) {
          isCancelled = true;

          // The next line after 'x cancelled:' usually contains the reason
          if (j + 1 < lines.length) {
            const reasonLine = lines[j + 1].trim();
            cancellationReason = reasonLine;
          }
          break;
        }

        // Check if this appointment has claim created (completed)
        if (prevLine.includes('4 claim created')) {
          isCompleted = true;
        }
      }
      
      // Include appointment if not cancelled OR if completed (claim created)
      const isValidAppointment = !isCancelled || isCompleted;

      if (isValidAppointment) {
        appointments.push({
          text: line.trim(),
          medicalItem,
          lineNumber: i + 1,
          date,
          isCancelled,
          cancellationReason,
          isCompleted
        });
      }
    }
  }
  
  return appointments;
}

// Check if notes contain exclusion phrases for a medical item
export const EXCLUSION_PATTERNS = [
  'refused',
  'declined',
  'denied',
  'patient refused',
  'pt refused',
  'patient declined',
  'pt declined',
  'has own',
  'has their own',
  'having her own',
  'having his own',
  'having their own',
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
  'doesn\'t want',
  'hold off',
  'hold off on',
  'wants to hold off',
  'can\'t',
  'cant',
  'cannot',
  'can not',
  'unable to',
  'will do elsewhere',
  'will schedule elsewhere'
];

export function checkNotesForExclusion(notes: string, medicalItem: MedicalItem): boolean {
  // Split notes into lines for more accurate context checking
  // Do this BEFORE normalization so we don't lose line breaks
  const lines = notes.split('\n').map(line => line.trim()).filter(line => line);
  
  const itemVariations = medicalItem.variations.map(v => normalizeText(v));
  
  // Check each line for mentions of the item with exclusion patterns
  for (const rawLine of lines) {
    const normalizedLine = normalizeText(rawLine);
    
    // Check if this line mentions the item
    const mentionsItem = itemVariations.some(variation => 
      normalizedLine.includes(variation)
    );
    
    if (!mentionsItem) continue;
    
    // Check if any exclusion pattern appears in the SAME line
    for (const pattern of EXCLUSION_PATTERNS) {
      const normalizedPattern = normalizeText(pattern);
      if (normalizedLine.includes(normalizedPattern)) {
        return true; // Found exclusion pattern on the same line as the item
      }
    }
  }
  
  return false;
}

// Check if notes mention patient wants to do procedure at open/outside facility
export function checkNotesForOpenFacility(notes: string, medicalItem: MedicalItem): boolean {
  const normalizedNotes = normalizeText(notes);
  
  // Check if any variation of the item is mentioned with "open"
  for (const variation of medicalItem.variations) {
    const normalizedVariation = normalizeText(variation);
    
    // Extract key terms (e.g., "mri" from "mri brain without contrast")
    const keyTerms = normalizedVariation.split(' ').filter(term => 
      term.length > 2 && !['with', 'without', 'contrast', 'the', 'and', 'for'].includes(term)
    );
    
    for (const term of keyTerms) {
      // Look for patterns like "will do MRIs open", "wants open MRI"
      const openPatterns = [
        `will do ${term}s open`,
        `will do ${term} open`,
        `wants open ${term}`,
        `doing open ${term}`,
        `prefers open ${term}`,
        `${term}s open`,  // "MRIs open"
        `open ${term}`,
      ];
      
      for (const pattern of openPatterns) {
        if (normalizedNotes.includes(pattern)) {
          return true;
        }
      }
    }
  }
  
  return false;
}

// Check if notes indicate refusal of sleep-related tests
export function checkSleepRefusalInNotes(notes: string): boolean {
  const normalizedNotes = normalizeText(notes);
  
  const sleepKeywords = ['sleep', 'insomnia', 'apnea', 'sleep device', 'sleep study', 'sleep test'];
  const refusalPatterns = [
    'hold off',
    'hold off on',
    'wants to hold off',
    'refused',
    'declined',
    'does not want',
    'doesnt want',
    'will not do',
    'wont do'
  ];
  
  // Check if any sleep keyword appears with any refusal pattern
  for (const sleepKeyword of sleepKeywords) {
    const normalizedKeyword = normalizeText(sleepKeyword);
    const keywordIndex = normalizedNotes.indexOf(normalizedKeyword);
    
    if (keywordIndex === -1) continue;
    
    // Check 150 chars before and after the sleep keyword
    const contextStart = Math.max(0, keywordIndex - 150);
    const contextEnd = Math.min(normalizedNotes.length, keywordIndex + normalizedKeyword.length + 150);
    const context = normalizedNotes.substring(contextStart, contextEnd);
    
    // Check if any refusal pattern appears in this context
    for (const pattern of refusalPatterns) {
      const normalizedPattern = normalizeText(pattern);
      if (context.includes(normalizedPattern)) {
        return true;
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

export interface MissingProcedureNoteMention {
  item: string;
  lines: string[];
}

export function findMissingProcedureMentionsInNotes(
  notes: string,
  missingProcedures: MissingProcedure[]
): MissingProcedureNoteMention[] {
  if (!notes.trim() || missingProcedures.length === 0) {
    return [];
  }

  const noteLines = notes
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);

  if (noteLines.length === 0) {
    return [];
  }

  const normalizedLines = noteLines.map(line => normalizeText(line));

  return missingProcedures
    .map(({ item }) => {
      const medicalItem = ALL_MEDICAL_ITEMS.find(entry => entry.canonical === item);
      const searchTerms = medicalItem?.variations?.length
        ? medicalItem.variations
        : [item];

      const normalizedTerms = Array.from(
        new Set(searchTerms.map(term => normalizeText(term)).filter(Boolean))
      );

      const matchedLines = noteLines.filter((line, index) => {
        const normalizedLine = normalizedLines[index];
        return normalizedTerms.some(term => {
          const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(?:\\b|(?<=\\d))${escaped}\\b`);
          return regex.test(normalizedLine);
        });
      });

      return {
        item,
        lines: Array.from(new Set(matchedLines)),
      };
    })
    .filter(entry => entry.lines.length > 0);
}

// Helper: check if an appointment occurs on or after the order date (or when dates are missing)
function isAppointmentOnOrAfterOrder(apt: Appointment, order: Order): boolean {
  // If order has no date, accept any appointment
  if (!order.date) return true;

  // If appointment has no date, accept it (can't verify timing)
  if (!apt.date) return true;

  // Only count appointments on or after the order date
  return apt.date >= order.date;
}

// Helper: determine if an appointment's medical item satisfies an order's medical item
function appointmentSatisfiesOrder(order: Order, apt: Appointment): boolean {
  const orderCanon = order.medicalItem?.canonical;
  const aptCanon = apt.medicalItem?.canonical;
  const orderCategory = order.medicalItem?.category;

  if (!orderCanon || !aptCanon) return false;

  // Exact canonical match
  if (aptCanon === orderCanon) return true;

  // Flexible rule: any generic X-Ray appointment satisfies any specific X-Ray order
  // i.e., if the order is an X-ray type (imaging/xray category) and the appointment is generic "X-Ray"
  if (aptCanon === "X-Ray" && (orderCategory === "imaging" || orderCategory === "xray")) {
    return true;
  }

  return false;
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
  
  // Check if notes contain general sleep refusal
  const sleepRefusedInNotes = checkSleepRefusalInNotes(notesInput);
  
  // Check each recent order
  for (const order of recentOrders) {
    if (!order.medicalItem) continue;
    
    // Check if there's a matching appointment ON OR AFTER the order date
    const hasAppointment = appointments.some(apt => {
      if (!appointmentSatisfiesOrder(order, apt)) {
        return false;
      }

      return isAppointmentOnOrAfterOrder(apt, order);
    });
    
    if (hasAppointment) {
      continue; // Has appointment, not missing
    }
    
    // Check if notes exclude this item
    const excludedByNotes = checkNotesForExclusion(notesInput, order.medicalItem);
    
    // Check if notes mention open facility for this procedure
    const excludedByOpenFacility = checkNotesForOpenFacility(notesInput, order.medicalItem);
    
    // Check if this is a sleep test and sleep was generally refused
    const isSleepTest = order.medicalItem.canonical === "Sleep Apnea Home Test" || 
                        order.medicalItem.canonical === "Sleep Insomnia Home Test";
    const excludedBySleepRefusal = isSleepTest && sleepRefusedInNotes;
    
    if (excludedByNotes || excludedByOpenFacility || excludedBySleepRefusal) {
      continue; // Excluded by notes
    }
    
    // This is a missing procedure
    missing.push({
      item: order.medicalItem.canonical,
      category: order.medicalItem.category || 'unknown',
      orderText: order.text,
      reason: hasAppointment 
        ? 'Has appointment' 
        : (excludedByNotes || excludedBySleepRefusal)
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

	
