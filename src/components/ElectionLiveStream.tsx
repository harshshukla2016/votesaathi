"use client";

import { motion } from "framer-motion";

export default function ElectionLiveStream() {
  // DD News Live Stream (Official Government Channel)
  // Note: YouTube Video IDs for live streams can change, using a stable one or a placeholder
  const videoId = "Vz7668Oa0wA"; // DD News Live

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-error animate-pulse" />
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Live Broadcast Pulse</h3>
        </div>
        <div className="px-2 py-0.5 rounded-md bg-error/10 text-error text-[8px] font-black uppercase tracking-widest border border-error/20">
          Source: Sansad TV / DD News
        </div>
      </div>
      
      <div className="flex-1 relative rounded-2xl overflow-hidden border border-outline-variant/10 group shadow-2xl bg-surface-container-highest">
        {/* SCANLINE OVERLAY FOR AESTHETIC */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
        
        <iframe 
          width="100%" 
          height="100%" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1`}
          title="Election Live Stream" 
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
          className="grayscale-[0.2] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
        ></iframe>

        {/* INFO OVERLAY */}
        <div className="absolute bottom-4 left-4 right-4 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between transform translate-y-2 group-hover:translate-y-0 transition-transform">
           <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-sm font-black">satellite_alt</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-white/80">Satellite Feed: ACTIVE</span>
           </div>
           <div className="text-[9px] font-bold text-white/40">CONSULATE_MESH_01</div>
        </div>
      </div>
    </div>
  );
}
