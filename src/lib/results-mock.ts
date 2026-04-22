"use client";

import { useState, useEffect } from "react";

export interface LiveResults {
  conservative: number;
  progressive: number;
  techno: number;
  others: number;
  isSimulated: boolean;
  timestamp: string;
}

export function useLiveElectionResults() {
  const [results, setResults] = useState<LiveResults>({
    conservative: 272,
    progressive: 184,
    techno: 42,
    others: 45,
    isSimulated: true,
    timestamp: new Date().toISOString()
  });

  useEffect(() => {
    // Simulate lead changes every 10 seconds
    const interval = setInterval(() => {
      setResults(prev => {
        const rand = Math.random();
        const delta = Math.floor(Math.random() * 2) + 1;
        
        if (rand > 0.6) {
          return { ...prev, conservative: prev.conservative + delta, others: prev.others - delta, timestamp: new Date().toISOString() };
        } else if (rand > 0.3) {
          return { ...prev, progressive: prev.progressive + delta, others: prev.others - delta, timestamp: new Date().toISOString() };
        } else {
          return { ...prev, techno: prev.techno + delta, others: prev.others - delta, timestamp: new Date().toISOString() };
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return results;
}

export const allianceColors: Record<string, string> = {
  conservative: "#fe9832", // Orange/Primary
  progressive: "#6366f1",  // Blue/Secondary
  techno: "#8dfc75",       // Green/Tertiary
  others: "#24252b"        // Dark Surface
};
