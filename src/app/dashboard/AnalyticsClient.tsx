"use client";

import { useState, useEffect } from "react";
import { Chart } from "react-google-charts";
import { motion } from "framer-motion";
import electionData from "@/lib/election-data.json";
import { useLiveElectionResults, allianceColors } from "@/lib/results-mock";

export const turnoutChartOptions = {
  title: "Voter Turnout Trends (Historical vs Current)",
  curveType: "function",
  legend: { position: "bottom" },
  backgroundColor: "transparent",
  colors: ["#6366f1", "#fe9832"],
  hAxis: { textStyle: { color: "#9ca3af" } },
  vAxis: { textStyle: { color: "#9ca3af" }, gridlines: { color: "#374151" } },
  titleTextStyle: { color: "#faf8f9", fontSize: 16, bold: true },
};

export const seatChartOptions = {
  title: "Live Seat Distribution",
  pieHole: 0.4,
  is3D: false,
  backgroundColor: "transparent",
  legend: { textStyle: { color: "#faf8f9" } },
  colors: ["#fe9832", "#6366f1", "#8dfc75", "#9ca3af"],
  titleTextStyle: { color: "#faf8f9", fontSize: 16, bold: true },
};

export default function AnalyticsClient() {
  const liveResults = useLiveElectionResults();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dynamicSeatData = [
    ["Party", "Seats Secured"],
    ["Conservative Alliance", liveResults.conservative],
    ["Progressive Bloc", liveResults.progressive],
    ["Techno-Democracy", liveResults.techno],
    ["Others", liveResults.others]
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Voter Turnout Trend */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-8 shadow-xl border-outline-variant/10"
      >
        <Chart
          chartType="LineChart"
          width="100%"
          height="300px"
          data={electionData.turnout_trends}
          options={turnoutChartOptions}
        />
        <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
           <span>Updated: {mounted ? new Date(liveResults.timestamp).toLocaleTimeString() : "--:--:--"}</span>
           <span className="text-secondary flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
             Live Data Sync
           </span>
        </div>
      </motion.div>

      {/* Seat Distribution (Live) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-3xl p-8 shadow-xl border-outline-variant/10"
      >
        <Chart
          chartType="PieChart"
          width="100%"
          height="300px"
          data={dynamicSeatData}
          options={seatChartOptions}
        />
        <div className="mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-on-surface-variant">
           <span>Total Seats: 543</span>
           <span className="text-primary font-black animate-pulse">WAR ROOM ANALYTICS ACTIVE</span>
        </div>
      </motion.div>

      {/* Phase Schedule Table */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="lg:col-span-2 glass-card rounded-3xl p-8 shadow-xl border-outline-variant/10 overflow-hidden"
      >
        <h3 className="text-on-background font-headline font-black text-lg mb-6 uppercase tracking-widest">Live Milestone Intelligence</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Phase Identifier</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Constituencies Covered</th>
                <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-on-surface-variant">Intelligence Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {electionData.phase_schedule.slice(1).map((row, i) => (
                <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 text-sm font-bold text-on-surface">{row[0]}</td>
                  <td className="py-4 text-sm text-on-surface-variant">{row[1]}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      row[2] === 'Completed' ? 'bg-secondary/10 text-secondary' :
                      row[2] === 'In Progress' ? 'bg-primary/10 text-primary animate-pulse' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {row[2]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
