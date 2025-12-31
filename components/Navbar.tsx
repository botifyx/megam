
import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { APP_NAME } from '../constants';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Product Suites', path: '/suites' },
    { name: 'M365 Services', path: '/services' },
    { name: 'Integrations', path: '/integrations' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Skip to Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-primary focus:text-white focus:rounded-lg focus:font-bold focus:shadow-2xl"
      >
        Skip to main content
      </a>

      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/90 dark:bg-brand-dark/95 backdrop-blur-md border-b border-brand-primary/10 dark:border-brand-primary/20 py-3 shadow-lg' 
            : 'bg-transparent py-6'
        }`}
        aria-label="Main Navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg" aria-label={`${APP_NAME} Home`}>
              <div className="relative">
                <Logo height={42} className="group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-brand-neon/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <span className="font-bold text-xl tracking-tighter text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-neon transition-all duration-300">
                {APP_NAME}
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-2">
              <ul className="flex items-baseline space-x-1 mr-4" role="list">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        aria-current={isActive ? 'page' : undefined}
                        className={`relative px-4 py-2 text-[11px] font-bold transition-all duration-300 group rounded overflow-hidden font-mono uppercase tracking-widest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary flex items-center h-10 ${
                          isActive
                            ? 'text-brand-primary dark:text-brand-neon' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <div className="absolute inset-0 bg-brand-primary/5 dark:bg-brand-neon/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 z-0"></div>
                        <span className="relative z-10 transition-all duration-300 inline-block">
                          {link.name}
                        </span>
                        <span className={`absolute bottom-0 left-1/2 w-2/3 h-[2px] bg-brand-primary dark:bg-brand-neon transform -translate-x-1/2 transition-all duration-500 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100'}`}></span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={18} className="text-brand-neon" aria-hidden="true" /> : <Moon size={18} className="text-slate-700" aria-hidden="true" />}
              </button>
            </div>

            <div className="-mr-2 flex md:hidden items-center gap-3">
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} className="text-brand-neon" aria-hidden="true" /> : <Moon size={20} className="text-slate-700" aria-hidden="true" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {isOpen ? <X size={24} className="text-brand-primary dark:text-brand-neon" aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        <div 
          id="mobile-menu"
          className={`md:hidden bg-white/98 dark:bg-brand-dark/98 backdrop-blur-2xl border-b border-brand-primary/10 dark:border-brand-primary/20 transition-all duration-300 ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
        >
          <ul className="px-4 pt-4 pb-6 space-y-2" role="list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded text-sm font-mono uppercase tracking-widest transition-all ${
                      location.pathname === link.path 
                        ? 'text-brand-primary dark:text-brand-neon bg-brand-primary/5 dark:bg-brand-primary/10' 
                        : 'text-slate-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-neon'
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
