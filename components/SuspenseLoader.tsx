import React from 'react';
import { Terminal } from 'lucide-react';

const SuspenseLoader: React.FC = () => {
    return (
        <div className="flex-grow flex flex-col items-center justify-center min-h-[50vh] w-full bg-slate-50 dark:bg-brand-dark transition-colors duration-500">
            <div className="relative z-10 flex flex-col items-center">
                {/* Hexagon/Core Animation */}
                <div className="relative w-16 h-16">
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 border-t-2 border-l-2 border-brand-neon rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-2 border-b-2 border-r-2 border-brand-primary rounded-full animate-spin-reverse-slow"></div>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Terminal className="text-slate-800 dark:text-white animate-pulse" size={24} />
                    </div>

                    {/* Glow */}
                    <div className="absolute inset-0 bg-brand-neon/20 blur-xl rounded-full animate-pulse-glow"></div>
                </div>

                <div className="mt-4 font-mono text-xs text-brand-primary dark:text-brand-accent animate-pulse">
                    LOADING MODULE...
                </div>
            </div>
        </div>
    );
};

export default SuspenseLoader;
