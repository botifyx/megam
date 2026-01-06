
import React, { useState, useEffect, useMemo, memo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PRODUCT_SUITES } from '../constants';
import { 
  Layout, Bot, RefreshCw, Activity, Hexagon, 
  ShieldCheck, Terminal, 
  Layers, BarChart3, Shield, ExternalLink, Cpu, Check,
  Zap, Workflow, ChevronRight
} from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import AIParticlesBackground from '../components/AIParticlesBackground';
import InteractiveBadge from '../components/InteractiveBadge';
import { useTheme } from '../context/ThemeContext';
import { Suite } from '../types';

/**
 * SuiteDetailContent is the "heavy" part of the UI that we lazy-load.
 * It only mounts when the suite is selected and the sync process is complete.
 */
const SuiteDetailContent = memo(({ suite }: { suite: Suite }) => {
  return (
    <div className="space-y-16 animate-hero-sub-stagger">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true"></div>
           <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-500 uppercase tracking-[0.4em]">Protocol Abstract</span>
        </div>
        <p className="text-xl md:text-2xl text-slate-500 dark:text-gray-400 leading-relaxed font-light max-w-4xl transition-colors">
          {suite.fullDescription}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="space-y-8 p-8 md:p-12 rounded-[2rem] bg-slate-50/50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5" aria-labelledby={`features-heading-${suite.id}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 id={`features-heading-${suite.id}`} className="flex items-center gap-3 text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.3em] border-l-2 border-brand-primary pl-4">
              Functional Core
            </h3>
            <span className="text-[8px] font-mono text-slate-400 dark:text-gray-600">MOD_ID: {suite.id.toUpperCase()}</span>
          </div>
          <ul className="grid grid-cols-1 gap-4" role="list">
            {suite.features.map((f, i) => (
              <li key={i} className="group/feature flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-primary/40 hover:translate-x-1 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/feature:text-brand-primary transition-colors">
                  <Layers size={18} aria-hidden="true" />
                </div>
                <span className="text-[13px] md:text-sm text-slate-700 dark:text-gray-300 font-bold tracking-tight">{f}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-8 p-8 md:p-12 rounded-[2rem] bg-slate-50/50 dark:bg-black/20 border border-slate-200/50 dark:border-white/5" aria-labelledby={`benefits-heading-${suite.id}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 id={`benefits-heading-${suite.id}`} className="flex items-center gap-3 text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.3em] border-l-2 border-brand-secondary pl-4">
              Strategic Outcomes
            </h3>
            <span className="text-[8px] font-mono text-slate-400 dark:text-gray-600">VERIFIED_METRIC</span>
          </div>
          <ul className="grid grid-cols-1 gap-4" role="list">
            {suite.benefits.map((b, i) => (
              <li key={i} className="group/benefit flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:border-brand-secondary/40 hover:translate-x-1 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover/benefit:text-brand-secondary transition-colors">
                  <BarChart3 size={18} aria-hidden="true" />
                </div>
                <span className="text-[13px] md:text-sm text-slate-700 dark:text-gray-300 font-bold tracking-tight">{b}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      
      <div className="mt-20 pt-16 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-slate-200 dark:bg-white/10" aria-hidden="true">
           <div className="absolute top-0 left-0 w-1/4 h-px bg-brand-primary"></div>
           <div className="absolute top-[-3px] left-1/4 w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
        </div>
        <div className="flex flex-col items-center gap-12">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-8">
             <div className="flex items-center gap-5">
                <div className="flex -space-x-4 shrink-0" aria-hidden="true">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-2xl border-2 border-white dark:border-brand-surface bg-slate-100 dark:bg-white/10 overflow-hidden flex items-center justify-center shadow-lg">
                       <ShieldCheck size={20} className="text-brand-primary" />
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest leading-relaxed">
                  Infrastructure Verified<br/>M365 NATIVE // DEPLOYMENT READY
                </div>
             </div>
             {suite.externalLink && (
              <a 
                href={suite.externalLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white rounded-2xl font-bold transition-all hover:bg-slate-50 dark:hover:bg-white/10 flex items-center gap-4 uppercase tracking-[0.2em] text-[10px] whitespace-nowrap group/ext shadow-sm"
              >
                <span>Product Site</span>
                <ExternalLink size={14} className="group-hover/ext:translate-x-0.5 group-hover/ext:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </a>
            )}
          </div>
          <div className="w-full flex justify-center pt-4">
            <Link to="/contact" className="w-full sm:w-auto max-w-xl">
              <button className="relative w-full group overflow-hidden rounded-2xl p-[1px] transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-neon animate-shimmer opacity-80" aria-hidden="true"></div>
                <div className="relative bg-white dark:bg-brand-dark rounded-[15px] px-14 py-7 flex items-center justify-center gap-6 overflow-hidden">
                  <div className="absolute inset-0 bg-brand-primary opacity-90 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true"></div>
                  <span className="relative z-10 flex items-center gap-4 text-white font-black uppercase tracking-[0.3em] text-[12px] sm:text-[14px] whitespace-nowrap drop-shadow-md">
                    Initialize Discovery Protocol 
                    <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform duration-300 ease-out" aria-hidden="true" />
                  </span>
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

SuiteDetailContent.displayName = 'SuiteDetailContent';

const Suites: React.FC = () => {
  const { suiteId } = useParams<{ suiteId: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const [activeSuiteId, setActiveSuiteId] = useState<string>(
    suiteId && PRODUCT_SUITES.some(s => s.id === suiteId) ? suiteId : PRODUCT_SUITES[0].id
  );
  
  const [isSyncing, setIsSyncing] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const activeSuite = useMemo(() => PRODUCT_SUITES.find(s => s.id === activeSuiteId) || PRODUCT_SUITES[0], [activeSuiteId]);
  const icons = { Layout, Bot, RefreshCw, Shield, BarChart3, Layers, Box: Activity };

  useEffect(() => {
    if (suiteId && PRODUCT_SUITES.some(s => s.id === suiteId)) {
      if (suiteId !== activeSuiteId) {
        setIsSyncing(true);
        setIsReady(false);
        const timer = setTimeout(() => {
          setActiveSuiteId(suiteId);
          setIsSyncing(false);
          // Small extra delay to feel like "data is processing" before rendering heavy components
          setTimeout(() => setIsReady(true), 200);
        }, 500);
        return () => clearTimeout(timer);
      }
    } else if (!isReady) {
      // Initial load
      setIsReady(true);
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

      <div className="relative z-10 pt-16 pb-12 text-center px-4">
          <RevealOnScroll animation="animate-tracking-in-expand">
            <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.6em] mb-4 block">Engineered Ecosystems</span>
            <h1 className="text-5xl md:text-8xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tighter">
               Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary dark:from-brand-primary dark:to-brand-neon">Intelligence</span>
            </h1>
          </RevealOnScroll>
          <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
            <p className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
                Outcome-driven M365 solution patterns for regulated, enterprise-scale operations.
            </p>
          </RevealOnScroll>
      </div>

      <div className="flex-grow max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 pb-32 w-full relative z-10">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Catalog Navigation (Sidebar) */}
            <nav className="lg:col-span-3 space-y-4 lg:sticky lg:top-32" aria-label="Product suites catalog">
               <div className="mb-6 px-6 flex items-center justify-between">
                  <h2 className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-widest flex items-center gap-2">
                     <Activity size={12} className="text-brand-primary animate-pulse" aria-hidden="true" /> Unified Catalog
                  </h2>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-brand-success rounded-full"></div>
                    <div className="w-1 h-1 bg-brand-success rounded-full animate-pulse"></div>
                  </div>
               </div>
               <div role="tablist" aria-orientation="vertical" className="space-y-4">
                 {PRODUCT_SUITES.map((suite) => {
                    const Icon = icons[suite.iconName as keyof typeof icons] || Activity;
                    const isActive = activeSuiteId === suite.id;
                    return (
                      <div
                        key={suite.id}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`panel-${suite.id}`}
                        onClick={() => handleSuiteChange(suite.id)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSuiteChange(suite.id)}
                        tabIndex={0}
                        className={`group relative w-full text-left p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
                          isActive 
                            ? 'bg-white dark:bg-brand-surface/90 border-brand-primary dark:border-brand-neon shadow-2xl scale-[1.02] z-10' 
                            : 'bg-white/40 dark:bg-transparent border-slate-200 dark:border-white/5 opacity-60 hover:opacity-100 hover:border-slate-300 dark:hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-5 relative z-10 mb-4">
                          <div className={`p-4 rounded-2xl transition-all duration-500 shrink-0 ${
                            isActive ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:bg-brand-primary/5'
                          }`}>
                            <Icon size={22} aria-hidden="true" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] mb-1 transition-colors ${isActive ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400'}`}>
                              {suite.productType}
                            </p>
                            <h3 className={`font-bold text-[15px] tracking-tight truncate transition-colors ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-500'}`}>
                              {suite.title}
                            </h3>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 relative z-10">
                           <InteractiveBadge label={suite.maturity} animationType="fade-in" />
                           {suite.badges.slice(0, 1).map((b, i) => (
                              <InteractiveBadge key={i} label={b} delay={0.2} animationType="fade-in" />
                           ))}
                        </div>

                        {isActive && (
                           <div className="absolute top-0 right-0 p-4 animate-wipe-in-right">
                              <Check size={14} className="text-brand-primary" aria-hidden="true" />
                           </div>
                        )}
                        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    );
                 })}
               </div>
            </nav>

            {/* Detailed View Main Area */}
            <main className="lg:col-span-9 h-full">
               <RevealOnScroll animation="animate-blur-in" delay={0.4} className="h-full">
                 <SpotlightCard 
                    className="h-full bg-white dark:bg-brand-surface/60 border-slate-200 dark:border-white/10 p-8 md:p-16 lg:p-24 shadow-2xl dark:shadow-none backdrop-blur-3xl flex flex-col overflow-visible" 
                    spotlightColor={theme === 'dark' ? 'rgba(0, 240, 255, 0.08)' : 'rgba(59, 130, 246, 0.05)'}
                    enableTilt={true}
                 >
                    {isSyncing ? (
                      <div className="h-full flex flex-col items-center justify-center space-y-12 min-h-[700px] py-20" role="status" aria-label="Establishing Uplink">
                        <div className="relative">
                          <Hexagon size={160} className="text-brand-primary/5 animate-pulse-glow" aria-hidden="true" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Zap size={64} className="text-brand-primary animate-pulse" aria-hidden="true" />
                          </div>
                        </div>
                        <div className="text-center space-y-4">
                          <p className="text-[12px] font-mono font-bold text-brand-primary uppercase tracking-[0.8em] animate-pulse">Syncing Specification</p>
                          <p className="text-[10px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest mt-8">Establishing GxP-Secured Node Tunnel...</p>
                        </div>
                        <div className="absolute top-0 left-0 right-0 h-px bg-brand-primary/20 dark:bg-brand-neon/20 animate-scan-line pointer-events-none" aria-hidden="true"></div>
                      </div>
                    ) : (
                      <div className="relative z-20 flex-grow flex flex-col" id={`panel-${activeSuite.id}`} role="tabpanel">
                        {/* SPECIFICATION HEADER */}
                        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 border-b border-slate-200/50 dark:border-white/10 pb-20">
                          <div className="lg:col-span-9 space-y-8">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-[1px] bg-brand-primary" aria-hidden="true"></div>
                              <span className="text-[11px] font-mono font-bold text-brand-primary uppercase tracking-[0.6em]">Integrated Specification v4.2</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] animate-hero-text-focus">
                              {activeSuite.title}
                            </h1>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
                               <div className="px-5 py-2.5 bg-brand-primary/10 dark:bg-white/5 rounded-xl text-[11px] font-mono font-bold text-brand-primary uppercase tracking-widest border border-brand-primary/30 flex items-center gap-3 shadow-sm">
                                 <Workflow size={14} aria-hidden="true" /> {activeSuite.productType}
                               </div>
                               <p className="text-slate-600 dark:text-gray-300 font-sans text-sm md:text-base font-medium tracking-tight leading-relaxed max-w-md">
                                 {activeSuite.shortDescription}
                               </p>
                            </div>
                          </div>
                          
                          <div className="lg:col-span-3 flex flex-col gap-4 lg:items-end">
                            <div className="mb-2 text-[9px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-widest lg:text-right">Deployment Status: Active</div>
                            <InteractiveBadge key={`maturity-${activeSuite.id}`} label={activeSuite.maturity} animationType="bounce" />
                            {activeSuite.badges.map((badge, idx) => (
                              <InteractiveBadge key={`badge-${activeSuite.id}-${idx}`} label={badge} delay={idx + 1} animationType="scale-up" />
                            ))}
                          </div>
                        </div>

                        {/* LAZY-LOADED CONTENT BLOCK */}
                        {isReady && <SuiteDetailContent suite={activeSuite} />}
                      </div>
                    )}
                 </SpotlightCard>
               </RevealOnScroll>
            </main>
         </div>
      </div>
    </div>
  );
};

export default Suites;
