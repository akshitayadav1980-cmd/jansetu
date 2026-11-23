import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Challenge, PriorityLevel } from '../types';
import { PriorityBadge, StatusBadge, DomainBadge } from '../components/ui/Badge';
import { AIAnalysisBadge } from '../components/shared/AIAnalysisBadge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  Landmark, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Building2, 
  DollarSign, 
  Filter, 
  Eye, 
  ExternalLink,
  MapPin,
  TrendingUp,
  FileCheck2
} from 'lucide-react';

export const GovernmentDashboard: React.FC = () => {
  const { challenges, dynamicDistrictMetrics, verifyChallenge, rejectChallenge, activePersona } = useApp();
  
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [allocatedGrant, setAllocatedGrant] = useState(1200000);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [officialPriority, setOfficialPriority] = useState<PriorityLevel>('high');
  const [filterTab, setFilterTab] = useState<'pending' | 'verified' | 'all'>('pending');

  // Stats
  const totalSubmissions = challenges.length;
  const pendingCount = challenges.filter(c => c.status === 'submitted').length;
  const verifiedCount = challenges.filter(c => c.status === 'verified').length;
  const inProgressCount = challenges.filter(c => c.status === 'in_progress').length;

  const filteredChallenges = challenges.filter(c => {
    if (filterTab === 'pending') return c.status === 'submitted';
    if (filterTab === 'verified') return c.status === 'verified' || c.status === 'in_progress';
    return true;
  });

  const handleOpenReview = (c: Challenge) => {
    setSelectedChallenge(c);
    setOfficialPriority((c.officialPriority || c.aiAnalysis?.suggestedPriority || 'high') as PriorityLevel);
    setReviewNotes(`Reviewed by ${activePersona.name}. Ground telemetry and public evidence substantiated.`);
    setSelectedUniversity(c.aiAnalysis.recommendedUniversities[0]?.name || 'IIT Delhi');
    setAllocatedGrant(c.governmentReview?.allocatedGrantINR || 1200000);
  };

  const handleVerifySubmit = () => {
    if (!selectedChallenge) return;
    verifyChallenge(selectedChallenge.id, officialPriority, reviewNotes, allocatedGrant, undefined, selectedUniversity);
    setSelectedChallenge(null);
  };

  const handleRejectSubmit = () => {
    if (!selectedChallenge) return;
    rejectChallenge(selectedChallenge.id, reviewNotes);
    setSelectedChallenge(null);
  };

  // Chart data for domains
  const domainData = [
    { name: 'Water', count: challenges.filter(c => c.domain === 'Water Resources').length, color: '#06b6d4' },
    { name: 'Agri', count: challenges.filter(c => c.domain === 'Agriculture & Soil').length, color: '#10b981' },
    { name: 'Urban', count: challenges.filter(c => c.domain === 'Urban Infrastructure').length, color: '#3b82f6' },
    { name: 'Health', count: challenges.filter(c => c.domain === 'Healthcare & Sanitation').length, color: '#8b5cf6' },
    { name: 'Waste', count: challenges.filter(c => c.domain === 'Waste Management').length, color: '#f59e0b' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Executive Header */}
      <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 bg-navy-950/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0">
            <Landmark className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white tracking-tight">Government Nodal Command</h1>
              <span className="px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-300 text-xs font-semibold border border-blue-500/30">
                State & District Desk
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Logged in as: <span className="text-white font-medium">{activePersona.name}</span> ({activePersona.organization})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-slate-300">
            <span className="text-slate-500 block text-[10px] uppercase font-bold">Audit Standard</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO-37120 Smart Cities
            </span>
          </div>
        </div>
      </div>

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Total Registered</div>
          <div className="text-2xl font-black text-white">{totalSubmissions}</div>
          <div className="text-[11px] text-cyan-400">Public crowdsource pipeline</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1 border-amber-500/30">
          <div className="text-xs text-amber-400 font-medium">Pending Triage Review</div>
          <div className="text-2xl font-black text-amber-400">{pendingCount}</div>
          <div className="text-[11px] text-amber-300/80">Requires official review</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Verified Challenges</div>
          <div className="text-2xl font-black text-emerald-400">{verifiedCount}</div>
          <div className="text-[11px] text-emerald-300/80">Approved for university R&D</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Projects in Progress</div>
          <div className="text-2xl font-black text-blue-400">{inProgressCount}</div>
          <div className="text-[11px] text-blue-300/80">Faculty teams prototyping</div>
        </div>
      </div>

      {/* Charts Section: District Breakdown & Domain Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* District-wise Statistics */}
        <div className="lg:col-span-8 p-6 rounded-2xl glass-panel space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                District-Wise Submission & Verification Telemetry
              </h3>
              <p className="text-xs text-slate-400">Total submitted vs verified across major pilot districts</p>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Live Districts
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicDistrictMetrics.slice(0, 7)} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis 
                  dataKey="district" 
                  stroke="#64748b" 
                  fontSize={11} 
                  angle={-15} 
                  textAnchor="end"
                  tickLine={false} 
                />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b0f19',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="totalSubmissions" fill="#3b82f6" name="Total Submissions" radius={[4, 4, 0, 0]} />
                <Bar dataKey="verifiedCount" fill="#10b981" name="Verified by Govt" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Domain Distribution */}
        <div className="lg:col-span-4 p-6 rounded-2xl glass-panel space-y-4">
          <h3 className="text-base font-bold text-white tracking-tight">Domain Mix</h3>
          <p className="text-xs text-slate-400">Distribution by sector need</p>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={domainData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  innerRadius={40}
                  paddingAngle={4}
                >
                  {domainData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0b0f19',
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {domainData.map(d => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-slate-300 truncate">{d.name}</span>
                <span className="text-slate-500 font-mono">({d.count})</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Verification Triage Queue */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Challenge Verification & Assignment Queue
            </h2>
            <p className="text-xs text-slate-400">
              Review ground evidence, evaluate automated AI triage reports, approve funding and assign academic partner.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10 self-start">
            <button
              onClick={() => setFilterTab('pending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'pending' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilterTab('verified')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'verified' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'text-slate-400 hover:text-white'
              }`}
            >
              Verified / In Progress
            </button>
            <button
              onClick={() => setFilterTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filterTab === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Records
            </button>
          </div>
        </div>

        {/* Table / List View of Queue */}
        <div className="rounded-2xl glass-panel overflow-hidden border border-white/10">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-navy-900/80 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-5 py-3.5">Challenge ID & Title</th>
                  <th className="px-5 py-3.5">District</th>
                  <th className="px-5 py-3.5">Domain</th>
                  <th className="px-5 py-3.5">AI Priority</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredChallenges.map(c => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-mono text-[10px] text-cyan-400 font-bold">{c.id}</div>
                      <div className="text-white font-semibold line-clamp-1 mt-0.5">{c.title}</div>
                      <div className="text-slate-400 text-[11px] truncate">By {c.submittedBy.name}</div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-slate-300">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{c.district}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <DomainBadge domain={c.domain} />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <PriorityBadge priority={c.priority} />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleOpenReview(c)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Audit & Assign</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal Dialog */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md overflow-y-auto">
          <div className="max-w-3xl w-full rounded-2xl glass-panel p-6 sm:p-8 border border-white/15 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold">{selectedChallenge.id}</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedChallenge.title}</h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>{selectedChallenge.district}, {selectedChallenge.state}</span>
                  <span>•</span>
                  <span>Submitted by {selectedChallenge.submittedBy.name}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedChallenge(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* Evidence Image if available */}
            {selectedChallenge.imageUrl && (
              <div className="h-56 rounded-xl overflow-hidden border border-white/10 bg-navy-900">
                <img
                  src={selectedChallenge.imageUrl}
                  alt={selectedChallenge.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Description */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Field Report</h4>
              <p className="text-xs text-slate-200 leading-relaxed bg-navy-900/60 p-3.5 rounded-xl border border-white/5">
                {selectedChallenge.description}
              </p>
            </div>

            {/* AI Triage Audit Report */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Analysis & Recommended Lab Matches
              </h4>
              <AIAnalysisBadge analysis={selectedChallenge.aiAnalysis} />
            </div>

            {/* Decision & Assignment Inputs */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/20 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4" />
                <span>Nodal Officer Verification & Mandate</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Official Priority</label>
                  <select
                    value={officialPriority}
                    onChange={e => setOfficialPriority(e.target.value as PriorityLevel)}
                    className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-xs text-white"
                  >
                    <option value="critical">🔴 Critical</option>
                    <option value="high">🟠 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🟢 Low</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Assign Academic Lab</label>
                  <select
                    value={selectedUniversity}
                    onChange={e => setSelectedUniversity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-xs text-white"
                  >
                    {selectedChallenge.aiAnalysis.recommendedUniversities.map(u => (
                      <option key={u.name} value={u.name}>
                        {u.name} ({u.matchScore}% fit)
                      </option>
                    ))}
                    <option value="IIT Bombay — CTARA">IIT Bombay — CTARA</option>
                    <option value="COEP Technological University, Pune">COEP Pune</option>
                    <option value="Anna University, Chennai">Anna University</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-slate-300 font-medium">Seed Grant (INR)</label>
                  <input
                    type="number"
                    step={100000}
                    min={0}
                    value={allocatedGrant}
                    onChange={e => setAllocatedGrant(Math.max(0, Number(e.target.value)))}
                    className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-xs text-white"
                  />
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    ₹{(allocatedGrant / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Official Audit Notes & Justification</label>
                <textarea
                  rows={3}
                  value={reviewNotes}
                  onChange={e => setReviewNotes(e.target.value)}
                  placeholder="Record verification rationale, matching state policies (e.g. Clean River mission, Jal Jeevan Mission)..."
                  className="w-full px-3 py-2 rounded-xl bg-navy-900 border border-white/10 text-xs text-white"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleRejectSubmit}
                className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
              >
                Mark Ineligible / Reject
              </button>

              <button
                onClick={handleVerifySubmit}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Issue University Mandate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
