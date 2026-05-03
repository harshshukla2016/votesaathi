export interface Party {
  name: string;
  fullName: string;
  alliance: 'NDA' | 'I.N.D.I.A' | 'Third Front' | 'Others';
  symbol: string;
  keyLeaders: string[];
  ideology: string[];
}

export interface ElectionPhase {
  phase: number;
  date: string;
  states: string[];
}

export interface StateElectionInfo {
  state: string;
  totalSeats: number;
  phases: number[];
  keyParties: string[];
  currentSentiment: 'Pro-Incumbency' | 'Anti-Incumbency' | 'Battleground' | 'Neutral';
  topIssues: string[];
}

export const nationalParties: Party[] = [
  {
    name: "BJP",
    fullName: "Bharatiya Janata Party",
    alliance: "NDA",
    symbol: "Lotus",
    keyLeaders: ["Narendra Modi", "Amit Shah", "J.P. Nadda"],
    ideology: ["Hindutva", "Economic Nationalism", "Social Conservatism"]
  },
  {
    name: "INC",
    fullName: "Indian National Congress",
    alliance: "I.N.D.I.A",
    symbol: "Hand",
    keyLeaders: ["Mallikarjun Kharge", "Rahul Gandhi", "Priyanka Gandhi"],
    ideology: ["Secularism", "Social Liberalism", "Welfare State"]
  },
  {
    name: "AITC",
    fullName: "All India Trinamool Congress",
    alliance: "I.N.D.I.A",
    symbol: "Flowers & Grass",
    keyLeaders: ["Mamata Banerjee", "Abhishek Banerjee"],
    ideology: ["Regionalism", "Populism", "Secularism"]
  },
  {
    name: "AAP",
    fullName: "Aam Aadmi Party",
    alliance: "I.N.D.I.A",
    symbol: "Broom",
    keyLeaders: ["Arvind Kejriwal", "Sanjay Singh", "Bhagwant Mann"],
    ideology: ["Anticorruption", "Social Welfare", "Civic Nationalism"]
  }
];

export const stateData: StateElectionInfo[] = [
  {
    state: "Uttar Pradesh",
    totalSeats: 80,
    phases: [1, 2, 3, 4, 5, 6, 7],
    keyParties: ["BJP", "SP", "BSP", "INC"],
    currentSentiment: "Pro-Incumbency",
    topIssues: ["Infrastructure", "Law and Order", "Religious Tourism", "Unemployment"]
  },
  {
    state: "Maharashtra",
    totalSeats: 48,
    phases: [1, 2, 3, 4, 5],
    keyParties: ["BJP", "SHS", "NCP", "INC", "SSUBT"],
    currentSentiment: "Battleground",
    topIssues: ["Agrarian Crisis", "Maratha Reservation", "Industrial Growth", "Local Governance"]
  },
  {
    state: "West Bengal",
    totalSeats: 42,
    phases: [1, 2, 3, 4, 5, 6, 7],
    keyParties: ["AITC", "BJP", "CPM", "INC"],
    currentSentiment: "Anti-Incumbency",
    topIssues: ["Local Corruption", "Internal Migration", "Welfare Schemes", "Political Violence"]
  },
  {
    state: "Tamil Nadu",
    totalSeats: 39,
    phases: [1],
    keyParties: ["DMK", "AIADMK", "BJP", "INC"],
    currentSentiment: "Neutral",
    topIssues: ["Federalism", "Language Identity", "Industrial Hubs", "Cauvery Water"]
  }
];

export const electionPhases: ElectionPhase[] = [
  { phase: 1, date: "April 19, 2024", states: ["Tamil Nadu", "Rajasthan", "Uttar Pradesh", "Madhya Pradesh"] },
  { phase: 2, date: "April 26, 2024", states: ["Kerala", "Karnataka", "Rajasthan", "Maharashtra"] },
  { phase: 3, date: "May 7, 2024", states: ["Gujarat", "Maharashtra", "Karnataka", "Uttar Pradesh"] }
];
