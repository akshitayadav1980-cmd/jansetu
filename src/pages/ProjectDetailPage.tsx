import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { DomainBadge } from '../components/ui/Badge';
import { ProjectMilestone } from '../types';
import { 
  ArrowLeft, 
  GraduationCap, 
  Building2, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  DollarSign, 
  PlusCircle, 
  Heart,
  TrendingUp,
  MapPin,
  FolderGit2,
  FileText
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects, updateMilestoneStatus, addMilestone, challenges } = useApp();

  const [isAddMilestoneOpen, setIsAddMilestoneOpen] = useState(false);
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('');
  const [newMilestoneDesc, setNewMilestoneDesc] = useState('');
  const [newMilestoneDate, setNewMilestoneDate] = useState('');

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Project Not Found</h2>
        <p className="text-slate-400 text-sm">The project ID "{id}" does not exist in the active collaboration pipeline.</p>
        <Link to="/projects" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
          Return to Projects Hub
        </Link>
      </div>
    );
  }

  const parentChallenge = challenges.find(c => c.id === project.challengeId);
  const fundingPercent = Math.min(100, Math.round((project.fundingReceivedINR / project.fundingTargetINR) * 100));

  const handleMilestoneToggle = (milestoneId: string, currentStatus: ProjectMilestone['status']) => {
    let nextStatus: ProjectMilestone['status'];
    if (currentStatus === 'pending') {
      nextStatus = 'in_progress';
    } else if (currentStatus === 'in_progress') {
      nextStatus = 'completed';
    } else {
      nextStatus = 'pending';
    }
    updateMilestoneStatus(project.id, milestoneId, nextStatus);
  };

  const handleAddMilestoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle) return;

    addMilestone(project.id, {
      title: newMilestoneTitle,
      description: newMilestoneDesc || 'Technical prototyping deliverable.',
      dueDate: newMilestoneDate || new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString().split('T')[0],
      status: 'pending'
    });

    setNewMilestoneTitle('');
    setNewMilestoneDesc('');
    setIsAddMilestoneOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects Workspace</span>
        </Link>

        {parentChallenge && (
          <Link
            to={`/challenges/${parentChallenge.id}`}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            View Parent Challenge Dossier →
          </Link>
        )}
      </div>

      {/* Hero Workspace Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 border border-white/10">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 font-bold bg-navy-900 px-2.5 py-0.5 rounded border border-white/10">
              {project.id}
            </span>
            <DomainBadge domain={project.domain} />
          </div>

          <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
            Status: {project.status.replace('_', ' ')}
          </span>
        </div>

        {/* Project Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-snug">
          {project.title}
        </h1>

        {/* Institution & PI Banner */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span><strong className="text-white">{project.leadInstitution}</strong> • {project.department}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>Faculty PI: <strong className="text-slate-200">{project.facultyMentor}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>Target Deployment: {project.estimatedCompletion}</span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="p-5 rounded-2xl bg-navy-900/60 border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">
              Prototyping & Field Testing Roadmap Progress
            </span>
            <span className="text-cyan-400 font-extrabold text-sm">{project.progressPercent}% Complete</span>
          </div>
          <div className="w-full h-3 rounded-full bg-navy-950 border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>

      </div>

      {/* Main Grid: Milestones & Team/Funding */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Abstract & Interactive Milestones */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Abstract */}
          <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Technical Abstract & Prototyping Scope
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {project.abstract}
            </p>
          </div>

          {/* Interactive Milestones & Deliverables */}
          <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Roadmap Milestones & Deliverables
                </h3>
                <p className="text-xs text-slate-400">
                  Interactive deliverable tracker with verification state. Click checkbox to toggle status.
                </p>
              </div>

              <button
                onClick={() => setIsAddMilestoneOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-cyan-400 border border-white/10 transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Milestone</span>
              </button>
            </div>

            {/* Milestones List */}
            <div className="space-y-3 pt-2">
              {project.milestones.map((m) => {
                const isCompleted = m.status === 'completed';
                const isInProgress = m.status === 'in_progress';
                const isPending = m.status === 'pending';

                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
                      isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/30'
                        : isInProgress
                        ? 'bg-blue-950/20 border-blue-500/40 shadow-sm'
                        : 'bg-white/[0.02] border-white/5'
                    }`}
                  >
                    {/* Interactive 3-State Toggle Checkbox */}
                    <button
                      onClick={() => handleMilestoneToggle(m.id, m.status)}
                      className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-500 text-navy-950 hover:bg-emerald-400'
                          : isInProgress
                          ? 'border border-blue-400 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                          : 'border border-slate-600 hover:border-cyan-400 bg-white/[0.02]'
                      }`}
                      title={
                        isCompleted
                          ? 'Status: Completed (Click to reset to Pending)'
                          : isInProgress
                          ? 'Status: In Progress (Click to mark as Completed)'
                          : 'Status: Pending (Click to start deliverable)'
                      }
                    >
                      {isCompleted && <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-navy-950" />}
                      {isInProgress && <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
                      {isPending && <div className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-cyan-400" />}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-xs font-bold ${isCompleted ? 'text-emerald-300 line-through' : 'text-white'}`}>
                            {m.title}
                          </h4>
                          <span
                            className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-mono font-bold border ${
                              isCompleted
                                ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                                : isInProgress
                                ? 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                                : 'bg-white/5 text-slate-400 border-white/10'
                            }`}
                          >
                            {m.status.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 shrink-0">
                          Due: {m.dueDate}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Add Milestone Inline Modal */}
            {isAddMilestoneOpen && (
              <form onSubmit={handleAddMilestoneSubmit} className="p-4 rounded-xl bg-navy-900 border border-white/10 space-y-3 text-xs">
                <div className="font-bold text-white uppercase tracking-wider text-[11px]">
                  Append Deliverable Milestone
                </div>
                <input
                  type="text"
                  placeholder="Milestone title..."
                  value={newMilestoneTitle}
                  onChange={e => setNewMilestoneTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/10 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Deliverable description..."
                  value={newMilestoneDesc}
                  onChange={e => setNewMilestoneDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/10 text-white"
                />
                <div className="flex items-center justify-between gap-2">
                  <input
                    type="date"
                    value={newMilestoneDate}
                    onChange={e => setNewMilestoneDate(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-navy-950 border border-white/10 text-white"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddMilestoneOpen(false)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold"
                    >
                      Save Deliverable
                    </button>
                  </div>
                </div>
              </form>
            )}

          </div>

          {/* Supporting Repositories & Telemetry */}
          {(project.githubUrl || project.demoUrl) && (
            <div className="p-6 rounded-2xl glass-panel space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Supporting Code & Telemetry
              </h3>
              <div className="flex flex-wrap gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  >
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                    <span>Open Hardware / Firmware Repository</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                )}
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                    <span>Live Sensor Telemetry Feed</span>
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Funding, Team & Impact */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Funding Status Card */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Innovation Capital & Pledges
              </h3>
              <span className="text-xs font-bold text-emerald-400">{fundingPercent}% Funded</span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-black text-white">
                ₹{(project.fundingReceivedINR / 100000).toFixed(1)} Lakhs
              </div>
              <div className="text-xs text-slate-400">
                Target: ₹{(project.fundingTargetINR / 100000).toFixed(1)} Lakhs
              </div>
            </div>

            {/* Structured Funding Breakdown */}
            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-navy-900/60 border border-white/5 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Govt Seed Grant</span>
                <span className="text-blue-300 font-bold">
                  ₹{((project.allocatedGovtGrantINR ?? 0) / 100000).toFixed(1)}L
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Industry Capital</span>
                <span className="text-emerald-400 font-bold">
                  ₹{((project.totalIndustryFundingINR ?? 0) / 100000).toFixed(1)}L
                </span>
              </div>
            </div>

            {/* Structured Contributions / Industry Sponsors List */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <span className="text-[11px] font-semibold text-slate-400 block">
                Resource Pledges & CSR Contributions ({project.contributions?.length || project.industryPartners.length})
              </span>
              
              {project.contributions && project.contributions.length > 0 ? (
                project.contributions.map((c) => (
                  <div key={c.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-white font-semibold">
                      <span>{c.partnerName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 uppercase font-mono">
                        {c.category.replace('_', ' ')}
                      </span>
                    </div>
                    {c.financialAmountINR ? (
                      <div className="text-[11px] text-emerald-400 font-bold">
                        Financial Grant: ₹{(c.financialAmountINR / 100000).toFixed(1)} Lakhs
                      </div>
                    ) : null}
                    <div className="text-[11px] text-slate-300">{c.resourceDetails}</div>
                    {c.mentorName && (
                      <div className="text-[10px] text-slate-400">Mentor: {c.mentorName}</div>
                    )}
                  </div>
                ))
              ) : (
                project.industryPartners.map((ind, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-white font-semibold">
                      <span>{ind.name}</span>
                      <span className="text-[10px] text-cyan-400">{ind.type}</span>
                    </div>
                    <div className="text-[11px] text-emerald-400">{ind.contribution}</div>
                    {ind.mentorAssigned && (
                      <div className="text-[10px] text-slate-400">Mentor: {ind.mentorAssigned}</div>
                    )}
                  </div>
                ))
              )}
            </div>

            <Link
              to="/industry"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Pledge CSR Grant / Cloud Credits</span>
            </Link>
          </div>

          {/* Research Team Roster */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Project Research Team</span>
            </h3>

            <div className="space-y-2.5">
              {project.team.map(member => (
                <div key={member.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{member.name}</div>
                    <div className="text-[11px] text-slate-400">{member.role}</div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{member.institution}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantified Impact Metrics */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>Measured Grassroots Impact</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-navy-900/60 border border-white/5">
                <div className="text-lg font-black text-white">
                  {project.impactMetrics.livesImpactedEstimate.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Lives Reached</div>
              </div>

              <div className="p-3 rounded-xl bg-navy-900/60 border border-white/5">
                <div className="text-lg font-black text-cyan-400">
                  {project.impactMetrics.areaCoveredKm2} km²
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Coverage Area</div>
              </div>

              <div className="p-3 rounded-xl bg-navy-900/60 border border-white/5">
                <div className="text-lg font-black text-emerald-400">
                  {project.impactMetrics.costReductionPercent}%
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Cost Reduction</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
