'use client';

import React from 'react';
import { useGlobalStore } from '@/store/globalStore';
import { Navigation } from '@/components/Navigation';
import { LandingView } from '@/components/LandingView';
import { ClientView } from '@/components/ClientView';
import { InternView } from '@/components/InternView';
import { AdminView } from '@/components/AdminView';
import { ContactView } from '@/components/ContactView';
import { FeedbackView } from '@/components/FeedbackView';
import { Footer } from '@/components/Footer';
import { RoleSwitcher } from '@/components/RoleSwitcher';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { role } = useGlobalStore();

  const renderActiveView = () => {
    switch (role) {
      case 'client':
        return <ClientView />;
      case 'intern':
        return <InternView />;
      case 'admin':
        return <AdminView />;
      case 'contact':
        return <ContactView />;
      case 'feedback':
        return <FeedbackView />;
      default:
        return <LandingView />;
    }
  };

  return (
    <div className="min-h-screen text-slate-800 flex flex-col selection:bg-teal-500 selection:text-white relative overflow-x-hidden">
      {/* --- UNIVERSAL GRID & RADIAL GRADIENT BACKGROUND --- */}
      <div className="fixed inset-0 -z-10 pointer-events-none h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_50%_300px,#93c5fd,transparent)] opacity-40"></div>
      </div>

      {/* Dynamic Global Navbar */}
      <Navigation />

      {/* Primary Workspace Renderer with Buttery Smooth Transitions */}
      <main className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="flex-1 flex flex-col w-full"
          >
            {renderActiveView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer (Hidden in Admin Dashboard) */}
      {role !== 'admin' && <Footer />}

      {/* Floating Demo Switcher Access HUD */}
      <RoleSwitcher />
    </div>
  );
}
