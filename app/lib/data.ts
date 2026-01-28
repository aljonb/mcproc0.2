// Provider and Procedure Data Configuration

export interface MedicalItem {
  canonical: string;
  variations: string[];
  category?: string;
}

export const PROVIDERS: MedicalItem[] = [

  {
    canonical: "PCP",
    variations: ["internal medicine referral", "PCP_Luyten", "PCP_Sarin", "PCP_Rachunow", "PA_Roa", "PA_Gassanov", "PCP_Kuo"],
    category: "provider"
  },
  {
    canonical: "allergist",
    variations: ["allergist", "Allergy FU", "Allergist_Babazadeh"],
    category: "provider"
  },
  {
    canonical: "cardio",
    variations: ["cardiology", "cardiologist",],
    category: "provider"
  },
  {
    canonical: "gastro",
    variations: ["gastro", "gastroenterologist", "gastroenterology"],
    category: "provider"
  },
  {
    canonical: "neuro",
    variations: ["neuro", "neurology", "neurologist"],
    category: "provider"
  },
  {
    canonical: "ortho",
    variations: ["ortho", "orthopedist", "orthopedic", "orthopedics"],
    category: "provider"
  },
  {
    canonical: "pulmo",
    variations: ["pulmo", "pulmonology", "pulmonologist", "sleep medicine referral", "sleep medicine", "	Pulmo_Rumi"],
    category: "provider"
  },
  {
    canonical: "pain management",
    variations: ["pain management", "pain mgmt"],
    category: "provider"
  }

];

export const PROCEDURES: MedicalItem[] = [
  // Allergy & PT
  {
    canonical: "allergy test",
    variations: ["allergy testing, skin prick (PROC) (submitted)", "allergy skin prick test", "allergy test", "Allergy_Testing", "Allergy NEW, 20 min", "Allergy Testing"],
    category: "test"
  },
  {
    canonical: "physical therapy",
    variations: [
      "physical therapy",
      "p/t evaluation",
      "pt evaluation",
      "p/t",
      "physical therapist referral",
      "pt referral"
    ],
    category: "therapy"
  },

  // Ultrasounds
  {
    canonical: "US upper arterial",
    variations: ["US, duplex, arterial, upper extremity"],
    category: "ultrasound"
  },
  {
    canonical: "US echo",
    variations: ["US, echo", "US echo", "US, echocardiogram", "US echocardiogram"],
    category: "ultrasound"
  },

  {
    canonical: "US thyroid",
    variations: ["US, thyroid", "US Soft Tissue of Head & Neck", "US Soft Tissue of Head & Neck, 20"],
    category: "ultrasound"
  },

  {
    canonical: "US testicle",
    variations: ["US, testicle"],
    category: "ultrasound"
  },
  {
    canonical: "US abdomen",
    variations: ["US, abdomen, complete", "ultrasound abdominal", "US ABDOMINAL", "US, abdomen (submit)"],
    category: "ultrasound"
  },
  {
    canonical: "US abdominal aorta",
    variations: ["us abdominal aorta", "ultrasound abdominal aorta", "US, abdominal aorta"],
    category: "ultrasound"
  },
  {
    canonical: "US lower arterial",
    variations: ["US ARTERIAL DOPPLER,", "US, duplex, arterial, lower extremity", "US, doppler, arterial"],
    category: "ultrasound"
  },
  {
    canonical: "US carotid",
    variations: ["us carotid doppler", "us carotid", "ultrasound carotid", "US, carotid", "US, duplex, carotid artery (perform)", "US, duplex, carotid artery (submit)"],
    category: "ultrasound"
  },
  {
    canonical: "US Groin/Scrotum",
    variations: ["us groin / scrotum", "us groin", "us scrotum", "ultrasound groin", "US, groin / scrotum"],
    category: "ultrasound"
  },
  {
    canonical: "US pelvic",
    variations: ["us pelvic", "ultrasound pelvic", "US, pelvic"],
    category: "ultrasound"
  },
  {
    canonical: "US renal artery",
    variations: ["US, duplex, renal artery", "ultrasound renal", "US Renal Doppler", "US, duplex, renal artery (submitted, STAT)", " US RENAL, 20 min"],
    category: "ultrasound"
  },
  {
    canonical: "US renal doppler",
    variations: ["us renal doppler", "ultrasound renal doppler"],
    category: "ultrasound"
  },
  {
    canonical: "US soft tissue head & neck",
    variations: ["us soft tissue of head & neck", "us soft tissue head neck"],
    category: "ultrasound"
  },
  {
    canonical: "US transcranial doppler",
    variations: ["us transcranial doppler", "ultrasound transcranial", "US, transcranial"],
    category: "ultrasound"
  },
  {
    canonical: "US venous",
    variations: ["us venous doppler", "ultrasound venous doppler", "US, venous", "US, duplex, venous, lower extremity (perform)", "US, doppler, venous", "US, duplex, venous, lower extremity, complete"],
    category: "ultrasound"
  },
  {
    canonical: "US soft tissue extremities",
    variations: ["us soft tissue extremities", "ultrasound soft tissue extremities"],
    category: "ultrasound"
  },

  // Sleep Tests
  {
    canonical: "sleep apnea device",
    variations: ["sleep apnea device", "home sleep testing (PROC) (submit)", "sleep apnea test", "home sleep study", "home sleep testing", "home sleep testing (PROC)", "SLEEP APNEA HOME TEST"],
    category: "test"
  },
  {
    canonical: "insomnia device",
    variations: ["sleep insomnia home test", "insomnia test", "insomnia device", "electroencephalogram eeg all night recording", "eeg all night recording"],
    category: "test"
  },

  // CT Scans
  {
    canonical: "CT, abdomen + pelvis, w/o contrast",
    variations: ["CT, abdomen + pelvis, w/o contrast"],
    category: "ct"
  },

  {
    canonical: "CT Abdomen W/Contrast",
    variations: ["ct abdomen w/contrast", "ct abdomen w/ contrast", "ct abdomen with contrast"],
    category: "ct"
  },
  {
    canonical: "CT Abdomen w/wo contrast",
    variations: ["ct abdomen w/wo contrast", "ct abdomen w/w/o contrast", "ct abdomen with without contrast"],
    category: "ct"
  },
  {
    canonical: "CT, abdomen, w/o contrast",
    variations: ["ct abdomen without con", "ct abdomen w/o contrast", "ct abdomen without contrast"],
    category: "ct"
  },
  {
    canonical: "CT Abdomen+Pelvic W/Contrast",
    variations: ["ct abdomen+pelvic w/ contrast", "ct abdomen pelvic w/ contrast", "ct abdomen pelvic with contrast"],
    category: "ct"
  },
  {
    canonical: "CT, angiogram, chest, w/ contrast",
    variations: ["CT, angiogram, chest, w/ contrast"],
    category: "ct"
  },
  {
    canonical: "CT, angiogram, coronary arteries, w/wo contrast",
    variations: ["CT, angiogram, coronary arteries, w/wo contrast"],
    category: "ct"
  },
  {
    canonical: "CT, head, w/o contrast ",
    variations: ["CT, head, w/o contrast"],
    category: "ct"
  },
  {
    canonical: "CT, cervical spine, w/o contrast",
    variations: ["ct cervical spine w/o contra", "ct cervical spine without contrast", "ct c spine w/o", "CT cervical spine, w/o contra, 15 min", "CT, cervical spine, w/o contrast"],
    category: "ct"
  },
  {
    canonical: "CT Cervical Spine W/Contrast",
    variations: ["ct cervical spine w/ contrast", "ct cervical spine with contrast", "ct c spine w/"],
    category: "ct"
  },
  {
    canonical: "CT Chest",
    variations: ["ct chest", "CT, chest, w/ contrast"],
    category: "ct"
  },
  {
    canonical: "CT, chest, w/ contrast",
    variations: ["CT, chest, w/ contrast"],
    category: "ct"
  },
  {
    canonical: "CT Lower Extremity W/Contrast",
    variations: ["ct lower extremity w/contrast", "ct lower extremity w/ contrast"],
    category: "ct"
  },
  {
    canonical: "CT Lumbar Spine W/O Contrast",
    variations: ["ct lumbar spine w/out contrast", "ct lumbar spine without contrast", "ct l spine w/o"],
    category: "ct"
  },
  {
    canonical: "CT Lumbar Spine W/WO Contrast",
    variations: ["ct lumbar spine w/wo contrast", "ct lumbar spine w/w/o contrast", "ct l spine w/wo"],
    category: "ct"
  },
  {
    canonical: "CT Maxillofacial W/O Contrast",
    variations: ["ct maxillofacial w/o contrast", "ct maxillofacial without contrast"],
    category: "ct"
  },

  {
    canonical: "CT, thoracic spine, w/o contrast",
    variations: ["CT, thoracic spine, w/o contrast"],
    category: "ct"
  },

  {
    canonical: "CT Pelvis Without Contrast",
    variations: ["ct pelvis without contrast", "ct pelvis w/o"],
    category: "ct"
  },
  {
    canonical: "CT Shoulder W/Contrast",
    variations: ["ct shoulder w/contrast", "ct shoulder w/ contrast", "ct shoulder with contrast"],
    category: "ct"
  },
  {
    canonical: "CT Shoulder W/O Contrast",
    variations: ["ct shoulder w/o contrast", "ct shoulder w/o", "ct shoulder without contrast"],
    category: "ct"
  },
  {
    canonical: "CT, neck, soft tissue, w/o contrast",
    variations: ["ct soft tissue neck w/o contrast", "ct soft tissue neck without contrast", "CT, neck, soft tissue, w/o contrast "],
    category: "ct"
  },
  {
    canonical: "CT Soft Tissue Neck W/WO Contrast",
    variations: ["ct soft tissue neck w/wo contrast", "ct soft tissue neck w/w/o contrast"],
    category: "ct"
  },
  {
    canonical: "CT Spine Lumbar W/Contrast",
    variations: ["ct spine lumbar w/contrast", "ct spine lumbar w/ contrast"],
    category: "ct"
  },
  {
    canonical: "CT Upper Extremity W/Contrast",
    variations: ["ct upper extremity w/", "ct upper extremity w/ contrast", "ct upper extremity with contrast"],
    category: "ct"
  },
  {
    canonical: "CT Upper Extremity W/O Contrast",
    variations: ["ct upper extremity w/o", "ct upper extremity w/o contrast", "ct upper extremity without contrast"],
    category: "ct"
  },
  {
    canonical: "CT Upper Extremity W/WO Contrast",
    variations: ["ct upper extremity w/wo", "ct upper extremity w/w/o contrast"],
    category: "ct"
  },
  {
    canonical: "CT, sinuses, w/o contrast",
    variations: ["ct sinuses w/o contrast", "ct sinuses without contrast"],
    category: "ct"
  },
  {
    canonical: "LDCT Chest Lung Cancer Screen",
    variations: ["ldct chest lung cancer screen", "ldct", "low dose ct chest"],
    category: "ct"
  },

  // MRI/MRA


  {
    canonical: "MRI, neck, w/o contrast",
    variations: ["MRI, neck, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MR, angiogram, head, w/o contrast",
    variations: ["MR, angiogram, head, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, breast, bilateral, w/wo contrast",
    variations: ["MRI, breast, bilateral, w/wo contrast"],
    category: "mri"
  },
  {
    canonical: "MR Venogram Brain W/O",
    variations: ["mr venogram brain w/o", "mr venogram brain"],
    category: "mri"
  },
  {
    canonical: "MR Venogram Neck W/O",
    variations: ["mr venogram neck w/o", "mr venogram neck"],
    category: "mri"
  },
  {
    canonical: "MR, angiogram, head + neck, w/o contrast",
    variations: ["mr angiogram head neck w/o contrast", "mr angiogram head neck without contrast", "MR, angiogram, head + neck, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRA Brain/Head",
    variations: ["mra brain/head", "mra brain", "mra head"],
    category: "mri"
  },
  {
    canonical: "MR, angiogram, brain, w/wo contrast",
    variations: ["MR, angiogram, brain, w/wo contrast", " MRA BRAIN/HEAD, 30 min"],
    category: "mri"
  },
  {
    canonical: "MRA Lower Extremity W/O",
    variations: ["mra lower extremity w/o", "mra lower extremity"],
    category: "mri"
  },
  {
    canonical: "MRA Neck",
    variations: ["mra neck"],
    category: "mri"
  },
  {
    canonical: "MRA Upper Extremity W/WO",
    variations: ["mra upper extremity w/wo", "mra upper extremity"],
    category: "mri"
  },
  {
    canonical: "MRI Abdomen W/O",
    variations: ["mri abdomen w/o", "mri abdomen"],
    category: "mri"
  },
  {
    canonical: "MRI Abdomen W/WO",
    variations: ["mri abdomen w/wo", "mri abdomen w/w/o"],
    category: "mri"
  },
  {
    canonical: "MRI Ankle",
    variations: ["mri ankle"],
    category: "mri"
  },
  {
    canonical: "MRI Brachial Plexus W/O",
    variations: ["mri brachial plexus w/o", "mri brachial plexus"],
    category: "mri"
  },
  {
    canonical: "MRI Brachial Plexus W/Contrast",
    variations: ["mri brachial plexus w contrast", "mri brachial plexus w/ contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, brain, w/wo contrast",
    variations: ["mri brain w/wo contrast", "mri brain w/w/o contrast", "MRI, brain + brain stem, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, brain + internal auditory canal, w/o contrast",
    variations: [
      "MRI, brain + internal auditory canal, w/o contrast",
      "mri brain + internal auditory canal w/o contrast",
      "mri brain +iac w/o contrast",
      "mri brain iac w/o contrast",
      "MRI Brain +IAC W/O Contrast"
    ],
    category: "mri"
  },
  {
    canonical: "MRI, brain, w/o contrast",
    variations: ["mri brain w/ contrast", "mri brain w/contrast", "mri brain with contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, brain, w/o contrast",
    variations: [
      "mri brain without contrast",
      "mri brain w/o contrast",
      "MRI, brain, w/o contrast (submit)",
      "MRI Brain Without Contr., 15 min",
      "MRI Brain Without Contr"
    ],
    category: "mri"
  },
  {
    canonical: "MRI, cervical spine, w/wo contrast",
    variations: ["MRI, cervical spine, w/wo contrast"],
    category: "mri"
  },
  {
    canonical: "MRI C Spine W/Contrast",
    variations: ["mri c spine w contrast", "mri c spine w/ contrast", "mri cervical spine w/ contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, cervical spine, w/o contrast",
    variations: ["mri c spine w/o", "mri c spine w/o contrast", "mri cervical spine w/o"],
    category: "mri"
  },
  {
    canonical: "MRI C Spine W/WO Contrast",
    variations: ["mri c spine w/w/o contrast", "mri cervical spine w/w/o"],
    category: "mri"
  },
  {
    canonical: "MRI, elbow, w/o contrast",
    variations: ["MRI, elbow, w/o contrast", " MRI Elbow"],
    category: "mri"
  },
  {
    canonical: "MRI Femur",
    variations: ["mri femur"],
    category: "mri"
  },
  {
    canonical: "MRI, foot, w/o contrast",
    variations: ["MRI, foot, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Foot",
    variations: ["mri foot"],
    category: "mri"
  },
  {
    canonical: "MRI, hand, w/o contrast",
    variations: ["MRI, hand, w/o contrast"],
    category: "mri"
  },

  {
    canonical: "MRI, wrist, w/o contrast",
    variations: ["MRI, wrist, w/o contrast"],
    category: "mri"
  },

  {
    canonical: "MRI Hand",
    variations: ["mri hand", "MRI, hand, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, hip, w/o contrast",
    variations: ["MRI, hip, w/o contrast", " MRI Hips, 30 min"],
    category: "mri"
  },
  {
    canonical: "MRI Hips",
    variations: ["mri hips", "mri hip", "MRI, hip, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Humerus",
    variations: ["mri humerus"],
    category: "mri"
  },

  {
    canonical: "MRI, knee, w/o contrast",
    variations: ["MRI, knee, w/o contrast", " MRI Knee, 30 min", "MRI Knee"],
    category: "mri"
  },

  {
    canonical: "MRI Knee",
    variations: ["mri knee"],
    category: "mri"
  },
  {
    canonical: "MRI, lumbar spine, w/o contrast",
    variations: ["mri lumber spine w/o", "mri lumbar spine w/o", "mri l spine w/o"],
    category: "mri"
  },
  {
    canonical: "MRI, liver, w/wo contrast",
    variations: ["MRI, liver, w/wo contrast"],
    category: "mri"
  },

  {
    canonical: "MRI lumbar spine W/WO",
    variations: ["mri lumber spine w/wo", "mri lumbar spine w/wo", "mri l spine w/wo"],
    category: "mri"
  },
  {
    canonical: "MRI Maxillofacial W/WO",
    variations: ["mri maxillofacial w/wo", "mri maxillofacial"],
    category: "mri"
  },
  {
    canonical: "MRI Orbits (Face)",
    variations: ["mri orbits", "mri orbits face"],
    category: "mri"
  },
  {
    canonical: "MR, angiogram, head + neck, w/ contrast",
    variations: ["MR, angiogram, head + neck, w/ contrast", "mr angiogram head neck w/ contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, pituitary, w/wo contrast",
    variations: ["mri pituitary w/wo contrast", "mri pituitary without contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, pelvis, w/o contrast",
    variations: ["mri pelvis", "MRI, pelvis, w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Pelvis W/WO Contrast",
    variations: ["mri pelvis w/wo cont", "mri pelvis w/wo contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Renal W/O Contrast",
    variations: ["mri renal w/o contrast", "mri renal"],
    category: "mri"
  },
  {
    canonical: "MRI shoulder w/o contrast",
    variations: ["MRI, shoulder, w/o contrast", "MRI shoulder"],
    category: "mri"
  },
  {
    canonical: "MRI thoracic spine W/Contrast",
    variations: ["mri thoracic spine w/contrast", "mri thoracic spine w/ contrast", "mri t spine w/"],
    category: "mri"
  },
  {
    canonical: "MRI thoracic spine w/o contrast",
    variations: ["mri thoracic spine w/o", "mri t spine w/o"],
    category: "mri"
  },
  {
    canonical: "MRI Thoracic Spine W/WO",
    variations: ["mri thoracic spine w/wo", "mri t spine w/wo"],
    category: "mri"
  },
  {
    canonical: "MRI Tib-Fib",
    variations: ["mri tib-fib", "mri tib fib"],
    category: "mri"
  },
  {
    canonical: "MRI Wrist",
    variations: ["mri wrist"],
    category: "mri"
  },
  {
    canonical: "MRI Orbit Face Neck W/Contrast",
    variations: ["mri orbit face neck w/contrast", "mri orbit face neck w/ contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Orbit Face Neck W/WO Contrast",
    variations: ["mri orbit face neck w/w contrast", "mri orbit face neck w/w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI, brain + orbits, w/wo contrast",
    variations: ["mri orbit face neck w/o contrast", " MRA BRAIN/HEAD, 30 min"],
    category: "mri"
  },
  {
    canonical: "MRI Orbit Face Neck W/O Contrast",
    variations: ["mri orbit face neck wo/contrast", "mri orbit face neck w/o contrast"],
    category: "mri"
  },

  // X-Ray
  {
    canonical: "XR, foot",
    variations: ["XR, foot"],
    category: "imaging"
  },
  {
    canonical: "XR, elbow",
    variations: ["XR, elbow"],
    category: "imaging"
  },
  {
    canonical: "XR, thoracic spine",
    variations: ["XR, thoracic spine"],
    category: "imaging"
  },
  {
    canonical: "XR, lumbosacral spine",
    variations: ["XR, lumbosacral spine"],
    category: "imaging"
  },
  {
    canonical: "XR, toe",
    variations: ["XR, toe"],
    category: "imaging"
  },
  {
    canonical: "XR, wrist",
    variations: ["XR, wrist"],
    category: "imaging"
  },
   {
    canonical: "XR, forearm",
    variations: ["XR, forearm"],
    category: "imaging"
  },


  {
    canonical: "XR, lumbar spine",
    variations: ["XR, lumbar spine", "XR, lumbosacral spine"],
    category: "imaging"
  },

  {
    canonical: "XR, skull",
    variations: ["XR, skull"],
    category: "imaging"
  },

  {
    canonical: "XR, knee",
    variations: ["XR, knee"],
    category: "xray"
  },    

  {
    canonical: "XR, hand",
    variations: ["XR, hand"],
    category: "imaging"
  },

  {
    canonical: "XR, chest",
    variations: ["XR, chest"],
    category: "xray"
  },
  {
    canonical: "XR, shoulder",
    variations: ["XR, shoulder"],
    category: "imaging"
  },

  {
    canonical: "XR, cervical spine",
    variations: ["XR, cervical spine"],
    category: "imaging"
  },

  {
    canonical: "XR, lumbosacral spine",
    variations: ["XR, lumbosacral spine"],
    category: "imaging"
  },

  {
    canonical: "X-Ray",
    variations: ["XR,", "xray", "X_RAY", "X-Ray", " X-Ray, 15 min", "X-Ray, 15 min"],
    category: "imaging"
  },

  // Tests & Procedures
  {
    canonical: "COVID Rapid Test",
    variations: ["covid rapid test", "covid test"],
    category: "test"
  },
  {
    canonical: "Flu Rapid Test",
    variations: ["flu rapid test", "flu test"],
    category: "test"
  },
  {
    canonical: "PFT",
    variations: ["cardiac pft", "pft", "PFT, complete", "complete PFT w/ post bronchodilator spirometry", "complete PFT w/ post bronchodilator spirometry* (submitted)"],
    category: "test"
  },
  {
    canonical: "EMG upper",
    variations: [
      " EMG 10 Min UPPER, 40 min",
      "emg upper",
      "emg upper extremity",
      "nerve conduction study emg upper",
      "nerve conduction emg upper",
      "ncs emg upper",
      "upper extremity electromyogram",
      "nerve conduction study/EMG, upper extremity",
      " EMG 10 Min UPPER, 20 min",
      "nerve conduction study/EMG, upper extremity",
      " EMG 10 Min UPPER, 10 min",
      "nerve conduction study/EMG, upper extremity (PROC) (submit)",
      "nerve conduction study/EMG, upper extremity (PROC)"
    ],
    category: "test"
  },
  {
    canonical: "EMG lower",
    variations: [
      "emg lower",
      "emg lower extremity",
      "nerve conduction study emg lower",
      "nerve conduction emg lower",
      "ncs emg lower",
      "lower extremity electromyogram",
      "EMG 10 Min LOWER, 20 min",
      "EMG 10 Min LOWER, 10 min",
      "nerve conduction study/EMG, lower extremity (PROC) (submit)",
      "EMG Lower, 20 min",
      "EMG Lower"
    ],
    category: "test"
  },
  {
    canonical: "EVOX",
    variations: ["evox", "electrophysiologic evaluation", "elctrophysiologic evaluation", "evoked potential"],
    category: "test"
  },
  {
    canonical: "back brace",
    variations: ["back brace", "BRACES"],
    category: "equipment"
  },
  {
    canonical: "knee brace, hinged",
    variations: ["BRACES"],
    category: "equipment"
  },
  {
    canonical: "knee brace",
    variations: ["BRACES"],
    category: "equipment"
  },
  {
    canonical: "brace",
    variations: ["BRACES"],
    category: "equipment"
  },
  {
    canonical: "EEG",
    variations: ["eeg 61 min", "eeg", "electroencephalogram"],
    category: "test"
  },
  {
    canonical: "EKG",
    variations: ["ekg", "electrocardiogram", "ecg"],
    category: "test"
  },
  {
    canonical: "event monitor",
    variations: ["event monitor", "cardiac event monitor", "heart event monitor"],
    category: "test"
  },
  {
    canonical: "PVR",
    variations: ["pvr", "pulse volume recording", "PVR_SCHEDULE"],
    category: "test"
  },
  {
    canonical: "SUDO",
    variations: ["sudo", "sudomotor"],
    category: "test"
  },
  {
    canonical: "VEEG",
    variations: ["veeg", "continuous electroencephalogram with video"],
    category: "test"
  },
  {
    canonical: "Intra Articular Injection Knee",
    variations: ["intra articular injection kne", "intra articular injection knee", "knee injection"],
    category: "injection"
  }
];

// Combine all medical items
export const ALL_MEDICAL_ITEMS = [...PROVIDERS, ...PROCEDURES];
