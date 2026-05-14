'use client';

import React, { useState } from 'react';
import { useGlobalStore } from '@/store/globalStore';
import { Card, Button, Badge } from './UiKit';
import { motion } from 'framer-motion';
import { 
  Terminal, Layers, BookOpen, CheckCircle2, FileCheck, Award, 
  Send, ExternalLink, Calendar, HelpCircle, Code, ShieldCheck, Printer
} from 'lucide-react';

export const InternView: React.FC = () => {
  const { interns, submitTask } = useGlobalStore();
  
  // Simulated active intern toggle
  const [activeInternId, setActiveInternId] = useState<string>('INT-552'); 
  const activeIntern = interns.find(i => i.id === activeInternId) || interns[0];

  // Submission Form State
  const [submitTaskOpen, setSubmitTaskOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [deliverableNotes, setDeliverableNotes] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const selectedTask = activeIntern?.tasks.find(t => t.id === selectedTaskId);

  const handleTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeIntern || !selectedTaskId || !deliverableUrl || !deliverableNotes) return;

    submitTask(activeIntern.id, selectedTaskId, deliverableUrl, deliverableNotes);
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setSubmitTaskOpen(false);
      setDeliverableUrl('');
      setDeliverableNotes('');
    }, 2000);
  };

  const domainCurriculum = {
    'Frontend': [
      { week: 'Weeks 1-2', topic: 'Modern CSS & Tailwind v4 Custom design system styling tokens' },
      { week: 'Weeks 3-4', topic: 'React 19 Server Components & Hooks lifecycle orchestration' },
      { week: 'Weeks 5-8', topic: 'Zustand global stores & Framer Motion physics springs integration' },
      { week: 'Weeks 9-12', topic: 'Production Next.js deployment, API route handlers, and optimization' }
    ],
    'Backend': [
      { week: 'Weeks 1-2', topic: 'Node.js Express / Python FastAPI architectural design routing' },
      { week: 'Weeks 3-4', topic: 'PostgreSQL relational schemas & Supabase client handlers' },
      { week: 'Weeks 5-8', topic: 'Docker container nodes, CORS policies, & auth pipelines' },
      { week: 'Weeks 9-12', topic: 'Vercel deployments, production health checks, & Redis caching' }
    ],
    'AI & Automation': [
      { week: 'Weeks 1-2', topic: 'System Prompt Engineering & Large Language Model orchestration API limits' },
      { week: 'Weeks 3-4', topic: 'Structured JSON parsing regex tokenizers & metadata mapping' },
      { week: 'Weeks 5-8', topic: 'Vector DB embedding lookups, semantic searching nodes' },
      { week: 'Weeks 9-12', topic: 'Bilingual translation voices, speech synthesis workflows' }
    ]
  };

  const activeCurriculum = domainCurriculum[activeIntern?.domain || 'Frontend'];

  const handlePrintCertificate = () => {
    if (typeof window === 'undefined') return;
    window.print();
  };

  return (
    <div className="relative min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Grids and Spotlights overlay */}
      <div className="fine-grid-texture animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="ambient-glow-red top-[15%] right-[20%] w-[500px] h-[500px]" />
      <div className="ambient-glow-blue bottom-[10%] left-[10%] w-[500px] h-[500px]" />

      {/* Header and Switches */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-5 border-b border-white/5 gap-4 z-10 relative">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-neon-red uppercase font-bold">STUDENTS CAREERS ECOSYSTEM</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-sora text-white mt-1">Student Career Terminal</h2>
        </div>

        {/* Demo Switcher */}
        <div className="flex items-center gap-3 bg-neutral-900 border border-white/5 p-2 rounded-xl">
          <span className="text-[9px] font-bold uppercase tracking-wider text-silver-white/40 font-mono">Select Intern:</span>
          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveInternId('INT-552')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer font-sora ${
                activeInternId === 'INT-552' ? 'bg-white text-black font-bold shadow-md' : 'text-silver-white/40 hover:text-white'
              }`}
            >
              Sai Teja (Active)
            </button>
            <button
              onClick={() => setActiveInternId('INT-331')}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-wide transition-all cursor-pointer font-sora ${
                activeInternId === 'INT-331' ? 'bg-white text-black font-bold shadow-md' : 'text-silver-white/40 hover:text-white'
              }`}
            >
              Pranitha (Completed)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 z-10 relative">
        
        {/* LEFT COLUMN: Profile Details & Curriculums */}
        <div className="lg:col-span-4 space-y-6">
          
          <Card className="p-6 bg-[#08080a]/60 border border-white/5">
            <span className="text-[9px] font-mono tracking-widest text-neon-red uppercase font-bold">SECURE INTERN CARD</span>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white text-base font-extrabold font-sora select-none">
                {activeIntern?.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-sora font-extrabold text-base text-white leading-none">{activeIntern?.name}</h3>
                <span className="text-[10px] text-silver-white/40 block mt-1.5">{activeIntern?.college}</span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-white/5 space-y-3.5 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-silver-white/40">Domain Speciality:</span>
                <span className="text-white font-semibold">{activeIntern?.domain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver-white/40">Onboard Status:</span>
                <Badge 
                  status={activeIntern?.status || 'Pending'} 
                  variant={activeIntern?.status === 'Completed' ? 'green' : activeIntern?.status === 'Active' ? 'blue' : 'yellow'} 
                />
              </div>
              <div className="flex justify-between">
                <span className="text-silver-white/40">Registered Email:</span>
                <span className="text-white/70 font-mono text-[10px] select-all">{activeIntern?.email}</span>
              </div>
            </div>
          </Card>

          {/* Curriculum Lesson Syllabus */}
          <Card className="p-6 bg-[#08080a]/60 border border-white/5">
            <h3 className="font-sora font-extrabold text-base text-white mb-5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-neon-red" />
              Syllabus Curriculum
            </h3>

            <div className="space-y-4">
              {activeCurriculum.map((curr, idx) => (
                <div key={idx} className="flex gap-3 text-xs leading-relaxed border-b border-white/[0.02] pb-3 last:border-b-0">
                  <span className="font-mono text-[9px] text-neon-red font-bold uppercase tracking-widest shrink-0 w-16 pt-0.5 border-r border-white/5">{curr.week}</span>
                  <p className="text-silver-white/60 font-sans font-medium">{curr.topic}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: Tasks Checklist / Certificate Output */}
        <div className="lg:col-span-8">
          
          {activeIntern?.status === 'Completed' ? (
            <div className="space-y-6">
              
              {/* Gold completed Certificate */}
              <Card className="p-1 relative bg-gradient-to-br from-amber-500/20 via-neutral-900/40 to-amber-950/20 border border-amber-500/30 shadow-[0_15px_50px_rgba(245,158,11,0.05)] rounded-2xl overflow-hidden select-text text-black">
                <div className="p-8 md:p-12 bg-[#060608] border-2 border-double border-amber-500/10 rounded-xl text-center relative flex flex-col justify-between min-h-[480px]">
                  
                  {/* Decorative golden elements */}
                  <div className="absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-amber-500/10" />
                  <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-amber-500/10" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-amber-500/10" />
                  <div className="absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-amber-500/10" />

                  <div className="flex flex-col items-center">
                    <img 
                      src="/logo.png" 
                      alt="CS Vertex Certification Badge" 
                      className="w-12 h-12 object-contain rounded-lg mb-4 opacity-90" 
                    />
                    <span className="text-amber-500/60 font-mono font-bold tracking-widest text-[9px] block uppercase">OFFICIAL CERTIFICATION DIRECTORIES</span>
                    <h3 className="text-2xl md:text-3xl font-extrabold font-sora text-white mt-3 tracking-wider">Certificate of Completion</h3>
                    <p className="text-[11px] text-silver-white/30 italic mt-2">This is proudly awarded to technical graduate</p>
                  </div>

                  <div className="my-8">
                    <span className="text-2xl md:text-3.5xl font-extrabold font-sora text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 select-none border-b border-amber-500/10 px-8 pb-3 inline-block">
                      {activeIntern.name}
                    </span>
                    <p className="text-xs text-silver-white/40 max-w-md mx-auto mt-5 leading-relaxed font-sans">
                      for having successfully completed the full-time 3-month <strong className="text-white">{activeIntern.domain} Engineering track</strong>, passing task submissions audits, and deploying production code modules cleanly.
                    </p>
                  </div>

                  {/* Seals & QR signatures */}
                  <div className="grid grid-cols-3 gap-4 items-end mt-4 pt-6 border-t border-white/5">
                    
                    <div className="text-center">
                      <div className="font-serif italic text-amber-200 text-xs tracking-wider">C. S. Prasad</div>
                      <div className="h-[1px] bg-white/5 w-20 mx-auto my-1.5" />
                      <div className="text-[7px] text-silver-white/30 uppercase tracking-widest font-mono font-bold">MD & Founder, CS Vertex</div>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-12 h-12 bg-amber-500/5 border border-dashed border-amber-500/20 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.05)] select-none">
                        <ShieldCheck className="w-5 h-5 text-amber-500/60 animate-pulse" />
                        <span className="absolute text-[5px] tracking-widest font-extrabold text-amber-500/60 uppercase rotate-12">VERIFIED</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-white rounded p-1 flex items-center justify-center relative">
                        <div className="w-8 h-8 bg-black" style={{
                          clipPath: 'polygon(0 0, 45% 0, 45% 45%, 0 45%, 0 0, 55% 0, 100% 0, 100% 45%, 55% 45%, 55% 0, 0 55%, 45% 55%, 45% 100%, 0 100%, 0 55%, 55% 55%, 100% 55%, 100% 100%, 55% 100%, 55% 55%)'
                        }} />
                      </div>
                      <span className="text-[7px] font-mono text-silver-white/30 mt-1.5 block uppercase select-all font-bold tracking-tight">{activeIntern.certificateCode}</span>
                    </div>

                  </div>

                </div>
              </Card>

              {/* print layout control */}
              <div className="p-4 bg-neutral-900 border border-white/5 rounded-xl flex items-center justify-between no-print">
                <div className="flex items-center gap-2.5 text-xs text-silver-white/40 leading-normal font-sans">
                  <Award className="w-5 h-5 text-amber-400 animate-pulse" />
                  <span>Secure certificate code is indexed in directories. Ready to download as PDF.</span>
                </div>
                <Button variant="solid" size="sm" onClick={handlePrintCertificate} className="gap-1.5 text-xs font-sora !bg-amber-500 !text-black hover:!bg-white">
                  <Printer className="w-4 h-4" />
                  Export Certificate Print
                </Button>
              </div>

            </div>
          ) : (
            
            /* Active tasks lists */
            <Card className="p-6 md:p-8 bg-[#08080a]/60 border border-white/5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase font-bold">ACTIVE ASSIGNMENTS BOARD</span>
                  <h3 className="font-sora font-extrabold text-lg text-white mt-1">Syllabus Assignments Checker</h3>
                </div>
              </div>

              {activeIntern?.tasks.length === 0 ? (
                <p className="text-xs text-silver-white/30 text-center py-8 italic">No tasks currently assigned to onboarding checklist.</p>
              ) : (
                <div className="space-y-4">
                  {activeIntern.tasks.map((task) => (
                    <div key={task.id} className="p-4 bg-neutral-905 border border-white/5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors hover:bg-neutral-900">
                      
                      <div className="space-y-2 max-w-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono font-bold bg-neutral-800 text-silver-white/40 px-2 py-0.5 rounded border border-white/5">{task.id}</span>
                          <h4 className="font-sora font-extrabold text-xs text-white uppercase tracking-wider">{task.title}</h4>
                        </div>
                        <p className="text-xs text-silver-white/40 leading-relaxed font-sans">{task.description}</p>
                        
                        {task.deliverableUrl && (
                          <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono">
                            <span className="text-silver-white/30 font-bold">Deliverable:</span>
                            <a href={`https://${task.deliverableUrl}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline flex items-center gap-0.5 font-bold">
                              {task.deliverableUrl}
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-2 shrink-0">
                        <Badge 
                          status={task.status} 
                          variant={task.status === 'Graded' ? 'green' : task.status === 'Submitted' ? 'blue' : 'yellow'} 
                        />
                        
                        {task.status === 'Graded' ? (
                          <span className="text-[10px] font-mono font-bold text-white bg-emerald-950 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                            Grade: {task.grade}
                          </span>
                        ) : task.status === 'To Do' || task.status === 'In Progress' ? (
                          <Button
                            variant="neon"
                            size="sm"
                            onClick={() => {
                              setSelectedTaskId(task.id);
                              setSubmitTaskOpen(true);
                            }}
                            className="text-[10px] font-semibold py-1.5 font-sora !bg-emerald-500 !text-black hover:!bg-white cursor-pointer"
                          >
                            Submit Task URL
                          </Button>
                        ) : (
                          <span className="text-[10px] text-silver-white/30 italic">Awaiting grading</span>
                        )}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

        </div>

      </div>

      {/* --- SUBMIT TASK DIALOG MODAL --- */}
      <dialog 
        open={submitTaskOpen} 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent"
        style={{ margin: 'auto' }}
      >
        <div className="relative w-full max-w-lg bg-[#08080a] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)] overflow-hidden z-10 p-6 glass-panel">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-white/5">
            <h3 className="font-sora font-extrabold text-base text-white">Submit Assignment Repository</h3>
            <button 
              onClick={() => setSubmitTaskOpen(false)} 
              className="text-white/40 hover:text-white cursor-pointer p-1 rounded hover:bg-white/5"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>

          {selectedTask && (
            <div className="mb-4 bg-white/2 p-3.5 rounded-xl border border-white/5 text-xs">
              <span className="font-bold text-neon-red block uppercase text-[9px] tracking-wider font-mono">Assignment:</span>
              <p className="text-white font-bold mt-1">{selectedTask.title}</p>
              <p className="text-silver-white/40 mt-1">{selectedTask.description}</p>
            </div>
          )}

          {submitSuccess ? (
            <div className="p-6 border border-emerald-500/20 bg-emerald-950/15 text-emerald-400 rounded-xl text-center text-xs space-y-1">
              <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-400 mb-2 animate-bounce" />
              <h4 className="font-sora font-bold text-white">Repository Logged Successfully!</h4>
              <p className="text-silver-white/50 font-sans">Grading is active. Swap role to **Root Console** inside switcher HUD to score yourself.</p>
            </div>
          ) : (
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-silver-white/40 uppercase mb-1.5 font-sora font-bold">GitHub Deliverable Link</label>
                <input
                  type="text"
                  placeholder="github.com/yourprofile/repo"
                  value={deliverableUrl}
                  onChange={(e) => setDeliverableUrl(e.target.value)}
                  className="bg-neutral-950/80 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-electric-blue/40"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[10px] font-bold text-silver-white/40 uppercase mb-1.5 font-sora">Implementation Summary</label>
                <textarea
                  rows={4}
                  value={deliverableNotes}
                  onChange={(e) => setDeliverableNotes(e.target.value)}
                  placeholder="Summarize structural libraries used, layout modules or routers..."
                  className="bg-neutral-950/80 border border-white/5 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-electric-blue/40 resize-none"
                  required
                />
              </div>

              <Button type="submit" variant="solid" size="sm" fullWidth className="font-sora text-xs py-3.5 mt-2">
                Deploy Task Repository
              </Button>
            </form>
          )}
        </div>
      </dialog>

    </div>
  );
};

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
