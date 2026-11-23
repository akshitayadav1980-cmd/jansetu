import React from 'react';
import { Link } from 'react-router-dom';
import { Challenge } from '../../types';
import { PriorityBadge, StatusBadge, DomainBadge } from '../ui/Badge';
import { useApp } from '../../context/AppContext';
import { 
  ThumbsUp, 
  MapPin, 
  Building2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const { upvoteChallenge } = useApp();

  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    upvoteChallenge(challenge.id);
  };

  return (
    <div className="group rounded-2xl glass-panel glass-panel-hover overflow-hidden flex flex-col justify-between transition-all duration-300">
      <div>
        {/* Optional Image Banner */}
        {challenge.imageUrl && (
          <div className="relative h-44 w-full overflow-hidden bg-navy-900">
            <img
              src={challenge.imageUrl}
              alt={challenge.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
              <DomainBadge domain={challenge.domain} />
              <PriorityBadge priority={challenge.priority} />
            </div>

            {/* Bottom Id Tag */}
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-cyan-300 bg-navy-950/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
              {challenge.id}
            </div>
          </div>
        )}

        {/* Card Body */}
        <div className="p-5 space-y-3">
          {!challenge.imageUrl && (
            <div className="flex items-center justify-between gap-2">
              <DomainBadge domain={challenge.domain} />
              <PriorityBadge priority={challenge.priority} />
            </div>
          )}

          <div className="space-y-1.5">
            <Link
              to={`/challenges/${challenge.id}`}
              className="block text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug"
            >
              {challenge.title}
            </Link>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {challenge.description}
            </p>
          </div>

          {/* Location & Metadata */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{challenge.district}, {challenge.state}</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{new Date(challenge.submittedAt).toLocaleDateString()}</span>
            </span>
          </div>

          {/* Assigned University or AI Target */}
          {challenge.assignedUniversityName ? (
            <div className="p-2.5 rounded-xl bg-blue-950/40 border border-blue-500/20 flex items-center gap-2 text-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned R&D Partner</span>
                <span className="text-white font-medium truncate block">{challenge.assignedUniversityName}</span>
              </div>
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2 text-xs text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">
                Top AI Lab Match: <span className="text-slate-200">{challenge.aiAnalysis.recommendedUniversities[0]?.name}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer / Interactive Actions */}
      <div className="px-5 py-3.5 border-t border-white/[0.06] bg-navy-950/50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <StatusBadge status={challenge.status} />

          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              challenge.hasUpvoted
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/5'
            }`}
            title="Upvote community priority"
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${challenge.hasUpvoted ? 'fill-cyan-400 text-cyan-400' : ''}`} />
            <span>{challenge.upvotes}</span>
          </button>
        </div>

        <Link
          to={`/challenges/${challenge.id}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Dossier</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
