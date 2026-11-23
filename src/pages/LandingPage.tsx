import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { InteractiveGlobe } from '../components/3d/InteractiveGlobe';
import { ChallengeCard } from '../components/shared/ChallengeCard';
import { useApp } from '../context/AppContext';
import { PLATFORM_STATS } from '../services/mockData';
import { 
  ArrowRight, 
  PlusCircle, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  Landmark, 
  GraduationCap, 
  Building2, 
  Activity, 
  TrendingUp, 
  Target, 
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { challenges, projects } = useApp();
  const [activeTab, setActiveTab] = useState<'citizens' | 'government' | 'universities' | 'industry'>('citizens');

  // Featured 3 challenges
  const featuredChallenges = challenges.slice(0, 3);

  const stakeholderTabs = [
    {
      id: 'citizens',
      label: 'Citizens & Communities',
      icon: Users,
      headline: 'Crowdsource hyper-local civic realities directly to academia and state desks',
      description: 'Report civic issues with geospatial coordinates and photographic evidence. Real-time AI classification automatically routes reports without bureaucracy.',
      features: [
        'Zero-paperwork problem submission with automated geotagging',
        'Instant AI triage identifying domain, severity, and potential duplicates',
        'Transparent status tracking from verification to prototype deployment',
        'Community upvoting to signal grassroots urgency and demand'
      ],
      ctaText: 'Report a Community Problem',
      ctaLink: '/citizen/report'
    },
    {
      id: 'government',
      label: 'Government & Nodal Officers',
      icon: Landmark,
      headline: 'Evidence-backed triage, grant allocation and national mission alignment',
      description: 'District and state authorities review verified problems, approve pilot grants, and commission university research teams with digital auditability.',
      features: [
        'Geospatial district heat maps highlighting systemic urban and rural deficits',
        'AI-recommended institutional lab matching based on research track records',
        'Seamless pilot grant provisioning with digital milestone disbursement',
        'Direct alignment with PM-KUSUM, Jal Jeevan Mission, and Smart Cities mandates'
      ],
      ctaText: 'Open Government Desk',
      ctaLink: '/government'
    },
    {
      id: 'universities',
      label: 'Universities & Researchers',
      icon: GraduationCap,
      headline: 'Convert textbook engineering into funded, real-world societal impact',
      description: 'Faculty and student researchers adopt verified challenges as capstone projects, access state grants, and build field-ready working prototypes.',
      features: [
        'Browse curated problems mapped specifically to departmental expertise',
        'Form multidisciplinary student-faculty teams with faculty PI supervision',
        'Transparent milestone-driven roadmap and deliverable repositories',
        'Pathways to national patents, deeptech spin-offs, and conference papers'
      ],
      ctaText: 'Explore University Hub',
      ctaLink: '/university'
    },
    {
      id: 'industry',
      label: 'Industry & CSR Partners',
      icon: Building2,
      headline: 'Direct CSR capital and technical mentorship into audited deeptech solutions',
      description: 'Corporates, deeptech startups, and venture funds discover validated prototypes, pledge CSR grants, and offer cloud credits and fabrication facilities.',
      features: [
        'Discover high-TRL university prototypes ready for field scale and manufacturing',
        'One-click CSR pledge simulator with impact ROI and ESG compliance metrics',
        'Assign corporate technical mentors to guide student engineering teams',
        'Tax-exempt R&D sponsorship with verified grassroots field deployment'
      ],
      ctaText: 'Discover Projects for CSR',
      ctaLink: '/industry'
    }
  ];

  const currentStakeholder = stakeholderTabs.find(t => t.id === activeTab) || stakeholderTabs[0];
  const CurrentIcon = currentStakeholder.icon;

  return (
    <div className="space-y-28 overflow-hidden pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 md:pt-20">
        
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6 text-left"
            >
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs text-cyan-300">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-semibold tracking-wide uppercase">COMMUNITY INNOVATION NETWORK</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
                Big Problems.{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">
                  Collective Intelligence.
                </span>{' '}
                Real Impact.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal max-w-xl">
                A digital bridge transforming grassroots societal challenges into funded innovation projects by uniting citizens, government authorities, university research labs, and industry CSR partners.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/challenges"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all transform hover:-translate-y-0.5"
                >
                  <span>Explore Challenges</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/citizen/report"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-slate-200 hover:text-white font-semibold text-sm transition-all"
                >
                  <PlusCircle className="w-4 h-4 text-cyan-400" />
                  <span>Report a Problem</span>
                </Link>
              </div>

              {/* Live Metric Tickers */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-black text-white tracking-tight">1,840+</div>
                  <div className="text-xs text-slate-400 mt-0.5">Reported Challenges</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-cyan-400 tracking-tight">428</div>
                  <div className="text-xs text-slate-400 mt-0.5">Active Uni Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-emerald-400 tracking-tight">₹48.6 Cr</div>
                  <div className="text-xs text-slate-400 mt-0.5">Industry CSR Mobilized</div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero: 3D Interactive Centerpiece */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="lg:col-span-6 relative flex items-center justify-center"
            >
              <div className="w-full relative rounded-3xl overflow-hidden glass-panel border border-white/10 bg-navy-950/60 shadow-2xl">
                <InteractiveGlobe />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS: 4-STAGE INNOVATION PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            System Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How JanSetu Bridges the Innovation Gap
          </h2>
          <p className="text-slate-400 text-sm">
            From grassroots community observation to deployment on the ground, in four structured, auditable stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl glass-panel relative group hover:border-cyan-500/40 transition-all">
            <div className="text-5xl font-black text-white/5 absolute top-4 right-4 pointer-events-none group-hover:text-cyan-500/10 transition-colors">
              01
            </div>
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Crowdsource & Geotag</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Citizens and community leaders log hyper-local challenges with GPS tags and photo evidence directly through the mobile-first portal.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl glass-panel relative group hover:border-blue-500/40 transition-all">
            <div className="text-5xl font-black text-white/5 absolute top-4 right-4 pointer-events-none group-hover:text-blue-500/10 transition-colors">
              02
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-5">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">AI Triage & Govt Audit</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated NLP categorizes domain, assesses duplicate risk, and evaluates severity. Government nodal officers formally verify and allocate seed grants.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl glass-panel relative group hover:border-indigo-500/40 transition-all">
            <div className="text-5xl font-black text-white/5 absolute top-4 right-4 pointer-events-none group-hover:text-indigo-500/10 transition-colors">
              03
            </div>
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mb-5">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">University R&D Adoption</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Faculty PIs and student engineering teams adopt challenges as accredited research projects, developing bench prototypes and telemetry systems.
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl glass-panel relative group hover:border-emerald-500/40 transition-all">
            <div className="text-5xl font-black text-white/5 absolute top-4 right-4 pointer-events-none group-hover:text-emerald-500/10 transition-colors">
              04
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Industry Scale & Deploy</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Corporate CSR funds, venture mentors, and startups match funding to scale the prototype for municipal deployment and public impact.
            </p>
          </div>

        </div>
      </section>

      {/* STAKEHOLDER ECOSYSTEM EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl glass-panel border border-white/10 bg-navy-950/80 space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                Interactive Stakeholder Hubs
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Built Specifically for Each Key Actor
              </h2>
            </div>

            {/* Stakeholder Selector Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10">
              {stakeholderTabs.map(tab => {
                const isSelected = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stakeholder Detailed Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 border-t border-white/10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-xs text-cyan-300 border border-white/10">
                <CurrentIcon className="w-4 h-4 text-cyan-400" />
                <span>{currentStakeholder.label}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                {currentStakeholder.headline}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentStakeholder.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentStakeholder.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  to={currentStakeholder.ctaLink}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all"
                >
                  <span>{currentStakeholder.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl bg-navy-900/80 border border-white/10 space-y-4">
              <div className="text-xs uppercase font-bold text-slate-400 tracking-wider flex items-center justify-between">
                <span>Stakeholder Portal Preview</span>
                <span className="text-cyan-400 font-mono text-[10px]">LIVE WORKSPACE</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
                <div className="text-xs text-slate-400">Authenticated Role Context</div>
                <div className="text-sm font-semibold text-white flex items-center gap-2">
                  <CurrentIcon className="w-4 h-4 text-cyan-400" />
                  {currentStakeholder.label}
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-slate-400">Access Level:</span>
                  <span className="text-emerald-400 font-medium">Digital Signature & KYC Enabled</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-slate-400">Data Visibility:</span>
                  <span className="text-white font-medium">District & Pan-India Repository</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.02]">
                  <span className="text-slate-400">AI Assistance:</span>
                  <span className="text-cyan-400 font-medium">Automated Triage & Matching</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED SOCIETAL CHALLENGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
              Grassroots Innovation Pool
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Featured Societal Challenges
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Real community issues prioritized by citizens and currently under academic investigation.
            </p>
          </div>

          <Link
            to="/challenges"
            className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <span>View All {challenges.length} Challenges</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredChallenges.map(c => (
            <ChallengeCard key={c.id} challenge={c} />
          ))}
        </div>
      </section>

      {/* NATIONAL IMPACT METRICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-950/60 via-navy-900 to-navy-950 border border-blue-500/25 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4 mb-10">
            <span className="text-xs uppercase font-bold tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Measurable National Footprint
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Empowering India's Next Generation of Problem Solvers
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              By bringing university research out of silos and directly onto district ground realities, JanSetu accelerates indigenous technology transfer while training students on high-impact public engineering.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/10">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {PLATFORM_STATS.communitiesImpacted}
              </div>
              <div className="text-xs text-slate-400 mt-1">Benefited Citizens & Farmers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-cyan-400 tracking-tight">
                {PLATFORM_STATS.institutionsOnboarded}
              </div>
              <div className="text-xs text-slate-400 mt-1">Institutions & IIT/NIT Labs</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                {PLATFORM_STATS.industryPartnersPledged}
              </div>
              <div className="text-xs text-slate-400 mt-1">Corporate & Startup CSR Pledges</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-blue-400 tracking-tight">
                {PLATFORM_STATS.verifiedProblems}
              </div>
              <div className="text-xs text-slate-400 mt-1">Audited Grassroots Problems</div>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL ACTION BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Ready to Solve a Real Problem for India?
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto leading-relaxed">
          Whether you are a resident observing a local drinking water crisis, an engineering faculty researcher looking for funded capstones, or a corporate CSR team seeking verifiable impact.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/citizen/report"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 transition-all"
          >
            Submit a Community Problem
          </Link>
          <Link
            to="/projects"
            className="px-6 py-3.5 rounded-xl glass-panel hover:bg-white/10 text-white font-semibold text-sm transition-all"
          >
            View Active R&D Projects
          </Link>
        </div>
      </section>

    </div>
  );
};
