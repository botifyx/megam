
import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, Mail, MessageSquare, User, Briefcase, 
  ChevronDown, Send, Sparkles, Shield, Info, Activity,
  Layout, Bot, RefreshCw, Layers, Database, Globe, Cpu, Check,
  Users, MapPin
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const interestDropdownRef = useRef<HTMLDivElement>(null);
  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);
  
  const [activeDropdown, setActiveDropdown] = useState<'interest' | 'size' | 'region' | null>(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Artwork Today (Artwork & Labeling)',
    companySize: '',
    region: '',
    message: '',
    hp_website: '' // Honeypot field
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const interestOptions = [
    { label: "Artwork Today (Artwork & Labeling)", icon: Shield },
    { label: "Material Master & SAP Integration", icon: Database },
    { label: "Project Tracker (Enterprise PMO)", icon: Layers },
    { label: "Megam Pulse (Intelligent Intranet)", icon: Layout },
    { label: "Print & Order Management", icon: RefreshCw },
    { label: "Microsoft 365 Architecture & Governance", icon: Cpu },
    { label: "Copilot & AI Enablement", icon: Bot },
    { label: "Integration Architecture (SAP, ERP, APIs)", icon: Globe },
    { label: "Not sure yet / General inquiry", icon: MessageSquare },
  ];

  const companySizeOptions = [
    "1 - 50 employees",
    "51 - 200 employees",
    "201 - 500 employees",
    "501 - 1,000 employees",
    "1,000+ employees"
  ];

  const regionOptions = [
    "North America",
    "Europe",
    "Asia Pacific",
    "Latin America",
    "Middle East & Africa"
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        (interestDropdownRef.current && !interestDropdownRef.current.contains(target)) &&
        (sizeDropdownRef.current && !sizeDropdownRef.current.contains(target)) &&
        (regionDropdownRef.current && !regionDropdownRef.current.contains(target))
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Validation Logic
  const isWorkEmail = (email: string) => {
    const forbidden = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !forbidden.includes(domain);
  };

  const isMessageLongEnough = formData.message.trim().length >= 50;
  const isFormValid = 
    formData.firstName && 
    formData.lastName && 
    isWorkEmail(formData.email) && 
    formData.companySize &&
    formData.region &&
    isMessageLongEnough;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const selectOption = (field: 'interest' | 'companySize' | 'region', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActiveDropdown(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.hp_website) return; 

    if (!isWorkEmail(formData.email)) {
      setError("Please use your company email address. We prioritize enterprise inquiries.");
      return;
    }

    if (!isMessageLongEnough) {
      setError("Please provide more detail (min 50 characters) so our architects can prepare.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const subject = encodeURIComponent(`Discovery Protocol Request: ${formData.interest}`);
      const body = encodeURIComponent(
        `MEGAM LIVE - INCOMING INQUIRY\n` +
        `SENDER: ${formData.firstName} ${formData.lastName} <${formData.email}>\n` +
        `REGION: ${formData.region}\n` +
        `COMPANY SIZE: ${formData.companySize}\n` +
        `PROTOCOL: ${formData.interest}\n` +
        `MESSAGE: ${formData.message}`
      );
      window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="pt-32 pb-32 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500 flex flex-col">
       <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" aria-hidden="true"></div>
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }} aria-hidden="true"></div>
       
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
             
             {/* Left Column: Context & Cards */}
             <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
                <RevealOnScroll animation="animate-tracking-in-expand">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/30 bg-white dark:bg-brand-primary/5 mb-6 shadow-sm">
                      <Sparkles size={14} className="text-brand-primary dark:text-brand-neon animate-pulse" aria-hidden="true" />
                      <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.4em]">Initialize Connection</span>
                   </div>
                   <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.95] mb-8">
                      Let's engineer your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:from-brand-neon dark:to-brand-primary">digital edge.</span>
                   </h1>
                   <p className="text-xl text-slate-600 dark:text-gray-400 font-light max-w-lg mt-6 leading-relaxed">
                      Ready to modernize your Microsoft 365 ecosystem, integrate enterprise systems, or deploy governed AI workflows? Our solution architects are ready to engage.
                   </p>
                </RevealOnScroll>
                
                <div className="space-y-6">
                   <RevealOnScroll animation="animate-fade-in-up" delay={0.2}>
                      <div className="group relative p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-all duration-500 hover:border-brand-primary/30 hover:translate-x-2 shadow-sm">
                        <div className="flex gap-6">
                           <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0 transition-transform group-hover:scale-110">
                              <Calendar size={28} aria-hidden="true" />
                           </div>
                           <div className="space-y-1">
                              <h3 className="text-slate-900 dark:text-white font-bold text-lg">Discovery Protocol</h3>
                              <p className="text-slate-500 dark:text-gray-500 text-sm leading-relaxed font-light">
                                 A structured discovery session with Megam Live architects.
                              </p>
                           </div>
                        </div>
                      </div>
                   </RevealOnScroll>

                   <RevealOnScroll animation="animate-fade-in-up" delay={0.3}>
                      <div className="group relative p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-all duration-500 hover:border-brand-primary/30 hover:translate-x-2 shadow-sm">
                        <div className="flex gap-6">
                           <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0 transition-transform group-hover:scale-110">
                              <Mail size={28} aria-hidden="true" />
                           </div>
                           <div className="space-y-1">
                              <h3 className="text-slate-900 dark:text-white font-bold text-lg">Direct Uplink</h3>
                              <p className="text-brand-primary font-mono text-sm font-bold tracking-wider">{CONTACT_INFO.email}</p>
                           </div>
                        </div>
                      </div>
                   </RevealOnScroll>

                   <RevealOnScroll animation="animate-fade-in-up" delay={0.4}>
                      <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-transparent border border-brand-primary/20 backdrop-blur-xl overflow-hidden shadow-sm">
                        <div className="flex gap-6 mb-4">
                           <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-brand-primary shadow-sm">
                              <Briefcase size={24} aria-hidden="true" />
                           </div>
                           <div className="space-y-1">
                              <h3 className="text-slate-900 dark:text-white font-bold uppercase tracking-wider text-[10px]">Engagement Status</h3>
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse"></div>
                                 <span className="text-[10px] font-mono font-bold text-brand-success uppercase tracking-widest">Q4 Availability Confirmed</span>
                              </div>
                           </div>
                        </div>
                      </div>
                   </RevealOnScroll>
                </div>
             </div>

             {/* Right Column: Refined Form */}
             <div className="lg:col-span-7 relative">
                <div className="absolute -inset-10 bg-brand-primary/5 dark:bg-brand-primary/10 blur-[80px] rounded-full pointer-events-none" aria-hidden="true"></div>
                
                <RevealOnScroll animation="animate-blur-in">
                  <SpotlightCard 
                    className="p-8 md:p-14 border-slate-200 dark:border-white/10 shadow-2xl relative overflow-visible" 
                    spotlightColor={theme === 'dark' ? "rgba(0, 240, 255, 0.08)" : "rgba(59, 130, 246, 0.04)"}
                  >
                    <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-10">
                        <div className="flex flex-col gap-2">
                          <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tighter">Send us a message</h2>
                          <p className="text-slate-400 dark:text-gray-500 text-[11px] font-light tracking-[0.1em] uppercase">Fields marked with <span className="text-brand-primary dark:text-brand-neon font-bold">*</span> are mandatory protocols.</p>
                        </div>

                        {/* Honeypot field - Bot Trap */}
                        <div className="hidden" aria-hidden="true">
                          <label htmlFor="hp_website">Your Website</label>
                          <input id="hp_website" tabIndex={-1} autoComplete="off" name="hp_website" value={formData.hp_website} onChange={handleInputChange} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-3">
                              <label htmlFor="firstName" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                                <User size={12} aria-hidden="true" /> First Name *
                              </label>
                              <input 
                                required 
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                type="text" 
                                placeholder="Jane"
                                className="w-full bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all" 
                              />
                          </div>
                          <div className="space-y-3">
                              <label htmlFor="lastName" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em]">
                                Last Name *
                              </label>
                              <input 
                                required 
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                type="text" 
                                placeholder="Smith"
                                className="w-full bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all" 
                              />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label htmlFor="email" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                              <Mail size={12} aria-hidden="true" /> Work Email *
                          </label>
                          <input 
                            required 
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            type="email" 
                            placeholder="jane.smith@enterprise.com"
                            className={`w-full bg-white dark:bg-black/60 border rounded-xl p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all ${
                              formData.email && !isWorkEmail(formData.email) ? 'border-red-400' : 'border-slate-200 dark:border-white/10 focus:border-brand-primary dark:focus:border-brand-neon'
                            }`} 
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Company Size Dropdown */}
                          <div className="space-y-3" ref={sizeDropdownRef}>
                            <label id="company-size-label" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                                <Users size={12} aria-hidden="true" /> Company Size *
                            </label>
                            <div className="relative">
                                <button
                                  type="button"
                                  aria-labelledby="company-size-label"
                                  aria-expanded={activeDropdown === 'size'}
                                  aria-haspopup="listbox"
                                  onClick={() => setActiveDropdown(activeDropdown === 'size' ? null : 'size')}
                                  className={`w-full flex items-center justify-between bg-white dark:bg-black/60 border rounded-xl p-4 text-base transition-all text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                    activeDropdown === 'size' ? 'border-brand-primary dark:border-brand-neon ring-2 ring-brand-primary/20' : 'border-slate-200 dark:border-white/10'
                                  } ${formData.companySize ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-gray-600'}`}
                                >
                                  <span className="truncate">{formData.companySize || "Select Size"}</span>
                                  <ChevronDown size={18} className={`text-brand-primary shrink-0 transition-transform duration-300 ${activeDropdown === 'size' ? 'rotate-180' : ''}`} aria-hidden="true" />
                                </button>

                                {activeDropdown === 'size' && (
                                  <ul 
                                    role="listbox" 
                                    aria-labelledby="company-size-label"
                                    className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#0B1121] border-2 border-brand-primary dark:border-brand-neon rounded-2xl shadow-2xl z-[999] overflow-hidden backdrop-blur-3xl animate-blur-in"
                                  >
                                    {companySizeOptions.map((opt, i) => (
                                      <li 
                                        key={i}
                                        role="option"
                                        aria-selected={formData.companySize === opt}
                                      >
                                        <button
                                          type="button"
                                          onClick={() => selectOption('companySize', opt)}
                                          className={`w-full px-6 py-3 text-sm text-left transition-all hover:bg-slate-50 dark:hover:bg-white/10 ${
                                            formData.companySize === opt ? 'text-brand-primary dark:text-brand-neon font-bold bg-brand-primary/5' : 'text-slate-700 dark:text-gray-300'
                                          }`}
                                        >
                                          {opt}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </div>
                          </div>

                          {/* Region Dropdown */}
                          <div className="space-y-3" ref={regionDropdownRef}>
                            <label id="region-label" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                                <Globe size={12} aria-hidden="true" /> Region *
                            </label>
                            <div className="relative">
                                <button
                                  type="button"
                                  aria-labelledby="region-label"
                                  aria-expanded={activeDropdown === 'region'}
                                  aria-haspopup="listbox"
                                  onClick={() => setActiveDropdown(activeDropdown === 'region' ? null : 'region')}
                                  className={`w-full flex items-center justify-between bg-white dark:bg-black/60 border rounded-xl p-4 text-base transition-all text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                    activeDropdown === 'region' ? 'border-brand-primary dark:border-brand-neon ring-2 ring-brand-primary/20' : 'border-slate-200 dark:border-white/10'
                                  } ${formData.region ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-gray-600'}`}
                                >
                                  <span className="truncate">{formData.region || "Select Region"}</span>
                                  <ChevronDown size={18} className={`text-brand-primary shrink-0 transition-transform duration-300 ${activeDropdown === 'region' ? 'rotate-180' : ''}`} aria-hidden="true" />
                                </button>

                                {activeDropdown === 'region' && (
                                  <ul 
                                    role="listbox" 
                                    aria-labelledby="region-label"
                                    className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#0B1121] border-2 border-brand-primary dark:border-brand-neon rounded-2xl shadow-2xl z-[999] overflow-hidden backdrop-blur-3xl animate-blur-in"
                                  >
                                    {regionOptions.map((opt, i) => (
                                      <li 
                                        key={i}
                                        role="option"
                                        aria-selected={formData.region === opt}
                                      >
                                        <button
                                          type="button"
                                          onClick={() => selectOption('region', opt)}
                                          className={`w-full px-6 py-3 text-sm text-left transition-all hover:bg-slate-50 dark:hover:bg-white/10 ${
                                            formData.region === opt ? 'text-brand-primary dark:text-brand-neon font-bold bg-brand-primary/5' : 'text-slate-700 dark:text-gray-300'
                                          }`}
                                        >
                                          {opt}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                            </div>
                          </div>
                        </div>

                        {/* CUSTOM DROPDOWN SELECTOR (Interest) */}
                        <div className="space-y-3" ref={interestDropdownRef}>
                          <label id="interest-label" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                              <Activity size={12} aria-hidden="true" /> What are you exploring? *
                          </label>
                          <div className="relative">
                              <button
                                type="button"
                                aria-labelledby="interest-label"
                                aria-expanded={activeDropdown === 'interest'}
                                aria-haspopup="listbox"
                                onClick={() => setActiveDropdown(activeDropdown === 'interest' ? null : 'interest')}
                                className={`w-full flex items-center justify-between bg-white dark:bg-black/60 border rounded-xl p-4 text-base transition-all text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                                  activeDropdown === 'interest' ? 'border-brand-primary dark:border-brand-neon ring-2 ring-brand-primary/20' : 'border-slate-200 dark:border-white/10'
                                } ${formData.interest ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-gray-600'}`}
                              >
                                <span className="flex items-center gap-3">
                                  {(() => {
                                    const selectedIcon = interestOptions.find(o => o.label === formData.interest)?.icon || Shield;
                                    const IconComponent = selectedIcon;
                                    return <IconComponent size={18} className="text-brand-primary dark:text-brand-neon" aria-hidden="true" />;
                                  })()}
                                  <span className="truncate max-w-[200px] sm:max-w-none">{formData.interest}</span>
                                </span>
                                <ChevronDown size={20} className={`text-brand-primary shrink-0 transition-transform duration-300 ${activeDropdown === 'interest' ? 'rotate-180' : ''}`} aria-hidden="true" />
                              </button>

                              {activeDropdown === 'interest' && (
                                <ul 
                                  role="listbox" 
                                  aria-labelledby="interest-label"
                                  className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#0B1121] border-2 border-brand-primary dark:border-brand-neon rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-[999] overflow-hidden backdrop-blur-3xl animate-blur-in"
                                >
                                  <div className="max-h-[350px] overflow-y-auto scrollbar-hide py-2">
                                    {interestOptions.map((option, i) => (
                                      <li 
                                        key={i}
                                        role="option"
                                        aria-selected={formData.interest === option.label}
                                      >
                                        <button
                                          type="button"
                                          onClick={() => selectOption('interest', option.label)}
                                          className={`w-full flex items-center justify-between px-6 py-4 text-sm text-left transition-all hover:bg-slate-50 dark:hover:bg-white/10 ${
                                            formData.interest === option.label 
                                              ? 'text-brand-primary dark:text-brand-neon font-bold bg-brand-primary/5' 
                                              : 'text-slate-700 dark:text-gray-300'
                                          }`}
                                        >
                                          <div className="flex items-center gap-4">
                                            <option.icon size={18} className={formData.interest === option.label ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400 dark:text-gray-600'} aria-hidden="true" />
                                            <span className="tracking-tight">{option.label}</span>
                                          </div>
                                          {formData.interest === option.label && <Check size={18} aria-hidden="true" />}
                                        </button>
                                      </li>
                                    ))}
                                  </div>
                                </ul>
                              )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <label htmlFor="message" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                              <MessageSquare size={12} aria-hidden="true" /> Detailed Message *
                          </label>
                          <textarea 
                            required 
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5} 
                            placeholder="Tell us about your goals, systems involved (SAP, M365), timelines, and constraints."
                            className="w-full bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all resize-none shadow-sm"
                          ></textarea>
                          <div className="flex justify-between items-center px-1">
                             <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${formData.message.length < 50 ? 'text-slate-400' : 'text-brand-success'}`}>
                                Protocol Buffer: {formData.message.length}/50
                             </span>
                          </div>
                        </div>

                        <div aria-live="polite" className="min-h-[20px]">
                          {error && (
                            <div className="p-4 bg-red-400/10 border border-red-400/30 rounded-xl flex items-start gap-3 animate-hero-sub-stagger">
                               <Info size={16} className="text-red-400 shrink-0 mt-1" aria-hidden="true" />
                               <p className="text-xs text-red-400 font-bold uppercase tracking-tight leading-relaxed">{error}</p>
                            </div>
                          )}
                          {isSuccess && (
                            <div className="p-4 bg-brand-success/10 border border-brand-success/30 rounded-xl flex items-start gap-3 animate-hero-sub-stagger">
                               <Check size={16} className="text-brand-success shrink-0 mt-1" aria-hidden="true" />
                               <p className="text-xs text-brand-success font-bold uppercase tracking-tight leading-relaxed">Discovery sequence initialized. Redirecting to mail client.</p>
                            </div>
                          )}
                        </div>

                        <div className="pt-4 space-y-12">
                          <button 
                            type="submit" 
                            disabled={isSubmitting || !isFormValid}
                            className={`w-full group relative overflow-hidden font-bold py-6 rounded-2xl transition-all duration-500 shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 dark:focus:ring-offset-brand-dark ${
                              !isFormValid 
                              ? 'bg-slate-100 dark:bg-white/5 text-slate-300 dark:text-gray-800 cursor-not-allowed border border-slate-200 dark:border-white/5' 
                              : 'bg-brand-primary text-white hover:scale-[1.02] hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)] active:scale-95'
                            }`}
                          >
                             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" aria-hidden="true"></div>
                             <span className="relative z-10 flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-sm">
                                {isSubmitting ? 'Protocol Initializing...' : 'Start Discovery'} 
                                <Send size={20} className={`transition-transform duration-500 ${isSubmitting ? 'animate-ping' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} aria-hidden="true" />
                             </span>
                          </button>

                          <div className="text-center space-y-6 pt-12 border-t border-slate-100 dark:border-white/5 relative">
                             {/* Subtle center icon to break the border line */}
                             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-white dark:bg-brand-surface" aria-hidden="true">
                                <Activity size={16} className="text-brand-primary/30" />
                             </div>
                             
                             <p className="text-[11px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-[0.4em] font-bold">
                                Architectural Response: Within 24 Hours
                             </p>
                             <div className="flex flex-wrap items-center justify-center gap-8 text-[9px] font-mono text-slate-400 dark:text-gray-600 uppercase tracking-[0.2em]">
                                <span className="flex items-center gap-2 group/sig"><Shield size={12} className="text-brand-success transition-transform group-hover/sig:scale-125" aria-hidden="true" /> Secure Submission</span>
                                <div className="hidden sm:block w-1 h-1 bg-slate-200 dark:bg-gray-800 rounded-full" aria-hidden="true"></div>
                                <span className="flex items-center gap-2 group/sig"><Sparkles size={12} className="text-brand-primary transition-transform group-hover/sig:rotate-12" aria-hidden="true" /> Enterprise inquiries prioritized</span>
                             </div>
                          </div>
                        </div>
                    </form>
                  </SpotlightCard>
                </RevealOnScroll>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;
