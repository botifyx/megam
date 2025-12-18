
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Box, Zap, Layout, Bot, RefreshCw, Layers, Database, Globe, Cpu, 
  Terminal, Sparkles, ChevronRight, PlusSquare, TrendingUp, Printer, Shield, 
  Settings, Heart, Award, Users, Handshake, Activity, ShieldCheck, 
  Wifi, Code, Hexagon, Circle, Square, Triangle, Diamond
} from 'lucide-react';
import LiveOpsConsole from '../components/LiveOpsConsole';
import SpotlightCard from '../components/SpotlightCard';
import AIParticlesBackground from '../components/AIParticlesBackground';
import RevealOnScroll from '../components/RevealOnScroll';
import { PRODUCT_SUITES, WHY_MEGAM, INDUSTRIES, COMPANY_OVERVIEW } from '../constants';
import { Suite } from '../types';
import { useTheme } from '../context/ThemeContext';

const Home: React.FC = () => {
  const [activeSuiteId, setActiveSuiteId] = useState(PRODUCT_SUITES[0].id);
  const [isSyncing, setIsSyncing] = useState(false);
  const activeSuite = PRODUCT_SUITES.find(s => s.id === activeSuiteId) || PRODUCT_SUITES[0];
  const { theme } = useTheme();
  
  const suiteIcons = { Layout, Bot, RefreshCw };

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
        className={`relative flex-1 flex flex-col items-center gap-3 py-8 px-6 transition-all duration-500 group ${
          isActive 
          ? 'bg-white/40 dark:bg-white/5 backdrop-blur-md z-10' 
          : 'bg-transparent opacity-60 hover:opacity-100'
        }`}
      >
        <div className={`p-3 rounded-2xl transition-all duration-500 ${
          isActive 
          ? 'bg-brand-primary text-white scale-110 shadow-lg shadow-brand-primary/20' 
          : 'bg-slate-200 dark:bg-white/5 text-slate-400 dark:text-gray-600 group-hover:scale-105'
        }`}>
          <Icon size={28} strokeWidth={isActive ? 2 : 1.5} />
        </div>
        <div className="text-center">
          <h3 className={`font-bold text-sm tracking-tight transition-colors whitespace-nowrap ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-500'}`}>
            {suite.title}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2">
             <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-primary dark:bg-brand-neon animate-pulse' : 'bg-slate-300 dark:bg-gray-800'}`}></div>
             <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] ${isActive ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400 dark:text-gray-700'}`}>
               {isActive ? 'Link Active' : 'Standby'}
             </span>
          </div>
        </div>
        
        {/* Microsoft-style Indicator */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 transition-all duration-700 ${
          isActive ? 'bg-brand-primary dark:bg-brand-neon scale-x-100 opacity-100' : 'bg-transparent scale-x-0 opacity-0'
        }`}></div>
      </button>
    );
  };

  const StrategicPillar: React.FC<{ icon: any, label: string, desc: string, detail: string, delay: number }> = ({ icon: Icon, label, desc, detail, delay }) => (
    <RevealOnScroll animation="animate-fade-in-up" delay={delay} className="flex-grow">
       <div className="group relative flex flex-col h-full bg-white dark:bg-brand-surface/20 border border-slate-200 dark:border-white/5 hover:border-brand-primary dark:hover:border-brand-neon/40 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-sm dark:shadow-none">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/5 dark:from-brand-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center transition-colors">
             <div className="text-[9px] font-mono font-bold text-slate-400 dark:text-gray-600 tracking-[0.2em] group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-colors uppercase">Strat_Pillar_0{Math.floor(delay*10)}</div>
             <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/20 dark:bg-brand-primary/40 group-hover:bg-brand-primary dark:group-hover:bg-brand-neon animate-pulse"></div>
          </div>
          <div className="p-10 flex flex-col items-center justify-center text-center flex-grow">
             <div className="relative mb-8 text-slate-300 dark:text-gray-600 group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-all duration-700 group-hover:scale-110">
                <div className="absolute inset-0 blur-lg bg-brand-primary/0 dark:bg-brand-neon/0 group-hover:bg-brand-primary/20 dark:group-hover:bg-brand-neon/20 transition-all"></div>
                <Icon size={48} strokeWidth={1} />
             </div>
             <h4 className="text-slate-900 dark:text-white font-bold text-lg mb-2 tracking-tight group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-colors">{label}</h4>
             <p className="text-xs text-slate-500 dark:text-gray-500 font-light mb-6 leading-relaxed px-2">{desc}</p>
             <div className="pt-4 border-t border-slate-100 dark:border-white/5 w-full transition-colors">
                <div className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">{detail}</div>
             </div>
          </div>
       </div>
    </RevealOnScroll>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#f1f5f9_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_center,#0f172a_0%,#020617_100%)]"></div>
        <AIParticlesBackground />
        <div className="absolute inset-0 z-0 overflow-hidden opacity-10 dark:opacity-30 pointer-events-none perspective-1000">
           <div className="absolute inset-x-0 bottom-0 h-[600px] origin-bottom transform rotate-x-12 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_top,black_40%,transparent_100%)] animate-grid-move"></div>
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
                <span className="text-mask"><span className="block opacity-0 animate-tracking-in-expand">AI-Native</span></span>
                <span className="text-mask"><span className="block opacity-0 animate-tracking-in-expand relative mt-2 lg:mt-1" style={{ animationDelay: '0.2s' }}><span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-600 to-indigo-600 dark:from-brand-neon dark:via-brand-primary dark:to-brand-secondary">Operations</span></span></span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-blue-200/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light opacity-0 animate-cinematic-reveal transition-colors" style={{ animationDelay: '0.5s' }}>
                Engineering high-touch <span className="text-slate-900 dark:text-white font-semibold border-b border-brand-primary/40">Microsoft 365 solutions</span> for regulated industries. Precision workflows meets autonomous AI agents.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start opacity-0 animate-hero-sub-stagger" style={{ animationDelay: '0.8s' }}>
                <Link to="/contact" className="w-full sm:w-auto">
                  <button className="group relative w-full px-10 py-5 bg-brand-primary text-white rounded-lg font-bold transition-all duration-300 shadow-xl hover:shadow-brand-primary/30 dark:hover:shadow-brand-primary/50 overflow-hidden">
                    <span className="relative z-10 flex items-center justify-center gap-3 font-mono uppercase tracking-[0.2em] text-sm">Initialize Demo <Terminal size={18} /></span>
                  </button>
                </Link>
                <Link to="/suites" className="w-full sm:w-auto">
                  <button className="group relative w-full px-10 py-5 bg-white dark:bg-transparent border border-slate-200 dark:border-white/10 text-slate-600 dark:text-blue-100 rounded-lg font-bold transition-all duration-300 hover:bg-slate-100 dark:hover:bg-brand-primary/5 shadow-sm dark:shadow-none">
                    <span className="relative z-10 flex items-center justify-center gap-2 font-mono tracking-widest text-sm uppercase">View Protocols</span>
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative perspective-1000 group animate-float hidden lg:block">
               <div className="absolute inset-0 bg-brand-primary/10 dark:bg-brand-primary/20 blur-[80px] rounded-full"></div>
               <div className="relative transform rotate-y-[-8deg] rotate-x-[5deg]">
                  <div className="relative bg-white/90 dark:bg-[#020617]/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-500">
                     <LiveOpsConsole />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Megam Methodology Section */}
      <section className="py-24 bg-white dark:bg-[#020617] border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-500">
         <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
               <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em]">Operational DNA</span>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mt-4 tracking-tight">Megam Methodology</h2>
               <p className="text-slate-500 dark:text-gray-500 mt-4 max-w-xl mx-auto font-light">The four pillars of our high-touch engagement model.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <StrategicPillar icon={Circle} label="Continuity" desc="White-glove M365 support that ensures zero operational latency." detail="24/7 Managed Uptime" delay={0.1} />
               <StrategicPillar icon={Diamond} label="Precision" desc="Custom engineering specifically for regulated and GxP industries." detail="Audit-Ready Code" delay={0.2} />
               <StrategicPillar icon={Square} label="Foundation" desc="Robust integration between SAP and your Microsoft 365 core." detail="Architectural Sync" delay={0.3} />
               <StrategicPillar icon={Triangle} label="Intelligence" desc="Infusing autonomous AI agents into mission-critical workflows." detail="AI Agent Synergy" delay={0.4} />
            </div>
         </div>
      </section>

      {/* CORE PRODUCT SUITES - HIGH FIDELITY REDESIGN */}
      <section className="py-32 bg-slate-50 dark:bg-[#020617] relative overflow-hidden transition-colors duration-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.08)_0%,transparent_60%)] pointer-events-none z-0"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
           <div className="text-center mb-20">
              <RevealOnScroll animation="animate-tracking-in-expand">
                <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.5em] mb-4 block">Product Core</span>
                <h2 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Impact Suites</h2>
              </RevealOnScroll>
              <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
                <p className="text-slate-500 dark:text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light">Precision-engineered packages to revolutionize your core operations.</p>
              </RevealOnScroll>
           </div>

           {/* Corporate Dashboard Interface */}
           <div className="max-w-6xl mx-auto">
              {/* Horizontal Selection Switcher */}
              <div className="flex border border-slate-200 dark:border-white/10 rounded-t-3xl overflow-hidden bg-white/50 dark:bg-white/5 backdrop-blur-md transition-all shadow-sm">
                 {PRODUCT_SUITES.map((suite) => (
                    <SuiteTabItem 
                       key={suite.id} 
                       suite={suite} 
                       isActive={activeSuiteId === suite.id} 
                       onClick={() => handleSuiteChange(suite.id)} 
                    />
                 ))}
              </div>

              {/* High-Tech Content Canvas */}
              <div className="relative">
                 <SpotlightCard 
                    className="rounded-t-none rounded-b-[2.5rem] bg-white dark:bg-brand-surface/40 border-t-0 border-slate-200 dark:border-white/10 backdrop-blur-3xl p-10 lg:p-24 flex flex-col shadow-2xl dark:shadow-none min-h-[600px]" 
                    spotlightColor={theme === 'dark' ? 'rgba(0, 240, 255, 0.12)' : 'rgba(59, 130, 246, 0.08)'}
                    enableTilt={true}
                 >
                    <div className={`relative z-20 flex-grow transition-all duration-700 ${isSyncing ? 'opacity-0 translate-y-8 scale-95 blur-xl' : 'opacity-100 translate-y-0 scale-100'}`}>
                       <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                          {/* Parallax Content Layer 1: Main Text */}
                          <div 
                             className="lg:col-span-7 space-y-10"
                             style={{ transform: 'translate(calc(var(--mouse-x, 0) * 8px), calc(var(--mouse-y, 0) * 8px))' }}
                          >
                             <div>
                                <div className="flex items-center gap-3 mb-4">
                                   <div className="w-8 h-[1px] bg-brand-primary"></div>
                                   <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em]">Architecture v.4.0</span>
                                </div>
                                <h3 className="text-4xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-none mb-6">
                                   {activeSuite.title}
                                </h3>
                                <div className="h-1.5 w-24 bg-gradient-to-r from-brand-primary to-transparent rounded-full mb-8"></div>
                             </div>
                             
                             <p className="text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed max-w-xl">
                                {activeSuite.fullDescription}
                             </p>
                             
                             <div className="flex items-center gap-6 pt-6">
                                <Link to={`/suites/${activeSuite.id}`}>
                                   <button className="group relative bg-brand-primary text-white font-bold py-4 px-10 rounded-xl overflow-hidden shadow-xl hover:shadow-brand-primary/40 transition-all hover:scale-105 active:scale-95">
                                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                      <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-[10px]">
                                         Deep Specification <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                      </span>
                                   </button>
                                </Link>
                                <div className="hidden sm:flex items-center gap-3 text-slate-400 dark:text-gray-600 font-mono text-[9px] uppercase tracking-widest">
                                   <Activity size={14} className="text-brand-success animate-pulse" /> Nodes Verified
                                </div>
                             </div>
                          </div>

                          {/* Parallax Content Layer 2: Technical Breakdown */}
                          <div 
                             className="lg:col-span-5 space-y-12"
                             style={{ transform: 'translate(calc(var(--mouse-x, 0) * 15px), calc(var(--mouse-y, 0) * 15px))' }}
                          >
                             {/* Capability Node */}
                             <div className="relative p-8 rounded-3xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/10 group/node hover:border-brand-primary/30 transition-all shadow-sm">
                                <h4 className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                   <Zap size={14} className="text-brand-neon animate-pulse" /> Functional Core
                                </h4>
                                <ul className="space-y-4">
                                   {activeSuite.features.map((f, i) => (
                                      <li key={i} className="flex items-center gap-4 text-[13px] text-slate-500 dark:text-gray-400 font-medium group-hover/node:text-slate-800 dark:group-hover/node:text-gray-200 transition-colors">
                                         <div className="w-2 h-2 rounded-full border border-brand-primary/40 flex items-center justify-center">
                                            <div className="w-1 h-1 bg-brand-primary rounded-full opacity-0 group-hover/node:opacity-100 transition-opacity"></div>
                                         </div>
                                         {f}
                                      </li>
                                   ))}
                                </ul>
                             </div>

                             {/* Value Node */}
                             <div className="relative p-8 rounded-3xl bg-slate-50 dark:bg-black/30 border border-slate-100 dark:border-white/10 group/node-val hover:border-brand-secondary/30 transition-all shadow-sm">
                                <h4 className="text-[10px] font-mono font-bold text-brand-secondary uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                                   <Hexagon size={14} className="text-brand-secondary" /> ROI Projections
                                </h4>
                                <div className="grid grid-cols-1 gap-4">
                                   {activeSuite.benefits.map((b, i) => (
                                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-slate-100 dark:border-white/5 transition-all hover:bg-white dark:hover:bg-white/10">
                                         <div className="w-8 h-8 rounded-lg bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                                            <TrendingUp size={16} />
                                         </div>
                                         <span className="text-[13px] text-slate-500 dark:text-gray-400 font-bold tracking-tight">{b}</span>
                                      </div>
                                   ))}
                                </div>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Background Decorative HUD elements */}
                    <div className="absolute bottom-8 left-10 pointer-events-none opacity-20 dark:opacity-40 font-mono text-[9px] text-slate-400 dark:text-gray-600 leading-relaxed uppercase tracking-widest hidden lg:block">
                       System_ID: {activeSuite.id.toUpperCase()}<br/>
                       Encryption: Active_256<br/>
                       Region: US_PRIMARY
                    </div>
                    <div className="absolute top-24 right-10 pointer-events-none opacity-5 dark:opacity-20 hidden lg:block">
                       <Code size={120} strokeWidth={0.5} className="text-brand-primary" />
                    </div>
                 </SpotlightCard>
              </div>
           </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-32 relative overflow-hidden bg-white dark:bg-[#020617] border-t border-slate-200 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
           <RevealOnScroll animation="animate-blur-in">
             <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">Ready to synchronize your operations?</h2>
             <Link to="/contact">
                <button className="group relative bg-brand-primary text-white font-bold py-5 px-12 rounded-xl transition-all shadow-xl hover:shadow-brand-primary/30 dark:hover:shadow-brand-primary/50 uppercase tracking-widest text-xs overflow-hidden">
                   <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
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
