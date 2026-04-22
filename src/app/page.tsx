"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex-grow pt-32 pb-32 relative z-10 overflow-x-hidden transition-colors">
      {/* Ambient Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen transform -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] mix-blend-screen transform translate-y-1/3"></div>
      </div>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 mb-32 flex flex-col lg:flex-row items-center gap-16 relative">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-variant/40 backdrop-blur-md border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(141,252,117,1)]"></span>
            <span className="text-xs font-bold tracking-widest uppercase font-label text-on-surface-variant">Live Assistant Online</span>
          </div>
          <h1 className="text-6xl lg:text-8xl font-black font-headline tracking-tighter leading-[0.9] text-on-surface">
            The Mark of <br/><span className="text-gradient-saffron">Digital Democracy</span>
          </h1>
          <p className="text-xl text-on-surface-variant font-body max-w-xl leading-relaxed">
            Empowering every citizen with AI-driven insights, verifiable digital ballots, and unprecedented clarity into your constituency.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold font-headline py-4 px-10 rounded-xl shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
              <span className="text-lg">Start Voice Interaction</span>
            </motion.button>
            <motion.button 
              whileHover={{ backgroundColor: "rgba(var(--color-surface-dim), 1)" }}
              className="px-8 py-4 bg-surface-container-highest text-on-surface rounded-xl font-headline font-bold transition-all flex items-center justify-center gap-2 border border-outline-variant"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1 relative flex justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-full glass-card flex items-center justify-center p-8 overflow-hidden border border-white/10">
            <Image 
              alt="Hand with voting ink" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPeT4OM2ELT4e6qkJHcdPBULLwHz89Z8oLwfNTERh_pjFIpC6Uj9V410tTdu3KqLb_2S7d3F0ipwY4Bmj9ugy11EEgbH5K-d446gq-VxOu_Pc-G8una_1wofRnk6kfWnMHYtQHysEgkeoEINA4C16gBP6URv5sHDsjZ2GDtCUyZWFUBxk16j08drItOOVvX10gRAVxIZehynKrwVcPE0BWsFWibFJ1Kn47pWGQdVisjeLOViNaIgNjzUvC0Eh9kG5BUZ4aYGD1auRc" 
              width={500} 
              height={500}
              className="w-full h-full object-cover mix-blend-multiply transition-opacity group-hover:opacity-100 opacity-90"
              priority
            />
            <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white/20 to-transparent rounded-t-full blur-md"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Bento */}
      <section className="max-w-7xl mx-auto px-8 mb-32 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Registration Card */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="group bg-surface-container-low border border-outline-variant/15 rounded-2xl p-8 hover:bg-surface-container hover:-translate-y-2 transition-all duration-500 shadow-2xl"
        >
          <div className="w-12 h-12 bg-surface-variant rounded-xl flex items-center justify-center mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined text-primary">event</span>
          </div>
          <h3 className="text-xl font-bold font-headline text-on-surface mb-3">Election Timeline</h3>
          <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">Track key dates, registration deadlines, and voting phases specific to your constituency.</p>
          <Link href="/timeline" className="flex items-center text-primary font-bold text-sm hover:brightness-110 transition-all cursor-pointer">
            View Schedule <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </Link>
        </motion.div>

        {/* Map Card (Center) */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="group relative bg-surface-container-highest border border-outline-variant/15 rounded-2xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-3xl md:-mt-8 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwz7yOIEWrlzoX6Akthr0JxuORRJ6wufbt3TARnslMdbvkBrfNL8PG1cDgnPs3dDJy-t0-kw1FpeRwVWnchP_4X_kxMPxkSTbPnuTbsG8MTIu4lMAZ9wIp6LWiKlHUGQgA2bUnQrsjUhW-yqsvmBcdkIBZvUTNnCmS2ADlOhV58LHTaMwVWoGP_7K_2Q06e1RME12NXlKJq6Ylg1M2JYqHbt3MCqcwb1UoNyJNSZSTJ7niGAaQ8a2JF-GO73PT4S5XNOwjXxKFnp_2" 
              alt="Map background" 
              fill
              className="object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-primary/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-6 border border-primary/30 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-primary">map</span>
            </div>
            <h3 className="text-xl font-bold font-headline text-on-surface mb-3">Constituency Map</h3>
            <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">Explore polling stations, demographic data, and candidate territories in your area.</p>
            <Link href="/map" className="flex items-center text-primary font-bold text-sm hover:brightness-110 transition-all cursor-pointer">
               Explore Map <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="group bg-surface-container-low border border-outline-variant/15 rounded-2xl p-8 hover:bg-surface-container hover:-translate-y-2 transition-all duration-500 shadow-2xl"
        >
          <div className="w-12 h-12 bg-surface-variant rounded-xl flex items-center justify-center mb-6 shadow-inner border border-white/5 group-hover:scale-110 transition-transform">
             <span className="material-symbols-outlined text-secondary">quiz</span>
          </div>
          <h3 className="text-xl font-bold font-headline text-on-surface mb-3">Voter Match Quiz</h3>
          <p className="text-on-surface-variant font-body text-sm leading-relaxed mb-6">Discover which candidates align with your priorities on key issues through an interactive assessment.</p>
          <Link href="/quiz" className="flex items-center text-secondary font-bold text-sm hover:brightness-110 transition-all cursor-pointer">
            Start Quiz <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
          </Link>
        </motion.div>
      </section>

      {/* Trust & Security Section */}
      <section className="bg-surface-container-lowest py-24 border-y border-outline-variant/30 relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-error-container text-on-error-container border border-error/10">
                <span className="material-symbols-outlined text-sm">shield_lock</span>
                <span className="font-label text-xs uppercase tracking-widest font-bold">Consulate Grade Security</span>
              </div>
              <h2 className="text-5xl font-headline font-black text-on-surface tracking-tighter">Uncompromising Security Architecture</h2>
              <p className="text-lg text-on-surface-variant leading-relaxed font-body">Your identity and your vote are protected by multi-layered cryptographic protocols, ensuring absolute privacy while maintaining verifiable integrity.</p>
              
              <div className="grid grid-cols-1 gap-8">
                {[
                  { title: "Biometric Linkage", desc: "Seamlessly tied to Aadhaar via secure enclaves.", icon: "fingerprint", color: "primary" },
                  { title: "Zero-Knowledge Proofs", desc: "Validate your vote without revealing who you voted for.", icon: "memory", color: "secondary" }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 border border-outline-variant/20">
                      <span className={`material-symbols-outlined text-3xl text-${item.color}`}>{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-on-surface mb-1">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative flex justify-center"
            >
               <div className="relative w-full max-w-lg aspect-square rounded-full border border-outline-variant/30 flex items-center justify-center p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-surface-container-high to-background rounded-full -z-10"></div>
                  <div className="w-full h-full rounded-full border border-outline-variant/20 flex items-center justify-center animate-spin-slow">
                    <div className="w-1/2 h-1/2 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-3xl relative">
                      {/* Floating elements inside spin */}
                      <span className="material-symbols-outlined text-7xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                    </div>
                  </div>
                  {/* Static Floating Tooltips */}
                  <div className="absolute top-10 left-10 glass-card px-4 py-2 rounded-lg text-xs font-bold text-secondary flex items-center gap-2 border border-secondary/20">
                    <span className="w-2 h-2 rounded-full bg-secondary"></span> Encrypted
                  </div>
                  <div className="absolute bottom-10 right-10 glass-card px-4 py-2 rounded-lg text-xs font-bold text-on-surface flex items-center gap-2 border border-outline-variant/20">
                    <span className="material-symbols-outlined text-sm">lock</span> ECI Compliant
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="max-w-7xl mx-auto px-8 py-16 border-t border-outline-variant/10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-2xl font-black tracking-tighter text-on-surface">VoteSaathi</div>
          <p className="text-xs mt-2 text-on-surface-variant font-body">© 2024 The Digital Sovereign. Built for Democracy.</p>
        </div>
        <div className="flex gap-8 md:justify-end text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
           <Link href="#" className="hover:text-primary transition-colors">Charter</Link>
           <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
           <Link href="#" className="hover:text-primary transition-colors">Governance</Link>
           <Link href="#" className="hover:text-primary transition-colors">Whitepaper</Link>
        </div>
      </footer>
    </main>
  );
}
