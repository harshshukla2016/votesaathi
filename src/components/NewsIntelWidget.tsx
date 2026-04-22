"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { rawNewsArticles, NewsArticle } from "@/lib/news-data";

interface IntelBriefing {
  shortSummary: string;
  keyTakeaways: string[];
  biasAssessment: {
    score: number;
    label: string;
    reasoning: string;
  };
  verifiedFacts: string[];
}

export default function NewsIntelWidget() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [briefing, setBriefing] = useState<IntelBriefing | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getIntelligence = async (article: NewsArticle) => {
    setSelectedArticle(article);
    setBriefing(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ type: "news_intelligence", rawContent: article.rawContent }),
      });
      const data = await res.json();
      setBriefing(data);
    } catch (err) {
      console.error("News intelligence failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* Raw Feed List */}
      <div className="space-y-4">
        <h3 className="font-headline font-black text-sm uppercase tracking-widest text-on-surface-variant mb-6">Raw Electoral Feed</h3>
        {rawNewsArticles.map((article) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border transition-all cursor-pointer group ${selectedArticle?.id === article.id ? 'bg-primary/10 border-primary shadow-xl shadow-primary/10' : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high'}`}
            onClick={() => getIntelligence(article)}
          >
            <div className="flex justify-between items-start mb-2">
               <span className="text-[10px] font-black text-primary uppercase tracking-widest">{article.source}</span>
               <span className="text-[9px] font-bold text-on-surface-variant opacity-60">{article.timestamp}</span>
            </div>
            <h4 className="font-headline font-black text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors">{article.title}</h4>
            <div className="flex items-center justify-between">
               <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant uppercase tracking-widest">{article.category}</span>
               <span className="text-[10px] font-black text-primary flex items-center gap-1">
                  Summarize with Saathi <span className="material-symbols-outlined text-sm">bolt</span>
               </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Intelligence Display */}
      <div className="glass-card rounded-[2.5rem] p-10 min-h-[500px] flex flex-col relative overflow-hidden border-outline-variant/10">
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-8"
            >
               <span className="material-symbols-outlined text-6xl text-primary/20 mb-6 font-thin">intelligence</span>
               <h3 className="text-xl font-headline font-black text-on-surface opacity-40">Select an article to generate an Intelligence Briefing</h3>
            </motion.div>
          ) : isLoading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
               <div className="w-20 h-20 relative">
                  <div className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <div className="absolute inset-4 border-4 border-secondary/20 border-b-secondary rounded-full animate-spin-slow"></div>
               </div>
               <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-primary animate-pulse">Saathi is Analyzing Bias...</p>
            </motion.div>
          ) : briefing ? (
            <motion.div 
              key="content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
               {/* DIAGNOSTIC OVERLAY FOR OFFLINE AI */}
               {('error' in briefing) ? (
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                    <span className="material-symbols-outlined text-4xl text-primary mb-4">settings_suggest</span>
                    <h3 className="font-headline font-black text-on-background mb-2">{(briefing as any).error}</h3>
                    <p className="text-xs text-on-surface-variant font-body mb-6">{(briefing as any).diagnostic}</p>
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="px-6 py-2 bg-surface-container-high rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all"
                    >
                      Dismiss Diagnostic
                    </button>
                 </div>
               ) : (
                 <>
                   <div className="flex justify-between items-start border-b border-outline-variant/10 pb-6">
                      <div>
                         <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">Intelligence Briefing</p>
                         <h3 className="text-3xl font-headline font-black tracking-tighter text-on-background">{selectedArticle.source} Analysis</h3>
                      </div>
                      <div className="text-right">
                         <p className="text-[9px] font-black text-on-surface-variant uppercase mb-1">Bias Rating</p>
                         <p className={`text-sm font-black uppercase tracking-widest ${
                           briefing.biasAssessment?.label === 'Neutral' ? 'text-secondary' :
                           briefing.biasAssessment?.label === 'Leaning' ? 'text-primary' : 'text-error'
                         }`}>
                            {briefing.biasAssessment?.label || 'Unknown'} ({briefing.biasAssessment?.score || 0}/100)
                         </p>
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                         <h4 className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">AI Synthesis</h4>
                         <p className="text-lg font-body text-on-surface leading-relaxed italic">"{briefing.shortSummary}"</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Key Takeaways</h4>
                            <ul className="space-y-2">
                               {briefing.keyTakeaways?.map((point, i) => (
                                 <li key={i} className="text-xs text-on-surface flex gap-3 leading-snug">
                                    <span className="text-primary font-black">•</span> {point}
                                 </li>
                               ))}
                            </ul>
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Verified Facts</h4>
                            <ul className="space-y-2">
                               {briefing.verifiedFacts?.map((fact, i) => (
                                 <li key={i} className="text-xs text-secondary-dim flex gap-3 leading-snug">
                                    <span className="material-symbols-outlined text-[10px] font-black">verified</span> {fact}
                                 </li>
                               ))}
                            </ul>
                         </div>
                      </div>

                      <div className="pt-6 border-t border-outline-variant/10">
                         <h4 className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest mb-3">Bias Insight</h4>
                         <p className="text-xs text-on-surface-variant opacity-80 leading-relaxed font-body">{briefing.biasAssessment?.reasoning}</p>
                      </div>
                   </div>

                   <button 
                    onClick={() => setSelectedArticle(null)}
                    className="w-full py-4 bg-surface-container-high text-on-surface font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-surface-container-highest transition-all"
                   >
                     Close Intelligence Review
                   </button>
                 </>
               )}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
