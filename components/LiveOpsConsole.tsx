
import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, RefreshCw, MessageSquare, FileCheck, Activity, Search, Database, HardDrive, Cpu } from 'lucide-react';

interface LogEvent {
  id: number;
  type: 'success' | 'warning' | 'info' | 'message';
  text: string;
  time: string;
  source: string;
}

const LiveOpsConsole: React.FC = () => {
  const [events, setEvents] = useState<LogEvent[]>([
    { id: 1, type: 'success', text: 'Artwork.Today: Label v2.4 Approved', time: '10:42:12', source: 'QA Team' },
    { id: 2, type: 'info', text: 'SAP Sync: SKU #99201 Updated', time: '10:42:15', source: 'System' },
    { id: 3, type: 'message', text: 'Teams: Project "Launch Alpha" created', time: '10:42:28', source: 'PM Bot' },
  ]);

  useEffect(() => {
    const possibleEvents: Omit<LogEvent, 'id' | 'time'>[] = [
      { type: 'success', text: 'Workflow: Compliance Check Passed', source: 'AI Engine' },
      { type: 'info', text: 'SAP Sync: Material Master Synced', source: 'Connector' },
      { type: 'message', text: 'Teams: Approval Request Sent', source: 'User' },
      { type: 'warning', text: 'Alert: Stock Level Low (Triggered Order)', source: 'ERP' },
      { type: 'success', text: 'Artwork.Today: Print Proof Generated', source: 'Renderer' },
      { type: 'info', text: 'SharePoint: Audit Log Archived', source: 'System' },
    ];

    const interval = setInterval(() => {
      const randomEvent = possibleEvents[Math.floor(Math.random() * possibleEvents.length)];
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false });
      
      setEvents(prev => {
        const newEvents = [{ ...randomEvent, id: Date.now(), time: timeString }, ...prev];
        return newEvents.slice(0, 6); // Keep last 6 events
      });
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={14} className="text-brand-success" />;
      case 'warning': return <AlertCircle size={14} className="text-amber-500" />;
      case 'info': return <RefreshCw size={14} className="text-brand-accent animate-spin-slow" />;
      case 'message': return <MessageSquare size={14} className="text-brand-primary" />;
      default: return <FileCheck size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white/95 dark:bg-brand-surface/90 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-2xl dark:shadow-brand-primary/20 relative group transition-all duration-500">
      
      {/* HUD Corner Elements */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-primary/40 dark:border-brand-neon/30 z-30"></div>
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-primary/40 dark:border-brand-neon/30 z-30"></div>
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-primary/40 dark:border-brand-neon/30 z-30"></div>
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-primary/40 dark:border-brand-neon/30 z-30"></div>

      {/* Dynamic Scanning Effect */}
      <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-primary/40 dark:via-brand-neon/50 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.4)] z-20 animate-scan-line pointer-events-none"></div>
      
      {/* CRT Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] dark:opacity-[0.05] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"></div>

      {/* Header */}
      <div className="bg-slate-50/80 dark:bg-brand-dark/80 px-5 py-4 flex items-center justify-between border-b border-slate-200 dark:border-white/5 transition-colors relative z-20">
        <div className="flex items-center gap-4">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/20 dark:bg-white/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/20 dark:bg-white/10"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-brand-primary/20 dark:bg-white/10"></div>
          </div>
          <div className="h-5 w-[1px] bg-slate-200 dark:bg-white/10"></div>
          <div className="flex flex-col">
             <span className="text-[10px] font-mono text-slate-500 dark:text-brand-neon/80 tracking-[0.2em] font-bold flex items-center gap-2 uppercase">
               <Activity size={12} className="animate-pulse" /> Live Telemetry
             </span>
             <span className="text-[8px] font-mono text-slate-400 dark:text-gray-600 tracking-tight">NODES_SYNC_04</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-brand-success/10 rounded-full border border-brand-success/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse shadow-[0_0_5px_#10b981]"></div>
          <span className="text-[9px] uppercase font-bold text-brand-success tracking-widest">Protocol Nominal</span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 font-mono text-xs space-y-4 min-h-[300px] relative z-20">
         {/* Subtle Grid Background */}
         <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none"></div>

        {events.map((event, index) => (
          <div 
            key={event.id}
            className={`relative flex items-center gap-5 p-3 rounded-xl border transition-all duration-700 
              ${index === 0 
                ? 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 shadow-sm translate-y-0 opacity-100 scale-100 animate-blur-in' 
                : 'bg-transparent border-transparent opacity-60 scale-[0.98] blur-[0.5px]'} 
              ${index > 4 ? 'opacity-10 grayscale' : ''}`}
          >
            <span className="text-[10px] text-slate-400 dark:text-gray-600 w-16 shrink-0 tabular-nums font-bold">[{event.time}]</span>
            <div className={`shrink-0 p-1.5 rounded-lg ${index === 0 ? 'bg-brand-primary/5 dark:bg-brand-neon/10' : 'bg-slate-100 dark:bg-white/5'}`}>
              {getIcon(event.type)}
            </div>
            <div className="flex flex-col min-w-0">
              <span className={`text-[13px] font-bold truncate transition-colors ${index === 0 ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-gray-500'}`}>
                {event.text}
              </span>
              <div className="flex items-center gap-2 mt-1">
                 <span className={`text-[8px] uppercase tracking-widest font-extrabold px-1.5 py-0.5 rounded ${index === 0 ? 'bg-brand-primary/10 text-brand-primary' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-gray-600'}`}>
                   SRC::{event.source}
                 </span>
                 {index === 0 && (
                   <div className="flex gap-1">
                     <div className="w-1 h-1 bg-brand-primary dark:bg-brand-neon rounded-full animate-pulse"></div>
                     <div className="w-1 h-1 bg-brand-primary dark:bg-brand-neon rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                     <div className="w-1 h-1 bg-brand-primary dark:bg-brand-neon rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer Status Bar */}
      <div className="bg-slate-50 dark:bg-brand-dark/90 px-6 py-3 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500 dark:text-gray-500 font-mono transition-all relative z-20">
        <div className="flex gap-6 items-center">
           <span className="flex items-center gap-2 hover:text-brand-primary transition-colors cursor-default">
              <Cpu size={12} className="text-brand-primary/60" /> 
              <span className="font-bold">CPU <span className="text-brand-primary">12.4%</span></span>
           </span>
           <span className="flex items-center gap-2 hover:text-brand-secondary transition-colors cursor-default">
              <Database size={12} className="text-brand-secondary/60" /> 
              <span className="font-bold">OPS <span className="text-brand-secondary">88.2K/s</span></span>
           </span>
           <span className="hidden sm:flex items-center gap-2 hover:text-brand-accent transition-colors cursor-default">
              <HardDrive size={12} className="text-brand-accent/60" /> 
              <span className="font-bold">LAT <span className="text-brand-accent">12ms</span></span>
           </span>
        </div>
        <div className="flex items-center gap-2 text-brand-primary dark:text-brand-neon font-bold animate-pulse">
           <Search size={12} />
           <span className="uppercase tracking-[0.2em]">Validated</span>
        </div>
      </div>

      {/* Glossy Overlay Reflection */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] dark:via-white/[0.05] to-transparent z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
    </div>
  );
};

export default LiveOpsConsole;
