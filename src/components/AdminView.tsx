'use client';

import React, { useState } from 'react';
import { useGlobalStore, Project } from '@/store/globalStore';
import { Button } from './UiKit';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Landmark, Activity, Bell, Search, Settings,
  FolderKanban, FileText, LayoutDashboard, MessageSquare,
  Plus, DollarSign, Box, Star, Check, AlertTriangle, ShieldCheck, Database, Server, RefreshCw, X, Send, Award
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { 
    projects, updateProjectProgress, addProject, nudgeProject,
    invoices, updateInvoiceStatus, addInvoice,
    inventory, updateInventoryStock,
    interns, updateInternStatus, gradeTask, issueCertificate,
    feedbacks, setRole
  } = useGlobalStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'billing' | 'interns' | 'feedbacks' | 'settings'>('overview');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessKey, setAccessKey] = useState('');
  const [loginError, setLoginError] = useState('');

  // Modals & Form States
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProject, setNewProject] = useState({ clientName: '', clientEmail: '', title: '', serviceType: 'AI & Automation', price: 150000 });

  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ customerName: '', customerPhone: '', itemName: 'Ultra Web Hosting Pack', itemPrice: 15000 });

  // Notification Toast simulation
  const [toastMessage, setToastMessage] = useState('');
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessKey === 'admin' || accessKey === 'csvertex' || accessKey === 'csvertex_root_2026') {
      setIsAuthenticated(true);
      setLoginError('');
      triggerToast('Authenticated successfully as Root Admin.');
    } else {
      setLoginError('Invalid credentials. Access denied.');
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.clientName || !newProject.title) {
      triggerToast('Please fill all required project fields.');
      return;
    }
    addProject({
      clientName: newProject.clientName,
      clientEmail: newProject.clientEmail || 'client@vertex.co',
      title: newProject.title,
      serviceType: newProject.serviceType,
      price: Number(newProject.price)
    });
    setShowAddProject(false);
    setNewProject({ clientName: '', clientEmail: '', title: '', serviceType: 'AI & Automation', price: 150000 });
    triggerToast('New client project successfully provisioned.');
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoice.customerName) {
      triggerToast('Please provide a customer name.');
      return;
    }
    addInvoice({
      customerName: newInvoice.customerName,
      customerPhone: newInvoice.customerPhone || '9848022338',
      items: [{ name: newInvoice.itemName, qty: 1, price: Number(newInvoice.itemPrice), gstRate: 0 }],
      subtotal: Number(newInvoice.itemPrice),
      cgst: 0,
      sgst: 0,
      total: Number(newInvoice.itemPrice),
      status: 'Pending'
    });
    setShowAddInvoice(false);
    setNewInvoice({ customerName: '', customerPhone: '', itemName: 'Ultra Web Hosting Pack', itemPrice: 15000 });
    triggerToast('Invoice generated and dispatched to client.');
  };

  const internApplicants = interns.filter(i => i.status === 'Pending');
  const activeInterns = interns.filter(i => i.status === 'Active' || i.status === 'Onboarding');

  const totalRevenue = invoices.reduce((acc, curr) => acc + (curr.status === 'Paid' ? curr.total : 0), 0);
  const pendingRevenue = invoices.reduce((acc, curr) => acc + (curr.status === 'Pending' ? curr.total : 0), 0);
  const activeProjectsCount = projects.filter(p => p.status !== 'Completed').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-6 absolute inset-0 z-50 overflow-hidden">
        
        {/* Cinematic Backdrop Glow */}
        <div className="absolute w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-slate-900/80 backdrop-blur-2xl border border-slate-700/60 rounded-3xl p-8 shadow-[0_10px_50px_rgba(0,0,0,0.5)] text-white relative z-10"
        >
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-black font-sora tracking-tight">CS Vertex OS</h2>
            <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-widest">Enterprise Command Operations</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2 text-left">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wide flex items-center justify-between">
                <span>Secure Authorization Key</span>
                <span className="text-[10px] text-blue-400 font-mono">NODE 14.2</span>
              </label>
              <input
                type="password"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="Enter access key..."
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-mono"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 font-medium text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{loginError}</p>
            )}

            <Button type="submit" variant="solid" size="sm" fullWidth className="py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold tracking-wide uppercase text-xs rounded-xl shadow-lg shadow-blue-500/25">
              Access Root Console
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span>Enterprise Security Layer: <span className="text-blue-400 font-mono">Verified AES-256</span></span>
            <span className="text-emerald-400 flex items-center gap-1">● System Online</span>
          </div>

        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden text-slate-100 font-sans absolute inset-0 z-50">
      
      {/* Toast Notification Simulation */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-50 bg-slate-800 border border-slate-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 max-w-md"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-semibold">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Command Console */}
      <aside className="w-68 bg-slate-900 border-r border-slate-800 flex flex-col hidden md:flex shrink-0 z-30">
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-500/20">
              V
            </div>
            <div>
              <span className="font-sora font-black text-base tracking-tight text-white">CS Vertex <span className="text-blue-500 text-xs ml-0.5">OS</span></span>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">● ENTERPRISE PRO</div>
            </div>
          </div>
          <button onClick={() => setRole('guest')} className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer" title="Exit to Public Web">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto space-y-1">
          <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-3 mt-2">Operations Center</div>
          
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'overview' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Dashboard Overview
          </button>

          <button 
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'projects' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><FolderKanban className="w-4 h-4" /> Client Projects</div>
            <span className={`text-[10px] px-2 py-0.5 rounded-md font-mono ${activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'}`}>{activeProjectsCount}</span>
          </button>

          <button 
            onClick={() => setActiveTab('billing')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'billing' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Landmark className="w-4 h-4" /> Billing & Invoices</div>
            {invoices.filter(i => i.status === 'Pending').length > 0 && <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-md font-mono">{invoices.filter(i => i.status === 'Pending').length}</span>}
          </button>

          <button 
            onClick={() => setActiveTab('interns')}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'interns' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
          >
            <div className="flex items-center gap-3"><Users className="w-4 h-4" /> Internship Desk</div>
            {internApplicants.length > 0 && <span className="text-[10px] bg-red-500 text-white shadow-sm px-2 py-0.5 rounded-md font-mono">{internApplicants.length}</span>}
          </button>

          <button 
            onClick={() => setActiveTab('feedbacks')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'feedbacks' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
          >
            <MessageSquare className="w-4 h-4" /> Testimonials Audit
          </button>

          <div className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest px-3 mb-3 mt-8">System Hardware</div>
          
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${activeTab === 'settings' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800/70 hover:text-white'}`}
          >
            <Settings className="w-4 h-4" /> Platform Telemetry
          </button>

          <div className="pt-12 px-2">
            <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">Server CPU</span>
                <span className="text-blue-400 font-mono">24%</span>
              </div>
              <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-1/4 rounded-full animate-pulse" />
              </div>
              <div className="flex items-center justify-between text-xs font-semibold pt-1">
                <span className="text-slate-400">Memory Cluster</span>
                <span className="text-emerald-400 font-mono">1.8 / 16 GB</span>
              </div>
            </div>
          </div>

        </div>
        
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                R
              </div>
              <div>
                <div className="text-xs font-bold text-white leading-tight">Root Administrator</div>
                <div className="text-[10px] text-slate-400 font-medium">Session Active</div>
              </div>
            </div>
            <button onClick={() => setRole('guest')} className="text-xs text-red-400 hover:underline cursor-pointer font-medium">Exit</button>
          </div>
        </div>
      </aside>

      {/* Main Administrative Container */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#0B1120]">
        
        {/* Top Header */}
        <header className="h-20 bg-slate-900/60 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center text-slate-400 w-80 bg-slate-800/60 px-4 py-2.5 rounded-xl border border-slate-700/60 focus-within:border-blue-500">
            <Search className="w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Query active database records..." className="bg-transparent border-none focus:outline-none text-xs ml-3 w-full text-white placeholder-slate-500" />
          </div>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">CLUSTER_ACTIVE</span>
            </div>
            <div className="w-px h-6 bg-slate-800 mx-1"></div>
            <button onClick={() => triggerToast('No pending critical security advisories.')} className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Workspace Screens */}
        <main className="flex-1 overflow-y-auto p-8 relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-7xl mx-auto space-y-8">
            
            {/* 1. OVERVIEW DASHBOARD */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black font-sora tracking-tight text-white">Operations Dashboard</h1>
                    <p className="text-sm text-slate-400 mt-1">Real-time status metrics and financial volume across CS Vertex platforms.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button onClick={() => setShowAddProject(true)} variant="solid" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20">
                      <Plus className="w-4 h-4" /> Provision Project
                    </Button>
                    <Button onClick={() => setShowAddInvoice(true)} variant="solid" size="sm" className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg">
                      <DollarSign className="w-4 h-4 text-emerald-400" /> Create Bill
                    </Button>
                  </div>
                </div>

                {/* Core Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'Total Paid Volume', val: `₹${totalRevenue.toLocaleString('en-IN')}`, desc: 'Verified settled revenue', icon: Landmark, color: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' },
                    { label: 'Pending Billing', val: `₹${pendingRevenue.toLocaleString('en-IN')}`, desc: 'Awaiting client transfer', icon: Activity, color: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/10' },
                    { label: 'Active Projects', val: activeProjectsCount.toString(), desc: 'In development pipelines', icon: FolderKanban, color: 'text-blue-400', border: 'border-blue-500/20', bg: 'bg-blue-500/10' },
                    { label: 'Talent Queue', val: internApplicants.length.toString(), desc: 'Unreviewed applicants', icon: Users, color: 'text-red-400', border: 'border-red-500/20', bg: 'bg-red-500/10' },
                  ].map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className={`bg-slate-900/60 backdrop-blur-xl border ${item.border} rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-slate-600 transition-all`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.label}</p>
                            <h3 className="text-3xl font-black text-white mt-2 font-sora">{item.val}</h3>
                            <p className="text-[11px] text-slate-500 mt-2">{item.desc}</p>
                          </div>
                          <div className={`p-3 rounded-xl ${item.bg}`}>
                            <Icon className={`w-6 h-6 ${item.color}`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Two-Column Layout: Project Progress & Recent Invoices */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Active Projects Core */}
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <h3 className="font-bold text-white font-sora flex items-center gap-2">
                        <FolderKanban className="w-4 h-4 text-blue-500" /> Active Engineering Pipelines
                      </h3>
                      <button onClick={() => setActiveTab('projects')} className="text-xs text-blue-400 hover:underline font-semibold cursor-pointer">View All ({projects.length})</button>
                    </div>

                    <div className="space-y-4">
                      {projects.slice(0, 4).map(proj => (
                        <div key={proj.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/80 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-bold text-sm text-white">{proj.title}</h4>
                              <span className="text-xs text-slate-400">{proj.clientName}</span>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">{proj.status}</span>
                          </div>

                          <div className="space-y-1.5">
                            <div className="flex justify-between text-xs font-semibold">
                              <span className="text-slate-500">Pipeline Progress</span>
                              <span className="text-slate-300">{proj.progress}%</span>
                            </div>
                            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500" style={{ width: `${proj.progress}%` }}></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Billing & Pending Transactions */}
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                      <h3 className="font-bold text-white font-sora flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-emerald-500" /> Recent Billing Invoices
                      </h3>
                      <button onClick={() => setActiveTab('billing')} className="text-xs text-blue-400 hover:underline font-semibold cursor-pointer">All Accounts</button>
                    </div>

                    <div className="space-y-4">
                      {invoices.slice(0, 4).map(inv => (
                        <div key={inv.id} className="p-4 rounded-xl bg-slate-800/40 border border-slate-800/80 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-white">{inv.customerName}</h4>
                              <span className="text-[10px] font-mono text-slate-500">{inv.id}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{inv.items[0]?.name || 'Custom Package'}</p>
                          </div>

                          <div className="text-right">
                            <div className="font-sora font-black text-sm text-white">₹{inv.total.toLocaleString('en-IN')}</div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold mt-1 inline-block uppercase font-mono ${
                              inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>{inv.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* 2. CLIENT PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black font-sora tracking-tight text-white">Client Projects Ecosystem</h1>
                    <p className="text-sm text-slate-400 mt-1">Manage project milestone progression, client delivery expectations, and requirement nodes.</p>
                  </div>
                  <Button onClick={() => setShowAddProject(true)} variant="solid" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20">
                    <Plus className="w-4 h-4" /> Provision New Project
                  </Button>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <h3 className="font-bold text-white font-sora">Enterprise Delivery Pipeline</h3>
                    <span className="text-xs font-mono text-slate-400">TOTAL NODES: {projects.length}</span>
                  </div>

                  <div className="p-6 space-y-6">
                    {projects.map((proj) => (
                      <div key={proj.id} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-6 hover:border-slate-700 transition-all">
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center font-bold text-lg shrink-0">
                              <FolderKanban className="w-6 h-6" />
                            </div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h4 className="font-sora font-black text-lg text-white">{proj.title}</h4>
                                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">{proj.id}</span>
                              </div>
                              <p className="text-xs text-slate-400 mt-1">Client: <span className="text-white font-semibold">{proj.clientName}</span> ({proj.clientEmail})</p>
                              <span className="text-[10px] text-blue-400 uppercase font-mono tracking-wider font-bold mt-1 inline-block">{proj.serviceType}</span>
                            </div>
                          </div>

                          <div className="flex flex-col sm:items-end gap-2 shrink-0">
                            <div className="text-xl font-sora font-black text-white">₹{proj.price.toLocaleString('en-IN')}</div>
                            <button 
                              onClick={() => {
                                nudgeProject(proj.id);
                                triggerToast(`WhatsApp alert simulated for ${proj.clientName}.`);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                                proj.whatsappNudged 
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                  : 'bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30'
                              }`}
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{proj.whatsappNudged ? 'WhatsApp Nudged' : 'Nudge Client'}</span>
                            </button>
                          </div>
                        </div>

                        {/* Interactive Progression Orchestration */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                          
                          <div className="space-y-2">
                            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Milestone Phase</label>
                            <select
                              value={proj.status}
                              onChange={(e) => {
                                updateProjectProgress(proj.id, proj.progress, e.target.value as Project['status']);
                                triggerToast(`Project phase updated to ${e.target.value}.`);
                              }}
                              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500 cursor-pointer font-bold font-sora"
                            >
                              <option value="Planning">Planning Phase</option>
                              <option value="Design">Architecture & Design</option>
                              <option value="Development">Active Development</option>
                              <option value="QA Testing">QA Testing & Security</option>
                              <option value="Completed">Project Completed</option>
                            </select>
                          </div>

                          <div className="space-y-2 lg:col-span-2">
                            <div className="flex justify-between items-center text-xs font-semibold">
                              <span className="text-slate-400 uppercase tracking-wider">Delivery Completion Percentage</span>
                              <span className="text-blue-400 font-mono text-sm font-bold">{proj.progress}%</span>
                            </div>
                            
                            <div className="flex items-center gap-4 pt-1">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={proj.progress}
                                onChange={(e) => updateProjectProgress(proj.id, Number(e.target.value), proj.status)}
                                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                              />
                            </div>
                          </div>

                        </div>

                        {/* Client Specifications View */}
                        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-2">
                          <div className="flex items-center justify-between text-xs font-semibold">
                            <span className="text-slate-400 flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-blue-500" /> Client Spec Brief</span>
                            {proj.requirementsUrl && (
                              <span className="text-blue-400 font-mono text-[10px] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{proj.requirementsUrl}</span>
                            )}
                          </div>
                          <p className="text-xs text-slate-300 font-inter italic">{proj.requirementsText || 'No custom requirement notes specified.'}</p>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              </div>
            )}

            {/* 3. BILLING & INVOICING */}
            {activeTab === 'billing' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black font-sora tracking-tight text-white">Billing & Invoicing Ecosystem</h1>
                    <p className="text-sm text-slate-400 mt-1">Orchestrate enterprise client invoicing, settled volumes, and server infrastructure inventory.</p>
                  </div>
                  <Button onClick={() => setShowAddInvoice(true)} variant="solid" size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20">
                    <DollarSign className="w-4 h-4" /> Generate New Invoice
                  </Button>
                </div>

                {/* Hardware Inventory Nodes */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <h3 className="font-bold text-white font-sora flex items-center gap-2">
                      <Box className="w-4 h-4 text-blue-500" /> Infrastructure & Server Nodes Inventory
                    </h3>
                    <span className="text-xs font-mono text-slate-400">ACTIVE NODES: {inventory.length}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {inventory.map(item => (
                      <div key={item.id} className="p-5 rounded-xl bg-slate-800/30 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">{item.sku}</span>
                          <span className="font-sora font-black text-sm text-white">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                        <h4 className="font-bold text-sm text-white">{item.name}</h4>
                        
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                          <span className="text-xs text-slate-400">Allocated Nodes</span>
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => {
                                updateInventoryStock(item.id, Math.max(0, item.stock - 1));
                                triggerToast(`Reduced allocation for ${item.sku}.`);
                              }} 
                              className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs flex items-center justify-center cursor-pointer"
                            >
                              -
                            </button>
                            <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${item.stock <= item.minStock ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800 text-white'}`}>{item.stock}</span>
                            <button 
                              onClick={() => {
                                updateInventoryStock(item.id, item.stock + 1);
                                triggerToast(`Increased allocation for ${item.sku}.`);
                              }} 
                              className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 font-bold text-white text-xs flex items-center justify-center cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Invoices List */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <h3 className="font-bold text-white font-sora">Client Invoicing Master Ledger</h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs whitespace-nowrap">
                      <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                        <tr>
                          <th className="px-6 py-4">Invoice ID</th>
                          <th className="px-6 py-4">Client Name</th>
                          <th className="px-6 py-4">Package Item</th>
                          <th className="px-6 py-4">Timestamp</th>
                          <th className="px-6 py-4">Total Amount</th>
                          <th className="px-6 py-4">Payment Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {invoices.map(inv => (
                          <tr key={inv.id} className="hover:bg-slate-800/30 transition-colors font-medium">
                            <td className="px-6 py-4 font-mono font-bold text-white">{inv.id}</td>
                            <td className="px-6 py-4 font-bold text-white">{inv.customerName} <span className="text-slate-500 text-[10px] font-mono block">{inv.customerPhone}</span></td>
                            <td className="px-6 py-4 text-slate-300">{inv.items[0]?.name || 'Custom Solution Node'}</td>
                            <td className="px-6 py-4 text-slate-400 font-mono">{inv.date}</td>
                            <td className="px-6 py-4 font-bold font-sora text-sm text-white">₹{inv.total.toLocaleString('en-IN')}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase ${
                                inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>{inv.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              {inv.status !== 'Paid' ? (
                                <button
                                  onClick={() => {
                                    updateInvoiceStatus(inv.id, 'Paid');
                                    triggerToast(`Invoice ${inv.id} marked as Paid.`);
                                  }}
                                  className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-xl border border-emerald-500/30 transition-all cursor-pointer text-xs"
                                >
                                  Mark Settled
                                </button>
                              ) : (
                                <span className="text-xs font-bold text-slate-500 italic">Settled</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* 4. INTERNSHIP PLATFORM */}
            {activeTab === 'interns' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black font-sora tracking-tight text-white">Internship Platform Engine</h1>
                    <p className="text-sm text-slate-400 mt-1">Review incoming engineering talent, evaluate submitted task deliverables, and dispatch verified completion certificates.</p>
                  </div>
                </div>

                {/* Pending Applicant Pool */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <h3 className="font-bold text-white font-sora flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" /> Pending Talent Review ({internApplicants.length})
                    </h3>
                  </div>

                  {internApplicants.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-sm">No pending applicants in queue.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs whitespace-nowrap">
                        <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                          <tr>
                            <th className="px-6 py-4">Applicant ID / Name</th>
                            <th className="px-6 py-4">Email Contact</th>
                            <th className="px-6 py-4">Institution</th>
                            <th className="px-6 py-4">Specialization Track</th>
                            <th className="px-6 py-4 text-right">Decision Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {internApplicants.map((appl) => (
                            <tr key={appl.id} className="hover:bg-slate-800/30 transition-colors font-medium">
                              <td className="px-6 py-4">
                                <div className="font-bold text-white font-sora">{appl.name}</div>
                                <div className="text-[10px] font-mono text-slate-500">{appl.id}</div>
                              </td>
                              <td className="px-6 py-4 text-slate-300">{appl.email}</td>
                              <td className="px-6 py-4 text-slate-300">{appl.college}</td>
                              <td className="px-6 py-4">
                                <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 px-2.5 py-1 rounded-md text-[10px] font-bold font-mono">{appl.domain}</span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      updateInternStatus(appl.id, 'Active');
                                      triggerToast(`Onboarded ${appl.name} successfully.`);
                                    }}
                                    className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold rounded-xl border border-emerald-500/30 transition-all cursor-pointer text-xs"
                                  >
                                    Onboard
                                  </button>
                                  <button
                                    onClick={() => {
                                      updateInternStatus(appl.id, 'Completed');
                                      triggerToast(`Declined ${appl.name}.`);
                                    }}
                                    className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 font-bold rounded-xl border border-red-500/30 transition-all cursor-pointer text-xs"
                                  >
                                    Decline
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Active Interns & Task Management */}
                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <h3 className="font-bold text-white font-sora">Active Intern Deliverables & Grading</h3>
                    <span className="text-xs font-mono text-slate-400">ACTIVE TALENT: {activeInterns.length}</span>
                  </div>

                  <div className="p-6 space-y-6">
                    {activeInterns.map(intern => (
                      <div key={intern.id} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-6 hover:border-slate-700 transition-all">
                        
                        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <h4 className="font-sora font-black text-lg text-white">{intern.name}</h4>
                              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">{intern.domain}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1">{intern.college} ({intern.email})</p>
                          </div>

                          <Button
                            onClick={() => {
                              const code = `CSV-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                              issueCertificate(intern.id, code);
                              triggerToast(`Issued verified certificate ${code} to ${intern.name}.`);
                            }}
                            variant="solid" 
                            size="sm" 
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20"
                          >
                            <Award className="w-4 h-4" /> Issue Certificate
                          </Button>
                        </div>

                        {/* Task Deliverables Grid */}
                        <div className="space-y-4">
                          <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Deliverables</h5>
                          
                          {intern.tasks.map(task => (
                            <div key={task.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-[10px] text-blue-400 font-bold">{task.id}</span>
                                  <h6 className="font-bold text-sm text-white">{task.title}</h6>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                                    task.status === 'Graded' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 
                                    task.status === 'Submitted' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-800 text-slate-400'
                                  }`}>{task.status}</span>
                                </div>
                                <p className="text-xs text-slate-400">{task.description}</p>
                                
                                {task.deliverableUrl && (
                                  <div className="pt-2 flex items-center gap-2 text-xs font-mono text-slate-300">
                                    <span className="text-slate-500">Link:</span>
                                    <a href={`https://${task.deliverableUrl}`} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">{task.deliverableUrl}</a>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                {task.status === 'Submitted' && (
                                  <div className="flex items-center gap-1.5">
                                    <button 
                                      onClick={() => {
                                        gradeTask(intern.id, task.id, 'A+ (Exceptional)');
                                        triggerToast(`Graded task ${task.id} with A+.`);
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-500/30 transition-all cursor-pointer"
                                    >
                                      Grade A+
                                    </button>
                                    <button 
                                      onClick={() => {
                                        gradeTask(intern.id, task.id, 'A (Excellent)');
                                        triggerToast(`Graded task ${task.id} with A.`);
                                      }}
                                      className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold hover:bg-blue-500/30 transition-all cursor-pointer"
                                    >
                                      Grade A
                                    </button>
                                  </div>
                                )}
                                {task.grade && (
                                  <div className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-bold font-sora text-sm">
                                    Grade: {task.grade}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 5. CLIENT TESTIMONIALS */}
            {activeTab === 'feedbacks' && (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-black font-sora tracking-tight text-white">Client Testimonials Audit</h1>
                    <p className="text-sm text-slate-400 mt-1">Audit submitted feedback, customer reviews, and public web ratings.</p>
                  </div>
                </div>

                <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                    <h3 className="font-bold text-white font-sora">Verified Customer Submissions</h3>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {feedbacks.map(fb => (
                      <div key={fb.id} className="p-6 rounded-2xl bg-slate-800/30 border border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-white font-sora">{fb.customerName}</h4>
                            <span className="text-[10px] font-mono text-slate-500">{fb.id} • {fb.date}</span>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            <span className="font-bold font-mono text-amber-400 text-xs">{fb.rating}.0</span>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 font-inter italic leading-relaxed">&quot;{fb.feedbackText}&quot;</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 6. PLATFORM TELEMETRY SETTINGS */}
            {activeTab === 'settings' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-black font-sora tracking-tight text-white">Platform Hardware Telemetry</h1>
                  <p className="text-sm text-slate-400 mt-1">Live health simulation, API response clusters, and memory caching metrics.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Hardware Telemetry Simulation */}
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6 lg:col-span-2">
                    <h3 className="font-bold text-white font-sora flex items-center gap-2">
                      <Server className="w-4 h-4 text-blue-500" /> Active Edge Node Clusters
                    </h3>

                    <div className="space-y-6 font-mono text-xs">
                      
                      <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-400">asia-south1 (Hyderabad Edge)</span>
                          <span className="text-emerald-400">99.98% UP</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Latency: 14ms</span>
                          <span>Requests: 14,204/sec</span>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                        <div className="flex justify-between font-bold">
                          <span className="text-slate-400">us-east1 (Global Ingestion Gateway)</span>
                          <span className="text-emerald-400">100% UP</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>Latency: 48ms</span>
                          <span>Requests: 42,912/sec</span>
                        </div>
                      </div>

                    </div>

                    <div className="pt-4 border-t border-slate-800">
                      <Button onClick={() => triggerToast('All clusters flushed and restarted.')} variant="solid" size="sm" className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg border border-slate-700">
                        <RefreshCw className="w-4 h-4 text-blue-400" /> Force Cache Purge
                      </Button>
                    </div>
                  </div>

                  {/* System Level Alerts */}
                  <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                    <h3 className="font-bold text-white font-sora flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" /> Security Node Audit
                    </h3>

                    <div className="space-y-4 text-xs font-medium">
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
                        <div className="font-bold flex items-center gap-2">
                          <Check className="w-4 h-4" /> SSL TLS 1.3 Verified
                        </div>
                        <p className="text-[11px] text-emerald-400/80">Valid wildcard certificate issued by Let&apos;s Encrypt Authority X3.</p>
                      </div>

                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 space-y-1">
                        <div className="font-bold flex items-center gap-2">
                          <Database className="w-4 h-4" /> Next.js 16 WASM Transpilation
                        </div>
                        <p className="text-[11px] text-blue-400/80">SWC compiler configuration successfully bypassed for @paper-design/shaders-react.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </motion.div>
        </main>
      </div>

      {/* --- MODAL: ADD PROJECT --- */}
      <AnimatePresence>
        {showAddProject && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-bold font-sora text-xl text-white">Provision New Client Project</h3>
                <button onClick={() => setShowAddProject(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleCreateProject} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1.5">
                  <label className="text-slate-400">Client Organization Name</label>
                  <input
                    type="text"
                    value={newProject.clientName}
                    onChange={(e) => setNewProject({...newProject, clientName: e.target.value})}
                    placeholder="e.g. Apex Global Solutions"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">Client Email Contact</label>
                  <input
                    type="email"
                    value={newProject.clientEmail}
                    onChange={(e) => setNewProject({...newProject, clientEmail: e.target.value})}
                    placeholder="e.g. contact@apex.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">Project Title / Summary</label>
                  <input
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                    placeholder="e.g. Autonomous Billing Workflow Gateway"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400">Engineering Track</label>
                    <select
                      value={newProject.serviceType}
                      onChange={(e) => setNewProject({...newProject, serviceType: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Next.js Web Portal">Next.js Web Portal</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="Billing Infrastructure">Billing Infrastructure</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400">Provisioned Value (₹)</label>
                    <input
                      type="number"
                      value={newProject.price}
                      onChange={(e) => setNewProject({...newProject, price: Number(e.target.value)})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" onClick={() => setShowAddProject(false)} variant="solid" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-5 py-3 rounded-xl cursor-pointer">Cancel</Button>
                  <Button type="submit" variant="solid" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl cursor-pointer shadow-lg shadow-blue-500/20">Provision Now</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL: ADD INVOICE --- */}
      <AnimatePresence>
        {showAddInvoice && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="font-bold font-sora text-xl text-white">Generate Client Billing Invoice</h3>
                <button onClick={() => setShowAddInvoice(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>

              <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1.5">
                  <label className="text-slate-400">Customer Full Name</label>
                  <input
                    type="text"
                    value={newInvoice.customerName}
                    onChange={(e) => setNewInvoice({...newInvoice, customerName: e.target.value})}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">Customer WhatsApp Phone</label>
                  <input
                    type="text"
                    value={newInvoice.customerPhone}
                    onChange={(e) => setNewInvoice({...newInvoice, customerPhone: e.target.value})}
                    placeholder="e.g. 9848022338"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">Solution Package Node</label>
                  <input
                    type="text"
                    value={newInvoice.itemName}
                    onChange={(e) => setNewInvoice({...newInvoice, itemName: e.target.value})}
                    placeholder="e.g. Dedicated AI Inference Core Setup"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400">Total Settled Amount (₹)</label>
                  <input
                    type="number"
                    value={newInvoice.itemPrice}
                    onChange={(e) => setNewInvoice({...newInvoice, itemPrice: Number(e.target.value)})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" onClick={() => setShowAddInvoice(false)} variant="solid" className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-5 py-3 rounded-xl cursor-pointer">Cancel</Button>
                  <Button type="submit" variant="solid" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl cursor-pointer shadow-lg shadow-emerald-500/20">Generate Bill</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
