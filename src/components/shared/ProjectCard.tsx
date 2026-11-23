import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../types';
import { DomainBadge } from '../ui/Badge';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Award 
} from 'lucide-react';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const nextMilestone = project.milestones.find(m => m.status === 'in_progress') || project.milestones[0];
  const fundingPercent = Math.min(100, Math.round((project.fundingReceivedINR / project.fundingTargetINR) * 100));

  return (
    <div className="group rounded-2xl glass-panel glass-panel-hover p-6 flex flex-col justify-between transition-all duration-300">
      <div className="space-y-4">
        {/* Header tags */}
        <div className="flex items-center justify-between gap-2">
          <DomainBadge domain={project.domain} />
          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-semibold">
            {project.status.replace('_', ' ')}
          </span>
        </div>

        {/* Title & Abstract */}
        <div className="space-y-1.5">
          <Link
            to={`/projects/${project.id}`}
            className="block text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug"
          >
            {project.title}
          </Link>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {project.abstract}
          </p>
        </div>

        {/* Lead Institution & Faculty PI */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <GraduationCap className="w-4 h-4 text-cyan-400 shrink-0" />
            <span className="truncate">{project.leadInstitution}</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>PI: {project.facultyMentor}</span>
            <span className="text-slate-500">{project.team.length} Team Members</span>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">R&D Roadmap Progress</span>
            <span className="text-cyan-400 font-bold">{project.progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-navy-900 border border-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>

        {/* Next Key Milestone */}
        {nextMilestone && (
          <div className="text-xs text-slate-400 flex items-start gap-2 pt-1">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <div className="line-clamp-1">
              <span className="text-slate-300 font-medium">Current Goal: </span>
              {nextMilestone.title}
            </div>
          </div>
        )}

        {/* Funding & Industry Pledges */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Funding Mobilized</span>
            <span className="font-bold text-emerald-400">
              ₹{(project.fundingReceivedINR / 100000).toFixed(1)}L
            </span>
            <span className="text-[10px] text-slate-500"> / ₹{(project.fundingTargetINR / 100000).toFixed(1)}L ({fundingPercent}%)</span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Industry Partners</span>
            <span className="text-xs font-semibold text-slate-200">
              {project.industryPartners.length} Pledged
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[11px] font-mono text-slate-500">{project.id}</span>
        <Link
          to={`/projects/${project.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Open Project Workspace</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
