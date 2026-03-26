import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bot,
    Mail,
    Cloud,
    FileText,
    Table,
    Presentation,
    Share2,
    Users,
    Workflow,
    ListTodo,
    CalendarDays,
    ClipboardList,
    BarChart3,
    Network
} from 'lucide-react';

interface PageLoaderProps {
    onComplete: () => void;
}

const m365Apps = [
    { icon: Bot, name: 'Copilot', color: 'text-purple-400' },
    { icon: Mail, name: 'Outlook', color: 'text-blue-400' },
    { icon: Cloud, name: 'OneDrive', color: 'text-blue-300' },
    { icon: FileText, name: 'Word', color: 'text-blue-500' },
    { icon: Table, name: 'Excel', color: 'text-green-500' },
    { icon: Presentation, name: 'PowerPoint', color: 'text-orange-500' },
    { icon: Share2, name: 'SharePoint', color: 'text-teal-500' },
    { icon: Users, name: 'Teams', color: 'text-indigo-400' },
    { icon: Workflow, name: 'Power Automate', color: 'text-blue-600' },
    { icon: ListTodo, name: 'Lists', color: 'text-rose-500' },
    { icon: CalendarDays, name: 'Planner', color: 'text-green-600' },
    { icon: ClipboardList, name: 'Forms', color: 'text-teal-400' },
    { icon: BarChart3, name: 'Power BI', color: 'text-yellow-500' },
];

const PageLoader: React.FC<PageLoaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [phase, setPhase] = useState<'unifying' | 'unified'>('unifying');

    useEffect(() => {
        // Progress simulation
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 1.5; // Slower increment to make 'Microsoft 365 Workflow Unification' readable
                if (next > 100) return 100;
                
                if (next > 70 && phase === 'unifying') {
                    setPhase('unified');
                }

                return next;
            });
        }, 40); // Fast updates

        return () => clearInterval(timer);
    }, [phase]);

    useEffect(() => {
        if (progress >= 100) {
            setPhase('unified');
            // Start exit sequence once progress hits 100%
            const exitTimer = setTimeout(() => {
                setIsExiting(true);
                // Wait for CSS fade out before unmounting
                setTimeout(onComplete, 800); 
            }, 3000); // 3-second pause to read 'One Ecosystem. No silos. Full control.'
            return () => clearTimeout(exitTimer);
        }
    }, [progress, onComplete]);

    const radius = 160;

    return (
        <div className={`fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-in-out ${isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center">

                {/* Animation Canvas */}
                <div className="relative w-full h-[360px] md:h-[400px] flex items-center justify-center mb-4 md:mb-8">
                    {/* Central Hub Core Glow */}
                    <AnimatePresence>
                        {phase === 'unified' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 m-auto w-48 h-48 md:w-64 md:h-64 bg-blue-500/20 blur-3xl rounded-full"
                            />
                        )}
                    </AnimatePresence>

                    {/* Central Hub */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: phase === 'unified' ? 1.2 : 1,
                            opacity: 1
                        }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        className={`absolute z-20 flex items-center justify-center w-20 h-20 rounded-full border border-white/20 bg-white/5 backdrop-blur-md ${phase === 'unified' ? 'shadow-[0_0_50px_rgba(59,130,246,0.6)] border-blue-500' : ''}`}
                    >
                        <Network className="w-8 h-8 text-blue-400 animate-pulse" />
                    </motion.div>

                    {/* Lines from Center to Nodes */}
                    {m365Apps.map((_, i) => {
                        const angle = (i * 360) / m365Apps.length;
                        return (
                            <motion.div
                                key={`line-${i}`}
                                className="absolute top-1/2 left-1/2 h-[2px] origin-left -z-10 bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-purple-500/50"
                                style={{ y: "-50%", rotate: angle }}
                                initial={{ opacity: 0, width: 0 }}
                                animate={{
                                    opacity: 1,
                                    width: phase === 'unified' ? 0 : radius,
                                }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            />
                        );
                    })}

                    {/* Node Icons */}
                    {m365Apps.map((app, i) => {
                        const angle = (i * 360) / m365Apps.length;
                        const radian = (angle * Math.PI) / 180;
                        const x = Math.cos(radian) * radius;
                        const y = Math.sin(radian) * radius;

                        return (
                            <motion.div
                                key={app.name}
                                initial={{
                                    x: x + (Math.random() * 40 - 20),
                                    y: y + (Math.random() * 40 - 20),
                                    opacity: 0,
                                    scale: 0
                                }}
                                animate={{
                                    x: phase === 'unified' ? 0 : x,
                                    y: phase === 'unified' ? 0 : y,
                                    opacity: phase === 'unified' ? 0 : 1,
                                    scale: phase === 'unified' ? 0.5 : 1,
                                }}
                                transition={{
                                    duration: phase === 'unified' ? 0.8 : 1.2,
                                    delay: i * 0.03,
                                    ease: phase === 'unified' ? "backIn" : "easeOut"
                                }}
                                className={`absolute z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg ${app.color} hover:scale-110 transition-transform`}
                            >
                                <app.icon className="w-6 h-6" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Progress Bar Container */}
                <div className="w-64 md:w-96 h-1 bg-gray-800 rounded-full overflow-hidden relative mb-6 border border-white/5">
                    <div
                        className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400 transition-all duration-100 ease-out relative"
                        style={{ width: `${progress}%` }}
                    >
                        {/* Leading Edge Glow */}
                        <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/80 shadow-[0_0_15px_#fff]"></div>
                    </div>
                </div>

                {/* Text Area */}
                <div className="h-16 flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        {phase === 'unifying' && (
                            <motion.div
                                key="unifying"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.9 }}
                                className="font-mono text-xs md:text-sm tracking-widest text-blue-400 uppercase flex items-center justify-between w-64 md:w-96"
                            >
                                <span className="text-left truncate">Microsoft 365 Unification</span>
                                <span className="text-gray-500 tabular-nums">{Math.floor(progress)}%</span>
                            </motion.div>
                        )}

                        {phase === 'unified' && (
                            <motion.div
                                key="unified"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl md:text-3xl font-extrabold text-white tracking-tighter"
                            >
                                One Ecosystem. No silos. Full control.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

export default PageLoader;
