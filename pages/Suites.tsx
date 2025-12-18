
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCT_SUITES, ENGAGEMENT_MODELS } from '../constants';
import { 
  Layout, Bot, RefreshCw, ArrowRight, Zap, Cpu, Activity, Hexagon, 
  DollarSign, Clock, ShieldCheck, Terminal, Globe, Share2, 
  ChevronRight, Database, Box, BarChart3, Layers
} from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import AIParticlesBackground from '../components/AIParticlesBackground';
import { useTheme } from '../context/ThemeContext';

const Suites: React.FC = () => {
  const { suiteId } = useParams<{ suiteId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [activeSuiteId, setActiveSuiteId] = useState<string>(
    suiteId && PRODUCT_SUITES.some(s => s.id === suiteId) 
      ? suiteId 
      : PRODUCT_SUITES[0].id
  );
  
  const [isSyncing, setIsSyncing] = useState(false);
  const activeSuite = PRODUCT_SUITES.find(s => s.id === activeSuiteId) || PRODUCT_SUITES[0];
  const icons = { Layout, Bot, RefreshCw };

  useEffect(() => {
    if (suiteId && PRODUCT_SUITES.some(s => s.id === suiteId)) {
      if (suiteId !== activeSuiteId) {
        setIsSyncing(true);
        setTimeout(() => {
          setActiveSuiteId(suiteId);
          setIsSyncing(false);
        }, 300);
      }
    }
  }, [suiteId, activeSuiteId]);

  const handleSuiteChange = (id: string) => {
    if (id === activeSuiteId) return;
    navigate(`/suites/${id}`);
  };

  const SuiteNode: React.FC<{ suite: any, isActive: boolean }> = ({ suite, isActive }) => {
    const Icon = icons[suite.iconName as keyof typeof icons] || Box;
    return (
      <button
        onClick={() => handleSuiteChange(suite.id)}
        className={`group relative w-full text-left p-6 rounded-2xl border transition-all duration-500 overflow-hidden ${
          isActive 
            ? 'bg-white dark:bg-brand-surface/80 border-brand-primary dark:border-brand-neon shadow-2xl z-10' 
            : 'bg-transparent border-slate-200 dark:border-white/5 opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-white/20'
        }`}
      >
        {isActive && (
          <div className="absolute top-0 right-0 p-3">
             <div className="w-1.5 h-1.5 rounded-full bg-brand-primary dark:bg-brand-neon animate-pulse shadow-[0_0_10px_currentColor]"></div>
          </div>
        )}
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition-all duration-500 ${
            isActive ? 'bg-brand-primary text-white scale-110 shadow-lg' : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:scale-105'
          }`}>
            <Icon size={24} />
          </div>
          <div className="flex-grow min-w-0">
            <p className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400 dark:text-gray-600'}`}>
              Protocol {suite.id.toUpperCase().substring(0, 3)}
            </p>
            <h3 className={`font-bold text-sm tracking-tight truncate ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-500'}`}>
              {suite.title}
            </h3>
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-brand-dark transition-colors duration-500 relative flex flex-col">
       {/* High-Tech Canvas Layer */}
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1)_0%,transparent_60%)]"></div>
          <AIParticlesBackground />
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
       </div>

      {/* Header Section */}
      <div className="relative z-10 pt-16 pb-20 text-center px-4">
          <RevealOnScroll animation="animate-tracking-in-expand">
            <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.5em] mb-4 block">Solution Architecture</span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
               Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-brand-neon">Solutions</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                Strategic M365 ecosystems engineered for planetary scale and GxP compliance. 
                Deploy specialized intelligence nodes grounded in your enterprise data.
            </p>
          </RevealOnScroll>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 w-full relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Rail: System Navigator */}
            <div className="lg:col-span-4 space-y-4">
               <div className="mb-6 px-4 flex items-center justify-between">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-widest flex items-center gap-2">
                     <Activity size={12} className="text-brand-primary" /> Active Catalog
                  </h4>
                  <span className="text-[10px] font-mono text-brand-success uppercase font-bold tracking-widest">v4.0.2 Stable</span>
               </div>
               {PRODUCT_SUITES.map((suite) => (
                  <SuiteNode key={suite.id} suite={suite} isActive={activeSuiteId === suite.id} />
               ))}

               {/* Technical Status Card */}
               <div className="p-6 rounded-2xl bg-white/40 dark:bg-white/5 border border-slate-200 dark:border-white/5 mt-12 hidden lg:block">
                  <div className="flex items-center gap-3 mb-4">
                     <Terminal size={14} className="text-brand-primary" />
                     <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest">Uplink Telemetry</span>
                  </div>
                  <div className="space-y-3">
                     <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400 dark:text-gray-600 uppercase">M365 Latency</span>
                        <span className="text-brand-success font-bold">12ms - NOMINAL</span>
                     </div>
                     <div className="w-full h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-3/4 bg-brand-primary animate-shimmer"></div>
                     </div>
                     <div className="flex justify-between text-[10px] font-mono">
                        <span className="text-slate-400 dark:text-gray-600 uppercase">Compliance Layer</span>
                        <span className="text-brand-primary font-bold">GXP_AUDIT_ACTIVE</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Right Pane: Solution Workbench */}
            <div className="lg:col-span-8 min-h-[700px]">
               <RevealOnScroll animation="animate-blur-in" delay={0.4} className="h-full">
                 <SpotlightCard 
                    className="h-full bg-white dark:bg-brand-surface/60 border-slate-200 dark:border-white/10 p-8 md:p-16 shadow-2xl dark:shadow-none backdrop-blur-3xl flex flex-col overflow-visible" 
                    spotlightColor={theme === 'dark' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(59, 130, 246, 0.08)'}
                    enableTilt={true}
                 >
                    <div className={`relative z-20 flex-grow transition-all duration-700 ${isSyncing ? 'opacity-0 translate-x-8 blur-2xl grayscale' : 'opacity-100 translate-x-0 blur-0 grayscale-0'}`}>
                        {/* Workbench Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 dark:border-white/10 pb-10 transition-colors">
                           <div className="space-y-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-[1px] bg-brand-primary"></div>
                                 <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em]">Integrated Suite Specification</span>
                              </div>
                              <h2 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-none">{activeSuite.title}</h2>
                           </div>
                           <div className="flex gap-4">
                              <div className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center">
                                 <p className="text-[8px] font-mono text-slate-400 dark:text-gray-600 uppercase mb-1">Architecture</p>
                                 <p className="text-[10px] font-bold text-slate-900 dark:text-white font-mono">ODATA_v4</p>
                              </div>
                              <div className="px-4 py-2 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl text-center">
                                 <p className="text-[8px] font-mono text-slate-400 dark:text-gray-600 uppercase mb-1">Scale</p>
                                 <p className="text-[10px] font-bold text-slate-900 dark:text-white font-mono">PLANETARY</p>
                              </div>
                           </div>
                        </div>

                        {/* Description Section */}
                        <p className="text-2xl text-slate-500 dark:text-gray-400 mb-16 leading-relaxed font-light max-w-3xl">
                           {activeSuite.fullDescription}
                        </p>

                        {/* Technical Grid: Intense and Professional */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                           {/* Key Features as 'Logic Nodes' */}
                           <div className="space-y-8">
                              <h4 className="flex items-center gap-3 text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.3em] border-l-2 border-brand-primary pl-4">
                                 Functional Infrastructure
                              </h4>
                              <div className="grid grid-cols-1 gap-4">
                                 {activeSuite.features.map((f, i) => (
                                    <div key={i} className="group/feature flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-primary/40 hover:bg-white dark:hover:bg-white/10">
                                       <div className="w-10 h-10 rounded-lg bg-white dark:bg-brand-dark border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover/feature:text-brand-primary transition-colors">
                                          <Layers size={18} />
                                       </div>
                                       <span className="text-[14px] text-slate-600 dark:text-gray-300 font-bold tracking-tight">{f}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           {/* Business Impact as 'Outcome Nodes' */}
                           <div className="space-y-8">
                              <h4 className="flex items-center gap-3 text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.3em] border-l-2 border-brand-secondary pl-4">
                                 Strategic Outcomes
                              </h4>
                              <div className="grid grid-cols-1 gap-4">
                                 {activeSuite.benefits.map((b, i) => (
                                    <div key={i} className="group/benefit flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-secondary/40 hover:bg-white dark:hover:bg-white/10">
                                       <div className="w-10 h-10 rounded-lg bg-white dark:bg-brand-dark border border-slate-100 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover/benefit:text-brand-secondary transition-colors">
                                          <BarChart3 size={18} />
                                       </div>
                                       <span className="text-[14px] text-slate-600 dark:text-gray-300 font-bold tracking-tight">{b}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                        
                        {/* Dynamic Call-to-Action */}
                        <div className="mt-20 pt-10 border-t border-slate-100 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8 transition-colors">
                           <div className="flex items-center gap-4">
                              <div className="flex -space-x-3">
                                 {[1, 2, 3].map(i => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-brand-surface bg-slate-200 dark:bg-white/10 overflow-hidden">
                                       <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
                                          <ShieldCheck size={16} className="text-brand-primary" />
                                       </div>
                                    </div>
                                 ))}
                              </div>
                              <div className="text-[11px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest leading-relaxed">
                                 Compliance Verified<br/>SOC2 // HIPAA // GXP-READY
                              </div>
                           </div>
                           
                           <Link to="/contact">
                             <button className="group relative px-12 py-5 bg-brand-primary text-white rounded-2xl font-bold transition-all duration-500 shadow-xl hover:shadow-brand-primary/50 hover:scale-105 active:scale-95 overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                                <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.3em] text-xs">
                                   Request System Blueprint <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                             </button>
                           </Link>
                        </div>
                    </div>

                    {/* HUD Decorative Background Elements */}
                    <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-5 dark:opacity-10 scale-150 rotate-12">
                       <Hexagon size={300} strokeWidth={0.5} className="text-brand-primary" />
                    </div>
                 </SpotlightCard>
               </RevealOnScroll>
            </div>
         </div>

         {/* Detailed Pricing/Effort Matrix: Professional and Clear */}
         <RevealOnScroll className="mt-40">
            <div className="text-center mb-16">
               <span className="text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.5em] mb-4 block">Engagement Protocol</span>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">Operational Scaling</h2>
               <p className="text-slate-500 dark:text-gray-500 max-w-xl mx-auto font-light">Transparency-first pricing models for enterprise logic orchestration.</p>
            </div>
            
            <div className="max-w-5xl mx-auto overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-brand-surface/40 backdrop-blur-3xl shadow-2xl transition-colors">
               <table className="w-full text-left font-sans border-collapse">
                  <thead>
                     <tr className="bg-slate-50/50 dark:bg-black/40 text-slate-400 dark:text-brand-accent uppercase text-[10px] tracking-[0.4em] font-mono border-b border-slate-200 dark:border-white/5 transition-colors">
                        <th className="px-12 py-8">Service Module</th>
                        <th className="px-12 py-8">Engineering Cycle</th>
                        <th className="px-12 py-8 text-right">Standard Rate</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                     {ENGAGEMENT_MODELS.map((model, i) => (
                        <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                           <td className="px-12 py-10">
                              <div className="flex items-center gap-5">
                                 <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary/10 transition-all">
                                    <Globe size={18} />
                                 </div>
                                 <div>
                                    <p className="text-slate-900 dark:text-white font-extrabold text-base tracking-tight">{model.solution}</p>
                                    <p className="text-[9px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest mt-1">Status: Active Uplink</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-12 py-10">
                              <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium">
                                 <Clock size={14} className="text-brand-accent group-hover:rotate-45 transition-transform" /> 
                                 {model.effort}
                              </div>
                           </td>
                           <td className="px-12 py-10 text-right">
                              <span className="text-lg font-mono font-extrabold text-brand-primary dark:text-brand-neon bg-brand-primary/5 dark:bg-brand-neon/5 px-6 py-2 rounded-xl border border-brand-primary/20 dark:border-brand-neon/20 shadow-sm">
                                 {model.cost}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-8 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-1000">
               <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                  <Activity size={12} /> Real-time Scaling
               </div>
               <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-white/10"></div>
               <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                  <ShieldCheck size={12} /> Fixed-Scope Guarantee
               </div>
               <div className="hidden md:block w-px h-4 bg-slate-200 dark:bg-white/10"></div>
               <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                  <Database size={12} /> Secure On-Prem Connection
               </div>
            </div>
         </RevealOnScroll>
      </div>
    </div>
  );
};

export default Suites;
