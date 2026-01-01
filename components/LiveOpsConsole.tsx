
import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle, History, ShieldCheck,
  Zap, Boxes, Database, Activity, Code,
  Cpu, Globe, Lock, Share2, Terminal,
  Workflow, Network, Layers
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";


interface ReleaseEvent {
  id: string | number;
  monthYear: string;
  product: string;
  feature: string;
  status: 'PRODUCTION' | 'VALIDATED' | 'UAT' | 'PILOT';
  source: string;
}

const LiveOpsConsole: React.FC = () => {
  // Broadened historical pool for more dynamic rotation
  // Broadened historical pool for more dynamic rotation
  const [eventPool, setEventPool] = useState<ReleaseEvent[]>([]);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.warn("User not authenticated yet");
        return;
      }

      try {
        const querySnapshot = await getDocs(
          collection(db, "megamliveworks")
        );

        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setEventPool(events);
      } catch (err) {
        console.error("Error fetching live ops events:", err);
      }
    });

    return () => unsubscribe();
  }, []);


  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [metrics, setMetrics] = useState({
    cpu: 19.3,
    ops: 123.2,
    lat: 9,
    sync: 100,
    packetLoss: 0.00
  });

  // Cycle through events more frequently for a "live" feel
  useEffect(() => {
    const cycleInterval = setInterval(() => {
      setVisibleStartIndex(prev => (eventPool.length > 0 ? (prev + 1) % eventPool.length : 0));

      // Jitter metrics with more varied data points
      setMetrics(prev => ({
        cpu: parseFloat((18 + Math.random() * 8).toFixed(1)),
        ops: parseFloat((120 + Math.random() * 15).toFixed(1)),
        lat: 6 + Math.floor(Math.random() * 8),
        sync: 99 + Math.random() * 1,
        packetLoss: Math.random() < 0.1 ? parseFloat((Math.random() * 0.05).toFixed(2)) : 0.00
      }));
    }, 3200);

    return () => clearInterval(cycleInterval);
  }, [eventPool.length]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'PRODUCTION': return { color: 'text-brand-success', bg: 'bg-brand-success/10', border: 'border-brand-success/20', icon: CheckCircle };
      case 'VALIDATED': return { color: 'text-brand-primary', bg: 'bg-brand-primary/10', border: 'border-brand-primary/20', icon: ShieldCheck };
      case 'UAT': return { color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: Activity };
      case 'PILOT': return { color: 'text-brand-secondary', bg: 'bg-brand-secondary/10', border: 'border-brand-secondary/20', icon: Share2 };
      default: return { color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/20', icon: Lock };
    }
  };

  const visibleEvents = useMemo(() => {
    if (eventPool.length === 0) return [];
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(eventPool[(visibleStartIndex + i) % eventPool.length]);
    }
    return result;
  }, [visibleStartIndex, eventPool]);

  return (
    <div
      aria-label="Release Intelligence Console"
      className="w-full max-w-lg mx-auto bg-white/95 dark:bg-brand-surface/90 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl dark:shadow-brand-primary/20 relative group transition-all duration-500"
    >

      {/* HUD Corner Elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-primary/40 dark:border-brand-neon/30 z-30 opacity-60" aria-hidden="true"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-primary/40 dark:border-brand-neon/30 z-30 opacity-60" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-primary/40 dark:border-brand-neon/30 z-30 opacity-60" aria-hidden="true"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-primary/40 dark:border-brand-neon/30 z-30 opacity-60" aria-hidden="true"></div>

      {/* Intensified Primary Scanning Line */}
      <div className="absolute left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-brand-primary dark:via-brand-neon to-transparent shadow-[0_0_30px_rgba(0,240,255,0.9)] z-40 animate-scan-line pointer-events-none opacity-90" aria-hidden="true"></div>

      {/* High-Fidelity CRT Scanline & Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.05] dark:opacity-[0.08] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" aria-hidden="true"></div>

      {/* Header Area */}
      <div className="bg-slate-100/90 dark:bg-brand-dark/95 px-6 py-6 flex items-center justify-between border-b border-slate-200 dark:border-white/5 transition-colors relative z-20">
        <div className="flex items-center gap-6">
          <div className="flex gap-2.5" aria-hidden="true">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary dark:bg-brand-neon shadow-[0_0_10px_currentColor] animate-pulse"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/30 dark:bg-brand-neon/50 shadow-[0_0_6px_currentColor] animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/10 dark:bg-brand-neon/20 shadow-[0_0_4px_currentColor] animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <div className="h-8 w-[1px] bg-slate-300 dark:bg-white/10" aria-hidden="true"></div>
          <div className="flex flex-col">
            <span className="text-[12px] font-mono text-slate-900 dark:text-brand-neon tracking-[0.3em] font-black flex items-center gap-2 uppercase">
              <Terminal size={14} className="text-brand-primary dark:text-brand-neon animate-pulse" aria-hidden="true" /> Release Intelligence
            </span>
            <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400 dark:text-gray-600 tracking-widest font-bold">
              <span>SYS_NODES_LIVE</span>
              <span className="w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-ping" aria-hidden="true"></span>
              <span>v4.1.0_PROD</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2.5 px-4 py-2 bg-brand-primary/5 dark:bg-brand-primary/10 rounded-xl border border-brand-primary/20 group-hover:border-brand-primary/50 transition-all shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <div className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </div>
            <span className="text-[11px] uppercase font-black text-brand-primary dark:text-brand-neon tracking-[0.2em] font-mono">Telemetry: Nominal</span>
          </div>
        </div>
      </div>

      {/* Content Canvas */}
      <div
        className="p-10 font-mono text-xs space-y-6 min-h-[460px] relative z-20 overflow-hidden"
        aria-live="polite"
        aria-label="Recent system releases"
      >
        {/* Advanced Perspective Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-60" aria-hidden="true"></div>

        <div className="relative space-y-5">
          {visibleEvents.map((event, index) => {
            const statusConfig = getStatusConfig(event.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={`${event.id}-${visibleStartIndex}-${index}`}
                className={`relative flex items-center gap-6 p-5 rounded-3xl border transition-all duration-1000 
                  ${index === 0
                    ? 'bg-white/90 dark:bg-white/15 border-brand-primary/30 dark:border-brand-neon/30 shadow-[0_15px_40px_rgba(59,130,246,0.1)] translate-y-0 opacity-100 scale-100 animate-blur-in'
                    : index === 1
                      ? 'bg-transparent border-slate-100 dark:border-white/5 opacity-70 scale-[0.98]'
                      : index === 2
                        ? 'bg-transparent border-transparent opacity-40 scale-[0.96] blur-[0.8px]'
                        : index === 3
                          ? 'bg-transparent border-transparent opacity-20 scale-[0.94] blur-[1.5px]'
                          : 'bg-transparent border-transparent opacity-10 scale-[0.92] blur-[2.5px]'}`}
              >
                {/* Visual Status Indicator for the lead item */}
                {index === 0 && (
                  <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-[8px] h-12 bg-brand-primary dark:bg-brand-neon rounded-full shadow-[0_0_15px_currentColor] animate-pulse" aria-hidden="true"></div>
                )}

                <div className="flex flex-col w-16 shrink-0 text-center">
                  <span className={`text-[11px] font-black tracking-tighter uppercase ${index === 0 ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400 dark:text-gray-600'}`}>
                    {event.monthYear.split(' ')[0]}
                  </span>
                  <span className={`text-[14px] font-black ${index === 0 ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-gray-500'}`}>
                    {event.monthYear.split(' ')[1]}
                  </span>
                </div>

                <div className={`shrink-0 p-3.5 rounded-2xl border transition-all duration-700 ${index === 0
                  ? 'bg-brand-primary/15 dark:bg-brand-neon/20 border-brand-primary/40 dark:border-brand-neon/40 text-brand-primary dark:text-brand-neon scale-110 shadow-lg shadow-brand-primary/10'
                  : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-400 dark:text-gray-600'}`}>
                  {event.product.includes('Artwork') ? <Workflow size={18} strokeWidth={2.5} aria-hidden="true" /> :
                    event.product.includes('Copilot') ? <Network size={18} strokeWidth={2.5} aria-hidden="true" /> :
                      event.product.includes('SAP') || event.product.includes('Sync') ? <Database size={18} strokeWidth={2.5} aria-hidden="true" /> :
                        event.product.includes('Project') ? <Layers size={18} strokeWidth={2.5} aria-hidden="true" /> :
                          <Code size={18} strokeWidth={2.5} aria-hidden="true" />}
                </div>

                <div className="flex flex-col min-w-0 flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[12px] font-black uppercase tracking-widest ${index === 0 ? 'text-slate-800 dark:text-white' : 'text-slate-400 dark:text-gray-600'}`}>
                      {event.product}
                    </span>
                    <div className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border flex items-center gap-1.5 shadow-sm`}>
                      <StatusIcon size={11} strokeWidth={3} aria-hidden="true" /> {event.status}
                    </div>
                  </div>
                  <span className={`text-[14px] font-bold truncate leading-tight transition-colors ${index === 0 ? 'text-slate-600 dark:text-gray-300' : 'text-slate-400 dark:text-gray-500'}`}>
                    {event.feature}
                  </span>
                  <div className={`text-[10px] mt-2.5 font-mono tracking-[0.2em] uppercase font-bold transition-opacity ${index === 0 ? 'opacity-100 text-brand-primary dark:text-brand-neon/70' : 'opacity-0'}`}>
                    {event.source}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="bg-slate-100/95 dark:bg-brand-dark/95 px-8 py-6 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-500 font-mono transition-all relative z-20">
        <div className="flex gap-10 items-center">
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-3 text-slate-900 dark:text-white transition-colors cursor-default">
              <ShieldCheck size={16} className="text-brand-success drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" aria-hidden="true" />
              <span className="font-black uppercase tracking-[0.3em] text-[11px]">Enterprise Validated</span>
            </span>
            <div className="flex items-center gap-3" aria-label="Compliance status">
              <span className="text-[10px] text-slate-400 dark:text-gray-600 uppercase tracking-widest font-black">SOC-ALIGNED</span>
              <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-white/10 rounded-full" aria-hidden="true"></span>
              <span className="text-[10px] text-slate-400 dark:text-gray-600 uppercase tracking-widest font-black">AUDIT-READY</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2.5 text-brand-primary dark:text-brand-neon font-bold" aria-label="System telemetry">
          <div className="flex items-center gap-3 bg-brand-primary/5 dark:bg-brand-primary/10 px-4 py-1.5 rounded-xl border border-brand-primary/20">
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
            <span className="uppercase tracking-[0.2em] text-[10px]">Uplink Sync {metrics.sync.toFixed(0)}%</span>
          </div>
          <div className="flex gap-6 text-[10px] text-slate-400 dark:text-gray-600 font-black uppercase tracking-tighter">
            <span className="flex items-center gap-1.5" aria-label={`CPU Load: ${metrics.cpu} percent`}><Cpu size={12} className="text-brand-primary" aria-hidden="true" /> {metrics.cpu}%</span>
            <span className="flex items-center gap-1.5" aria-label={`Latency: ${metrics.lat} milliseconds`}><Globe size={12} className="text-brand-primary" aria-hidden="true" /> {metrics.lat}MS</span>
            {metrics.packetLoss > 0 && <span className="flex items-center gap-1.5 text-brand-secondary">LOSS {metrics.packetLoss}%</span>}
          </div>
        </div>
      </div>

      {/* Interactive Glossy Highlight */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] dark:via-white/[0.1] to-transparent z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" aria-hidden="true"></div>
    </div>
  );
};

export default LiveOpsConsole;
