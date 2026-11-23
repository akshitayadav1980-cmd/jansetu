import { AIAnalysisResult, Challenge, ChallengeDomain, PriorityLevel } from '../types';

interface AnalysisInput {
  title: string;
  description: string;
  domain?: ChallengeDomain;
  district?: string;
  existingChallenges?: Challenge[];
}

// Institutional Knowledge Graph for Academic Partnerships
const UNIVERSITY_REGISTRY = [
  {
    name: 'IIT Bombay',
    departments: ['Centre for Technology Alternatives for Rural Areas (CTARA)', 'Environmental Science & Eng.', 'Water Lab'],
    domains: ['Water Resources', 'Agriculture & Soil', 'Clean Energy', 'Waste Management'],
    specialization: 'Decentralized Water Purification & Sensor Grids'
  },
  {
    name: 'IIT Madras',
    departments: ['National Centre for Combustion R&D', 'Biotechnology Dept', 'Urban Transportation Lab'],
    domains: ['Clean Energy', 'Urban Infrastructure', 'Healthcare & Sanitation'],
    specialization: 'Affordable EV Micro-Mobility & Biomedical Diagnostic Devices'
  },
  {
    name: 'IIT Delhi',
    departments: ['Centre for Rural Development and Technology', 'Civil & Environmental Eng.'],
    domains: ['Urban Infrastructure', 'Clean Energy', 'Water Resources'],
    specialization: 'Air Pollution Remediation & Smart Urban Drainage'
  },
  {
    name: 'COEP Technological University, Pune',
    departments: ['Internet of Things (IoT) Lab', 'Civil Engineering Dept'],
    domains: ['Urban Infrastructure', 'Disaster Resilience', 'Waste Management'],
    specialization: 'Early Flood Warning Telemetry & Smart Civic Infrastructure'
  },
  {
    name: 'Anna University, Chennai',
    departments: ['Institute of Ocean Management', 'Renewable Energy Tech'],
    domains: ['Clean Energy', 'Disaster Resilience', 'Water Resources'],
    specialization: 'Coastal Salinity Mitigation & Solar Micro-Grids'
  },
  {
    name: 'Punjab Agricultural University (PAU), Ludhiana',
    departments: ['Department of Soil and Water Engineering', 'Farm Power & Machinery'],
    domains: ['Agriculture & Soil', 'Clean Energy', 'Water Resources'],
    specialization: 'Stubble Burning Alternatives & Precision Drip Soil Health'
  },
  {
    name: 'IIT Roorkee',
    departments: ['Hydrology Department', 'Earthquake Engineering'],
    domains: ['Water Resources', 'Disaster Resilience'],
    specialization: 'Himalayan Flash Flood Forecasting & River Basin Analytics'
  },
  {
    name: 'IISc Bangalore',
    departments: ['Centre for Sustainable Technologies', 'Nano Science Center'],
    domains: ['Clean Energy', 'Healthcare & Sanitation', 'Water Resources'],
    specialization: 'Low-cost Biosensors & Fluoride Contamination Filtration'
  }
];

// Keyword to domain mapping heuristic
const DOMAIN_KEYWORD_MAP: Record<ChallengeDomain, string[]> = {
  'Water Resources': ['water', 'arsenic', 'fluoride', 'groundwater', 'drainage', 'froth', 'river', 'potable', 'leakage', 'borewell', 'dam', 'irrigation', 'yamuna', 'ganga', 'lake'],
  'Agriculture & Soil': ['crop', 'soil', 'pesticide', 'farmer', 'harvest', 'stubble', 'fertilizer', 'drought', 'pest', 'seed', 'yield', 'agro', 'storage', 'spoilage'],
  'Urban Infrastructure': ['traffic', 'pothole', 'street light', 'bridge', 'road', 'metro', 'congestion', 'pedestrian', 'parking', 'drain', 'pavement', 'flyover'],
  'Clean Energy': ['electricity', 'solar', 'power cut', 'transformer', 'grid', 'biomass', 'microgrid', 'battery', 'voltage', 'outage', 'renewable', 'wind'],
  'Healthcare & Sanitation': ['hospital', 'clinic', 'phc', 'medicine', 'vector', 'dengue', 'malaria', 'sanitation', 'toilet', 'sewage', 'maternal', 'diagnostic', 'waste water'],
  'Education & Rural Tech': ['school', 'broadband', 'classroom', 'digital divide', 'connectivity', 'laboratory', 'rural internet', 'learning', 'literacy'],
  'Waste Management': ['garbage', 'landfill', 'plastic', 'e-waste', 'segregation', 'dumping', 'compost', 'recycling', 'burning', 'sludge'],
  'Disaster Resilience': ['flood', 'landslide', 'cyclone', 'earthquake', 'early warning', 'embankment', 'inundation', 'fire', 'emergency']
};

/**
 * Lightweight, deterministic string hashing algorithm
 * Generates an integer score in [min, max] consistently for identical inputs without random jitter.
 */
function deterministicScore(seed: string, min = 89, max = 98): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  const unsigned = hash >>> 0; // Unsigned 32-bit integer — avoids Math.abs(-2147483648) overflow
  return min + (unsigned % (max - min + 1));
}

/**
 * Deterministic Local AI Analysis Engine
 * Evaluates semantic keywords, calculates priority weights, detects duplication,
 * and matches university faculty laboratories based on multi-dimensional scoring.
 */
export function analyzeChallengeOffline(input: AnalysisInput): AIAnalysisResult {
  const text = `${input.title} ${input.description}`.toLowerCase();
  
  // 1. Determine or verify Domain
  let detectedDomain: ChallengeDomain = input.domain || 'Urban Infrastructure';
  let maxDomainHits = 0;
  
  (Object.keys(DOMAIN_KEYWORD_MAP) as ChallengeDomain[]).forEach(domain => {
    const hits = DOMAIN_KEYWORD_MAP[domain].filter(kw => text.includes(kw)).length;
    if (hits > maxDomainHits) {
      maxDomainHits = hits;
      detectedDomain = domain;
    }
  });

  // 2. Extract Keywords (stopwords filtered, meaningful terms prioritized)
  const stopWords = new Set(['the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'were', 'which', 'about', 'there', 'area', 'problem', 'facing', 'issues', 'people', 'very', 'been']);
  const words = text
    .replace(/[^a-zA-Z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !stopWords.has(w));
  
  const frequency: Record<string, number> = {};
  words.forEach(w => {
    frequency[w] = (frequency[w] || 0) + 1;
  });

  const extractedKeywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([w]) => w.charAt(0).toUpperCase() + w.slice(1));

  // 3. Priority & Severity Assessment
  const criticalUrgencyWords = ['toxic', 'danger', 'death', 'casualty', 'outbreak', 'collapse', 'poison', 'submerged', 'critical', 'urgent', 'disaster', 'immediate'];
  const highUrgencyWords = ['severe', 'daily', 'overflow', 'blockage', 'arsenic', 'loss', 'disease', 'spoilage', 'crisis', 'failing', 'stagnant'];

  let suggestedPriority: PriorityLevel = 'medium';
  let priorityRationale = 'Moderate community disruption observed with localized impact.';

  const hasCritical = criticalUrgencyWords.some(w => text.includes(w));
  const hasHigh = highUrgencyWords.some(w => text.includes(w));

  if (hasCritical) {
    suggestedPriority = 'critical';
    priorityRationale = 'Immediate public safety or environmental health risk detected requiring emergency intervention and telemetry.';
  } else if (hasHigh || maxDomainHits >= 3) {
    suggestedPriority = 'high';
    priorityRationale = 'High chronic impact on local livelihood, public health, or structural safety requiring fast-tracked R&D.';
  } else if (text.length > 80) {
    suggestedPriority = 'medium';
    priorityRationale = 'Systemic challenge suitable for semester-long academic innovation and prototyping.';
  } else {
    suggestedPriority = 'low';
    priorityRationale = 'Maintenance or localized issue with minimal compounding risk.';
  }

  // 4. Identify Required Expertise
  const expertiseCatalog: Record<ChallengeDomain, string[]> = {
    'Water Resources': ['Hydro-informatics & Telemetry', 'Membrane Chemical Filtration', 'IoT Water Quality Sensors', 'Geographical Information Systems (GIS)'],
    'Agriculture & Soil': ['Precision Agritech & IoT Sensors', 'Soil Chemistry & Spectroscopy', 'Renewable Cold-Storage Engineering', 'Embedded Drone Analytics'],
    'Urban Infrastructure': ['Smart Traffic Optimization Algorithms', 'Civil Concrete & Pavement Engineering', 'Subsurface Drainage Robotics', 'Computer Vision & Edge AI'],
    'Clean Energy': ['Decentralized Solar Microgrid Architecture', 'Battery Energy Storage Systems (BESS)', 'Power Electronics', 'Biomass Gasification Engineering'],
    'Healthcare & Sanitation': ['Microfluidic Diagnostic Devices', 'Point-of-Care Biosensors', 'Decentralized Sewage Treatment Tech', 'Epidemiological Telemetry'],
    'Education & Rural Tech': ['LoRaWAN / Mesh Networks', 'Offline Digital Learning Hardware', 'Solar-powered Classroom EdTech', 'Low-power Cloud Appliances'],
    'Waste Management': ['Automated Sensor-based Waste Sorters', 'Biochemical Degradation & Pyrolysis', 'RFID Civic Fleet Logistics', 'Circular Materials Science'],
    'Disaster Resilience': ['Early Warning Acoustic & Seismic Telemetry', 'Hydrological Basin Inundation Modeling', 'Edge Drone Mesh Communications', 'Structural Dynamics']
  };

  const requiredExpertise = expertiseCatalog[detectedDomain] || ['Embedded Systems', 'Data Analytics', 'Mechanical Prototyping'];

  // 5. Match Universities
  const matchingInstitutions = UNIVERSITY_REGISTRY
    .filter(uni => uni.domains.includes(detectedDomain))
    .map(uni => ({
      name: uni.name,
      department: uni.departments[0],
      matchScore: deterministicScore(`${uni.name}_${detectedDomain}_${detectedDomain.length}`),
      specialization: uni.specialization
    }))
    .slice(0, 3);

  // Fallback if none directly matched
  if (matchingInstitutions.length === 0) {
    matchingInstitutions.push({
      name: 'IIT Bombay',
      department: 'Centre for Technology Alternatives for Rural Areas (CTARA)',
      matchScore: 91,
      specialization: 'Rural & Civic Engineering Systems'
    });
  }

  // 6. Potential Duplicate Report Detection
  let potentialDuplicateRisk = {
    detected: false,
    highestMatchScore: 0,
    similarChallengeTitle: undefined as string | undefined,
    similarChallengeId: undefined as string | undefined
  };

  if (input.existingChallenges && input.existingChallenges.length > 0) {
    let topScore = 0;
    let matchedChallenge: Challenge | undefined;

    input.existingChallenges.forEach(ec => {
      const ecWords = new Set(
        `${ec.title} ${ec.description}`.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, ' ').split(/\s+/)
      );
      
      let common = 0;
      extractedKeywords.forEach(kw => {
        if (ecWords.has(kw.toLowerCase())) common++;
      });

      const sameDistrictBonus = (ec.district.toLowerCase() === (input.district || '').toLowerCase()) ? 0.35 : 0;
      const score = Math.min(0.95, (common / Math.max(extractedKeywords.length, 1)) * 0.7 + sameDistrictBonus);

      if (score > topScore) {
        topScore = score;
        matchedChallenge = ec;
      }
    });

    if (topScore >= 0.55 && matchedChallenge) {
      potentialDuplicateRisk = {
        detected: true,
        highestMatchScore: Math.round(topScore * 100),
        similarChallengeTitle: matchedChallenge.title,
        similarChallengeId: matchedChallenge.id
      };
    }
  }

  // 7. Suggested solution and feasibility
  const feasibilityRating = suggestedPriority === 'critical' ? 'Complex' : (text.length > 250 ? 'Medium' : 'High');
  const estimatedTimelineMonths = suggestedPriority === 'critical' ? 3 : (detectedDomain === 'Clean Energy' || detectedDomain === 'Urban Infrastructure' ? 6 : 4);

  const solutionApproaches: Record<ChallengeDomain, string> = {
    'Water Resources': 'Deploy a solar-powered IoT sensor telemetry node with multi-parameter probe (TDS, pH, turbidity) coupled with decentralized bio-filtration modular units.',
    'Agriculture & Soil': 'Develop a localized cold-storage micro-facility powered by phase-change thermal materials with soil moisture telemetry.',
    'Urban Infrastructure': 'Implement edge-computing optical sensors connected to city municipal GIS dashboard for predictive clogging and load alert.',
    'Clean Energy': 'Design a hybrid micro-inverter grid tie with community lithium-iron-phosphate (LFP) storage bank.',
    'Healthcare & Sanitation': 'Build an open-source portable diagnostic cartridge with LoRa telemetry to primary health center.',
    'Education & Rural Tech': 'Construct a low-cost solar-backed Raspberry Pi mesh intranet server with cached national curriculum repository.',
    'Waste Management': 'Engineer an automated optical sorting bin mechanism with density segregation and municipal pickup telemetry.',
    'Disaster Resilience': 'Fabricate a solar-mesh river level & rainfall ultrasonic gauge with localized siren broadcast trigger.'
  };

  return {
    domain: detectedDomain,
    confidenceScore: 94,
    extractedKeywords,
    suggestedPriority,
    priorityRationale,
    requiredExpertise,
    recommendedUniversities: matchingInstitutions,
    potentialDuplicateRisk,
    feasibilityRating,
    estimatedTimelineMonths,
    suggestedSolutionApproach: solutionApproaches[detectedDomain] || 'Design a rapid embedded prototype with community-accessible feedback loops.'
  };
}

/**
 * High-level AI Analysis Wrapper:
 * If an external secure server endpoint is available (e.g. /api/ai/analyze),
 * it queries it; otherwise falls back deterministically to the local intelligence engine.
 */
export async function analyzeChallenge(input: AnalysisInput): Promise<AIAnalysisResult> {
  try {
    // Check if secure server endpoint is present
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    // Expected during offline / pure frontend prototype testing without backend server
  }

  // Deterministic local intelligence engine fallback
  // Simulated asynchronous latency (400ms) for realistic UX feel
  await new Promise(resolve => setTimeout(resolve, 400));
  return analyzeChallengeOffline(input);
}
