'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

export const ContactView: React.FC = () => {
  return (
    <div className="py-24 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto z-10 w-full text-slate-800 relative">
      
      {/* Editorial Header */}
      <div className="text-center mb-16 relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
          COMMUNICATION
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-sora mt-4 tracking-tight text-[#0F172A]">
          Connect With CS Vertex
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-3 max-w-xl mx-auto font-medium leading-relaxed font-inter">
          We&apos;re here to help businesses build modern digital systems and scalable online solutions.
        </p>
      </div>

      {/* Direct Contact Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative z-10">
        
        {/* Gmail channel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="w-full h-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]"
        >
          <a 
            href="mailto:csvertex2026@gmail.com"
            className="flex flex-col items-center text-center gap-4 p-8 bg-white/95 text-slate-800 rounded-[22px] backdrop-blur-xl transition-all cursor-pointer group relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-red-400/20 transition-colors" />
            <div className="p-4 bg-white border border-red-100/50 text-red-500 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] font-sora mb-1">Corporate Email</h4>
              <span className="text-[11px] text-[#64748B] font-mono font-medium">csvertex2026@gmail.com</span>
            </div>
          </a>
        </motion.div>

        {/* Phone Channel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full h-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]"
        >
          <a 
            href="tel:7288977131"
            className="flex flex-col items-center text-center gap-4 p-8 bg-white/95 text-slate-800 rounded-[22px] backdrop-blur-xl transition-all cursor-pointer group relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-emerald-400/20 transition-colors" />
            <div className="p-4 bg-white border border-emerald-100/50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] font-sora mb-1">Direct Ping</h4>
              <span className="text-[11px] text-[#64748B] font-mono font-medium">+91 72889 77131</span>
            </div>
          </a>
        </motion.div>

        {/* LinkedIn Channel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full h-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]"
        >
          <a 
            href="https://www.linkedin.com/company/cs-vertex/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center gap-4 p-8 bg-white/95 text-slate-800 rounded-[22px] backdrop-blur-xl transition-all cursor-pointer group relative overflow-hidden h-full"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-blue-400/20 transition-colors" />
            <div className="p-4 bg-white border border-blue-100/50 text-[#2563EB] rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#0F172A] font-sora mb-1">Corporate Network</h4>
              <span className="text-[11px] text-[#64748B] font-mono font-medium">CS Vertex</span>
            </div>
          </a>
        </motion.div>

      </div>
    </div>
  );
};
