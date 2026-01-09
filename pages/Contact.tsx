
import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar, Mail, MessageSquare, User, Briefcase,
  ChevronDown, Send, Sparkles, Shield, Info, Activity,
  Layout, Bot, RefreshCw, Layers, Database, Globe, Cpu, Check,
  Users
} from 'lucide-react';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const interestDropdownRef = useRef<HTMLDivElement>(null);
  const sizeDropdownRef = useRef<HTMLDivElement>(null);
  const regionDropdownRef = useRef<HTMLDivElement>(null);

  const [activeDropdown, setActiveDropdown] = useState<'interest' | 'size' | 'region' | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Artwork Today (Artwork & Labeling)',
    companySize: '',
    region: '',
    message: '',
    fax_number: '' // Honeypot field - invisible to humans, seen by bots
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

  const handleKeyDown = (e: React.KeyboardEvent, type: 'interest' | 'size' | 'region', options: any[]) => {
    if (activeDropdown !== type) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveDropdown(type);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0) {
          const selectedValue = typeof options[focusedIndex] === 'string' ? options[focusedIndex] : options[focusedIndex].label;
          selectOption(type === 'interest' ? 'interest' : type === 'size' ? 'companySize' : 'region', selectedValue);
        }
        break;
      case 'Escape':
      case 'Tab':
        setActiveDropdown(null);
        setFocusedIndex(-1);
        break;
    }
  };

  const isWorkEmail = (email: string) => {
    const forbidden = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'live.com', 'aol.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !forbidden.includes(domain);
  };

  const isFormValid =
    formData.firstName.trim().length > 0 &&
    formData.lastName.trim().length > 0 &&
    isWorkEmail(formData.email) &&
    formData.companySize !== '' &&
    formData.region !== '' &&
    formData.message.trim().length >= 10;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const selectOption = (field: 'interest' | 'companySize' | 'region', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setActiveDropdown(null);
    setFocusedIndex(-1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Silent spam protection: if honeypot is filled, simulate success but do nothing
    if (formData.fax_number) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 5000);
      }, 800);
      return;
    }

    if (!isWorkEmail(formData.email)) {
      setError("Please use your company email address. We prioritize enterprise inquiries.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      const subject = `Discovery Protocol: ${formData.interest} - ${formData.firstName} ${formData.lastName}`;

      const body = `
        MEGAM LIVE // ARCHITECTURAL DISCOVERY BRIEF
        ==================================================
        TIMESTAMP: ${new Date().toLocaleString()}
        SECURITY STATUS: ENCRYPTED // END-TO-END
        ==================================================
        
        [1.0] PARTICIPANT PROFILE
        --------------------------------------------------
        NAME: ${formData.firstName.toUpperCase()} ${formData.lastName.toUpperCase()}
        ORGANIZATION SIZE: ${formData.companySize}
        PRIMARY REGION: ${formData.region}
        RETURN CHANNEL: ${formData.email}
        
        [2.0] ENGAGEMENT FOCUS
        --------------------------------------------------
        TARGET SYSTEM: ${formData.interest}
        
        [3.0] OPERATIONAL CONTEXT & REQUIREMENTS
        --------------------------------------------------
        ${formData.message}
        
        ==================================================
        [4.0] END OF BRIEF // DATA SEALED
        ==================================================
        INITIALIZING ARCHITECT REVIEW SEQUENCE
        --------------------------------------------------
              `.trim();

      const mailtoUrl = `mailto:letsdoit@megam.live?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;

      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 800);
  };

  return (
    <div className="pt-32 pb-32 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500 flex flex-col">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" aria-hidden="true"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
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
                      <p className="text-slate-500 dark:text-gray-500 text-sm leading-relaxed font-light">A structured discovery session with Megam Live architects.</p>
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
                      <p className="text-brand-primary font-mono text-sm font-bold tracking-wider">letsdoit@megam.live</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
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

                  {/* Honeypot Field - Hidden for users, visible to bots */}
                  <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1] pointer-events-none overflow-hidden" aria-hidden="true">
                    <label htmlFor="fax_number">Fax Number</label>
                    <input
                      id="fax_number"
                      name="fax_number"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.fax_number}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label htmlFor="firstName" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                        <User size={12} aria-hidden="true" /> First Name *
                      </label>
                      <input required id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" placeholder="Jane" className="w-full bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base text-slate-900 dark:text-white focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all" aria-invalid={false} />
                    </div>
                    <div className="space-y-3">
                      <label htmlFor="lastName" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em]">Last Name *</label>
                      <input required id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" placeholder="Smith" className="w-full bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base text-slate-900 dark:text-white focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all" aria-invalid={false} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                      <Mail size={12} aria-hidden="true" /> Work Email *
                    </label>
                    <input required id="email" name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="jane.smith@enterprise.com" className={`w-full bg-white dark:bg-black/60 border rounded-xl p-4 text-base text-slate-900 dark:text-white focus:ring-1 focus:ring-brand-primary/20 outline-none transition-all ${formData.email && !isWorkEmail(formData.email) ? 'border-red-400' : 'border-slate-200 dark:border-white/10 focus:border-brand-primary dark:focus:border-brand-neon'}`} aria-invalid={!!(formData.email && !isWorkEmail(formData.email))} aria-describedby={error ? "form-error-message" : undefined} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3" ref={sizeDropdownRef}>
                      <label id="company-size-label" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                        <Users size={12} aria-hidden="true" /> Company Size *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          id="company-size-trigger"
                          aria-labelledby="company-size-label"
                          aria-expanded={activeDropdown === 'size'}
                          aria-haspopup="listbox"
                          aria-controls="company-size-list"
                          aria-activedescendant={focusedIndex >= 0 && activeDropdown === 'size' ? `size-opt-${focusedIndex}` : undefined}
                          onClick={() => setActiveDropdown(activeDropdown === 'size' ? null : 'size')}
                          onKeyDown={(e) => handleKeyDown(e, 'size', companySizeOptions)}
                          className={`w-full flex items-center justify-between bg-white/80 dark:bg-black/40 backdrop-blur-xl border rounded-xl p-4 text-base transition-all text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${activeDropdown === 'size' ? 'border-brand-primary dark:border-brand-neon ring-2 ring-brand-primary/20' : 'border-slate-200 dark:border-white/10'} ${formData.companySize ? 'text-slate-900 dark:text-white font-black' : 'text-slate-400 dark:text-gray-600'}`}
                        >
                          <span className="truncate">{formData.companySize || "Select Size"}</span>
                          <ChevronDown size={18} className={`text-brand-primary shrink-0 transition-transform duration-300 ${activeDropdown === 'size' ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>
                        {activeDropdown === 'size' && (
                          <ul
                            id="company-size-list"
                            role="listbox"
                            aria-labelledby="company-size-label"
                            className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-[#0B1121]/95 backdrop-blur-3xl border-2 border-brand-primary dark:border-brand-neon rounded-2xl shadow-2xl z-[999] overflow-hidden animate-blur-in py-2"
                          >
                            {companySizeOptions.map((opt, i) => (
                              <li
                                key={i}
                                id={`size-opt-${i}`}
                                role="option"
                                aria-selected={formData.companySize === opt}
                              >
                                <button
                                  type="button"
                                  tabIndex={-1}
                                  onClick={() => selectOption('companySize', opt)}
                                  className={`w-full px-6 py-4 text-sm text-left transition-all hover:bg-brand-primary/10 dark:hover:bg-brand-neon/10 ${formData.companySize === opt || focusedIndex === i ? 'text-brand-primary dark:text-brand-neon font-black bg-brand-primary/5' : 'text-slate-700 dark:text-gray-300 font-bold'}`}
                                >
                                  {opt}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3" ref={regionDropdownRef}>
                      <label id="region-label" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                        <Globe size={12} aria-hidden="true" /> Region *
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          id="region-trigger"
                          aria-labelledby="region-label"
                          aria-expanded={activeDropdown === 'region'}
                          aria-haspopup="listbox"
                          aria-controls="region-list"
                          aria-activedescendant={focusedIndex >= 0 && activeDropdown === 'region' ? `region-opt-${focusedIndex}` : undefined}
                          onClick={() => setActiveDropdown(activeDropdown === 'region' ? null : 'region')}
                          onKeyDown={(e) => handleKeyDown(e, 'region', regionOptions)}
                          className={`w-full flex items-center justify-between bg-white/80 dark:bg-black/40 backdrop-blur-xl border rounded-xl p-4 text-base transition-all text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${activeDropdown === 'region' ? 'border-brand-primary dark:border-brand-neon ring-2 ring-brand-primary/20' : 'border-slate-200 dark:border-white/10'} ${formData.region ? 'text-slate-900 dark:text-white font-black' : 'text-slate-400 dark:text-gray-600'}`}
                        >
                          <span className="truncate">{formData.region || "Select Region"}</span>
                          <ChevronDown size={18} className={`text-brand-primary shrink-0 transition-transform duration-300 ${activeDropdown === 'region' ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </button>
                        {activeDropdown === 'region' && (
                          <ul
                            id="region-list"
                            role="listbox"
                            aria-labelledby="region-label"
                            className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-[#0B1121]/95 backdrop-blur-3xl border-2 border-brand-primary dark:border-brand-neon rounded-2xl shadow-2xl z-[999] overflow-hidden animate-blur-in py-2"
                          >
                            {regionOptions.map((opt, i) => (
                              <li
                                key={i}
                                id={`region-opt-${i}`}
                                role="option"
                                aria-selected={formData.region === opt}
                              >
                                <button
                                  type="button"
                                  tabIndex={-1}
                                  onClick={() => selectOption('region', opt)}
                                  className={`w-full px-6 py-4 text-sm text-left transition-all hover:bg-brand-primary/10 dark:hover:bg-brand-neon/10 ${formData.region === opt || focusedIndex === i ? 'text-brand-primary dark:text-brand-neon font-black bg-brand-primary/5' : 'text-slate-700 dark:text-gray-300 font-bold'}`}
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

                  <div className="space-y-3" ref={interestDropdownRef}>
                    <label id="interest-label" className="text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-[0.25em] flex items-center gap-2">
                      <Activity size={12} aria-hidden="true" /> What are you exploring? *
                    </label>
                    <div className="relative">
                      <button
                        type="button"
                        id="interest-trigger"
                        aria-labelledby="interest-label"
                        aria-expanded={activeDropdown === 'interest'}
                        aria-haspopup="listbox"
                        aria-controls="interest-list"
                        aria-activedescendant={focusedIndex >= 0 && activeDropdown === 'interest' ? `interest-opt-${focusedIndex}` : undefined}
                        onClick={() => setActiveDropdown(activeDropdown === 'interest' ? null : 'interest')}
                        onKeyDown={(e) => handleKeyDown(e, 'interest', interestOptions)}
                        className={`w-full flex items-center justify-between bg-white/80 dark:bg-black/40 backdrop-blur-xl border rounded-xl p-4 text-base transition-all text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary ${activeDropdown === 'interest' ? 'border-brand-primary dark:border-brand-neon ring-2 ring-brand-primary/20' : 'border-slate-200 dark:border-white/10'} ${formData.interest ? 'text-slate-900 dark:text-white font-black' : 'text-slate-400 dark:text-gray-600'}`}
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
                          id="interest-list"
                          role="listbox"
                          aria-labelledby="interest-label"
                          className="absolute top-full left-0 right-0 mt-3 bg-white/95 dark:bg-[#0B1121]/95 backdrop-blur-3xl border-2 border-brand-primary dark:border-brand-neon rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-[999] overflow-hidden animate-blur-in py-2"
                        >
                          <div className="max-h-[350px] overflow-y-auto scrollbar-hide py-2">
                            {interestOptions.map((option, i) => (
                              <li
                                key={i}
                                id={`interest-opt-${i}`}
                                role="option"
                                aria-selected={formData.interest === option.label}
                              >
                                <button
                                  type="button"
                                  tabIndex={-1}
                                  onClick={() => selectOption('interest', option.label)}
                                  className={`w-full flex items-center justify-between px-6 py-4 text-sm text-left transition-all hover:bg-brand-primary/10 dark:hover:bg-brand-neon/10 ${formData.interest === option.label || focusedIndex === i ? 'text-brand-primary dark:text-brand-neon font-black bg-brand-primary/5' : 'text-slate-700 dark:text-gray-300 font-bold'}`}>
                                  <div className="flex items-center gap-4">
                                    <option.icon size={18} className={formData.interest === option.label || focusedIndex === i ? 'text-brand-primary dark:text-brand-neon' : 'text-slate-400 dark:text-gray-600'} aria-hidden="true" />
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
                      maxLength={250}
                      rows={5}
                      placeholder="Tell us about your goals, systems involved (SAP, M365), timelines, and constraints."
                      className="w-full bg-white dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-base text-slate-900 dark:text-white outline-none transition-all resize-none shadow-sm focus:border-brand-primary dark:focus:border-brand-neon"
                    />
                    <div className="flex justify-between items-center px-1" aria-live="polite">
                      <span className={`text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${formData.message.length < 10 ? 'text-slate-400' : 'text-brand-success'}`}>
                        Protocol Buffer: {formData.message.length}/250
                      </span>
                    </div>
                  </div>

                  <div aria-live="polite" className="min-h-[20px]">
                    {error && <div id="form-error-message" className="p-4 bg-red-400/10 border border-red-400/30 rounded-xl flex items-start gap-3 animate-hero-sub-stagger" role="alert"><Info size={16} className="text-red-400 shrink-0 mt-1" aria-hidden="true" /><p className="text-xs text-red-400 font-bold uppercase tracking-tight leading-relaxed">{error}</p></div>}
                    {isSuccess && <div className="p-4 bg-brand-success/10 border border-brand-success/30 rounded-xl flex items-start gap-3 animate-hero-sub-stagger"><Check size={16} className="text-brand-success shrink-0 mt-1" aria-hidden="true" /><p className="text-xs text-brand-success font-bold uppercase tracking-tight leading-relaxed">Discovery sequence initialized. Opening local mail agent...</p></div>}
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting || !isFormValid}
                      className={`
                              w-full group relative overflow-hidden py-10 rounded-2xl transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary focus-visible:ring-offset-2
                              ${!isFormValid
                          ? 'bg-white/10 border-slate-200 dark:border-white/5 text-slate-500 dark:text-gray-600 cursor-not-allowed'
                          : 'bg-white/80 dark:bg-white/[0.08] backdrop-blur-3xl border-slate-300 dark:border-white/20 hover:border-brand-primary/40 active:scale-[0.98] shadow-2xl'
                        }
                            `}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" aria-hidden="true"></div>
                      <div className="relative z-10 flex items-center justify-center gap-12 px-8">
                        <span className={`
                                  text-[12px] md:text-[15px] font-mono font-bold uppercase tracking-[0.3em] transition-all duration-700 
                                  ${!isFormValid ? 'text-slate-500 dark:text-gray-500 opacity-60' : 'text-slate-800 dark:text-white group-hover:tracking-[0.4em]'}
                                `}>
                          {isSubmitting ? 'Syncing...' : 'Start Discovery'}
                        </span>
                        <div className={`
                                  transition-all duration-1000 transform
                                  ${!isFormValid ? 'opacity-30 scale-90' : 'opacity-100 group-hover:translate-x-4 group-hover:-translate-y-2 group-hover:scale-110'}
                                `}>
                          <Send
                            size={28}
                            strokeWidth={1.5}
                            className={!isFormValid ? 'text-slate-400' : 'text-brand-primary dark:text-brand-neon'}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      {isFormValid && (
                        <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" aria-hidden="true"></div>
                      )}
                    </button>

                    <div className="text-center space-y-6 pt-12 border-t border-slate-100 dark:border-white/5 relative mt-12">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-slate-50 dark:bg-brand-surface" aria-hidden="true"><Activity size={16} className="text-brand-primary/30" /></div>
                      <p className="text-[11px] font-mono text-slate-500 dark:text-gray-400 uppercase tracking-[0.4em] font-bold">Architectural Response: Within 24 Hours</p>
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
