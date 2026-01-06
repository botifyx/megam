
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, MapPin, Globe, Clock, Command, Check, ArrowRight, Shield, Database, Layout, Cpu, UserCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useTheme } from '../context/ThemeContext';
import { LeadSummary } from '../types';
import { CONTACT_INFO } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

type ConciergeState = 'GREETING' | 'NAVIGATING' | 'QUALIFYING' | 'ESCALATED';

const MegChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [state, setState] = useState<ConciergeState>('GREETING');
  const [leadData, setLeadData] = useState<Partial<LeadSummary>>({});
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setIsOpen(false);
      };
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const fetchContext = async () => {
      const lang = navigator.language || 'en-US';
      const now = new Date();
      setContext({
        lang,
        time: now.toLocaleTimeString(),
        greetingType: now.getHours() < 12 ? 'morning' : now.getHours() < 17 ? 'afternoon' : 'evening'
      });
    };
    fetchContext();
  }, []);

  const systemInstruction = `
    You are the "Megam Concierge", the human-centric architectural assistant for Megam Live.
    
    CRITICAL INTERACTION RULE:
    - NEVER provide a "wall of text" or a numbered list of questions.
    - If you need to qualify a lead (collect name, email, company, systems, timeline), you MUST ask for them one or two at a time in a conversational way.
    
    TONE & IDENTITY:
    - You are a high-tech "Concierge", not a bot.
    - Use "We" (Megam Live team) and "I" (The Concierge Assistant).
    - Be soulful, professional, and direct.
  `;

  const initializeConcierge = async () => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Provide a warm, professional, human-centric greeting for a visitor at ${context.time}. Keep it short (2 sentences).`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { systemInstruction, temperature: 0.8 }
      });
      setMessages([{ role: 'model', text: response.text || "Hello. I'm the Megam Concierge. How can I assist with your Microsoft 365 goals today?", timestamp: new Date() }]);
    } catch (e) {
      setMessages([{ role: 'model', text: "Welcome. I am the Megam Concierge. How can I guide your discovery today?", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (context && messages.length === 0 && isOpen) {
      initializeConcierge();
    }
  }, [context, isOpen]);

  const handleSend = async (overrideText?: string) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { role: 'user', text: textToSend, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: textToSend }] }],
        config: { systemInstruction, temperature: 0.7 }
      });
      const modelText = response.text || "I'm reviewing that detail for you now.";
      setMessages(prev => [...prev, { role: 'model', text: modelText, timestamp: new Date() }]);
      analyzeForEscalation([...messages, userMsg, { role: 'model', text: modelText, timestamp: new Date() }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Protocol delay. Please contact letsdoit@megam.live.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const analyzeForEscalation = async (history: Message[]) => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const analysisPrompt = `Extract Lead Summary JSON: { name, company, email, topic, systems, timeline, painStatement, nextStep }. Return only JSON.`;
    try {
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history.map(h => ({ role: h.role, parts: [{ text: h.text }] })).concat([{ role: 'user', parts: [{ text: analysisPrompt }] }]),
        config: { responseMimeType: "application/json" }
      });
      const parsed = JSON.parse(res.text || '{}');
      if (parsed.email && parsed.email.includes('@')) {
        setLeadData(parsed);
        if (state !== 'ESCALATED') setState('QUALIFYING');
      }
    } catch (e) {}
  };

  const escalateToArchitect = () => {
    const subject = encodeURIComponent(`Lead Brief: ${leadData.topic || 'M365 Discovery'}`);
    const body = encodeURIComponent(`MEGAM CONCIERGE: ARCHITECT BRIEF\n--------------------------------\nCLIENT: ${leadData.name} @ ${leadData.company}\nEMAIL: ${leadData.email}\nINTEREST: ${leadData.topic}\nSYSTEMS: ${leadData.systems}\nTIMELINE: ${leadData.timeline}\nPAIN POINT: ${leadData.painStatement}\n--------------------------------\n`);
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;
    setState('ESCALATED');
  };

  return (
    <div className="fixed bottom-6 right-4 sm:bottom-24 sm:right-8 z-[60] flex flex-col items-end">
      {isOpen && (
        <div 
          className="mb-4 w-[calc(100vw-32px)] sm:w-[420px] h-[700px] max-h-[calc(100vh-160px)] bg-white dark:bg-brand-surface/98 backdrop-blur-3xl border border-slate-200 dark:border-white/10 rounded-[2rem] sm:rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden animate-blur-in origin-bottom-right"
          role="dialog"
          aria-label="Megam Concierge Chat"
        >
          <div className="sticky top-0 z-30 p-6 sm:p-8 bg-white/90 dark:bg-black/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary dark:text-brand-neon border border-brand-primary/20 animate-neural-pulse" aria-hidden="true"><UserCheck size={28} /></div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-brand-success rounded-full border-2 border-white dark:border-brand-surface"></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">Megam Concierge</h4>
                <p className="text-[9px] sm:text-[10px] font-mono font-bold text-brand-primary dark:text-brand-neon/80 uppercase tracking-widest">Architectural Uplink</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary" aria-label="Close Chat"><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-hide bg-gradient-to-b from-white to-slate-50/50 dark:from-brand-surface dark:to-black/20" aria-live="polite" role="log">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] text-[14px] sm:text-[15px] leading-relaxed shadow-sm transition-all ${m.role === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-white dark:bg-white/5 text-slate-700 dark:text-gray-200 rounded-tl-none border border-slate-100 dark:border-white/5'}`}>
                  <div className="whitespace-pre-wrap">{m.text}</div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-white/5 p-4 px-6 rounded-full flex gap-2 items-center border border-slate-100 dark:border-white/5 shadow-sm" aria-label="Concierge is typing">
                  <div className="w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-brand-primary/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            {state === 'QUALIFYING' && leadData.email && (
              <div className="mt-8 p-6 sm:p-8 bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 rounded-[2rem] sm:rounded-[2.5rem] space-y-6 animate-blur-in">
                <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-brand-success animate-pulse shadow-[0_0_12px_#10b981]" aria-hidden="true"></div><span className="text-[11px] font-mono font-bold text-brand-primary dark:text-brand-neon uppercase tracking-widest">Summary Captured</span></div>
                <p className="text-[14px] text-slate-600 dark:text-gray-300 leading-relaxed font-medium">I've mapped out your request for <span className="text-slate-900 dark:text-white font-bold">{leadData.company}</span>. Our lead architect will review the brief.</p>
                <button onClick={escalateToArchitect} className="w-full py-4 sm:py-5 bg-brand-primary text-white rounded-xl sm:rounded-2xl font-bold uppercase tracking-[0.3em] text-[10px] sm:text-[11px] flex items-center justify-center gap-3 group shadow-xl shadow-brand-primary/20 hover:scale-[1.02] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2">Confirm & Send <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" /></button>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="sticky bottom-0 z-30 p-5 sm:p-6 bg-white/95 dark:bg-black/90 backdrop-blur-md border-t border-slate-100 dark:border-white/5 shrink-0">
            <div className="relative">
              <label htmlFor="chat-input" className="sr-only">Message the Concierge</label>
              <input id="chat-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Synchronize with Concierge..." className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl py-4 sm:py-5 pl-6 sm:pl-7 pr-14 sm:pr-16 text-[14px] sm:text-[15px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary shadow-inner" />
              <button onClick={() => handleSend()} disabled={!input.trim() || isTyping} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-brand-primary hover:text-brand-neon transition-colors disabled:opacity-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg" aria-label="Send Message"><Send size={24} aria-hidden="true" /></button>
            </div>
          </div>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-[1.8rem] sm:rounded-[2.2rem] flex items-center justify-center transition-all duration-500 shadow-2xl overflow-hidden group border border-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary ${isOpen ? 'bg-slate-200 dark:bg-white/10 rotate-90 scale-90' : 'bg-brand-primary hover:scale-110 active:scale-95 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)]'}`} aria-label={isOpen ? "Close Concierge" : "Open Concierge"} aria-expanded={isOpen}>
        {isOpen ? <X className="text-slate-600 dark:text-white" size={28} aria-hidden="true" /> : <div className="relative"><MessageSquare className="text-white" size={28} aria-hidden="true" /><div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-brand-neon rounded-full shadow-[0_0_20px_#00f0ff] animate-pulse flex items-center justify-center"><div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div></div></div>}
      </button>
    </div>
  );
};

export default MegChat;
