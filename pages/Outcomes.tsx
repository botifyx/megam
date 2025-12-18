
import React from 'react';
import { CASE_STUDIES } from '../constants';
import { TrendingUp, Clock, ShieldCheck, Circle, Diamond, Square, Triangle, Activity } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import { useTheme } from '../context/ThemeContext';

const Outcomes: React.FC = () => {
  const { theme } = useTheme();
  const trustNodes = [
    { icon: Circle, label: "Continuity", color: theme === 'dark' ? "text-brand-neon" : "text-brand-primary", shadow: "shadow-[0_0_15px_rgba(0,240,255,0.2)]" },
    { icon: Diamond, label: "Precision", color: "text-brand-primary", shadow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
    { icon: Square, label: "Stability", color: "text-brand-secondary", shadow: "shadow-[0_0_15px_rgba(99,102,241,0.2)]" },
    { icon: Triangle, label: "Growth", color: theme === 'dark' ? "text-brand-accent" : "text-brand-primary", shadow: "shadow-[0_0_15px_rgba(6,182,212,0.2)]" }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500">
       {/* Background Elements */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
       <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
             <RevealOnScroll animation="animate-tracking-in-expand">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Operational Outcomes</h1>
                <p className="text-xl text-slate-500 dark:text-gray-400 max-w-2xl font-light">
                   Real-world impact delivered to global enterprises. We measure our engineering success by your system's performance metrics.
                </p>
             </RevealOnScroll>
          </div>

          <div className="space-y-12">
             {CASE_STUDIES.map((study, idx) => (
                <RevealOnScroll key={study.id} animation="animate-fade-in-up" delay={idx * 0.1}>
                  <SpotlightCard className="p-8 md:p-12 border-slate-200 dark:border-white/5" spotlightColor={theme === 'dark' ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"}>
                    <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/2">
                          <div className="inline-block px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded text-brand-primary font-mono font-bold tracking-widest text-[10px] uppercase mb-4">
                              SECTOR: {study.clientIndustry}
                          </div>
                          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-colors duration-300 tracking-tight">{study.title}</h2>
                          <p className="text-xl text-slate-500 dark:text-gray-400 leading-relaxed mb-8 font-light italic border-l-2 border-brand-primary/30 pl-4 transition-colors">
                              "{study.outcome}"
                          </p>
                          <div className="flex items-center gap-3 text-brand-success text-[10px] font-mono font-bold uppercase tracking-widest">
                              <ShieldCheck size={14} className="animate-pulse" /> Protocol Verified
                          </div>
                        </div>
                        
                        <div className="lg:w-1/2">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                              {study.metrics.map((metric, i) => (
                                <div key={i} className="bg-white/60 dark:bg-black/40 rounded-xl p-6 border border-slate-200 dark:border-white/5 group-hover:border-brand-primary/20 dark:group-hover:border-brand-neon/20 transition-all flex flex-col justify-center relative overflow-hidden group/metric">
                                    <div className="absolute top-0 right-0 w-12 h-12 bg-brand-primary/5 dark:bg-brand-neon/5 rounded-full blur-xl group-hover/metric:bg-brand-primary/10 dark:group-hover/metric:bg-brand-neon/20 transition-all"></div>
                                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1 tracking-tighter group-hover/metric:text-brand-primary dark:group-hover/metric:text-brand-neon transition-colors">
                                      {metric.value}<span className="text-xl text-slate-400 dark:text-gray-500 ml-1">{metric.suffix}</span>
                                    </div>
                                    <div className="text-slate-400 dark:text-gray-500 text-[10px] uppercase tracking-[0.2em] font-mono mt-2">{metric.label}</div>
                                </div>
                              ))}
                          </div>
                        </div>
                    </div>
                  </SpotlightCard>
                </RevealOnScroll>
             ))}
          </div>

          {/* Geometric Trust Section */}
          <div className="mt-32 text-center">
             <RevealOnScroll animation="animate-blur-in">
                <div className="relative inline-flex items-center justify-center mb-16">
                   {/* Glowing Outer Ring */}
                   <div className="absolute -inset-4 bg-brand-primary/5 dark:bg-brand-neon/10 blur-2xl rounded-full animate-pulse-glow"></div>
                   
                   {/* The Badge */}
                   <div className="relative px-8 py-3 rounded-full border border-slate-200 dark:border-brand-neon/40 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-xl shadow-lg dark:shadow-[0_0_25px_rgba(0,240,255,0.2)] overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none"></div>
                      <span className="text-slate-900 dark:text-white font-medium text-sm tracking-wide z-10 flex items-center gap-3">
                         <Activity size={14} className="text-brand-primary dark:text-brand-neon animate-pulse" />
                         Trusted by Fortune 500 Innovators
                      </span>
                   </div>
                </div>
             </RevealOnScroll>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                {trustNodes.map((node, i) => (
                   <RevealOnScroll key={i} animation="animate-fade-in-up" delay={0.1 * i}>
                      <div className="h-16 bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.05] rounded-lg flex items-center justify-center group hover:bg-white dark:hover:bg-white/5 hover:border-brand-primary dark:hover:border-white/20 transition-all duration-500 cursor-default relative overflow-hidden shadow-sm dark:shadow-none">
                         <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-brand-primary/[0.02] to-transparent`}></div>
                         
                         <node.icon 
                           size={28} 
                           strokeWidth={1} 
                           className={`transition-all duration-700 text-slate-300 dark:text-gray-600 group-hover:${node.color} group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_currentColor]`} 
                         />

                         {/* Hover Glow Effect */}
                         <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-brand-primary dark:bg-white opacity-0 group-hover:opacity-30 blur-sm transition-all duration-500`}></div>
                      </div>
                   </RevealOnScroll>
                ))}
             </div>

             <div className="mt-12 text-[10px] font-mono text-slate-300 dark:text-gray-700 uppercase tracking-[0.4em] opacity-40">
                Strategic Partnership Network // Active Sync
             </div>
          </div>
       </div>
    </div>
  );
};

export default Outcomes;
