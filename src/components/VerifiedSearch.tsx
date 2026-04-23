"use client";

import { useEffect, useRef } from "react";

export default function VerifiedSearch() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    
    const script = document.createElement("script");
    script.src = "https://cse.google.com/cse.js?cx=partner-pub-0000000000000000:00000000000"; // Placeholder CX
    script.async = true;
    document.body.appendChild(script);
    
    initialized.current = true;
  }, []);

  return (
    <div className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-primary text-sm font-black">verified_user</span>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Verified Info X-Ray</h3>
      </div>
      
      <div className="gcse-search" data-resultsurl="/search-results" data-newwindow="true" data-queryparametername="q">
        {/* FALLBACK UI WHILE LOADING */}
        <div className="w-full h-12 bg-surface-container-high rounded-xl animate-pulse flex items-center px-4">
           <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-widest">Initializing Verified Search...</span>
        </div>
      </div>

      <p className="mt-4 text-[9px] text-on-surface-variant/60 italic leading-relaxed">
        Note: This tool uses Google Programmable Search to query only official ECI and government domains (.gov.in).
      </p>

      <style jsx global>{`
        .gsc-control-cse {
          background-color: transparent !important;
          border: none !important;
          padding: 0 !important;
        }
        .gsc-input-box {
          border-radius: 12px !important;
          border: 1px solid var(--outline-variant) !important;
          background: var(--surface-container-high) !important;
          padding: 4px 12px !important;
        }
        .gsc-search-button-v2 {
          background-color: var(--primary) !important;
          border-radius: 10px !important;
          border: none !important;
          padding: 10px 16px !important;
        }
        .gsc-input {
          font-family: inherit !important;
          font-size: 14px !important;
          color: var(--on-surface) !important;
        }
      `}</style>
    </div>
  );
}
