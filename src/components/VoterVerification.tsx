"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VoterData {
  name: string;
  epic: string;
  state: string;
  constituency: string;
  pollingStation: string;
  status: string;
}

export default function VoterVerification() {
  const [epic, setEpic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [voterData, setVoterData] = useState<VoterData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!epic.trim()) return;

    setIsLoading(true);
    setError(null);
    setVoterData(null);

    try {
      // Simulate API Setu Verification Call
      // Endpoint: https://apisetu.gov.in/certificate/v1/eci/epic
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ 
          type: "voter_verification", 
          epic: epic 
        }),
      });

      if (!res.ok) throw new Error("API Setu Connection Timeout");
      
      const data = await res.json();
      setVoterData(data);
    } catch (error) {
      console.error(error);
      setError("Verification Failed: Unable to synchronize with ECI Gateway via API Setu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
         <span className="material-symbols-outlined text-6xl text-primary font-thin">verified_user</span>
      </div>

      <div className="relative z-10">
        <header className="mb-8">
           <p className="text-primary font-black text-[10px] uppercase tracking-[0.3em] mb-2 font-label">Governance Mesh Integration</p>
           <h3 className="text-3xl font-headline font-black tracking-tighter text-on-background">API Setu Voter Verification</h3>
           <p className="text-xs text-on-surface-variant font-medium mt-2 leading-relaxed max-w-md">
             Securely verify your electoral status directly via the Government of India&apos;s API Setu gateway.
           </p>
        </header>

        <form onSubmit={handleVerify} className="flex gap-4 mb-8">
           <input 
             type="text" 
             value={epic}
             onChange={(e) => setEpic(e.target.value.toUpperCase())}
             placeholder="ENTER EPIC NUMBER (e.g. ABC1234567)"
             className="flex-1 bg-surface-container-high border border-outline-variant/10 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-on-surface placeholder:text-on-surface-variant/40 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
           />
           <button 
             disabled={isLoading}
             className="px-8 py-4 bg-primary text-on-primary font-black text-[10px] uppercase tracking-widest rounded-2xl hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shadow-primary/20 flex items-center gap-2"
           >
              {isLoading ? 'Verifying...' : 'Verify Status'}
              <span className="material-symbols-outlined text-sm">security</span>
           </button>
        </form>

        <AnimatePresence mode="wait">
           {error && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="p-6 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-4"
             >
                <span className="material-symbols-outlined text-error">warning</span>
                <p className="text-xs font-bold text-error">{error}</p>
             </motion.div>
           )}

           {voterData && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0 }}
               className="space-y-6"
             >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10">
                      <p className="text-[10px] font-black text-on-surface-variant uppercase mb-1">Elector Name</p>
                      <p className="text-sm font-black text-on-surface uppercase tracking-tight">{voterData.name}</p>
                   </div>
                   <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10">
                      <p className="text-[10px] font-black text-on-surface-variant uppercase mb-1">Constituency</p>
                      <p className="text-sm font-black text-on-surface uppercase tracking-tight">{voterData.constituency}</p>
                   </div>
                   <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant/10">
                      <p className="text-[10px] font-black text-on-surface-variant uppercase mb-1">Status</p>
                      <p className="text-sm font-black text-secondary uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                        {voterData.status}
                      </p>
                   </div>
                </div>

                <div className="bg-secondary/5 p-8 rounded-[2rem] border border-secondary/20 flex flex-col md:flex-row justify-between items-center gap-6">
                   <div className="flex items-center gap-4 text-center md:text-left">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center">
                         <span className="material-symbols-outlined">how_to_vote</span>
                      </div>
                      <div>
                         <h4 className="font-headline font-black text-on-background">Designated Polling Station</h4>
                         <p className="text-xs text-on-surface-variant font-medium">{voterData.pollingStation}</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => window.dispatchEvent(new CustomEvent("consulate-command", { detail: { intent: "LOCATE_BOOTH" } }))}
                     className="px-8 py-4 bg-secondary text-on-secondary font-black text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 shadow-lg shadow-secondary/20 transition-all"
                   >
                      Navigate to Booth
                   </button>
                </div>
             </motion.div>
           )}
        </AnimatePresence>
      </div>
    </div>
  );
}
