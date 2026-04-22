"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { messaging, db, auth } from "@/lib/firebase-config";
import { getToken, onMessage } from "firebase/messaging";
import { collection, query, where, onSnapshot, orderBy, Timestamp } from "firebase/firestore";

interface ConsulateAlert {
  id: string;
  title: string;
  body: string;
  timestamp: Timestamp;
  type: 'critical' | 'info' | 'success';
  read: boolean;
}

export default function NotificationHub() {
  const [isOpen, setIsOpen] = useState(false);
  const [alerts, setAlerts] = useState<ConsulateAlert[]>([]);
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPermission(Notification.permission);
    }

    // Real-time listener for in-app alert history
    const q = query(collection(db, "consulate_alerts"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() })) as ConsulateAlert[];
      setAlerts(data);
    });

    // Handle foreground FCM messages
    messaging.then(m => {
       if (m) {
          onMessage(m, (payload) => {
             console.log("Foreground message received:", payload);
             // Handled automatically if we use standard browser notifications
          });
       }
    });

    return () => unsub();
  }, []);

  const requestNotificationPermission = async () => {
    setIsRegistering(true);
    try {
      const status = await Notification.requestPermission();
      setPermission(status);
      
      if (status === "granted") {
        const m = await messaging;
        if (m) {
          const token = await getToken(m, { 
            vapidKey: "BKe_demo_vapid_key_for_hackathon" // In real app, this comes from FB Console
          });
          console.log("FCM Token:", token);
          // Save token to user profile in real app
        }
      }
    } catch (err) {
      console.error("FCM registration failed:", err);
    } finally {
      setIsRegistering(false);
    }
  };

  const unreadCount = alerts.filter(a => !a.read).length;

  return (
    <div className="relative isolate">
      {/* Bell Icon Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest transition-all flex items-center justify-center relative group"
      >
        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
          Notifications
        </span>
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-4 h-4 bg-error text-on-error text-[8px] font-black rounded-full flex items-center justify-center shadow-lg shadow-error/30">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Permission Banner (Active if default) */}
      <AnimatePresence>
         {permission === "default" && !isOpen && (
           <motion.div 
             initial={{ opacity: 0, y: 10, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             className="absolute top-16 right-0 w-80 bg-primary text-on-primary p-6 rounded-2xl shadow-2xl z-50 overflow-hidden"
           >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <span className="material-symbols-outlined text-6xl font-thin">notifications_active</span>
              </div>
              <h4 className="font-headline font-black text-sm mb-2 tracking-tight">Enable Consulate Alerts?</h4>
              <p className="text-[10px] leading-relaxed opacity-90 mb-4 font-medium uppercase tracking-wide">Stay updated on live voting phases and critical security alerts in your district.</p>
              <div className="flex gap-3">
                 <button 
                   onClick={requestNotificationPermission}
                   disabled={isRegistering}
                   className="px-4 py-2 bg-white text-primary rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
                 >
                   {isRegistering ? "Enabling..." : "Enable"}
                 </button>
                 <button 
                   onClick={() => setPermission("denied")}
                   className="px-4 py-2 border border-white/20 text-white/80 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10"
                 >
                   Later
                 </button>
              </div>
           </motion.div>
         )}
      </AnimatePresence>

      {/* Consulate Inbox Flyout */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: 400 }} animate={{ x: 0 }} exit={{ x: 400 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-screen w-96 bg-surface shadow-2xl z-[110] border-l border-outline-variant/10 flex flex-col pt-20"
            >
               <div className="p-8 border-b border-outline-variant/10 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-headline font-black tracking-tight">Consulate Inbox</h3>
                    <p className="text-[10px] font-black tracking-widest uppercase text-on-surface-variant opacity-60">Intelligence Alerts</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="w-10 h-10 rounded-xl hover:bg-surface-container-high flex items-center justify-center transition-colors">
                     <span className="material-symbols-outlined">close</span>
                  </button>
               </div>

               <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                  {alerts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full opacity-30 text-center px-10">
                       <span className="material-symbols-outlined text-6xl mb-4 font-thin">mail</span>
                       <p className="text-sm font-bold">Your consulate inbox is empty.</p>
                    </div>
                  ) : (
                    alerts.map((alert) => (
                      <motion.div 
                        key={alert.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-5 rounded-2xl border transition-all ${
                          alert.type === 'critical' ? 'bg-error/5 border-error/20' : 
                          alert.type === 'success' ? 'bg-secondary/5 border-secondary/20' : 
                          'bg-surface-container-low border-outline-variant/10'
                        }`}
                      >
                         <div className="flex justify-between items-start mb-2">
                            <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                               alert.type === 'critical' ? 'bg-error/10 text-error' : 
                               alert.type === 'success' ? 'bg-secondary/10 text-secondary' : 
                               'bg-primary/10 text-primary'
                            }`}>
                               {alert.type}
                            </span>
                            <span className="text-[9px] font-bold text-on-surface-variant opacity-50">Just Now</span>
                         </div>
                         <h4 className="font-bold text-sm text-on-surface leading-tight mb-2">{alert.title}</h4>
                         <p className="text-xs text-on-surface-variant leading-relaxed opacity-80">{alert.body}</p>
                      </motion.div>
                    ))
                  )}
               </div>

               {permission !== "granted" && (
                 <div className="p-8 border-t border-outline-variant/10 bg-surface-container-low">
                    <button 
                      onClick={requestNotificationPermission}
                      className="w-full py-4 bg-primary text-on-primary font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
                    >
                      Enable Browser Alerts
                    </button>
                 </div>
               )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
