"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

import UserChip from "./UserChip";
import NotificationHub from "./NotificationHub";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize theme from document class
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-2xl border-b border-outline-variant/10 shadow-2xl shadow-black/5 dark:shadow-black/40 transition-colors font-sans">
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-black tracking-tighter text-orange-500 font-headline">
            VoteSaathi
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" aria-label="Electoral Insights Dashboard" className="text-on-surface-variant hover:text-on-background transition-colors font-headline font-medium">
              Insights
            </Link>
            <Link href="/map" aria-label="Live Election Results GIS Map" className="text-on-surface-variant hover:text-on-background transition-colors font-headline font-medium">
              Live Results
            </Link>
            <Link href="/timeline" aria-label="Voter Pathway and Timelines" className="text-on-surface-variant hover:text-on-background transition-colors font-headline font-medium">
              Pathway
            </Link>
            <Link href="/learn" aria-label="Electoral Mastery and Education" className="text-on-surface-variant hover:text-on-background transition-colors font-headline font-medium">
              Mastery
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-all text-orange-500"
          >
            <span className="material-symbols-outlined">
              {isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
          
          <NotificationHub />

          <div className="hidden sm:flex items-center gap-4 ml-2 pl-4 border-l border-outline-variant/20">
            <UserChip />
          </div>
        </div>
      </div>
    </nav>
  );
}
