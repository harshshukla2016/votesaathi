"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { model } from "@/lib/ai-core";

export interface ElectoralData {
  turnout: number;
  turnoutGrowth: number;
  demographics: { label: string; val: number; h: string }[];
  polling: { name: string; val: number; color: string }[];
  activity: { text: string; time: string; type: string }[];
  metrics: {
    mccCompliance: number;
    evmHealth: number;
    vvpatIndex: number;
    sentimentScore: number;
    securityLevel: string;
  };
}

export async function getElectoralPulse(scope: "Central" | "State" = "Central", stateName?: string): Promise<ElectoralData> {
  const geographicContext = scope === "State" && stateName ? `focused on the state of ${stateName}, India` : "focused on the National level across India";

  try {
    const { object } = await generateObject({
      model: model,
      schema: z.object({
        turnout: z.number().describe("Voter turnout percentage (e.g. 68.4)"),
        turnoutGrowth: z.number().describe("Growth in turnout percentage (e.g. 4.2)"),
        demographics: z.array(z.object({
          label: z.string().describe("Age group (e.g. '18-29')"),
          val: z.number().describe("Participation index (0-100)"),
          h: z.string().describe("Height percentage string (e.g. '60%')")
        })),
        polling: z.array(z.object({
          name: z.string().describe("Party name or Alliance"),
          val: z.number().describe("Polling percentage"),
          color: z.enum(["primary", "secondary"]).describe("Color representation for the UI")
        })),
        activity: z.array(z.object({
          text: z.string().describe("Recent election activity description"),
          time: z.string().describe("Relative time (e.g. '2 mins ago')"),
          type: z.enum(["error", "secondary", "primary"]).describe("Severity/Type of activity")
        })),
        metrics: z.object({
          mccCompliance: z.number().describe("Model Code of Conduct compliance percentage"),
          evmHealth: z.number().describe("EVM Readiness health index"),
          vvpatIndex: z.number().describe("VVPAT verification confidence index"),
          sentimentScore: z.number().describe("Overall voter sentiment score (0-100)"),
          securityLevel: z.enum(["High", "Moderate", "Standard"]).describe("Security deployment status")
        })
      }),
      prompt: `Generate real-time simulated electoral dashboard data ${geographicContext} for the ongoing Indian Election 2024. 
      If scope is State, ensure the parties and activities are relevant to that specific state's local issues and major state parties.
      Focus on high-fidelity electoral parameters: MCC compliance, EVM readiness, VVPAT verification, and voter sentiment.`,
    });

    return object;
  } catch (error) {
    console.warn("Failed to generate electoral pulse, using fallback:", error);
    // Fallback data if API fails
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
      ],
      metrics: {
        mccCompliance: 99.2,
        evmHealth: 100,
        vvpatIndex: 98.8,
        sentimentScore: 74,
        securityLevel: "High"
      }
    };
  }
}

