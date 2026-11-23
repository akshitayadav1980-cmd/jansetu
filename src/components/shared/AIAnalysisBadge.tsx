import React from 'react';
import { AIAnalysisResult } from '../../types';
import { Sparkles, AlertCircle, Building2, Cpu, CheckCircle } from 'lucide-react';

export const AIAnalysisBadge: React.FC<{ analysis: AIAnalysisResult; compact?: boolean }> = ({ 
  analysis, 
  compact = false 
}) => {
  if (compact) {
    return (
      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>AI Match: {analysis.recommendedUniversities[0]?.name || 'Auto-routed'}</span>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4 bg-gradient-to-br from-navy-900/90 to-navy-850 border border-cyan-500/25 space-y-3 relative overflow-hidden">
      {/* Background glow decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              Automated AI Triage Assessment
              <span className="text-[10px] text-cyan-400 font-mono font-normal">
                ({analysis.confidenceScore}% confidence)
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">Decision-support heuristic based on semantic NLP classification</p>
          </div>
        </div>

        {analysis.potentialDuplicateRisk.detected && (
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Duplicate Risk ({analysis.potentialDuplicateRisk.highestMatchScore}%)</span>
          </div>
        )}
      </div>

      {/* Rationale & Suggested Approach */}
      <div className="space-y-1.5 text-xs">
        <div className="text-slate-300 leading-relaxed">
          <span className="text-slate-400 font-medium">Priority Justification: </span>
          {analysis.priorityRationale}
        </div>
        <div className="text-slate-300 leading-relaxed">
          <span className="text-cyan-400 font-medium">Suggested Solution Approach: </span>
          {analysis.suggestedSolutionApproach}
        </div>
      </div>

      {/* Extracted Keywords */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] text-slate-400 font-medium mr-1">Semantic Tags:</span>
        {analysis.extractedKeywords.map((kw, i) => (
          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-cyan-300 border border-white/10">
            #{kw}
          </span>
        ))}
      </div>

      {/* University Recommendations */}
      <div className="pt-2 border-t border-white/5">
        <div className="text-[11px] font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Recommended Institutional Labs</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {analysis.recommendedUniversities.map((uni, i) => (
            <div key={i} className="p-2 rounded-lg bg-white/[0.02] border border-white/5 flex items-start justify-between gap-2 text-xs">
              <div>
                <div className="font-semibold text-white">{uni.name}</div>
                <div className="text-[10px] text-slate-400 line-clamp-1">{uni.department}</div>
                <div className="text-[10px] text-cyan-400/90 mt-0.5">{uni.specialization}</div>
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                {uni.matchScore}% fit
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
