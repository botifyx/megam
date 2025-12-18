
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, MapPin, Globe, Clock, Command } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useTheme } from '../context/ThemeContext';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const MegChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [context, setContext] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Capture User Context
  useEffect(() => {
    const fetchContext = async () => {
      const lang = navigator.language || 'en-US';
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = new Date();
      const hour = now.getHours();
      
      let locationStr = "Unknown Location";
      
      // Attempt Geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            // We could reverse geocode here, but for now we'll pass coordinates to the AI
            setContext({
              lang,
              timeZone,
              time: now.toLocaleTimeString(),
              hour,
              coords: { lat: position.coords.latitude, lon: position.coords.longitude },
              greetingType: hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
            });
          },
          () => {
            setContext({
              lang,
              timeZone,
              time: now.toLocaleTimeString(),
              hour,
              greetingType: hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'
            });
          }
        );
      }
    };
    fetchContext();
  }, []);

  // Initial Greeting when context is ready
  useEffect(() => {
    if (context && messages.length === 0) {
      generateGreeting();
    }
  }, [context]);

  const generateGreeting = async () => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `You are "Meg", the soulful AI architect for Megam Live. 
      The user is visiting our high-tech website. 
      Context: 
      - Local Time: ${context.time}
      - Region/Timezone: ${context.timeZone}
      - Browser Language: ${context.lang}
      - Period: ${context.greetingType}
      - Coordinates: ${context.coords ? `${context.coords.lat}, ${context.coords.lon}` : 'Private'}

      Task: Generate a warm, personal, and soulful welcome message. 
      Reference their location (e.g., "Greetings to you in [City/Region]") if you can infer it from timezone/coords, or just speak to the beauty of their current time of day. 
      Use their language (${context.lang}) for the first sentence if it's not English, then switch to English.
      Address them as a "Digital Pioneer" or "Architect of Change". 
      Keep it high-tech yet human and soulful. Be brief but impactful.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { temperature: 0.8, topP: 0.95 }
      });

      const text = response.text || "Hello! I'm Meg. How can I assist your digital journey today?";
      setMessages([{ role: 'model', text, timestamp: new Date() }]);
    } catch (error) {
      console.error("Meg failed to greet:", error);
      setMessages([{ role: 'model', text: "Hello! I'm Meg, your operational architect. How can I help you navigate Megam Live today?", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: input }] }],
        config: {
          systemInstruction: "You are Meg, the soulful AI representative of Megam Live. You help users understand our M365 services, SAP integrations, and high-touch support. You are professional, tech-savvy, and warm. You speak with clarity and occasional poetic flair about the future of work.",
          temperature: 0.7,
        }
      });

      const modelText = response.text || "I'm processing your request. Could you clarify that for me?";
      setMessages(prev => [...prev, { role: 'model', text: modelText, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Protocol disruption detected. Please try again or contact our human architects directly.", timestamp: new Date() }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-8 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[550px] bg-white/80 dark:bg-brand-surface/90 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-blur-in">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-brand-primary/10 to-brand-neon/10 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary dark:text-brand-neon animate-neural-pulse">
                  <Bot size={20} />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-brand-success rounded-full border-2 border-white dark:border-brand-surface"></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Meg</h4>
                <div className="flex items-center gap-2 opacity-60">
                   <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-brand-primary dark:text-brand-neon">Architect Node v4</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400">
              <X size={20} />
            </button>
          </div>

          {/* Context HUD */}
          {context && (
            <div className="px-6 py-2 bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-white/5 flex justify-between">
              <div className="flex items-center gap-3 text-[8px] font-mono text-slate-400 uppercase tracking-tighter">
                <span className="flex items-center gap-1"><MapPin size={8} /> {context.timeZone.split('/')[1] || 'Global'}</span>
                <span className="flex items-center gap-1"><Clock size={8} /> {context.time}</span>
                <span className="flex items-center gap-1"><Globe size={8} /> {context.lang.toUpperCase()}</span>
              </div>
              <div className="text-[8px] font-mono text-brand-success uppercase font-bold tracking-widest animate-pulse">Live</div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                  ? 'bg-brand-primary text-white rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 rounded-tl-none border border-slate-200 dark:border-white/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 dark:bg-black/40 border-t border-slate-100 dark:border-white/5">
            <div className="relative">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Synchronize with Meg..."
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-brand-primary transition-all"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-primary hover:text-brand-neon transition-colors disabled:opacity-30"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 flex justify-center">
               <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1">
                 <Command size={8} /> AI Response Grounded in Enterprise Data
               </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl overflow-hidden group ${
          isOpen 
          ? 'bg-slate-200 dark:bg-white/10 rotate-90' 
          : 'bg-brand-primary hover:scale-110 active:scale-95'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary to-brand-neon opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? (
          <X className="text-slate-600 dark:text-white relative z-10" />
        ) : (
          <>
            <MessageSquare className="text-white relative z-10" />
            <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-3 h-3 bg-brand-neon rounded-full shadow-[0_0_10px_#00f0ff] animate-pulse"></div>
          </>
        )}
      </button>
    </div>
  );
};

export default MegChat;
