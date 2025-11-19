# Sample Test Data

Use this data to test the Missing Procedures Analyzer.

## Sample Outstanding Orders

```
08/15/2024 - US carotid doppler ordered for patient
09/20/2024 - Patient needs to see cardiologist for follow-up
10/01/2024 - MRI knee scheduled
07/10/2024 - Orthopedist referral for patient
11/05/2024 - CT Brain W/Contrast ordered
10/15/2024 - Physical therapy evaluation needed
09/30/2024 - Gastroenterologist consultation required
11/01/2024 - Sleep apnea home test ordered
10/20/2024 - MRI Lumbar Spine W/O ordered
08/25/2024 - Allergy testing needed
```

## Sample Appointments

```
MRI knee scheduled for 11/25/2024 at 2:00 PM
Physical therapy evaluation on 11/15/2024
Sleep apnea home test appointment 11/20/2024
```

## Sample Clinical Notes

```
Patient has established care with outside cardiologist at University Hospital.
Pt refused allergy testing - multiple times discussed, patient not interested.
Orthopedist referral - patient declined, wants to wait.
CT Brain ordered but patient has their own neurologist who will order.
```

## Expected Results

Based on the above sample data:

**Missing Procedures:**
1. US Carotid Doppler - No appointment, not mentioned in notes
2. Gastroenterologist - No appointment, not excluded in notes
3. MRI Lumbar Spine W/O - No appointment, not mentioned in notes

**Not Missing (and why):**
- Cardiologist - Excluded by notes (has outside provider)
- MRI Knee - Has appointment scheduled
- Orthopedist - Excluded by notes (patient declined)
- CT Brain W/Contrast - Excluded by notes (has own neurologist)
- Physical Therapy - Has appointment scheduled
- Allergy Testing - Excluded by notes (patient refused)
- Sleep Apnea Home Test - Has appointment scheduled

---

## Additional Test Cases

### Test Case 1: Old Orders (Should be Filtered Out)

```
Orders:
01/15/2024 - US carotid doppler (more than 6 months old - should be ignored)
11/01/2024 - MRI Brain W/O (recent - should be checked)

Appointments:
(none)

Notes:
(none)

Expected: Only "MRI Brain W/O" should be missing
```

### Test Case 2: Abbreviations in Notes

```
Orders:
10/15/2024 - Gastroenterologist referral
10/20/2024 - Physical therapy evaluation
10/25/2024 - Pulmonologist consultation

Appointments:
(none)

Notes:
Pt has own gastro doc
Patient already doing PT elsewhere
Outside pulmo established

Expected: All three should be excluded (notes use abbreviations)
```

### Test Case 3: Multiple Variations

```
Orders:
10/01/2024 - MRI C Spine W/ Contrast
10/05/2024 - CT Abdomen W/WO Contrast
10/10/2024 - US Renal Doppler

Appointments:
MRI cervical spine scheduled 11/15
CT abdomen with and without contrast on 11/20

Notes:
(none)

Expected: Only "US Renal Doppler" should be missing
(Others have appointments with different wording but same meaning)
```

### Test Case 4: Complex Notes

```
Orders:
10/01/2024 - Cardiologist referral
10/05/2024 - Neurologist consultation
10/10/2024 - Orthopedist evaluation

Appointments:
(none)

Notes:
Discussed cardiology referral with patient. Patient states he is seeing 
cardiologist at outside facility and does not want another referral at this time.

Patient refused to see neurologist - wants to continue with current treatment plan.

Ortho evaluation not candidate due to recent surgery recovery period.

Expected: All three should be excluded based on note context
```

