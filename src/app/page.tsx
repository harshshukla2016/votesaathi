"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex-grow pt-24 pb-32 relative z-10 overflow-x-hidden transition-colors">
      {/* Dynamic Sovereign Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-primary/20 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-secondary/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_70%)] opacity-80"></div>
      </div>

      {/* Hero Section: High-Energy Entrance */}
      <section className="max-w-7xl mx-auto px-8 mb-40 flex flex-col lg:flex-row items-center gap-16 relative">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-surface-container-high/60 backdrop-blur-2xl border border-primary/20 shadow-lg shadow-primary/5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
            </span>
            <span className="text-[10px] font-black tracking-[0.3em] uppercase font-label text-on-surface">Intelligence Online</span>
          </div>

          <h1 className="text-7xl lg:text-9xl font-black font-headline tracking-tighter leading-[0.85] text-on-surface">
            The Future <br/>
            <span className="text-gradient-saffron drop-shadow-2xl">Verified</span>
          </h1>

          <p className="text-2xl text-on-surface-variant font-body max-w-xl leading-relaxed font-medium">
            Step into the Digital Consulate. <span className="text-on-surface">VoteSaathi</span> combines sovereign AI intelligence with verifiable integrity to empower the Indian voter.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-6">
            <motion.button 
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative bg-primary text-on-primary font-black font-headline py-5 px-12 rounded-2xl shadow-3xl shadow-primary/40 flex items-center justify-center gap-4 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="material-symbols-outlined text-2xl">bolt</span>
              <span className="text-lg uppercase tracking-widest">Enter Dashboard</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ backgroundColor: "rgba(var(--color-surface-container-highest), 1)" }}
              className="px-10 py-5 bg-surface-container-high/40 backdrop-blur-md text-on-surface rounded-2xl font-headline font-black transition-all flex items-center justify-center gap-3 border border-outline-variant/30 uppercase tracking-widest text-sm"
            >
              <span className="material-symbols-outlined font-thin">play_circle</span>
              Experience AI
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotateY: -15, perspective: 1000 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          className="flex-1 relative perspective-1000"
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div 
            animate={{ y: [0, -20, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative group"
          >
            {/* Holographic Glow Aura */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/40 via-secondary/20 to-transparent rounded-full blur-[80px] opacity-60 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="relative rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(var(--color-primary),0.2)] bg-transparent transform-gpu" style={{ transform: "translateZ(50px)" }}>
              <Image 
                alt="VoteSaathi 3D EVM" 
                src="/evm_3d_render.png" 
                width={800} 
                height={800}
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000 ease-out drop-shadow-2xl"
                priority
              />
            </div>
            
            {/* Floating 3D Badge */}
            <motion.div 
              animate={{ z: [0, 30, 0], y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -right-6 glass-card p-6 rounded-3xl border border-white/20 shadow-2xl flex flex-col items-center gap-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary">Hardware Integrity</span>
              <span className="text-4xl font-headline font-black text-on-surface">100%</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Sovereign Pulse: Energy & Real-time Intelligence */}
      <section className="max-w-7xl mx-auto px-8 mb-40 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>
        
        <div className="pt-24 grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { label: "AI Scans Per Minute", value: "24.5K", icon: "bolt", color: "primary" },
            { label: "Truth Verified", value: "98.2%", icon: "verified", color: "secondary" },
            { label: "Digital Consulate Nodes", value: "1.2M", icon: "hub", color: "primary" },
            { label: "Uptime Integrity", value: "100%", icon: "shield", color: "secondary" }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 30, rotateX: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              className="group flex flex-col items-center text-center space-y-4 perspective-1000"
            >
              <div className={`w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20 group-hover:border-${stat.color}/40 transition-all duration-500 group-hover:scale-110 group-hover:rotate-y-12 shadow-xl`}>
                <span className={`material-symbols-outlined text-3xl text-${stat.color}`}>{stat.icon}</span>
              </div>
              <div>
                <h4 className="text-4xl font-headline font-black text-on-surface tracking-tighter">{stat.value}</h4>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-60">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Bento: 3D Re-energized 2.0 */}
      <section className="max-w-7xl mx-auto px-8 mb-40 grid grid-cols-1 md:grid-cols-3 gap-8 items-start perspective-1000">
        {/* Registration Card */}
        <motion.div
           initial={{ opacity: 0, y: 50, rotateX: 10 }}
           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
           whileHover={{ scale: 1.02, rotateY: -5, rotateX: 5, z: 20 }}
           viewport={{ once: true }}
           transition={{ type: "spring", stiffness: 300, damping: 20 }}
           className="group bg-surface-container-low border border-outline-variant/15 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden transform-gpu"
           style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:translate-z-12">
            <span className="material-symbols-outlined text-8xl font-thin">calendar_today</span>
          </div>
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8 border border-primary/20 transform group-hover:translate-z-12 transition-transform">
             <span className="material-symbols-outlined text-primary text-3xl">event</span>
          </div>
          <h3 className="text-2xl font-black font-headline text-on-surface mb-4 transform group-hover:translate-z-8">Election Timeline</h3>
          <p className="text-on-surface-variant font-body leading-relaxed mb-8 transform group-hover:translate-z-4">Track key dates, registration deadlines, and voting phases specific to your constituency.</p>
          <Link href="/timeline" className="inline-flex items-center gap-4 px-6 py-3 bg-surface-container-highest rounded-xl text-primary font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all transform group-hover:translate-z-12 shadow-lg hover:shadow-primary/30">
            View Schedule <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </motion.div>

        {/* Map Card (Center) */}
        <motion.div
           initial={{ opacity: 0, y: 50, rotateX: 10 }}
           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
           whileHover={{ scale: 1.05, z: 30 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
           className="group relative bg-surface-container-highest border border-outline-variant/15 rounded-[2.5rem] p-10 shadow-3xl md:-mt-12 overflow-hidden transform-gpu z-10"
           style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent pointer-events-none"></div>
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity mix-blend-overlay"
          >
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwz7yOIEWrlzoX6Akthr0JxuORRJ6wufbt3TARnslMdbvkBrfNL8PG1cDgnPs3dDJy-t0-kw1FpeRwVWnchP_4X_kxMPxkSTbPnuTbsG8MTIu4lMAZ9wIp6LWiKlHUGQgA2bUnQrsjUhW-yqsvmBcdkIBZvUTNnCmS2ADlOhV58LHTaMwVWoGP_7K_2Q06e1RME12NXlKJq6Ylg1M2JYqHbt3MCqcwb1UoNyJNSZSTJ7niGAaQ8a2JF-GO73PT4S5XNOwjXxKFnp_2" 
              alt="Map background" 
              fill
              className="object-cover scale-150"
            />
          </motion.div>
          <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/40 transform group-hover:translate-z-20 transition-transform">
              <span className="material-symbols-outlined text-on-primary text-3xl">map</span>
            </div>
            <h3 className="text-3xl font-black font-headline text-on-surface mb-4 transform group-hover:translate-z-12">Constituency Map</h3>
            <p className="text-on-surface-variant font-body leading-relaxed mb-8 transform group-hover:translate-z-8">Explore polling stations, demographic data, and candidate territories in your area.</p>
            <Link href="/map" className="inline-flex items-center gap-4 px-6 py-3 bg-primary/10 rounded-xl text-primary font-black text-xs uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all transform group-hover:translate-z-20 shadow-xl hover:shadow-primary/40">
               Explore Map <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
           initial={{ opacity: 0, y: 50, rotateX: 10 }}
           whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
           whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5, z: 20 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
           className="group bg-surface-container-low border border-outline-variant/15 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden transform-gpu"
           style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:translate-z-12">
            <span className="material-symbols-outlined text-8xl font-thin">psychology</span>
          </div>
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8 border border-secondary/20 transform group-hover:translate-z-12 transition-transform">
             <span className="material-symbols-outlined text-secondary text-3xl">quiz</span>
          </div>
          <h3 className="text-2xl font-black font-headline text-on-surface mb-4 transform group-hover:translate-z-8">Voter Match Quiz</h3>
          <p className="text-on-surface-variant font-body leading-relaxed mb-8 transform group-hover:translate-z-4">Discover which candidates align with your priorities on key issues through an interactive assessment.</p>
          <Link href="/quiz" className="inline-flex items-center gap-4 px-6 py-3 bg-surface-container-highest rounded-xl text-secondary font-black text-xs uppercase tracking-widest hover:bg-secondary hover:text-on-secondary transition-all transform group-hover:translate-z-12 shadow-lg hover:shadow-secondary/30">
            Start Quiz <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </motion.div>
      </section>

      {/* Trust & Security Section: The Command Center */}
      <section className="bg-surface-container-lowest py-32 border-y border-outline-variant/30 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-error/10 text-error border border-error/20">
                <span className="material-symbols-outlined text-sm font-black">shield_lock</span>
                <span className="font-label text-[10px] uppercase tracking-[0.3em] font-black">Sovereign Guard Enabled</span>
              </div>
              <h2 className="text-6xl font-headline font-black text-on-surface tracking-tighter leading-none">Uncompromising Security Architecture</h2>
              <p className="text-xl text-on-surface-variant leading-relaxed font-body font-medium">Your identity and your vote are protected by multi-layered cryptographic protocols, ensuring absolute privacy while maintaining verifiable integrity.</p>
              
              <div className="grid grid-cols-1 gap-10">
                {[
                  { title: "Biometric Linkage", desc: "Seamlessly tied to Aadhaar via secure hardware enclaves.", icon: "fingerprint", color: "primary" },
                  { title: "Zero-Knowledge Proofs", desc: "Validate your vote without revealing your choice.", icon: "memory", color: "secondary" }
                ].map((item) => (
                  <div key={item.title} className="flex gap-8 items-start group">
                    <div className="w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center shrink-0 border border-outline-variant/20 group-hover:scale-110 transition-transform shadow-lg">
                      <span className={`material-symbols-outlined text-3xl text-${item.color}`}>{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-on-surface mb-2">{item.title}</h4>
                      <p className="text-sm text-on-surface-variant leading-relaxed font-medium">{item.desc}</p>
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
               <div className="relative w-full max-w-lg aspect-square rounded-[3rem] border border-outline-variant/30 flex items-center justify-center p-12 overflow-hidden bg-surface-container-low shadow-3xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-full -z-10"></div>
                  <div className="w-full h-full rounded-full border border-outline-variant/20 flex items-center justify-center animate-spin-slow">
                    <div className="w-1/2 h-1/2 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-3xl relative">
                      <span className="material-symbols-outlined text-8xl text-primary drop-shadow-[0_0_20px_rgba(var(--color-primary),0.4)]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                    </div>
                  </div>
                  {/* Interactive Status Tooltips */}
                  <div className="absolute top-12 left-12 glass-card px-5 py-3 rounded-2xl text-[10px] font-black text-secondary flex items-center gap-3 border border-secondary/20 shadow-xl animate-pulse-soft">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    AES-256 ENCRYPTED
                  </div>
                  <div className="absolute bottom-12 right-12 glass-card px-5 py-3 rounded-2xl text-[10px] font-black text-on-surface flex items-center gap-3 border border-outline-variant/20 shadow-xl">
                    <span className="material-symbols-outlined text-sm text-primary">verified</span>
                    ECI COMPLIANT
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer: The Sovereign Charter */}
      <footer className="bg-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-24 border-t border-outline-variant/10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 items-start">
            <div className="md:col-span-2 space-y-6">
              <div className="text-4xl font-black tracking-tighter text-on-surface flex items-center gap-3">
                 <span className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary text-2xl font-black">token</span>
                 </span>
                 VoteSaathi
              </div>
              <p className="text-sm text-on-surface-variant font-medium leading-relaxed max-w-sm">
                The Digital Consulate for Indian Democracy. Empowering 1.4 Billion citizens with sovereign AI intelligence and verifiable integrity.
              </p>
              <div className="flex gap-4">
                 {['facebook', 'twitter', 'linkedin', 'youtube'].map(s => (
                   <div key={s} className="w-10 h-10 rounded-full bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-on-primary transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-lg">public</span>
                   </div>
                 ))}
              </div>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Protocol</h4>
               <ul className="space-y-4 text-xs font-bold text-on-surface-variant">
                  <li><Link href="#" className="hover:text-primary transition-colors">Governance Charter</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Digital Privacy Act</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">AI Ethics Manifest</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Technical Whitepaper</Link></li>
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary">Ecosystem</h4>
               <ul className="space-y-4 text-xs font-bold text-on-surface-variant">
                  <li><Link href="/battle" className="hover:text-secondary transition-colors">Competitive Battle</Link></li>
                  <li><Link href="/forum" className="hover:text-secondary transition-colors">Citizen Forum</Link></li>
                  <li><Link href="/truth" className="hover:text-secondary transition-colors">Truth Center</Link></li>
                  <li><Link href="/learn" className="hover:text-secondary transition-colors">Mastery Module</Link></li>
               </ul>
            </div>
          </div>

          <div className="mt-24 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
              © 2024 THE DIGITAL SOVEREIGN. BUILT FOR THE FUTURE OF BHARAT.
            </p>
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
               <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  SYSTEMS NOMINAL
               </span>
               <span>v1.2.4-PROD</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
