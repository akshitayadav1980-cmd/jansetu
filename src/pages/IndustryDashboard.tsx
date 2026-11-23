import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Project, IndustryPartner, ContributionCategory } from '../types';
import { DomainBadge } from '../components/ui/Badge';
import { 
  Building2, 
  DollarSign, 
  Users, 
  Sparkles, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Cpu,
  FileCheck
} from 'lucide-react';

export const IndustryDashboard: React.FC = () => {
  const { projects, pledgeIndustryFunding, activePersona } = useApp();

  const [selectedProjectForPledge, setSelectedProjectForPledge] = useState<Project | null>(null);
  const [contributionCategory, setContributionCategory] = useState<ContributionCategory>('csr_grant');
  const [pledgeAmountINR, setPledgeAmountINR] = useState(1000000);
  const [partnerType, setPartnerType] = useState<IndustryPartner['type']>('Corporate CSR');
  const [resourcesOffered, setResourcesOffered] = useState('AWS Cloud Compute Credits + Rapid Hardware Prototyping Lab');
  const [mentorName, setMentorName] = useState(activePersona.name || 'Siddharth Roy (VP Innovation)');

  const handleOpenPledge = (p: Project) => {
    setSelectedProjectForPledge(p);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectForPledge) return;

    pledgeIndustryFunding(
      selectedProjectForPledge.id,
      activePersona.organization || 'Tata Sustainability & CSR Fund',
      partnerType,
      contributionCategory === 'csr_grant' ? pledgeAmountINR : 0,
      resourcesOffered,
      mentorName,
      contributionCategory
    );

    setSelectedProjectForPledge(null);
  };

  const totalIndustryPledges = projects.reduce((sum, p) => sum + (p.totalIndustryFundingINR || 0), 0);
  const totalMobilizedCapital = projects.reduce((sum, p) => sum + p.fundingReceivedINR, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 bg-navy-950/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">Industry & CSR Command Desk</h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                Corporate Co-Innovation
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Partner: <span className="text-white font-medium">{activePersona.name}</span> • {activePersona.organization}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">CSR Compliance</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Schedule VII Section 135
            </span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Projects Seeking Partners</div>
          <div className="text-2xl font-black text-white">{projects.length}</div>
          <div className="text-[11px] text-cyan-400">Vetted by State & Universities</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Corporate CSR Grants</div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{(totalIndustryPledges / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[11px] text-slate-400">
            Total Mobilized: <span className="text-emerald-300 font-semibold">₹{(totalMobilizedCapital / 10000000).toFixed(2)} Cr</span> (incl. Govt)
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Lives Reached (Est.)</div>
          <div className="text-2xl font-black text-blue-400">516,000+</div>
          <div className="text-[11px] text-blue-300/80">Audited grassroots impact</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">ESG Impact Rating</div>
          <div className="text-2xl font-black text-cyan-400">AA+</div>
          <div className="text-[11px] text-cyan-300/80">Direct UN-SDG alignment</div>
        </div>
      </div>

      {/* Discover Projects Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Discover High-Impact University R&D Projects
            </h2>
            <p className="text-xs text-slate-400">
              Provide corporate CSR grants, equipment, technical mentorship, or fabrication support.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => {
            const fundingPercent = Math.min(100, Math.round((project.fundingReceivedINR / project.fundingTargetINR) * 100));

            return (
              <div key={project.id} className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <DomainBadge domain={project.domain} />
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                      {project.status.replace('_', ' ')}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white line-clamp-2 leading-snug">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {project.abstract}
                  </p>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5 text-xs">
                    <div className="font-semibold text-white">{project.leadInstitution}</div>
                    <div className="text-slate-400 text-[11px]">PI: {project.facultyMentor}</div>
                  </div>

                  {/* Funding Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 font-medium">Funding Goal</span>
                      <span className="text-emerald-400 font-bold">
                        ₹{(project.fundingReceivedINR / 100000).toFixed(1)}L / ₹{(project.fundingTargetINR / 100000).toFixed(1)}L ({fundingPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-navy-900 border border-white/10 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                        style={{ width: `${fundingPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Impact Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="p-2 rounded-lg bg-navy-900/60 border border-white/5">
                      <span className="text-slate-500 block">Estimated Beneficiaries</span>
                      <span className="text-white font-bold">{project.impactMetrics.livesImpactedEstimate.toLocaleString()}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-navy-900/60 border border-white/5">
                      <span className="text-slate-500 block">Cost Reduction</span>
                      <span className="text-cyan-400 font-bold">{project.impactMetrics.costReductionPercent}%</span>
                    </div>
                  </div>

                  {/* Existing Industry Partners */}
                  {project.industryPartners.length > 0 && (
                    <div className="pt-2 text-[11px] text-slate-400">
                      <span className="font-medium text-slate-300">Co-Sponsors: </span>
                      {project.industryPartners.map(p => p.name).join(', ')}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <Link
                    to={`/projects/${project.id}`}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    View Timeline
                  </Link>
                  <button
                    onClick={() => handleOpenPledge(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold shadow-lg shadow-emerald-500/20 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>Pledge Grant / Mentorship</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pledge Modal */}
      {selectedProjectForPledge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-xl w-full rounded-2xl glass-panel p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-emerald-400 font-bold">
                  Sponsorship Pledge
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Partner with {selectedProjectForPledge.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Lead Lab: {selectedProjectForPledge.leadInstitution}
                </p>
              </div>
              <button
                onClick={() => setSelectedProjectForPledge(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePledgeSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Contribution Mode *
                  </label>
                  <select
                    value={contributionCategory}
                    onChange={e => setContributionCategory(e.target.value as ContributionCategory)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                  >
                    <option value="csr_grant">💰 Direct Financial CSR Grant</option>
                    <option value="cloud_credits">☁️ Cloud & Server Credits</option>
                    <option value="hardware">🛠️ Hardware & Lab Equipment</option>
                    <option value="mentorship">🧠 Executive / Tech Mentorship</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Partnership Category *
                  </label>
                  <select
                    value={partnerType}
                    onChange={e => setPartnerType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                  >
                    <option value="Corporate CSR">Corporate CSR (Sec 135 Mandate)</option>
                    <option value="Deeptech Startup">Deeptech Startup (Technology Transfer)</option>
                    <option value="Venture Fund">Venture Fund / Impact Capital</option>
                    <option value="Industry Lab">Industry Research Lab & Fabrication</option>
                  </select>
                </div>
              </div>

              {contributionCategory === 'csr_grant' ? (
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                    Grant Commitment Amount (INR) *
                  </label>
                  <input
                    type="number"
                    step={50000}
                    value={pledgeAmountINR}
                    onChange={e => setPledgeAmountINR(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white font-mono"
                    required
                  />
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Pledging ₹{(pledgeAmountINR / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/20 text-[11px] text-cyan-300">
                  <span className="font-semibold">In-Kind & Expertise Contribution:</span> This contribution provides essential computing, hardware, or direct advisory resources to the student-faculty team without drawing from cash quotas.
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                  Technical Resources & Infrastructure Offered *
                </label>
                <input
                  type="text"
                  value={resourcesOffered}
                  onChange={e => setResourcesOffered(e.target.value)}
                  placeholder="e.g. Server hosting, IoT sensor components, CNC prototyping access..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
                  Assigned Corporate Industry Mentor
                </label>
                <input
                  type="text"
                  value={mentorName}
                  onChange={e => setMentorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-navy-900 border border-white/10 text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-[11px] text-emerald-300 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Immediate Direct Impact</span>
                </div>
                <p className="text-slate-400">
                  Upon submission, funds and mentorship will be bound to project milestones with transparent milestone-disbursement governance.
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProjectForPledge(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold shadow-lg shadow-emerald-500/20"
                >
                  Confirm Partnership Pledge
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
