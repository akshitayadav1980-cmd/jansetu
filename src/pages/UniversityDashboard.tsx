import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Challenge, Project } from '../types';
import { PriorityBadge, DomainBadge, StatusBadge } from '../components/ui/Badge';
import { ProjectCard } from '../components/shared/ProjectCard';
import { 
  GraduationCap, 
  Sparkles, 
  Users, 
  Award, 
  PlusCircle, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  FolderGit2, 
  FileText,
  DollarSign
} from 'lucide-react';

export const UniversityDashboard: React.FC = () => {
  const { challenges, projects, createProjectProposal, activePersona } = useApp();

  const [activeTab, setActiveTab] = useState<'recommended' | 'active_projects'>('recommended');
  const [selectedChallengeToAccept, setSelectedChallengeToAccept] = useState<Challenge | null>(null);
  const [projectFilterScope, setProjectFilterScope] = useState<'my_institution' | 'all'>('my_institution');

  // Proposal modal form state
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalAbstract, setProposalAbstract] = useState('');
  const [leadInstitution, setLeadInstitution] = useState(activePersona.organization || 'IIT Delhi');
  const [department, setDepartment] = useState('Centre for Technology Alternatives & Water Systems');
  const [facultyMentor, setFacultyMentor] = useState(activePersona.name || 'Prof. Anamika Vashisht, Ph.D.');
  const [studentLeadName, setStudentLeadName] = useState('Arnav Singhal (B.Tech Final Year)');
  const [budgetINR, setBudgetINR] = useState(2500000);

  // Helper to match active persona institution
  const isMyInstitution = (leadInst: string) => {
    if (!activePersona.organization) return true;
    const org = activePersona.organization.toLowerCase();
    const inst = leadInst.toLowerCase();
    const baseOrg = org.split('—')[0].split('-')[0].trim();
    return org.includes(inst) || inst.includes(baseOrg);
  };

  // Count & filter institution projects
  const myInstitutionProjects = projects.filter(p => isMyInstitution(p.leadInstitution));
  const displayedProjects = projectFilterScope === 'my_institution' ? myInstitutionProjects : projects;

  // Recommended challenges (verified by Government and ready for university R&D adoption)
  const availableChallenges = challenges.filter(c => c.status === 'verified');

  const handleOpenProposal = (c: Challenge) => {
    setSelectedChallengeToAccept(c);
    setProposalTitle(`Project Innovation: ${c.title}`);
    setProposalAbstract(
      `Development of an engineering proof-of-concept addressing ${c.title.toLowerCase()}. Focus on ${c.aiAnalysis.requiredExpertise.slice(0, 2).join(' and ')} to deliver a field-validated telemetry and physical prototype.`
    );
  };

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedChallengeToAccept) return;

    const newProject = createProjectProposal(selectedChallengeToAccept.id, {
      title: proposalTitle,
      abstract: proposalAbstract,
      leadInstitution,
      department,
      facultyMentor,
      studentLeadName,
      targetBudgetINR: budgetINR
    });

    if (newProject) {
      setSelectedChallengeToAccept(null);
      setActiveTab('active_projects');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* University Header */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 bg-navy-950/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">University R&D Portal</h1>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                Academic Lab Hub
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Faculty Lead: <span className="text-white font-medium">{activePersona.name}</span> • {activePersona.organization}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'recommended'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Available Challenges ({availableChallenges.length})
          </button>
          <button
            onClick={() => setActiveTab('active_projects')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'active_projects'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
          >
            Active R&D Projects ({projects.length})
          </button>
        </div>
      </div>

      {/* Recommended Challenges Tab */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Curated Societal Challenges for University Research
              </h2>
              <p className="text-xs text-slate-400">
                Challenges filtered by AI to match departmental laboratories, eligible for Government seed grants and CSR sponsorship.
              </p>
            </div>
            <span className="text-xs text-cyan-400 font-mono">
              {availableChallenges.length} Challenges Ready for Proposal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableChallenges.map(c => {
              const topUni = c.aiAnalysis.recommendedUniversities[0];
              return (
                <div key={c.id} className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <DomainBadge domain={c.domain} />
                      <PriorityBadge priority={c.priority} />
                    </div>

                    <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                      {c.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {c.description}
                    </p>

                    {/* AI Match Fit Badge */}
                    <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs space-y-1">
                      <div className="flex items-center justify-between text-cyan-300 font-semibold">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>AI Lab Alignment: {topUni?.name || 'Department Match'}</span>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-bold">
                          {topUni?.matchScore || 92}% Match
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Expertise: {c.aiAnalysis.requiredExpertise.slice(0, 2).join(', ')}
                      </div>
                    </div>

                    {c.governmentReview?.allocatedGrantINR && (
                      <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Pre-allocated Govt Grant: ₹{(c.governmentReview.allocatedGrantINR / 100000).toFixed(1)} Lakhs</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">{c.district}</span>
                    <button
                      onClick={() => handleOpenProposal(c)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Accept & Propose R&D</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Academic Projects Tab */}
      {activeTab === 'active_projects' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Active University Innovation Projects
              </h2>
              <p className="text-xs text-slate-400">
                Prototypes in development with student teams, faculty mentors, and milestones.
              </p>
            </div>

            {/* Scope Toggle: My Institution Projects vs All National R&D Projects */}
            <div className="flex items-center gap-2">
              <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold">
                <button
                  onClick={() => setProjectFilterScope('my_institution')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    projectFilterScope === 'my_institution'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  My Institution Projects ({myInstitutionProjects.length})
                </button>
                <button
                  onClick={() => setProjectFilterScope('all')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    projectFilterScope === 'all'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All National R&D ({projects.length})
                </button>
              </div>
            </div>
          </div>

          {displayedProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map(p => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          ) : (
            <div className="p-12 sm:p-16 rounded-2xl glass-panel text-center space-y-4 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">
                  No Active R&D Projects for {activePersona.organization || 'Your Institution'}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Browse verified community challenges awaiting academic research proposals, or view projects launched across other universities.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('recommended')}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-lg shadow-blue-500/20"
                >
                  Browse Available Challenges
                </button>
                <button
                  onClick={() => setProjectFilterScope('all')}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold border border-white/10"
                >
                  View All National Projects
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Proposal Modal */}
      {selectedChallengeToAccept && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-2xl w-full rounded-2xl glass-panel p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold">
                  Accepting Challenge {selectedChallengeToAccept.id}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">Submit University R&D Proposal</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Register capstone student team and faculty mentor to receive project allocation.
                </p>
              </div>
              <button
                onClick={() => setSelectedChallengeToAccept(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProposalSubmit} className="space-y-4 text-xs">
              
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={proposalTitle}
                  onChange={e => setProposalTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                  Technical Abstract & Prototyping Methodology *
                </label>
                <textarea
                  rows={4}
                  value={proposalAbstract}
                  onChange={e => setProposalAbstract(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white leading-relaxed"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Lead Institution *
                  </label>
                  <input
                    type="text"
                    value={leadInstitution}
                    onChange={e => setLeadInstitution(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Department / Laboratory *
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Faculty Mentor & PI *
                  </label>
                  <input
                    type="text"
                    value={facultyMentor}
                    onChange={e => setFacultyMentor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Student Team Lead *
                  </label>
                  <input
                    type="text"
                    value={studentLeadName}
                    onChange={e => setStudentLeadName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                  Estimated Innovation Budget (INR) *
                </label>
                <input
                  type="number"
                  step={100000}
                  value={budgetINR}
                  onChange={e => setBudgetINR(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                  required
                />
                <span className="text-[11px] text-emerald-400 font-semibold">
                  Target: ₹{(budgetINR / 100000).toFixed(1)} Lakhs
                </span>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedChallengeToAccept(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-blue-500/20"
                >
                  Confirm & Launch R&D Project
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
