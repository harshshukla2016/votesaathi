"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { db } from "@/lib/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

const wizardSteps = [
  {
    id: "registered",
    title: "Registration Check",
    question: "Are you registered to vote in your current constituency?",
    icon: "person_check",
    color: "primary"
  },
  {
    id: "hasId",
    title: "Document Verification",
    question: "Do you have your physical Voter ID (EPIC) Card or digital copy?",
    icon: "badge",
    color: "secondary"
  },
  {
    id: "knowsBooth",
    title: "Location Awareness",
    question: "Do you know exactly where your designated polling booth is?",
    icon: "near_me",
    color: "tertiary"
  }
];

export default function ReadinessWizard({ uid, onComplete }: { uid: string, onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const handleAnswer = async (answer: boolean) => {
    const currentStep = wizardSteps[stepIndex].id;
    const newAnswers = { ...answers, [currentStep]: answer };
    setAnswers(newAnswers);

    if (stepIndex < wizardSteps.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      // Finalize in Firestore
      try {
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
          readiness: newAnswers,
          readinessCompleted: true
        });
      } catch (e) { console.error(e); }
      
      // Delay slightly for final celebration burst
      setTimeout(() => onComplete(), 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-8 bg-background/80 backdrop-blur-xl">
       {/* CELEBRATION PARTICLES */}
       <AnimatePresence>
          {[1,2,3,4,5,6,7,8].map(i => (
             <motion.div 
               key={`p-${i}`}
               initial={{ scale: 0, x: 0, y: 0 }}
               animate={{ 
                 scale: [0, 1, 0], 
                 x: Math.cos(i * 45) * 200, 
                 y: Math.sin(i * 45) * 200,
                 opacity: [0, 1, 0]
               }}
               transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
               className="absolute w-4 h-4 rounded-full bg-primary/40 blur-sm pointer-events-none"
             />
          ))}
       </AnimatePresence>

       <motion.div 
         initial={{ scale: 0.9, opacity: 0 }}
         animate={{ scale: 1, opacity: 1 }}
         className="w-full max-w-xl glass-card rounded-[3rem] p-12 shadow-3xl border-primary/20 relative overflow-hidden"
       >
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-surface-container flex">
             {wizardSteps.map((_, i) => (
               <div key={i} className={`h-full transition-all duration-500 bg-primary`} style={{ width: `${(i <= stepIndex ? 1 / wizardSteps.length : 0) * 100}%` }} />
             ))}
          </div>

          <AnimatePresence mode="wait">
             <motion.div 
               key={stepIndex}
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -20, opacity: 0 }}
               className="text-center"
             >
                <div className={`w-20 h-20 rounded-3xl bg-surface-container-high flex items-center justify-center mx-auto mb-8 border border-outline-variant/20 shadow-inner`}>
                   <span className="material-symbols-outlined text-4xl text-primary">{wizardSteps[stepIndex].icon}</span>
                </div>
                
                <p className="text-primary font-black text-[10px] uppercase tracking-[0.2em] mb-3">Step {stepIndex + 1} of 3</p>
                <h2 className="text-4xl font-headline font-black tracking-tighter text-on-background mb-6 leading-tight">
                   {wizardSteps[stepIndex].title}
                </h2>
                <p className="text-on-surface-variant font-body text-xl leading-relaxed mb-10">
                   {wizardSteps[stepIndex].question}
                </p>

                <div className="flex gap-4">
                   <button 
                      onClick={() => handleAnswer(true)}
                      className="flex-1 py-5 bg-primary text-on-primary font-black rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                   >
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      YES, DEFINITELY
                   </button>
                   <button 
                      onClick={() => handleAnswer(false)}
                      className="flex-1 py-5 bg-surface-container-high text-on-surface font-black rounded-2xl hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2"
                   >
                      <span className="material-symbols-outlined text-sm">cancel</span>
                      NOT YET
                   </button>
                </div>
             </motion.div>
          </AnimatePresence>
       </motion.div>
    </div>
  );
}
