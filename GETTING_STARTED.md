# Getting Started - Missing Procedures Analyzer

## Quick Start (3 Steps)

### 1. Run the Development Server

```bash
npm run dev
```

The application will start at: **http://localhost:3000**

### 2. Test with Sample Data

Open `SAMPLE_DATA.md` and copy the sample data into the three input fields to see how it works.

### 3. Use with Real Data

Simply copy and paste your actual data into the three fields:
- Outstanding Orders (with dates)
- Appointments
- Clinical Notes

## What to Expect

✅ **Automatic Recognition**: The system recognizes 100+ medical procedures and providers with all their abbreviations

✅ **Smart Date Filtering**: Only analyzes orders from the last 6 months

✅ **Note Intelligence**: Understands phrases like "patient refused", "has own provider", "outside", etc.

✅ **Clean Results**: Get a simple, copyable list of truly missing procedures

## Key Features

### The System Understands:

**Provider Variations:**
- "gastro" = "gastroenterologist" = "GI"
- "ortho" = "orthopedist" = "orthopedic"
- And many more...

**Exclusion Phrases in Notes:**
- "refused", "declined"
- "has own", "outside"
- "already done", "completed elsewhere"
- "not candidate", "contraindicated"

**Date Formats:**
- MM/DD/YYYY (08/15/2024)
- YYYY-MM-DD (2024-08-15)
- MM-DD-YYYY (08-15-2024)

## Troubleshooting

### No procedures detected?
- Make sure procedure names are spelled correctly or use common abbreviations
- Check that dates are included in orders
- Verify data isn't just whitespace

### Getting false positives?
- Add more detail to clinical notes
- Include phrases like "patient refused" or "has outside provider"
- The system checks for keywords near the procedure name

### Want to add new procedures?
- Edit `app/lib/data.ts`
- Add entry with canonical name and variations
- No restart needed (hot reload)

## Need Help?

Check the main README.md for detailed documentation, technical details, and customization options.

