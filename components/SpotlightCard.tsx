
import React, { useRef, useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  className = "", 
  spotlightColor,
  enableTilt = false
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [transformStyle, setTransformStyle] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  // Default spotlight colors based on theme if not provided
  const defaultSpotlight = theme === 'dark' 
    ? "rgba(0, 240, 255, 0.15)" 
    : "rgba(59, 130, 246, 0.1)";

  const effectiveSpotlightColor = spotlightColor || defaultSpotlight;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });

    const xRatio = (x / rect.width - 0.5) * 2; 
    const yRatio = (y / rect.height - 0.5) * 2; 

    divRef.current.style.setProperty('--mouse-x', xRatio.toString());
    divRef.current.style.setProperty('--mouse-y', yRatio.toString());
    divRef.current.style.setProperty('--spotlight-x', `${x}px`);
    divRef.current.style.setProperty('--spotlight-y', `${y}px`);

    if (enableTilt) {
        const rotateX = yRatio * -3; 
        const rotateY = xRatio * 3;
        setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    }
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => {
    setOpacity(0);
    if (enableTilt) {
        setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    }
  };

  const isHovering = opacity > 0;
  const dynamicStyle: React.CSSProperties = {
      transform: enableTilt ? transformStyle : undefined,
      transition: enableTilt && isHovering 
        ? 'transform 0.1s ease-out' 
        : 'all 0.5s ease-out',
      // @ts-ignore
      '--spotlight-color': effectiveSpotlightColor,
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={dynamicStyle}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-brand-surface/50 backdrop-blur-sm group shadow-sm dark:shadow-none transition-colors duration-500 ${className}`}
    >
      {/* 1. Dynamic Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), var(--spotlight-color), transparent 40%)`,
        }}
      />
      
      {/* 2. Border Glow Reveal */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
            background: `radial-gradient(800px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(59,130,246,0.04)'}, transparent 40%)`
        }}
      ></div>

      {/* 3. Glossy Reflection (Microsoft Material Effect) */}
      <div 
         className="absolute inset-0 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10 mix-blend-overlay"
         style={{
            background: `linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.0) 50%, transparent 100%)`,
            transform: 'translateX(calc(var(--mouse-x, 0) * -15%)) translateY(calc(var(--mouse-y, 0) * -15%))',
            filter: 'blur(5px)'
         }}
      />

      {/* 4. Parallax Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition duration-700 z-0"
        style={{
             backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'} 1px, transparent 1px)`,
             backgroundSize: '40px 40px',
             transform: 'translateX(calc(var(--mouse-x, 0) * -10px)) translateY(calc(var(--mouse-y, 0) * -10px))'
        }}
      />
      
      <div className="relative z-10 h-full transform-style-3d">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
