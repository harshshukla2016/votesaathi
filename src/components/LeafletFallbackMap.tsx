"use client";

import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";
import booths from "@/lib/booth-data.json";
import 'leaflet/dist/leaflet.css';

// Dynamic import for Leaflet (No SSR support)
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const MAP_CENTER: [number, number] = [21.7679, 78.8718];

export default function LeafletFallbackMap() {
  const [L, setL] = useState<unknown>(null);

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet);
      delete (leaflet.Icon.Default.prototype as unknown)._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  if (!L) return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-background gap-4">
       <div className="animate-spin w-10 h-10 border-4 border-secondary border-t-transparent rounded-full" />
       <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Activating Open-Source Failover...</p>
    </div>
  );

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={MAP_CENTER} 
        zoom={5} 
        className="w-full h-full" 
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
      </MapContainer>

      <style jsx global>{`
        .consulate-tile-layer {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%) grayscale(100%);
          opacity: 0.7;
        }
        .leaflet-container {
          background: #121212;
        }
        .consulate-popup .leaflet-popup-content-wrapper {
          background: #1e1e1e;
          color: #ffffff;
          border-radius: 1rem;
          border: 1px solid rgba(254, 152, 50, 0.2);
        }
      `}</style>
    </div>
  );
}
