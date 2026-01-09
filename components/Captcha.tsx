
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
    onCodeChange: (code: string) => void;
    className?: string;
}

const Captcha: React.FC<CaptchaProps> = ({ onCodeChange, className = '' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Exclude characters that are hard to distinguish (0, O, 1, I, l)
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    const generateCode = useCallback(() => {
        let code = '';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }, []);

    const drawCaptcha = useCallback((code: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = '#f8fafc'; // slate-50
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add noise (lines)
        for (let i = 0; i < 7; i++) {
            ctx.strokeStyle = `rgba(100, 116, 139, ${Math.random() * 0.5})`; // slate-500 with varying opacity
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        // Add noise (dots)
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(148, 163, 184, ${Math.random() * 0.5})`; // slate-400
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Text settings
        ctx.font = 'bold 24px monospace';
        ctx.textBaseline = 'middle';

        // Draw characters with slight rotation and spacing
        const width = canvas.width;
        const charWidth = width / 7; // Divide space

        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            ctx.save();
            // Position logic to center roughly but randomly jitter
            const x = (i + 1) * charWidth - 10 + (Math.random() * 5);
            const y = canvas.height / 2 + (Math.random() * 6 - 3);

            // Translate to position, rotate, then draw
            ctx.translate(x, y);
            const rotation = (Math.random() - 0.5) * 0.4; // +/- 0.2 radians
            ctx.rotate(rotation);

            ctx.fillStyle = '#0f172a'; // slate-900 (high contrast)
            ctx.fillText(char, 0, 0);

            ctx.restore();
        }
    }, []);

    const refreshCaptcha = useCallback(() => {
        setIsRefreshing(true);
        const newCode = generateCode();
        onCodeChange(newCode);
        drawCaptcha(newCode);

        // Animation timeout
        setTimeout(() => setIsRefreshing(false), 500);
    }, [generateCode, drawCaptcha, onCodeChange]);

    useEffect(() => {
        refreshCaptcha();
    }, []); // Initial load

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <canvas
                ref={canvasRef}
                width={160}
                height={50}
                className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 cursor-pointer shadow-inner"
                onClick={refreshCaptcha}
                title="Click to refresh captcha"
            />
            <button
                type="button"
                onClick={refreshCaptcha}
                className={`
          p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all 
          text-slate-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-neon
          ${isRefreshing ? 'animate-spin' : ''}
        `}
                aria-label="Refresh Captcha"
            >
                <RefreshCw size={20} />
            </button>
        </div>
    );
};

export default Captcha;
