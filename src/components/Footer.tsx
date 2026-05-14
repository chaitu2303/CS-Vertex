'use client';

import React from 'react';
import { useGlobalStore } from '@/store/globalStore';

export const Footer: React.FC = () => {
  const { setRole } = useGlobalStore();

  return (
    <footer className="bg-white border-t border-slate-200/60 pt-16 pb-8 px-6 lg:px-12 xl:px-16 relative z-10 w-full overflow-hidden">
      
      {/* Subtle bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-24 bg-blue-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-6 lg:gap-12 relative z-10">
        
        {/* Brand Column */}
        <div className="md:col-span-4 lg:col-span-4 space-y-5">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl border bg-[#050505] border-slate-200/40">
              <img src="/logo.png" alt="CS Vertex Logo" className="h-8 w-auto object-contain" />
            </div>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium max-w-xs font-inter">
            Engineering intelligent digital systems, AI platforms, and automated business operations for modern enterprises.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="mailto:csvertex2026@gmail.com" className="text-slate-400 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/cs-vertex/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          
          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 font-sora">Ecosystem</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-500">
              <li>
                <button onClick={() => { setRole('guest'); setTimeout(() => document.getElementById('bento-services')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blue-600 transition-colors cursor-pointer">Services</button>
              </li>
              <li>
                <button onClick={() => { setRole('guest'); setTimeout(() => document.getElementById('project-hub-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blue-600 transition-colors cursor-pointer">Our Projects</button>
              </li>
              <li>
                <button onClick={() => { setRole('guest'); setTimeout(() => document.getElementById('feedback-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blue-600 transition-colors cursor-pointer">Testimonials</button>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 font-sora">Company</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-500">
              <li>
                <button onClick={() => { setRole('guest'); setTimeout(() => document.getElementById('about-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blue-600 transition-colors cursor-pointer">About Us</button>
              </li>
              <li>
                <button onClick={() => { setRole('guest'); setTimeout(() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blue-600 transition-colors cursor-pointer">Contact</button>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 font-sora">Careers</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-500">
              <li>
                <button onClick={() => { setRole('guest'); setTimeout(() => document.getElementById('internship-section')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="hover:text-blue-600 transition-colors cursor-pointer">Apply Internship</button>
              </li>
            </ul>
          </div>

          <div className="space-y-4 text-left">
            <h4 className="font-bold text-xs uppercase tracking-widest text-slate-900 font-sora">System</h4>
            <ul className="space-y-3 text-xs font-medium text-slate-500">
              <li>
                <button onClick={() => setRole('admin')} className="hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Admin Panel
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="max-w-[1440px] mx-auto mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-medium text-slate-400 font-mono">
        <p>© {new Date().getFullYear()} CS Vertex. All rights reserved.</p>
        <div className="flex gap-6">
          <span className="hover:text-slate-600 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-slate-600 cursor-pointer transition-colors">Terms of Service</span>
        </div>
      </div>
      
    </footer>
  );
};
