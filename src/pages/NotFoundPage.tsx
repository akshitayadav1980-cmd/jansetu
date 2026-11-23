import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Sparkles, FolderGit2 } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      
      {/* 404 Icon & Badge */}
      <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-500/10">
        <Compass className="w-8 h-8 animate-spin-slow" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
          HTTP 404 • Resource Registry
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          The destination URL or workspace route you requested does not exist in the JanSetu open innovation network.
        </p>
      </div>

      {/* Recovery Actions */}
      <div className="p-6 rounded-2xl glass-panel border border-white/10 space-y-4 max-w-md mx-auto text-xs">
        <span className="text-slate-400 font-medium block">
          Navigate back to an active network hub:
        </span>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            to="/challenges"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Explore Challenges</span>
          </Link>
        </div>
      </div>

    </div>
  );
};
