import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ChallengeDomain, PriorityLevel, AIAnalysisResult } from '../types';
import { analyzeChallengeOffline } from '../services/aiService';
import { AIAnalysisBadge } from '../components/shared/AIAnalysisBadge';
import { 
  PlusCircle, 
  Sparkles, 
  Upload, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft, 
  Image as ImageIcon,
  Info,
  ShieldCheck,
  Building2,
  Navigation
} from 'lucide-react';

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

const SAMPLE_DISTRICTS = [
  { district: 'South East Delhi', state: 'Delhi NCR', lat: 28.5478, lng: 77.3113 },
  { district: 'Bengaluru Urban', state: 'Karnataka', lat: 12.9352, lng: 77.6744 },
  { district: 'Nashik', state: 'Maharashtra', lat: 20.0984, lng: 74.0537 },
  { district: 'Nalgonda', state: 'Telangana', lat: 17.0577, lng: 79.2684 },
  { district: 'Pune', state: 'Maharashtra', lat: 18.5204, lng: 73.8567 },
  { district: 'Varanasi', state: 'Uttar Pradesh', lat: 25.3176, lng: 82.9739 },
  { district: 'Changlang', state: 'Arunachal Pradesh', lat: 27.1245, lng: 95.7366 },
  { district: 'Kamrup Metro (Guwahati)', state: 'Assam', lat: 26.1445, lng: 91.7362 },
  { district: 'Jaipur', state: 'Rajasthan', lat: 26.9124, lng: 75.7873 }
];

const SAMPLE_EVIDENCE_IMAGES = [
  { label: 'Water Contamination & Froth', url: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Agritech Crop Rot / Storage', url: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Urban Culvert Drainage Silt', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Municipal Landfill Flare', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Rural Borewell Testing', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80' }
];

export const CitizenReportPage: React.FC = () => {
  const { challenges, addChallenge, activePersona } = useApp();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(SAMPLE_DISTRICTS[0].district);
  const [selectedState, setSelectedState] = useState(SAMPLE_DISTRICTS[0].state);
  const [selectedDomain, setSelectedDomain] = useState<ChallengeDomain>('Water Resources');
  const [imageUrl, setImageUrl] = useState(SAMPLE_EVIDENCE_IMAGES[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAiScanning, setIsAiScanning] = useState(false);
  const [aiPreview, setAiPreview] = useState<AIAnalysisResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-run AI Triage as user types with slight debounce
  useEffect(() => {
    if (title.trim().length > 10 || description.trim().length > 25) {
      setIsAiScanning(true);
      const timer = setTimeout(() => {
        const analysis = analyzeChallengeOffline({
          title,
          description,
          domain: selectedDomain,
          district: selectedDistrict,
          existingChallenges: challenges
        });
        setAiPreview(analysis);
        setIsAiScanning(false);
      }, 350);

      return () => clearTimeout(timer);
    } else {
      setAiPreview(null);
    }
  }, [title, description, selectedDomain, selectedDistrict, challenges]);

  const handleDistrictChange = (distName: string) => {
    setSelectedDistrict(distName);
    const found = SAMPLE_DISTRICTS.find(d => d.district === distName);
    if (found) {
      setSelectedState(found.state);
    }
  };

  const compressImageFile = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = () => resolve(event.target?.result as string);
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleCustomImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const compressedDataUrl = await compressImageFile(file);
      if (compressedDataUrl) {
        setImageUrl(compressedDataUrl);
      }
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim() || title.trim().length < 8) {
      errs.title = 'Title must be at least 8 characters explaining the societal issue.';
    }
    if (!description.trim() || description.trim().length < 30) {
      errs.description = 'Please provide detailed ground observations (at least 30 characters).';
    }
    if (!selectedDistrict) {
      errs.district = 'Select an affected district.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const finalAiAnalysis = aiPreview || analyzeChallengeOffline({
      title,
      description,
      domain: selectedDomain,
      district: selectedDistrict,
      existingChallenges: challenges
    });

    const distObj = SAMPLE_DISTRICTS.find(d => d.district === selectedDistrict);

    setTimeout(() => {
      const created = addChallenge({
        title,
        description,
        district: selectedDistrict,
        state: selectedState,
        coordinates: distObj ? { lat: distObj.lat, lng: distObj.lng } : undefined,
        domain: selectedDomain,
        priority: finalAiAnalysis.suggestedPriority,
        submittedBy: {
          name: activePersona.name,
          role: activePersona.title,
          badge: activePersona.badge
        },
        imageUrl,
        aiAnalysis: finalAiAnalysis
      });

      setIsSubmitting(false);
      navigate(`/challenges/${created.id}`);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb & Heading */}
      <div className="space-y-2">
        <Link
          to="/citizen"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Citizen Dashboard</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Submit a Grassroots Societal Challenge
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Report real-world community issues directly to academic research labs, state funding authorities, and CSR partners.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl glass-panel space-y-5">
            
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Problem Title *</span>
                <span className="text-[11px] text-slate-500 font-normal">Clear, specific statement</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Severe Fluoride & Arsenic in Village Drinking Wells"
                className={`w-full px-4 py-3 rounded-xl bg-navy-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                  errors.title ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                }`}
              />
              {errors.title && <p className="text-xs text-rose-400 mt-1">{errors.title}</p>}
            </div>

            {/* Domain & District Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Domain */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Affected Domain *
                </label>
                <select
                  value={selectedDomain}
                  onChange={e => setSelectedDomain(e.target.value as ChallengeDomain)}
                  className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  {DOMAINS.map(d => (
                    <option key={d} value={d} className="bg-navy-900 text-white">
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  District & State *
                </label>
                <select
                  value={selectedDistrict}
                  onChange={e => handleDistrictChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-navy-950/80 border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                >
                  {SAMPLE_DISTRICTS.map(d => (
                    <option key={d.district} value={d.district} className="bg-navy-900 text-white">
                      {d.district} ({d.state})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Detailed Field Observations *</span>
                <span className="text-[11px] text-slate-500 font-normal">Impacted residents, frequency, failure causes</span>
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Describe what occurs, who is affected (farmers, school children, households), duration of the issue, and why current civic maintenance has fallen short..."
                className={`w-full px-4 py-3 rounded-xl bg-navy-950/80 border text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all ${
                  errors.description ? 'border-rose-500' : 'border-white/10 focus:border-cyan-500'
                }`}
              />
              {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description}</p>}
            </div>

            {/* Photographic Evidence Attachment */}
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Ground Evidence Image
              </label>

              {/* Sample Photo Presets */}
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="text-[11px] text-slate-400 self-center mr-1">Quick Presets:</span>
                {SAMPLE_EVIDENCE_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(img.url)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      imageUrl === img.url
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {img.label}
                  </button>
                ))}
              </div>

              {/* Upload input or file drag */}
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <span>Choose local file</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCustomImageUpload}
                    className="hidden"
                  />
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="Or paste external image URL..."
                  className="flex-1 px-3 py-2 rounded-xl bg-navy-950/80 border border-white/10 text-xs text-white"
                />
              </div>

              {imageUrl && (
                <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 mt-3">
                  <img src={imageUrl} alt="Evidence preview" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-[10px] text-white backdrop-blur-md">
                    Evidence Attached
                  </div>
                </div>
              )}
            </div>

            {/* Submitter Persona Notice */}
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                Submitting as authenticated citizen:{' '}
                <span className="text-white font-medium">{activePersona.name}</span> ({activePersona.badge})
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-xl shadow-cyan-500/20 hover:shadow-cyan-500/35 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Registering & AI Classifying...</span>
                </>
              ) : (
                <>
                  <PlusCircle className="w-4 h-4" />
                  <span>Submit Challenge to JanSetu Network</span>
                </>
              )}
            </button>

          </div>
        </div>

        {/* Right Column: Real-Time AI Triage Feedback */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl glass-panel space-y-4 sticky top-28">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Real-Time AI Triage Engine
                </h3>
              </div>
              {isAiScanning && (
                <span className="text-[10px] text-cyan-400 font-mono animate-pulse">
                  Analyzing text...
                </span>
              )}
            </div>

            {aiPreview ? (
              <div className="space-y-4">
                <AIAnalysisBadge analysis={aiPreview} />

                {/* Duplicate Detection Alert if triggered */}
                {aiPreview.potentialDuplicateRisk.detected && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-bold text-amber-400">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Potential Duplicate Found ({aiPreview.potentialDuplicateRisk.highestMatchScore}% similarity)</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      A similar report was already logged: "{aiPreview.potentialDuplicateRisk.similarChallengeTitle}". You can still proceed; your submission will be cross-referenced to strengthen the community dossier.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 px-4 text-center space-y-3 border border-dashed border-white/10 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  Instant AI Classification
                </div>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
                  Start typing your challenge title and observations. JanSetu will automatically extract keywords, determine required research expertise, and match top university labs.
                </p>
              </div>
            )}

            <div className="pt-2 border-t border-white/5 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Info className="w-3.5 h-3.5 text-cyan-400" />
                <span>What happens after submission?</span>
              </div>
              <ul className="space-y-1 list-disc list-inside text-slate-400 pl-1">
                <li>Automated registration in district civic pool</li>
                <li>Audit by District Nodal Officer within 48 hours</li>
                <li>Notification sent to matched university labs</li>
              </ul>
            </div>

          </div>
        </div>

      </form>

    </div>
  );
};
