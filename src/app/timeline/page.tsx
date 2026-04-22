"use client";

import Sidebar from "@/components/Sidebar";
import ReadinessWizard from "@/components/ReadinessWizard";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { db } from "@/lib/firebase-config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const steps = [
  {
    id: "announcement",
    title: "Election Announcement",
    date: "MARCH 16",
    desc: "The ECI announces the schedule, and the Model Code of Conduct (MCC) immediately comes into effect.",
    videoId: "M99yX-e6m7A", 
    duration: "1 Week"
  },
  {
    id: "nomination",
    title: "Nomination & Scrutiny",
    date: "MARCH 20 - APRIL 05",
    desc: "Candidates file nomination papers. ECI officials scrutinize these to ensure eligibility criteria are met.",
    videoId: "jH_fX9J30L0",
    duration: "2 Weeks"
  },
  {
    id: "campaign",
    title: "Voter Campaigning",
    date: "APRIL 06 - JUNE 01",
    desc: "Political parties engage in public outreach. Campaigning must stop 48 hours before the polling day.",
    videoId: "M99yX-e6m7A",
    duration: "6 Weeks"
  },
  {
    id: "voting",
    title: "Electronic Voting (EVM)",
    date: "PHASE WISE",
    desc: "Citizens cast their votes using Electronic Voting Machines (EVM) with VVPAT verification.",
    videoId: "jH_fX9J30L0",
    duration: "Daily by Phase"
  },
  {
    id: "counting",
    title: "Counting & Tallying",
    date: "JUNE 04",
    desc: "Votes are counted under high security presence. Each vote is tallyed against VVPAT slips in random booths.",
    videoId: "M99yX-e6m7A",
    duration: "24 Hours"
  },
  {
    id: "results",
    title: "Declaration of Results",
    date: "JUNE 04 EVENING",
    desc: "Final results are announced for each constituency. The winning party/alliance is invited to form government.",
    videoId: "jH_fX9J30L0",
    duration: "Immediate"
  }
];

export default function Timeline() {
  const { user, profile, login } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [wizardOpen, setWizardOpen] = useState(false);

  useEffect(() => {
    if (user && !profile?.readinessCompleted) {
      setWizardOpen(true);
    }
  }, [user, profile]);

  const toggleComplete = async (stepId: string) => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const isCompleted = profile?.completedSteps?.includes(stepId);

    await updateDoc(userRef, {
      completedSteps: isCompleted ? arrayRemove(stepId) : arrayUnion(stepId),
      points: isCompleted ? (profile.points - 10) : (profile.points + 10)
    });
  };

  const completedCount = profile?.completedSteps?.length || 0;
  const journeyProgress = (completedCount / steps.length) * 100;

  return (
    <div className="flex bg-background min-h-screen transition-colors overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-20 flex flex-col h-screen overflow-hidden relative">
        
        <AnimatePresence>
          {wizardOpen && user && (
            <ReadinessWizard 
              uid={user.uid} 
              onComplete={() => setWizardOpen(false)} 
            />
          )}
        </AnimatePresence>

        <header className="px-12 pt-16 mb-8 relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 mb-2">
               <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] font-label">Civic Intelligence</p>
               {user && (
                 <span className="px-2 py-0.5 rounded-full bg-secondary/20 text-secondary text-[8px] font-black uppercase tracking-widest border border-secondary/20">Citizen Journey Active</span>
               )}
            </div>
            <h1 className="text-4xl lg:text-7xl font-headline font-black tracking-tighter text-on-background">Election Pathway</h1>
          </motion.div>
          
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Global Progress</span>
            <div className="flex gap-2">
              {steps.map((step, i) => {
                const isPersonalComplete = profile?.completedSteps?.includes(step.id);
                return (
                  <button 
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 relative ${activeStep === i ? "bg-primary scale-125 shadow-lg shadow-primary/30" : "bg-surface-container-high"}`}
                  >
                    {isPersonalComplete && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full border border-background" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </header>

        <div className="flex-1 px-12 pb-12 flex flex-col lg:flex-row gap-12 overflow-hidden">
           <div className="lg:w-96 flex flex-col gap-3 overflow-y-auto pr-4 scrollbar-hide">
              {steps.map((step, i) => {
                const isPersonalComplete = profile?.completedSteps?.includes(step.id);
                return (
                  <button 
                    key={step.id}
                    onClick={() => setActiveStep(i)}
                    className={`flex flex-col p-6 rounded-2xl border text-left transition-all duration-500 relative group ${
                      activeStep === i 
                        ? "bg-primary/10 border-primary shadow-xl shadow-primary/10 translate-x-2" 
                        : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container opacity-60"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                       <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === i ? "text-primary" : "text-on-surface-variant"}`}>Step 0{i+1} — {step.date}</span>
                       {isPersonalComplete && (
                         <span className="material-symbols-outlined text-secondary text-sm font-black">check_circle</span>
                       )}
                    </div>
                    <h3 className="text-xl font-black font-headline">{step.title}</h3>
                  </button>
                );
              })}
           </div>

           <div className="flex-1 flex flex-col gap-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 flex flex-col gap-8"
                >
                  <div className="aspect-video w-full glass-card rounded-[2rem] overflow-hidden shadow-3xl bg-surface relative group">
                    <YouTube 
                      videoId={steps[activeStep].videoId}
                      opts={{ width: '100%', height: '100%', playerVars: { autoplay: 0, modestbranding: 1, rel: 0 } }}
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-4 max-w-2xl">
                      <div className="flex items-center gap-4">
                         <div className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
                            {steps[activeStep].duration} Preparation
                         </div>
                         <span className="text-on-surface-variant/40 text-xs font-black uppercase tracking-widest">Digital Consulate Official Education</span>
                      </div>
                      <p className="text-2xl text-on-surface font-body leading-relaxed">
                        {steps[activeStep].desc}
                      </p>
                    </div>

                    {user ? (
                      <button 
                        onClick={() => toggleComplete(steps[activeStep].id)}
                        className={`px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-3 shrink-0 ${
                          profile?.completedSteps?.includes(steps[activeStep].id)
                            ? "bg-secondary/20 text-secondary border border-secondary/30 shadow-secondary/10"
                            : "bg-primary text-on-primary shadow-primary/20 hover:scale-105"
                        }`}
                      >
                         <span className="material-symbols-outlined text-sm">
                           {profile?.completedSteps?.includes(steps[activeStep].id) ? "published_with_changes" : "task_alt"}
                         </span>
                         {profile?.completedSteps?.includes(steps[activeStep].id) ? "Mark Incomplete" : "Complete Milestone (+10)"}
                      </button>
                    ) : (
                      <button 
                        onClick={() => login()}
                        className="px-8 py-5 bg-on-background text-background rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shrink-0"
                      >
                        Login to Track Journey
                      </button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
           </div>
        </div>

        <div className="h-1 bg-surface-container-high relative w-full shrink-0">
           <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${user ? (journeyProgress || 0) : (((activeStep + 1) / steps.length) * 100)}%` }}
              transition={{ duration: 0.8 }}
              className={`h-full shadow-[0_0_20px_rgba(254,152,50,0.5)] ${user ? "bg-secondary" : "bg-primary"}`}
           />
        </div>
      </main>
    </div>
  );
}
