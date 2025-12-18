
import React from 'react';
import { ArrowLeftRight, Database, Server, Layers, ShieldCheck, Zap, Globe, Cpu, Terminal } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import { useTheme } from '../context/ThemeContext';

const Integrations: React.FC = () => {
  const { theme } = useTheme();
  
  const integrationFeatures = [
    {
      id: "INT-01",
      icon: ShieldCheck,
      title: "GxP Data Sovereignty",
      desc: "Secure ephemeral processing for regulated industries. We orchestrate SAP master data in-flight without local storage, maintaining audit-ready GxP integrity within your secure M365 tenant.",
      color: theme === 'dark' ? "text-brand-neon" : "text-brand-primary",
      glow: theme === 'dark' ? "rgba(0, 240, 255, 0.2)" : "rgba(59, 130, 246, 0.1)"
    },
    {
      id: "INT-02",
      icon: Zap,
      title: "Neural Event Hooks",
      desc: "Propagate SAP business events—material updates, stock alerts, or price changes—directly into Teams and AI Agents for autonomous decisioning and real-time operational response.",
      color: "text-brand-primary",
      glow: theme === 'dark' ? "rgba(59, 130, 246, 0.2)" : "rgba(59, 130, 246, 0.1)"
    },
    {
      id: "INT-03",
      icon: Server,
      title: "Hybrid Mesh Fabric",
      desc: "Planetary-scale connectivity for S/4HANA. Bridge your legacy on-premise clusters to the Azure Cloud fabric using encrypted ExpressRoute or standard Data Gateway protocols.",
      color: "text-brand-secondary",
      glow: theme === 'dark' ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500">
       {/* Background Atmosphere */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#f1f5f9_0%,#f8fafc_100%)] dark:bg-[radial-gradient(circle_at_top,#0f172a_0%,#020617_100%)] pointer-events-none transition-colors duration-500"></div>
       <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 dark:via-brand-neon/20 to-transparent shadow-[0_0_20px_rgba(0,240,255,0.1)]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
           <RevealOnScroll animation="animate-tracking-in-expand">
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em] mb-4 block">Middleware Ecosystem</span>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 tracking-tighter">Planetary <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:from-brand-primary dark:to-brand-neon">Sync</span></h1>
           </RevealOnScroll>
           <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
              <p className="text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed">
                 Eliminate the barrier between your Systems of Record and Systems of Engagement. Megam Live engineers the secure logic bridge for the modern Microsoft enterprise.
              </p>
           </RevealOnScroll>
        </div>

        {/* Central Visual Architecture */}
        <RevealOnScroll animation="animate-blur-in" delay={0.3}>
          <div className="relative bg-white/60 dark:bg-brand-surface/40 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-20 border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl dark:shadow-none mb-20 group/arch transition-colors duration-500">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
             <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(circle,black,transparent_80%)]"></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
                {/* Left Side: SAP Cluster */}
                <div className="text-center group flex flex-col items-center">
                   <div className="w-28 h-28 md:w-40 md:h-40 bg-white dark:bg-white rounded-3xl flex items-center justify-center shadow-xl dark:shadow-[0_0_50px_rgba(255,255,255,0.05)] mb-8 transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(59,130,246,0.2)] border border-slate-100 dark:border-white/20">
                      <div className="text-4xl font-extrabold text-[#003366] tracking-tighter">SAP</div>
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Systems of Record</h3>
                      <p className="text-slate-400 dark:text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">S/4HANA // SAP ECC</p>
                   </div>
                </div>

                {/* Middle: Megam Sync Fabric */}
                <div className="flex flex-col items-center gap-8 w-full lg:flex-1">
                   <div className="flex items-center gap-3 px-6 py-2 bg-brand-primary/10 border border-brand-primary/30 rounded-full text-brand-primary dark:text-brand-neon font-mono text-[10px] uppercase tracking-[0.3em] shadow-sm dark:shadow-[0_0_20px_rgba(0,240,255,0.1)] animate-pulse">
                      <ArrowLeftRight size={14} /> Neural Logic Sync Active
                   </div>
                   
                   <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-brand-dark border border-brand-primary/50 dark:border-brand-neon/50 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-brand-primary dark:bg-brand-neon rounded-full animate-ping"></div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/20 dark:via-brand-neon/50 to-transparent w-1/3 animate-shimmer opacity-50"></div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                      <div className="text-[9px] font-mono text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-white/5 p-3 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-sm text-center shadow-sm">
                         SECURE ODATA <br/> <span className="text-brand-primary">V4.0 READY</span>
                      </div>
                      <div className="text-[9px] font-mono text-slate-500 dark:text-gray-500 border border-slate-200 dark:border-white/5 p-3 rounded-xl bg-white/80 dark:bg-black/40 backdrop-blur-sm text-center shadow-sm">
                         GRAPH API <br/> <span className="text-brand-secondary">LATENCY: 12MS</span>
                      </div>
                   </div>
                </div>

                {/* Right Side: Microsoft 365 Fabric */}
                <div className="text-center group flex flex-col items-center">
                   <div className="w-28 h-28 md:w-40 md:h-40 bg-[#5059c9] rounded-3xl flex items-center justify-center shadow-xl dark:shadow-[0_0_50px_rgba(99,102,241,0.1)] mb-8 transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_0_60px_rgba(0,240,255,0.25)] border border-slate-100/20 dark:border-white/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px:20px]"></div>
                      <Layers size={54} className="text-white relative z-10" />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Systems of Engagement</h3>
                      <p className="text-slate-400 dark:text-gray-500 text-[10px] font-mono uppercase tracking-[0.2em]">Teams // SharePoint // AI</p>
                   </div>
                </div>
             </div>
          </div>
        </RevealOnScroll>

        {/* Integration Insight Cards with Multi-Layer Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {integrationFeatures.map((feat, i) => (
             <RevealOnScroll key={feat.id} animation="animate-fade-in-up" delay={0.1 * i}>
               <SpotlightCard 
                  className="p-10 h-full flex flex-col min-h-[400px]" 
                  spotlightColor={feat.glow}
                  enableTilt={true}
               >
                  {/* Technical Background ID */}
                  <div className="absolute top-4 right-6 font-mono text-[9px] text-slate-300 dark:text-gray-700 group-hover:text-brand-primary transition-colors">
                     {feat.id}
                  </div>

                  {/* Parallax Icon Layer */}
                  <div 
                    className="mb-8 w-16 h-16 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:border-brand-primary dark:group-hover:border-brand-neon/40 group-hover:bg-brand-primary/5 dark:group-hover:bg-brand-neon/5"
                    style={{ transform: 'translate(calc(var(--mouse-x, 0) * 12px), calc(var(--mouse-y, 0) * 12px))' }}
                  >
                     <feat.icon className={`${feat.color} transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_currentColor]`} size={32} />
                  </div>

                  {/* Parallax Title Layer */}
                  <h3 
                    className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-colors tracking-tight"
                    style={{ transform: 'translate(calc(var(--mouse-x, 0) * 6px), calc(var(--mouse-y, 0) * 6px))' }}
                  >
                     {feat.title}
                  </h3>

                  {/* Description Layer (Lower Parallax) */}
                  <p 
                    className="text-slate-500 dark:text-gray-400 text-[15px] leading-relaxed font-light flex-grow"
                    style={{ transform: 'translate(calc(var(--mouse-x, 0) * 2px), calc(var(--mouse-y, 0) * 2px))' }}
                  >
                     {feat.desc}
                  </p>

                  {/* Static HUD Footer */}
                  <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between transition-colors">
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse"></div>
                        <span className="text-[9px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest">Protocol Secured</span>
                     </div>
                     <Terminal size={12} className="text-slate-300 dark:text-gray-700" />
                  </div>
               </SpotlightCard>
             </RevealOnScroll>
           ))}
        </div>

        {/* Closing Technical Status */}
        <RevealOnScroll animation="animate-blur-in" delay={0.6}>
           <div className="mt-24 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-8 px-10 py-4 bg-white/80 dark:bg-brand-surface/80 backdrop-blur-xl border border-slate-200 dark:border-white/5 rounded-2xl shadow-lg dark:shadow-none transition-all">
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-600 uppercase mb-1">Integration Uptime</span>
                    <span className="text-xl font-bold text-brand-success">99.998%</span>
                 </div>
                 <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-600 uppercase mb-1">Global Logic Nodes</span>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">42 Active</span>
                 </div>
                 <div className="hidden sm:block w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                 <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 dark:text-gray-600 uppercase mb-1">Data Sovereignty</span>
                    <span className="text-xl font-bold text-brand-primary dark:text-brand-accent">Verified</span>
                 </div>
              </div>
           </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Integrations;
