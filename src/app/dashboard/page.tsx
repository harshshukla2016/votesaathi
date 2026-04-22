import Sidebar from "@/components/Sidebar";
import SaathiChat from "@/components/SaathiChat";
import { getElectoralPulse } from "@/app/actions";
// Note: We need a client component for the animated widgets to use framer-motion
import DashboardClient from "./DashboardClient";

export default async function Dashboard() {
  const data = await getElectoralPulse();

  return (
    <div className="flex bg-background min-h-screen transition-colors">
      <Sidebar />
      <main className="flex-1 lg:ml-20 flex flex-col min-h-screen">
        <header className="px-8 py-10 lg:py-16 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-on-surface-variant text-xs font-bold tracking-[0.2em] uppercase mb-2">Live Insights</h2>
            <h1 className="text-4xl lg:text-6xl font-black font-headline text-on-background tracking-tight">Electoral Pulse</h1>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-high px-4 py-2 rounded-lg flex items-center gap-2 border border-outline-variant/10">
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_rgba(141,252,117,1)]"></div>
              <span className="text-sm font-medium text-on-surface-variant uppercase tracking-widest font-label">Updates Active</span>
            </div>
          </div>
        </header>

        {/* Passing the server data to the client component for animation */}
        <DashboardClient initialData={data} />
      </main>
    </div>
  );
}
