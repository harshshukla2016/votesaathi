"use client";

import { motion } from "framer-motion";
import { questions, candidateInfos } from "./questions";
import Link from "next/link";

interface ResultsViewProps {
  answers: number[];
}

export default function ResultsView({ answers }: ResultsViewProps) {
  // Logic to calculate scores
  const results: Record<string, number> = {};
  
  answers.forEach((ansIndex, qIndex) => {
    const scores = questions[qIndex].options[ansIndex].scores;
    Object.entries(scores).forEach(([bloc, score]) => {
      results[bloc] = (results[bloc] || 0) + score;
    });
  });

  // Sort and get the top bloc
  const sortedResults = Object.entries(results).sort((a, b) => b[1] - a[1]);
  const [topBloc, topScore] = sortedResults[0];
  const totalPossible = answers.length * 15; // Max score per question is 15
  const matchPercentage = Math.round((topScore / totalPossible) * 100);
  
  const info = candidateInfos[topBloc] || { description: "General alignment", color: "primary" };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl w-full"
    >
      <div className="glass-card rounded-[2.5rem] overflow-hidden border-outline-variant/20 shadow-3xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-10 lg:p-16">
          <div className="space-y-8">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-${info.color}/20 text-${info.color} shadow-lg shadow-${info.color}/10`}>
              <span className="material-symbols-outlined text-4xl fill">verified</span>
            </div>
            
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant opacity-60">Your Top Alignment</span>
              <h2 className="text-4xl lg:text-6xl font-headline font-black tracking-tighter text-on-background mt-2">
                {topBloc}
              </h2>
            </div>

            <p className="text-lg text-on-surface-variant font-body leading-relaxed">
              {info.description} Your priorities in economic stability and tech disruption strongly align with the {topBloc}'s 2025 platform.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href="/dashboard"
                className="bg-on-background text-background font-black font-headline py-4 px-10 rounded-xl hover:brightness-110 transition-all flex items-center gap-3"
              >
                View Insight Pulse <span className="material-symbols-outlined">analytics</span>
              </Link>
              <Link 
                href="/"
                className="bg-surface-variant/40 text-on-surface border border-outline-variant/10 font-bold font-headline py-4 px-10 rounded-xl hover:bg-surface-variant transition-all"
              >
                Back to Core
              </Link>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-center border-l border-outline-variant/10 pl-0 lg:pl-12 pt-12 lg:pt-0">
             <div className="relative w-64 h-64 flex items-center justify-center">
                {/* Circular Progress Bar */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-surface-container-highest"
                  />
                  <motion.circle
                    cx="128"
                    cy="128"
                    r="120"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={754} // 2 * PI * r
                    initial={{ strokeDashoffset: 754 }}
                    animate={{ strokeDashoffset: 754 - (754 * matchPercentage) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={`text-${info.color}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-6xl font-black font-headline text-on-background">{matchPercentage}%</span>
                   <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-60">Match Score</span>
                </div>
             </div>

             <div className="mt-12 w-full space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant mb-4">Other Alignments</h4>
               {sortedResults.slice(1, 3).map(([bloc, score]) => {
                 const otherPct = Math.round((score / totalPossible) * 100);
                 const otherInfo = candidateInfos[bloc] || { color: "surface-variant" };
                 return (
                   <div key={bloc} className="w-full">
                     <div className="flex justify-between text-xs font-bold mb-1">
                       <span className="text-on-surface">{bloc}</span>
                       <span className="text-on-surface-variant opacity-60">{otherPct}%</span>
                     </div>
                     <div className="h-1 bg-surface-container rounded-full overflow-hidden">
                       <div 
                        className={`h-full bg-${otherInfo.color}-fixed transition-all duration-1000`} 
                        style={{ width: `${otherPct}%`, backgroundColor: `var(--color-${otherInfo.color})` }} 
                       />
                     </div>
                   </div>
                 );
               })}
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
