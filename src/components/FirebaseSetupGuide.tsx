"use client";

import { motion } from "framer-motion";

export default function FirebaseSetupGuide() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-container-low rounded-[3rem] border border-outline-variant/10 shadow-2xl max-w-2xl mx-auto my-20">
       <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 animate-pulse text-primary">
          <span className="material-symbols-outlined text-4xl">cloud_off</span>
       </div>
       <h2 className="text-4xl font-headline font-black tracking-tighter text-on-background mb-4">Firebase Configuration Required</h2>
       <p className="text-on-surface-variant font-body text-lg mb-10 leading-relaxed">
          The **Consulate Intelligence Mesh** requires a valid Firebase project to facilitate real-time 
          dialogue, quiz battles, and secure identity tracking.
       </p>

       <div className="w-full text-left bg-black/20 p-8 rounded-2xl border border-outline-variant/10 space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Setup Instructions:</p>
          <ul className="text-xs space-y-4 text-on-surface-variant list-decimal pl-6">
             <li>Create a project at <a href="https://console.firebase.google.com/" target="_blank" className="text-primary underline">Firebase Console</a>.</li>
             <li className="p-4 bg-primary/10 rounded-xl border border-primary/20">
                <p className="font-black text-primary mb-1">CRITICAL FIX (Error: auth/configuration-not-found):</p>
                Navigate to **Build &gt; Authentication &gt; Sign-in method**, click **Add new provider**, and choose **Google**. You MUST toggle it to **Enabled**.
             </li>
             <li className="p-4 bg-secondary/10 rounded-xl border border-secondary/20">
                <p className="font-black text-secondary mb-1">DATA FIX (Error: permission-denied):</p>
                Navigate to **Build &gt; Firestore Database &gt; Rules** and set your rules to: <br/>
                <code className="text-[10px] bg-black/20 px-2 py-1 rounded mt-2 block">allow read, write: if true;</code>
             </li>
             <li>Populate the Firebase variables in your <code className="bg-surface-container-high px-1.5 py-0.5 rounded text-primary">.env.local</code>.</li>
          </ul>
       </div>

       <button 
         onClick={() => window.location.reload()}
         className="mt-10 px-8 py-4 bg-primary text-on-primary font-black rounded-xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center gap-3"
       >
          <span className="material-symbols-outlined text-sm">refresh</span>
          VERIFY CONFIGURATION
       </button>
    </div>
  );
}
