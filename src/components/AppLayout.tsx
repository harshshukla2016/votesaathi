"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (pathname.startsWith("/lumina")) {
    return <>{children}</>;
  }

  const isLandingPage = pathname === "/";
  const showSidebar = !isLandingPage;

  return (
    <>
      <Navbar />
      {showSidebar && <Sidebar />}
      <div className={`transition-all duration-300 ${showSidebar ? "lg:pl-20 pb-16 lg:pb-0 pt-20" : "pt-20"}`}>
        {children}
      </div>
    </>
  );
}
