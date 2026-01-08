import React from 'react';
import { Terminal } from 'lucide-react';

const SuspenseLoader: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

            {/* Main Loader Content */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Hexagon/Core Animation */}
                <div className="relative w-16 h-16 mb-8">
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 border-t-2 border-l-2 border-brand-neon rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-2 border-b-2 border-r-2 border-brand-primary rounded-full animate-spin-reverse-slow"></div>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Terminal className="text-white animate-pulse" size={24} />
                    </div>

                    {/* Glow */}
                    <div className="absolute inset-0 bg-brand-neon/20 blur-xl rounded-full animate-pulse-glow"></div>
                </div>

                {/* Status Text */}
                <div className="font-mono text-xs text-brand-accent tracking-widest animate-pulse">
                    LOADING SYSTEM RESOURCES...
                </div>
            </div>
        </div>
    );
};

export default SuspenseLoader;
