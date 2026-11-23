export type StakeholderRole = 'citizen' | 'government' | 'university' | 'industry' | 'guest';

export type ChallengeDomain = 
  | 'Water Resources' 
  | 'Agriculture & Soil' 
  | 'Urban Infrastructure' 
  | 'Clean Energy' 
  | 'Healthcare & Sanitation' 
  | 'Education & Rural Tech' 
  | 'Waste Management'
  | 'Disaster Resilience';

export type ChallengeStatus = 
  | 'submitted' 
  | 'verified' 
  | 'in_progress' 
  | 'completed' 
  | 'rejected';

export type PriorityLevel = 'critical' | 'high' | 'medium' | 'low';

export type ContributionCategory = 
  | 'csr_grant' 
  | 'cloud_credits' 
  | 'hardware' 
  | 'mentorship';

export interface StructuredContribution {
  id: string;
  partnerName: string;
  partnerType: 'Corporate CSR' | 'Deeptech Startup' | 'Venture Fund' | 'Industry Lab';
  category: ContributionCategory;
  financialAmountINR?: number;
  resourceDetails: string;
  mentorName?: string;
  timestamp: string;
}

export interface AIAnalysisResult {
  domain: ChallengeDomain;
  confidenceScore: number;
  extractedKeywords: string[];
  suggestedPriority: PriorityLevel;
  priorityRationale: string;
  requiredExpertise: string[];
  recommendedUniversities: {
    name: string;
    department: string;
    matchScore: number;
    specialization: string;
  }[];
  potentialDuplicateRisk: {
    detected: boolean;
    highestMatchScore: number;
    similarChallengeTitle?: string;
    similarChallengeId?: string;
  };
  feasibilityRating: 'High' | 'Medium' | 'Complex';
  estimatedTimelineMonths: number;
  suggestedSolutionApproach: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  district: string;
  state: string;
  coordinates?: { lat: number; lng: number };
  domain: ChallengeDomain;
  status: ChallengeStatus;
  priority: PriorityLevel;
  aiSuggestedPriority?: PriorityLevel;
  officialPriority?: PriorityLevel;
  submittedBy: {
    name: string;
    avatar?: string;
    badge?: string;
    role: string;
  };
  submittedAt: string;
  imageUrl?: string;
  upvotes: number;
  hasUpvoted?: boolean;
  assignedUniversityId?: string;
  assignedUniversityName?: string;
  governmentReview?: {
    reviewedBy: string;
    reviewedAt: string;
    notes: string;
    allocatedGrantINR?: number;
    officialPriority?: PriorityLevel;
    rejectionReason?: string;
  };
  aiAnalysis: AIAnalysisResult;
  linkedProjectId?: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'in_progress' | 'pending';
  deliverableLink?: string;
}

export interface ProjectTeamMember {
  id: string;
  name: string;
  role: string; // e.g., 'Student Lead', 'Embedded Systems Researcher', 'Faculty Mentor'
  institution: string;
  avatar?: string;
}

export interface IndustryPartner {
  id: string;
  name: string;
  type: 'Corporate CSR' | 'Deeptech Startup' | 'Venture Fund' | 'Industry Lab';
  contribution: string; // Human-readable summary
  mentorAssigned?: string;
  logo?: string;
}

export interface Project {
  id: string;
  challengeId: string;
  challengeTitle: string;
  domain: ChallengeDomain;
  title: string;
  abstract: string;
  leadInstitution: string;
  department: string;
  facultyMentor: string;
  startDate: string;
  estimatedCompletion: string;
  progressPercent: number;
  status: 'active' | 'field_testing' | 'deployed' | 'review';
  team: ProjectTeamMember[];
  milestones: ProjectMilestone[];
  industryPartners: IndustryPartner[];
  contributions?: StructuredContribution[];
  allocatedGovtGrantINR?: number;
  totalIndustryFundingINR?: number;
  fundingReceivedINR: number;
  fundingTargetINR: number;
  githubUrl?: string;
  demoUrl?: string;
  impactMetrics: {
    livesImpactedEstimate: number;
    areaCoveredKm2: number;
    costReductionPercent: number;
  };
}

export interface DistrictMetric {
  district: string;
  state: string;
  totalSubmissions: number;
  verifiedCount: number;
  activeProjects: number;
  criticalIssues: number;
}
