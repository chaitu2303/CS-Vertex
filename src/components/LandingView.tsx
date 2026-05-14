'use client';

import React from 'react';
import { Button } from './UiKit';
import { motion } from 'framer-motion';
import { 
  Code2, Smartphone, Cpu, Share2, Globe, Database
} from 'lucide-react';
import { ClientView } from './ClientView';
import { FeedbackView } from './FeedbackView';
import { ContactView } from './ContactView';
import { QuoteView } from './QuoteView';
import { InternshipView } from './InternshipView';
import { FoundersSection } from './FoundersSection';
import { GlowCard } from '@/components/ui/spotlight-card';


export const LandingView: React.FC = () => {

  const services = [
    { title: 'AI Automation Systems', desc: 'Smart automation tools designed to simplify workflows and improve business efficiency.', icon: Cpu, tag: 'AI & Automation', bgStyle: 'bg-gradient-to-br from-blue-50/95 via-white to-indigo-50/90 border-blue-200/80 text-blue-950', iconBg: 'bg-blue-600 text-white shadow-md shadow-blue-500/25 border-transparent', tagBg: 'bg-blue-100 text-blue-700 border-blue-200' },
    { title: 'Web Development', desc: 'Modern responsive websites built for performance, scalability, and professional branding.', icon: Code2, tag: 'Web Development', bgStyle: 'bg-gradient-to-br from-cyan-50/95 via-white to-blue-50/90 border-cyan-200/80 text-cyan-950', iconBg: 'bg-cyan-600 text-white shadow-md shadow-cyan-500/25 border-transparent', tagBg: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
    { title: 'App Development', desc: 'Custom mobile and web applications tailored to business needs and user experience.', icon: Smartphone, tag: 'Mobile Apps', bgStyle: 'bg-gradient-to-br from-purple-50/95 via-white to-pink-50/90 border-purple-200/80 text-purple-950', iconBg: 'bg-purple-600 text-white shadow-md shadow-purple-500/25 border-transparent', tagBg: 'bg-purple-100 text-purple-700 border-purple-200' },
    { title: 'Billing Software', desc: 'Digital invoicing and smart billing systems designed for modern business operations.', icon: Database, tag: 'Business Software', bgStyle: 'bg-gradient-to-br from-emerald-50/95 via-white to-teal-50/90 border-emerald-200/80 text-emerald-950', iconBg: 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 border-transparent', tagBg: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    { title: 'SEO Optimization', desc: 'Search optimization strategies that improve online visibility and business growth.', icon: Globe, tag: 'Search Optimization', bgStyle: 'bg-gradient-to-br from-amber-50/95 via-white to-orange-50/90 border-amber-200/80 text-amber-950', iconBg: 'bg-amber-600 text-white shadow-md shadow-amber-500/25 border-transparent', tagBg: 'bg-amber-100 text-amber-700 border-amber-200' },
    { title: 'Social Media Management', desc: 'Professional social media handling focused on brand consistency and audience engagement.', icon: Share2, tag: 'Brand Management', bgStyle: 'bg-gradient-to-br from-rose-50/95 via-white to-pink-50/90 border-rose-200/80 text-rose-950', iconBg: 'bg-rose-600 text-white shadow-md shadow-rose-500/25 border-transparent', tagBg: 'bg-rose-100 text-rose-700 border-rose-200' }
  ];

  return (
    <div className="relative min-h-screen text-slate-800 overflow-hidden bg-transparent">
      
      {/* Light Sky Blue Glow across the entire webpage */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at center, #93c5fd 0%, transparent 85%)`,
          opacity: 0.25,
          mixBlendMode: "multiply",
        }} 
      />
      
      {/* Immersive Animated Light Backlight Spotlights */}
      <div className="ambient-glow-blue top-[10%] left-[10%] w-[500px] h-[500px]" />
      <div className="ambient-glow-cyan bottom-[20%] right-[10%] w-[600px] h-[600px]" />
      
      {/* Dynamic Floating Orbs for Premium Atmosphere */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3], rotate: [0, 90, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[10%] left-[10%] w-96 h-96 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2], rotate: [0, -90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[50%] right-[5%] w-[30rem] h-[30rem] bg-gradient-to-r from-emerald-400/10 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, -50, 0], opacity: [0.1, 0.4, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] left-[30%] w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-[90px] pointer-events-none"
      />

      {/* --- HERO SECTION (CENTERED MINIMALIST MODERN) --- */}
      <section id="home" className="scroll-mt-28 relative z-10 pt-20 pb-28 md:pt-32 md:pb-36 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto flex items-center justify-center min-h-[75vh]">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-6">
          
          {/* Clean Editorial Sora Header Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-sora tracking-tight leading-[1.05] text-[#0F172A]"
          >
            Building Modern Digital Systems for <span className="text-shine-gradient-light font-black">Growing Businesses</span>
          </motion.h1>

          {/* Subtitle description with balanced max-width */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#64748B] font-medium max-w-2xl leading-relaxed font-inter"
          >
            CS Vertex helps startups, businesses, and organizations build scalable websites, automation systems, AI-powered tools, and modern business platforms.
          </motion.p>

          {/* Interactive Custom Button Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 items-center justify-center pt-4"
          >
            <Button 
              variant="solid" 
              size="sm" 
              onClick={() => {
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold font-sora text-xs px-6 py-3.5 bg-[#2563EB] text-white hover:bg-blue-700 shadow-md shadow-blue-500/10 cursor-pointer"
            >
              Start Your Project
            </Button>
            <Button 
              variant="solid" 
              size="sm" 
              onClick={() => {
                const el = document.getElementById('services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold font-sora text-xs px-6 py-3.5 border border-slate-200 text-slate-800 bg-white hover:bg-slate-50 shadow-sm cursor-pointer"
            >
              Explore Services
            </Button>
          </motion.div>
        </div>
      </section>


      {/* --- SERVICES SECTION (BENTO GRID WITH MIXED CARDS) --- */}
      <section id="services" className="scroll-mt-28 relative z-10 py-24 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto border-t border-slate-200/50">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold">INTEGRATED SOLUTION CORE</span>
          <h2 className="text-3xl sm:text-4xl font-black font-sora text-[#0F172A]">Solutions Designed for Modern Businesses</h2>
          <p className="text-[#64748B] text-xs sm:text-sm max-w-xl mx-auto font-medium">
            We create scalable digital systems that help businesses improve operations, online presence, and customer experience.
          </p>
        </div>

        {/* Uniform premium colored glassmorphism cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const IconComponent = svc.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="h-full"
              >
                <GlowCard customSize glowColor="blue" className="w-full h-full p-[2px] rounded-2xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]">
                  <div className={`p-7 md:p-8 rounded-[14px] h-full flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 border ${svc.bgStyle} shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.15)] group`}>
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`p-3 rounded-xl border transition-colors duration-300 ${svc.iconBg}`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className={`text-[9px] font-mono font-bold tracking-wider uppercase border px-2.5 py-1 rounded-full ${svc.tagBg}`}>
                          {svc.tag}
                        </span>
                      </div>

                      <h3 className="font-sora font-extrabold text-lg mb-2 leading-tight">{svc.title}</h3>
                      <p className="text-xs leading-relaxed mb-6 font-sans font-medium opacity-80">{svc.desc}</p>
                    </div>

                    <div>
                      <Button 
                        variant="solid" 
                        size="sm" 
                        fullWidth 
                        onClick={() => {
                          const el = document.getElementById('contact');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[10px] font-bold tracking-wider uppercase font-sora py-3 rounded-xl mt-4 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white shadow-md shadow-slate-900/10 transition-all duration-300"
                      >
                        Request Consultation 
                      </Button>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Dynamic continuous scroll sections with smooth scroll-triggered transitions */}
      <motion.section 
        id="projects" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="scroll-mt-28 border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <ClientView />
      </motion.section>

      <motion.section 
        id="quote" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="scroll-mt-28 border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <QuoteView />
      </motion.section>

      <motion.section 
        id="contact" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="scroll-mt-28 border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <ContactView />
      </motion.section>

      <motion.section 
        id="feedback" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="scroll-mt-28 border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <FeedbackView />
      </motion.section>

      <motion.div 
        id="about" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="scroll-mt-28 relative z-10 bg-transparent"
      >
        <FoundersSection />
      </motion.div>

      <motion.section 
        id="internship" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="scroll-mt-28 border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <InternshipView />
      </motion.section>

    </div>
  );
};
