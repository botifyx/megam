
import React from 'react';
import { Shield, Lock, Eye, Globe, FileText, ChevronRight, Activity, Terminal } from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';

const Privacy: React.FC = () => {
  const protocols = [
    {
      id: "P-01",
      icon: Eye,
      title: "Data Collection Protocol",
      content: "We collect information required for operational excellence. This includes identity data (name, email) and technical telemetry (IP address, browser type) to optimize your interface with our AI-native solutions.",
      details: ["Identity Verification", "Technical Log Data", "Usage Metrics"]
    },
    {
      id: "P-02",
      icon: Shield,
      title: "Utilization Framework",
      content: "Data is strictly utilized to provide, maintain, and improve our M365 ecosystems. We leverage analytics to predict system load and enhance the 'Cognitive focus' of our AI agents grounded in your data.",
      details: ["Service Optimization", "Predictive Analytics", "Communication Uplinks"]
    },
    {
      id: "P-03",
      icon: Lock,
      title: "Security Encryption Layer",
      content: "Megam Live employs industry-standard AES-256 encryption. Our infrastructure is architected to ensure that your 'Systems of Record' data remains sovereign and secure during transition cycles.",
      details: ["AES-256 Encryption", "SOC2 Alignment", "Zero-Trust Architecture"]
    },
    {
      id: "P-04",
      icon: Globe,
      title: "Third-Party Interfacing",
      content: "We do not sell your data. Third-party data exchange only occurs with trusted Microsoft 365 services and vetted enterprise partners essential to your custom-engineered workflow.",
      details: ["No Data Monetization", "Partner Vetting", "Microsoft Cloud Security"]
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-brand-dark min-h-screen relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20">
          <RevealOnScroll animation="animate-tracking-in-expand">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-success/30 bg-brand-success/5 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse"></div>
              <span className="text-[10px] font-mono font-bold text-brand-success uppercase tracking-[0.3em]">Compliance: Verified</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-neon">Protocols</span>
            </h1>
            <p className="text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              Our commitment to your data sovereignty. Megam Live operates under a transparency-first mandate for the modern US enterprise.
            </p>
          </RevealOnScroll>
        </div>

        <div className="space-y-8 mb-24">
          {protocols.map((protocol, idx) => (
            <RevealOnScroll key={protocol.id} animation="animate-fade-in-up" delay={idx * 0.1}>
              <SpotlightCard className="p-8 md:p-10 border-white/5" spotlightColor="rgba(0, 240, 255, 0.05)">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-brand-neon group-hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] transition-all">
                      <protocol.icon size={32} />
                    </div>
                    <div className="mt-4 text-center font-mono text-[10px] text-gray-600 uppercase tracking-widest">
                      {protocol.id}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      {protocol.title}
                      <div className="h-px flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
                    </h2>
                    <p className="text-gray-400 font-light leading-relaxed mb-6 text-lg">
                      {protocol.content}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {protocol.details.map((detail, i) => (
                        <span key={i} className="px-3 py-1 rounded-md bg-black/40 border border-white/5 text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                          <Activity size={10} className="text-brand-primary" /> {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* Legal Addendum HUD */}
        <RevealOnScroll animation="animate-blur-in">
          <div className="relative group p-1 bg-gradient-to-br from-brand-primary/20 via-white/5 to-transparent rounded-3xl overflow-hidden">
             <div className="relative bg-brand-surface/90 backdrop-blur-2xl rounded-[1.4rem] p-10 border border-white/5">
                <div className="absolute top-4 right-6 text-[8px] font-mono text-gray-700 opacity-60">
                   LEGAL_TRANSCRIPT: V.4.2.0<br/>
                   REGION: NORTH_AMERICA<br/>
                   UPLINK: SECURE
                </div>
                
                <div className="flex items-center gap-3 mb-8">
                   <Terminal size={20} className="text-brand-neon" />
                   <h3 className="text-white font-bold tracking-widest uppercase text-xs">US State Specific Rights (CCPA/CPRA)</h3>
                </div>

                <div className="prose prose-invert max-w-none text-sm text-gray-400 font-light space-y-6">
                   <p>
                      In accordance with the California Consumer Privacy Act (CCPA), residents have specific rights regarding their personal information. These include the right to request disclosure of data collected, the right to deletion, and the right to opt-out of data transfers. 
                   </p>
                   <p>
                      Megam Live acknowledges these mandates and provides seamless interfaces for exercising these rights. Contact our Privacy Architect at <span className="text-brand-neon font-mono">{process.env.CONTACT_EMAIL || 'letsdoit@megam.live'}</span> to initiate a data access or deletion request.
                   </p>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                   <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">
                      Last Updated: Oct 2024
                   </div>
                   <button className="flex items-center gap-2 text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.2em] hover:text-brand-neon transition-colors">
                      Download Full Transcript <FileText size={14} />
                   </button>
                </div>
             </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default Privacy;
