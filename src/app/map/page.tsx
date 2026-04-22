"use client";

import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { useLiveElectionResults, allianceColors } from "@/lib/results-mock";
import booths from "@/lib/booth-data.json";
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet (No SSR support)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const ZoomControl = dynamic(() => import('react-leaflet').then(mod => mod.ZoomControl), { ssr: false });

const MAP_CENTER: [number, number] = [21.7679, 78.8718];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function AnimatedCounter({ value, color }: { value: number, color: string }) {
  const spring = useSpring(value, { stiffness: 100, damping: 30 });
  const displayValue = useTransform(spring, (latest) => Math.floor(latest));
  useEffect(() => { spring.set(value); }, [value, spring]);

  return (
    <div className="flex flex-col items-center px-6 border-r border-outline-variant/10 last:border-0">
       <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1" style={{ color }}>Seats</span>
       <motion.span className="text-4xl font-headline font-black tracking-tighter text-on-surface">{displayValue}</motion.span>
    </div>
  );
}

export default function MapPage() {
  const [L, setL] = useState<any>(null);
  const liveResults = useLiveElectionResults();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [nearestBooths, setNearestBooths] = useState<any[]>([]);
  const [targetBooth, setTargetBooth] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  // Initialize Leaflet Icons (Fix for Next.js)
  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet);
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(loc);

        const sorted = booths.map(b => ({
          ...b,
          distance: calculateDistance(loc[0], loc[1], b.lat, b.lng)
        })).sort((a, b) => a.distance - b.distance);
        setNearestBooths(sorted.slice(0, 3));
      });
    }
  };

  if (!L) return <div className="flex items-center justify-center h-screen bg-background"><div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="flex bg-background min-h-screen transition-colors overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-20 h-screen relative overflow-hidden flex flex-col">
        
        {/* Live Seat Ticker Overlay */}
        <div className="absolute top-0 left-0 right-0 z-[1000] flex justify-center pt-8 pointer-events-none">
           <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card rounded-[2.5rem] p-6 shadow-3xl border-primary/20 flex items-center divide-x divide-outline-variant/10 overflow-hidden pointer-events-auto backdrop-blur-xl">
              <div className="pr-8 flex items-center gap-4">
                 <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-error">Live Tally</span>
                    </div>
                    <span className="text-[9px] font-bold text-on-surface-variant opacity-40">UTC {new Date(liveResults.timestamp).toLocaleTimeString()}</span>
                 </div>
                 <button onClick={locateUser} className="ml-4 p-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all border border-primary/20 group">
                    <span className="material-symbols-outlined text-sm group-hover:scale-110 transition-transform">my_location</span>
                 </button>
              </div>
              <AnimatedCounter value={liveResults.conservative} color={allianceColors.conservative} />
              <AnimatedCounter value={liveResults.progressive} color={allianceColors.progressive} />
              <AnimatedCounter value={liveResults.techno} color={allianceColors.techno} />
              <div className="pl-6 flex flex-col items-center">
                 <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Halfway Mark</span>
                 <span className="text-2xl font-black font-headline text-on-surface-variant">272</span>
              </div>
           </motion.div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative z-0">
          <MapContainer 
            center={MAP_CENTER} 
            zoom={5} 
            className="w-full h-full consulate-map" 
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              className="consulate-tile-layer"
            />
            
            {booths.map(booth => (
              <Marker 
                key={booth.id} 
                position={[booth.lat, booth.lng]}
                eventHandlers={{ click: () => setTargetBooth(booth.id) }}
              >
                <Popup className="consulate-popup">
                  <div className="p-4 bg-surface text-on-surface">
                    <h3 className="font-headline font-black text-lg mb-1">{booth.name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-4">Polling Station {booth.id}</p>
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${booth.crowdDensity > 70 ? 'bg-error' : 'bg-primary'}`} />
                       <span className="text-xs font-bold">Queue: {booth.crowdDensity}% Density</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

            {userLocation && <Marker position={userLocation} />}
            <ZoomControl position="bottomright" />
          </MapContainer>

          {/* Consulate Dark Map Filter Styles */}
          <style jsx global>{`
            .consulate-map {
              background: #121212 !important;
            }
            .consulate-tile-layer {
              filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%) grayscale(100%);
              opacity: 0.7;
            }
            .leaflet-container {
              background: #121212;
            }
            .consulate-popup .leaflet-popup-content-wrapper {
              background: var(--color-surface);
              color: var(--color-on-surface);
              border-radius: 1.5rem;
              padding: 0;
              overflow: hidden;
              border: 1px solid rgba(254, 152, 50, 0.2);
            }
            .consulate-popup .leaflet-popup-tip {
              background: var(--color-surface);
            }
          `}</style>

          {/* Map Overlay HUD */}
          <div className="absolute bottom-12 left-12 z-[1000] pointer-events-none">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 font-label">Open-Source Location Intelligence</p>
                <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-background drop-shadow-2xl">Election War Room</h1>
             </motion.div>
          </div>

          {/* Booth Locator HUD */}
          <AnimatePresence>
            {userLocation && nearestBooths.length > 0 && (
              <motion.div initial={{ opacity: 0, x: -400 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -400 }} className="absolute h-full top-0 left-20 w-96 glass-card rounded-r-[3rem] p-12 shadow-3xl flex flex-col z-[1000] pointer-events-auto backdrop-blur-2xl">
                 <div className="mb-10">
                    <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">Open Intelligence Active</p>
                    <h2 className="text-4xl font-headline font-black tracking-tighter text-on-background">Nearest Booths</h2>
                 </div>
                 <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                    {nearestBooths.map(booth => (
                      <div key={booth.id} className={`p-6 rounded-2xl border transition-all cursor-pointer ${targetBooth === booth.id ? 'bg-primary/20 border-primary' : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high'}`}>
                         <div className="flex justify-between items-start mb-4">
                            <h3 className="font-headline font-black text-on-surface leading-tight">{booth.name}</h3>
                            <span className="text-[10px] font-black text-secondary">{booth.distance.toFixed(1)} km</span>
                         </div>
                         <div className="flex items-center gap-3 mb-6">
                            <span className={`w-2 h-2 rounded-full ${booth.crowdDensity > 70 ? 'bg-error' : booth.crowdDensity > 30 ? 'bg-primary' : 'bg-secondary'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Queue: {booth.crowdDensity > 70 ? 'Busy' : 'Normal'}</span>
                         </div>
                         <button className="w-full py-3 bg-on-surface text-background font-black text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 transition-all">Focus on Map</button>
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setUserLocation(null)} className="mt-8 text-on-surface-variant font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-colors">Clear Selection</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
