"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

interface FactCheckResult {
  truthScore: number;
  status: "Verified" | "Disputed" | "Misinformation";
  analysis: string;
  credibleSources: string[];
  misleadingElements: string[];
}

export default function TruthCenter() {
  const [claim, setClaim] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const scannerRef = useRef<HTMLDivElement>(null);

  const startScan = async () => {
    if (!claim.trim()) return;
    setIsScanning(true);
    setResult(null);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ type: "fact_check", query: claim }),
      });
      const data = await res.json();
      
      // Artificial delay for scanning effect
      setTimeout(() => {
        setResult(data);
        setIsScanning(false);
      }, 3000);
    } catch (err) {
      console.error("Fact check failed:", err);
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="p-8 lg:p-12 max-w-5xl mx-auto space-y-12">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <motion.div 
               initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary"
            >
               <span className="material-symbols-outlined text-sm font-black">shield_with_heart</span>
               <span className="text-[10px] font-black uppercase tracking-widest">Election Integrity Control</span>
            </motion.div>
            <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tight text-on-background">Truth Center</h1>
            <p className="text-on-surface-variant max-w-md font-body leading-relaxed">
              Verify viral messages, suspicious claims, and deepfake reports using our AI X-Ray detection engine.
            </p>
          </div>
        </header>

        {/* Claim Input Scanner Area */}
        <div className="relative isolate">
          <div className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 shadow-2xl p-1 lg:p-2 overflow-hidden relative">
            
            {/* LASER SCANNER ANIMATION */}
            <AnimatePresence>
               {isScanning && (
                 <motion.div 
                   initial={{ top: "-10%" }}
                   animate={{ top: "110%" }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                   className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(var(--color-primary),0.8)] z-20 pointer-events-none"
                 />
               )}
            </AnimatePresence>

            <textarea 
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder="Paste a viral message or election claim to scan..."
              className="w-full h-64 bg-transparent border-none p-10 text-xl font-body text-on-surface resize-none focus:ring-0 placeholder:text-on-surface-variant/30 transition-all"
              disabled={isScanning}
            />

            <div className="p-6 bg-surface-container rounded-[2rem] flex items-center justify-between">
               <div className="flex items-center gap-4 text-on-surface-variant px-4">
                 <span className="material-symbols-outlined font-thin">info</span>
                 <span className="text-xs">Processing via Saathi Intelligence Core</span>
               </div>
               <button 
                 onClick={startScan}
                 disabled={isScanning || !claim.trim()}
                 className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                   isScanning 
                    ? "bg-surface-container-highest text-on-surface-variant cursor-not-allowed" 
                    : "bg-primary text-on-primary hover:scale-[1.02] shadow-xl shadow-primary/20"
                 }`}
               >
                 {isScanning ? "Scanning Claim..." : "Start AI X-Ray Scan"}
               </button>
            </div>
          </div>
        </div>

        {/* Scan Results Display */}
        <AnimatePresence mode="wait">
           {result && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               className="grid grid-cols-1 lg:grid-cols-12 gap-8"
             >
                {/* Truth Score Gauge */}
                <div className="lg:col-span-4 bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/10 flex flex-col items-center justify-center text-center">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-10">Truth Intelligence Score</h3>
                   
                   <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                      <svg className="w-full h-full -rotate-90">
                         <circle cx="96" cy="96" r="85" className="stroke-surface-container-highest fill-none" strokeWidth="15" />
                         <motion.circle 
                           cx="96" cy="96" r="85" 
                           className={`fill-none ${
                             result.status === 'Verified' ? 'stroke-secondary' : 
                             result.status === 'Disputed' ? 'stroke-primary' : 'stroke-error'
                           }`}
                           strokeWidth="15"
                           strokeDasharray="534"
                           initial={{ strokeDashoffset: 534 }}
                           animate={{ strokeDashoffset: 534 - (534 * result.truthScore / 100) }}
                           transition={{ duration: 1.5, ease: "easeOut" }}
                           strokeLinecap="round"
                         />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <span className="text-5xl font-headline font-black tracking-tighter text-on-background">{result.truthScore}%</span>
                      </div>
                   </div>

                   <p className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest inline-block ${
                      result.status === 'Verified' ? 'bg-secondary/10 text-secondary' : 
                      result.status === 'Disputed' ? 'bg-primary/10 text-primary' : 'bg-error/10 text-error'
                   }`}>
                      {result.status}
                   </p>
                </div>

                {/* Analysis Breakdown */}
                <div className="lg:col-span-8 bg-surface-container-low rounded-[2rem] p-10 border border-outline-variant/10 space-y-10">
                   {/* DIAGNOSTIC ERROR HANDLER */}
                   {('error' in result) ? (
                     <div className="flex flex-col items-center justify-center text-center p-8 space-y-6">
                        <span className="material-symbols-outlined text-6xl text-primary font-thin">settings_suggest</span>
                        <div>
                           <h4 className="text-xl font-headline font-black text-on-background">{(result as any).error}</h4>
                           <p className="text-sm text-on-surface-variant mt-2">{(result as any).diagnostic}</p>
                        </div>
                        <button 
                          onClick={() => setResult(null)}
                          className="px-8 py-3 bg-primary text-on-primary rounded-xl font-black text-[10px] uppercase tracking-widest"
                        >
                          Restart Intelligence Scan
                        </button>
                     </div>
                   ) : (
                     <>
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-primary">AI Verdict Analysis</h4>
                           <p className="text-xl font-body leading-relaxed text-on-surface">{result.analysis}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-outline-variant/10">
                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Misleading Elements Detected</h4>
                              <div className="flex flex-wrap gap-2">
                                 {Array.isArray(result.misleadingElements) && result.misleadingElements.map((el, i) => (
                                   <span key={i} className="px-3 py-1.5 rounded-lg bg-error/5 text-error text-[10px] font-black uppercase border border-error/10">
                                     {el}
                                   </span>
                                 ))}
                              </div>
                           </div>
                           <div className="space-y-4">
                              <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Verified Sources</h4>
                              <div className="space-y-2">
                                 {Array.isArray(result.credibleSources) && result.credibleSources.map((source, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-secondary">
                                       <span className="material-symbols-outlined text-[10px] font-black">verified</span>
                                       <span className="font-bold underline decoration-secondary/30">{source}</span>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </>
                   )}
                </div>
             </motion.div>
           )}
        </AnimatePresence>

        {/* Global Viral Claims Ticker */}
        <section className="pt-12 border-t border-outline-variant/10">
           <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant mb-10 text-center">Global Verified Claims Stream</h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { claim: "EVMs can be hacked via Bluetooth", status: "False", score: 2 },
                { claim: "Voter ID mandatory for polling", status: "Verified", score: 98 },
                { claim: "Elections postponed in Punjab", status: "Disputed", score: 45 }
              ].map((item, i) => (
                <div key={i} className="bg-surface-container-low/50 p-6 rounded-2xl border border-outline-variant/5">
                   <div className="flex justify-between items-center mb-3">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.status === 'Verified' ? 'bg-secondary/10 text-secondary' : 'bg-error/10 text-error'}`}>
                         {item.status}
                      </span>
                      <span className="text-[9px] font-bold text-on-surface-variant">{item.score}% Confidence</span>
                   </div>
                   <p className="text-sm font-bold text-on-surface leading-tight">"{item.claim}"</p>
                </div>
              ))}
           </div>
        </section>

      </main>
    </div>
  );
}
