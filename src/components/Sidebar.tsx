"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "grid_view" },
  { name: "AI Assistant", href: "/chat", icon: "smart_toy" },
  { name: "Truth Center", href: "/truth", icon: "verified_user" },
  { name: "Live Results", href: "/map", icon: "analytics" },
  { name: "Citizen Forum", href: "/forum", icon: "forum" },
  { name: "Battle Arena", href: "/battle", icon: "sports_kabaddi" },
  { name: "Mastery", href: "/learn", icon: "psychology" },
  { name: "Rankings", href: "/leaderboard", icon: "military_tech" },
  { name: "My Ballot", href: "/ballot", icon: "how_to_vote" },
  { name: "Voter Education", href: "/timeline", icon: "menu_book" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col h-screen fixed left-0 top-0 z-40 bg-surface w-20 hover:w-72 transition-all duration-500 border-r border-outline-variant/10 overflow-y-auto group scrollbar-hide shadow-[20px_0_40px_rgba(0,0,0,0.05)] dark:shadow-[20px_0_40px_rgba(0,0,0,0.4)]">
      <div className="p-5 flex items-center gap-4 overflow-hidden border-b border-surface-container-high h-20 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
          <span className="material-symbols-outlined text-on-primary font-bold">how_to_vote</span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          <h1 className="text-xl font-black text-orange-500 font-headline tracking-tight">VoteSaathi</h1>
          <p className="text-[10px] text-on-surface-variant font-medium">Digital Consulate</p>
        </div>
      </div>
      
      <nav className="flex-1 py-6 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-6 px-6 py-4 transition-all duration-300 relative group/item ${
                isActive 
                  ? "text-orange-500 bg-orange-500/10" 
                  : "text-on-surface-variant hover:text-on-background hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <span className={`material-symbols-outlined transition-transform duration-300 group-hover/item:scale-110 ${isActive ? "fill" : ""}`}>
                {item.icon}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity font-headline font-bold whitespace-nowrap text-sm tracking-tight">
                {item.name}
              </span>
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-orange-500 rounded-l-full shadow-[0_0_10px_rgba(254,152,50,0.5)]" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-outline-variant/10">
        <Link 
          href="/chat"
          className="w-12 h-12 group-hover:w-full group-hover:px-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(254,152,50,0.3)] hover:shadow-[0_6px_20px_rgba(254,152,50,0.4)] transition-all overflow-hidden whitespace-nowrap"
        >
          <span className="material-symbols-outlined">mic</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">Voice Assistant</span>
        </Link>
      </div>
    </aside>
  );
}
