"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LuminaNavbar from '@/components/lumina/LuminaNavbar';
import LuminaSidebar from '@/components/lumina/LuminaSidebar';

export default function LuminaPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showSupport, setShowSupport] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const triggerOptimization = () => {
    if (activeSection !== 'solutions') {
      setActiveSection('solutions');
    }
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
    }, 3000);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <HeroSection key="hero" setActiveSection={setActiveSection} />;
      case 'intelligence':
        return <IntelligenceSection key="intelligence" isCollapsed={isSidebarCollapsed} />;
      case 'network':
        return <NetworkSection key="network" isCollapsed={isSidebarCollapsed} />;
      case 'disruption':
        return <DisruptionSection key="disruption" isCollapsed={isSidebarCollapsed} />;
      case 'solutions':
        return <SolutionsSection key="solutions" isOptimizing={isOptimizing} setIsOptimizing={setIsOptimizing} isCollapsed={isSidebarCollapsed} />;
      default:
        return <HeroSection key="default" setActiveSection={setActiveSection} />;
    }
  };

  return (
    <main className="min-h-screen bg-lumina-surface relative selection:bg-lumina-primary-container selection:text-white overflow-hidden">
      {/* Ambient Illumination */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(77,166,255,0.15)_0%,transparent_70%)]"></div>
        <div className="absolute top-[20%] right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_50%_50%,rgba(255,170,0,0.1)_0%,transparent_70%)] opacity-60 mix-blend-multiply"></div>
      </div>

      <LuminaNavbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
        triggerOptimization={triggerOptimization}
      />
      
      {activeSection !== 'hero' && (
        <LuminaSidebar 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          triggerOptimization={triggerOptimization}
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          setShowSettings={setShowSettings}
          setShowSupport={setShowSupport}
        />
      )}

      <AnimatePresence mode="wait">
        {renderSection()}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl glass-card rounded-[3rem] p-12 relative border border-white/50 shadow-3xl"
            >
              <button onClick={() => setShowSettings(false)} className="absolute top-10 right-10 text-slate-400 hover:text-slate-900 transition-colors">
                <span className="material-symbols-outlined text-4xl">close</span>
              </button>
              <h2 className="text-5xl font-black mb-10 text-slate-900 uppercase tracking-tighter">System Settings</h2>
              <div className="space-y-10">
                <div className="flex items-center justify-between p-8 bg-slate-50/50 rounded-3xl border border-slate-200/50 shadow-sm">
                  <div>
                    <h4 className="text-lg font-black text-slate-800">Dark Mode Architecture</h4>
                    <p className="text-sm font-bold text-slate-500">Synchronize system appearance with OS</p>
                  </div>
                  <div className="w-14 h-7 bg-lumina-primary rounded-full relative"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md"></div></div>
                </div>
                <div className="flex items-center justify-between p-8 bg-slate-50/50 rounded-3xl border border-slate-200/50 shadow-sm">
                  <div>
                    <h4 className="text-lg font-black text-slate-800">AI Autonomy Level</h4>
                    <p className="text-sm font-bold text-slate-500">Adjust automated decision threshold</p>
                  </div>
                  <input type="range" className="accent-lumina-primary w-48" defaultValue="80" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Modal */}
      <AnimatePresence>
        {showSupport && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-xl glass-card rounded-[3rem] p-12 text-center border border-white/50 shadow-3xl"
            >
              <span className="material-symbols-outlined text-7xl text-lumina-primary mb-8">support_agent</span>
              <h2 className="text-5xl font-black mb-6 text-slate-900 uppercase tracking-tighter">Lumina Support</h2>
              <p className="text-lg font-bold text-slate-500 mb-10 leading-relaxed">Our mission control specialists are available 24/7 to assist with network anomalies and system integration.</p>
              <div className="flex flex-col gap-6">
                <button className="w-full py-5 bg-lumina-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-lumina-primary/30">Start Live Chat</button>
                <button onClick={() => setShowSupport(false)} className="w-full py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase tracking-widest text-xs">Dismiss</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="fixed bottom-0 w-full z-50 border-t border-white/20 bg-white/40 backdrop-blur-md flex flex-col md:flex-row justify-between items-center px-16 py-6 gap-4 pointer-events-none">
        <div className="text-[10px] font-black tracking-widest text-lumina-primary uppercase pointer-events-auto">
          © 2024 Lumina Logistics. All Systems Operational.
        </div>
        <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest pointer-events-auto">
          <a className="text-slate-400 hover:text-lumina-primary transition-colors" href="#">Privacy</a>
          <a className="text-slate-400 hover:text-lumina-primary transition-colors" href="#">Terms</a>
          <a className="text-slate-400 hover:text-lumina-primary transition-colors" href="#">API Status</a>
        </div>
      </footer>
    </main>
  );
}

const HeroSection = ({ setActiveSection }: { setActiveSection: (s: string) => void }) => (
  <motion.section 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative w-full h-screen flex items-center justify-center pt-16"
  >
    <div className="absolute inset-0 z-0">
      <Image 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3H51JD6nZhwSznt3M3DLiKc1zP2M7E2p_vPvez3xpnIl8PgTLf4NT5m5OB2R_haPQG0rPaYXnSnOYNhrlGlAC6GC42CsUTg5iteEJgxatO_qinq0Y0OqQZ5izGlRpTI76d84o-6VBdHvvxuLzRlhKF_eGv42ezTc4O66y4i63gdzHxpDBFOl43L1vH9Zhgn5Fg08R3Qp3k-oeD4fQLxpl4wQCJY8hWBM21bC628n3j5Nfhei5i8C4PpaTM_mfugoCcjjzfozYfNE"
        alt="Cinematic Logistics"
        fill
        className="object-cover opacity-80"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-lumina-surface/90"></div>
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-10 w-full max-w-4xl mx-auto px-6"
    >
      <div className="bg-white/60 backdrop-blur-[40px] border border-white/50 rounded-[3rem] p-12 md:p-24 shadow-3xl text-center flex flex-col items-center gap-10">
        <motion.h1 
          className="text-5xl md:text-8xl font-black font-headline text-slate-900 tracking-tighter leading-[0.9]"
        >
          Smart Supply Chain <br/>
          <span className="text-lumina-primary">Intelligence</span>
        </motion.h1>
        
        <p className="text-xl md:text-2xl text-slate-600 font-bold uppercase tracking-widest">
          Predict. Prevent. Optimize.
        </p>

        <motion.button 
          onClick={() => setActiveSection('network')}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="group relative bg-lumina-primary text-white font-black font-headline py-6 px-16 rounded-[2rem] shadow-2xl shadow-lumina-primary/40 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <span className="relative z-10 flex items-center gap-4 text-xs uppercase tracking-[0.3em]">
            Explore System
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  </motion.section>
);

const NetworkSection = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <motion.section 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className={`pt-24 min-h-screen relative z-10 transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}
  >
    <div className="p-8 md:p-12 w-full h-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tighter">Global Active Network</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time visibility across 1,248 nodes</p>
        </div>
        
        <div className="flex gap-6">
          {[
            { label: 'Active Vessels', value: '1,248', color: 'text-lumina-primary' },
            { label: 'Network Integrity', value: '98.4%', color: 'text-lumina-secondary' },
            { label: 'Risk Score', value: '12/100', color: 'text-lumina-tertiary' }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-3xl min-w-[160px] border border-white/40">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-[500px] rounded-[3rem] overflow-hidden relative shadow-3xl border border-white/50">
        <Image 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOdVltkF_DNLbGBm_rktzwraeoHJV7uMQha-VQileOBKf9hWw-aGZtwHxr5SaBEfiRNjPjEOugfnKEoOnzzMX4Y_UOyx_inEWBX5erDel4gBrl4s1p9eBTU6jU_nqbEuXXbYQQoDox9Q6rdx73YYUpbLbqRceskl_j1uC9lXEkk-tmZsN-sOUSGDEXs0dQFy66zM8mGTWRRkL14-4kxfBQatlreeUNr3wauf8AkxI_rLpk3gnVWpculE3FzL02OF1i9wKdsNdbLcY"
          alt="Network Globe"
          fill
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] pointer-events-none"></div>
        
        {/* Floating Legend */}
        <div className="absolute bottom-10 left-10 glass-card p-8 rounded-[2rem] w-80 space-y-6">
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Network Legend</h4>
          <div className="space-y-4">
            {[
              { label: 'Primary Hubs', color: 'bg-lumina-primary' },
              { label: 'Transit Routes', color: 'bg-lumina-secondary' },
              { label: 'AI Optimized', color: 'bg-lumina-tertiary' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg`}></div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

const DisruptionSection = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <motion.section 
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -50 }}
    className={`pt-24 min-h-screen relative z-10 transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}
  >
    <div className="p-8 md:p-12 flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="space-y-2">
        <h1 className="text-4xl font-black font-headline text-slate-900 uppercase tracking-tighter">Disruption Analysis</h1>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Real-time smart rerouting active for Western Corridor</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 h-[600px] glass-card rounded-[3rem] relative overflow-hidden shadow-3xl border border-white/50">
          <Image 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9h5UPvm1B0l-_DTruzhn_z0w58LoMy25VrAZGvO9JG9uzh1tra2L_ZoRyLtXZmdHx74_wRmVKwaW--qhn0QtHYh_9_iXa50V0xMAme86hkmM5-_3zSmVStRHaknxmMyTkTgJO0iHKda0Ig1zjn4bnVr2060xTz8vDQ_G6j-s7mYlQv9NehSMImSdidr6Ra-ZZQ961WwsL7K5dCp7fpTKXMpB68PPOledLM9e8dp6Vb8jB0hiQL5zsIE_9dqlqHCI30tSV8pVzvDc"
            alt="Disruption Map"
            fill
            className="object-cover opacity-30 mix-blend-luminosity"
          />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <path className="route-glow-warning" d="M 100 500 C 300 400, 400 300, 700 100" fill="none" stroke="rgba(112, 119, 131, 0.4)" strokeDasharray="8 8" strokeWidth="4" />
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="route-glow" 
              d="M 100 500 C 200 550, 500 400, 700 100" 
              fill="none" 
              stroke="#4da6ff" 
              strokeWidth="6" 
            />
          </svg>
          
          <div className="absolute top-10 left-10 glass-card p-6 rounded-[2rem] border-l-8 border-lumina-primary flex items-start gap-4">
             <span className="material-symbols-outlined text-lumina-primary text-3xl">storm</span>
             <div>
               <h4 className="text-sm font-black text-slate-800 uppercase tracking-tighter">Severe Weather Alert</h4>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">I-90 Eastbound - Rerouting Suggested</p>
             </div>
          </div>
        </div>

        <div className="xl:col-span-4 flex flex-col gap-8">
          <div className="glass-card p-8 rounded-[3rem] flex-1 space-y-8 border border-white/50 shadow-2xl">
            <h3 className="text-2xl font-black font-headline text-slate-900 uppercase tracking-tighter">Smart Reroute</h3>
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-slate-100/50 border border-slate-200">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original</p>
                  <span className="text-[10px] font-black text-error uppercase tracking-widest">+45m</span>
                </div>
                <p className="text-lg font-black text-slate-800 mt-2">Via I-90 E</p>
              </div>
              <div className="p-6 rounded-3xl bg-lumina-primary/10 border border-lumina-primary/30">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black text-lumina-primary uppercase tracking-widest">Optimized</p>
                  <span className="text-[10px] font-black text-lumina-secondary uppercase tracking-widest">On Time</span>
                </div>
                <p className="text-lg font-black text-slate-800 mt-2">Via SR-520</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 rounded-[3rem] bg-lumina-tertiary text-white shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-1/4 -translate-y-1/4">
               <span className="material-symbols-outlined text-9xl">auto_awesome</span>
            </div>
            <div className="relative z-10 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em]">Lumina AI Insight</h4>
              <p className="text-sm font-bold leading-relaxed">Rerouting prevented a potential temperature compliance breach for Unit 819. Efficiency metrics updated globally.</p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group">
                Full Report <span className="material-symbols-outlined text-xs group-hover:translate-x-2 transition-transform">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.section>
);

const IntelligenceSection = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className={`pt-24 min-h-screen p-8 transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}
  >
    <header className="mb-12">
      <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Predictive Intelligence</h2>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Deep learning neural mesh analyzing global throughput patterns</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {[
        { label: 'Neural Throughput', value: '850 TOPs', trend: '+12%', color: 'text-lumina-primary' },
        { label: 'Prediction Accuracy', value: '99.2%', trend: '+0.4%', color: 'text-lumina-secondary' },
        { label: 'Nodes Synchronized', value: '42/42', trend: 'Stable', color: 'text-lumina-tertiary' },
      ].map((m, i) => (
        <div key={i} className="glass-card p-8 rounded-[2rem] border border-white/40">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{m.label}</p>
          <div className="flex justify-between items-end">
            <h3 className={`text-4xl font-black ${m.color} tracking-tighter`}>{m.value}</h3>
            <span className="text-xs font-bold text-slate-500">{m.trend}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
      <div className="glass-card p-10 rounded-[3rem] min-h-[400px] border border-white/50 shadow-3xl">
        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-8">Throughput Probability Mesh</h3>
        <div className="flex items-end gap-3 h-64">
          {[40, 70, 45, 90, 65, 80, 95, 55, 75, 60, 85, 50].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              className="flex-1 bg-gradient-to-t from-lumina-primary/40 to-lumina-primary rounded-t-xl"
            />
          ))}
        </div>
      </div>

      <div className="glass-card p-10 rounded-[3rem] border-l-[12px] border-l-lumina-primary bg-lumina-primary/5 shadow-3xl">
        <div className="flex items-center gap-4 mb-8 text-lumina-primary">
          <span className="material-symbols-outlined text-4xl">psychology</span>
          <h3 className="text-2xl font-black uppercase tracking-tighter">AI Core Decision Log</h3>
        </div>
        <div className="space-y-8">
          {[
            'Optimized North Atlantic route for Vessel L-402',
            'Predicted 15% surge in Pacific corridor throughput',
            'Synchronized temperature sensors for Unit 819',
            'Automated node balancing for Mumbai-Singapore hub',
          ].map((log, i) => (
            <div key={i} className="flex gap-6 items-start">
              <div className="w-2 h-2 rounded-full bg-lumina-primary mt-2"></div>
              <p className="text-base font-bold text-slate-700 leading-relaxed">{log}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

const SolutionsSection = ({ isOptimizing, setIsOptimizing, isCollapsed }: { isOptimizing: boolean, setIsOptimizing: (b: boolean) => void, isCollapsed: boolean }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleOptimize = () => {
    setIsOptimizing(true);
  };

  useEffect(() => {
    if (isOptimizing) {
       
      setIsComplete(false);
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => setIsComplete(false), 3000);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOptimizing]);

  return (
    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className={`pt-24 min-h-screen p-8 transition-all duration-300 ${isCollapsed ? 'lg:pl-32' : 'lg:pl-80'}`}
    >
      <header className="mb-12">
        <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Network Solutions</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-2">Deploying automated fleet management and node optimization protocols</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        <div className="xl:col-span-8 space-y-8">
          <div className="glass-card p-10 rounded-[3rem] border border-white/50 shadow-3xl">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-10">Active Optimization Protocols</h3>
            <div className="space-y-6">
              {[
                { id: 'S-204', type: 'Fleet Optimization', status: 'Running', impact: '+15% efficiency', icon: 'auto_awesome' },
                { id: 'S-911', type: 'Emergency Rerouting', status: 'Standby', impact: 'N/A', icon: 'emergency' },
                { id: 'S-442', type: 'Temperature Guardian', status: 'Active', impact: 'Zero loss', icon: 'thermostat' },
              ].map((sol, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-8 rounded-3xl bg-slate-50/50 border border-slate-200/50 group hover:bg-lumina-primary/5 transition-all duration-300"
                >
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-lumina-primary/10 flex items-center justify-center text-lumina-primary border border-lumina-primary/20">
                      <span className="material-symbols-outlined text-3xl">{sol.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-800 tracking-tighter">{sol.id} - {sol.type}</h4>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{sol.impact}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${sol.status === 'Running' ? 'bg-lumina-secondary/20 text-lumina-secondary' : sol.status === 'Active' ? 'bg-lumina-primary/20 text-lumina-primary' : 'bg-slate-200 text-slate-500'}`}>
                      {sol.status}
                    </span>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-lumina-primary transition-colors cursor-pointer">more_vert</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="glass-card p-10 rounded-[3rem] bg-gradient-to-br from-lumina-secondary/10 to-transparent border border-lumina-secondary/20 shadow-3xl relative overflow-hidden">
            <AnimatePresence>
              {isOptimizing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-8"
                >
                  <div className="w-16 h-16 border-4 border-lumina-secondary border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-lumina-secondary">AI Optimization Active</p>
                </motion.div>
              )}
              {isComplete && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-20 bg-lumina-secondary text-white flex flex-col items-center justify-center gap-4 text-center p-8"
                >
                  <span className="material-symbols-outlined text-6xl">verified</span>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Network Synchronized</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="w-14 h-14 rounded-2xl bg-lumina-secondary/20 flex items-center justify-center text-lumina-secondary mb-8 border border-lumina-secondary/30">
              <span className="material-symbols-outlined text-3xl">rocket_launch</span>
            </div>
            <h3 className="text-2xl font-black text-lumina-secondary uppercase tracking-tighter mb-4">Deploy New Solution</h3>
            <p className="text-sm font-bold text-slate-600 leading-relaxed mb-10">
              Analyze current network anomalies and deploy AI-optimized fleet adjustments in seconds.
            </p>
            <button 
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full py-5 bg-lumina-secondary text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-lumina-secondary/30 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {isOptimizing ? 'Deploying...' : 'Launch Optimizer'}
            </button>
          </div>

          <div className="glass-card p-10 rounded-[3rem] border border-white/50 shadow-3xl text-center">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Network Savings</h4>
            <div className="text-6xl font-black text-lumina-primary tracking-tighter mb-2">$2.4M</div>
            <p className="text-[10px] font-black text-lumina-secondary uppercase tracking-widest">Efficiency GAIN: 14.8%</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
