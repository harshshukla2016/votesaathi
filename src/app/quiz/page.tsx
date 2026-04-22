"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questions, candidateInfos } from "./questions";
import ResultsView from "./ResultsView";
import Link from "next/link";

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0); // 0 = Intro, 1..N = Questions, N+1 = Loading, N+2 = Results
  const [answers, setAnswers] = useState<number[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const totalQuestions = questions.length;

  const handleStart = () => setCurrentStep(1);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    
    if (currentStep < totalQuestions) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsMatching(true);
      setCurrentStep(totalQuestions + 1);
      // Simulate "AI Analysis"
      setTimeout(() => {
        setIsMatching(false);
        setCurrentStep(totalQuestions + 2);
      }, 2500);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
      </div>

      <nav className="p-8 h-20 flex justify-between items-center relative z-20">
        <Link href="/" className="text-xl font-black text-orange-500 font-headline tracking-tighter">
          VoteSaathi
        </Link>
        {currentStep > 0 && currentStep <= totalQuestions && (
          <div className="flex gap-2">
            {questions.map((_, i) => (
              <div 
                key={i} 
                className={`w-8 h-1 rounded-full transition-all duration-500 ${
                  i < currentStep ? "bg-primary" : "bg-surface-container-high"
                }`} 
              />
            ))}
          </div>
        )}
      </nav>

      <main className="flex-1 flex items-center justify-center p-8 relative z-10">
        <AnimatePresence mode="wait">
          {/* Step 0: Intro */}
          {currentStep === 0 && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="max-w-2xl text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                <span className="material-symbols-outlined text-sm">psychology</span>
                <span className="font-label text-[10px] font-black uppercase tracking-widest">Alignment Assessment</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-background leading-none">
                Who Speaks <br/><span className="text-gradient-saffron">For You?</span>
              </h1>
              <p className="text-lg text-on-surface-variant font-body leading-relaxed">
                Take the 2-minute Voter Match quiz to see which political bloc aligns best with your personal priorities and values.
              </p>
              <button 
                onClick={handleStart}
                className="bg-primary text-on-primary font-black font-headline py-4 px-12 rounded-xl shadow-2xl shadow-primary/30 hover:brightness-110 transition-all text-lg"
              >
                Find My Match
              </button>
            </motion.div>
          )}

          {/* Step 1..N: Questions */}
          {currentStep > 0 && currentStep <= totalQuestions && (
            <motion.div 
              key={`q-${currentStep}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-3xl w-full"
            >
              <div className="mb-12">
                <span className="text-primary font-black text-xs uppercase tracking-widest block mb-4">
                  {questions[currentStep-1].category} — {currentStep} of {totalQuestions}
                </span>
                <h2 className="text-3xl lg:text-5xl font-headline font-black tracking-tight text-on-background leading-tight">
                  {questions[currentStep-1].text}
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentStep-1].options.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="group flex items-center justify-between p-6 bg-surface-container-low border border-outline-variant/10 rounded-2xl hover:bg-surface-container hover:border-primary/30 transition-all text-left shadow-lg hover:shadow-primary/5"
                  >
                    <span className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">{opt.text}</span>
                    <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Loading State */}
          {currentStep === totalQuestions + 1 && (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center space-y-8"
            >
              <div className="relative w-32 h-32 mx-auto">
                 <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                 <div className="absolute inset-4 rounded-full border-4 border-secondary/20 border-b-secondary animate-spin-slow"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <span className="material-symbols-outlined text-primary text-4xl animate-pulse">analytics</span>
                 </div>
              </div>
              <div>
                <h3 className="text-2xl font-black font-headline text-on-background uppercase tracking-widest">Constructing Profile</h3>
                <p className="text-on-surface-variant font-body mt-2 opacity-60">Wait while Saathi AI analyzes your policy alignments...</p>
              </div>
            </motion.div>
          )}

          {/* Results View */}
          {currentStep === totalQuestions + 2 && (
            <ResultsView answers={answers} />
          )}
        </AnimatePresence>
      </main>

      <footer className="p-8 text-[10px] text-on-surface-variant/40 font-black uppercase tracking-[0.3em] relative z-20">
        Personal Anonymous Assessment • VoteSaathi Core
      </footer>
    </div>
  );
}
