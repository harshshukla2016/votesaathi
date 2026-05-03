// @ts-nocheck
"use client";

import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

import { useLiveElectionResults, allianceColors } from "@/lib/results-mock";
import booths from "@/lib/booth-data.json";
import LeafletFallbackMap from "@/components/LeafletFallbackMap";

const MAP_CENTER = { lat: 21.7679, lng: 78.8718 };

const containerStyle = {
  width: '100%',
  height: '100%'
};

const darkMapStyle = [
  { "elementType": "geometry", "stylers": [{ "color": "#212121" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#212121" }] },
  { "featureType": "administrative", "elementType": "geometry", "stylers": [{ "color": "#757575" }] },
  { "featureType": "administrative.country", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "administrative.land_parcel", "stylers": [{ "visibility": "off" }] },
  { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#181818" }] },
  { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "featureType": "poi.park", "elementType": "labels.text.stroke", "stylers": [{ "color": "#1b1b1b" }] },
  { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "color": "#2c2c2c" }] },
  { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#8a8a8a" }] },
  { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#373737" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#3c3c3c" }] },
  { "featureType": "road.highway.controlled_access", "elementType": "geometry", "stylers": [{ "color": "#4e4e4e" }] },
  { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#000000" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#3d3d3d" }] }
];

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

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const liveResults = useLiveElectionResults();
  const [userLocation, setUserLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [nearestBooths, setNearestBooths] = useState<unknown[]>([]);
  const [selectedBooth, setSelectedBooth] = useState<unknown | null>(null);
  const [showFailoverAlert, setShowFailoverAlert] = useState(false);
  const [forceFallback, setForceFallback] = useState(true); // Default to Open-Source for stability

  // Only attempt Google Maps load if explicitly requested
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: forceFallback ? "" : (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "")
  });

  useEffect(() => {
    if (loadError) {
      console.warn("Google Maps load error, falling back to Leaflet:", loadError);
       
      setForceFallback(true);
      setShowFailoverAlert(true);
    }
  }, [loadError]);

  const locateUser = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        map?.panTo(loc);
        map?.setZoom(12);

        const sorted = booths.map(b => ({
          ...b,
          distance: calculateDistance(loc.lat, loc.lng, b.lat, b.lng)
        })).sort((a, b) => a.distance - b.distance);
        setNearestBooths(sorted.slice(0, 3));
      });
    }
  };

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  if (!isLoaded && !loadError) return <div className="flex items-center justify-center h-screen bg-background"><div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" /></div>;

  return (
    <div className="flex bg-background min-h-screen transition-colors overflow-hidden">
      <main className="flex-1 lg:ml-20 h-screen relative overflow-hidden flex flex-col">
        
        {/* Failover Alert */}
        <AnimatePresence>
          {showFailoverAlert && !forceFallback && (
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[2000] w-[90%] max-w-xl bg-surface-container-highest border border-primary/20 p-6 rounded-3xl shadow-3xl flex items-center gap-6"
            >
               <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-2xl">map</span>
               </div>
               <div className="flex-1">
                  <h4 className="text-sm font-black uppercase tracking-widest text-on-surface mb-1">Map Intelligence Syncing</h4>
                  <p className="text-[10px] font-medium text-on-surface-variant leading-relaxed">
                    Google Maps is taking longer than expected. You can continue waiting or activate the **Open-Source Failover Mesh** for instant access.
                  </p>
               </div>
               <div className="flex gap-2 shrink-0">
                  <button 
                    onClick={() => setForceFallback(true)}
                    className="px-4 py-2 bg-primary text-on-primary text-[9px] font-black uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                  >
                    Activate Failover
                  </button>
                  <button onClick={() => setShowFailoverAlert(false)} className="material-symbols-outlined text-on-surface-variant hover:text-on-surface">close</button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Live Seat Ticker Overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-center pt-8 pointer-events-none">
           <motion.div initial={{ y: -100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card rounded-[2.5rem] p-6 shadow-3xl border-primary/20 flex items-center divide-x divide-outline-variant/10 overflow-hidden pointer-events-auto backdrop-blur-xl">
              
              <div className="px-8 flex items-center gap-4">
                 <button 
                   onClick={() => setForceFallback(!forceFallback)}
                   className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${forceFallback ? 'bg-surface-container-highest text-on-surface hover:bg-primary/20' : 'bg-primary text-on-primary shadow-lg shadow-primary/20'}`}
                 >
                   {forceFallback ? 'Enable Google Maps' : 'Google Maps Active'}
                 </button>
              </div>

              <div className="px-8 flex items-center gap-4">
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
          {forceFallback || (loadError && !isLoaded) ? (
            <LeafletFallbackMap />
          ) : (
            <GoogleMap
              mapContainerStyle={containerStyle}
            center={MAP_CENTER}
            zoom={5}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              styles: darkMapStyle,
              disableDefaultUI: true,
              zoomControl: true,
              zoomControlOptions: {
                 position: google.maps.ControlPosition.RIGHT_BOTTOM
              }
            }}
          >
            {booths.map(booth => (
              <Marker 
                key={booth.id} 
                position={{ lat: booth.lat, lng: booth.lng }}
                onClick={() => setSelectedBooth(booth)}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
                }}
              />
            ))}

            {userLocation && (
              <Marker 
                position={userLocation}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                }}
              />
            )}

            {selectedBooth && (
              <InfoWindow
                position={{ lat: selectedBooth.lat, lng: selectedBooth.lng }}
                onCloseClick={() => setSelectedBooth(null)}
              >
                <div className="p-4 bg-surface text-on-surface max-w-xs">
                  <h3 className="font-headline font-black text-lg mb-1">{selectedBooth.name}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Polling Station {selectedBooth.id}</p>
                  <p className="text-xs mb-4 text-on-surface-variant leading-relaxed">{selectedBooth.address}</p>
                  <div className="flex items-center gap-2 mb-4">
                     <span className={`w-2 h-2 rounded-full ${selectedBooth.crowdDensity > 70 ? 'bg-error' : 'bg-primary'}`} />
                     <span className="text-xs font-bold">Queue: {selectedBooth.crowdDensity}% Density</span>
                  </div>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${selectedBooth.lat},${selectedBooth.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-3 bg-primary text-on-primary text-center font-black text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary/20"
                  >
                    Get Directions
                  </a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}

          {/* Map Overlay HUD */}
          <div className="absolute bottom-12 left-12 z-10 pointer-events-none">
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 font-label">Google Maps Intelligence Active</p>
                <h1 className="text-5xl lg:text-7xl font-headline font-black tracking-tighter text-on-background drop-shadow-2xl">Election War Room</h1>
             </motion.div>
          </div>

          {/* Booth Locator HUD */}
          <AnimatePresence>
            {userLocation && nearestBooths.length > 0 && (
              <motion.div initial={{ opacity: 0, x: -400 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -400 }} className="absolute h-full top-0 left-20 w-96 glass-card rounded-r-[3rem] p-12 shadow-3xl flex flex-col z-20 pointer-events-auto backdrop-blur-2xl">
                 <div className="mb-10">
                    <p className="text-primary font-bold text-[10px] uppercase tracking-widest mb-1">Open Intelligence Active</p>
                    <h2 className="text-4xl font-headline font-black tracking-tighter text-on-background">Nearest Booths</h2>
                 </div>
                 <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-hide">
                    {nearestBooths.map(booth => (
                      <div key={booth.id} className={`p-6 rounded-2xl border transition-all cursor-pointer ${selectedBooth?.id === booth.id ? 'bg-primary/20 border-primary' : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high'}`}>
                         <div className="flex justify-between items-start mb-4">
                            <h3 className="font-headline font-black text-on-surface leading-tight">{booth.name}</h3>
                            <span className="text-[10px] font-black text-secondary">{booth.distance.toFixed(1)} km</span>
                         </div>
                         <div className="flex items-center gap-3 mb-6">
                            <span className={`w-2 h-2 rounded-full ${booth.crowdDensity > 70 ? 'bg-error' : booth.crowdDensity > 30 ? 'bg-primary' : 'bg-secondary'}`} />
                            <span className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Queue: {booth.crowdDensity > 70 ? 'Busy' : 'Normal'}</span>
                         </div>
                         <div className="flex gap-2">
                           <button 
                             onClick={() => {
                               setSelectedBooth(booth);
                               map?.panTo({ lat: booth.lat, lng: booth.lng });
                               map?.setZoom(15);
                             }} 
                             className="flex-1 py-3 bg-on-surface text-background font-black text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 transition-all"
                           >
                             Focus
                           </button>
                           <a 
                             href={`https://www.google.com/maps/dir/?api=1&destination=${booth.lat},${booth.lng}`}
                             target="_blank"
                             rel="noopener noreferrer"
                             className="flex-1 py-3 bg-primary text-on-primary text-center font-black text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 transition-all"
                           >
                             Navigate
                           </a>
                         </div>
                      </div>
                    ))}
                 </div>
                 <button onClick={() => setUserLocation(null)} className="mt-8 text-on-surface-variant font-bold text-[10px] uppercase tracking-widest hover:text-primary transition-colors">Clear Selection</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <style jsx global>{`
        .gm-style-iw-c {
          background-color: transparent !important;
          padding: 0 !important;
          box-shadow: none !important;
        }
        .gm-style-iw-d {
          overflow: hidden !important;
        }
        .gm-style-iw-t::after {
          background: var(--color-surface) !important;
        }
      `}</style>
    </div>
  );
}
