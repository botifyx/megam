
import React, { useState } from 'react';
import { Calendar, Mail, MessageSquare, User, Briefcase, ChevronDown, Send, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';
import { useTheme } from '../context/ThemeContext';

const Contact: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Artwork.Today',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const subject = encodeURIComponent(`New Inquiry: ${formData.interest} from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(
      `MEGAM LIVE - INCOMING INQUIRY\n` +
      `==============================\n\n` +
      `SENDER DETAILS:\n` +
      `----------------\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Email: ${formData.email}\n` +
      `Interest: ${formData.interest}\n\n` +
      `MESSAGE:\n` +
      `----------------\n` +
      `${formData.message}\n\n` +
      `---\n` +
      `Transmitted via Megam.live Portal`
    );

    const mailtoUrl = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    
    setTimeout(() => {
      window.location.href = mailtoUrl;
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="pt-32 pb-24 bg-slate-50 dark:bg-brand-dark min-h-screen relative overflow-hidden transition-colors duration-500">
       {/* High-Tech Background Elements */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
       <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-secondary/5 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
       <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
             
             {/* Text Content & Quick Contact */}
             <div className="space-y-12">
                <RevealOnScroll animation="animate-tracking-in-expand">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-primary/30 bg-white dark:bg-brand-primary/5 mb-6 shadow-sm dark:shadow-none">
                      <Sparkles size={14} className="text-brand-primary dark:text-brand-neon animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-brand-primary uppercase tracking-[0.3em]">Initialize Connection</span>
                   </div>
                   <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white tracking-tighter leading-tight">
                      Let's engineer your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-blue-600 dark:from-brand-neon dark:to-brand-primary">digital edge.</span>
                   </h1>
                   <p className="text-xl text-slate-600 dark:text-blue-200/60 font-light max-w-lg mt-6">
                      Ready to bridge the gap between your systems of record and modern operations? Our architects are online.
                   </p>
                </RevealOnScroll>
                
                <div className="space-y-6 animate-hero-sub-stagger" style={{ animationDelay: '0.4s' }}>
                   {[
                      { 
                        icon: Calendar, 
                        title: "Discovery Protocol", 
                        desc: "Direct access to our solution architects.", 
                        color: "brand-primary", 
                        shadow: "rgba(59, 130, 246, 0.4)" 
                      },
                      { 
                        icon: Mail, 
                        title: "Direct Uplink", 
                        desc: CONTACT_INFO.email, 
                        color: theme === 'dark' ? "brand-accent" : "brand-secondary", 
                        shadow: "rgba(6, 182, 212, 0.4)" 
                      }
                   ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group p-5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-brand-primary/30 dark:hover:border-white/10 transition-all duration-500 hover:translate-x-2 shadow-sm dark:shadow-none">
                         <div className={`w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center text-${item.color} shrink-0 group-hover:scale-110 transition-all duration-500`}>
                            <item.icon size={28} />
                         </div>
                         <div>
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-0.5">{item.title}</h3>
                            <p className="text-slate-500 dark:text-gray-500 font-light">{item.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>

                <div className="p-1 bg-gradient-to-br from-brand-primary/20 to-transparent rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                   <div className="bg-white/80 dark:bg-brand-dark/80 rounded-xl p-8 border border-slate-200 dark:border-white/5 relative overflow-hidden backdrop-blur-xl shadow-lg dark:shadow-none transition-colors">
                      <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-slate-300 dark:text-gray-700 opacity-60">
                         SYNC_NODE: ACTIVE<br/>CAL_BRIDGE: V2
                      </div>
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-10 h-10 rounded-full bg-brand-primary/5 dark:bg-brand-neon/10 border border-brand-primary/20 dark:border-brand-neon/30 flex items-center justify-center text-brand-primary dark:text-brand-neon">
                            <Briefcase size={20} />
                         </div>
                         <h4 className="text-slate-900 dark:text-white font-bold tracking-widest uppercase text-xs">Partner Network</h4>
                      </div>
                      <p className="text-slate-500 dark:text-gray-400 text-sm font-light leading-relaxed mb-6">
                         Available for both fixed-scope deliveries and dedicated monthly engineering retainers.
                      </p>
                      <div className="flex items-center gap-2">
                         <div className="w-1.5 h-1.5 rounded-full bg-brand-success animate-pulse"></div>
                         <span className="text-[10px] font-mono text-brand-success uppercase tracking-widest">Q4 Availability Confirmed</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Modern Lead Form */}
             <div className="relative animate-blur-in" style={{ animationDelay: '0.3s' }}>
                <div className="absolute -inset-4 bg-brand-primary/5 dark:bg-brand-primary/10 blur-[60px] rounded-full pointer-events-none"></div>
                
                <SpotlightCard className="p-10 md:p-12 relative overflow-hidden border-slate-200 dark:border-white/10 shadow-2xl dark:shadow-none" spotlightColor={theme === 'dark' ? "rgba(0, 240, 255, 0.1)" : "rgba(59, 130, 246, 0.05)"}>
                   <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Send us a message</h3>
                        <p className="text-slate-400 dark:text-gray-500 text-sm font-light">Fields marked with <span className="text-brand-primary dark:text-brand-neon">*</span> are mandatory protocols.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3 group/field">
                            <label className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/field:text-brand-primary dark:group-focus-within/field:text-brand-neon transition-colors">
                               <User size={12} /> First Name <span className="text-brand-primary dark:text-brand-neon">*</span>
                            </label>
                            <input 
                              required 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="John"
                              className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 dark:focus:ring-brand-neon/30 focus:outline-none transition-all duration-500 hover:border-slate-300 dark:hover:border-white/20" 
                            />
                         </div>
                         <div className="space-y-3 group/field">
                            <label className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/field:text-brand-primary dark:group-focus-within/field:text-brand-neon transition-colors">
                               Last Name <span className="text-brand-primary dark:text-brand-neon">*</span>
                            </label>
                            <input 
                              required 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              type="text" 
                              placeholder="Doe"
                              className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 dark:focus:ring-brand-neon/30 focus:outline-none transition-all duration-500 hover:border-slate-300 dark:hover:border-white/20" 
                            />
                         </div>
                      </div>

                      <div className="space-y-3 group/field">
                         <label className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/field:text-brand-primary dark:group-focus-within/field:text-brand-neon transition-colors">
                            <Mail size={12} /> Work Email <span className="text-brand-primary dark:text-brand-neon">*</span>
                         </label>
                         <input 
                           required 
                           name="email"
                           value={formData.email}
                           onChange={handleInputChange}
                           type="email" 
                           placeholder="john.doe@enterprise.com"
                           className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 dark:focus:ring-brand-neon/30 focus:outline-none transition-all duration-500 hover:border-slate-300 dark:hover:border-white/20" 
                         />
                      </div>

                      <div className="space-y-3 group/field">
                         <label className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/field:text-brand-primary dark:group-focus-within/field:text-brand-neon transition-colors">
                            <MessageSquare size={12} /> Primary Interest
                         </label>
                         <div className="relative">
                            <select 
                              name="interest"
                              value={formData.interest}
                              onChange={handleInputChange}
                              className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 dark:focus:ring-brand-neon/30 focus:outline-none transition-all duration-500 hover:border-slate-300 dark:hover:border-white/20 appearance-none cursor-pointer"
                            >
                               <option className="bg-white dark:bg-brand-surface" value="Artwork.Today">Artwork.Today</option>
                               <option className="bg-white dark:bg-brand-surface" value="Project Management Solutions">Project Management Solutions</option>
                               <option className="bg-white dark:bg-brand-surface" value="SAP Sync Integration">SAP Sync Integration</option>
                               <option className="bg-white dark:bg-brand-surface" value="General Inquiry">General Inquiry</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-primary group-focus-within/field:text-brand-primary dark:group-focus-within/field:text-brand-neon transition-colors">
                               <ChevronDown size={18} />
                            </div>
                         </div>
                      </div>

                      <div className="space-y-3 group/field">
                         <label className="text-[10px] text-brand-primary font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within/field:text-brand-primary dark:group-focus-within/field:text-brand-neon transition-colors">
                            Detailed Message <span className="text-brand-primary dark:text-brand-neon">*</span>
                         </label>
                         <textarea 
                           required 
                           name="message"
                           value={formData.message}
                           onChange={handleInputChange}
                           rows={4} 
                           placeholder="Tell us about your operational challenges..."
                           className="w-full bg-slate-50 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl p-4 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-gray-700 focus:border-brand-primary dark:focus:border-brand-neon focus:ring-1 focus:ring-brand-primary/20 dark:focus:ring-brand-neon/30 focus:outline-none transition-all duration-500 hover:border-slate-300 dark:hover:border-white/20 resize-none"
                         ></textarea>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full group relative overflow-hidden bg-brand-primary text-white font-bold py-5 rounded-xl transition-all duration-500 shadow-xl ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]'}`}
                      >
                         <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                         <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-sm">
                            {isSubmitting ? 'Processing...' : 'Deploy Message'} 
                            <Send size={18} className={`transition-transform duration-500 ${isSubmitting ? 'animate-ping' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                         </span>
                      </button>

                      {/* Micro HUD status */}
                      <div className="flex justify-between items-center pt-4 opacity-40">
                         <div className="flex items-center gap-2 text-[8px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                            <div className="w-1 h-1 bg-brand-success rounded-full"></div> Encryption: Active
                         </div>
                         <div className="text-[8px] font-mono text-slate-400 dark:text-gray-500 uppercase tracking-widest">
                            Buffer: Clear
                         </div>
                      </div>
                   </form>

                   {/* Scanning Line Animation overlay */}
                   <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-1000">
                      <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-primary dark:bg-brand-neon shadow-[0_0_20px_#00f0ff] animate-scan-line"></div>
                   </div>
                </SpotlightCard>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Contact;
