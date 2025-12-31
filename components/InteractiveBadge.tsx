
import React, { useState, useEffect } from 'react';
import { BADGE_DETAILS } from '../constants';
import { Info, Sparkles, Activity } from 'lucide-react';

interface InteractiveBadgeProps {
  label: string;
  delay?: number;
  animationType?: 'fade-in' | 'bounce' | 'scale-up';
}

const InteractiveBadge: React.FC<InteractiveBadgeProps> = ({ 
  label, 
  delay = 0,
  animationType = 'bounce'
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const details = BADGE_DETAILS[label] || { 
    description: "Enterprise-grade feature set for Microsoft 365 environments.",
    colorClass: "text-slate-500 border-slate-200 bg-slate-50 dark:text-gray-400 dark:border-white/10 dark:bg-white/5",
    glowClass: "shadow-[0_0_10px_rgba(148,163,184,0.2)]"
  };

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsShown(true);
      const initTimer = setTimeout(() => setIsInitialized(true), 1200);
      return () => clearTimeout(initTimer);
    }, delay * 100);
    return () => clearTimeout(showTimer);
  }, [delay]);

  const getAnimationClasses = () => {
    switch (animationType) {
      case 'fade-in':
        return `transition-opacity duration-1000 ease-out ${isShown ? 'opacity-100' : 'opacity-0'}`;
      case 'scale-up':
        return `transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isShown ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-50 blur-sm'}`;
      case 'bounce':
      default:
        return `transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isShown ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-75 blur-sm'}`;
    }
  };

  const badgeId = `badge-desc-${label.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div 
      className={`relative ${getAnimationClasses()}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Dynamic Entrance Ping */}
      {isShown && !isInitialized && (
        <div className="absolute inset-0 rounded-lg border-2 border-brand-primary dark:border-brand-neon animate-ping opacity-30 pointer-events-none" aria-hidden="true"></div>
      )}

      <button
        aria-describedby={badgeId}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
        className={`
          relative overflow-hidden px-3 py-1.5 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-widest cursor-help
          transition-all duration-500 flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
          ${details.colorClass}
          ${isActive 
            ? `scale-110 -translate-y-1.5 ${details.glowClass} z-10 border-opacity-100 ring-2 ring-brand-primary/10 dark:ring-brand-neon/10` 
            : 'scale-100 shadow-none border-opacity-40'
          }
        `}
      >
        {/* Holographic Scanning Light Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-brand-neon/20 to-transparent -translate-x-full transition-transform duration-[1200ms] ease-in-out ${isActive ? 'translate-x-full' : ''}`} aria-hidden="true"></div>
        
        <span className="relative z-10 transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white">
          {label}
        </span>
        
        <div className="relative z-10 flex items-center justify-center" aria-hidden="true">
          {isActive ? (
            <Sparkles size={10} className="text-brand-primary dark:text-brand-neon animate-pulse" />
          ) : (
            <Info size={10} className="opacity-40 transition-opacity" />
          )}
        </div>
      </button>

      {/* Advanced Logic Tooltip */}
      <div 
        id={badgeId}
        role="tooltip"
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 p-4 
          bg-white/95 dark:bg-brand-surface/95 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] z-[100]
          transition-all duration-500 pointer-events-none origin-bottom
          ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-90'}
        `}
      >
        {/* Visual Decoration Elements */}
        <div className="absolute top-2 left-2 w-1 h-1 bg-brand-primary dark:bg-brand-neon rounded-full opacity-30" aria-hidden="true"></div>
        <div className="absolute top-2 right-2 w-1 h-1 bg-brand-primary dark:bg-brand-neon rounded-full opacity-30" aria-hidden="true"></div>
        
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <Activity size={10} className="text-brand-primary dark:text-brand-neon" aria-hidden="true" />
              <span className="text-slate-900 dark:text-white font-black text-[9px] uppercase tracking-[0.2em]">Module_Protocol</span>
            </div>
            <div className="flex gap-0.5" aria-hidden="true">
               <div className="w-1.5 h-1.5 bg-brand-success rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></div>
            </div>
          </div>
          <p className="text-[10px] font-mono leading-relaxed text-slate-600 dark:text-gray-300 font-medium">
            {details.description}
          </p>
          <div className="pt-1 flex items-center gap-2 text-[7px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest border-t border-slate-50 dark:border-white/5 pt-2" aria-hidden="true">
            <div className="w-4 h-[1px] bg-slate-200 dark:bg-white/10"></div>
            Grounding: Enterprise Logic Nodes
          </div>
        </div>
        
        {/* Arrow Decoration */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-brand-surface border-r border-b border-slate-200 dark:border-white/10 rotate-45 -mt-2" aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default InteractiveBadge;
