// Provider and Procedure Data Configuration

export interface MedicalItem {
  canonical: string;
  variations: string[];
  category?: string;
}

export const PROVIDERS: MedicalItem[] = [
  {
    canonical: "allergist",
    variations: ["allergist"],
    category: "provider"
  },
  {
    canonical: "cardiologist",
    variations: ["cardiology", "cardiologist", "cardio"],
    category: "provider"
  },
  {
    canonical: "gastro",
    variations: ["gastro", "gastroenterologist", "gastroenterology", "gi"],
    category: "provider"
  },
  {
    canonical: "neurologist",
    variations: ["neuro", "neurology", "neurologist"],
    category: "provider"
  },
  {
    canonical: "orthopedist",
    variations: ["ortho", "orthopedist", "orthopedic", "orthopedics"],
    category: "provider"
  },
  {
    canonical: "pulmonologist",
    variations: ["pulmo", "pulmonology", "pulmonologist", "sleep medicine referral", "sleep medicine"],
    category: "provider"
  },
  {
    canonical: "pain management",
    variations: ["pain management", "pain mgmt"],
    category: "provider"
  },
  {
    canonical: "podiatrist",
    variations: ["podiatry", "podiatrist"],
    category: "provider"
  }
];

export const PROCEDURES: MedicalItem[] = [
  // Allergy & PT
  {
    canonical: "allergy testing",
    variations: ["allergy testing", "allergy skin prick test", "allergy test"],
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
    canonical: "US thyroid",
    variations: ["US, thyroid", "US Soft Tissue of Head & Neck"],
    category: "ultrasound"
  },

  {
    canonical: "US testicle",
    variations: ["US, testicle"],
    category: "ultrasound"
  },
  {
    canonical: "US abdomen",
    variations: ["US, abdomen, complete", "ultrasound abdominal", "US ABDOMINAL"],
    category: "ultrasound"
  },
  {
    canonical: "US abdominal aorta",
    variations: ["us abdominal aorta", "ultrasound abdominal aorta"],
    category: "ultrasound"
  },
  {
    canonical: "US lower arterial",
    variations: ["US ARTERIAL DOPPLER,", "US, duplex, arterial, lower extremity"],
    category: "ultrasound"
  },
  {
    canonical: "US carotid",
    variations: ["us carotid doppler", "us carotid", "ultrasound carotid"],
    category: "ultrasound"
  },
  {
    canonical: "US Groin/Scrotum",
    variations: ["us groin / scrotum", "us groin", "us scrotum", "ultrasound groin"],
    category: "ultrasound"
  },
  {
    canonical: "US pelvic",
    variations: ["us pelvic", "ultrasound pelvic"],
    category: "ultrasound"
  },
  {
    canonical: "US renal artery",
    variations: ["US, duplex, renal artery", "ultrasound renal"],
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
    variations: ["us transcranial doppler", "ultrasound transcranial"],
    category: "ultrasound"
  },
  {
    canonical: "US venous doppler",
    variations: ["us venous doppler", "ultrasound venous doppler"],
    category: "ultrasound"
  },
  {
    canonical: "US soft tissue extremities",
    variations: ["us soft tissue extremities", "ultrasound soft tissue extremities"],
    category: "ultrasound"
  },
  
  // Sleep Tests
  {
    canonical: "sleep apnea home test",
    variations: ["sleep apnea home test", "sleep apnea test", "home sleep study", "home sleep testing"],
    category: "test"
  },
  {
    canonical: "sleep insomnia home test",
    variations: ["sleep insomnia home test", "insomnia test", "insomnia device", "electroencephalogram eeg all night recording", "eeg all night recording"],
    category: "test"
  },
  
  // CT Scans
  {
    canonical: "CT Abdomen W/Contrast",
    variations: ["ct abdomen w/contrast", "ct abdomen w/ contrast", "ct abdomen with contrast"],
    category: "ct"
  },
  {
    canonical: "CT Abdomen W/WO Contrast",
    variations: ["ct abdomen w/wo contrast", "ct abdomen w/w/o contrast", "ct abdomen with without contrast"],
    category: "ct"
  },
  {
    canonical: "CT Abdomen Without Contrast",
    variations: ["ct abdomen without con", "ct abdomen w/o contrast", "ct abdomen without contrast"],
    category: "ct"
  },
  {
    canonical: "CT Abdomen+Pelvic W/Contrast",
    variations: ["ct abdomen+pelvic w/ contrast", "ct abdomen pelvic w/ contrast", "ct abdomen pelvic with contrast"],
    category: "ct"
  },
  {
    canonical: "CT Angiogram Chest",
    variations: ["ct angiogram chest", "ct angio chest"],
    category: "ct"
  },
  {
    canonical: "CT Brain",
    variations: ["ct brain", "ct head"],
    category: "ct"
  },
  {
    canonical: "CT Cervical Spine W/O Contrast",
    variations: ["ct cervical spine w/o contra", "ct cervical spine without contrast", "ct c spine w/o"],
    category: "ct"
  },
  {
    canonical: "CT Cervical Spine W/Contrast",
    variations: ["ct cervical spine w/ contrast", "ct cervical spine with contrast", "ct c spine w/"],
    category: "ct"
  },
  {
    canonical: "CT Chest",
    variations: ["ct chest"],
    category: "ct"
  },
  {
    canonical: "CT Chest W/Contrast",
    variations: ["ct chest w/contrast", "ct chest w/ contrast", "ct chest with contrast"],
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
    canonical: "CT Soft Tissue Neck W/O Contrast",
    variations: ["ct soft tissue neck w/o contrast", "ct soft tissue neck without contrast"],
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
    canonical: "CT Sinuses W/O Contrast",
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
    canonical: "MRA Brain/Head",
    variations: ["mra brain/head", "mra brain", "mra head"],
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
    canonical: "MRI Brain W/WO Contrast",
    variations: ["mri brain w/wo contrast", "mri brain w/w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Brain +IAC W/Contrast",
    variations: ["mri brain +iac w/ contrast", "mri brain iac w/ contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Brain +IAC W/O Contrast",
    variations: ["mri brain +iac w/o contrast", "mri brain iac w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Brain W/Contrast",
    variations: ["mri brain w/ contrast", "mri brain w/contrast", "mri brain with contrast"],
    category: "mri"
  },
  {
    canonical: "MRI Brain Without Contrast",
    variations: ["mri brain without contrast", "mri brain w/o contrast"],
    category: "mri"
  },
  {
    canonical: "MRI C Spine W/Contrast",
    variations: ["mri c spine w contrast", "mri c spine w/ contrast", "mri cervical spine w/ contrast"],
    category: "mri"
  },
  {
    canonical: "MRI C Spine W/O",
    variations: ["mri c spine w/o", "mri c spine w/o contrast", "mri cervical spine w/o"],
    category: "mri"
  },
  {
    canonical: "MRI C Spine W/WO Contrast",
    variations: ["mri c spine w/w/o contrast", "mri cervical spine w/w/o"],
    category: "mri"
  },
  {
    canonical: "MRI Elbow",
    variations: ["mri elbow"],
    category: "mri"
  },
  {
    canonical: "MRI Femur",
    variations: ["mri femur"],
    category: "mri"
  },
  {
    canonical: "MRI Foot",
    variations: ["mri foot"],
    category: "mri"
  },
  {
    canonical: "MRI Hand",
    variations: ["mri hand"],
    category: "mri"
  },
  {
    canonical: "MRI Hips",
    variations: ["mri hips", "mri hip"],
    category: "mri"
  },
  {
    canonical: "MRI Humerus",
    variations: ["mri humerus"],
    category: "mri"
  },
  {
    canonical: "MRI Knee",
    variations: ["mri knee"],
    category: "mri"
  },
  {
    canonical: "MRI lumbar spine w/o contrast",
    variations: ["mri lumber spine w/o", "mri lumbar spine w/o", "mri l spine w/o"],
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
    canonical: "MRI Pelvis",
    variations: ["mri pelvis"],
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
    canonical: "MRI Orbit Face Neck W/O Contrast",
    variations: ["mri orbit face neck wo/contrast", "mri orbit face neck w/o contrast"],
    category: "mri"
  },
  
  // X-Ray
  {
    canonical: "X-Ray",
    variations: ["XR,", "xray", "X_RAY"],
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
    variations: ["cardiac pft", "pft"],
    category: "test"
  },
  {
    canonical: "EMG Upper",
    variations: [
      "emg upper",
      "emg upper extremity",
      "nerve conduction study emg upper",
      "nerve conduction emg upper",
      "ncs emg upper"
    ],
    category: "test"
  },
  {
    canonical: "EMG Lower",
    variations: [
      "emg lower",
      "emg lower extremity",
      "nerve conduction study emg lower",
      "nerve conduction emg lower",
      "ncs emg lower"
    ],
    category: "test"
  },
  {
    canonical: "EVOX",
    variations: ["evox", "electrophysiologic evaluation", "elctrophysiologic evaluation"],
    category: "test"
  },
  {
    canonical: "Brace",
    variations: ["brace"],
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
    variations: ["pvr", "pulse volume recording"],
    category: "test"
  },
  {
    canonical: "SUDO",
    variations: ["sudo", "sudomotor"],
    category: "test"
  },
  {
    canonical: "VEEG",
    variations: ["veeg"],
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

