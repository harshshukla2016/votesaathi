export interface BattleQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const battleQuestions: BattleQuestion[] = [
  {
    id: "q1",
    question: "What is the minimum age required for a citizen to vote in India?",
    options: ["16 Years", "18 Years", "21 Years", "25 Years"],
    answerIndex: 1,
    explanation: "The voting age was lowered from 21 to 18 by the 61st Amendment Act in 1988."
  },
  {
    id: "q2",
    question: "Who appoints the Chief Election Commissioner of India?",
    options: ["The Prime Minister", "The Chief Justice", "The President", "The Parliament"],
    answerIndex: 2,
    explanation: "The President of India appoints the Chief Election Commissioner and other Election Commissioners."
  },
  {
    id: "q3",
    question: "Which article of the Indian Constitution provides for the Election Commission?",
    options: ["Article 324", "Article 370", "Article 15", "Article 74"],
    answerIndex: 0,
    explanation: "Article 324 of the Constitution provides for an independent Election Commission to ensure free and fair elections."
  },
  {
    id: "q4",
    question: "Maximum how many days before an election should the Model Code of Conduct come into effect?",
    options: ["15 Days", "Immediately upon announcement", "30 Days", "7 Days"],
    answerIndex: 1,
    explanation: "The Model Code of Conduct (MCC) comes into force immediately after the Election Commission announces the election schedule."
  },
  {
    id: "q5",
    question: "What does VVPAT stand for in the context of EVMs?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Voter Validated Power Access Tool",
      "Voter Verified Process Authentication Technique",
      "Voter Validated Public Audit Track"
    ],
    answerIndex: 0,
    explanation: "VVPAT allows voters to verify that their vote was cast as intended by showing a paper slip for 7 seconds."
  }
];
