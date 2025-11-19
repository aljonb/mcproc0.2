# Missing Procedures Analyzer

A clinical office tool to identify missing medical procedures by cross-referencing outstanding orders, appointments, and clinical notes.

## Features

- **Smart Date Filtering**: Automatically filters orders to only include those 6 months old or newer
- **Fuzzy Matching**: Recognizes medical abbreviations and variations (e.g., "gastro" matches "gastroenterologist")
- **Note Analysis**: Intelligently parses clinical notes to exclude procedures with valid reasons (patient refusal, outside providers, etc.)
- **Clean UI**: Modern, responsive interface with three input fields for easy copy-paste workflow
- **Instant Results**: Real-time analysis with copyable results

## How It Works

### Business Logic

1. **Filter Orders by Date**: Only considers orders that are 6 months old or newer (older orders are ignored)
2. **Match with Appointments**: Checks if each order has a corresponding appointment (past or future)
3. **Check Notes for Exclusions**: Scans clinical notes for phrases indicating why a procedure isn't needed:
   - Patient refusal ("pt refused", "declined")
   - Outside providers ("has own gastro", "seeing elsewhere")
   - Already completed ("done at outside facility")
   - Medical contraindications ("not candidate")
4. **Report Missing Procedures**: Returns items that have no appointment AND no valid note explanation

### Supported Providers

- Allergist
- Cardiologist
- Gastroenterologist
- Neurologist
- Orthopedist
- Pulmonologist
- Pain Management
- Podiatrist

### Supported Procedures

The system recognizes 100+ medical procedures including:
- Ultrasounds (US carotid, US renal, US pelvic, etc.)
- CT Scans (all variations with/without contrast)
- MRI/MRA scans (all body parts and variations)
- Tests (EMG, EEG, PFT, sleep studies, etc.)
- X-Rays
- Injections
- And many more...

## Usage

### Running the Application

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Using the Tool

1. **Paste Outstanding Orders** in the first field
   - Include dates in format: MM/DD/YYYY or YYYY-MM-DD
   - Only orders 6 months old or newer will be analyzed

2. **Paste Appointments** in the second field
   - Include both past and future appointments
   - Any format is fine as long as the procedure/provider name is mentioned

3. **Paste Clinical Notes** in the third field (optional but recommended)
   - Include any notes about patient refusals, outside providers, etc.
   - The system handles abbreviations and various phrasings

4. **Click "Analyze Missing Procedures"**
   - Results will show which procedures are truly missing
   - Click "Copy Results" to copy the list to clipboard

### Example Input

**Outstanding Orders:**
```
08/15/2024 - US carotid doppler ordered
09/20/2024 - Patient needs to see cardiologist
10/01/2024 - MRI knee ordered
```

**Appointments:**
```
MRI knee scheduled for 11/25/2024
```

**Notes:**
```
Patient has their own cardiologist, established care outside.
```

**Result:**
```
Missing: US Carotid Doppler
```
(Cardiologist excluded because notes mention outside provider, MRI Knee excluded because appointment exists)

## Technical Details

### Tech Stack

- **Framework**: Next.js 16 + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Runtime**: Client-side analysis (no backend required)

### File Structure

```
app/
├── lib/
│   ├── data.ts      # Medical items configuration (providers & procedures)
│   └── utils.ts     # Parsing and matching logic
└── page.tsx         # Main UI component
```

### Key Functions

- `analyzeMissingProcedures()`: Main analysis function
- `parseOrders()`: Extracts orders and dates from text
- `parseAppointments()`: Extracts appointments from text
- `checkNotesForExclusion()`: Checks if notes exclude a procedure
- `findMedicalItem()`: Matches text to known providers/procedures

## Customization

### Adding New Providers or Procedures

Edit `/app/lib/data.ts` and add entries to the `PROVIDERS` or `PROCEDURES` arrays:

```typescript
{
  canonical: "Display Name",
  variations: ["variation1", "variation2", "abbrev"],
  category: "category_name"
}
```

### Adding New Exclusion Patterns

Edit `/app/lib/utils.ts` and add patterns to the `EXCLUSION_PATTERNS` array:

```typescript
export const EXCLUSION_PATTERNS = [
  'refused',
  'declined',
  'your new pattern',
  // ...
];
```

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## License

Private use for clinical office workflow.
