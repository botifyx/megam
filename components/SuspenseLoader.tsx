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

const SuspenseLoader: React.FC = () => {
    const [phase, setPhase] = useState<'unifying' | 'unified'>('unifying');

    useEffect(() => {
        // Sequence the animation phases
        const timer = setTimeout(() => setPhase('unified'), 4000); // Increased to give time to read "Microsoft 365 Workflow Unification"
        return () => clearTimeout(timer);
    }, []);

    const radius = 160;

    return (
        <div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center overflow-hidden">

            <div className="relative z-10 w-full max-w-3xl flex flex-col items-center justify-center">

                {/* Animation Canvas */}
                <div className="relative w-full h-[400px] flex items-center justify-center mb-8">

                    {/* Central Hub Core Glow */}
                    <AnimatePresence>
                        {phase === 'unified' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 m-auto w-64 h-64 bg-blue-500/20 blur-3xl rounded-full"
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
                        transition={{ duration: 1, ease: 'easeInOut' }}
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
                                transition={{ duration: 0.8, ease: "easeInOut" }}
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
                                    duration: phase === 'unified' ? 0.8 : 1.5,
                                    delay: i * 0.05,
                                    ease: phase === 'unified' ? "backIn" : "easeOut"
                                }}
                                className={`absolute z-10 w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg ${app.color}`}
                            >
                                <app.icon className="w-6 h-6" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Text Area */}
                <div className="h-24 flex flex-col items-center justify-center text-center">
                    <AnimatePresence mode="wait">
                        {phase === 'unifying' && (
                            <motion.div
                                key="unifying"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.9 }}
                                className="font-mono text-sm md:text-base tracking-widest text-blue-400 uppercase"
                            >
                                Microsoft 365 Workflow Unification
                            </motion.div>
                        )}

                        {phase === 'unified' && (
                            <motion.div
                                key="unified"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center gap-3"
                            >
                                <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter">
                                    One Ecosystem. No silos. Full control.
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-12 w-64 md:w-96 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5.5, ease: "linear" }}
                    />
                </div>

            </div>
        </div>
    );
};

export default SuspenseLoader;

