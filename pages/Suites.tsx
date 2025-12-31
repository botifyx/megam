
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCT_SUITES } from '../constants';
import { 
  Layout, Bot, RefreshCw, ArrowRight, Activity, Hexagon, 
  ShieldCheck, Terminal, 
  Layers, BarChart3, Shield, ExternalLink, Cpu, Wifi, Lock, Check,
  Zap, Workflow
} from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import AIParticlesBackground from '../components/AIParticlesBackground';
import InteractiveBadge from '../components/InteractiveBadge';
import { useTheme } from '../context/ThemeContext';
import { Suite } from '../types';

// Memoized Renderer to prevent unnecessary repaints of heavy layout sections
const SuiteDetailRenderer = memo(({ suite, isReady }: { suite: Suite; isReady: boolean }) => {
  if (!isReady) return null;

  return (
    <div className="space-y-16 animate-hero-sub-stagger">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true"></div>
           <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.4em]">Protocol Abstract</span>
        </div>
        <p className="text-2xl text-slate-500 dark:text-gray-400 leading-relaxed font-light max-w-3xl">
          {suite.fullDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Section 1: Features (Lazy Mount Animation) */}
        <section className="space-y-8 p-8 rounded-[2rem] bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 opacity-0 animate-blur-in fill-mode-forwards" style={{ animationDelay: '0.1s' }} aria-labelledby={`features-heading-${suite.id}`}>
          <h3 id={`features-heading-${suite.id}`} className="flex items-center gap-3 text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.3em] border-l-2 border-brand-primary pl-4">
            Functional Core
          </h3>
          <ul className="grid grid-cols-1 gap-3" role="list">
            {suite.features.map((f, i) => (
              <li key={i} className="group/feature flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-primary/40 hover:translate-x-1">
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/feature:text-brand-primary transition-colors">
                  <Layers size={16} aria-hidden="true" />
                </div>
                <span className="text-sm text-slate-600 dark:text-gray-300 font-bold tracking-tight">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2: Benefits (Lazy Mount Animation) */}
        <section className="space-y-8 p-8 rounded-[2rem] bg-slate-50/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 opacity-0 animate-blur-in fill-mode-forwards" style={{ animationDelay: '0.3s' }} aria-labelledby={`benefits-heading-${suite.id}`}>
          <h3 id={`benefits-heading-${suite.id}`} className="flex items-center gap-3 text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.3em] border-l-2 border-brand-secondary pl-4">
            Strategic Outcomes
          </h3>
          <ul className="grid grid-cols-1 gap-3" role="list">
            {suite.benefits.map((b, i) => (
              <li key={i} className="group/benefit flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-black/20 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-secondary/40 hover:translate-x-1">
                <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/benefit:text-brand-secondary transition-colors">
                  <BarChart3 size={16} aria-hidden="true" />
                </div>
                <span className="text-sm text-slate-600 dark:text-gray-300 font-bold tracking-tight">{b}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      
      {/* Action Footer */}
      <div className="mt-20 pt-10 border-t border-slate-100 dark:border-white/10 flex flex-col items-center gap-12">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8">
           <div className="flex items-center gap-5">
              <div className="flex -space-x-3 shrink-0" aria-hidden="true">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-brand-surface bg-slate-200 dark:bg-white/10 overflow-hidden flex items-center justify-center">
                     <ShieldCheck size={16} className="text-brand-primary" />
                  </div>
                ))}
              </div>
              <div className="text-[10px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest leading-relaxed">
                Infrastructure Verified<br/>M365 NATIVE // GXP READY
              </div>
           </div>

           {suite.externalLink && (
            <a 
              href={suite.externalLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-white/10 flex items-center gap-3 uppercase tracking-[0.2em] text-[9px] whitespace-nowrap group/ext shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <span>Product Site</span>
              <ExternalLink size={12} className="group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5 transition-transform" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="w-full flex justify-center pt-4">
          <Link to="/contact" className="w-full sm:w-auto max-w-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-2xl">
            <button className="relative w-full group overflow-hidden rounded-2xl p-[1px] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-brand-primary/50">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-neon animate-shimmer opacity-80 group-hover:opacity-100 transition-opacity" aria-hidden="true"></div>
              <div className="relative bg-brand-primary dark:bg-brand-dark rounded-[15px] px-12 py-6 flex items-center justify-center gap-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-90 transition-opacity duration-500" aria-hidden="true"></div>
                <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" aria-hidden="true"></div>
                <span className="relative z-10 flex items-center gap-4 text-white font-black uppercase tracking-[0.25em] text-[11px] sm:text-[13px] whitespace-nowrap drop-shadow-sm">
                  Request Solution Blueprint 
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 ease-out" aria-hidden="true" />
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0%,transparent_70%)] pointer-events-none" aria-hidden="true"></div>
              </div>
            </button>
          </Link>
        </div>

        <div className="text-[9px] font-mono text-slate-400 dark:text-gray-700 uppercase tracking-[0.4em] text-center opacity-60">
           Architectural Review Protocol // Deployment Ready
        </div>
      </div>
    </div>
  );
}, (prev, next) => prev.suite.id === next.suite.id && prev.isReady === next.isReady);

SuiteDetailRenderer.displayName = 'SuiteDetailRenderer';

const SuiteDetailLoader: React.FC<{ suite: Suite; isSyncing: boolean }> = ({ suite, isSyncing }) => {
  const [loadState, setLoadState] = useState<'idle' | 'syncing' | 'metadata' | 'complete'>('idle');

  useEffect(() => {
    // Implementing strict mounting lifecycle for performance
    setLoadState('syncing');
    const t1 = setTimeout(() => setLoadState('metadata'), 300);
    const t2 = setTimeout(() => setLoadState('complete'), 700);
    return () => { 
      clearTimeout(t1); 
      clearTimeout(t2); 
    };
  }, [suite.id]);

  if (isSyncing || loadState === 'syncing') {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-12 min-h-[600px] py-20" role="status" aria-label="Establishing Uplink">
        <div className="relative">
          {/* High-Tech Data Pulse Animation */}
          <div className="absolute inset-0 rounded-full border border-brand-primary/20 animate-ping opacity-40" aria-hidden="true"></div>
          <div className="absolute inset-[-20px] rounded-full border border-brand-neon/10 animate-spin-slow" aria-hidden="true"></div>
          <Hexagon size={120} className="text-brand-primary/5 animate-pulse-glow" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap size={48} className="text-brand-primary animate-pulse" aria-hidden="true" />
          </div>
        </div>
        <div className="text-center space-y-4">
          <p className="text-[11px] font-mono font-bold text-brand-primary uppercase tracking-[0.8em] animate-pulse">Syncing Payload</p>
          <div className="flex gap-2 justify-center" aria-hidden="true">
             {[0, 0.2, 0.4].map((delay, i) => (
                <div key={i} className="w-1.5 h-1.5 bg-brand-primary/60 rounded-full animate-bounce" style={{ animationDelay: `${delay}s` }}></div>
             ))}
          </div>
          <p className="text-[9px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest mt-4">Node Link: M365_SECURE_VAULT_01</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`relative z-20 flex-grow flex flex-col transition-all duration-700 ${loadState === 'metadata' ? 'opacity-40 blur-sm scale-95' : 'opacity-100 blur-0 scale-100'}`}
      role="tabpanel"
      id={`panel-${suite.id}`}
      aria-labelledby={`tab-${suite.id}`}
      tabIndex={0}
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 border-b border-slate-100 dark:border-white/10 pb-16 transition-all">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-brand-primary" aria-hidden="true"></div>
            <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.5em]">Integrated Specification v4.2</span>
          </div>
          <h1 className="text-5xl lg:text-8xl font-black text-slate-900 dark:text-white tracking-tighter leading-none animate-hero-text-focus">
            {suite.title}
          </h1>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-brand-primary/10 rounded-lg text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest border border-brand-primary/20">
               {suite.productType}
             </div>
             <p className="text-slate-400 dark:text-gray-500 font-mono text-[10px] uppercase font-bold tracking-[0.2em]">{suite.shortDescription}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-end">
          <InteractiveBadge key={`maturity-${suite.id}`} label={suite.maturity} animationType="bounce" />
          {suite.badges.map((badge, idx) => (
            <InteractiveBadge key={`badge-${suite.id}-${idx}`} label={badge} delay={idx + 1} animationType="scale-up" />
          ))}
        </div>
      </div>

      {/* Lazy Content Mounting */}
      <SuiteDetailRenderer suite={suite} isReady={loadState === 'complete'} />
    </div>
  );
};

const Suites: React.FC = () => {
  const { suiteId } = useParams<{ suiteId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [activeSuiteId, setActiveSuiteId] = useState<string>(
    suiteId && PRODUCT_SUITES.some(s => s.id === suiteId) ? suiteId : PRODUCT_SUITES[0].id
  );
  
  const [isSyncing, setIsSyncing] = useState(false);
  const activeSuite = useMemo(() => PRODUCT_SUITES.find(s => s.id === activeSuiteId) || PRODUCT_SUITES[0], [activeSuiteId]);
  const icons = { Layout, Bot, RefreshCw, Shield, BarChart3, Layers, Box: Activity };

  useEffect(() => {
    if (suiteId && PRODUCT_SUITES.some(s => s.id === suiteId)) {
      if (suiteId !== activeSuiteId) {
        setIsSyncing(true);
        const timer = setTimeout(() => {
          setActiveSuiteId(suiteId);
          setIsSyncing(false);
        }, 400);
        return () => clearTimeout(timer);
      }
    }
  }, [suiteId, activeSuiteId]);

  const handleSuiteChange = (id: string) => {
    if (id === activeSuiteId) return;
    navigate(`/suites/${id}`);
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-brand-dark transition-colors duration-500 relative flex flex-col">
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1)_0%,transparent_60%)]"></div>
          <AIParticlesBackground />
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
       </div>

      <div className="relative z-10 pt-16 pb-20 text-center px-4">
          <RevealOnScroll animation="animate-tracking-in-expand">
            <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.6em] mb-4 block">Engineered Ecosystems</span>
            <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
               Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-brand-neon">Intelligence</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                Outcome-driven M365 solution patterns for regulated, enterprise-scale operations. Specialist Microsoft 365 workflow automation for global firms.
            </p>
          </RevealOnScroll>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 w-full relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
            <nav className="lg:col-span-4 space-y-4" aria-label="Product suites catalog">
               <div className="mb-6 px-4 flex items-center justify-between">
                  <h2 className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-widest flex items-center gap-2">
                     <Activity size={12} className="text-brand-primary animate-pulse" aria-hidden="true" /> Unified Catalog
                  </h2>
                  <span className="text-[9px] font-mono text-brand-success uppercase font-bold tracking-widest opacity-60">Status: Nominal</span>
               </div>
               <div role="tablist" aria-orientation="vertical" className="space-y-4">
                 {PRODUCT_SUITES.map((suite, idx) => {
                    const Icon = icons[suite.iconName as keyof typeof icons] || Activity;
                    const isActive = activeSuiteId === suite.id;
                    return (
                      <button
                        key={suite.id}
                        id={`tab-${suite.id}`}
                        onClick={() => handleSuiteChange(suite.id)}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`panel-${suite.id}`}
                        className={`group relative w-full text-left p-6 rounded-[2.5rem] border transition-all duration-500 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 dark:focus-visible:ring-offset-brand-dark ${
                          isActive 
                            ? 'bg-white dark:bg-brand-surface/80 border-brand-primary dark:border-brand-neon shadow-2xl scale-[1.02]' 
                            : 'bg-transparent border-slate-200 dark:border-white/5 opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-5">
                          <div className={`p-5 rounded-[1.5rem] transition-all duration-500 shrink-0 ${
                            isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:bg-brand-primary/5'
                          }`}>
                            <Icon size={24} aria-hidden="true" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-1 ${isActive ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400'}`}>
                              {suite.productType}
                            </p>
                            <h3 className={`font-bold text-base tracking-tight truncate ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-500'}`}>
                              {suite.title}
                            </h3>
                          </div>
                        </div>
                        {isActive && <div className="absolute top-0 right-0 p-4"><Check size={16} className="text-brand-primary animate-pulse" aria-hidden="true" /></div>}
                      </button>
                    );
                 })}
               </div>
            </nav>

            <main className="lg:col-span-8 h-full">
               <RevealOnScroll animation="animate-blur-in" delay={0.4} className="h-full">
                 <SpotlightCard 
                    className="h-full bg-white dark:bg-brand-surface/60 border-slate-200 dark:border-white/10 p-8 md:p-14 lg:p-20 shadow-2xl dark:shadow-none backdrop-blur-3xl flex flex-col overflow-hidden" 
                    spotlightColor={theme === 'dark' ? 'rgba(0, 240, 255, 0.08)' : 'rgba(59, 130, 246, 0.05)'}
                    enableTilt={true}
                 >
                    <SuiteDetailLoader suite={activeSuite} isSyncing={isSyncing} />
                 </SpotlightCard>
               </RevealOnScroll>
            </main>
         </div>
      </div>
    </div>
  );
};

export default Suites;
