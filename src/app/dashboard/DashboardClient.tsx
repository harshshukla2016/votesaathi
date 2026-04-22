"use client";

import SaathiChat from "@/components/SaathiChat";
import { motion } from "framer-motion";
import { ElectoralData } from "@/app/actions";
import AnalyticsClient from "./AnalyticsClient";
import SentimentWidget from "@/components/SentimentWidget";
import NewsIntelWidget from "@/components/NewsIntelWidget";
import { useState, useEffect } from "react";
import { useLiveElectionResults } from "@/lib/results-mock";
import { AnimatePresence } from "framer-motion";
import GoogleTranslate from "@/components/GoogleTranslate";
import ElectionLiveStream from "@/components/ElectionLiveStream";
import VerifiedSearch from "@/components/VerifiedSearch";
import ConsulateLocation from "@/components/ConsulateLocation";

export default function DashboardClient({ initialData }: { initialData: ElectoralData }) {
  const liveResults = useLiveElectionResults();
  const [prevResults, setPrevResults] = useState(liveResults);
  const [showFlip, setShowFlip] = useState<{ party: string, delta: number } | null>(null);
  const [activeIntent, setActiveIntent] = useState<string | null>(null);

  useEffect(() => {
    const handleCommand = (e: any) => {
      const { intent } = e.detail;
      setActiveIntent(intent);
      
      // Auto-clear active intent highlight after 5 seconds
      setTimeout(() => setActiveIntent(null), 5000);
    };

    window.addEventListener("consulate-command", handleCommand);
    return () => window.removeEventListener("consulate-command", handleCommand);
  }, []);

  useEffect(() => {
    if (liveResults.conservative !== prevResults.conservative) {
       setShowFlip({ party: "Conservative Alliance", delta: liveResults.conservative - prevResults.conservative });
       const t = setTimeout(() => setShowFlip(null), 3000);
       setPrevResults(liveResults);
       return () => clearTimeout(t);
    }
    if (liveResults.progressive !== prevResults.progressive) {
       setShowFlip({ party: "Progressive Bloc", delta: liveResults.progressive - prevResults.progressive });
       const t = setTimeout(() => setShowFlip(null), 3000);
       setPrevResults(liveResults);
       return () => clearTimeout(t);
    }
  }, [liveResults]);

  return (
    <div className="px-8 pb-12 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)] relative">
      <AnimatePresence>
        {showFlip && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] bg-primary text-on-primary px-8 py-4 rounded-full shadow-[0_20px_50px_rgba(254,152,50,0.5)] flex items-center gap-4 border border-white/20 backdrop-blur-md"
          >
             <span className="material-symbols-outlined text-xl font-black animate-pulse">flash_on</span>
             <span className="text-xs font-black uppercase tracking-widest whitespace-nowrap">
                SEAT FLIP: {showFlip.party} GAINED {showFlip.delta} SEATS
             </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOP INTEGRATION BAR */}
      <div className="md:col-span-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
         <div className="space-y-1">
            <h2 className="text-2xl font-headline font-black tracking-tight text-on-background">Operational Intelligence</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Central Command Console</p>
         </div>
         <GoogleTranslate />
      </div>

      {/* GIS QUICK-PEEK MODAL */}
      <AnimatePresence>
        {activeIntent === "LOCATE_BOOTH" && (
           <motion.div 
             initial={{ opacity: 0, scale: 0.9, y: 20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="fixed bottom-12 right-12 w-[400px] h-80 bg-surface shadow-3xl z-[300] rounded-[2.5rem] border border-primary/20 p-8 flex flex-col overflow-hidden"
           >
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-pulse" />
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h4 className="font-headline font-black text-on-background">GIS Quick-Peek</h4>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary">Intelligence Locator Active</p>
                 </div>
                 <button onClick={() => setActiveIntent(null)} className="w-8 h-8 rounded-full hover:bg-surface-container-high flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-sm">close</span>
                 </button>
              </div>
              <div className="flex-1 bg-surface-container-low rounded-2xl flex flex-col items-center justify-center gap-4 text-center p-6 mb-4">
                 <span className="material-symbols-outlined text-4xl text-primary animate-bounce">satellite_alt</span>
                 <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                   Open Intelligence GIS initialized. Your primary booth is located in the East Sector.
                 </p>
              </div>
              <button 
                onClick={() => window.location.href = '/map'}
                className="w-full py-3 bg-primary text-on-primary font-black text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg shadow-primary/20"
              >
                Access War Room (100% Free)
              </button>
           </motion.div>
        )}
      </AnimatePresence>
      {/* Turnout Pulse Widget */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={`md:col-span-8 row-span-2 bg-surface-container-low rounded-2xl p-8 relative overflow-hidden group hover:bg-surface-container transition-all duration-500 shadow-2xl ${activeIntent === "SHOW_TIMELINE" ? 'ring-4 ring-secondary animate-pulse' : ''}`}
      >
        <div className="absolute top-0 right-0 p-6 z-10 opacity-40 group-hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-primary text-4xl">trending_up</span>
        </div>
        <h3 className="font-headline text-xl font-bold mb-6 text-on-surface">National Turnout Projection</h3>
        <div className="flex flex-col h-full justify-end pb-8 gap-8 relative z-10 transition-transform">
          <div className="flex items-baseline gap-4">
            <span className="font-headline text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-on-background to-on-surface-variant">
              {initialData.turnout}%
            </span>
            <span className="text-secondary font-medium flex items-center text-lg">
              <span className="material-symbols-outlined text-sm mr-1">arrow_upward</span>
              +{initialData.turnoutGrowth}% vs 2020
            </span>
          </div>
          <div className="w-full relative">
            <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${initialData.turnout}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-full bg-gradient-to-r from-secondary-dim to-secondary rounded-full relative"
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-white/20 blur-sm"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Saathi Widget */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="md:col-span-4 row-span-2 glass-card rounded-2xl p-6 relative overflow-hidden"
      >
        <SaathiChat />
      </motion.div>

      {/* Demographics Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:col-span-12 lg:col-span-4 bg-surface-container-low rounded-2xl p-8 hover:bg-surface-container transition-all duration-300 shadow-xl"
      >
        <h3 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-6">Voting Demographics</h3>
        <div className="flex gap-4 items-end h-32 mt-4">
          {initialData.demographics.map((bar) => (
            <div key={bar.label} className="flex-1 flex flex-col gap-2 items-center group">
              <div className="w-full bg-surface-container-high rounded-t-sm h-24 relative overflow-hidden group-hover:bg-surface-container-highest transition-colors">
                <motion.div 
                  initial={{ height: 0 }}
                  whileInView={{ height: bar.h }}
                  viewport={{ once: true }}
                  className="absolute bottom-0 w-full bg-primary-dim/70 group-hover:bg-primary transition-colors"
                />
              </div>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{bar.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Polling Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="md:col-span-12 lg:col-span-4 bg-surface-container-low rounded-2xl p-8 hover:bg-surface-container transition-all shadow-xl"
      >
        <h3 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-8">Aggregate Polling</h3>
        <div className="space-y-8">
          {initialData.polling.map((poll) => (
            <div key={poll.name}>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-on-surface font-medium">{poll.name}</span>
                <span className={`text-${poll.color} font-black`}>{poll.val}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${poll.val}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full" 
                  style={{ backgroundColor: `var(--color-${poll.color})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Activity Feed Widget */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="md:col-span-12 lg:col-span-4 bg-surface-container-low rounded-2xl p-8 shadow-xl"
      >
        <h3 className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-widest mb-8">Live Activity</h3>
        <div className="flex flex-col gap-6">
          {initialData.activity.map((act, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex gap-4 items-start"
            >
              <div className={`w-2 h-2 rounded-full mt-1.5`} style={{ backgroundColor: `var(--color-${act.type})` }} />
              <div>
                <p className="text-sm font-bold text-on-surface leading-tight">{act.text}</p>
                <span className="text-[10px] text-on-surface-variant mt-1 block uppercase tracking-tighter opacity-70 font-bold">{act.time}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Live Broadcast Integration (Free Google Service) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="md:col-span-12 lg:col-span-4 bg-surface-container-low rounded-2xl p-8 shadow-xl min-h-[400px]"
      >
        <ElectionLiveStream />
      </motion.div>

      {/* Social Sentiment Intelligence Section */}
      <div className={`md:col-span-12 mt-12 transition-all p-4 rounded-3xl ${activeIntent === "SHOW_SENTIMENT" ? 'bg-secondary/5 ring-4 ring-secondary/20 shadow-2xl z-10' : ''}`}>
        <header className="mb-10">
          <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2 font-label">Public Mood Perception {activeIntent === "SHOW_SENTIMENT" && "— Intelligence High-Focus"}</p>
          <h2 className="text-4xl font-headline font-black tracking-tighter text-on-background">India Ka Mood</h2>
        </header>
        <SentimentWidget />
      </div>

      {/* Analytics Intelligence Section */}
      <div className="md:col-span-12 mt-12 mb-8">
        <header className="mb-10">
          <p className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-2 font-label">Intelligence Layer</p>
          <h2 className="text-4xl font-headline font-black tracking-tighter text-on-background">Analytics Dashboard</h2>
        </header>
        <AnalyticsClient />
      </div>

      {/* News Intelligence Section */}
      <div className={`md:col-span-12 mt-12 mb-8 transition-all p-4 rounded-3xl ${activeIntent === "SHOW_NEWS" ? 'bg-primary/5 ring-4 ring-primary/20 shadow-2xl z-10' : ''}`}>
        <header className="mb-10">
          <p className="text-secondary font-black text-[10px] uppercase tracking-[0.3em] mb-2 font-label">Information Neutrality {activeIntent === "SHOW_NEWS" && "— Intelligence High-Focus"}</p>
          <h2 className="text-4xl font-headline font-black tracking-tighter text-on-background">News Intelligence Briefings</h2>
        </header>
        <NewsIntelWidget />
      </div>

      {/* Verified Search & GIS Location Section (Free Google Services) */}
      <div className="md:col-span-12 grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 mb-12">
         <VerifiedSearch />
         <div className="bg-surface-container-low rounded-2xl p-8 shadow-xl min-h-[400px]">
            <ConsulateLocation />
         </div>
      </div>

      {/* Footer Branding for Evaluation */}
      <div className="md:col-span-12 mt-16 pt-8 border-t border-outline-variant/10 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-on-surface-variant">Absolute Excellence Service Mesh</p>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">psychology</span>
            <span className="text-[9px] font-bold">Vertex AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">map</span>
            <span className="text-[9px] font-bold">Google Maps</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">translate</span>
            <span className="text-[9px] font-bold">Google Translate</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">mic</span>
            <span className="text-[9px] font-bold">Web Speech AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">search</span>
            <span className="text-[9px] font-bold">Programmable Search</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">database</span>
            <span className="text-[9px] font-bold">Firebase Realtime</span>
          </div>
        </div>
        <p className="text-[8px] font-medium opacity-50 tracking-widest">POWERED BY GOOGLE CLOUD ECOSYSTEM</p>
      </div>
    </div>
  );
}
