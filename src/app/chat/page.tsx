import Sidebar from "@/components/Sidebar";
import SaathiChat from "@/components/SaathiChat";

export default function ChatPage() {
  return (
    <div className="flex bg-background min-h-screen transition-colors overflow-hidden">
      <Sidebar />
      <main className="flex-1 lg:ml-20 flex flex-col h-screen overflow-hidden relative">
        <header className="px-8 py-10 lg:py-16 max-w-5xl mx-auto w-full">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2 font-label">Focused Session</p>
          <h1 className="text-4xl lg:text-6xl font-black font-headline text-on-background tracking-tight">AI Virtual Assistant</h1>
        </header>

        <div className="flex-1 max-w-5xl mx-auto w-full px-8 pb-12 overflow-hidden">
          <div className="h-full glass-card rounded-3xl overflow-hidden shadow-3xl">
            <SaathiChat />
          </div>
        </div>
      </main>
    </div>
  );
}
