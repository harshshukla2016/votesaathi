"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface LuminaSidebarProps {
  activeSection: string;
  setActiveSection: (s: string) => void;
  triggerOptimization: () => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  setShowSettings: (b: boolean) => void;
  setShowSupport: (b: boolean) => void;
}

const LuminaSidebar = ({ 
  activeSection, 
  setActiveSection, 
  triggerOptimization, 
  isCollapsed, 
  toggleSidebar,
  setShowSettings,
  setShowSupport
}: LuminaSidebarProps) => {
  const menuItems = [
    { icon: 'space_dashboard', label: 'Dashboard', id: 'intelligence' },
    { icon: 'public', label: 'Global Routes', id: 'network' },
    { icon: 'warning', label: 'Risk Analysis', id: 'disruption' },
    { icon: 'auto_awesome', label: 'Optimization', id: 'solutions' },
  ];

  return (
    <aside 
      className={`fixed left-6 top-24 bottom-6 rounded-[2rem] border border-white/50 bg-white/30 dark:bg-slate-900/30 backdrop-blur-[40px] shadow-2xl shadow-lumina-primary/5 divide-y divide-white/20 hidden lg:flex flex-col h-[calc(100vh-120px)] p-6 z-40 transition-all duration-300 ${
        isCollapsed ? 'w-24' : 'w-72'
      }`}
    >
      <div className="pb-6 relative">
        <div className="flex items-center space-x-3 mb-2">
          <div className={`rounded-2xl bg-lumina-primary-container/20 flex items-center justify-center overflow-hidden border border-lumina-primary/20 transition-all relative ${isCollapsed ? 'w-10 h-10' : 'w-12 h-12'}`}>
            <Image 
              alt="System Operator" 
              fill
              className="object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyOgSMjsyqRUo-emHyESt0kfZaXYm3vIPcPFUCRLBh2xED365TyPVT0aZoS8M8mZ1546_N77DlFUJIiKtOvEtlILWViXGivflTON2oM-T3_KPDx1yYOWRst7I7Sr0pLIDAdjY2-nId8hUkWCpp_IUve2j1PbwXsYAsuS_qJkPhiA0DbnC_9AauS7-XXA_l5Z3MlO3J_QMWX4upSo9fQWAF7vQzsyOch-yTqXhqlVZTTr2HPRYeeNjDatINejRIUxUb-03yRzdXBbE"
              unoptimized
            />
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-sm font-black text-slate-800 dark:text-slate-100 uppercase tracking-tighter">Mission Control</div>
              <div className="text-[10px] font-black text-lumina-primary uppercase tracking-widest">Active: 98.4%</div>
            </motion.div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button 
          onClick={toggleSidebar}
          className="absolute -right-10 top-0 w-8 h-8 bg-white/80 dark:bg-slate-900/80 rounded-r-xl border-y border-r border-white/50 flex items-center justify-center text-slate-500 hover:text-lumina-primary transition-colors shadow-lg"
        >
          <span className="material-symbols-outlined text-sm">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>
      </div>
      
      <nav className="flex-1 py-6 space-y-2 font-headline text-xs font-black uppercase tracking-[0.2em]">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveSection(item.id)}
            title={isCollapsed ? item.label : ''}
            className={`w-full flex items-center py-4 rounded-xl transition-all duration-300 group ${
              isCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'
            } ${
              activeSection === item.id 
                ? 'bg-lumina-primary text-white shadow-lg shadow-lumina-primary/30'
                : 'text-slate-500 dark:text-slate-400 hover:bg-white/20 hover:translate-x-1'
            }`}
          >
            <span className={`material-symbols-outlined text-xl ${activeSection === item.id ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {item.label}
              </motion.span>
            )}
          </button>
        ))}
      </nav>

      <div className="pt-6 pb-2">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerOptimization}
          className={`w-full bg-lumina-primary/10 text-lumina-primary hover:bg-lumina-primary hover:text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-lumina-primary/20 flex items-center justify-center ${isCollapsed ? 'px-0' : 'px-4'}`}
        >
          {isCollapsed ? (
            <span className="material-symbols-outlined text-2xl">rocket_launch</span>
          ) : (
            <span>Optimize Fleet</span>
          )}
        </motion.button>
      </div>

      <div className="pt-4 space-y-1 font-headline text-[10px] font-black uppercase tracking-widest border-t border-white/20 mt-4">
        <button 
          onClick={() => setShowSettings(true)}
          className={`w-full flex items-center py-3 hover:bg-white/20 hover:translate-x-1 transition-all duration-200 rounded-xl text-slate-500 dark:text-slate-400 ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'}`}
        >
          <span className="material-symbols-outlined text-lg">settings</span>
          {!isCollapsed && <span>Settings</span>}
        </button>
        <button 
          onClick={() => setShowSupport(true)}
          className={`w-full flex items-center py-3 hover:bg-white/20 hover:translate-x-1 transition-all duration-200 rounded-xl text-slate-500 dark:text-slate-400 ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-4'}`}
        >
          <span className="material-symbols-outlined text-lg">help</span>
          {!isCollapsed && <span>Support</span>}
        </button>
      </div>
    </aside>
  );
};

export default LuminaSidebar;
