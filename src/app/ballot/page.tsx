"use client";

import Sidebar from "@/components/Sidebar";
import { motion } from "framer-motion";
import { useState } from "react";

export default function BallotPage() {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [step, setStep] = useState(1); // 1 = Selection, 2 = Verification, 3 = Confirmation

  const candidates = [
    { id: "1", name: "Candidate A", bloc: "Progressive Bloc", color: "secondary" },
    { id: "2", name: "Candidate B", bloc: "Conservative Alliance", color: "primary" },
    { id: "3", name: "Candidate C", bloc: "Techno-Democracy", color: "tertiary" },
    { id: "4", name: "Candidate D", bloc: "Green Path", color: "secondary-dim" },
  ];

  const handleCastVote = () => {
    setStep(2);
    // Simulate biometric check
    setTimeout(() => {
      setStep(3);
    }, 3000);
  };

  return (
    <div className="flex bg-background min-h-screen transition-colors overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-20 flex flex-col h-screen overflow-hidden relative">
        <header className="px-8 py-10 lg:py-16 max-w-4xl mx-auto w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container text-on-error-container border border-error/20 mb-4">
            <span className="material-symbols-outlined text-sm">security</span>
            <span className="text-[10px] font-black uppercase tracking-widest">Secure Session Active</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black font-headline text-on-background tracking-tight">My Digital Ballot</h1>
          <p className="text-on-surface-variant mt-4 font-body leading-relaxed max-w-2xl">
            Choose your representative. Your vote is anonymized using Zero-Knowledge Proofs (ZKP) and cryptographically linked to your identity.
          </p>
        </header>

        <div className="flex-1 max-w-4xl mx-auto w-full px-8 pb-12 overflow-y-auto scrollbar-hide">
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 gap-4">
                {candidates.map((c) => (
                  <button 
                    key={c.id}
                    onClick={() => setSelectedCandidate(c.id)}
                    className={`flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 group ${
                      selectedCandidate === c.id 
                        ? "bg-primary/10 border-primary shadow-lg shadow-primary/10" 
                        : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container"
                    }`}
                  >
                    <div className="flex items-center gap-6">
                       <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-surface-container-high border border-outline-variant/20`}>
                         <div className={`w-4 h-4 rounded-full bg-${c.color}`} />
                       </div>
                       <div className="text-left">
                          <h3 className="text-xl font-black font-headline text-on-surface">{c.name}</h3>
                          <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">{c.bloc}</p>
                       </div>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedCandidate === c.id ? "border-primary bg-primary" : "border-outline-variant"
                    }`}>
                      {selectedCandidate === c.id && <span className="material-symbols-outlined text-on-primary text-sm font-bold">check</span>}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-8">
                <button 
                  disabled={!selectedCandidate}
                  onClick={handleCastVote}
                  className="w-full py-5 bg-on-background text-background font-black font-headline text-xl rounded-2xl hover:brightness-110 disabled:opacity-30 transition-all shadow-2xl"
                >
                  Cast Secure Ballot
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-10"
            >
              <div className="relative w-48 h-48">
                 <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full shadow-[0_0_20px_rgba(254,152,50,0.4)]"
                 />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-primary animate-pulse">fingerprint</span>
                 </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl font-black font-headline text-on-background uppercase tracking-tighter">Identity Verification</h2>
                <p className="text-on-surface-variant font-body">Establishing secure link via Aadhaar-ZKP Enclave...</p>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center text-secondary border border-secondary/20 shadow-lg shadow-secondary/10">
                <span className="material-symbols-outlined text-5xl font-bold">verified</span>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black font-headline text-on-background">Ballot Cast Successfully</h2>
                <p className="text-on-surface-variant font-body max-w-sm">
                  Your vote has been cryptographically sealed and added to the National Pulse network.
                </p>
              </div>
              <div className="pt-8 w-full max-w-xs">
                 <div className="bg-surface-container-high/50 p-4 rounded-xl border border-outline-variant/10 font-mono text-[10px] break-all opacity-60">
                    HASH: 0x8f2d9...3a1c5e9f
                 </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
