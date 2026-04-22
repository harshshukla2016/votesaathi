"use client";

export default function ConsulateLocation() {
  // Google Maps Embed (100% Free Mode - No API Key Required for simple embed)
  // Location: Nirvachan Sadan, Ashoka Rd, New Delhi (ECI Headquarters)
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9965825313923!2d77.20815167533555!3d28.623101675668383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd36a3f6990d%3A0xc480e0388e60f08e!2sElection%20Commission%20of%20India!5e0!3m2!1sen!2sin!4v1713800000000!5m2!1sen!2sin";

  return (
    <div className="w-full h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-sm font-black">location_on</span>
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant">Consulate HQ Location</h3>
        </div>
        <div className="text-[8px] font-black uppercase tracking-widest text-on-surface-variant opacity-40">
          Nirvachan Sadan, New Delhi
        </div>
      </div>

      <div className="flex-1 relative rounded-2xl overflow-hidden border border-outline-variant/10 shadow-2xl group">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.5) invert(0.05)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="group-hover:grayscale-0 transition-all duration-700"
        />
        
        {/* SCANLINE OVERLAY */}
        <div className="absolute inset-0 pointer-events-none z-10 opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

        {/* LOCATION OVERLAY */}
        <div className="absolute top-4 left-4 p-3 bg-surface/80 backdrop-blur-md rounded-xl border border-outline-variant/10 flex items-center gap-3 shadow-lg">
           <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xs">account_balance</span>
           </div>
           <div>
              <p className="text-[9px] font-black text-on-surface uppercase tracking-widest">ECI HEADQUARTERS</p>
              <p className="text-[8px] font-bold text-on-surface-variant">Strategic Command Center</p>
           </div>
        </div>
      </div>
    </div>
  );
}
