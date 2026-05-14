'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Sparkles } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  const founders = [
    {
      name: 'Chaitanya Kumar Sahu',
      role: 'CEO / Managing Director',
      focus: 'AI Systems, Product Architecture, Business Strategy, Enterprise Automation',
      bio: 'Architecting the core machine intelligence systems and defining the long-term product vision of CS Vertex, focused on building scalable AI-driven business ecosystems and enterprise automation infrastructures.',
      image: '/founder_chaitanya.png',
      linkedin: 'http://www.linkedin.com/in/chaitanya-kumar-sahu',
      highlight: false
    },
    {
      name: 'Gopi Vasant Kumar',
      role: 'Chief Technology Officer (CTO)',
      focus: 'Operations Management, Client Relations, Execution Strategy, Workflow Systems',
      bio: 'Leading technology execution pipelines, managing enterprise client operations, and overseeing scalable software delivery systems across multiple digital infrastructure projects.',
      image: '/founder_gopi.png',
      linkedin: 'https://www.linkedin.com/in/vasant-kumar-gopi-020a20319/',
      highlight: false
    },
    {
      name: 'Barru Harish',
      role: 'Creative Director & Systems Engineering Lead',
      focus: 'Development Systems, Infrastructure Engineering, Technical Architecture, Creative Product Design',
      bio: 'Driving UI/UX innovation, cloud infrastructure coordination, and secure technical architecture development while ensuring modern product experiences across all CS Vertex platforms.',
      image: '/founder_harish.png',
      linkedin: 'https://www.linkedin.com/in/b-harish-058ab7283/',
      highlight: false
    },
    {
      name: 'Gunna Sateesh',
      role: 'Head of Operations & Business Development',
      focus: 'Business Development, Startup Partnerships, Growth Strategy, Client Relations, Operations Scaling',
      bio: 'Focused on business expansion strategies, startup partnerships, operational scaling, and building sustainable client acquisition ecosystems for the growth of CS Vertex.',
      image: '/founder_sateesh.png',
      linkedin: 'https://www.linkedin.com/in/sateesh-gunna-33948534a/',
      highlight: false
    }
  ];

  return (
    <section className="relative py-24 px-6 lg:px-12 xl:px-16 bg-transparent border-y border-slate-200/50 overflow-hidden text-slate-800 max-w-[1440px] mx-auto">
      
      {/* Light subtle grid texture */}
      <div className="fine-grid-texture-light opacity-50" />
      
      {/* Soft backlighting */}
      <div className="ambient-glow-blue top-[10%] left-[25%] w-[450px] h-[450px] opacity-40" />

      <div className="max-w-[1440px] mx-auto z-10 relative">
        
        {/* Section title in editorial light style */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-mono tracking-wider uppercase text-[#2563EB] select-none font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
            LEADERSHIP DIRECTORY
          </div>
          
          <h2 className="text-3xl sm:text-5xl font-black font-sora tracking-tight text-[#0F172A] leading-tight">
            The Minds Behind <span className="text-shine-gradient-light font-black">CS Vertex</span>
          </h2>
          
          <p className="text-xs sm:text-sm text-[#64748B] max-w-xl mx-auto leading-relaxed font-medium">
            A focused engineering team building scalable digital ecosystems, automation platforms, and intelligent business software.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {founders.map((founder, idx) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="w-full h-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]"
            >
              <div className="bg-white/95 text-slate-800 rounded-[22px] p-6 h-full relative flex flex-col justify-between overflow-hidden backdrop-blur-xl group hover:-translate-y-1 transition-all duration-300">
                {founder.highlight && (
                  <span className="absolute top-4 right-4 bg-blue-50 border border-blue-100 text-[#2563EB] text-[8px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3 text-[#2563EB]" />
                    VISIONARY NODE
                  </span>
                )}

              {/* Founder headshot frame */}
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-sm group">
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Micro tech focus indicator on photo corner */}
                <div className="absolute bottom-3 left-3 bg-[#0F172A]/90 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[8px] font-mono font-bold text-cyan-glow tracking-wide uppercase select-none">
                  Core: {founder.role.split(' ')[0]}
                </div>
              </div>

              {/* Name & Credentials block */}
              <div className="mt-6 space-y-2">
                <div>
                  <h3 className="font-sora font-extrabold text-base sm:text-lg text-[#0F172A] tracking-tight">
                    {founder.name}
                  </h3>
                  <span className="text-xs font-bold text-[#2563EB] block font-mono mt-0.5 uppercase tracking-wide">
                    {founder.role}
                  </span>
                </div>

                <p className="text-xs text-[#64748B] font-sans leading-relaxed font-medium">
                  {founder.bio}
                </p>

                {/* Focus lines tags */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[9px] font-mono font-bold text-[#2563EB] uppercase tracking-wider block mb-1">Focus Tracks:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {founder.focus.split(', ').map(f => (
                      <span key={f} className="text-[9px] font-bold font-sans bg-slate-50 text-slate-600 px-2 py-0.5 rounded border border-slate-100 tracking-tight">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>

                {/* LinkedIn Anchor action button */}
                <div className="pt-4 mt-2">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 w-full bg-[#F8FAFC] hover:bg-[#2563EB] text-slate-700 hover:text-white text-xs font-bold font-sora rounded-xl transition-all shadow-sm border border-slate-200/60 hover:border-transparent group"
                  >
                    <svg 
                      className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:scale-110 transition-transform" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>Connect on LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-white" />
                  </a>
                </div>

              </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
