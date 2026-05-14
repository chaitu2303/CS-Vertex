'use client';

import React from 'react';
import { Badge } from './UiKit';
import { motion } from 'framer-motion';
import { 
  Globe, ArrowUpRight, Sparkles, Building, Heart, MapPin, CheckCircle, Shield, Phone
} from 'lucide-react';

export const ClientView: React.FC = () => {
  // Real past projects from user screenshot files
  const realPastProjects = [
    {
      id: "CSV-P01",
      title: "DeshProperty",
      tagline: "India's Trusted Local Property Platform",
      category: "Web & Mobile Real Estate",
      location: "India / Regional",
      tag: "REAL ESTATE",
      image: "/deshproperty.png",
      desc: "A highly intuitive, broker-free local property platform designed to allow owners to buy, sell, or rent houses, PGs, and commercial spaces. Integrates immediate direct WhatsApp & Call routing channels for verified regional buyers.",
      metrics: [
        "No Broker Commission",
        "Phone Verified Profiles",
        "Direct peer-to-peer connectivity"
      ],
      features: [
        "No Government ID Required to browse",
        "List properties in under 2 minutes",
        "Advanced interactive filters"
      ],
      tech: ["Next.js", "Tailwind CSS", "Supabase", "Node.js", "WhatsApp Business API"],
      color: "from-orange-500/10 to-amber-500/5",
      borderColor: "group-hover:border-orange-200",
      accentColor: "#f97316",
      icon: Building,
      url: null
    },
    {
      id: "CSV-P02",
      title: "FoodChain",
      tagline: "Turn Surplus Into Smiles",
      category: "Logistics & Social Impact Core",
      location: "India National",
      tag: "SOCIAL TECH",
      image: "/foodchain.png",
      desc: "A high-performance surplus food redistribution network connecting food providers (restaurants, events, caterers) directly with verified regional NGOs. Incorporates zero-cost routing, live weight tracking, and automated donation receipts.",
      metrics: [
        "100% Free for Verified NGOs",
        "Verified Food Provider Partners",
        "Automated Real-time Logistics Track"
      ],
      features: [
        "Surplus food dispatch under 10 minutes",
        "Smart maps routing for collection drivers",
        "Continuous regional impact visualization"
      ],
      tech: ["React Native", "FastAPI", "PostgreSQL", "Google Maps Matrix", "Vercel"],
      color: "from-emerald-500/10 to-teal-500/5",
      borderColor: "group-hover:border-emerald-200",
      accentColor: "#10b981",
      icon: Heart,
      url: null
    },
    {
      id: "CSV-P03",
      title: "Chaitanya Kumar Sahu Portfolio",
      tagline: "Elegant Interactive Personal Portfolio & Developer Resume",
      category: "Web Engineering & Brand Identity",
      location: "Web-Scale Node",
      tag: "PORTFOLIO",
      image: "/portfolio.png",
      desc: "A highly aesthetic, premium, and fully responsive interactive personal portfolio. Showcases creative designs, smooth motion components, and customized performance profiles.",
      metrics: [
        "Fluid Custom Motion Nodes",
        "Responsive Grid Adaptations",
        "Optimized Fast Netlify Delivery Core"
      ],
      features: [
        "Modern light/dark contrast highlights",
        "Curated typography and typography weights",
        "Optimized lighthouse performance scores"
      ],
      tech: ["Vite", "React", "Framer Motion", "Tailwind CSS", "Netlify Deployment Core"],
      color: "from-blue-500/10 to-indigo-500/5",
      borderColor: "group-hover:border-blue-200",
      accentColor: "#3b82f6",
      icon: Globe,
      url: "https://chaitanya-kumar-sahu-portifolio.netlify.app/"
    }
  ];

  return (
    <div className="py-16 px-6 lg:px-12 xl:px-16 max-w-[1440px] mx-auto z-10 w-full text-slate-800 bg-transparent">
      
      {/* Background spotlights & grids */}
      <div className="fine-grid-texture-light opacity-40" />
      <div className="ambient-glow-blue top-[10%] left-[10%] w-[500px] h-[500px] opacity-30" />

      {/* Page Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-12 border-b border-slate-200/60 relative z-10">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#2563EB] uppercase font-bold bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full inline-block mb-3 shadow-sm">
            PORTFOLIO DIRECTORY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-sora mt-1 tracking-tight text-[#0F172A]">
            Selected Digital Systems & Client Platforms
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-3 max-w-2xl font-medium leading-relaxed font-inter">
            Explore production-ready software systems, automation engines, and scalable digital solutions delivered by CS Vertex.
          </p>
        </div>
      </div>

      {/* Spacious Grid layout adapts dynamically */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch relative z-10">
        {realPastProjects.map((project, idx) => {
          const Icon = project.icon;
          return (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => project.url && window.open(project.url, '_blank')}
              className={`group bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-2 transition-all duration-500 relative flex flex-col justify-between overflow-hidden ${project.url ? 'cursor-pointer hover:border-white/80' : ''}`}
            >
              {/* Left-edge color bar indicator */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-[4px] transition-opacity" 
                style={{ backgroundColor: project.accentColor }}
              />

              {/* Tagging bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] font-mono font-bold uppercase text-[#2563EB] bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono font-bold flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </span>
              </div>

              {/* Real Project Cover Screenshot Box */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-slate-100 mb-6 bg-slate-50 group-hover:border-blue-100/60 transition-colors shadow-xs flex items-center justify-center">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-contain p-1 transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>

              {/* Main Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div 
                    className="p-3.5 rounded-2xl border flex items-center justify-center text-white shrink-0 shadow-sm"
                    style={{ backgroundColor: `${project.accentColor}10`, color: project.accentColor, borderColor: `${project.accentColor}25` }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-sora font-black text-2xl text-[#0F172A] tracking-tight flex items-center gap-1.5 group-hover:text-blue-600 transition-colors">
                      {project.title}
                      <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
                    </h3>
                    <p className="text-xs font-bold text-slate-400 font-mono mt-0.5 tracking-wider uppercase">{project.tagline}</p>
                  </div>
                </div>

                <p className="text-xs text-[#64748B] leading-relaxed font-medium pt-2">
                  {project.desc}
                </p>

                {/* Core Features bullets */}
                <div className="pt-2 space-y-2">
                  <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 uppercase block">CORE HIGHLIGHTS</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex gap-2 items-start text-[11px] text-[#0F172A] font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Impact Statement metrics */}
                <div className="pt-2 space-y-2">
                  <span className="text-[9px] font-mono tracking-wider font-bold text-slate-400 uppercase block">PROVEN METRICS</span>
                  <div className="space-y-1.5">
                    {project.metrics.map((metric, mIdx) => (
                      <div key={mIdx} className="flex gap-2 items-center text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50/40 border border-emerald-100 p-2 rounded-lg">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies chip tags */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                {project.tech.map((tItem) => (
                  <span 
                    key={tItem}
                    className="bg-slate-50 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded text-[9px] font-mono font-bold"
                  >
                    {tItem}
                  </span>
                ))}
              </div>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
