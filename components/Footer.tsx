
import React from 'react';
import { APP_NAME, CONTACT_INFO } from '../constants';
import { Linkedin, Twitter, Activity, Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  return (
    <footer className="bg-white dark:bg-brand-surface border-t border-slate-200 dark:border-brand-primary/20 pt-20 pb-10 relative overflow-hidden transition-colors duration-500">
      {/* High-tech Background Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] bg-[linear-gradient(rgba(59,130,246,1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,1)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-move"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-neon/5 rounded-full blur-[100px]"></div>

        {/* Subtle Scanline */}
        <div className="absolute inset-x-0 h-[1px] bg-brand-primary/10 dark:bg-brand-neon/10 shadow-[0_0_15px_rgba(0,240,255,0.2)] animate-scan-line pointer-events-none"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Column 1: Brand & Contact */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 group cursor-default">
              <img
                src={theme === 'dark' ? "/Logo_Dark.png" : "/Logo_Light.png"}
                alt="Megam Logo"
                className={`w-auto transition-all duration-300 ${theme === 'dark' ? 'h-12' : 'h-12'
                  }`}
              />
            </div>
            <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed font-light">
              Engineering enterprise-grade Microsoft 365 solutions, governed workflows, and secure system integrations.
            </p>

            <div className="space-y-3">
              <a href="tel:+16466341052" className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-500 hover:text-brand-primary dark:hover:text-brand-neon transition-all group/info">
                <Phone size={14} className="text-brand-primary group-hover/info:scale-110 transition-transform" />
                <span className="font-mono tracking-tight">+1 (646) 634-1052</span>
              </a>
              <a href="mailto:letsdoit@megam.live" className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-500 hover:text-brand-primary dark:hover:text-brand-neon transition-all group/info">
                <Mail size={14} className="text-brand-primary group-hover/info:scale-110 transition-transform" />
                <span className="font-mono tracking-tight">letsdoit@megam.live</span>
              </a>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-gray-500 cursor-default group/info">
                <MapPin size={14} className="text-brand-primary" />
                <span className="font-mono tracking-tight">New York, USA</span>
              </div>
            </div>
          </div>

          {/* Column 2: Product Suites */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-slate-900 dark:text-white tracking-[0.4em] uppercase mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
              Product Suites
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Artwork Today', path: '/suites/artwork-today' },
                { name: 'Material Master', path: '/suites/material-master' },
                { name: 'Project Tracker', path: '/suites/project-tracker' },
                { name: 'Megam Pulse', path: '/suites/megam-pulse' },
                { name: 'Print & Order Management', path: '/suites/print-ops' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-500 dark:text-gray-400 hover:text-brand-primary dark:hover:text-brand-neon transition-all text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-brand-primary transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services & Architecture */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-slate-900 dark:text-white tracking-[0.4em] uppercase mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse"></span>
              Services & Architecture
            </h3>
            <ul className="space-y-4">
              {[
                { name: 'Microsoft 365 Services', path: '/services' },
                { name: 'Integration Architecture', path: '/integrations' },
                { name: 'Copilot & AI Enablement', path: '/services' },
                { name: 'Engineering Service Modules', path: '/services' },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    to={link.path}
                    className="text-slate-500 dark:text-gray-400 hover:text-brand-secondary dark:hover:text-brand-neon transition-all text-sm font-medium flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[1px] bg-brand-secondary transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company & Connect */}
          <div>
            <h3 className="text-[10px] font-mono font-bold text-slate-900 dark:text-white tracking-[0.4em] uppercase mb-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
              Company
            </h3>
            <ul className="space-y-4 mb-8">
              <li>
                <Link to="/contact" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all text-sm font-medium">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-all text-sm font-medium">Privacy Policy</Link>
              </li>
            </ul>

            <h3 className="text-[10px] font-mono font-bold text-slate-900 dark:text-white tracking-[0.4em] uppercase mb-6">Connect</h3>
            <div className="flex space-x-4 mb-8">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-brand-primary hover:bg-brand-primary/10 transition-all group"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-gray-400 hover:text-brand-accent hover:bg-brand-accent/10 transition-all group"
                aria-label="Twitter / X"
              >
                <Twitter size={18} />
              </a>
            </div>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-green-500/20 group cursor-default">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-green-600 dark:text-green-500 group-hover:text-green-400 transition-colors">Service Online</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-100 dark:border-white/5 pt-10 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 dark:text-gray-500 text-[11px] font-mono tracking-tight">
            &copy; {new Date().getFullYear()} Megam Live. Precision-engineered for Microsoft 365.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Activity size={12} className="text-brand-primary animate-pulse" />
              <span>System Load: <span className="text-brand-success font-bold">Nominal</span></span>
            </div>
            <div className="hidden md:block w-[1px] h-3 bg-slate-200 dark:bg-white/10"></div>
            <div className="hidden md:block">
              Platform Uptime: <span className="text-brand-primary dark:text-brand-neon font-bold">99.99%</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
