import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40 }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
      >
        <defs>
          <linearGradient id="megam-swirl-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="45%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <filter id="logo-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Stylized Swirl/A-Mark inspired by the provided image */}
        <path
          d="M50 15C30.67 15 15 30.67 15 50C15 69.33 30.67 85 50 85C69.33 85 85 69.33 85 50C85 38.3 79.3 27.9 70.5 21.5L64.5 27.5C71.1 32.5 75 40.8 75 50C75 63.8 63.8 75 50 75C36.2 75 25 63.8 25 50C25 36.2 36.2 25 50 25C54.1 25 57.9 26 61.3 27.7L67.3 21.7C62.3 17.5 56.4 15 50 15Z"
          fill="url(#megam-swirl-grad)"
          className="animate-pulse-glow"
        />
        <path
          d="M50 35C41.72 35 35 41.72 35 50C35 58.28 41.72 65 50 65C58.28 65 65 58.28 65 50C65 41.72 58.28 35 50 35Z"
          fill="url(#megam-swirl-grad)"
          opacity="0.8"
        />
      </svg>
    </div>
  );
};

export default Logo;
