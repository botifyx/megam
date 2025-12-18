import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

interface PageLoaderProps {
  onComplete: () => void;
}

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [status, setStatus] = useState('INITIALIZING CONNECTION...');

  useEffect(() => {
    // Progress simulation
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 4; // Random increment
        if (next > 100) return 100;
        
        // Status text updates based on progress thresholds
        if (next > 15 && next < 20) setStatus('ALLOCATING NEURAL RESOURCES...');
        if (next > 40 && next < 45) setStatus('LOADING CORE MODULES...');
        if (next > 65 && next < 70) setStatus('VERIFYING SECURITY PROTOCOLS...');
        if (next > 85 && next < 90) setStatus('ESTABLISHING SECURE UPLINK...');
        if (next >= 100) setStatus('SYSTEM READY');
        
        return next;
      });
    }, 40); // Fast updates for tech feel

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
       // Start exit sequence once progress hits 100%
       const exitTimer = setTimeout(() => {
           setIsExiting(true);
           // Wait for CSS fade out before unmounting
           setTimeout(onComplete, 800); 
       }, 500); // Slight pause at 100%
       return () => clearTimeout(exitTimer);
    }
  }, [progress, onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
       {/* Background Effects */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
       
       {/* Main Loader Content */}
       <div className="relative z-10 flex flex-col items-center w-64">
          
          {/* Hexagon/Core Animation */}
          <div className="relative w-24 h-24 mb-12">
             {/* Rotating Rings */}
             <div className="absolute inset-0 border-t-2 border-l-2 border-brand-neon rounded-full animate-spin-slow"></div>
             <div className="absolute inset-2 border-b-2 border-r-2 border-brand-primary rounded-full animate-spin-reverse-slow"></div>
             
             {/* Center Icon */}
             <div className="absolute inset-0 flex items-center justify-center">
                <Terminal className="text-white animate-pulse" size={32} />
             </div>
             
             {/* Glow */}
             <div className="absolute inset-0 bg-brand-neon/20 blur-xl rounded-full animate-pulse-glow"></div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative mb-4 border border-white/5">
             <div 
               className="h-full bg-gradient-to-r from-brand-primary to-brand-neon transition-all duration-100 ease-out relative"
               style={{ width: `${progress}%` }}
             >
                {/* Leading Edge Glow */}
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 shadow-[0_0_15px_#fff]"></div>
             </div>
          </div>

          {/* Status Text & Percentage */}
          <div className="w-full flex justify-between items-center font-mono text-[10px]">
             <span className="text-brand-accent tracking-widest truncate max-w-[80%] animate-pulse">
                {status}
             </span>
             <span className="text-gray-500 tabular-nums">
                {Math.floor(progress)}%
             </span>
          </div>
       </div>

       {/* Corner Decorations for HUD feel */}
       <div className="absolute bottom-8 left-8 text-[10px] font-mono text-gray-600 flex flex-col gap-1 border-l-2 border-gray-800 pl-3">
          <span className="text-gray-400">MEGAM.LIVE // V.4.2</span>
          <span>SECURE BOOT SEQUENCE</span>
       </div>
       <div className="absolute bottom-8 right-8 text-[10px] font-mono text-gray-600 flex flex-col gap-1 text-right border-r-2 border-gray-800 pr-3">
          <span className="text-gray-400">LATENCY: 12MS</span>
          <span>ENCRYPTION: AES-256</span>
       </div>
    </div>
  );
};

export default PageLoader;