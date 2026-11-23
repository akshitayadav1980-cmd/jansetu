import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp, DEMO_PERSONAS } from '../../context/AppContext';
import { StakeholderRole } from '../../types';
import { 
  PlusCircle, 
  ChevronDown, 
  ShieldCheck, 
  Menu, 
  X, 
  Sparkles,
  Users,
  Landmark,
  GraduationCap,
  Building2,
  ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activePersona, setActivePersonaRole } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [personaDropdownOpen, setPersonaDropdownOpen] = useState(false);
  const [dashboardsOpen, setDashboardsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const roleIcons: Record<StakeholderRole, any> = {
    citizen: Users,
    government: Landmark,
    university: GraduationCap,
    industry: Building2,
    guest: Sparkles
  };

  const ActiveIcon = roleIcons[activePersona.role];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-navy-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  JS
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  JanSetu
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-normal">
                Communities × University × Industry
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 ml-4">
            <Link
              to="/challenges"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/challenges')
                  ? 'text-cyan-400 bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Explore Challenges
            </Link>

            <Link
              to="/projects"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/projects')
                  ? 'text-cyan-400 bg-white/5'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              R&D Projects
            </Link>

            {/* Stakeholder Dashboards Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDashboardsOpen(!dashboardsOpen)}
                onBlur={() => setTimeout(() => setDashboardsOpen(false), 200)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/citizen') ||
                  location.pathname.startsWith('/government') ||
                  location.pathname.startsWith('/university') ||
                  location.pathname.startsWith('/industry')
                    ? 'text-cyan-400 bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Stakeholder Hubs</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dashboardsOpen ? 'rotate-180' : ''}`} />
              </button>

              {dashboardsOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-xl glass-panel p-2 shadow-2xl border border-white/10 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <Link
                    to="/citizen"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                      <Users className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-cyan-300">Citizen Dashboard</div>
                      <div className="text-[11px] text-slate-400">Report & track civic problems</div>
                    </div>
                  </Link>

                  <Link
                    to="/government"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-blue-300">Government Portal</div>
                      <div className="text-[11px] text-slate-400">Triage, verify & allocate grants</div>
                    </div>
                  </Link>

                  <Link
                    to="/university"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-indigo-300">University R&D Hub</div>
                      <div className="text-[11px] text-slate-400">Faculty & student proposals</div>
                    </div>
                  </Link>

                  <Link
                    to="/industry"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-emerald-300">Industry & CSR Desk</div>
                      <div className="text-[11px] text-slate-400">Pledge funds, mentors & scale</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right CTA & Persona Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Quick Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setPersonaDropdownOpen(!personaDropdownOpen)}
              onBlur={() => setTimeout(() => setPersonaDropdownOpen(false), 200)}
              className="flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-all text-xs"
              title="Switch demo stakeholder persona"
            >
              <div className="relative">
                <img
                  src={activePersona.avatar}
                  alt={activePersona.name}
                  className="w-6 h-6 rounded-full object-cover border border-cyan-400/50"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-navy-950" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[11px] font-semibold text-white leading-tight">
                  {activePersona.name.split(' ')[0]} ({activePersona.role})
                </div>
                <div className="text-[9px] text-cyan-400 uppercase tracking-wider font-semibold">
                  Demo Persona
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {personaDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl glass-panel p-2 shadow-2xl border border-white/15 z-50">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Stakeholder Persona Switcher
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Experience JanSetu across all 4 stakeholders:
                  </div>
                </div>

                {(Object.keys(DEMO_PERSONAS) as StakeholderRole[])
                  .filter(r => r !== 'guest')
                  .map(role => {
                    const p = DEMO_PERSONAS[role];
                    const isSelected = activePersona.role === role;
                    const Icon = roleIcons[role];

                    return (
                      <button
                        key={role}
                        onClick={() => {
                          setActivePersonaRole(role);
                          setPersonaDropdownOpen(false);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border border-blue-500/40 text-white'
                            : 'hover:bg-white/5 text-slate-300'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-navy-800 border border-white/10 shrink-0">
                          <Icon className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-white flex items-center justify-between">
                            <span>{p.name}</span>
                            <span className="text-[10px] uppercase tracking-wider font-bold text-cyan-400">
                              {p.role}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">{p.title}</div>
                          <div className="text-[10px] text-slate-500 truncate">{p.organization}</div>
                        </div>
                      </button>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Report Problem Button */}
          <Link
            to="/citizen/report"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Problem</span>
          </Link>

          {/* Login Link */}
          <Link
            to="/login"
            className="text-xs font-medium text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            Portal Access
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-navy-950/95 backdrop-blur-2xl px-4 py-6 space-y-4">
          <Link
            to="/challenges"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-cyan-400"
          >
            Explore Societal Challenges
          </Link>
          <Link
            to="/projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-slate-200 hover:text-cyan-400"
          >
            Collaborative Projects
          </Link>
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Stakeholder Portals</div>
            <Link
              to="/citizen"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-cyan-400"
            >
              <Users className="w-4 h-4 text-cyan-400" />
              Citizen Dashboard
            </Link>
            <Link
              to="/government"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-blue-400"
            >
              <Landmark className="w-4 h-4 text-blue-400" />
              Government Review Desk
            </Link>
            <Link
              to="/university"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-indigo-400"
            >
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              University R&D Portal
            </Link>
            <Link
              to="/industry"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-emerald-400"
            >
              <Building2 className="w-4 h-4 text-emerald-400" />
              Industry & CSR Desk
            </Link>
          </div>

          {/* Mobile Persona Switcher */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="uppercase font-bold text-slate-400 tracking-wider">Switch Persona</span>
              <span className="text-[10px] text-cyan-400 font-semibold uppercase">{activePersona.role}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(DEMO_PERSONAS) as StakeholderRole[])
                .filter(r => r !== 'guest')
                .map(role => {
                  const p = DEMO_PERSONAS[role];
                  const isSelected = activePersona.role === role;
                  const Icon = roleIcons[role];

                  return (
                    <button
                      key={role}
                      onClick={() => {
                        setActivePersonaRole(role);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-all ${
                        isSelected
                          ? 'bg-blue-600/30 border border-blue-500/50 text-white font-semibold'
                          : 'bg-white/[0.03] border border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <div className="min-w-0 truncate">
                        <div className="truncate font-medium">{p.name.split(' ')[0]}</div>
                        <div className="text-[9px] text-slate-500 uppercase font-mono">{role}</div>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
          <div className="pt-4">
            <Link
              to="/citizen/report"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-semibold"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report a Problem Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
