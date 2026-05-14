'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, Button } from './UiKit';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Languages, Volume2, Sparkles, VolumeX, Cpu } from 'lucide-react';

export const FloatingAi: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    { sender: 'ai', text: 'Welcome to CS Vertex Intelligence Node. Ask me about our Next.js platforms, smart billing systems, or developer internship tracks.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [teluguVoice, setTeluguVoice] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Conversational lookup database
  const getAiAnswer = (q: string) => {
    const query = q.toLowerCase();
    
    if (teluguVoice) {
      if (query.includes('ధర') || query.includes('price') || query.includes('cost')) {
        return 'మా స్టాండర్డ్ వెబ్‌సైట్ ధర ₹25,000 నుండి ప్రారంభమవుతుంది. చాట్‌బాట్ మరియు ఆటోమేషన్లతో కూడిన ఎంటర్‌ప్రైజ్ ప్యాకేజీలు ₹40,000 వరకు ఉంటాయి.';
      }
      if (query.includes('ఇంటర్న్') || query.includes('intern') || query.includes('శిక్షణ')) {
        return 'సిఎస్ వర్టెక్స్ ఇంటర్న్‌షిప్ ప్రోగ్రామ్ ద్వారా విద్యార్థులు ఫ్రంటెండ్, బ్యాకెండ్ మరియు ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ రంగాలలో నిజమైన ప్రాజెక్ట్‌లపై శిక్షణ పొందవచ్చు.';
      }
      return 'నమస్కారం! నేను సిఎస్ వర్టెక్స్ ఇంటెలిజెన్స్ అసిస్టెంట్‌ని. మీకు ఏమి కావాలో నన్ను అడగండి.';
    }

    if (query.includes('price') || query.includes('cost') || query.includes('pricing')) {
      return 'CS Vertex platforms start at ₹25,000 for standard Next.js systems. AI multi-agent chatbots start at ₹40,000, and smart digital invoicing systems start at ₹15,000.';
    }
    if (query.includes('intern') || query.includes('internship') || query.includes('student')) {
      return 'We host full-time 3-month engineering internships across Frontend (React/Zustand), Backend (Node.js/FastAPI), and AI. Graduates receive secure completion credentials.';
    }
    if (query.includes('billing') || query.includes('invoice') || query.includes('ledger')) {
      return 'Our Smart Billing Suite features bilingual layouts, real-time inventory threshold warnings, 80mm compact thermal printing register rules, and UPI QR support.';
    }
    if (query.includes('whatsapp') || query.includes('automation')) {
      return 'We integrate notification APIs to auto-send invoice PDFs, milestone updates, or client nudge reminders directly to WhatsApp on event triggers.';
    }
    return 'CS Vertex empowers enterprises with high-speed software ecosystems, bilingual invoicing engines, and student talent pipelines. How can I assist you today?';
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputVal('');

    setTimeout(() => {
      const reply = getAiAnswer(userText);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      
      // Voice synthesis mock trigger
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(reply);
        speech.lang = teluguVoice ? 'te-IN' : 'en-US';
        speech.rate = 1.0;
        
        speech.onstart = () => setIsSpeaking(true);
        speech.onend = () => setIsSpeaking(false);
        speech.onerror = () => setIsSpeaking(false);
        
        window.speechSynthesis.speak(speech);
      }
    }, 800);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 no-print">
      
      {/* Siri-like Pulsing Orb (Apple Intelligence Style) */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 rounded-full cursor-pointer flex items-center justify-center relative z-10 transition-all active:scale-95 shadow-[0_8px_30px_rgba(0,0,0,0.85)]"
          style={{
            background: 'linear-gradient(135deg, #2563EB 0%, #38BDF8 50%, #7C3AED 100%)',
          }}
        >
          {/* Pulsing overlay shadow */}
          <div className="absolute inset-0 rounded-full animate-ping bg-cyan-glow/20 opacity-70 -z-10" />
          <div className="w-11 h-11 bg-[#030303] rounded-full flex items-center justify-center">
            {isOpen ? <X className="w-4 h-4 text-white" /> : <Cpu className="w-4 h-4 text-cyan-glow animate-pulse" />}
          </div>
        </button>
      </div>

      {/* Floating Chat Sidebar panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="absolute bottom-16 left-0 w-[330px] sm:w-[360px] z-20"
          >
            <Card glow="cyan" className="p-0 overflow-hidden bg-[#030303]/95 backdrop-blur-2xl border border-white/5 shadow-[0_15px_50px_rgba(0,0,0,0.95)] flex flex-col h-[480px]">
              
              {/* Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-glow animate-pulse" />
                  <span className="font-sora font-extrabold text-xs text-white">Vertex AI Brain</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Language switch */}
                  <button
                    onClick={() => setTeluguVoice(!teluguVoice)}
                    className={`px-2 py-1 rounded text-[10px] font-bold font-mono tracking-wider border flex items-center gap-1 cursor-pointer transition-colors ${
                      teluguVoice 
                        ? 'bg-[#0b1120] text-cyan-glow border-cyan-glow/30' 
                        : 'bg-neutral-900 text-silver-white/40 border-neutral-800 hover:text-white'
                    }`}
                  >
                    <Languages className="w-3 h-3" />
                    {teluguVoice ? 'Telugu' : 'English'}
                  </button>
                </div>
              </div>

              {/* Chat screen scroll content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
                {messages.map((msg, idx) => {
                  const isAi = msg.sender === 'ai';
                  return (
                    <div key={idx} className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                        isAi 
                          ? 'bg-[#0a0a0d] border border-white/5 text-silver-white/80' 
                          : 'bg-gradient-to-r from-electric-blue to-cyan-glow text-white font-semibold'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
              </div>

              {/* Speech Sound Equalizer wave */}
              {isSpeaking && (
                <div className="px-4 py-2 bg-[#0b1120] border-t border-cyan-glow/10 flex items-center justify-between text-[10px] font-mono text-[#38BDF8]">
                  <div className="flex gap-0.5">
                    <span className="w-0.5 h-3 bg-cyan-glow animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-0.5 h-4.5 bg-[#2563EB] animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <span className="w-0.5 h-2 bg-cyan-glow animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-0.5 h-5 bg-[#2563EB] animate-bounce" style={{ animationDelay: '0.4s' }} />
                    <span className="w-0.5 h-3.5 bg-cyan-glow animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <span>Bilingual speech synthesis vocalizer online...</span>
                </div>
              )}

              {/* Chat Input panel */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white/[0.02] border-t border-white/5 flex gap-2">
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder={teluguVoice ? 'నన్ను ఏదైనా అడగండి...' : 'Query automation costs, internships...'}
                  className="flex-1 bg-neutral-950 text-silver-white placeholder:text-silver-white/20 border border-white/5 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-cyan-glow/40 transition-colors"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-white text-black hover:bg-[#eaeaea] rounded-xl flex items-center justify-center cursor-pointer transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </Card>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
