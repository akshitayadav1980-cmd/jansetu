import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChallengeCard } from '../components/shared/ChallengeCard';
import { ChallengeStatus } from '../types';
import { 
  PlusCircle, 
  Users, 
  CheckCircle2, 
  Clock, 
  ThumbsUp, 
  FileText, 
  ArrowUpRight,
  Sparkles,
  MapPin,
  TrendingUp
} from 'lucide-react';

export const CitizenDashboard: React.FC = () => {
  const { challenges, activePersona } = useApp();
  const [viewScope, setViewScope] = useState<'my_reports' | 'community_feed'>('community_feed');
  const [filterStatus, setFilterStatus] = useState<ChallengeStatus | 'all'>('all');

  // Count my personal reports
  const myReports = challenges.filter(
    c => c.submittedBy.name.toLowerCase().trim() === activePersona.name.toLowerCase().trim()
  );

  // Filter challenges based on scope and lifecycle status
  const displayedChallenges = challenges.filter(c => {
    const matchesScope = 
      viewScope === 'community_feed' ||
      c.submittedBy.name.toLowerCase().trim() === activePersona.name.toLowerCase().trim();

    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;

    return matchesScope && matchesStatus;
  });

  // Calculate user stats
  const totalSubmissions = challenges.length;
  const verifiedCount = challenges.filter(c => c.status === 'verified' || c.status === 'in_progress').length;
  const inProgressCount = challenges.filter(c => c.status === 'in_progress').length;
  const totalUpvotesCount = challenges.reduce((sum, c) => sum + c.upvotes, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 bg-navy-950/80">
        <div className="flex items-center gap-4">
          <img
            src={activePersona.avatar}
            alt={activePersona.name}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-cyan-400/60 shadow-lg shadow-cyan-500/20"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{activePersona.name}</h1>
              <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
                {activePersona.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {activePersona.title} • {activePersona.organization}
            </p>
          </div>
        </div>

        <Link
          to="/citizen/report"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition-all self-start md:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit New Challenge</span>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Community Submissions</div>
          <div className="text-2xl font-black text-white">{totalSubmissions}</div>
          <div className="text-[11px] text-cyan-400 flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Active in civic pool</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Verified by Govt</div>
          <div className="text-2xl font-black text-emerald-400">{verifiedCount}</div>
          <div className="text-[11px] text-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Audit score ≥ 90%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Adopted for R&D</div>
          <div className="text-2xl font-black text-blue-400">{inProgressCount}</div>
          <div className="text-[11px] text-blue-300 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>University lab active</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel space-y-1">
          <div className="text-xs text-slate-400 font-medium">Community Upvotes</div>
          <div className="text-2xl font-black text-cyan-400">{totalUpvotesCount}</div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Grassroots backing</span>
          </div>
        </div>

      </div>

      {/* Challenge Tracking Feed */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Community Societal Challenges
            </h2>
            <p className="text-xs text-slate-400">
              Live status tracking across verification, university lab adoption, and deployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* View Scope Toggle: My Reports vs Community Feed */}
            <div className="flex p-1 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold">
              <button
                onClick={() => setViewScope('my_reports')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewScope === 'my_reports'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                My Reports ({myReports.length})
              </button>
              <button
                onClick={() => setViewScope('community_feed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewScope === 'community_feed'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Community Feed ({challenges.length})
              </button>
            </div>

            {/* Lifecycle Status Filter Pills */}
            <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/10">
              {[
                { id: 'all', label: 'All' },
                { id: 'submitted', label: 'Under Review' },
                { id: 'verified', label: 'Verified' },
                { id: 'in_progress', label: 'R&D Active' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilterStatus(tab.id as any)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    filterStatus === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Challenge Cards Grid or Empty State */}
        {displayedChallenges.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedChallenges.map(challenge => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        ) : (
          <div className="p-12 sm:p-16 rounded-2xl glass-panel text-center space-y-4 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto border border-cyan-500/20">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                {viewScope === 'my_reports'
                  ? `No challenges reported by ${activePersona.name} yet`
                  : 'No challenges match the selected lifecycle stage'}
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                {viewScope === 'my_reports'
                  ? 'Submit ground observations, photos, and civic issues from your local ward to connect with university research teams.'
                  : 'Try selecting a different lifecycle status pill to view other societal challenges in the pool.'}
              </p>
            </div>
            {viewScope === 'my_reports' && (
              <Link
                to="/citizen/report"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/20 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Your First Civic Problem</span>
              </Link>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
