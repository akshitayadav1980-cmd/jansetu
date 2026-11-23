import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Sparkles, Heart, Globe, ArrowUpRight, RotateCcw } from 'lucide-react';

export const Footer: React.FC = () => {
  const { resetToSampleData } = useApp();

  return (
    <footer className="border-t border-white/[0.08] bg-navy-950/90 text-slate-400 text-sm mt-24">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5">
                <div className="w-full h-full bg-navy-950 rounded-[6px] flex items-center justify-center font-bold text-cyan-400 text-sm">
                  JS
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">JanSetu</span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              National open-innovation bridge connecting grassroots citizen challenges directly to university researchers, government funding channels, and industry CSR resources for high-impact indigenous problem-solving.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={resetToSampleData}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 transition-colors"
                title="Reset local state to default demo dataset"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Reset Demo State</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Ecosystem</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/challenges" className="hover:text-cyan-400 transition-colors">
                  Societal Challenges Pool
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-cyan-400 transition-colors">
                  University R&D Projects
                </Link>
              </li>
              <li>
                <Link to="/citizen/report" className="hover:text-cyan-400 transition-colors">
                  Report a Civic Problem
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors">
                  Portal Login & Switcher
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Stakeholders */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">Stakeholder Desks</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/citizen" className="hover:text-cyan-400 transition-colors">
                  Citizen & Community Hub
                </Link>
              </li>
              <li>
                <Link to="/government" className="hover:text-cyan-400 transition-colors">
                  Government Verification Desk
                </Link>
              </li>
              <li>
                <Link to="/university" className="hover:text-cyan-400 transition-colors">
                  University Faculty & Lab Hub
                </Link>
              </li>
              <li>
                <Link to="/industry" className="hover:text-cyan-400 transition-colors">
                  Industry & CSR Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Compliance & AI Assurance */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-white">AI Governance</h5>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explainable AI Triage</span>
              </div>
              <p className="leading-snug">
                AI categorizations, domain mapping, and duplicate risk scores are decision-support indicators. All formal grants require authorized government review.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] py-6 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 JanSetu Platform. A collaborative ecosystem connecting communities, universities, government and industry to solve real-world challenges.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              National Open Innovation Architecture
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
