import React from 'react';
import { PriorityLevel, ChallengeStatus, ChallengeDomain } from '../../types';

export const PriorityBadge: React.FC<{ priority: PriorityLevel }> = ({ priority }) => {
  const styles: Record<PriorityLevel, { bg: string; text: string; dot: string; label: string }> = {
    critical: { bg: 'bg-rose-500/15 border-rose-500/30', text: 'text-rose-400', dot: 'bg-rose-500 animate-pulse', label: 'Critical' },
    high: { bg: 'bg-amber-500/15 border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-500', label: 'High' },
    medium: { bg: 'bg-blue-500/15 border-blue-500/30', text: 'text-blue-400', dot: 'bg-blue-500', label: 'Medium' },
    low: { bg: 'bg-slate-500/15 border-slate-500/30', text: 'text-slate-400', dot: 'bg-slate-500', label: 'Low' },
  };

  const current = styles[priority] || styles.medium;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.bg} ${current.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
      {current.label}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: ChallengeStatus }> = ({ status }) => {
  const styles: Record<ChallengeStatus, { bg: string; text: string; label: string }> = {
    submitted: { bg: 'bg-sky-500/10 border-sky-500/25', text: 'text-sky-300', label: 'Under Verification' },
    verified: { bg: 'bg-emerald-500/10 border-emerald-500/25', text: 'text-emerald-300', label: 'Verified Challenge' },
    in_progress: { bg: 'bg-indigo-500/15 border-indigo-500/30', text: 'text-indigo-300', label: 'R&D Project Active' },
    completed: { bg: 'bg-teal-500/10 border-teal-500/25', text: 'text-teal-300', label: 'Field Deployed' },
    rejected: { bg: 'bg-red-500/10 border-red-500/25', text: 'text-red-300', label: 'Closed / Ineligible' },
  };

  const current = styles[status] || styles.submitted;

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${current.bg} ${current.text}`}>
      {current.label}
    </span>
  );
};

export const DomainBadge: React.FC<{ domain: ChallengeDomain | string }> = ({ domain }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-white/5 text-slate-300 border border-white/10 hover:border-white/20 transition-colors">
      {domain}
    </span>
  );
};
