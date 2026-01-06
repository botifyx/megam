
import React from 'react';
import { 
  ArrowLeftRight, Database, Server, Layers, ShieldCheck, Zap, Globe, Cpu, 
  Terminal, Workflow, Share2, Activity, Settings, ArrowRight, Bot, 
  Search, Shield, Info, Command, MessageSquare
} from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import InteractiveBadge from '../components/InteractiveBadge';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const SyncBusVisual: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block overflow-visible">
    <svg width="100%" height="100%" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-40 dark:opacity-60">
      {/* Path from SAP to Sync Layer */}
      <path id="path-left" d="M 280 200 L 450 200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-brand-primary" />
      <circle r="3" fill="#3b82f6" className="filter blur-[1px]">
        <animateMotion dur="2s" repeatCount="indefinite" path="M 280 200 L 450 200" />
      </circle>
      <circle r="3" fill="#3b82f6" className="filter blur-[1px]">
        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 280 200 L 450 200" begin="0.5s" />
      </circle>

      {/* Path from Sync Layer to M365 */}
      <path id="path-right" d="M 750 200 L 920 200" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-brand-neon" />
      <circle r="3" fill="#00f0ff" className="filter blur-[1px]">
        <animateMotion dur="1.8s" repeatCount="indefinite" path="M 750 200 L 920 200" />
      </circle>
      <circle r="3" fill="#00f0ff" className="filter blur-[1px]">
        <animateMotion dur="2.2s" repeatCount="indefinite" path="M 750 200 L 920 200" begin="0.7s" />
      </circle>

      {/* Return Path (Reverse Sync) */}
      <circle r="2" fill="#6366f1" opacity="0.5">
        <animateMotion dur="4s" repeatCount="indefinite" path="M 920 215 L 280 215" />
      </circle>
    </svg>
  </div>
);

const Integrations: React.FC = () => {
  const { theme } = useTheme();
  
  const integrationScenarios = [
    {
      title: "Material Master ~ SAP Synchronization",
      desc: "Governed synchronization between Microsoft 365 workflows and SAP Material Master using secure APIs and OData.",
      howItWorks: [
        "Data is collected and approved in M365",
        "SAP remains the system of record",
        "Approved changes are synchronized securely"
      ],
      outcome: "Zero-error material creation cycles",
      icon: Database,
      protocol: "SYNC_v4.2"
    },
    {
      title: "Event-Driven Engagement & Notifications",
      desc: "Propagates validated enterprise events, such as material changes or production milestones, into Microsoft Teams and dashboards.",
      howItWorks: [
        "Events trigger neural logic hooks",
        "Permission-aware routing to Teams/Copilot",
        "Real-time operational escalations"
      ],
      outcome: "Drastic reduction in response latency",
      icon: Zap,
      protocol: "EVENT_v1.8"
    },
    {
      title: "External Data & Content Exchange",
      desc: "Secure, governed data exchange between Microsoft 365 and external systems, like packaging or data providers.",
      howItWorks: [
        "M365 remains the orchestration layer",
        "API-based integration patterns",
        "Full auditability within the tenant"
      ],
      outcome: "Elimination of point-to-point risk",
      icon: Globe,
      protocol: "XCHANGE_v3"
    }
  ];

  const capabilityCards = [
    {
      icon: ShieldCheck,
      title: "GxP Data Sovereignty",
      desc: "Secure in-flight processing of regulated enterprise data without uncontrolled replication. Preserves system-of-record integrity inside M365.",
      status: "Protocol Secured"
    },
    {
      icon: ArrowLeftRight,
      title: "Event-Driven Hooks",
      desc: "Validated enterprise changes propagate into workflows, Teams notifications, and downstream systems without manual intervention.",
      status: "Protocol Secured"
    },
    {
      icon: Server,
      title: "Hybrid Integration Fabric",
      desc: "Secure connectivity between on-premise systems, cloud services, and Microsoft 365 using encrypted APIs and gateway services.",
      status: "Protocol Secured"
    }
  ];

  return (
    <div className="pt-24 pb-32 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500">
       {/* High-Tech Background Elements */}
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-100">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15)_0%,transparent_60%)]"></div>
          {/* Extremely light grid for clean mode UI */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
       </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 md:pt-20">
        
        {/* Hero Section */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
           <RevealOnScroll animation="animate-tracking-in-expand">
              <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em] mb-4 block">Integration Architecture</span>
              <h1 className="text-6xl md:text-8xl font-extrabold text-slate-900 dark:text-white mb-8 tracking-tighter">
                Planetary <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:from-brand-primary dark:to-brand-neon">Sync™</span>
              </h1>
           </RevealOnScroll>
           <RevealOnScroll animation="animate-hero-sub-stagger" delay={0.2}>
              <p className="text-xl md:text-2xl text-slate-600 dark:text-gray-300 font-light leading-relaxed mb-6">
                 Eliminate the barrier between <span className="text-slate-900 dark:text-white font-bold">Systems of Record</span> and <span className="text-brand-primary font-bold">Systems of Engagement</span>.
              </p>
              <p className="text-base md:text-lg text-slate-500 dark:text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                 Megam Live engineers secure, governed integration frameworks that connect enterprise systems like SAP with Microsoft 365, without compromising compliance, traceability, or control.
              </p>
              <div className="mt-8 flex justify-center items-center gap-6">
                <span className="h-[1px] w-12 bg-slate-200 dark:bg-white/10"></span>
                <p className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-[0.3em]">
                   Unified Integration Fabric
                </p>
                <span className="h-[1px] w-12 bg-slate-200 dark:bg-white/10"></span>
              </div>
           </RevealOnScroll>
        </div>

        {/* SECTION 1 — CORE INTEGRATION MODEL (ARCHITECTURE DIAGRAM) */}
        <RevealOnScroll animation="animate-blur-in" delay={0.4} className="mb-32">
          <div className="relative bg-white/60 dark:bg-brand-surface/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-20 border border-slate-200 dark:border-white/5 overflow-visible shadow-2xl dark:shadow-none transition-colors duration-500">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none"></div>
             
             {/* Dynamic Packet Flows */}
             <SyncBusVisual />

             {/* Labels overlay */}
             <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-[0.5em] flex items-center gap-4 z-20">
               <Cpu size={12} className="text-brand-primary animate-pulse" /> SECURE DATA BUS: ACTIVE <Cpu size={12} className="text-brand-primary animate-pulse" />
             </div>

             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
                
                {/* Left: Systems of Record */}
                <div className="lg:col-span-3 text-center flex flex-col items-center group">
                   <div className="w-32 h-32 md:w-44 md:h-44 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-8 transition-all duration-700 group-hover:scale-105 group-hover:shadow-brand-primary/20 border-4 border-slate-50 relative">
                      <div className="text-4xl md:text-5xl font-black text-[#003366] tracking-tighter">SAP</div>
                      {/* Technical Badge with improved legibility */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 bg-slate-100 rounded-full border border-slate-300 text-[10px] font-mono font-black text-slate-700 uppercase tracking-[0.15em] whitespace-nowrap shadow-lg">NODE AUTH 01</div>
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Systems of Record</h3>
                      <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 uppercase tracking-widest leading-relaxed font-bold">
                        S/4HANA • SAP ECC<br/>ENTERPRISE DATABASES
                      </div>
                   </div>
                </div>

                {/* Center: Integration Layer */}
                <div className="lg:col-span-6 flex flex-col items-center w-full px-4 relative">
                   <div className="w-full relative z-20 mb-8 p-6 md:p-10 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/30 dark:border-brand-primary/20 rounded-3xl backdrop-blur-md text-center group/panel transition-all hover:border-brand-primary/50 overflow-hidden">
                      {/* Orchestrator Logic Pulse */}
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)] animate-neural-pulse pointer-events-none"></div>
                      
                      <h4 className="text-lg font-extrabold text-brand-primary dark:text-brand-neon mb-6 uppercase tracking-[0.2em] relative z-10">Planetary Sync™ Layer</h4>
                      <div className="text-[11px] font-mono text-slate-400 dark:text-gray-400 mb-8 uppercase tracking-[0.3em] flex items-center justify-center gap-3 relative z-10">
                         Secure <div className="w-1 h-1 bg-brand-primary rounded-full"></div> Event-Driven <div className="w-1 h-1 bg-brand-primary rounded-full"></div> Governed
                      </div>
                      <ul className="space-y-4 text-left max-w-xs mx-auto relative z-10">
                        {[
                          "API- and OData-based patterns",
                          "Event-driven triggers & validations",
                          "In-flight processing with audit visibility",
                          "No uncontrolled data replication"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs text-slate-600 dark:text-gray-300 font-medium">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                   </div>
                </div>

                {/* Right: Systems of Engagement */}
                <div className="lg:col-span-3 text-center flex flex-col items-center group">
                   <div className="w-32 h-32 md:w-44 md:h-44 bg-gradient-to-br from-[#6366f1] to-[#4f46e5] rounded-3xl flex items-center justify-center shadow-xl mb-8 transition-all duration-700 group-hover:scale-105 group-hover:shadow-brand-secondary/30 border-4 border-white/10 relative">
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse rounded-[inherit]"></div>
                      <div className="grid grid-cols-2 gap-2 text-white/90 relative z-10">
                        <Layers size={24} />
                        <Bot size={24} />
                        <MessageSquare size={24} />
                        <Globe size={24} />
                      </div>
                      {/* Technical Badge with increased readability and proper clearance */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-5 py-2 bg-[#4f46e5] rounded-full border border-white/40 text-[10px] font-mono font-black text-white uppercase tracking-[0.15em] whitespace-nowrap shadow-xl z-20">M365 FABRIC LIVE</div>
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-slate-900 dark:text-white font-bold text-xl tracking-tight">Systems of Engagement</h3>
                      {/* Higher contrast sub-labels for dark mode legibility */}
                      <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 uppercase tracking-widest leading-relaxed font-bold">
                        TEAMS • SHAREPOINT<br/>POWER PLATFORM • COPILOT
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </RevealOnScroll>

        {/* SECTION 2 — WHY THIS MATTERS */}
        <RevealOnScroll className="mb-32 text-center max-w-4xl mx-auto px-4">
           <div className="flex flex-col items-center">
             <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-8 animate-neural-pulse">
                <Settings size={32} />
             </div>
             <h2 className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.5em] mb-4">The Strategic Advantage</h2>
             <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight transition-colors">Why This Matters</h3>
             <p className="text-xl text-slate-600 dark:text-gray-400 font-light leading-relaxed">
                Traditional point-to-point integrations create risk and duplication, as well as audit gaps. 
                <span className="text-brand-primary dark:text-brand-neon font-bold"> Planetary Sync™</span> provides a <span className="text-slate-900 dark:text-white border-b-2 border-brand-primary/20">controlled logic bridge</span> that allows Microsoft 365 to orchestrate business processes while SAP and other enterprise systems remain the system of record.
             </p>
           </div>
        </RevealOnScroll>

        {/* SECTION 3 — INTEGRATION SCENARIOS */}
        <div className="mb-40">
           <div className="text-center mb-16">
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-gray-600 uppercase tracking-[0.4em]">Operational Patterns</span>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mt-4 tracking-tighter">Integration Scenarios</h2>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {integrationScenarios.map((scenario, i) => (
                <RevealOnScroll key={i} delay={i * 0.15}>
                  <SpotlightCard 
                    className="p-10 h-full flex flex-col group overflow-visible" 
                    spotlightColor={theme === 'dark' ? 'rgba(0, 240, 255, 0.1)' : 'rgba(59, 130, 246, 0.05)'}
                    enableTilt={true}
                  >
                     <div className="absolute top-4 right-8 text-[8px] font-mono font-bold text-brand-primary/40 dark:text-gray-700 tracking-widest">{scenario.protocol}</div>
                     
                     <div className="mb-10 w-14 h-14 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-2xl flex items-center justify-center text-brand-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:bg-brand-primary/10">
                        <scenario.icon size={28} />
                     </div>

                     <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight group-hover:text-brand-primary transition-colors">
                        {scenario.title}
                     </h3>
                     
                     <p className="text-sm text-slate-500 dark:text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                        {scenario.desc}
                     </p>

                     <div className="space-y-6 pt-6 border-t border-slate-100 dark:border-white/5">
                        <div className="space-y-3">
                           <span className="text-[9px] font-mono font-black text-brand-primary uppercase tracking-widest">Protocol Execution:</span>
                           <ul className="space-y-2">
                              {scenario.howItWorks.map((step, idx) => (
                                 <li key={idx} className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-gray-300">
                                    <div className="w-1 h-1 bg-brand-primary/40 rounded-full"></div>
                                    {step}
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div className="p-3 rounded-xl bg-brand-success/5 border border-brand-success/20 flex items-center gap-3">
                           <ShieldCheck size={14} className="text-brand-success" />
                           <span className="text-[10px] font-mono font-bold text-brand-success uppercase tracking-widest">{scenario.outcome}</span>
                        </div>
                     </div>
                  </SpotlightCard>
                </RevealOnScroll>
              ))}
           </div>
        </div>

        {/* SECTION 4 — INTEGRATION CAPABILITIES (CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
           {capabilityCards.map((card, i) => (
              <RevealOnScroll key={i} delay={i * 0.1}>
                 <div className="bg-white/80 dark:bg-brand-surface/40 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[2rem] p-10 hover:border-brand-primary/40 transition-all duration-500 shadow-xl group">
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-12 h-12 rounded-xl bg-brand-primary/5 flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                          <card.icon size={24} />
                       </div>
                       <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{card.title}</h4>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-gray-400 font-light leading-relaxed mb-8">{card.desc}</p>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse"></div>
                       <span className="text-[9px] font-mono font-bold text-brand-success uppercase tracking-widest">{card.status}</span>
                    </div>
                 </div>
              </RevealOnScroll>
           ))}
        </div>

        {/* SECTION 5 — OPERATIONAL METRICS */}
        <RevealOnScroll animation="animate-blur-in" className="mb-40">
           <div className="bg-brand-dark rounded-3xl p-8 md:p-12 border border-brand-primary/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 via-transparent to-brand-primary/5 opacity-50"></div>
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
                 <div className="flex flex-col items-center md:items-start">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Integration Uptime</span>
                    <span className="text-3xl md:text-5xl font-black text-white tracking-tighter flex items-center gap-3">
                       99.99% <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></div>
                    </span>
                 </div>
                 <div className="hidden md:block w-px h-16 bg-white/10"></div>
                 <div className="flex flex-col items-center md:items-start">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Active Logic Nodes</span>
                    <span className="text-3xl md:text-5xl font-black text-brand-primary tracking-tighter">40+</span>
                 </div>
                 <div className="hidden md:block w-px h-16 bg-white/10"></div>
                 <div className="flex flex-col items-center md:items-start">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">Data Sovereignty</span>
                    <span className="text-3xl md:text-5xl font-black text-brand-neon tracking-tighter uppercase">Verified</span>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 text-center">
                 <span className="text-[8px] font-mono text-gray-600 uppercase tracking-[0.4em] leading-relaxed">
                    System-of-Record Telemetry Node • Active Load Balance: Nominal • Metrics representative of active enterprise deployments
                 </span>
              </div>
           </div>
        </RevealOnScroll>

        {/* SECTION 6 — CTA */}
        <RevealOnScroll animation="animate-blur-in">
           <div className="max-w-4xl mx-auto text-center px-4">
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-8 tracking-tighter">
                Need to integrate Microsoft 365 with enterprise systems?
              </h2>
              <p className="text-xl text-slate-500 dark:text-gray-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                 Talk to our architects about secure, governed integration patterns for SAP, Microsoft 365, and regulated workflows.
              </p>
              <Link to="/contact">
                <button className="group relative bg-brand-primary text-white font-bold py-6 px-14 rounded-2xl overflow-hidden shadow-2xl hover:shadow-brand-primary/50 transition-all hover:scale-105 active:scale-95">
                  <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center gap-4 uppercase tracking-[0.3em] text-xs">
                     Talk to an Architect <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </Link>
           </div>
        </RevealOnScroll>
        
      </div>
    </div>
  );
};

export default Integrations;
