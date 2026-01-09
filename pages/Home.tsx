
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
   ArrowRight, Box, Zap, Layout, Bot, RefreshCw, Layers, Database, Globe, Cpu,
   Terminal, Sparkles, ChevronRight, PlusSquare, TrendingUp, Printer, Shield,
   Settings, Heart, Award, Users, Handshake, Activity, ShieldCheck,
   Wifi, Code, Hexagon, Circle, Square, Triangle, Diamond, BarChart3
} from 'lucide-react';
import LiveOpsConsole from '../components/LiveOpsConsole';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import AIParticlesBackground from '../components/AIParticlesBackground';
import InteractiveBadge from '../components/InteractiveBadge';
import { PRODUCT_SUITES, WHY_MEGAM, INDUSTRIES, COMPANY_OVERVIEW } from '../constants';
import { Suite } from '../types';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
   const [activeSuiteId, setActiveSuiteId] = useState(PRODUCT_SUITES[0].id);
   const [isSyncing, setIsSyncing] = useState(false);
   const [activePillarIndex, setActivePillarIndex] = useState(0);
   const methodologyRef = useRef<HTMLElement>(null);
   const activeSuite = PRODUCT_SUITES.find(s => s.id === activeSuiteId) || PRODUCT_SUITES[0];
   const { theme } = useTheme();

   const suiteIcons = { Layout, Bot, RefreshCw, Shield, BarChart3, Layers, Box };

   useEffect(() => {
      let interval: number;
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (entry.isIntersecting) {
               // Increased interval to 3 seconds for better readability
               interval = window.setInterval(() => {
                  setActivePillarIndex((prev) => (prev + 1) % 4);
               }, 3000);
            } else {
               clearInterval(interval);
            }
         },
         { threshold: 0.2 }
      );

      if (methodologyRef.current) {
         observer.observe(methodologyRef.current);
      }

      return () => {
         observer.disconnect();
         clearInterval(interval);
      };
   }, []);

   const handleSuiteChange = (id: string) => {
      if (id === activeSuiteId) return;
      setIsSyncing(true);
      setTimeout(() => {
         setActiveSuiteId(id);
         setIsSyncing(false);
      }, 400);
   };

   const SuiteTabItem: React.FC<{ suite: Suite, isActive: boolean, onClick: () => void }> = ({ suite, isActive, onClick }) => {
      const Icon = (suiteIcons[suite.iconName as keyof typeof suiteIcons]) || Box;

      return (
         <button
            onClick={onClick}
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${suite.id}`}
            id={`tab-${suite.id}`}
            className={`relative flex-1 flex flex-col items-center gap-3 py-6 md:py-8 px-2 md:px-4 transition-all duration-500 group border-r border-slate-200 dark:border-white/5 last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary ${isActive
                  ? 'bg-white/60 dark:bg-white/10 backdrop-blur-xl z-10 shadow-inner'
                  : 'bg-transparent opacity-60 hover:opacity-100 hover:bg-slate-50 dark:hover:bg-white/5'
               }`}
         >
            <div className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-500 ${isActive
                  ? 'bg-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/30'
                  : 'bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-gray-500 group-hover:scale-105'
               }`}>
               <Icon size={20} className="md:w-6 md:h-6" strokeWidth={isActive ? 2.5 : 1.5} aria-hidden="true" />
            </div>
            <div className="text-center hidden sm:block">
               <h3 className={`font-bold text-[10px] lg:text-[12px] tracking-tight transition-colors mb-0.5 truncate max-w-[100px] lg:max-w-[130px] ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-600'}`}>
                  {suite.title}
               </h3>
               <div className="flex items-center justify-center gap-1.5">
                  <div className={`w-1 h-1 rounded-full ${isActive ? 'bg-brand-primary dark:bg-brand-neon animate-pulse' : 'bg-slate-300 dark:bg-gray-800'}`}></div>
                  <span className={`text-[6px] font-mono font-bold uppercase tracking-[0.1em] ${isActive ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400 dark:text-gray-700'}`}>
                     {suite.maturity}
                  </span>
               </div>
            </div>

            <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-700 ${isActive ? 'bg-brand-primary dark:bg-brand-neon scale-x-100 opacity-100' : 'bg-transparent scale-x-0 opacity-0'
               }`} aria-hidden="true"></div>
         </button>
      );
   };

   const StrategicPillar: React.FC<{ icon: any, label: string, desc: string, detail: string, delay: number, isActive: boolean }> = ({ icon: Icon, label, desc, detail, delay, isActive }) => (
      <RevealOnScroll animation="animate-fade-in-up" delay={delay} className="flex-grow">
         <div className={`group relative flex flex-col h-full bg-white dark:bg-brand-surface/20 border rounded-2xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm dark:shadow-none transform-gpu ${isActive
               ? 'border-brand-primary dark:border-brand-neon -translate-y-3 scale-[1.03] shadow-2xl shadow-brand-primary/15 dark:shadow-brand-neon/10 z-20'
               : 'border-slate-200 dark:border-white/5 hover:border-brand-primary dark:hover:border-brand-neon/40 hover:-translate-y-1'
            }`}>
            <div className={`absolute inset-0 bg-gradient-to-b from-brand-primary/5 dark:from-brand-neon/10 to-transparent transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} aria-hidden="true"></div>

            <div className="p-5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center transition-colors">
               <div className={`text-[9px] font-mono font-bold tracking-[0.3em] transition-colors uppercase ${isActive ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400 dark:text-gray-600 group-hover:text-brand-primary dark:group-hover:text-brand-neon'}`}>
                  STRAT_NODE_0{Math.floor(delay * 10)}
               </div>
               <div className="flex gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${isActive ? 'bg-brand-primary dark:bg-brand-neon scale-125 shadow-[0_0_8px_currentColor]' : 'bg-slate-200 dark:bg-gray-800'} animate-pulse`} aria-hidden="true"></div>
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-700 delay-100 ${isActive ? 'bg-brand-primary/60 dark:bg-brand-neon/60' : 'bg-slate-200 dark:bg-gray-800'}`} aria-hidden="true"></div>
               </div>
            </div>

            <div className="p-10 flex flex-col items-center justify-center text-center flex-grow">
               <div className={`relative mb-8 transition-all duration-700 transform-gpu ${isActive ? 'text-brand-primary dark:text-brand-neon scale-110' : 'text-slate-300 dark:text-gray-600 group-hover:text-brand-primary dark:group-hover:text-brand-neon group-hover:scale-105'}`}>
                  {/* Enhanced Neural Pulse Background */}
                  <div className={`absolute inset-[-20px] rounded-full blur-2xl transition-all duration-1000 ${isActive ? 'bg-brand-primary/20 dark:bg-brand-neon/20 opacity-100 animate-pulse' : 'bg-brand-primary/0 opacity-0'}`} aria-hidden="true"></div>
                  <div className={`absolute inset-[-10px] rounded-full border border-brand-primary/10 dark:border-brand-neon/10 transition-all duration-1000 ${isActive ? 'scale-125 opacity-40' : 'scale-75 opacity-0'}`} aria-hidden="true"></div>

                  <Icon size={56} strokeWidth={isActive ? 1.5 : 1} aria-hidden="true" className="relative z-10" />
               </div>

               <h3 className={`font-bold text-xl mb-3 tracking-tight transition-colors ${isActive ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-neon'}`}>
                  {label}
               </h3>
               <p className={`text-[13px] font-medium mb-8 leading-relaxed px-4 transition-colors duration-500 ${isActive ? 'text-slate-700 dark:text-gray-300' : 'text-slate-500 dark:text-gray-500'}`}>
                  {desc}
               </p>

               <div className="pt-6 border-t border-slate-100 dark:border-white/5 w-full transition-colors">
                  <div className={`text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.25em] transform transition-all duration-700 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                     {detail}
                  </div>
               </div>
            </div>

            {/* Precision Scanning Line */}
            {isActive && (
               <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-primary dark:bg-brand-neon animate-scan-line pointer-events-none opacity-40 shadow-[0_0_15px_currentColor]" aria-hidden="true"></div>
            )}

            {/* Corner Decals */}
            {isActive && (
               <div className="absolute bottom-2 right-2 flex gap-1 opacity-40" aria-hidden="true">
                  <div className="w-1 h-1 bg-brand-primary dark:bg-brand-neon"></div>
                  <div className="w-1 h-1 bg-brand-primary dark:bg-brand-neon"></div>
               </div>
            )}
         </div>
      </RevealOnScroll>
   );

   return (
      <div className="flex flex-col min-h-screen">
         <header className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#f1f5f9_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_center,#0f172a_0%,#020617_100%)]" aria-hidden="true"></div>
            <AIParticlesBackground />
            <div className="absolute inset-0 z-0 overflow-hidden opacity-10 dark:opacity-30 pointer-events-none perspective-1000">
               <div className="absolute inset-x-0 bottom-0 h-[600px] origin-bottom transform rotate-x-12 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_top,black_40%,transparent_100%)] animate-grid-move" aria-hidden="true"></div>
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div className="space-y-10 text-center lg:text-left relative">
                     <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-brand-primary/10 dark:border-brand-neon/20 bg-white dark:bg-brand-neon/5 backdrop-blur-xl opacity-0 animate-wipe-in-right shadow-sm">
                        <div className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary dark:bg-brand-neon opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary dark:bg-brand-neon"></span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-blue-100 tracking-[0.4em] uppercase font-mono">Mission Active</span>
                     </div>
                     <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-extrabold tracking-tighter text-slate-900 dark:text-white leading-[0.9] mb-8 overflow-hidden transition-colors">
                        <span className="text-mask">
                           <span className="block opacity-0 animate-hero-title-reveal">AI-Native</span>
                        </span>
                        <span className="text-mask">
                           <span className="block opacity-0 animate-hero-title-reveal relative mt-2 lg:mt-1" style={{ animationDelay: '0.2s' }}>
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-600 to-indigo-600 dark:from-brand-neon dark:via-brand-primary dark:to-brand-secondary">Operations</span>
                           </span>
                        </span>
                     </h1>
                     <p className="text-xl text-slate-600 dark:text-blue-200/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light opacity-0 animate-cinematic-reveal transition-colors" style={{ animationDelay: '0.5s' }}>
                        Engineering high-touch <span className="text-slate-900 dark:text-white font-semibold border-b border-brand-primary/40">Microsoft 365 solutions</span> and artwork approval workflows for regulated industries.<br />
                        Precision workflows enhanced by Copilot-driven intelligence and governed automation.
                     </p>
                     <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start opacity-0 animate-hero-sub-stagger" style={{ animationDelay: '0.8s' }}>
                        <Link to="/contact" className="w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg">
                           <button className="group relative w-full px-10 py-5 bg-brand-primary text-white rounded-lg font-bold transition-all duration-300 shadow-xl hover:shadow-brand-primary/30 dark:hover:shadow-brand-primary/50 overflow-hidden">
                              <span className="relative z-10 flex items-center justify-center gap-3 font-mono uppercase tracking-[0.2em] text-sm">Initialize Demo <Terminal size={18} aria-hidden="true" /></span>
                           </button>
                        </Link>
                        <Link to="/suites" className="w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg">
                           <button className="group relative w-full px-10 py-5 bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 text-slate-600 dark:text-blue-100 rounded-lg font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-brand-primary/5 shadow-sm dark:shadow-none">
                              <span className="relative z-10 flex items-center justify-center gap-2 font-mono tracking-widest text-sm uppercase">View Solutions</span>
                           </button>
                        </Link>
                     </div>
                  </div>
                  <div className="relative perspective-1000 group animate-float hidden lg:block" aria-hidden="true">
                     <div className="absolute inset-0 bg-brand-primary/10 dark:bg-brand-primary/20 blur-[80px] rounded-full"></div>
                     <div className="relative transform rotate-y-[-8deg] rotate-x-[5deg]">
                        <div className="relative bg-white/90 dark:bg-[#020617]/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-500">
                           <LiveOpsConsole />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>

         <section ref={methodologyRef} className="py-24 bg-white dark:bg-[#020617] border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-500" aria-labelledby="methodology-heading">
            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-16">
                  <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em]">Operational DNA</span>
                  <h2 id="methodology-heading" className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">Megam Methodology for Regulated Industries</h2>
                  <p className="text-slate-500 dark:text-gray-500 mt-4 max-w-xl mx-auto font-light">The four pillars of our high-touch engagement model and Microsoft 365 expertise.</p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  <StrategicPillar icon={Circle} label="Continuity" desc="White-glove Microsoft 365 support ensures operational stability, rapid response, and uninterrupted business workflows." detail="SLAs • Support • Stability" delay={0.1} isActive={activePillarIndex === 0} />
                  <StrategicPillar icon={Diamond} label="Precision" desc="Purpose-built engineering for regulated and GxP-aligned industries, with audit-ready workflows and compliance-first design." detail="Compliance • Auditability • Control" delay={0.2} isActive={activePillarIndex === 1} />
                  <StrategicPillar icon={Square} label="Foundation" desc="Secure, scalable architecture connecting Microsoft 365, Power Platform, and enterprise systems through governed integration layers." detail="Architecture • Integration • Scale" delay={0.3} isActive={activePillarIndex === 2} />
                  <StrategicPillar icon={Triangle} label="Intelligence" desc="Embedding Copilot-driven intelligence into workflows using Microsoft Copilot Studio and Graph context is always governed." detail="Copilot • Context • Governance" delay={0.4} isActive={activePillarIndex === 3} />
               </div>
            </div>
         </section>

         <section className="py-20 md:py-32 bg-slate-50 dark:bg-[#020617] relative overflow-hidden transition-colors duration-500" aria-labelledby="suites-heading">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none z-0" aria-hidden="true"></div>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
               <div className="text-center mb-12 md:mb-20">
                  <RevealOnScroll animation="animate-tracking-in-expand">
                     <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.5em] mb-4 block">Product Core</span>
                     <h2 id="suites-heading" className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Impact Suites</h2>
                  </RevealOnScroll>
                  <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
                     <p className="text-slate-500 dark:text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light px-4">Outcome-driven solution patterns engineered for Microsoft 365 workflow automation.</p>
                  </RevealOnScroll>
               </div>

               <div className="max-w-6xl mx-auto">
                  <div role="tablist" className="flex border border-slate-200 dark:border-white/10 rounded-t-[1.5rem] md:rounded-t-[2.5rem] overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-md transition-all shadow-xl" aria-label="Product impact suites selection">
                     {PRODUCT_SUITES.map((suite) => (
                        <SuiteTabItem
                           key={suite.id}
                           suite={suite}
                           isActive={activeSuiteId === suite.id}
                           onClick={() => handleSuiteChange(suite.id)}
                        />
                     ))}
                  </div>

                  <div className="relative">
                     <SpotlightCard
                        className="rounded-t-none rounded-b-[1.5rem] md:rounded-b-[3rem] bg-white dark:bg-brand-surface/40 border-t-0 border-slate-200 dark:border-white/10 backdrop-blur-3xl p-6 md:p-12 lg:p-20 flex flex-col shadow-2xl dark:shadow-none min-h-[500px] lg:min-h-[600px] overflow-hidden"
                        spotlightColor={theme === 'dark' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(59, 130, 246, 0.08)'}
                        enableTilt={true}
                     >
                        <div
                           className={`relative z-20 flex-grow transition-all duration-700 ${isSyncing ? 'opacity-0 translate-y-8 scale-95 blur-xl' : 'opacity-100 translate-y-0 scale-100'}`}
                           role="tabpanel"
                           id={`panel-${activeSuite.id}`}
                           aria-labelledby={`tab-${activeSuite.id}`}
                           tabIndex={0}
                        >
                           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-12 items-center">
                              <div
                                 className="lg:col-span-7 space-y-6 md:space-y-10"
                                 style={{ transform: 'translate(calc(var(--mouse-x, 0) * 4px), calc(var(--mouse-y, 0) * 4px))' }}
                              >
                                 <div>
                                    <div className="flex items-center gap-3 mb-4">
                                       <div className="w-6 md:w-8 h-[1px] bg-brand-primary" aria-hidden="true"></div>
                                       <span className="text-[9px] md:text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em]">{activeSuite.productType}</span>
                                    </div>
                                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
                                       {activeSuite.title}
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8">
                                       <InteractiveBadge label={activeSuite.maturity} delay={1} />
                                       {activeSuite.badges.map((badge, idx) => (
                                          <InteractiveBadge key={idx} label={badge} delay={idx + 2} />
                                       ))}
                                    </div>
                                 </div>

                                 <p className="text-base md:text-lg lg:text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed max-w-xl">
                                    {activeSuite.fullDescription}
                                 </p>

                                 <div className="flex items-center gap-6 pt-4 md:pt-6">
                                    <Link to={`/suites/${activeSuite.id}`} className="w-full sm:w-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl">
                                       <button className="group relative w-full sm:w-auto bg-brand-primary text-white font-bold py-4 px-8 md:px-10 rounded-xl overflow-hidden shadow-xl hover:shadow-brand-primary/40 transition-all hover:scale-105 active:scale-95">
                                          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" aria-hidden="true"></div>
                                          <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest text-[9px] md:text-[10px]">
                                             Solution Specification <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                          </span>
                                       </button>
                                    </Link>
                                 </div>
                              </div>

                              <div
                                 className="lg:col-span-5 space-y-8 md:space-y-12"
                                 style={{ transform: 'translate(calc(var(--mouse-x, 0) * 6px), calc(var(--mouse-y, 0) * 6px))' }}
                              >
                                 <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/10 group/node hover:border-brand-primary/30 transition-all shadow-sm">
                                    <h4 className="text-[9px] md:text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-3">
                                       <Hexagon size={14} className="text-brand-neon animate-pulse" aria-hidden="true" /> Core Infrastructure
                                    </h4>
                                    <ul className="space-y-3 md:space-y-4" role="list">
                                       {activeSuite.features.slice(0, 4).map((f, i) => (
                                          <li key={i} className="flex items-start gap-4 text-[12px] md:text-[13px] text-slate-500 dark:text-gray-400 font-medium group-hover/node:text-slate-800 dark:group-hover/node:text-gray-200 transition-colors leading-tight">
                                             <div className="mt-1 w-2 h-2 rounded-full border border-brand-primary/40 flex items-center justify-center shrink-0" aria-hidden="true">
                                                <div className="w-1 h-1 bg-brand-primary rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity"></div>
                                             </div>
                                             <span className="flex-grow">{f}</span>
                                          </li>
                                       ))}
                                    </ul>
                                 </div>

                                 <div className="relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/10 group/node-val hover:border-brand-secondary/30 transition-all shadow-sm">
                                    <h4 className="text-[9px] md:text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.3em] mb-4 md:mb-6 flex items-center gap-3">
                                       <TrendingUp size={14} className="text-brand-secondary" aria-hidden="true" /> Business Impact
                                    </h4>
                                    <div className="grid grid-cols-1 gap-3 md:gap-4" role="list">
                                       {activeSuite.benefits.slice(0, 2).map((b, i) => (
                                          <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10" role="listitem">
                                             <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary shrink-0">
                                                <ShieldCheck size={16} aria-hidden="true" />
                                             </div>
                                             <span className="text-[12px] md:text-[13px] text-slate-500 dark:text-gray-400 font-bold tracking-tight leading-tight">{b}</span>
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </SpotlightCard>
                  </div>
               </div>
            </div>
         </section>

         <section className="py-32 relative overflow-hidden bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
               <RevealOnScroll animation="animate-blur-in">
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">Expert M365 Governance for Global Enterprises</h2>
                  <p className="text-slate-500 dark:text-gray-400 mb-12 font-light leading-relaxed">
                     Megam Live specializes in architecting secure, compliant, and highly-automated Microsoft 365 environments. Our engineering service modules provide a structured path to operational excellence in regulated sectors.
                  </p>
                  <Link to="/contact" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl">
                     <button className="group relative bg-brand-primary text-white font-bold py-5 px-12 rounded-xl transition-all shadow-xl hover:shadow-brand-primary/30 dark:hover:shadow-brand-primary/50 uppercase tracking-widest text-xs overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" aria-hidden="true"></div>
                        <span className="relative z-10">Talk to an Architect</span>
                     </button>
                  </Link>
               </RevealOnScroll>
            </div>
         </section>
      </div>
   );
};

export default Home;
