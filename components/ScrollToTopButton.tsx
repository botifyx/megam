
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full transition-all duration-500 transform ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10 pointer-events-none'
      } bg-white/70 dark:bg-brand-surface/70 backdrop-blur-xl border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-brand-primary/30 dark:hover:shadow-brand-neon/30 hover:border-brand-primary dark:hover:border-brand-neon group active:scale-90`}
      aria-label="Scroll to top"
    >
      <div className="absolute inset-0 bg-brand-primary/10 dark:bg-brand-neon/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <ChevronUp 
        size={24} 
        className="relative z-10 text-slate-600 dark:text-gray-400 group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-colors"
      />
      {/* HUD Accent */}
      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-primary dark:bg-brand-neon opacity-0 group-hover:opacity-100 animate-pulse"></div>
    </button>
  );
};

export default ScrollToTopButton;
