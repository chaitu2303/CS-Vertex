'use client';

import React, { useState } from 'react';
import { Button, Input, TextArea } from './UiKit';
import { useGlobalStore } from '@/store/globalStore';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const QuoteView: React.FC = () => {
  const { addProject } = useGlobalStore();
  
  const [corpName, setCorpName] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [consultDesc, setConsultDesc] = useState('');
  const [consultSuccess, setConsultSuccess] = useState(false);

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corpName || !corpEmail || !consultDesc) return;
    
    addProject({
      clientName: corpName,
      clientEmail: corpEmail,
      serviceType: serviceType || 'Strategic Consultation',
      title: 'Bespoke Enterprise Integration Audit',
      price: 0 // Do not show pricing anywhere
    });
    
    setConsultSuccess(true);
    setTimeout(() => {
      setCorpName('');
      setCorpEmail('');
      setPhone('');
      setServiceType('');
      setConsultDesc('');
      setConsultSuccess(false);
    }, 4000);
  };

  return (
    <div className="py-24 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto z-10 w-full text-slate-800">
      <div className="text-center mb-16 relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block shadow-sm">
          PROJECT KICKOFF
        </span>
        <h2 className="text-3xl sm:text-5xl font-black font-sora mt-4 tracking-tight text-[#0F172A]">
          Start a Project Discussion
        </h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-3 max-w-xl mx-auto font-medium leading-relaxed font-inter">
          Tell us what you&apos;re planning and our team will contact you directly.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="w-full p-[2px] rounded-3xl bg-gradient-to-r from-blue-500/40 via-indigo-500/40 to-purple-500/40 hover:from-blue-500/80 hover:via-cyan-500/80 hover:to-purple-500/80 transition-all duration-500 shadow-[0_0_25px_rgba(37,99,235,0.15)] hover:shadow-[0_0_35px_rgba(37,99,235,0.35)]">
          <div className="p-8 md:p-10 bg-white/95 text-slate-800 rounded-[22px] relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
            
            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-200/60 relative z-10">
              <div className="p-2.5 bg-gradient-to-tr from-blue-500 to-indigo-500 text-white rounded-xl shadow-md shadow-blue-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-sora font-extrabold text-lg text-[#0F172A]">Project Requirements</h3>
                <p className="text-xs text-[#64748B] mt-0.5 font-sans font-medium leading-normal">Our strategy team will review your specs and schedule a call.</p>
              </div>
            </div>

            <div className="relative z-10">
              {consultSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-10 bg-white/60 backdrop-blur-md border border-emerald-200/60 text-emerald-600 rounded-2xl text-center shadow-sm"
                >
                  <CheckCircle2 className="w-12 h-12 mx-auto animate-bounce text-emerald-500 mb-4" />
                  <h4 className="font-bold text-lg font-sora text-slate-900">Request Successfully Received</h4>
                  <p className="font-medium text-slate-500 text-sm mt-2 max-w-sm mx-auto">Your workflow details have been secured. A notification has been sent via email and our CRM.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. John Doe" 
                        value={corpName}
                        onChange={(e) => setCorpName(e.target.value)}
                        className="w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl px-4 py-3 text-sm outline-none shadow-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Company</label>
                      <input 
                        type="text"
                        placeholder="e.g. Acme Corp" 
                        className="w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl px-4 py-3 text-sm outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Email Address</label>
                      <input 
                        type="email"
                        placeholder="e.g. director@company.com" 
                        value={corpEmail}
                        onChange={(e) => setCorpEmail(e.target.value)}
                        className="w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl px-4 py-3 text-sm outline-none shadow-sm"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Phone Number</label>
                      <input 
                        type="tel"
                        placeholder="+91 00000 00000" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl px-4 py-3 text-sm outline-none shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Service Type</label>
                    <select 
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-800 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl px-4 py-3 text-sm outline-none shadow-sm appearance-none"
                      required
                    >
                      <option value="" disabled>Select the architecture required</option>
                      <option value="AI Automation Systems">AI Automation Systems</option>
                      <option value="Web Platforms">Web Platforms</option>
                      <option value="Mobile Applications">Mobile Applications</option>
                      <option value="Billing & Business Tools">Billing & Business Tools</option>
                      <option value="Custom Software Architecture">Custom Software Architecture</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider pl-1">Project Details</label>
                    <textarea 
                      placeholder="Describe target pages, user scales or custom capabilities needed..." 
                      rows={5}
                      value={consultDesc}
                      onChange={(e) => setConsultDesc(e.target.value)}
                      className="w-full bg-white/60 backdrop-blur-sm border border-slate-200/60 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all rounded-xl px-4 py-3 text-sm outline-none shadow-sm resize-none"
                      required
                    />
                  </div>
                  
                  <button type="submit" className="w-full font-sora font-bold text-sm py-4 rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                    Secure Project Consultation
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
