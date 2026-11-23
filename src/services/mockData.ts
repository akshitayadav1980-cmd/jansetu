import { Challenge, Project, DistrictMetric } from '../types';

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'CH-2026-081',
    title: 'Severe Toxic Chemical Froth & High TDS in Yamuna Canal Bypass',
    description: 'During winter and festival months, toxic detergent and phosphate effluent produces dangerous white froth layers reaching up to 4 feet in Kalindi Kunj and Okhla bypass. Downstream agricultural and slum communities suffer from acute skin infections and respiratory distress. Urgent need for automated in-situ biological degradation and real-time spectrophotometric telemetry to pinpoint industrial discharge sources.',
    district: 'South East Delhi',
    state: 'Delhi NCR',
    coordinates: { lat: 28.5478, lng: 77.3113 },
    domain: 'Water Resources',
    status: 'in_progress',
    priority: 'critical',
    aiSuggestedPriority: 'critical',
    officialPriority: 'critical',
    submittedBy: {
      name: 'Ramesh K. Sharma',
      role: 'Civic Environmentalist & Resident',
      badge: 'Community Warden'
    },
    submittedAt: '2026-10-14T09:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80',
    upvotes: 342,
    assignedUniversityId: 'UNI-IITD',
    assignedUniversityName: 'IIT Delhi — Dept. of Civil & Environmental Eng.',
    linkedProjectId: 'PRJ-2026-01',
    governmentReview: {
      reviewedBy: 'Dr. Neha Swaminathan, IAS (Dir. Dept of Water Resources)',
      reviewedAt: '2026-10-18T14:15:00Z',
      notes: 'High-priority critical ecological emergency. Verified ground evidence matches Delhi Pollution Control Board alerts. Assigned to IIT Delhi Center for Rural Development and prioritized for National Clean Ganga Mission grant.',
      allocatedGrantINR: 1500000,
      officialPriority: 'critical'
    },
    aiAnalysis: {
      domain: 'Water Resources',
      confidenceScore: 98,
      extractedKeywords: ['Phosphate', 'Froth', 'Effluent', 'TDS', 'Industrial', 'Biodegradation'],
      suggestedPriority: 'critical',
      priorityRationale: 'High public health exposure risk with toxic bioaccumulation in food chain and downstream drinking supplies.',
      requiredExpertise: ['Biochemical Remediation', 'IoT Water Telemetry', 'Spectrophotometry', 'Environmental Law'],
      recommendedUniversities: [
        { name: 'IIT Delhi', department: 'Centre for Rural Development and Technology', matchScore: 97, specialization: 'Effluent Remediation & Bio-enzymes' },
        { name: 'IIT Roorkee', department: 'Hydrology Department', matchScore: 91, specialization: 'River Discharge Modeling' }
      ],
      potentialDuplicateRisk: { detected: false, highestMatchScore: 12 },
      feasibilityRating: 'Medium',
      estimatedTimelineMonths: 5,
      suggestedSolutionApproach: 'Deploy a floating solar-powered bio-enzyme dispersion catamaran coupled with optical phosphate fluorometer telemetry nodes.'
    }
  },
  {
    id: 'CH-2026-092',
    title: 'High Post-Harvest Spoilage of Onions and Tomatoes Due to Lack of Decentralized Cold Storage',
    description: 'Smallholder farmers in Niphad and Yeola talukas face up to 38% harvest rot during sudden unseasonal rains and heat spikes. Grid electricity is intermittent (6 hours/day), rendering commercial refrigerated warehouses unviable for marginal farmers. Need for low-cost, decentralized phase-change thermal storage powered by farm-level solar.',
    district: 'Nashik',
    state: 'Maharashtra',
    coordinates: { lat: 20.0984, lng: 74.0537 },
    domain: 'Agriculture & Soil',
    status: 'in_progress',
    priority: 'high',
    aiSuggestedPriority: 'high',
    officialPriority: 'high',
    submittedBy: {
      name: 'Sunita Popat Gaikwad',
      role: 'Kisan Producer Group Coordinator',
      badge: 'Agritech Lead'
    },
    submittedAt: '2026-10-22T11:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80',
    upvotes: 289,
    assignedUniversityId: 'UNI-COEP',
    assignedUniversityName: 'COEP Technological University, Pune',
    linkedProjectId: 'PRJ-2026-02',
    governmentReview: {
      reviewedBy: 'Shri Anand Deshmukh, Joint Director (Agriculture)',
      reviewedAt: '2026-10-25T16:00:00Z',
      notes: 'Substantiated by District Krishi Vigyan Kendra reports. Aligns with PM-KUSUM decentralized solar cooling mandate. Fast-tracked for prototype grant.',
      allocatedGrantINR: 1200000,
      officialPriority: 'high'
    },
    aiAnalysis: {
      domain: 'Agriculture & Soil',
      confidenceScore: 95,
      extractedKeywords: ['Spoilage', 'Post-Harvest', 'Phase-Change', 'Solar', 'Cold-Chain', 'Onion'],
      suggestedPriority: 'high',
      priorityRationale: 'High economic vulnerability for 4,200 marginal farming households with substantial annual produce loss.',
      requiredExpertise: ['Phase Change Materials (PCM)', 'Thermal Engineering', 'Solar PV MPPT Design', 'Micro-climate Sensing'],
      recommendedUniversities: [
        { name: 'COEP Technological University, Pune', department: 'Mechanical & Thermal Systems Lab', matchScore: 96, specialization: 'Low-cost Thermal Batteries' },
        { name: 'Punjab Agricultural University (PAU)', department: 'Farm Machinery & Power', matchScore: 92, specialization: 'Decentralized Crop Silos' }
      ],
      potentialDuplicateRisk: { detected: false, highestMatchScore: 18 },
      feasibilityRating: 'High',
      estimatedTimelineMonths: 4,
      suggestedSolutionApproach: 'Implement a modular 5-ton cold chamber utilizing bio-based phase-change thermal bricks and off-grid solar micro-compressors.'
    }
  },
  {
    id: 'CH-2026-104',
    title: 'Recurrent Urban Flash Flooding & Storm-water Drain Siltation in Bellandur Corridor',
    description: 'During pre-monsoon downpours, primary storm-water drains (SWDs) overflow within 25 minutes of rain, stranding over 30,000 commuters and flooding ground-floor apartments. The primary cause is illegal construction debris dumping and silt accumulation at culvert pinch-points that are invisible until overflowing.',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    coordinates: { lat: 12.9352, lng: 77.6744 },
    domain: 'Urban Infrastructure',
    status: 'verified',
    priority: 'high',
    aiSuggestedPriority: 'high',
    officialPriority: 'high',
    submittedBy: {
      name: 'Karthik Narayanan',
      role: 'Urban Mobility Analyst',
      badge: 'Verified Citizen'
    },
    submittedAt: '2026-11-02T08:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    upvotes: 415,
    assignedUniversityId: 'UNI-IISC',
    assignedUniversityName: 'IISc Bangalore — Centre for Sustainable Technologies',
    governmentReview: {
      reviewedBy: 'BBMP Smart City Chief Engineer',
      reviewedAt: '2026-11-06T10:45:00Z',
      notes: 'Reviewed in coordination with Karnataka Disaster Management Authority. Identified 14 critical pinch points along ORR Bellandur basin.',
      allocatedGrantINR: 900000,
      officialPriority: 'high'
    },
    aiAnalysis: {
      domain: 'Urban Infrastructure',
      confidenceScore: 96,
      extractedKeywords: ['Storm-water', 'Inundation', 'Siltation', 'Culverts', 'Telemetry', 'Flood'],
      suggestedPriority: 'high',
      priorityRationale: 'Significant economic disruption and traffic gridlock impacting tech corridor and residential safety during monsoons.',
      requiredExpertise: ['Subsurface Ultrasonic Level Sensing', 'LoRaWAN Urban Mesh', 'Civil Hydrology', 'Computer Vision'],
      recommendedUniversities: [
        { name: 'IISc Bangalore', department: 'Centre for Sustainable Technologies', matchScore: 98, specialization: 'Urban Water Drainage Simulation' },
        { name: 'IIT Madras', department: 'Civil Engineering Dept', matchScore: 89, specialization: 'Urban Hydro-informatics' }
      ],
      potentialDuplicateRisk: { detected: false, highestMatchScore: 24 },
      feasibilityRating: 'High',
      estimatedTimelineMonths: 3,
      suggestedSolutionApproach: 'Install ultrasonic silt level radar sensors inside storm culverts broadcasting via municipal LoRaWAN to an early warning GIS dashboard.'
    }
  },
  {
    id: 'CH-2026-115',
    title: 'Severe Arsenic and Fluoride Contamination in Rural Drinking Borewells',
    description: 'Out of 28 village community borewells in Choutuppal and Narketpally blocks, 19 test at 3.8 mg/L fluoride (WHO safe limit is 1.0 mg/L). Over 450 school children display early-stage skeletal and dental fluorosis. Commercial RO plants waste 70% of groundwater, depleting the fragile water table.',
    district: 'Nalgonda',
    state: 'Telangana',
    coordinates: { lat: 17.0577, lng: 79.2684 },
    domain: 'Healthcare & Sanitation',
    status: 'submitted',
    priority: 'critical',
    aiSuggestedPriority: 'critical',
    officialPriority: 'critical',
    submittedBy: {
      name: 'B. Prabhakar Reddy',
      role: 'Gram Panchayat Sarpanch Representative',
      badge: 'Elected Civic Leader'
    },
    submittedAt: '2026-11-12T13:40:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80',
    upvotes: 520,
    aiAnalysis: {
      domain: 'Healthcare & Sanitation',
      confidenceScore: 97,
      extractedKeywords: ['Fluoride', 'Arsenic', 'Fluorosis', 'Borewell', 'Zero-Waste', 'Adsorption'],
      suggestedPriority: 'critical',
      priorityRationale: 'Irreversible pediatric skeletal fluorosis risk and severe public health epidemic affecting entire agrarian cluster.',
      requiredExpertise: ['Chemical Adsorption Media', 'Activated Alumina Tech', 'Nanomaterial Filtration', 'Public Health Epidemiology'],
      recommendedUniversities: [
        { name: 'IIT Madras', department: 'International Centre for Clean Water (ICCW)', matchScore: 99, specialization: 'Nanoscale Heavy Metal & Fluoride Removal' },
        { name: 'IIT Bombay', department: 'Environmental Science & Engineering', matchScore: 93, specialization: 'Zero-Waste Ion Exchange' }
      ],
      potentialDuplicateRisk: { detected: false, highestMatchScore: 15 },
      feasibilityRating: 'High',
      estimatedTimelineMonths: 4,
      suggestedSolutionApproach: 'Deploy zero-discharge activated alumina / bio-char adsorption filtration columns with automated periodic brine regeneration.'
    }
  },
  {
    id: 'CH-2026-128',
    title: 'Zero Cellular Connectivity and Lack of Educational Compute in Remote Border Schools',
    description: 'Students across 11 border hamlet schools in Changlang valley walk 9 km to catch a 2G mobile signal for downloading study materials and examination forms. Traditional fiber cannot be laid across difficult terrain and heavy monsoon landslides.',
    district: 'Changlang',
    state: 'Arunachal Pradesh',
    coordinates: { lat: 27.1245, lng: 95.7366 },
    domain: 'Education & Rural Tech',
    status: 'submitted',
    priority: 'medium',
    aiSuggestedPriority: 'medium',
    officialPriority: 'medium',
    submittedBy: {
      name: 'Tashi Wangchuk',
      role: 'Government High School Headmaster',
      badge: 'Rural Educator'
    },
    submittedAt: '2026-11-18T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    upvotes: 184,
    aiAnalysis: {
      domain: 'Education & Rural Tech',
      confidenceScore: 93,
      extractedKeywords: ['Connectivity', 'Intranet', 'Offline', 'Digital Divide', 'Solar', 'Curriculum'],
      suggestedPriority: 'medium',
      priorityRationale: 'Significant educational disparity affecting border tribal youths without immediate life danger.',
      requiredExpertise: ['Long-Range Wi-Fi / LoRa Meshes', 'Single-Board Computer Server Systems', 'Off-grid Solar UPS', 'Localized Open-Source LMS'],
      recommendedUniversities: [
        { name: 'IIT Guwahati', department: 'Centre for Rural Technology', matchScore: 97, specialization: 'North-East Terrain Wireless Meshes' },
        { name: 'NIT Silchar', department: 'Computer Science & Engineering', matchScore: 89, specialization: 'Offline EdTech Architectures' }
      ],
      potentialDuplicateRisk: { detected: false, highestMatchScore: 9 },
      feasibilityRating: 'High',
      estimatedTimelineMonths: 3,
      suggestedSolutionApproach: 'Deploy solar-powered micro-intranet towers running localized Raspberry Pi servers caching Wikipedia, DIKSHA, and Khan Academy.'
    }
  },
  {
    id: 'CH-2026-140',
    title: 'Hazardous Unsegregated Municipal Landfill Fires & Toxic Methane Release',
    description: 'The Bhalswa and Ghazipur landfill mounds experience spontaneous underground methane combustion during dry heat, blanketing over 400,000 residents in carcinogenic particulate matter (PM2.5 exceeding 650 ug/m3). Waste pickers work in life-threatening conditions without automated sorting or gas extraction safety.',
    district: 'North Delhi',
    state: 'Delhi NCR',
    coordinates: { lat: 28.7423, lng: 77.1689 },
    domain: 'Waste Management',
    status: 'verified',
    priority: 'critical',
    aiSuggestedPriority: 'critical',
    officialPriority: 'critical',
    submittedBy: {
      name: 'Mohd. Salim Akhtar',
      role: 'Civic Environmental Advocate',
      badge: 'Community Warden'
    },
    submittedAt: '2026-11-08T15:20:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80',
    upvotes: 610,
    assignedUniversityId: 'UNI-IITD',
    assignedUniversityName: 'IIT Delhi — Environmental Engineering Dept',
    linkedProjectId: 'PRJ-2026-03',
    governmentReview: {
      reviewedBy: 'Municipal Corporation Commissioner (Waste Dept)',
      reviewedAt: '2026-11-10T12:00:00Z',
      notes: 'Direct violation of NGT mandates. Required active university drone surveillance and methane thermal imaging.',
      allocatedGrantINR: 2000000,
      officialPriority: 'critical'
    },
    aiAnalysis: {
      domain: 'Waste Management',
      confidenceScore: 99,
      extractedKeywords: ['Methane', 'Landfill', 'Combustion', 'Pyrolysis', 'PM2.5', 'Gas Well'],
      suggestedPriority: 'critical',
      priorityRationale: 'Extreme air toxicity causing severe cardiovascular and pulmonary admissions in nearby tertiary hospitals.',
      requiredExpertise: ['Subsurface Gas Flare Extraction', 'Infrared Drone Thermography', 'Solid Waste Bio-mining', 'Hazardous Materials Handling'],
      recommendedUniversities: [
        { name: 'IIT Delhi', department: 'Civil & Environmental Engineering', matchScore: 98, specialization: 'Landfill Slope Stability & Gas Capture' },
        { name: 'IISc Bangalore', department: 'Centre for Sustainable Technologies', matchScore: 94, specialization: 'Waste-to-Energy Pyrolysis' }
      ],
      potentialDuplicateRisk: { detected: false, highestMatchScore: 11 },
      feasibilityRating: 'Medium',
      estimatedTimelineMonths: 6,
      suggestedSolutionApproach: 'Implement automated autonomous drone thermal patrol with pipe-in-well bio-methane negative pressure extraction.'
    }
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'PRJ-2026-01',
    challengeId: 'CH-2026-081',
    challengeTitle: 'Severe Toxic Chemical Froth & High TDS in Yamuna Canal Bypass',
    domain: 'Water Resources',
    title: 'Project Jal-Nirmal: Autonomous Bio-Enzymatic Froth Mitigation & IoT Telemetry Catamaran',
    abstract: 'An autonomous, solar-powered lightweight catamaran that patrols high-froth river channels, automatically dispensing calibrated indigenous bacterial consortia while logging optical TDS, phosphate, and dissolved oxygen to an open civic telemetry dashboard.',
    leadInstitution: 'IIT Delhi',
    department: 'Centre for Rural Development and Technology',
    facultyMentor: 'Prof. Anamika Vashisht, Ph.D.',
    startDate: '2026-10-28',
    estimatedCompletion: '2027-03-31',
    progressPercent: 68,
    status: 'field_testing',
    team: [
      { id: 'TM-1', name: 'Arnav Singhal', role: 'Student Team Lead & Robotics Engineer', institution: 'IIT Delhi' },
      { id: 'TM-2', name: 'Pooja Venkatesh', role: 'Biochemical Researcher', institution: 'IIT Delhi' },
      { id: 'TM-3', name: 'Kabir Mehta', role: 'IoT Firmware & LoRa Telemetry Lead', institution: 'IIT Delhi' },
      { id: 'TM-4', name: 'Dr. Anamika Vashisht', role: 'Faculty Principal Investigator', institution: 'IIT Delhi' }
    ],
    milestones: [
      { id: 'M1', title: 'Bio-enzymatic bacterial blend lab efficacy test (94% surfactant reduction)', description: 'Validated in controlled bench flume simulating Yamuna turbulence.', dueDate: '2026-11-10', status: 'completed' },
      { id: 'M2', title: 'Solar Catamaran hull fabrication & propulsion test', description: 'Dual brushless thrusters with dual 180W monocrystalline flexible solar skin.', dueDate: '2026-11-25', status: 'completed' },
      { id: 'M3', title: 'Okhla Barrage field telemetry deployment', description: 'Real-time telemetry stream live on municipal portal.', dueDate: '2026-12-15', status: 'in_progress' },
      { id: 'M4', title: 'Full autonomous 30-day river run & government handoff', description: 'Operational transfer to Delhi Jal Board maintenance crew.', dueDate: '2027-03-15', status: 'pending' }
    ],
    industryPartners: [
      {
        id: 'IND-01',
        name: 'Tata Sustainability & CSR Fund',
        type: 'Corporate CSR',
        contribution: '₹14,50,000 Hardware Grant + Field Testing Support',
        mentorAssigned: 'Siddharth Roy (VP Innovation, Tata Cleantech)'
      },
      {
        id: 'IND-02',
        name: 'AquaSensor Labs',
        type: 'Deeptech Startup',
        contribution: 'Complimentary Industrial Optical Spectrometry Sensor Modules'
      }
    ],
    contributions: [
      {
        id: 'CON-01',
        partnerName: 'Tata Sustainability & CSR Fund',
        partnerType: 'Corporate CSR',
        category: 'csr_grant',
        financialAmountINR: 1450000,
        resourceDetails: 'Hardware Grant + Field Testing Support',
        mentorName: 'Siddharth Roy (VP Innovation, Tata Cleantech)',
        timestamp: '2026-10-30T10:00:00Z'
      },
      {
        id: 'CON-02',
        partnerName: 'AquaSensor Labs',
        partnerType: 'Deeptech Startup',
        category: 'hardware',
        resourceDetails: 'Complimentary Industrial Optical Spectrometry Sensor Modules',
        timestamp: '2026-11-05T14:30:00Z'
      }
    ],
    allocatedGovtGrantINR: 1500000,
    totalIndustryFundingINR: 1450000,
    fundingReceivedINR: 2950000,
    fundingTargetINR: 3500000,
    githubUrl: 'https://github.com/jansetu-innovation/jal-nirmal-catamaran',
    demoUrl: 'https://telemetry.jansetu.gov.in/yamuna-kalindi',
    impactMetrics: {
      livesImpactedEstimate: 62000,
      areaCoveredKm2: 18.5,
      costReductionPercent: 74
    }
  },
  {
    id: 'PRJ-2026-02',
    challengeId: 'CH-2026-092',
    challengeTitle: 'High Post-Harvest Spoilage of Onions and Tomatoes Due to Lack of Decentralized Cold Storage',
    domain: 'Agriculture & Soil',
    title: 'KisanShitak: Phase-Change Thermal Micro Cold Storage for Marginal Farmers',
    abstract: 'A 5-ton decentralized cold storage unit utilizing non-toxic paraffin-salt-hydrate phase change bricks charged by off-grid 3.5 kWp solar arrays, providing up to 48 hours of constant 4°C cooling without battery chemical wear or grid backup.',
    leadInstitution: 'COEP Technological University, Pune',
    department: 'Department of Mechanical Engineering & IoT Hub',
    facultyMentor: 'Dr. Vivek Kulkarni',
    startDate: '2026-11-01',
    estimatedCompletion: '2027-02-28',
    progressPercent: 52,
    status: 'active',
    team: [
      { id: 'TM-5', name: 'Tanmay Shirke', role: 'Student Team Lead & Thermal Systems Designer', institution: 'COEP Pune' },
      { id: 'TM-6', name: 'Shruti Patil', role: 'PCM Chemistry & Material Analyst', institution: 'COEP Pune' },
      { id: 'TM-7', name: 'Kunal Jadhav', role: 'Microcontroller & Mobile App Lead', institution: 'COEP Pune' }
    ],
    milestones: [
      { id: 'M5', title: 'Phase-change material thermal cycle longevity validation (500 cycles)', description: 'Completed at COEP advanced heat transfer facility.', dueDate: '2026-11-15', status: 'completed' },
      { id: 'M6', title: '5-ton chamber structural prototype assembly in Yeola village', description: 'Farmers cooperative site prepared; insulated panels mounted.', dueDate: '2026-12-05', status: 'in_progress' },
      { id: 'M7', title: 'Kisan SMS mobile telemetry integration', description: 'SMS alert system for temperature and chamber capacity for 150 local farmers.', dueDate: '2027-01-15', status: 'pending' }
    ],
    industryPartners: [
      {
        id: 'IND-03',
        name: 'Mahindra Farm Equipment CSR',
        type: 'Corporate CSR',
        contribution: '₹12,00,000 Grant & Agro-fabrication Machinery Access',
        mentorAssigned: 'K. R. Venkatraman (Head of Rural Innovation)'
      }
    ],
    contributions: [
      {
        id: 'CON-03',
        partnerName: 'Mahindra Farm Equipment CSR',
        partnerType: 'Corporate CSR',
        category: 'csr_grant',
        financialAmountINR: 1200000,
        resourceDetails: 'Grant & Agro-fabrication Machinery Access',
        mentorName: 'K. R. Venkatraman (Head of Rural Innovation)',
        timestamp: '2026-11-04T11:00:00Z'
      }
    ],
    allocatedGovtGrantINR: 1200000,
    totalIndustryFundingINR: 1200000,
    fundingReceivedINR: 2400000,
    fundingTargetINR: 2500000,
    githubUrl: 'https://github.com/jansetu-innovation/kisanshitak-pcm',
    impactMetrics: {
      livesImpactedEstimate: 4200,
      areaCoveredKm2: 85,
      costReductionPercent: 62
    }
  },
  {
    id: 'PRJ-2026-03',
    challengeId: 'CH-2026-140',
    challengeTitle: 'Hazardous Unsegregated Municipal Landfill Fires & Toxic Methane Release',
    domain: 'Waste Management',
    title: 'AeroMethane: Thermal Drone Early-Extinguishment & Subsurface Well Extraction',
    abstract: 'Combining low-cost autonomous hexacopters equipped with thermal radiometric cameras and perforated negative-pressure methane suction pipes to suppress landfill subsurface fires within 12 minutes of flare-up.',
    leadInstitution: 'IIT Delhi',
    department: 'Civil & Environmental Engineering',
    facultyMentor: 'Prof. Manoj Datta',
    startDate: '2026-11-14',
    estimatedCompletion: '2027-04-30',
    progressPercent: 35,
    status: 'active',
    team: [
      { id: 'TM-8', name: 'Devendra Joshi', role: 'Student Drone Lead & Autopilot Developer', institution: 'IIT Delhi' },
      { id: 'TM-9', name: 'Meera Chawla', role: 'Atmospheric Gas Modeling Lead', institution: 'IIT Delhi' }
    ],
    milestones: [
      { id: 'M8', title: 'Thermal camera calibration on Ghazipur perimeter', description: 'Heat signature baseline mapped with municipal drone permissions.', dueDate: '2026-12-01', status: 'in_progress' },
      { id: 'M9', title: 'Perforated suction riser prototype', description: 'Fabrication of stainless high-temperature suction pipe.', dueDate: '2027-01-10', status: 'pending' }
    ],
    industryPartners: [
      {
        id: 'IND-04',
        name: 'Adani Green Climate Foundation',
        type: 'Corporate CSR',
        contribution: '₹25,00,000 Research Grant'
      }
    ],
    contributions: [
      {
        id: 'CON-04',
        partnerName: 'Adani Green Climate Foundation',
        partnerType: 'Corporate CSR',
        category: 'csr_grant',
        financialAmountINR: 0,
        resourceDetails: 'Pending pledge finalization',
        timestamp: '2026-11-16T15:00:00Z'
      }
    ],
    allocatedGovtGrantINR: 2000000,
    totalIndustryFundingINR: 0,
    fundingReceivedINR: 2000000,
    fundingTargetINR: 4500000,
    impactMetrics: {
      livesImpactedEstimate: 450000,
      areaCoveredKm2: 32,
      costReductionPercent: 55
    }
  }
];

export const DISTRICT_METRICS: DistrictMetric[] = [
  { district: 'South East Delhi', state: 'Delhi NCR', totalSubmissions: 78, verifiedCount: 54, activeProjects: 9, criticalIssues: 12 },
  { district: 'Bengaluru Urban', state: 'Karnataka', totalSubmissions: 142, verifiedCount: 110, activeProjects: 18, criticalIssues: 15 },
  { district: 'Nashik', state: 'Maharashtra', totalSubmissions: 64, verifiedCount: 48, activeProjects: 7, criticalIssues: 8 },
  { district: 'Nalgonda', state: 'Telangana', totalSubmissions: 41, verifiedCount: 29, activeProjects: 4, criticalIssues: 11 },
  { district: 'Pune', state: 'Maharashtra', totalSubmissions: 118, verifiedCount: 88, activeProjects: 14, criticalIssues: 9 },
  { district: 'Varanasi', state: 'Uttar Pradesh', totalSubmissions: 89, verifiedCount: 65, activeProjects: 11, criticalIssues: 14 },
  { district: 'Changlang', state: 'Arunachal Pradesh', totalSubmissions: 22, verifiedCount: 14, activeProjects: 3, criticalIssues: 4 },
  { district: 'Kamrup Metro (Guwahati)', state: 'Assam', totalSubmissions: 57, verifiedCount: 39, activeProjects: 6, criticalIssues: 7 },
  { district: 'Jaipur', state: 'Rajasthan', totalSubmissions: 76, verifiedCount: 52, activeProjects: 8, criticalIssues: 6 }
];

export const PLATFORM_STATS = {
  totalChallengesReported: 1845,
  verifiedProblems: 1320,
  activeUniversityProjects: 428,
  institutionsOnboarded: 164,
  industryPartnersPledged: 89,
  totalFundingPledgedINR: '₹48.6 Cr',
  communitiesImpacted: '3.4 Million+'
};
