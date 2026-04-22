"use client";

import { motion } from "framer-motion";
import { socialTrends, nationalSentiment, regionalMood } from "@/lib/sentiment-data";

export default function SentimentWidget() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-surface-container-low rounded-3xl p-10 border border-outline-variant/10 shadow-2xl overflow-hidden relative isolate">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10 animate-pulse" />

      {/* Left: National Mood Gauge */}
      <div className="lg:col-span-4 flex flex-col items-center">
         <h3 className="font-headline font-black text-sm uppercase tracking-[0.2em] text-on-surface-variant mb-10 self-start">National Mood Pulse</h3>
         
         <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
               <circle 
                 cx="128" cy="128" r="110" 
                 className="stroke-surface-container-highest fill-none" 
                 strokeWidth="20"
               />
               <motion.circle 
                 cx="128" cy="128" r="110" 
                 className="stroke-primary fill-none" 
                 strokeWidth="20"
                 strokeDasharray="690"
                 initial={{ strokeDashoffset: 690 }}
                 whileInView={{ strokeDashoffset: 690 - (690 * nationalSentiment.score / 100) }}
                 viewport={{ once: true }}
                 transition={{ duration: 2, ease: "circOut" }}
                 strokeLinecap="round"
               />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="font-headline text-6xl font-black tracking-tighter text-on-background">
                  {nationalSentiment.score}%
               </span>
               <span className="text-[10px] font-black uppercase tracking-widest text-primary mt-2">{nationalSentiment.label}</span>
            </div>
         </div>

         <div className="mt-10 flex gap-12">
            <div className="text-center">
               <p className="text-[10px] font-black text-on-surface-variant uppercase mb-1">Status</p>
               <p className="font-headline font-bold text-lg text-on-surface">Stable</p>
            </div>
            <div className="text-center">
               <p className="text-[10px] font-black text-on-surface-variant uppercase mb-1">Conflict</p>
               <p className="font-headline font-bold text-lg text-error">Low</p>
            </div>
         </div>
      </div>

      {/* Right: Trending Feed & Regional Breakdown */}
      <div className="lg:col-span-8 space-y-8">
         <div>
            <h3 className="font-headline font-black text-sm uppercase tracking-[0.2em] text-on-surface-variant mb-6">Trending Electoral Dialogues</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {socialTrends.map((trend, i) => (
                  <motion.div 
                    key={trend.tag}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex justify-between items-center p-4 rounded-2xl bg-surface-container-high/50 border border-outline-variant/10 group hover:bg-surface-container-highest transition-all"
                  >
                     <div className="flex flex-col">
                        <span className="text-xs font-black text-primary group-hover:underline cursor-pointer">{trend.tag}</span>
                        <span className="text-[9px] font-bold text-on-surface-variant mt-1 opacity-60">{trend.count} posts</span>
                     </div>
                     <div className="text-right">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${
                          trend.sentiment === 'positive' ? 'bg-secondary/10 text-secondary' :
                          trend.sentiment === 'negative' ? 'bg-error/10 text-error' :
                          'bg-surface-container-highest text-on-surface-variant'
                        }`}>
                           {trend.sentiment}
                        </span>
                        <p className="text-[10px] font-black text-on-surface mt-1">{trend.growth}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         <div className="pt-8 border-t border-outline-variant/10">
            <h3 className="font-headline font-black text-sm uppercase tracking-[0.2em] text-on-surface-variant mb-6">Regional Confidence Vectors</h3>
            <div className="grid grid-cols-4 gap-4">
               {regionalMood.map(r => (
                  <div key={r.region} className="space-y-2">
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black text-on-surface uppercase tracking-widest">{r.region}</span>
                        <span className="text-[9px] font-bold text-on-surface-variant">{r.mood}%</span>
                     </div>
                     <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${r.mood}%` }}
                          className="h-full bg-on-background/30"
                        />
                     </div>
                     <p className="text-[8px] font-black text-secondary tracking-widest uppercase truncate">{r.sentiment}</p>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
}
