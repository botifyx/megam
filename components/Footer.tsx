
import React from 'react';
import { APP_NAME, CONTACT_INFO } from '../constants';
import { Linkedin, Twitter, Activity, Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface border-t border-brand-primary/20 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(0,240,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,1)_1px,transparent_1px)] bg-[size:40px_40px] animate-grid-move"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-[100px] animate-pulse-glow"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-neon/5 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M -100 100 L 200 100 L 250 150 L 500 150" 
            fill="none" 
            stroke="url(#footer-grad-1)" 
            strokeWidth="1" 
            strokeDasharray="1000" 
            className="animate-circuit-dash"
          />
          <path 
            d="M 1200 400 L 1000 400 L 950 350 L 700 350" 
            fill="none" 
            stroke="url(#footer-grad-2)" 
            strokeWidth="1" 
            strokeDasharray="1000" 
            className="animate-circuit-dash"
            style={{ animationDirection: 'reverse', animationDuration: '4s' }}
          />
          <defs>
            <linearGradient id="footer-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="footer-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-x-0 h-[1px] bg-brand-neon/10 shadow-[0_0_15px_rgba(0,240,255,0.3)] animate-scan-line pointer-events-none"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-6 group cursor-default">
              <Logo size={32} className="transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(0,240,255,0.6)]" />
              <span className="font-bold text-lg text-white group-hover:text-brand-neon transition-colors duration-300">{APP_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering organizations with high-touch Microsoft 365 solutions and AI-driven automation.
            </p>
            
            <div className="space-y-2">
               <div className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer group/contact">
                  <Phone size={14} className="text-brand-primary group-hover/contact:text-brand-neon" /> <span>{CONTACT_INFO.phone}</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-500 hover:text-white transition-colors cursor-pointer group/contact">
                  <Mail size={14} className="text-brand-accent group-hover/contact:text-brand-neon" /> <span>{CONTACT_INFO.email}</span>
               </div>
               <div className="flex items-center gap-3 text-sm text-gray-500 transition-colors cursor-default group/contact">
                  <MapPin size={14} className="text-brand-secondary group-hover/contact:text-brand-neon" /> <span>{CONTACT_INFO.location}</span>
               </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
               <span className="w-1 h-4 bg-brand-neon rounded-full shadow-[0_0_8px_#00f0ff]"></span>
               Solutions
            </h3>
            <ul className="space-y-3">
              <li><Link to="/suites/intranets" className="text-gray-400 hover:text-brand-neon transition-all text-sm block transform hover:translate-x-1">Custom Intranets</Link></li>
              <li><Link to="/suites/print-ops" className="text-gray-400 hover:text-brand-neon transition-all text-sm block transform hover:translate-x-1">Print Ops Sync</Link></li>
              <li><Link to="/suites/ai-reporting" className="text-gray-400 hover:text-brand-neon transition-all text-sm block transform hover:translate-x-1">AI Reporting</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
               <span className="w-1 h-4 bg-brand-secondary rounded-full shadow-[0_0_8px_#6366f1]"></span>
               Company
            </h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm block transform hover:translate-x-1">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm block transform hover:translate-x-1">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6 flex items-center gap-2">
               <span className="w-1 h-4 bg-brand-primary rounded-full shadow-[0_0_8px_#3b82f6]"></span>
               Connect
            </h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-neon hover:bg-brand-primary/20 transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-neon/10 opacity-0 group-hover:opacity-100 animate-pulse-fast"></div>
                  <Linkedin size={20} className="relative z-10" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand-neon hover:bg-brand-accent/20 transition-all group relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-neon/10 opacity-0 group-hover:opacity-100 animate-pulse-fast"></div>
                  <Twitter size={20} className="relative z-10" />
              </a>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-green-500/30 group cursor-default">
               <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </div>
               <span className="text-[10px] font-mono uppercase tracking-wider text-green-500 group-hover:text-green-400 transition-colors">Service Online</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center relative z-10">
          <p className="text-gray-500 text-xs font-mono">
            &copy; {new Date().getFullYear()} {APP_NAME}. Precision-engineered for M365.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <p className="text-gray-600 text-xs font-mono flex items-center gap-2">
              <Activity size={12} className="text-brand-primary animate-pulse" />
              System Load: Nominal
            </p>
            <div className="w-[1px] h-3 bg-white/10 hidden md:block"></div>
            <p className="text-gray-600 text-xs font-mono hidden md:block">
              Uptime: 99.99%
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
