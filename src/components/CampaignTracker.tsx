"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface CampaignData {
  parties: { name: string; symbol: string; candidate: string; majorPromise: string }[];
  hotSeats: { name: string; status: string; keyIssue: string }[];
  campaignTrail: { event: string; leader: string; location: string; time: string }[];
}

export default function CampaignTracker({ scope, stateName }: { scope: string, stateName: string }) {
  const [data, setData] = useState<CampaignData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCampaignData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/gemini", {
          method: "POST",
          body: JSON.stringify({ 
            type: "campaign_intel", 
            query: `Provide a detailed briefing on the 2024 election campaign ${scope === "State" ? `for the state of ${stateName}` : "at the National level"} in India.`
          }),
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch campaign data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaignData();
  }, [scope, stateName]);

  if (isLoading || !data) return (
    <div className="h-64 flex flex-col items-center justify-center gap-4 bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 animate-pulse">
       <span className="material-symbols-outlined text-4xl text-primary animate-spin">sync</span>
       <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Gathering Campaign Intelligence...</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Parties Standing */}
      <div className="lg:col-span-8 bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-xl">
        <header className="mb-8 flex justify-between items-end">
           <div>
              <p className="text-secondary font-black text-[10px] uppercase tracking-widest mb-1">Electoral Competition</p>
              <h3 className="text-3xl font-headline font-black tracking-tighter text-on-background">Parties in the Arena</h3>
           </div>
           <span className="text-[9px] font-black px-3 py-1 bg-secondary/10 text-secondary rounded-full uppercase tracking-widest border border-secondary/20">
             {scope === "State" ? stateName : "National"} Scope
           </span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {(data.parties || []).map((party, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="p-6 bg-surface-container-high rounded-2xl border border-outline-variant/5 hover:border-secondary/20 transition-all group"
             >
                <div className="flex justify-between items-start mb-4">
                   <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                      {party.symbol}
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-black text-on-surface-variant uppercase mb-1">Lead Candidate</p>
                      <p className="text-xs font-black text-on-surface">{party.candidate}</p>
                   </div>
                </div>
                <h4 className="font-headline font-black text-lg text-on-background mb-2">{party.name}</h4>
                <p className="text-[10px] font-bold text-on-surface-variant leading-relaxed opacity-70">
                   <span className="text-secondary mr-2">PROMISE:</span>
                   {party.majorPromise}
                </p>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Hot Seats & Trail */}
      <div className="lg:col-span-4 space-y-8">
         <div className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-xl">
            <h3 className="font-headline font-black text-sm uppercase tracking-widest text-on-surface-variant mb-6">Hot Seat Intelligence</h3>
            <div className="space-y-4">
               {(data.hotSeats || []).map((seat, i) => (
                 <div key={i} className="flex justify-between items-center p-4 bg-surface-container-high rounded-xl border border-outline-variant/5">
                    <div>
                       <p className="text-xs font-black text-on-surface">{seat.name}</p>
                       <p className="text-[9px] font-bold text-primary uppercase tracking-tighter mt-0.5">{seat.keyIssue}</p>
                    </div>
                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-error/10 text-error uppercase tracking-widest border border-error/20 animate-pulse">{seat.status}</span>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-surface-container-low rounded-[2.5rem] p-8 border border-outline-variant/10 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <span className="material-symbols-outlined text-4xl">route</span>
            </div>
            <h3 className="font-headline font-black text-sm uppercase tracking-widest text-on-surface-variant mb-6">Campaign Trail Live</h3>
            <div className="space-y-6 relative">
               <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-outline-variant/10" />
               {(data.campaignTrail || []).map((event, i) => (
                 <div key={i} className="pl-6 relative">
                    <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background" />
                    <p className="text-xs font-black text-on-surface leading-tight">{event.leader}: {event.event}</p>
                    <div className="flex justify-between items-center mt-2">
                       <span className="text-[9px] font-bold text-on-surface-variant opacity-60 uppercase">{event.location}</span>
                       <span className="text-[9px] font-black text-primary uppercase">{event.time}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
