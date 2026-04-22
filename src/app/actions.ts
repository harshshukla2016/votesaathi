"use server";

export interface ElectoralData {
  turnout: number;
  turnoutGrowth: number;
  demographics: { label: string; val: number; h: string }[];
  polling: { name: string; val: number; color: string }[];
  activity: { text: string; time: string; type: string }[];
}

export async function getElectoralPulse(): Promise<ElectoralData> {
  // Simulate a network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real app, this would query a database like PostgreSQL or a specialized Election Data API
  return {
    turnout: 68.4,
    turnoutGrowth: 4.2,
    demographics: [
      { label: "18-29", val: 85, h: "60%" },
      { label: "30-44", val: 60, h: "40%" },
      { label: "45-64", val: 75, h: "50%" },
      { label: "65+", val: 90, h: "70%" }
    ],
    polling: [
      { name: "Progressive Bloc", val: 48.2, color: "secondary" },
      { name: "Conservative Alliance", val: 47.9, color: "primary" }
    ],
    activity: [
      { text: "Polling location change in District 7", time: "2 mins ago", type: "error" },
      { text: "New absentee ballot tracking data", time: "15 mins ago", type: "secondary" },
      { text: "Candidate town hall scheduled", time: "45 mins ago", type: "primary" }
    ]
  };
}
