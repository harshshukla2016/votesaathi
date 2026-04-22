"use client";

import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { db } from "@/lib/firebase-config";
import { doc, updateDoc, arrayUnion, increment } from "firebase/firestore";

const learningCards = [
  { id: 1, title: "Model Code of Conduct (MCC)", content: "Guidelines issued by ECI to regulate political parties and candidates during elections, ensuring free and fair conduct.", icon: "gavel", color: "primary" },
  { id: 2, title: "EVM & VVPAT", content: "Electronic Voting Machines with Voter Verifiable Paper Audit Trail. Allows you to see a physical proof of your digital vote for 7 seconds.", icon: "how_to_vote", color: "secondary" },
  { id: 3, title: "Section 144", content: "A law that prohibits the assembly of four or more people in a specific area. Used around polling booths to maintain peace.", icon: "security", color: "tertiary" },
];

const quizQuestions = [
  {
    question: "What is the primary purpose of the VVPAT machine in Indian elections?",
    options: ["To count votes faster", "To provide a physical verification of the vote", "To store digital backup of votes", "To allow remote voting"],
    correct: 1,
    points: 25,
    difficulty: "Medium"
  },
  {
    question: "How many days before polling does the 'Silence Period' (Campaigning Ban) start?",
    options: ["12 Hours", "24 Hours", "48 Hours", "72 Hours"],
    correct: 2,
    points: 10,
    difficulty: "Easy"
  }
];

export default function LearnPage() {
  const { user, profile, login } = useAuth();
  const [activeTab, setActiveTab] = useState<'cards' | 'quiz'>('cards');
  const [cardIndex, setCardIndex] = useState(0);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const dragX = useMotionValue(0);
  const rotate = useTransform(dragX, [-200, 200], [-25, 25]);
  const opacity = useTransform(dragX, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (_: any, info: any) => {
    if (Math.abs(info.offset.x) > 100) {
      setCardIndex((prev) => (prev + 1) % learningCards.length);
    }
  };

  const handleAnswer = async (index: number) => {
    const isCorrect = index === quizQuestions[quizIndex].correct;
    if (isCorrect) {
      setQuizScore(prev => prev + quizQuestions[quizIndex].points);
    }

    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
      if (user) {
        // Update points and potentially award badge
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          points: increment(isCorrect ? quizScore + quizQuestions[quizIndex].points : quizScore),
          badges: arrayUnion("Quiz Participant")
        });
      }
    }
  };

  if (!user) {
    return (
      <div className="flex bg-background min-h-screen">
        <Sidebar />
        <main className="flex-1 lg:ml-20 flex flex-col items-center justify-center p-8">
           <div className="glass-card p-12 rounded-[3rem] text-center max-w-md shadow-3xl">
              <span className="material-symbols-outlined text-6xl text-primary mb-6">lock_person</span>
              <h1 className="text-3xl font-black font-headline mb-4 tracking-tighter">Diplomatic Clearance Required</h1>
              <p className="text-on-surface-variant mb-8 font-body">Sign in to start your mastery journey, earn Consulate Credits, and win democracy badges.</p>
              <button onClick={() => login()} className="w-full py-4 bg-primary text-on-primary font-black rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all">Sign In with Google</button>
           </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex bg-background min-h-screen transition-colors overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-20 flex flex-col h-screen overflow-hidden relative">
        <header className="px-12 pt-16 mb-8 relative z-10 flex flex-col items-center text-center">
            <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 font-label">Mastery Center</p>
            <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-background">Democracy Scholar</h1>
            
            <div className="flex gap-4 mt-8 bg-surface-container-low p-1.5 rounded-2xl border border-outline-variant/10">
               <button 
                  onClick={() => setActiveTab('cards')}
                  className={`px-8 py-2.5 rounded-xl font-headline font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'cards' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-background'}`}
               >
                  Bite-Sized Learning
               </button>
               <button 
                  onClick={() => setActiveTab('quiz')}
                  className={`px-8 py-2.5 rounded-xl font-headline font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'quiz' ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface-variant hover:text-on-background'}`}
               >
                  Civic Mastery Quiz
               </button>
            </div>
        </header>

        <div className="flex-1 px-12 pb-12 flex flex-col items-center justify-center overflow-hidden">
           <AnimatePresence mode="wait">
              {activeTab === 'cards' ? (
                <motion.div 
                  key="cards"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="relative w-full max-w-sm h-[450px] flex items-center justify-center"
                >
                   {learningCards.map((card, i) => i === cardIndex && (
                     <motion.div 
                       key={card.id}
                       drag="x"
                       dragConstraints={{ left: 0, right: 0 }}
                       style={{ x: dragX, rotate, opacity }}
                       onDragEnd={handleDragEnd}
                       className="absolute w-full h-full glass-card rounded-[3rem] p-10 flex flex-col items-center text-center shadow-3xl border-primary/20 cursor-grab active:cursor-grabbing"
                     >
                        <div className={`w-20 h-20 rounded-3xl bg-${card.color}/20 text-${card.color} flex items-center justify-center mb-8`}>
                           <span className="material-symbols-outlined text-4xl fill">{card.icon}</span>
                        </div>
                        <h3 className="text-3xl font-black font-headline mb-6 tracking-tighter leading-tight">{card.title}</h3>
                        <p className="text-on-surface-variant font-body leading-relaxed text-lg">{card.content}</p>
                        
                        <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">
                           <span className="material-symbols-outlined text-sm">swipe</span> Swipe to learn more
                        </div>
                     </motion.div>
                   ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="quiz"
                  initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="w-full max-w-2xl"
                >
                   {!quizFinished ? (
                     <div className="glass-card rounded-[3rem] p-12 shadow-3xl border-outline-variant/10">
                        <div className="flex justify-between items-center mb-8">
                           <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Question {quizIndex + 1} of {quizQuestions.length}</span>
                           <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{quizQuestions[quizIndex].difficulty}</span>
                        </div>
                        <h3 className="text-3xl font-black font-headline mb-10 tracking-tight leading-tight">{quizQuestions[quizIndex].question}</h3>
                        <div className="grid grid-cols-1 gap-4">
                           {quizQuestions[quizIndex].options.map((opt, i) => (
                             <button 
                                key={i}
                                onClick={() => handleAnswer(i)}
                                className="p-6 rounded-2xl bg-surface-container-high border border-outline-variant/10 text-left font-headline font-bold text-on-surface hover:bg-primary/10 hover:border-primary transition-all group"
                             >
                                <span className="mr-4 text-primary opacity-40 group-hover:opacity-100">{String.fromCharCode(65 + i)}.</span>
                                {opt}
                             </button>
                           ))}
                        </div>
                     </div>
                   ) : (
                     <motion.div 
                       initial={{ scale: 0.9 }}
                       animate={{ scale: 1 }}
                       className="glass-card rounded-[3rem] p-12 text-center shadow-3xl border-secondary/20"
                     >
                        <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center text-secondary mb-8 mx-auto border border-secondary/20">
                           <span className="material-symbols-outlined text-5xl">military_tech</span>
                        </div>
                        <h2 className="text-4xl font-black font-headline mb-4 tracking-tighter">Quiz Complete!</h2>
                        <p className="text-on-surface-variant mb-8 text-lg font-body">Excellent work, Citizen. You've earned <span className="text-secondary font-black">{quizScore} Credits</span> and a new badge.</p>
                        <div className="flex gap-4">
                           <button onClick={() => {setQuizIndex(0); setQuizFinished(false); setQuizScore(0);}} className="flex-1 py-4 bg-on-background text-background font-black rounded-2xl hover:brightness-110 transition-all">Retry Quiz</button>
                           <button onClick={() => setActiveTab('cards')} className="flex-1 py-4 bg-surface-container-high text-on-surface font-black rounded-2xl hover:bg-surface-container-highest transition-all">Review Lessons</button>
                        </div>
                     </motion.div>
                   )}
                </motion.div>
              )}
           </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
