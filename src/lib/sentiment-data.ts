export interface Trend {
  tag: string;
  count: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  growth: string;
}

export const socialTrends: Trend[] = [
  { tag: "#Election2024", count: "1.2M", sentiment: "positive", growth: "+12%" },
  { tag: "#VoterRegistration", count: "850K", sentiment: "positive", growth: "+45%" },
  { tag: "#BudgetResponse", count: "620K", sentiment: "negative", growth: "-5%" },
  { tag: "#DigitalConsulate", count: "420K", sentiment: "positive", growth: "+82%" },
  { tag: "#PollingBooth", count: "310K", sentiment: "neutral", growth: "+2%" },
  { tag: "#ManifestoLive", count: "210K", sentiment: "neutral", growth: "+15%" },
];

export const regionalMood = [
  { region: "North", mood: 72, sentiment: "Optimistic" },
  { region: "South", mood: 65, sentiment: "Neutral" },
  { region: "East", mood: 58, sentiment: "Concerned" },
  { region: "West", mood: 81, sentiment: "Very Positive" },
];

export const nationalSentiment = {
  score: 68,
  label: "Overall Optimistic",
  dominantThemes: ["Economic Growth", "Civic Tech", "Stability"]
};
