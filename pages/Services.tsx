
import React from 'react';
import { M365_SERVICES } from '../constants';
import { Brain, MessageSquare, AppWindow, Database, Shield, Share2, ArrowRight, RefreshCw, Activity, Cpu, Wifi, Code, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import { useTheme } from '../context/ThemeContext';

const Services: React.FC = () => {
  const icons = { Brain, MessageSquare, AppWindow, Database, Shield, Share2, RefreshCw };
  const { theme } = useTheme();

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500">
       {/* Background Fluid Atmosphere */}
       <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15)_0%,transparent_60%)]"></div>
         <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-brand-neon/5 rounded-full blur-[140px] animate-pulse-slow"></div>
         
         {/* Static High-Tech Grid */}
         <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-24">
             <RevealOnScroll animation="animate-tracking-in-expand">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/20 dark:border-brand-neon/30 bg-white dark:bg-brand-neon/5 mb-6 shadow-sm">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary dark:bg-brand-neon opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary dark:bg-brand-neon"></span>
                   </span>
                   <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-brand-neon uppercase tracking-[0.3em]">Core Infrastructure</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter transition-colors">
                   Microsoft 365 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-600 to-indigo-600 dark:from-brand-primary dark:via-brand-neon dark:to-brand-secondary">Ecosystems</span>
                </h1>
             </RevealOnScroll>
             <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
                <p className="text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed transition-colors">
                   We architect decentralized operational fabrics. Elevate your Microsoft investment with high-fidelity engineering and AI-native logic orchestration.
                </p>
             </RevealOnScroll>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
             {M365_SERVICES.map((service, index) => {
                 // @ts-ignore
                 const Icon = icons[service.iconName];
                 const serviceId = `NODE_v4_${service.id.toUpperCase().substring(0, 3)}`;
                 const gradients = [
                    'from-brand-primary/10 via-transparent to-brand-primary/5',
                    'from-brand-secondary/10 via-transparent to-brand-primary/5',
                    'from-brand-accent/10 via-transparent to-brand-secondary/5'
                 ];
                 const currentGradient = gradients[index % gradients.length];

                 return (
                    <RevealOnScroll key={service.id} className="h-full" animation="animate-fade-in-up" delay={index * 0.1}>
                        <SpotlightCard className="h-full flex flex-col group p-1" spotlightColor={theme === 'dark' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(59, 130, 246, 0.1)'}>
                           <div className="relative bg-white dark:bg-brand-dark/90 backdrop-blur-3xl rounded-2xl p-8 h-full flex flex-col border border-slate-100 dark:border-white/10 overflow-hidden transition-all duration-500 group-hover:border-brand-primary dark:group-hover:border-brand-neon/30 group-hover:translate-y-[-4px]">
                              
                              <div className="absolute top-4 left-4 text-[8px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-widest flex items-center gap-2 group-hover:text-brand-primary dark:group-hover:text-brand-neon/50 transition-colors">
                                 <Code size={10} /> {serviceId}
                              </div>
                              <div className="absolute top-4 right-4 flex gap-1">
                                 <div className="w-1 h-1 bg-brand-primary/20 dark:bg-brand-neon/40 animate-pulse"></div>
                                 <div className="w-1 h-1 bg-brand-primary/20 dark:bg-brand-neon/40 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                              </div>

                              <div className="relative mb-10 mt-4 self-start">
                                 <div className={`absolute -inset-4 bg-gradient-to-br ${currentGradient} blur-2xl rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-700`}></div>
                                 <div 
                                    className="relative w-16 h-16 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center text-brand-primary transition-all duration-500 group-hover:text-brand-primary dark:group-hover:text-brand-neon group-hover:bg-brand-primary/5 dark:group-hover:bg-brand-primary/10 group-hover:border-brand-primary dark:group-hover:border-brand-neon group-hover:scale-110 group-hover:shadow-lg opacity-0 animate-hero-text-focus"
                                    style={{ 
                                       animationDelay: `${index * 0.15 + 0.5}s`,
                                       animationFillMode: 'forwards'
                                    }}
                                 >
                                    <Icon size={32} />
                                 </div>
                              </div>

                              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-colors tracking-tight">
                                 {service.title}
                              </h3>
                              
                              <p className="text-slate-500 dark:text-gray-400 mb-8 flex-grow leading-relaxed font-light text-[15px] group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors">
                                 {service.description}
                              </p>

                              <div className="space-y-3 mt-auto border-t border-slate-100 dark:border-white/5 pt-6 transition-colors">
                                 {[
                                    { label: "Node Latency", val: "<12ms", color: "text-brand-success" },
                                    { label: "Architecture", val: "M365 Cloud", color: "text-brand-primary" }
                                 ].map((meta, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                       <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-widest">{meta.label}</span>
                                       <span className={`text-[10px] font-mono font-bold ${meta.color} uppercase tracking-widest`}>{meta.val}</span>
                                    </div>
                                 ))}
                                 <div className="pt-4 flex items-center justify-between text-brand-primary font-bold text-[10px] uppercase tracking-[0.2em] group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-all duration-300">
                                    <span>Engineering Specs</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                                 </div>
                              </div>

                              <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500 overflow-hidden">
                                 <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)] animate-scan-line"></div>
                              </div>
                           </div>
                        </SpotlightCard>
                    </RevealOnScroll>
                 )
             })}
          </div>

          <RevealOnScroll animation="animate-blur-in" delay={0.4}>
             <div className="mt-32 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary via-blue-400 to-brand-secondary rounded-3xl blur opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative rounded-3xl p-12 lg:p-20 text-center overflow-hidden border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-2xl shadow-xl dark:shadow-none transition-colors duration-500">
                   
                   <div className="absolute top-0 right-0 p-8 text-[8px] font-mono font-bold text-slate-300 dark:text-gray-700 select-none uppercase">
                      Protocol_Connect_v4<br/>
                      Uplink: Primary<br/>
                      Encryption: Active
                   </div>
                   
                   <div className="relative z-10 max-w-3xl mx-auto">
                      <div className="flex justify-center mb-8">
                         <div className="w-16 h-16 rounded-full bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 flex items-center justify-center text-brand-primary dark:text-brand-neon animate-neural-pulse">
                            <Activity size={32} />
                         </div>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">Need a custom implementation?</h2>
                      <p className="text-xl text-slate-500 dark:text-gray-400 mb-10 font-light leading-relaxed transition-colors">
                         We specialize in grounding generative agents with proprietary enterprise data residing in SAP, Salesforce, and secure SQL clusters. Let's engineer your cognitive advantage.
                      </p>
                      <Link to="/contact">
                         <button className="group relative bg-brand-primary text-white font-bold py-5 px-12 rounded-xl overflow-hidden shadow-lg hover:shadow-brand-primary/40 transition-all hover:scale-105">
                            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                            <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.2em] text-sm">
                               Talk to an Architect <Zap size={18} className="text-brand-neon animate-pulse" />
                            </span>
                         </button>
                      </Link>
                   </div>
                </div>
             </div>
          </RevealOnScroll>
       </div>
    </div>
  );
};

export default Services;
