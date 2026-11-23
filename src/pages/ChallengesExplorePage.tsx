import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChallengeCard } from '../components/shared/ChallengeCard';
import { ChallengeDomain, PriorityLevel, ChallengeStatus } from '../types';
import { Search, Filter, RotateCcw, MapPin, Sparkles } from 'lucide-react';

const DOMAINS: ChallengeDomain[] = [
  'Water Resources',
  'Agriculture & Soil',
  'Urban Infrastructure',
  'Clean Energy',
  'Healthcare & Sanitation',
  'Education & Rural Tech',
  'Waste Management',
  'Disaster Resilience'
];

export const ChallengesExplorePage: React.FC = () => {
  const { challenges } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredChallenges = challenges.filter(c => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.aiAnalysis.extractedKeywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDomain = selectedDomain === 'all' || c.domain === selectedDomain;
    const matchesPriority = selectedPriority === 'all' || c.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

    return matchesSearch && matchesDomain && matchesPriority && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedDomain('all');
    setSelectedPriority('all');
    setSelectedStatus('all');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>National Innovation Repository</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Explore Societal Challenges
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Search grassroots problems crowdsourced by citizens across India, prioritized by AI semantic triage, and open for university & industry partnership.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by keywords, problems (e.g. arsenic, froth, cold-chain), or district..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-navy-950/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          
          {/* Domain Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Domain / Sector
            </label>
            <select
              value={selectedDomain}
              onChange={e => setSelectedDomain(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-slate-200"
            >
              <option value="all">All Domains ({challenges.length})</option>
              {DOMAINS.map(d => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Urgency Level
            </label>
            <select
              value={selectedPriority}
              onChange={e => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-slate-200"
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical (Immediate)</option>
              <option value="high">High Severity</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Lifecycle Stage
            </label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-navy-950 border border-white/10 text-slate-200"
            >
              <option value="all">All Stages</option>
              <option value="submitted">Under Verification</option>
              <option value="verified">Verified by Govt</option>
              <option value="in_progress">R&D Active</option>
              <option value="completed">Field Deployed</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Showing <strong className="text-white">{filteredChallenges.length}</strong> of {challenges.length} societal challenges</span>
        <span>Sorted by Community Priority & Urgency</span>
      </div>

      {/* Cards Grid */}
      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map(c => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      ) : (
        <div className="p-16 rounded-2xl glass-panel text-center space-y-3">
          <p className="text-slate-300 font-semibold text-base">No matching challenges found</p>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            Try broadening your search term or resetting the sector filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
          >
            Clear Filters
          </button>
        </div>
      )}

    </div>
  );
};
