'use client';

import React, { useState } from 'react';
import { useGlobalStore } from '@/store/globalStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Globe, Shield, User, FileText, GraduationCap, MessageSquare } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useGlobalStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const rolesList = [
    { id: 'guest', name: 'Public Web', icon: Globe, color: 'text-silver-white/40' },
    { id: 'client', name: 'Past Projects', icon: User, color: 'text-amber-400' },
    { id: 'intern', name: 'Intern Desk', icon: GraduationCap, color: 'text-emerald-400' },
    { id: 'feedback', name: 'Feedbacks Hub', icon: FileText, color: 'text-sky-400' },
    { id: 'admin', name: 'Root Console', icon: Shield, color: 'text-neon-red' },
    { id: 'contact', name: 'Contact Node', icon: MessageSquare, color: 'text-blue-400' },
  ] as const;

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      <div 
        className="relative flex items-center justify-end"
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              className="absolute right-14 flex items-center gap-1.5 bg-[#030303]/90 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.9)] whitespace-nowrap"
            >
              {rolesList.map((r) => {
                const isActive = role === r.id;
                const Icon = r.icon;
                
                return (
                  <button
                    key={r.id}
                    onClick={() => setRole(r.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold font-sora tracking-wide transition-all cursor-pointer select-none border ${
                      isActive 
                        ? 'bg-white border-transparent text-black' 
                        : 'bg-transparent border-transparent text-silver-white/50 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : r.color}`} />
                    <span>{r.name}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Anchor floating toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-11 h-11 bg-[#030303] border border-white/5 rounded-full flex items-center justify-center text-white cursor-pointer select-none shadow-[0_8px_30px_rgba(0,0,0,0.85)] hover:border-white/25 active:scale-95 transition-all"
        >
          <Layers className="w-4 h-4 text-silver-white/80 animate-spin" style={{ animationDuration: '25s' }} />
        </button>
      </div>
    </div>
  );
};
