'use client';

import React, { useState } from 'react';
import { Card, Button, Input, TextArea } from './UiKit';
import { useGlobalStore } from '@/store/globalStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Star, CheckCircle2 } from 'lucide-react';

export const FeedbackView: React.FC = () => {
  const { feedbacks, addFeedback } = useGlobalStore();

  // Feedback Form States
  const [custName, setCustName] = useState('');
  const [custRating, setCustRating] = useState<number>(5);
  const [custText, setCustText] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custText) return;
    
    addFeedback({
      customerName: custName,
      rating: custRating,
      feedbackText: custText
    });
    
    setFeedbackSuccess(true);
    setTimeout(() => {
      setCustName('');
      setCustRating(5);
      setCustText('');
      setFeedbackSuccess(false);
    }, 3000);
  };

  return (
    <div className="py-16 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto z-10 w-full text-slate-800 bg-transparent">
      
      {/* Background spotlights & grids */}
      <div className="fine-grid-texture-light opacity-40" />
      <div className="ambient-glow-blue top-[10%] left-[10%] w-[500px] h-[500px] opacity-30" />

      {/* Editorial Header */}
      <div className="pb-8 mb-12 border-b border-slate-200/60 relative z-10">
        <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-sm">
          CUSTOMER TESTIMONIALS & REVIEWS
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-sora mt-1 tracking-tight text-[#0F172A]">
          What Clients Say About Working With Us
        </h1>
        <p className="text-xs sm:text-sm text-[#64748B] mt-3 max-w-2xl font-medium leading-relaxed font-inter">
          Trusted by startups, businesses, and emerging founders building modern digital operations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* LEFT COLUMN: Testimonials Review Grid (7 columns) */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbacks.map((fb) => (
              <div 
                key={fb.id} 
                className="p-6 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl flex flex-col justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-500"
              >
                <div className="space-y-4">
                  <div className="flex gap-1 text-amber-400">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    {Array.from({ length: 5 - fb.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-slate-200" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-medium italic">
                    "{fb.feedbackText}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-6 flex justify-between items-center">
                  <h4 className="text-xs font-bold text-[#0F172A] font-sora">{fb.customerName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono font-bold">{fb.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Submit Feedback Card (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 md:p-8 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="p-2.5 bg-blue-50 border border-blue-100 text-[#2563EB] rounded-xl">
                <MessageSquare className="w-5 h-5 text-[#2563EB]" />
              </div>
              <div>
                <h3 className="font-sora font-extrabold text-base text-[#0F172A]">Share Your Feedback</h3>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-normal font-sans font-medium">Add your reviews directly into our active testimonials registry.</p>
              </div>
            </div>

            {feedbackSuccess ? (
              <div className="p-8 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-center text-xs space-y-2 shadow-inner">
                <CheckCircle2 className="w-8 h-8 mx-auto animate-bounce text-emerald-500" />
                <h4 className="font-bold text-sm">Feedback Registered Successfully!</h4>
                <p className="font-medium text-emerald-600/90">Your testimonial message has been compiled and added to the review matrix board.</p>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <Input 
                  label="Name / Organization" 
                  placeholder="e.g. Sai Kumar" 
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="bg-[#F8FAFC] border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-electric-blue/40"
                  required
                />
                
                <div className="flex flex-col w-full">
                  <label className="block text-[10px] font-semibold text-slate-400 mb-1.5 tracking-wider uppercase font-sora">
                    Satisfaction Level
                  </label>
                  <div className="flex gap-2.5 items-center pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setCustRating(star)}
                        className="text-2xl hover:scale-115 transition-transform cursor-pointer"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            star <= custRating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <TextArea 
                  label="Review Comments" 
                  placeholder="Tell us what you liked most about our fast development speed, automation, or clean designs..." 
                  rows={4}
                  value={custText}
                  onChange={(e) => setCustText(e.target.value)}
                  className="bg-[#F8FAFC] border-slate-200 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-electric-blue/40"
                  required
                />

                <Button 
                  type="submit" 
                  variant="neon" 
                  size="sm" 
                  fullWidth 
                  className="font-sora text-xs py-3.5 mt-2 bg-gradient-to-r from-[#2563EB] to-[#2563EB] hover:brightness-105 border-transparent text-white"
                >
                  Transmit Feedback Review
                </Button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
