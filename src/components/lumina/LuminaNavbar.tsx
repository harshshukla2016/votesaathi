"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface LuminaNavbarProps {
  activeSection: string;
  setActiveSection: (s: string) => void;
  triggerOptimization: () => void;
}

const LuminaNavbar = ({ activeSection, setActiveSection, triggerOptimization }: LuminaNavbarProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const navItems = [
    { label: 'Intelligence', id: 'intelligence' },
    { label: 'Network', id: 'network' },
    { label: 'Disruption', id: 'disruption' },
    { label: 'Solutions', id: 'solutions' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-24 bg-white/40 dark:bg-slate-900/40 backdrop-blur-[30px] border-b border-white/30 z-[60] px-12 flex items-center justify-between">
      <div className="flex items-center gap-16">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setActiveSection('hero')}
        >
          <div className="w-10 h-10 bg-lumina-primary rounded-xl flex items-center justify-center text-white font-black text-xl group-hover:rotate-12 transition-transform shadow-lg shadow-lumina-primary/20">L</div>
          <span className="font-headline text-2xl font-black tracking-tighter text-slate-800 dark:text-white uppercase">Lumina</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`font-headline text-xs font-black tracking-[0.2em] uppercase transition-all relative py-3 ${
                activeSection === item.id 
                ? 'text-lumina-primary' 
                : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div 
                  layoutId="lumina-nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-lumina-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 relative">
        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-12 h-12 rounded-2xl hover:bg-white/50 flex items-center justify-center transition-all relative group border border-transparent hover:border-white/50"
          >
            <span className="material-symbols-outlined text-slate-400 group-hover:text-lumina-primary text-2xl">notifications</span>
            <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-lumina-secondary rounded-full border-2 border-white shadow-sm"></span>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute top-16 right-0 w-96 glass-card rounded-3xl p-6 shadow-3xl border border-white/50 z-[70]"
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Notifications</h4>
                  <span className="text-[10px] font-black uppercase tracking-widest text-lumina-primary cursor-pointer">Clear All</span>
                </div>
                <div className="space-y-5">
                  {[
                    { title: 'Fleet Optimized', time: '2m ago', icon: 'auto_awesome', color: 'text-lumina-secondary' },
                    { title: 'Global Warning', time: '15m ago', icon: 'warning', color: 'text-lumina-tertiary' },
                    { title: 'Node Synced', time: '1h ago', icon: 'sync', color: 'text-lumina-primary' },
                  ].map((n, i) => (
                    <div key={i} className="flex gap-4 hover:bg-slate-50/50 p-3 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100">
                      <div className={`w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center ${n.color}`}>
                        <span className="material-symbols-outlined text-xl">{n.icon}</span>
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 leading-none">{n.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <div className="relative">
          <button 
            onClick={() => setShowProfile(!showProfile)}
            className="w-12 h-12 rounded-2xl hover:bg-white/50 flex items-center justify-center transition-all overflow-hidden border border-white/50 shadow-sm relative"
          >
            <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Profile" fill className="object-cover" unoptimized />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div 
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="absolute top-16 right-0 w-72 glass-card rounded-3xl p-6 shadow-3xl border border-white/50 z-[70]"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-lumina-primary/10 flex items-center justify-center text-lumina-primary font-black text-xl border border-lumina-primary/20">H</div>
                  <div>
                    <p className="text-sm font-black text-slate-800">Harsh Shukla</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50/50 transition-all flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg">person</span> Profile
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50/50 transition-all flex items-center gap-3">
                    <span className="material-symbols-outlined text-lg">shield</span> Security
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-lumina-tertiary hover:bg-lumina-tertiary/10 transition-all flex items-center gap-3 mt-4">
                    <span className="material-symbols-outlined text-lg">logout</span> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={triggerOptimization}
          className="bg-lumina-primary text-white px-8 py-3.5 rounded-2xl font-headline text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-lumina-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          Launch Control
        </button>
      </div>
    </nav>
  );
};

export default LuminaNavbar;
