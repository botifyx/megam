
import React from 'react';
import { M365_SERVICES, ENGAGEMENT_MODELS } from '../constants';
import {
   Brain, MessageSquare, AppWindow, Database, Shield, Share2, ArrowRight, RefreshCw,
   Activity, Cpu, Wifi, Code, Zap, Clock, Globe, Layout, Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import Head from '../components/Head';
import { useTheme } from '../context/ThemeContext';

const Services: React.FC = () => {
   const icons = { Brain, MessageSquare, AppWindow, Database, Shield, Share2, RefreshCw, Layout, Bot, Zap };
   const { theme } = useTheme();

   return (
      <div className="pt-24 pb-20 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500">
         <Head
            title="Microsoft 365 Operations & Engineering Services | Megam Live"
            description="Scale your Microsoft 365 environment with Megam Live's enterprise-grade engineering, governance, and architecture services. Specialized ecosystems for regulated industries."
            keywords="Microsoft 365, M365 Engineering, Governance, Architecture, SharePoint, Teams, Azure, Power Platform, Regulated Industries"
         />
         <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1)_0%,transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15)_0%,transparent_60%)]"></div>
            <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-brand-neon/5 rounded-full blur-[140px] animate-pulse-slow"></div>
            <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03] bg-[linear-gradient(rgba(15,23,42,1)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
         </div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <header className="text-center max-w-4xl mx-auto mb-24">
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
                  <p className="text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed transition-colors max-w-3xl mx-auto">
                     Enterprise-grade Microsoft 365 architecture, governance, and engineering services. We help organizations design, extend, and operate secure, compliant, and scalable M365 environments. Specialized M365 expertise for regulated industries.
                  </p>
               </RevealOnScroll>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" aria-label="M365 Engineering Services">
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
                                 <Code size={10} aria-hidden="true" /> {serviceId}
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
                                    <Icon size={32} aria-hidden="true" />
                                 </div>
                              </div>

                              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-colors tracking-tight">
                                 {service.title}
                              </h2>

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
                                    <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" aria-hidden="true" />
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
            </section>

            <section className="mt-40">
               <div className="text-center mb-16">
                  <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.5em] mb-4 block">Engagement Protocol</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">Engineering Service Modules</h2>
                  <p className="text-slate-600 dark:text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                     Transparent, fixed-entry Microsoft 365 engineering services designed to extend and scale your solutions.
                  </p>
               </div>

               <div className="max-w-5xl mx-auto overflow-hidden rounded-[2rem] border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-brand-surface/40 backdrop-blur-3xl shadow-2xl transition-colors">
                  <table className="w-full text-left font-sans border-collapse">
                     <thead>
                        <tr className="bg-slate-50/50 dark:bg-black/40 text-slate-400 dark:text-brand-accent uppercase text-[10px] tracking-[0.4em] font-mono border-b border-slate-200 dark:border-white/5 transition-colors">
                           <th className="px-12 py-8">Service Module</th>
                           <th className="px-12 py-8">Engineering Cycle</th>
                           <th className="px-12 py-8 text-right">Starting At</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-sm">
                        {ENGAGEMENT_MODELS.map((model, i) => {
                           // @ts-ignore
                           const Icon = icons[model.icon] || Globe;
                           return (
                              <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
                                 <td className="px-12 py-10">
                                    <div className="flex items-center gap-5">
                                       <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:bg-brand-primary/10 transition-all">
                                          <Icon size={18} aria-hidden="true" />
                                       </div>
                                       <div>
                                          <p className="text-slate-900 dark:text-white font-extrabold text-base tracking-tight">{model.solution}</p>
                                          <p className="text-[9px] font-mono text-slate-400 dark:text-brand-success uppercase tracking-widest mt-1">Status: Delivery-Ready</p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-12 py-10">
                                    <div className="flex items-center gap-3 text-slate-500 dark:text-gray-400 font-medium">
                                       <Clock size={14} className="text-brand-accent group-hover:rotate-45 transition-transform" aria-hidden="true" />
                                       {model.effort}
                                    </div>
                                 </td>
                                 <td className="px-12 py-10 text-right">
                                    <span className="text-lg font-mono font-extrabold text-brand-primary dark:text-brand-neon bg-brand-primary/5 dark:bg-brand-neon/5 px-6 py-2 rounded-xl border border-brand-primary/20 dark:border-brand-neon/20 shadow-sm">
                                       {model.cost}
                                    </span>
                                 </td>
                              </tr>
                           );
                        })}
                     </tbody>
                  </table>
               </div>
            </section>
         </div>
      </div>
   );
};

export default Services;
