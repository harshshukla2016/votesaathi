"use client";

import { useAuth } from "@/lib/auth-context";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function UserChip() {
  const { user, profile, loading, login, logout } = useAuth();

  if (loading) return null;

  return (
    <div className="flex items-center gap-3">
      <AnimatePresence mode="wait">
        {user ? (
          <motion.div 
            key="user"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="flex items-center gap-3"
          >
            {/* Points Display */}
            <div className="hidden md:flex flex-col items-end">
               <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] leading-none mb-1">Consulate Credits</span>
               <span className="text-sm font-black font-headline text-on-surface">{profile?.points || 0}</span>
            </div>

            {/* Profile Avatar & Menu */}
            <button 
              onClick={() => logout()}
              className="group relative flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest transition-all border border-outline-variant/10 shadow-lg"
            >
               <div className="w-8 h-8 rounded-xl overflow-hidden relative border border-primary/20">
                  {user.photoURL ? (
                    <Image src={user.photoURL} alt={user.displayName || "User"} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-primary flex items-center justify-center text-on-primary font-black">
                       {user.displayName?.[0] || 'U'}
                    </div>
                  )}
               </div>
               <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">Sign Out</span>
            </button>
          </motion.div>
        ) : (
          <motion.button
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => login()}
            className="px-6 py-2.5 bg-on-background text-background font-black text-xs uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-xl shadow-primary/10"
          >
            Register Consulate ID
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
