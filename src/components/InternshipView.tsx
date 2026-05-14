'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Select } from './UiKit';
import { useGlobalStore } from '@/store/globalStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, GraduationCap, CheckCircle2, Award, ShieldCheck, Star } from 'lucide-react';

export const InternshipView: React.FC = () => {
  const { applyInternship } = useGlobalStore();
  
  // Internship States
  const [internName, setInternName] = useState('');
  const [internEmail, setInternEmail] = useState('');
  const [internCollege, setInternCollege] = useState('');
  const [internTrack, setInternTrack] = useState('Frontend Developer (Next.js / Tailwind CSS)');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [internSuccess, setInternSuccess] = useState(false);

  const handleInternSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!internName || !internEmail || !internCollege) return;
    
    applyInternship({
      name: internName,
      email: internEmail,
      college: internCollege,
      domain: internTrack.toLowerCase().includes('backend') ? 'Backend' : internTrack.toLowerCase().includes('ai') ? 'AI & Automation' : 'Frontend',
      resumeName: resumeFile ? resumeFile.name : 'uploaded_cv_candidate.pdf'
    });
    
    setInternSuccess(true);
    setTimeout(() => {
      setInternName('');
      setInternEmail('');
      setInternCollege('');
      setResumeFile(null);
      setInternSuccess(false);
    }, 4000);
  };

  return (
    <div className="py-20 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto z-10 w-full text-slate-800 bg-transparent">
      
      {/* Background spotlights & grids */}
      <div className="fine-grid-texture-light opacity-50" />
      <div className="ambient-glow-blue top-[15%] right-[20%] w-[500px] h-[500px] opacity-40" />

      {/* Editorial Header */}
      <div className="text-center mb-16 relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
          CAREERS & TALENT POOL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-sora mt-4 tracking-tight text-[#0F172A]">
          Future Internship Opportunities
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-3 max-w-xl mx-auto font-medium leading-relaxed font-inter">
          We occasionally collaborate with passionate students and aspiring developers on real-world digital projects.
        </p>
      </div>

      {/* Grid containing forms (left) and direct channels (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="w-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]">
            <div className="p-6 md:p-8 bg-white/95 text-slate-800 rounded-[22px] relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
              <div className="flex flex-col mb-6 pb-4 border-b border-slate-200/60 relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 border border-blue-100 text-[#2563EB] rounded-xl">
                      <GraduationCap className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <h3 className="font-sora font-extrabold text-base text-[#0F172A]">Candidate Talent Pool</h3>
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
                    Currently No Active Openings
                  </span>
                </div>
                <p className="text-xs text-[#64748B] font-sans font-medium leading-normal">
                  While we do not have active openings right now, you can register your resume. We review this pool first when forming new engineering batches.
                </p>
              </div>

              {internSuccess ? (
                <div className="p-8 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-center text-xs space-y-2 shadow-inner">
                  <CheckCircle2 className="w-8 h-8 mx-auto animate-bounce text-emerald-500" />
                  <h4 className="font-bold text-sm">Application Registered Successfully!</h4>
                  <p className="font-medium text-emerald-600/90">Your profile has been saved in our talent pool. Once new positions open, our team will reach out to you.</p>
                </div>
              ) : (
                <form onSubmit={handleInternSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="Full Name" 
                      placeholder="e.g. Venkata Sai Teja" 
                      value={internName}
                      onChange={(e) => setInternName(e.target.value)}
                      className="bg-[#F8FAFC] border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-electric-blue/40"
                      required
                    />
                    <Input 
                      label="Email Address" 
                      type="email"
                      placeholder="e.g. saiteja.v@college.edu" 
                      value={internEmail}
                      onChange={(e) => setInternEmail(e.target.value)}
                      className="bg-[#F8FAFC] border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-electric-blue/40"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="College / University" 
                      placeholder="e.g. JNTU Hyderabad" 
                      value={internCollege}
                      onChange={(e) => setInternCollege(e.target.value)}
                      className="bg-[#F8FAFC] border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-electric-blue/40"
                      required
                    />
                    <Select 
                      label="Engineering Track Role" 
                      value={internTrack}
                      onChange={(e) => setInternTrack(e.target.value)}
                      className="bg-[#F8FAFC] border-slate-200 text-slate-800 focus:bg-white focus:border-electric-blue/40"
                      options={[
                        { value: 'Frontend Developer (Next.js / Tailwind CSS)', label: 'Frontend Developer (Next.js / Tailwind CSS)' },
                        { value: 'Backend Developer (Python / FastAPI / Node.js)', label: 'Backend Developer (Python / FastAPI / Node.js)' },
                        { value: 'Full-Stack Developer (MERN / Next.js / Supabase)', label: 'Full-Stack Developer (MERN / Next.js / Supabase)' },
                        { value: 'AI & Automation Engineering Track', label: 'AI & Automation Engineering Track' },
                        { value: 'UI/UX & Web Designer Track', label: 'UI/UX & Web Designer Track' },
                        { value: 'SEO & Growth Strategy Track', label: 'SEO & Growth Strategy Track' }
                      ]}
                    />
                  </div>
                  <div className="space-y-1.5 text-left pt-1">
                    <label className="block text-xs font-bold text-slate-700 font-sora">Upload Resume / CV (PDF/DOCX)</label>
                    <input 
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setResumeFile(e.target.files[0]);
                        }
                      }}
                      className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#2563EB] hover:file:bg-blue-100 cursor-pointer border border-slate-200/80 rounded-xl bg-[#F8FAFC] p-1.5 focus:outline-none"
                      required
                    />
                  </div>
                  <Button type="submit" variant="neon" size="sm" fullWidth className="font-sora text-xs py-3.5 mt-2 bg-gradient-to-r from-[#2563EB] to-[#2563EB] hover:brightness-105 border-transparent cursor-pointer">
                    Submit Application
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Right Hand: Direct Channels Sidebar */}
        <div className="lg:col-span-5 text-left h-full space-y-6">
          
          {/* Main Channels Card */}
          <div className="w-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]">
            <div className="p-6 md:p-8 bg-white/95 text-slate-800 rounded-[22px] flex flex-col justify-between relative overflow-hidden backdrop-blur-xl">
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none -mr-10 -mb-10" />
              <div className="space-y-6 z-10 relative">
                <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold block border-b border-slate-100 pb-3">
                  CAREERS DESK
                </span>
                <h3 className="font-sora font-extrabold text-lg text-[#0F172A]">Get in Touch</h3>
                <p className="text-xs text-[#64748B] leading-relaxed font-medium">
                  For inquiries about future internship batches or academic collaborations, contact our team:
                </p>

                <div className="space-y-3.5 pt-1">
                  
                  <a 
                    href="mailto:csvertex2026@gmail.com"
                    className="flex items-center gap-4 p-4 bg-[#F8FAFC] hover:bg-slate-50 border border-slate-200/60 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="p-2.5 bg-red-50 border border-red-100 text-red-500 rounded-xl group-hover:scale-103 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] font-sora">Corporate Email</h4>
                      <span className="text-[10px] text-[#64748B] font-mono">csvertex2026@gmail.com</span>
                    </div>
                  </a>

                  <a 
                    href="https://wa.me/917288977131?text=Hello%20CS%20Vertex%20team,%20I'm%20writing%20to%20follow%20up%20on%20my%20internship%20application."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-[#F8FAFC] hover:bg-slate-50 border border-slate-200/60 rounded-xl transition-all cursor-pointer group"
                  >
                    <div className="p-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl group-hover:scale-103 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0F172A] font-sora">WhatsApp Channel</h4>
                      <span className="text-[10px] text-[#64748B] font-mono">+91 72889 77131</span>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>

          {/* Onboarding Workflow Timeline */}
          <div className="w-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]">
            <div className="p-6 md:p-8 bg-white/95 text-slate-800 rounded-[22px] relative overflow-hidden backdrop-blur-xl space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold block border-b border-slate-100 pb-3">
                  PROGRAM PERKS
                </span>
                <h3 className="font-sora font-extrabold text-base text-[#0F172A] mt-3">What We Provide</h3>
                <p className="text-[11px] text-[#64748B] leading-relaxed mt-1 font-medium">
                  Get more than just code reviews — build active real-world systems:
                </p>
              </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">Official Government-compliant MSME course certificate.</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">High-impact live enterprise assignments on Next.js, Supabase, and AI models.</span>
              </div>
              <div className="flex gap-3 items-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-700 font-medium">Direct reference from founders on LinkedIn & technical resume review sessions.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
    </div>
  );
};
