'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect, useRef } from 'react';
import { useGlobalStore } from '@/store/globalStore';
import { Menu, X, Sparkles, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const { role, setRole } = useGlobalStore();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const isAutoScrollingRef = useRef(false);

  const getRoleLabel = () => {
    switch (role) {
      case 'admin': return 'Root Console';
      default: return 'Public Web';
    }
  };

  const handleNavClick = (targetRole: typeof role, elementId?: string, sectionKey?: string) => {
    setRole(targetRole);
    setIsOpen(false);
    
    if (sectionKey) {
      setActiveSection(sectionKey);
      isAutoScrollingRef.current = true;
      setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 1500);
    }

    if (elementId === 'home') {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        const homeEl = document.getElementById('home');
        homeEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else if (elementId) {
      setTimeout(() => {
        const el = document.getElementById(elementId);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    } else {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
  };

  // Intelligent IntersectionObserver Synchronization with click-lock debounce
  useEffect(() => {
    if (role === 'admin') {
      setActiveSection('admin');
      return;
    }

    const sectionIds = ['home', 'services', 'projects', 'quote', 'contact', 'feedback', 'about', 'internship'];
    
    const observerCallback: IntersectionObserverCallback = (entries) => {
      if (isAutoScrollingRef.current) return;
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.2, 0.5]
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleWindowScroll = () => {
      if (isAutoScrollingRef.current) return;
      if (window.scrollY < 200) {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, [role]);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 w-full px-4 sm:px-6 max-w-[1440px] mx-auto pointer-events-none transition-all duration-300">
      <div 
        className="min-h-[4rem] rounded-full px-4 md:px-6 py-2 flex items-center justify-between pointer-events-auto transition-all duration-500"
        style={{
          background: 'rgba(255, 255, 255, 0.55)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 10px 40px -10px rgba(37, 99, 235, 0.15)',
        }}
      >
        
        {/* Brand Identity / Home Anchor */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3.5 cursor-pointer select-none group py-1 shrink-0"
          onClick={() => handleNavClick('guest', 'home', 'home')}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden flex items-center justify-center bg-[#0A0F1D] p-0.5 border border-slate-700/80 shadow-lg shadow-blue-500/15">
            <img src="/logo.png" alt="CS Vertex Logo" className="w-full h-full object-contain scale-105" />
          </div>
          <span className="font-sora font-black tracking-tight text-xl sm:text-2xl text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-300">
            CS Vertex
          </span>
        </motion.div>

        {/* Desktop Premium Navigation List */}
        <nav className="hidden xl:flex items-center gap-1 text-xs font-bold">
          
          {/* 1. Home */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'home', 'home')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'home' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'home' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            Home
          </motion.button>
          
          {/* 2. Services */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'services', 'services')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'services' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'services' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            Services
          </motion.button>

          {/* 3. Our Projects */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'projects', 'projects')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'projects' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'projects' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            Our Projects
          </motion.button>

          {/* 4. Get Quote */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'quote', 'quote')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'quote' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'quote' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            Get Quote
          </motion.button>

          {/* 5. Contact */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'contact', 'contact')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'contact' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'contact' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            Contact
          </motion.button>

          {/* 6. Feedback */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'feedback', 'feedback')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'feedback' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'feedback' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            Feedback
          </motion.button>

          {/* 7. About Us */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'about', 'about')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'about' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'about' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            About Us
          </motion.button>

          {/* 8. Apply Internship */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('guest', 'internship', 'internship')}
            className={`relative px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none tracking-wide ${
              activeSection === 'internship' 
                ? 'text-white scale-105 shadow-lg shadow-blue-500/25 border border-cyan-400/30' 
                : 'hover:text-blue-600 hover:bg-white/60 text-slate-600 border border-transparent'
            }`}
          >
            {activeSection === 'internship' && (
              <>
                <motion.div 
                  layoutId="activeNavPill" 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full -z-10 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
                <motion.div 
                  layoutId="activeUnderline"
                  className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              </>
            )}
            Apply Internship
          </motion.button>

          {/* 9. Admin Panel */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('admin', undefined, 'admin')}
            className={`px-4 py-2.5 rounded-full transition-all duration-300 cursor-pointer select-none font-extrabold flex items-center gap-1.5 shadow-sm border border-white/60 ml-1 ${
              role === 'admin' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20' 
                : 'bg-white/80 text-slate-700 hover:bg-white hover:shadow'
            }`}
          >
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Admin Panel</span>
          </motion.button>

        </nav>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center gap-2">
          {role === 'admin' && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-200">
              Admin
            </span>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-full border border-slate-200/60 bg-white/80 text-slate-700 hover:bg-white shadow-sm transition-all cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Animated Glassmorphic Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="xl:hidden mt-3 rounded-3xl p-6 pointer-events-auto border border-white/40 shadow-2xl overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
            }}
          >
            <div className="flex flex-col space-y-2 text-xs font-bold text-slate-700">
              
              <button 
                onClick={() => handleNavClick('guest', 'home', 'home')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'home' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>1. Home</span>
                {activeSection === 'home' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('guest', 'services', 'services')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'services' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>2. Services</span>
                {activeSection === 'services' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('guest', 'projects', 'projects')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'projects' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>3. Our Projects</span>
                {activeSection === 'projects' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('guest', 'quote', 'quote')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'quote' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>4. Get Quote</span>
                {activeSection === 'quote' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('guest', 'contact', 'contact')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'contact' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>5. Contact</span>
                {activeSection === 'contact' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('guest', 'feedback', 'feedback')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'feedback' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>6. Feedback</span>
                {activeSection === 'feedback' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('guest', 'about', 'about')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'about' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>7. About Us</span>
                {activeSection === 'about' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('guest', 'internship', 'internship')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between ${activeSection === 'internship' ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' : 'hover:bg-white/80'}`}
              >
                <span>8. Apply Internship</span>
                {activeSection === 'internship' && <Sparkles className="w-3.5 h-3.5" />}
              </button>

              <button 
                onClick={() => handleNavClick('admin', undefined, 'admin')}
                className={`w-full text-left px-4 py-3.5 rounded-2xl transition-all flex items-center justify-between font-extrabold ${role === 'admin' ? 'bg-slate-900 text-white shadow-lg' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>9. Admin Panel</span>
                </div>
                {role === 'admin' && <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400">Active Console</span>}
              </button>

              <div className="pt-4 mt-2 border-t border-slate-200/50 flex items-center justify-between text-slate-400 font-mono text-[10px]">
                <span>STATE: {getRoleLabel()}</span>
                <span>NODE: OK</span>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
