"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { db, auth } from "@/lib/firebase-config";
import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  updateDoc, 
  doc, 
  increment, 
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { isConfigured } from "@/lib/firebase-config";
import FirebaseSetupGuide from "@/components/FirebaseSetupGuide";

interface QAThread {
  id: string;
  question: string;
  authorName: string;
  authorPhoto?: string;
  timestamp: any;
  upvotes: number;
  aiAnswer?: string;
  aiConfidence?: string;
}

export default function CitizenForum() {
  const [user, setUser] = useState<User | null>(null);
  const [threads, setThreads] = useState<QAThread[]>([]);
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isConfigured || !auth || !db) return;

    const unsubAuth = onAuthStateChanged(auth, (u) => setUser(u));
    
    const q = query(collection(db, "civic_qa"), orderBy("upvotes", "desc"));
    const unsubSnap = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as QAThread[];
      setThreads(data);
    }, (error) => {
      console.warn("Firestore Permission Guard: Forum feed is in standby.", error.message);
    });

    return () => {
      unsubAuth();
      unsubSnap();
    };
  }, []);

  const askQuestion = async () => {
    if (!input.trim() || !user) return;
    setIsSubmitting(true);
    const questionText = input;
    setInput("");

    try {
      // 1. Add question to Firestore
      const docRef = await addDoc(collection(db, "civic_qa"), {
        question: questionText,
        authorName: user.displayName || "Anonymous Citizen",
        authorPhoto: user.photoURL || "",
        userId: user.uid,
        timestamp: serverTimestamp(),
        upvotes: 0
      });

      // 2. Trigger AI Liaison Answer (Client-side trigger for demo simplicity, could be Cloud Function)
      const aiRes = await fetch("/api/gemini", {
        method: "POST",
        body: JSON.stringify({ type: "civic_answer", query: questionText }),
      });
      const aiData = await aiRes.json();

      if (aiData.answer) {
        await updateDoc(doc(db, "civic_qa", docRef.id), {
          aiAnswer: aiData.answer,
          aiConfidence: aiData.confidence || "high"
        });
      }
    } catch (err) {
      console.error("Forum error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const upvote = async (id: string) => {
    try {
      await updateDoc(doc(db, "civic_qa", id), {
        upvotes: increment(1)
      });
    } catch (err) {
      console.error("Upvote failed:", err);
    }
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-background p-12">
        <FirebaseSetupGuide />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="max-w-4xl mx-auto px-6 pt-12 lg:pt-16 space-y-12">
        
        {/* Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
             <span className="material-symbols-outlined text-sm font-black">groups</span>
             <span className="text-[10px] font-black uppercase tracking-widest">Public Civic Dialogue</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tight text-on-background">Citizen Forum</h1>
          <p className="text-on-surface-variant font-body leading-relaxed max-w-xl">
             Connect with follow citizens and Saathi’s AI Liaisons. Ask questions, share insights, and build collective intelligence.
          </p>
        </header>

        {/* Input Console */}
        <div className="bg-surface-container-low rounded-[2.5rem] border border-outline-variant/10 p-2 shadow-2xl relative isolate">
           <textarea 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder={user ? "What is your question for the Consulate?" : "Please sign in to join the dialogue..."}
             className="w-full h-32 bg-transparent border-none p-8 text-lg font-body text-on-surface resize-none focus:ring-0 placeholder:text-on-surface-variant/30"
             disabled={isSubmitting || !user}
           />
           <div className="p-4 bg-surface-container rounded-[2rem] flex items-center justify-between">
              <div className="flex items-center gap-3 px-4">
                 {user ? (
                   <>
                     <img src={user.photoURL || ""} alt="" className="w-8 h-8 rounded-full border border-primary/20" />
                     <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Posting as {user.displayName}</span>
                   </>
                 ) : (
                   <span className="text-[10px] font-black uppercase tracking-widest text-error">Auth Required</span>
                 )}
              </div>
              <button 
                onClick={askQuestion}
                disabled={isSubmitting || !input.trim() || !user}
                className={`px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                  isSubmitting || !user ? "bg-surface-container-highest text-on-surface-variant" : "bg-primary text-on-primary hover:scale-[1.02] shadow-lg shadow-primary/20"
                }`}
              >
                {isSubmitting ? "Liaison is reading..." : "Broadcast Question"}
              </button>
           </div>
        </div>

        {/* Real-time Feed */}
        <div className="space-y-8">
           <div className="flex items-center justify-between border-b border-outline-variant/10 pb-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Trending Dialogue</h3>
              <span className="text-[9px] font-bold text-primary px-3 py-1 bg-primary/5 rounded-full">Real-time Sync Active</span>
           </div>

           <AnimatePresence mode="popLayout">
              {threads.map((thread) => (
                <motion.div 
                  key={thread.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-container-low rounded-[2rem] border border-outline-variant/5 shadow-sm hover:shadow-xl hover:border-outline-variant/20 transition-all overflow-hidden"
                >
                   <div className="flex">
                      {/* Voting Sidebar */}
                      <div className="w-16 flex flex-col items-center py-8 bg-surface-container/50 border-r border-outline-variant/5">
                         <button 
                           onClick={() => upvote(thread.id)}
                           className="w-10 h-10 rounded-xl hover:bg-primary/10 text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center"
                         >
                            <span className="material-symbols-outlined font-black">arrow_upward</span>
                         </button>
                         <span className="font-headline font-black text-lg py-1">{thread.upvotes}</span>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 p-8 space-y-6">
                         <div className="flex items-center gap-3">
                            <img src={thread.authorPhoto || `https://ui-avatars.com/api/?name=${thread.authorName}`} alt="" className="w-6 h-6 rounded-full opacity-60" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{thread.authorName}</span>
                            <span className="text-[10px] opacity-40">•</span>
                            <span className="text-[10px] font-bold text-on-surface-variant opacity-40">Just now</span>
                         </div>

                         <h4 className="text-xl font-headline font-bold text-on-surface leading-tight">
                            {thread.question}
                         </h4>

                         {/* AI Liaison Response Overlay */}
                         <AnimatePresence>
                            {thread.aiAnswer ? (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-primary/5 border border-primary/10 rounded-2xl p-6 relative overflow-hidden group"
                              >
                                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                    <span className="material-symbols-outlined text-primary text-4xl font-thin">psychology</span>
                                 </div>
                                 <div className="flex items-center gap-3 mb-3">
                                    <span className="material-symbols-outlined text-primary text-sm font-black">smart_toy</span>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-primary">Saathi AI Liaison Verdict</span>
                                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-[8px] font-black text-primary uppercase">{thread.aiConfidence}% Intelligence</span>
                                 </div>
                                 <p className="text-sm font-body text-on-surface leading-relaxed italic">
                                    "{thread.aiAnswer}"
                                 </p>
                              </motion.div>
                            ) : (
                              <div className="py-4 px-6 rounded-2xl bg-surface-container-high/30 border border-dashed border-outline-variant/20 flex items-center justify-center gap-3">
                                 <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                                 <span className="text-[9px] font-black uppercase tracking-widest text-on-surface-variant opacity-50">Drafting AI Analysis...</span>
                              </div>
                            )}
                         </AnimatePresence>

                         <div className="flex items-center gap-6 pt-4">
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
                               <span className="material-symbols-outlined text-sm">chat_bubble</span> 0 Contributions
                            </button>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors">
                               <span className="material-symbols-outlined text-sm">share</span> Share Dialogue
                            </button>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}
           </AnimatePresence>
        </div>

      </main>
    </div>
  );
}
