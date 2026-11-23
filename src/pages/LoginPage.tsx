import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp, DEMO_PERSONAS } from '../context/AppContext';
import { StakeholderRole } from '../types';
import { 
  Users, 
  Landmark, 
  GraduationCap, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { activePersona, setActivePersonaRole, showToast } = useApp();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<StakeholderRole>(activePersona.role);
  const [email, setEmail] = useState('nodal.officer@jansetu.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const roleConfigs = [
    {
      role: 'citizen' as StakeholderRole,
      title: 'Citizen & Community Leader',
      icon: Users,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
      desc: 'Report hyper-local issues, provide photo evidence, and upvote community priorities.',
      dashboardRoute: '/citizen'
    },
    {
      role: 'government' as StakeholderRole,
      title: 'Government Nodal Officer',
      icon: Landmark,
      color: 'text-blue-400',
      border: 'hover:border-blue-500/50',
      desc: 'Audit evidence, verify challenges, assign institutional partners, and disburse pilot grants.',
      dashboardRoute: '/government'
    },
    {
      role: 'university' as StakeholderRole,
      title: 'University Faculty & Researchers',
      icon: GraduationCap,
      color: 'text-indigo-400',
      border: 'hover:border-indigo-500/50',
      desc: 'Browse department-aligned challenges, form student project teams, and build working prototypes.',
      dashboardRoute: '/university'
    },
    {
      role: 'industry' as StakeholderRole,
      title: 'Industry & CSR Partners',
      icon: Building2,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
      desc: 'Discover university prototypes, pledge CSR grants, assign mentors, and scale solutions.',
      dashboardRoute: '/industry'
    }
  ];

  const handleFastSwitch = (role: StakeholderRole, targetRoute: string) => {
    setActivePersonaRole(role);
    setSelectedRole(role);
    navigate(targetRoute);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setActivePersonaRole(selectedRole);
      setIsLoggingIn(false);
      const targetConfig = roleConfigs.find(c => c.role === selectedRole);
      navigate(targetConfig ? targetConfig.dashboardRoute : '/');
    }, 450);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-xs font-semibold text-cyan-400 border border-cyan-500/20">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Multi-Stakeholder Federated Access</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Access the JanSetu Innovation Portal
        </h1>
        <p className="text-slate-400 text-sm">
          Select your stakeholder domain or use the fast persona switcher to experience the platform across all perspectives.
        </p>
      </div>

      {/* Stakeholder Fast-Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {roleConfigs.map(c => {
          const Icon = c.icon;
          const isCurrent = activePersona.role === c.role;

          return (
            <div
              key={c.role}
              onClick={() => handleFastSwitch(c.role, c.dashboardRoute)}
              className={`p-6 rounded-2xl glass-panel cursor-pointer transition-all flex flex-col justify-between space-y-4 group ${c.border} ${
                isCurrent ? 'border-cyan-500/50 bg-navy-900/90 shadow-xl shadow-cyan-500/10' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl bg-white/5 ${c.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {isCurrent && (
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-500/30">
                      Active
                    </span>
                  )}
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {c.title}
                </h3>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {c.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-slate-300 group-hover:text-cyan-400">
                <span>Enter Workspace</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Traditional Auth Form for Completeness */}
      <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-5">
        <div className="space-y-1 text-center">
          <h3 className="text-base font-bold text-white">Federated SSO Login</h3>
          <p className="text-xs text-slate-400">
            Sign in with official state, academic, or corporate credentials
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          
          <div className="space-y-1">
            <label className="text-slate-300 uppercase tracking-wider text-[10px] font-bold">
              Stakeholder Role *
            </label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white"
            >
              <option value="citizen">Citizen & Community</option>
              <option value="government">Government Nodal Officer</option>
              <option value="university">University Faculty & Researcher</option>
              <option value="industry">Industry & CSR Partner</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 uppercase tracking-wider text-[10px] font-bold">
              Email / National ID *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-slate-300 uppercase tracking-wider text-[10px] font-bold">
              Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-navy-950 border border-white/10 text-white"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
          >
            {isLoggingIn ? (
              <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            ) : (
              <span>Authenticate & Enter Workspace</span>
            )}
          </button>
        </form>
      </div>

    </div>
  );
};
