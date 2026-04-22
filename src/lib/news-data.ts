export interface NewsArticle {
  id: string;
  source: string;
  title: string;
  rawContent: string;
  category: string;
  timestamp: string;
}

export const rawNewsArticles: NewsArticle[] = [
  {
    id: "N001",
    source: "Global Times Dispatch",
    title: "Electoral Commission Announces Digital Reform Strategy for 2024",
    rawContent: "In a landmark move today, the Electoral Commission announced an expansive digital reform strategy aimed at increasing transparency. The strategy involves the deployment of over 50,000 new VVPAT-enabled voting machines and a real-time results dashboard for the public. Critics however argue that the timeline for deployment is overly ambitious given the logistical challenges in remote areas. The commission spokesperson countered this by highlighting the successful pilot programs carried out in three major states over the last fiscal year. This reform is expected to set a new standard for modern democracies globally.",
    category: "Policy",
    timestamp: "8m ago"
  },
  {
    id: "N002",
    source: "National Bulletin",
    title: "Phase 3 Voter Turnout Hits Record High Amid Moderate Weather",
    rawContent: "Phase 3 of the general elections concluded yesterday with a staggering 72% turnout, surpassing the previous record of 68% in 2018. Political analysts attribute this surge to increased youth participation and a decade-long drive for voter awareness. The weather remained cooperative across most constituencies, though localized rain in the North-East caused minor delays in about 200 booths. Security remained tight with 2,000 extra personnel deployed to sensitive zones. Both major alliances have expressed confidence in winning the majority based on these high turnout numbers.",
    category: "Live Update",
    timestamp: "1h ago"
  }
];
