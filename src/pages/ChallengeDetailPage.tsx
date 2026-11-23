import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PriorityBadge, StatusBadge, DomainBadge } from '../components/ui/Badge';
import { AIAnalysisBadge } from '../components/shared/AIAnalysisBadge';
import { 
  ArrowLeft, 
  MapPin, 
  ThumbsUp, 
  Clock, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Share2, 
  Sparkles, 
  ArrowRight,
  FolderGit2,
  DollarSign
} from 'lucide-react';

export const ChallengeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { challenges, upvoteChallenge, projects, showToast } = useApp();
  const navigate = useNavigate();

  const challenge = challenges.find(c => c.id === id);

  if (!challenge) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Challenge Not Found</h2>
        <p className="text-slate-400 text-sm">The challenge ID "{id}" could not be located in the national registry.</p>
        <Link to="/challenges" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
          Return to Challenges Pool
        </Link>
      </div>
    );
  }

  const linkedProject = projects.find(p => p.challengeId === challenge.id || p.id === challenge.linkedProjectId);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Challenge dossier link copied to clipboard.', 'info');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/challenges"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Challenges Pool</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 border border-white/10 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Dossier</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel space-y-6 border border-white/10">
        
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs text-cyan-400 font-bold bg-navy-900 px-2 py-0.5 rounded border border-white/10">
              {challenge.id}
            </span>
            <DomainBadge domain={challenge.domain} />
            <PriorityBadge priority={challenge.priority} />
          </div>

          <StatusBadge status={challenge.status} />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
          {challenge.title}
        </h1>

        {/* Submitter & Geolocation Row */}
        <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-[10px]">
              {challenge.submittedBy.name.charAt(0)}
            </div>
            <span>Reported by <strong className="text-slate-200">{challenge.submittedBy.name}</strong> ({challenge.submittedBy.badge || challenge.submittedBy.role})</span>
          </div>

          <div className="flex items-center gap-1.5 text-cyan-400">
            <MapPin className="w-4 h-4" />
            <span>{challenge.district}, {challenge.state}</span>
            {challenge.coordinates && (
              <span className="text-[10px] text-slate-500 font-mono">
                ({challenge.coordinates.lat.toFixed(3)}°N, {challenge.coordinates.lng.toFixed(3)}°E)
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>Logged on {new Date(challenge.submittedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Upvote & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => upvoteChallenge(challenge.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                challenge.hasUpvoted
                  ? 'bg-cyan-500 text-navy-950 shadow-lg shadow-cyan-500/30'
                  : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${challenge.hasUpvoted ? 'fill-navy-950' : ''}`} />
              <span>{challenge.upvotes} Community Upvotes</span>
            </button>
            <span className="text-xs text-slate-400 hidden sm:inline">
              Signaling civic urgency for state funding
            </span>
          </div>

          {/* Quick links to actions */}
          <div className="flex items-center gap-2">
            {linkedProject ? (
              <Link
                to={`/projects/${linkedProject.id}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 transition-all"
              >
                <FolderGit2 className="w-4 h-4" />
                <span>Open Active R&D Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <Link
                to="/university"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all"
              >
                <Building2 className="w-4 h-4" />
                <span>Adopt as University Proposal</span>
              </Link>
            )}
          </div>
        </div>

      </div>

      {/* Main Grid: Details & AI Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Full Observations & Evidence */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Photographic Evidence */}
          {challenge.imageUrl && (
            <div className="rounded-2xl overflow-hidden glass-panel border border-white/10">
              <div className="relative h-80 w-full bg-navy-900">
                <img
                  src={challenge.imageUrl}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-navy-950/80 backdrop-blur-md text-[11px] text-white border border-white/10">
                  Primary Ground Evidence Image
                </div>
              </div>
            </div>
          )}

          {/* Field Observation Description */}
          <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-4">
            <h2 className="text-base font-bold text-white tracking-tight uppercase tracking-wider text-xs text-slate-400">
              Ground Reality & Community Impact Statement
            </h2>
            <div className="text-sm text-slate-200 leading-relaxed space-y-3 font-normal">
              {challenge.description.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Government Audit Card (if reviewed) */}
          {challenge.governmentReview && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-950/40 via-navy-900 to-navy-950 border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-blue-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>State Government Verification Audit</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {new Date(challenge.governmentReview.reviewedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-slate-300">
                  <span className="text-slate-400 font-medium">Audited By: </span>
                  {challenge.governmentReview.reviewedBy}
                </div>
                <div className="text-slate-200 leading-relaxed bg-navy-900/60 p-3 rounded-xl border border-white/5">
                  <span className="text-slate-400 font-medium block text-[10px] uppercase mb-1">Audit Findings:</span>
                  {challenge.governmentReview.notes}
                </div>
                {challenge.governmentReview.allocatedGrantINR && (
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
                    <DollarSign className="w-4 h-4" />
                    <span>Allocated Government Grant: ₹{(challenge.governmentReview.allocatedGrantINR / 100000).toFixed(1)} Lakhs</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: AI Analysis Engine Report & Partners */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Report Card */}
          <div className="p-6 rounded-2xl glass-panel space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Semantic Triage Intelligence</span>
            </h3>
            <AIAnalysisBadge analysis={challenge.aiAnalysis} />
          </div>

          {/* Assigned University or R&D Partner */}
          {challenge.assignedUniversityName && (
            <div className="p-6 rounded-2xl glass-panel border border-indigo-500/30 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span>Assigned Academic Partner</span>
              </div>
              <div className="text-sm font-bold text-white">
                {challenge.assignedUniversityName}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Faculty team has formally adopted this challenge with laboratory testing and field telemetry deliverables.
              </p>
              {linkedProject && (
                <Link
                  to={`/projects/${linkedProject.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 pt-1"
                >
                  <span>View Project Milestones</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
