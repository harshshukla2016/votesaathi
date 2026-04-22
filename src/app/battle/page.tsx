"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { db, auth } from "@/lib/firebase-config";
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  updateDoc, 
  doc, 
  limit, 
  getDocs,
  runTransaction
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { isConfigured } from "@/lib/firebase-config";
import { battleQuestions, BattleQuestion } from "@/lib/battle-questions";
import FirebaseSetupGuide from "@/components/FirebaseSetupGuide";

interface Player {
  userId: string;
  userName: string;
  photo: string;
  score: number;
  currentProgress: number; // 0 to 1 scaling
}

interface BattleLobby {
  id: string;
  status: 'waiting' | 'active' | 'finished';
  players: Player[];
  currentQuestionIndex: number;
  startTime?: any;
}

export default function BattleArena() {
  const [user, setUser] = useState<User | null>(null);
  const [lobby, setLobby] = useState<BattleLobby | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'searching' | 'versus' | 'playing' | 'results'>('idle');
  const [currentQuestion, setCurrentQuestion] = useState<BattleQuestion>(battleQuestions[0]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [canAnswer, setCanAnswer] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isConfigured || !auth) return;
    onAuthStateChanged(auth, u => setUser(u));
  }, []);

  // Listen to Lobby changes
  useEffect(() => {
    if (!lobby?.id || !db) return;
    const unsub = onSnapshot(doc(db, "battle_lobbies", lobby.id), (d) => {
      if (!d.exists()) return;
      const data = d.data() as any;
      setLobby({ ...data, id: d.id });

      if (data.status === 'active' && gameState === 'searching') {
        setGameState('versus');
        setTimeout(() => setGameState('playing'), 4000);
      }

      if (data.status === 'finished') {
        setGameState('results');
      }
    }, (error) => {
      console.warn("Firestore Permission Guard: Battle Lobby is in standby.", error.message);
    });
    return () => unsub();
  }, [lobby?.id, gameState]);

  // Sync Timer
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, timeLeft]);

  const findMatch = async () => {
    if (!user) return;
    setGameState('searching');

    // 1. Try to find a waiting lobby
    const q = query(collection(db, "battle_lobbies"), where("status", "==", "waiting"), limit(1));
    const snap = await getDocs(q);

    const currentPlayer: Player = {
      userId: user.uid,
      userName: user.displayName || "Citizen",
      photo: user.photoURL || "",
      score: 0,
      currentProgress: 0
    };

    if (!snap.empty) {
      const waitLobby = snap.docs[0];
      const waitData = waitLobby.data() as any;
      await updateDoc(doc(db, "battle_lobbies", waitLobby.id), {
        players: [...waitData.players, currentPlayer],
        status: 'active'
      });
      setLobby({ ...waitData, id: waitLobby.id, players: [...waitData.players, currentPlayer], status: 'active' });
    } else {
      // 2. Create new lobby
      const newLobby = await addDoc(collection(db, "battle_lobbies"), {
        status: 'waiting',
        players: [currentPlayer],
        currentQuestionIndex: 0
      });
      setLobby({ id: newLobby.id, status: 'waiting' as const, players: [currentPlayer], currentQuestionIndex: 0 });

      // 3. Fallback to AI Bot if no one joins in 10s
      setTimeout(async () => {
        const d = await getDocs(query(collection(db, "battle_lobbies"), where("status", "==", "waiting"), limit(1)));
        if (!d.empty && d.docs[0].id === newLobby.id) {
           const aiPlayer: Player = {
             userId: "saathi-bot",
             userName: "Saathi AI Bot",
             photo: "https://lh3.googleusercontent.com/a/ALm5wu0... (bot icon)",
             score: 0,
             currentProgress: 0
           };
           await updateDoc(doc(db, "battle_lobbies", newLobby.id), {
             players: [currentPlayer, aiPlayer],
             status: 'active'
           });
        }
      }, 10000);
    }
  };

  const submitAnswer = async (index: number) => {
    if (!canAnswer || !lobby || !user) return;
    setCanAnswer(false);

    const isCorrect = index === currentQuestion.answerIndex;
    const speedBonus = timeLeft * 10;
    const points = isCorrect ? 100 + speedBonus : 0;

    const newPlayers = lobby.players.map(p => {
       if (p.userId === user.uid) {
         return { ...p, score: p.score + points, currentProgress: (lobby.currentQuestionIndex + 1) / battleQuestions.length };
       }
       return p;
    });

    await updateDoc(doc(db, "battle_lobbies", lobby.id), { players: newPlayers });
  };

  const handleNextQuestion = async () => {
    if (!lobby || !user) return;
    
    if (lobby.currentQuestionIndex < battleQuestions.length - 1) {
       // Only the lobby 'creator' (first player) advances the index for sync
       if (lobby.players[0].userId === user.uid) {
         await updateDoc(doc(db, "battle_lobbies", lobby.id), { 
           currentQuestionIndex: lobby.currentQuestionIndex + 1 
         });
       }
       setCurrentQuestion(battleQuestions[lobby.currentQuestionIndex + 1]);
       setTimeLeft(10);
       setCanAnswer(true);
    } else {
       await updateDoc(doc(db, "battle_lobbies", lobby.id), { status: 'finished' });
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
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 lg:p-12">
      <AnimatePresence mode="wait">
        
        {/* IDLE STATE */}
        {gameState === 'idle' && (
          <motion.div 
            key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-8 max-w-2xl"
          >
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 relative">
               <span className="material-symbols-outlined text-primary text-5xl font-black">sports_kabaddi</span>
               <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tight text-on-background">Consulate Arena</h1>
            <p className="text-on-surface-variant font-body text-xl">
               Challenge follow citizens in a high-stakes 1v1 electoral knowledge battle. Victory earns Mastery Credits.
            </p>
            <button 
              onClick={findMatch}
              disabled={!user}
              className="px-12 py-6 bg-primary text-on-primary rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-[1.05] transition-all shadow-2xl shadow-primary/30"
            >
              {user ? "Enter Battle Lobby" : "Sign In to Battle"}
            </button>
          </motion.div>
        )}

        {/* SEARCHING STATE */}
        {gameState === 'searching' && (
           <motion.div 
             key="searching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
             className="text-center space-y-8"
           >
              <div className="relative w-48 h-48 mx-auto">
                 <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border-4 border-dashed border-primary/20 rounded-full" />
                 <div className="absolute inset-4 rounded-full bg-surface-container-high flex items-center justify-center">
                    <img src={user?.photoURL || ""} alt="" className="w-32 h-32 rounded-full border-4 border-primary/10" />
                 </div>
              </div>
              <div>
                 <h2 className="text-2xl font-headline font-black text-on-background">Scanning Area...</h2>
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Looking for valid opponent</p>
              </div>
           </motion.div>
        )}

        {/* VERSUS STATE */}
        {gameState === 'versus' && (
          <motion.div key="versus" className="fixed inset-0 bg-background z-[100] flex items-center justify-center gap-12 overflow-hidden">
             <motion.div 
               initial={{ x: -600 }} animate={{ x: 0 }} 
               className="flex flex-col items-center gap-6"
             >
                <div className="w-64 h-64 rounded-full border-8 border-secondary overflow-hidden shadow-2xl">
                   <img src={lobby?.players[0].photo} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-3xl font-headline font-black">{lobby?.players[0].userName}</h3>
             </motion.div>

             <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl font-black italic text-error">VS</motion.div>

             <motion.div 
               initial={{ x: 600 }} animate={{ x: 0 }} 
               className="flex flex-col items-center gap-6"
             >
                <div className="w-64 h-64 rounded-full border-8 border-primary overflow-hidden shadow-2xl">
                   <img src={lobby?.players[1]?.photo} alt="" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-3xl font-headline font-black">{lobby?.players[1]?.userName}</h3>
             </motion.div>
          </motion.div>
        )}

        {/* PLAYING STATE */}
        {gameState === 'playing' && lobby && (
          <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-4xl space-y-12">
             
             {/* Battle Header (Progress Bars) */}
             <div className="grid grid-cols-2 gap-12 mb-12">
                {lobby.players.map((p, i) => (
                  <div key={i} className="space-y-3">
                     <div className="flex justify-between items-end">
                        <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">{p.userName}</span>
                        <span className="text-2xl font-black font-headline text-primary">{p.score}</span>
                     </div>
                     <div className="h-4 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/10">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${p.currentProgress * 100}%` }}
                          className={`h-full ${i === 0 ? 'bg-secondary' : 'bg-primary'}`}
                        />
                     </div>
                  </div>
                ))}
             </div>

             {/* Question Card */}
             <div className="bg-surface-container-low rounded-[3rem] p-12 border border-outline-variant/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                   <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                         <circle cx="40" cy="40" r="35" className="stroke-surface-container-highest fill-none" strokeWidth="6" />
                         <circle 
                           cx="40" cy="40" r="35" className="stroke-primary fill-none" strokeWidth="6"
                           strokeDasharray="220" strokeDashoffset={220 - (220 * timeLeft / 10)}
                         />
                      </svg>
                      <span className="absolute text-xl font-headline font-black">{timeLeft}</span>
                   </div>
                </div>

                <div className="space-y-8 max-w-2xl">
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant">Question {lobby.currentQuestionIndex + 1} of 5</span>
                   <h2 className="text-4xl font-headline font-black leading-tight text-on-background">
                      {battleQuestions[lobby.currentQuestionIndex].question}
                   </h2>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {battleQuestions[lobby.currentQuestionIndex].options.map((option, idx) => (
                        <button 
                          key={idx}
                          onClick={() => submitAnswer(idx)}
                          disabled={!canAnswer}
                          className={`p-6 rounded-2xl text-left font-bold transition-all border ${
                            !canAnswer ? 'bg-surface-container-highest border-transparent opacity-50' : 'bg-surface-container-high border-outline-variant/10 hover:bg-primary/10 hover:border-primary/20 hover:scale-[1.02]'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>
        )}

        {/* RESULTS STATE */}
        {gameState === 'results' && lobby && (
          <motion.div key="results" className="text-center space-y-12 max-w-xl">
             <div className="space-y-4">
                <h2 className="text-6xl font-headline font-black tracking-tighter text-on-background">Battle Concluded</h2>
                <p className="text-on-surface-variant uppercase text-[10px] font-black tracking-[0.4em]">Final Scoring Intelligence</p>
             </div>

             <div className="bg-surface-container-low rounded-[3rem] p-12 border border-outline-variant/10 shadow-3xl space-y-8">
                {lobby.players.sort((a,b) => b.score - a.score).map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-2xl bg-surface-container-high/50 border border-outline-variant/5">
                     <div className="flex items-center gap-6">
                        <span className={`text-3xl font-black ${i === 0 ? 'text-secondary' : 'text-on-surface-variant'}`}>#{i+1}</span>
                        <div className="text-left">
                           <h4 className="font-bold text-lg">{p.userName}</h4>
                           <p className="text-[10px] font-black text-on-surface-variant uppercase tracking-widest">Citizen Rank</p>
                        </div>
                     </div>
                     <span className="text-4xl font-headline font-black text-primary">{p.score}</span>
                  </div>
                ))}
             </div>

             <button 
               onClick={() => window.location.reload()}
               className="px-10 py-5 bg-surface-container-high rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-surface-container-highest transition-colors"
             >
               Return to Hall
             </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
