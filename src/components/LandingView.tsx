'use client';

import React from 'react';
import { Button } from './UiKit';
import { motion } from 'framer-motion';
import { 
  Code2, Smartphone, Cpu, LineChart, Share2, Globe, Terminal, Database
} from 'lucide-react';
import { ClientView } from './ClientView';
import { FeedbackView } from './FeedbackView';
import { ContactView } from './ContactView';
import { QuoteView } from './QuoteView';
import { InternshipView } from './InternshipView';
import { FoundersSection } from './FoundersSection';


export const LandingView: React.FC = () => {

  const services = [
    { title: 'AI Automation Systems', desc: 'Intelligent multi-agent context handlers and autonomous workflows designed to optimize critical business operations.', icon: Cpu, tag: 'Machine Intelligence', dark: true },
    { title: 'Web Platforms', desc: 'Sleek, lightning-fast modern web applications and portals crafted for rapid digital scaling.', icon: Code2, tag: 'Next.js Architecture', dark: false },
    { title: 'Mobile Applications', desc: 'Stunning Android, iOS, and cross-platform native applications equipped with fluid motion interfaces.', icon: Smartphone, tag: 'Mobile Core', dark: true },
    { title: 'Billing & Business Tools', desc: 'Custom enterprise software, CRM platforms, and integrated payment orchestration systems.', icon: Database, tag: 'Enterprise Systems', dark: false },
    { title: 'SEO & Growth Systems', desc: 'Engineered search visibility optimization campaigns and analytics dashboards that maximize organic traction.', icon: LineChart, tag: 'Organic Growth', dark: true },
    { title: 'Portfolio Platforms', desc: 'Ultra-sleek personal and startup showcase sites loaded with immersive page transitions and high-end aesthetics.', icon: Globe, tag: 'Digital Identity', dark: false },
    { title: 'Social Media Management', desc: 'Accelerate brand reach, design stunning content pipelines, and drive automated community engagement.', icon: Share2, tag: 'Brand Engine', dark: true },
    { title: 'Custom Software Architecture', desc: 'Bespoke backend systems, secure API gateways, and scalable cloud infrastructure for modern startups.', icon: Terminal, tag: 'Backend Cloud', dark: false }
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
      
      {/* Immersive Animated Light Backlight Spotlights and Fine Grids */}
      <div className="fine-grid-texture-light animate-pulse" style={{ animationDuration: '10s' }} />
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
      <section id="hero" className="relative z-10 pt-20 pb-28 md:pt-32 md:pb-36 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto flex items-center justify-center min-h-[75vh]">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto space-y-6">
          
          {/* Clean Editorial Sora Header Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-sora tracking-tight leading-[1.05] text-[#0F172A]"
          >
            Engineering Intelligent <span className="text-shine-gradient-light font-black">Digital Systems</span>
          </motion.h1>

          {/* Subtitle description with balanced max-width */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-[#64748B] font-medium max-w-2xl leading-relaxed font-inter"
          >
            We build scalable AI platforms, automation workflows, business software, and modern digital infrastructure for startups and enterprises.
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
                const el = document.getElementById('contact-section');
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
                const el = document.getElementById('bento-services');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="font-bold font-sora text-xs px-6 py-3.5 border border-slate-200 text-slate-800 bg-white hover:bg-slate-50 shadow-sm cursor-pointer"
            >
              Explore Solutions
            </Button>
          </motion.div>
        </div>
      </section>


      {/* --- SERVICES SECTION (BENTO GRID WITH MIXED CARDS) --- */}
      <section id="bento-services" className="relative z-10 py-24 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto border-t border-slate-200/50">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold">INTEGRATED SOLUTION CORE</span>
          <h2 className="text-3xl sm:text-4xl font-black font-sora text-[#0F172A]">Solutions Designed for Modern Businesses</h2>
          <p className="text-[#64748B] text-xs sm:text-sm max-w-xl mx-auto font-medium">
            Scalable software systems engineered for automation, growth, and operational efficiency.
          </p>
        </div>

        {/* Alternating mixed layouts: light luxury cards and dark premium cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc, idx) => {
            const IconComponent = svc.icon;
            const isDark = svc.dark;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <div className={`p-7 md:p-8 rounded-2xl h-full flex flex-col justify-between border backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 group ${
                  isDark 
                    ? 'bg-gradient-to-br from-slate-900/90 to-[#0F172A]/90 border-slate-700 text-white shadow-2xl shadow-blue-900/20' 
                    : 'bg-white/60 border-white/80 text-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.12)]'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`p-3 rounded-xl border transition-colors duration-300 ${isDark ? 'bg-slate-800/50 border-slate-600 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 group-hover:border-blue-500/40' : 'bg-white border-slate-200 text-[#2563EB] group-hover:bg-blue-50 group-hover:border-blue-200'}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className={`text-[9px] font-mono font-bold tracking-wider uppercase border px-2.5 py-1 rounded-full ${isDark ? 'text-slate-300 border-slate-600 bg-slate-800/50' : 'text-[#64748B] border-slate-200 bg-white/50'}`}>
                        {svc.tag}
                      </span>
                    </div>

                    <h3 className={`font-sora font-extrabold text-lg mb-2 leading-tight ${isDark ? 'text-white' : 'text-[#0F172A]'}`}>{svc.title}</h3>
                    <p className={`text-xs leading-relaxed mb-6 font-sans font-medium ${isDark ? 'text-slate-400' : 'text-[#64748B]'}`}>{svc.desc}</p>
                  </div>

                  <div>
                    <Button 
                      variant="solid" 
                      size="sm" 
                      fullWidth 
                      onClick={() => {
                        const el = document.getElementById('contact-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[10px] font-semibold tracking-wider uppercase font-sora py-3 rounded-xl mt-4 cursor-pointer"
                    >
                      Request Consultation 
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Dynamic continuous scroll sections with smooth scroll-triggered transitions */}
      <motion.section 
        id="project-hub-section" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <ClientView />
      </motion.section>

      <motion.section 
        id="quote-section" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <QuoteView />
      </motion.section>

      <motion.section 
        id="contact-section" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <ContactView />
      </motion.section>

      <motion.section 
        id="feedback-section" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <FeedbackView />
      </motion.section>

      <motion.div 
        id="about-section" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 bg-transparent"
      >
        <FoundersSection />
      </motion.div>

      <motion.section 
        id="internship-section" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="border-t border-slate-200/60 bg-transparent relative z-10"
      >
        <InternshipView />
      </motion.section>

    </div>
  );
};
