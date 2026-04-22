export interface Question {
  id: number;
  text: string;
  category: string;
  options: {
    text: string;
    scores: Record<string, number>; // Candidate Bloc -> Score Impact
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "How should the government prioritize climate action versus industrial growth?",
    category: "Environment",
    options: [
      { 
        text: "Aggressive net-zero targets, even if it slows short-term growth.", 
        scores: { "Progressive Bloc": 10, "Conservative Alliance": 2, "Green Path": 15 } 
      },
      { 
        text: "Balanced approach with significant incentives for green tech.", 
        scores: { "Progressive Bloc": 7, "Conservative Alliance": 6, "Green Path": 8 } 
      },
      { 
        text: "Prioritize growth and energy security via existing sources first.", 
        scores: { "Progressive Bloc": 2, "Conservative Alliance": 12, "Green Path": 1 } 
      }
    ]
  },
  {
    id: 2,
    text: "What is your stance on high-tech integration in public services?",
    category: "Technology",
    options: [
      { 
        text: "Full digital transformation, including AI-driven governance.", 
        scores: { "Progressive Bloc": 12, "Conservative Alliance": 8, "Techno-Democracy": 15 } 
      },
      { 
        text: "Selective adoption with human-first oversight filters.", 
        scores: { "Progressive Bloc": 8, "Conservative Alliance": 10, "Techno-Democracy": 5 } 
      }
    ]
  },
  {
    id: 3,
    text: "Which economic model best serves our future workforce?",
    category: "Economy",
    options: [
      { 
        text: "Robust social safety nets and wealth redistribution.", 
        scores: { "Progressive Bloc": 15, "Conservative Alliance": 3, "Green Path": 8 } 
      },
      { 
        text: "Deregulation and tax incentives to stimulate private enterprise.", 
        scores: { "Progressive Bloc": 3, "Conservative Alliance": 15, "Green Path": 2 } 
      }
    ]
  },
  {
    id: 4,
    text: "How should national security be balanced with personal privacy?",
    category: "Security",
    options: [
      { 
        text: "Privacy is paramount; strict limits on state surveillance.", 
        scores: { "Progressive Bloc": 10, "Conservative Alliance": 4, "Sovereign Privacy": 15 } 
      },
      { 
        text: "Collective security justifies advanced monitoring protocols.", 
        scores: { "Progressive Bloc": 5, "Conservative Alliance": 12, "Sovereign Privacy": 2 } 
      }
    ]
  }
];

export const candidateInfos: Record<string, { description: string, color: string }> = {
  "Progressive Bloc": { 
    description: "Focuses on social equity, aggressive climate policy, and digital rights.", 
    color: "secondary" 
  },
  "Conservative Alliance": { 
    description: "Emphasizes economic growth, national security, and traditional infrastructure.", 
    color: "primary" 
  },
  "Green Path": { 
    description: "A specialized platform dedicated solely to ecological restoration and sustainability.", 
    color: "secondary-dim" 
  },
  "Techno-Democracy": { 
    description: "Advocates for AI-governance, data-driven transparency, and rapid tech adoption.", 
    color: "tertiary" 
  },
  "Sovereign Privacy": { 
    description: "Champions decentralization, personal encryption, and anti-surveillance policy.", 
    color: "on-surface-variant" 
  }
};
