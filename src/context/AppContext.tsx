import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  Challenge, 
  Project, 
  StakeholderRole, 
  DistrictMetric, 
  IndustryPartner, 
  ProjectMilestone,
  PriorityLevel,
  ContributionCategory,
  StructuredContribution
} from '../types';
import { INITIAL_CHALLENGES, INITIAL_PROJECTS, DISTRICT_METRICS } from '../services/mockData';

export interface UserPersona {
  role: StakeholderRole;
  name: string;
  title: string;
  organization: string;
  avatar: string;
  badge: string;
}

export const DEMO_PERSONAS: Record<StakeholderRole, UserPersona> = {
  citizen: {
    role: 'citizen',
    name: 'Ramesh K. Sharma',
    title: 'Community Lead & Resident',
    organization: 'South East Delhi Civic Forum',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    badge: 'Verified Citizen'
  },
  government: {
    role: 'government',
    name: 'Dr. Neha Swaminathan, IAS',
    title: 'Director, Urban Water & Innovation',
    organization: 'Ministry of Jal Shakti / Smart Cities Mission',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    badge: 'State Nodal Officer'
  },
  university: {
    role: 'university',
    name: 'Prof. Anamika Vashisht, Ph.D.',
    title: 'Principal Investigator & Faculty Dean',
    organization: 'IIT Delhi — Rural Tech & Water Lab',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=150&q=80',
    badge: 'R&D Principal Lead'
  },
  industry: {
    role: 'industry',
    name: 'Siddharth Roy',
    title: 'VP Innovation & ESG Investments',
    organization: 'Tata Sustainability & Deeptech Capital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    badge: 'CSR Partner'
  },
  guest: {
    role: 'guest',
    name: 'Guest Observer',
    title: 'Visiting Delegate',
    organization: 'JanSetu Innovation Network',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    badge: 'Observer'
  }
};

interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

// Collision-resistant ID generator using native high-entropy timestamp + random hex
export const generateId = (prefix: 'CH' | 'PRJ' | 'CON' | 'TM' | 'M'): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-2026-${timestamp}-${randomSuffix}`;
};

// Safe LocalStorage helpers with try/catch error handling
function safeStorageGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[JanSetu Storage] Failed to load key "${key}" from LocalStorage. Using fallback.`, err);
    return fallback;
  }
}

function safeStorageSet<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`[JanSetu Storage] QuotaExceeded or write error for key "${key}".`, err);
    return false;
  }
}

interface AppContextType {
  challenges: Challenge[];
  projects: Project[];
  districtMetrics: DistrictMetric[];
  dynamicDistrictMetrics: DistrictMetric[];
  activePersona: UserPersona;
  toasts: ToastNotification[];
  setActivePersonaRole: (role: StakeholderRole) => void;
  showToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;
  addChallenge: (challengeData: Omit<Challenge, 'id' | 'submittedAt' | 'upvotes' | 'status'>) => Challenge;
  upvoteChallenge: (challengeId: string) => void;
  verifyChallenge: (
    challengeId: string, 
    officialPriority: PriorityLevel, 
    notes: string, 
    grantINR?: number, 
    assignUniId?: string, 
    assignUniName?: string
  ) => void;
  rejectChallenge: (challengeId: string, notes: string) => void;
  createProjectProposal: (
    challengeId: string,
    proposal: {
      title: string;
      abstract: string;
      leadInstitution: string;
      department: string;
      facultyMentor: string;
      studentLeadName: string;
      targetBudgetINR: number;
    }
  ) => Project | null;
  pledgeIndustryFunding: (
    projectId: string,
    partnerName: string,
    partnerType: IndustryPartner['type'],
    amountINR: number,
    resourcesOffered: string,
    mentorName?: string,
    category?: ContributionCategory
  ) => void;
  updateMilestoneStatus: (projectId: string, milestoneId: string, status: ProjectMilestone['status']) => void;
  addMilestone: (projectId: string, milestone: Omit<ProjectMilestone, 'id'>) => void;
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    return safeStorageGet<Challenge[]>('jansetu_challenges_v1', INITIAL_CHALLENGES);
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    return safeStorageGet<Project[]>('jansetu_projects_v1', INITIAL_PROJECTS);
  });

  const [activePersona, setActivePersona] = useState<UserPersona>(() => {
    const savedRole = localStorage.getItem('jansetu_active_role') as StakeholderRole;
    return DEMO_PERSONAS[savedRole] || DEMO_PERSONAS.citizen;
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // LocalStorage automated syncing with safe error capture
  useEffect(() => {
    safeStorageSet('jansetu_challenges_v1', challenges);
  }, [challenges]);

  useEffect(() => {
    safeStorageSet('jansetu_projects_v1', projects);
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('jansetu_active_role', activePersona.role);
    } catch (e) {
      // Ignored
    }
  }, [activePersona]);

  // Multi-Tab LocalStorage Synchronization Listener
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key) return;

      if (e.key === 'jansetu_challenges_v1') {
        if (e.newValue === null) {
          setChallenges(INITIAL_CHALLENGES);
        } else {
          try {
            const parsed = JSON.parse(e.newValue);
            if (Array.isArray(parsed)) {
              setChallenges(parsed);
            }
          } catch (err) {
            console.warn('[JanSetu Multi-Tab Sync] Failed to parse challenges from storage event', err);
          }
        }
      } else if (e.key === 'jansetu_projects_v1') {
        if (e.newValue === null) {
          setProjects(INITIAL_PROJECTS);
        } else {
          try {
            const parsed = JSON.parse(e.newValue);
            if (Array.isArray(parsed)) {
              setProjects(parsed);
            }
          } catch (err) {
            console.warn('[JanSetu Multi-Tab Sync] Failed to parse projects from storage event', err);
          }
        }
      } else if (e.key === 'jansetu_active_role') {
        if (e.newValue && DEMO_PERSONAS[e.newValue as StakeholderRole]) {
          setActivePersona(DEMO_PERSONAS[e.newValue as StakeholderRole]);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const showToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const setActivePersonaRole = (role: StakeholderRole) => {
    setActivePersona(DEMO_PERSONAS[role] || DEMO_PERSONAS.citizen);
    showToast('Switched Persona', `Now browsing JanSetu as ${DEMO_PERSONAS[role]?.name} (${DEMO_PERSONAS[role]?.title})`, 'info');
  };

  // Dynamically compute real district analytics from the live challenges array
  const dynamicDistrictMetrics = useMemo<DistrictMetric[]>(() => {
    const map = new Map<string, { total: number; verified: number; active: number; critical: number; state: string }>();

    // Seed with baseline districts
    DISTRICT_METRICS.forEach(dm => {
      map.set(dm.district, {
        total: 0,
        verified: 0,
        active: 0,
        critical: 0,
        state: dm.state
      });
    });

    challenges.forEach(c => {
      const existing = map.get(c.district) || { total: 0, verified: 0, active: 0, critical: 0, state: c.state };
      existing.total += 1;
      if (c.status === 'verified' || c.status === 'in_progress' || c.status === 'completed') {
        existing.verified += 1;
      }
      if (c.status === 'in_progress') {
        existing.active += 1;
      }
      if (c.priority === 'critical' || c.officialPriority === 'critical' || c.aiSuggestedPriority === 'critical') {
        existing.critical += 1;
      }
      map.set(c.district, existing);
    });

    return Array.from(map.entries()).map(([district, stats]) => ({
      district,
      state: stats.state,
      totalSubmissions: stats.total,
      verifiedCount: stats.verified,
      activeProjects: stats.active,
      criticalIssues: stats.critical
    }));
  }, [challenges]);

  // Citizen submission
  const addChallenge = (challengeData: Omit<Challenge, 'id' | 'submittedAt' | 'upvotes' | 'status'>): Challenge => {
    const newId = generateId('CH');
    const aiPriority = challengeData.aiAnalysis.suggestedPriority || 'medium';

    const newChallenge: Challenge = {
      ...challengeData,
      id: newId,
      status: 'submitted',
      priority: aiPriority,
      aiSuggestedPriority: aiPriority,
      officialPriority: aiPriority,
      submittedAt: new Date().toISOString(),
      upvotes: 1,
      hasUpvoted: true
    };

    setChallenges(prev => [newChallenge, ...prev]);
    showToast('Challenge Submitted', `ID: ${newId} registered and passed to AI triage & district nodal desk.`, 'success');
    return newChallenge;
  };

  // Community upvoting
  const upvoteChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        const hasUpvoted = !c.hasUpvoted;
        return {
          ...c,
          hasUpvoted,
          upvotes: hasUpvoted ? c.upvotes + 1 : Math.max(0, c.upvotes - 1)
        };
      }
      return c;
    }));
  };

  // Government verification: sets official priority, allocated grant, university mandate, audit notes
  const verifyChallenge = (
    challengeId: string, 
    officialPriority: PriorityLevel,
    notes: string, 
    grantINR: number = 1000000, 
    assignUniId?: string, 
    assignUniName?: string
  ) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        // Enforce rule: only submitted challenges can transition to verified
        if (c.status !== 'submitted' && c.status !== 'verified') {
          showToast('Status Error', `Challenge is currently ${c.status} and cannot be reverified.`, 'warning');
          return c;
        }

        const universityName = assignUniName || `${c.aiAnalysis.recommendedUniversities[0]?.name} — ${c.aiAnalysis.recommendedUniversities[0]?.department}`;
        const universityId = assignUniId || c.aiAnalysis.recommendedUniversities[0]?.name;

        return {
          ...c,
          status: 'verified',
          priority: officialPriority, // Authoritative priority
          officialPriority,
          assignedUniversityId: universityId,
          assignedUniversityName: universityName,
          governmentReview: {
            reviewedBy: activePersona.name,
            reviewedAt: new Date().toISOString(),
            notes,
            allocatedGrantINR: grantINR,
            officialPriority
          }
        };
      }
      return c;
    }));
    showToast('Challenge Verified', `Challenge ${challengeId} verified at priority [${officialPriority.toUpperCase()}] with allocated grant ₹${(grantINR / 100000).toFixed(1)} Lakhs.`, 'success');
  };

  // Government rejection: blocks from entering university workflow
  const rejectChallenge = (challengeId: string, notes: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          status: 'rejected',
          governmentReview: {
            reviewedBy: activePersona.name,
            reviewedAt: new Date().toISOString(),
            notes,
            rejectionReason: notes
          }
        };
      }
      return c;
    }));
    showToast('Challenge Rejected', `Challenge marked as rejected/ineligible. Recorded statutory justification.`, 'warning');
  };

  // University creates proposal: strictly requires challenge to be verified and unadopted
  const createProjectProposal = (
    challengeId: string,
    proposal: {
      title: string;
      abstract: string;
      leadInstitution: string;
      department: string;
      facultyMentor: string;
      studentLeadName: string;
      targetBudgetINR: number;
    }
  ): Project | null => {
    const parentChallenge = challenges.find(c => c.id === challengeId);

    if (!parentChallenge) {
      showToast('Error', 'Parent challenge record not found.', 'error');
      return null;
    }

    // Integrity Rule 4: Only verified challenges can be accepted
    if (parentChallenge.status !== 'verified') {
      showToast('Gatekeeping Violation', 'Only government-verified challenges can be accepted for academic research proposals.', 'error');
      return null;
    }

    // Integrity Rule 2: Prevent duplicate project relationships
    if (parentChallenge.linkedProjectId) {
      showToast('Duplicate Link Blocked', `This challenge is already linked to Project ${parentChallenge.linkedProjectId}.`, 'error');
      return null;
    }

    const newProjectId = generateId('PRJ');
    const inheritedGovtGrant = parentChallenge.governmentReview?.allocatedGrantINR || 500000;
    
    const newProject: Project = {
      id: newProjectId,
      challengeId,
      challengeTitle: parentChallenge.title,
      domain: parentChallenge.domain,
      title: proposal.title,
      abstract: proposal.abstract,
      leadInstitution: proposal.leadInstitution,
      department: proposal.department,
      facultyMentor: proposal.facultyMentor,
      startDate: new Date().toISOString().split('T')[0],
      estimatedCompletion: new Date(Date.now() + 180 * 24 * 3600 * 1000).toISOString().split('T')[0],
      progressPercent: 0,
      status: 'active',
      team: [
        {
          id: generateId('TM'),
          name: proposal.studentLeadName,
          role: 'Student Lead Researcher',
          institution: proposal.leadInstitution
        },
        {
          id: generateId('TM'),
          name: proposal.facultyMentor,
          role: 'Faculty Mentor & PI',
          institution: proposal.leadInstitution
        }
      ],
      milestones: [
        {
          id: generateId('M'),
          title: 'Problem Definition & Stakeholder Field Survey',
          description: 'Gather localized ground data from affected municipal wards and analyze baseline parameters.',
          dueDate: new Date(Date.now() + 20 * 24 * 3600 * 1000).toISOString().split('T')[0],
          status: 'in_progress'
        },
        {
          id: generateId('M'),
          title: 'Proof-of-Concept Bench Prototype Fabrication',
          description: 'Construct alpha hardware unit and calibrate initial sensor telemetry.',
          dueDate: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString().split('T')[0],
          status: 'pending'
        },
        {
          id: generateId('M'),
          title: 'Field Pilot Deployment & Community Validation',
          description: 'Deploy prototype at target location with municipal authority sign-off.',
          dueDate: new Date(Date.now() + 120 * 24 * 3600 * 1000).toISOString().split('T')[0],
          status: 'pending'
        }
      ],
      industryPartners: [],
      contributions: [],
      allocatedGovtGrantINR: inheritedGovtGrant,
      totalIndustryFundingINR: 0,
      fundingReceivedINR: inheritedGovtGrant, // Inherits government grant into initial funding
      fundingTargetINR: proposal.targetBudgetINR || 2000000,
      impactMetrics: {
        livesImpactedEstimate: 5000,
        areaCoveredKm2: 10,
        costReductionPercent: 50
      }
    };

    setProjects(prev => [newProject, ...prev]);

    // Synchronize parent challenge: set status to 'in_progress' and link newProjectId
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId) {
        return {
          ...c,
          status: 'in_progress',
          linkedProjectId: newProjectId,
          assignedUniversityName: proposal.leadInstitution
        };
      }
      return c;
    }));

    showToast('Project Proposal Launched', `Project ${newProjectId} initialized with inherited Govt Grant of ₹${(inheritedGovtGrant / 100000).toFixed(1)} Lakhs.`, 'success');
    return newProject;
  };

  // Industry contribution: supports 4 categories, accurately calculates monetary vs non-monetary capital
  const pledgeIndustryFunding = (
    projectId: string,
    partnerName: string,
    partnerType: IndustryPartner['type'],
    amountINR: number,
    resourcesOffered: string,
    mentorName?: string,
    category: ContributionCategory = 'csr_grant'
  ) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        // Is this a financial grant?
        const isFinancial = category === 'csr_grant';
        const financialContribution = isFinancial ? Math.max(0, amountINR) : 0;

        const newContribution: StructuredContribution = {
          id: generateId('CON'),
          partnerName,
          partnerType,
          category,
          financialAmountINR: financialContribution,
          resourceDetails: resourcesOffered,
          mentorName,
          timestamp: new Date().toISOString()
        };

        const existingContributions = p.contributions || [];
        const updatedContributions = [...existingContributions, newContribution];

        // Format legacy display string for backward compatibility
        const categoryLabels: Record<ContributionCategory, string> = {
          csr_grant: `₹${(financialContribution / 100000).toFixed(1)}L CSR Grant`,
          cloud_credits: 'Cloud Compute Credits',
          hardware: 'Hardware & Lab Equipment',
          mentorship: 'Executive Mentorship'
        };

        const legacySummary = isFinancial
          ? `₹${(financialContribution / 100000).toFixed(1)} Lakhs Grant + ${resourcesOffered}`
          : `${categoryLabels[category]} (${resourcesOffered})`;

        const newPartner: IndustryPartner = {
          id: generateId('CON'),
          name: partnerName,
          type: partnerType,
          contribution: legacySummary,
          mentorAssigned: mentorName
        };

        const updatedIndustryFunding = (p.totalIndustryFundingINR || 0) + financialContribution;
        const updatedFundingReceived = (p.allocatedGovtGrantINR || 0) + updatedIndustryFunding;

        return {
          ...p,
          totalIndustryFundingINR: updatedIndustryFunding,
          fundingReceivedINR: updatedFundingReceived,
          industryPartners: [...p.industryPartners, newPartner],
          contributions: updatedContributions
        };
      }
      return p;
    }));

    const message = category === 'csr_grant'
      ? `Successfully pledged ₹${(amountINR / 100000).toFixed(1)} Lakhs CSR Grant to Project ${projectId}!`
      : `Successfully contributed ${category.replace('_', ' ')} to Project ${projectId}!`;

    showToast('Sponsorship Recorded', message, 'success');
  };

  // Milestone update: recalculates progress percent and synchronizes parent challenge completion
  const updateMilestoneStatus = (projectId: string, milestoneId: string, status: ProjectMilestone['status']) => {
    let linkedChallengeId: string | undefined;
    let isFullyDeployed = false;

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        linkedChallengeId = p.challengeId;
        const updatedMilestones = p.milestones.map(m => m.id === milestoneId ? { ...m, status } : m);
        const completedCount = updatedMilestones.filter(m => m.status === 'completed').length;
        const progressPercent = Math.round((completedCount / updatedMilestones.length) * 100);
        isFullyDeployed = progressPercent === 100;

        return {
          ...p,
          milestones: updatedMilestones,
          progressPercent,
          status: isFullyDeployed ? 'deployed' : (progressPercent > 40 ? 'field_testing' : 'active')
        };
      }
      return p;
    }));

    // Synchronize parent challenge if all milestones reached 100%, or revert if reset
    if (linkedChallengeId) {
      setChallenges(prev => prev.map(c => {
        if (c.id === linkedChallengeId) {
          if (isFullyDeployed) {
            return {
              ...c,
              status: 'completed'
            };
          } else if (c.status === 'completed') {
            // Milestone was reset from 100% completed, revert challenge to in_progress
            return {
              ...c,
              status: 'in_progress'
            };
          }
        }
        return c;
      }));

      if (isFullyDeployed) {
        showToast('Project Deployed', `All milestones complete! Project and parent challenge marked as [COMPLETED/DEPLOYED].`, 'success');
      } else {
        showToast('Milestone Updated', 'Project milestone status and overall progress recalculated.', 'info');
      }
    } else {
      showToast('Milestone Updated', 'Project milestone status and overall progress recalculated.', 'info');
    }
  };

  // Append new milestone deliverable
  const addMilestone = (projectId: string, milestone: Omit<ProjectMilestone, 'id'>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newM: ProjectMilestone = {
          ...milestone,
          id: generateId('M')
        };
        const updatedMilestones = [...p.milestones, newM];
        const completedCount = updatedMilestones.filter(m => m.status === 'completed').length;
        const progressPercent = Math.round((completedCount / updatedMilestones.length) * 100);

        return {
          ...p,
          milestones: updatedMilestones,
          progressPercent
        };
      }
      return p;
    }));
    showToast('Milestone Added', 'New project deliverable milestone appended.', 'success');
  };

  // Reset to pristine seed dataset
  const resetToSampleData = () => {
    setChallenges(INITIAL_CHALLENGES);
    setProjects(INITIAL_PROJECTS);
    try {
      localStorage.removeItem('jansetu_challenges_v1');
      localStorage.removeItem('jansetu_projects_v1');
    } catch (e) {
      // Ignored
    }
    showToast('Demonstration State Reset', 'Restored pristine challenge repository and project pipelines.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        challenges,
        projects,
        districtMetrics: DISTRICT_METRICS,
        dynamicDistrictMetrics,
        activePersona,
        toasts,
        setActivePersonaRole,
        showToast,
        dismissToast,
        addChallenge,
        upvoteChallenge,
        verifyChallenge,
        rejectChallenge,
        createProjectProposal,
        pledgeIndustryFunding,
        updateMilestoneStatus,
        addMilestone,
        resetToSampleData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
