"use client";

import Sidebar from "@/components/Sidebar";
import { db } from "@/lib/firebase-config";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

interface LeaderboardUser {
  id: string;
  displayName: string;
  photoURL: string;
  points: number;
  badges: string[];
}

export default function LeaderboardPage() {
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("points", "desc"), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users: LeaderboardUser[] = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as LeaderboardUser[];
      setTopUsers(users);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex bg-background min-h-screen transition-colors overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-20 flex flex-col h-screen overflow-hidden relative">
        <header className="px-12 pt-16 mb-8 relative z-10">
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-2 font-label">Elite Citizens</p>
            <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-background">National Rankings</h1>
            <p className="text-on-surface-variant mt-4 max-w-2xl text-lg font-body leading-relaxed">
              Celebrating the top-tier contributors and democracy scholars in our digital sovereign network.
            </p>
        </header>

        <div className="flex-1 px-12 pb-12 overflow-y-auto scrollbar-hide">
           <div className="max-w-4xl mx-auto w-full">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                   <div className="animate-spin w-12 h-12 border-4 border-secondary border-t-transparent rounded-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {topUsers.map((user, i) => (
                      <motion.div 
                        key={user.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex items-center justify-between p-6 rounded-3xl border transition-all duration-300 ${
                          i === 0 
                            ? "bg-secondary/10 border-secondary shadow-xl shadow-secondary/10 scale-105 mb-8" 
                            : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high"
                        }`}
                      >
                         <div className="flex items-center gap-8">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${
                               i === 0 ? "bg-secondary text-on-secondary" : 
                               i === 1 ? "bg-on-background/10 text-on-background" : 
                               i === 2 ? "bg-primary/20 text-primary" : "text-on-surface-variant"
                            }`}>
                               #{i + 1}
                            </div>
                            
                            <div className="relative">
                               <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-outline-variant/20 shadow-lg">
                                  <Image src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`} alt={user.displayName} fill className="object-cover" />
                               </div>
                               {i === 0 && (
                                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-secondary shadow-lg border-4 border-background">
                                    <span className="material-symbols-outlined text-sm font-bold">military_tech</span>
                                 </div>
                               )}
                            </div>

                            <div>
                               <h3 className="text-xl font-black font-headline text-on-surface">{user.displayName}</h3>
                               <div className="flex gap-2 mt-1">
                                  {user.badges?.slice(0, 3).map((badge, b) => (
                                    <span key={b} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[8px] font-black uppercase tracking-widest text-on-surface-variant">
                                      {badge}
                                    </span>
                                  ))}
                               </div>
                            </div>
                         </div>

                         <div className="text-right">
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant block mb-1">Consulate Credits</span>
                            <span className={`text-3xl font-black font-headline ${i === 0 ? "text-secondary" : "text-on-background"}`}>
                               {user.points.toLocaleString()}
                            </span>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
}
