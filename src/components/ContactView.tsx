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
          Reach our operations and strategy team directly through our secure corporate channels.
        </p>
      </div>

      {/* Direct Contact Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto relative z-10">
        
        {/* Gmail channel */}
        <motion.a 
          href="mailto:csvertex2026@gmail.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center gap-4 p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-red-400/20 transition-colors" />
          <div className="p-4 bg-white/80 border border-red-100/50 text-red-500 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A] font-sora mb-1">Corporate Email</h4>
            <span className="text-[11px] text-[#64748B] font-mono font-medium">csvertex2026@gmail.com</span>
          </div>
        </motion.a>

        {/* Phone Channel */}
        <motion.a 
          href="tel:7288977131"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center text-center gap-4 p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-emerald-400/20 transition-colors" />
          <div className="p-4 bg-white/80 border border-emerald-100/50 text-emerald-600 rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A] font-sora mb-1">Direct Ping</h4>
            <span className="text-[11px] text-[#64748B] font-mono font-medium">+91 72889 77131</span>
          </div>
        </motion.a>

        {/* LinkedIn Channel */}
        <motion.a 
          href="https://www.linkedin.com/company/cs-vertex/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col items-center text-center gap-4 p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10 group-hover:bg-blue-400/20 transition-colors" />
          <div className="p-4 bg-white/80 border border-blue-100/50 text-[#2563EB] rounded-2xl group-hover:scale-110 transition-transform shadow-sm">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0F172A] font-sora mb-1">Corporate Network</h4>
            <span className="text-[11px] text-[#64748B] font-mono font-medium">CS Vertex</span>
          </div>
        </motion.a>

      </div>
    </div>
  );
};
