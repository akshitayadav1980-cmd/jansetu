import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectCard } from '../components/shared/ProjectCard';
import { ChallengeDomain } from '../types';
import { Search, FolderGit2, Sparkles, Filter, RotateCcw } from 'lucide-react';

const DOMAINS: ChallengeDomain[] = [
  'Water Resources',
  'Agriculture & Soil',
  'Urban Infrastructure',
  'Clean Energy',
  'Healthcare & Sanitation',
  'Waste Management'
];

export const ProjectsPage: React.FC = () => {
  const { projects } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.leadInstitution.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.facultyMentor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = selectedDomain === 'all' || p.domain === selectedDomain;
    const matchesStatus = selectedStatus === 'all' || p.status === selectedStatus;

    return matchesSearch && matchesDomain && matchesStatus;
  });

  const totalFunding = projects.reduce((sum, p) => sum + p.fundingReceivedINR, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-xs font-semibold text-blue-400 border border-blue-500/20">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>University × Industry Collaboratory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Collaborative Innovation Projects
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Active university engineering initiatives turning verified citizen challenges into deployable prototypes with faculty guidance, student researchers, and industry CSR grants.
        </p>
      </div>

      {/* KPI Ticker */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-panel space-y-1">
          <div className="text-xs text-slate-400">Active R&D Projects</div>
          <div className="text-2xl font-black text-white">{projects.length}</div>
        </div>
        <div className="p-4 rounded-xl glass-panel space-y-1">
          <div className="text-xs text-slate-400">Total Capital Pledged</div>
          <div className="text-2xl font-black text-emerald-400">
            ₹{(totalFunding / 100000).toFixed(1)}L
          </div>
        </div>
        <div className="p-4 rounded-xl glass-panel space-y-1">
          <div className="text-xs text-slate-400">Participating Labs</div>
          <div className="text-2xl font-black text-cyan-400">
            {new Set(projects.map(p => p.leadInstitution)).size}
          </div>
        </div>
        <div className="p-4 rounded-xl glass-panel space-y-1">
          <div className="text-xs text-slate-400">Industry CSR Partners</div>
          <div className="text-2xl font-black text-blue-400">
            {projects.reduce((sum, p) => sum + p.industryPartners.length, 0)}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs">
          
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search projects, institutions, or faculty mentors..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-navy-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-slate-200"
            >
              <option value="all">All Domains</option>
              {DOMAINS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-slate-200"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Development</option>
              <option value="field_testing">Field Testing</option>
              <option value="deployed">Deployed in Community</option>
            </select>
          </div>

        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

    </div>
  );
};
