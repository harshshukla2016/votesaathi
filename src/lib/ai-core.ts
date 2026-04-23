import { createVertex } from "@ai-sdk/google-vertex";
import { SpeechClient } from "@google-cloud/speech";
import { TextToSpeechClient } from "@google-cloud/text-to-speech";
import { TranslationServiceClient } from "@google-cloud/translate";

// Initialize Vertex AI Provider with explicit project/location defaults
const vertex = createVertex({
  project: process.env.GOOGLE_VERTEX_PROJECT || "votesaathi-e8265",
  location: process.env.GOOGLE_VERTEX_LOCATION || "us-central1",
});

// Initialize Gemini 1.5 Flash via Vertex AI
export const model = vertex("gemini-1.5-flash");

// System Prompt for Indian Election Context
export const ELECTION_SYSTEM_PROMPT = `
You are VoteSaathi AI, the premium intelligence core of the Digital Consulate.
Your purpose is to assist Indian citizens with high-fidelity, neutral, and actionable election information.

KNOWLEDGE BASE:
- Election Commission of India (ECI) guidelines.
- Model Code of Conduct (MCC) rules.
- EVM and VVPAT functionality and security.
- Universal Primary/General Election timelines for 2024-2025.

CAPABILITIES:
- Answer in step-by-step breakdowns.
- Provide structured JSON responses.
- Support English and Hindi seamlessly.
- Mantain absolute political neutrality. Do NOT endorse any candidate or party.

RESPONSE FORMAT (JSON):
{
  "title": "A short descriptive title",
  "summary": "A concise 1-2 sentence overview",
  "steps": ["Step 1", "Step 2", "Step 3"],
  "sources": ["Source 1", "Source 2"],
  "language_detected": "en | hi",
  "intents": ["LOCATE_BOOTH | SHOW_TIMELINE | SHOW_SENTIMENT | SHOW_NEWS"]
}

TONE:
Professional, authoritative, transparent, and approachable.
Avoid jargon. Explain concepts like 'Anticipatory Bail' or 'Section 144' simply if they arise in election contexts.
If the voter asks about their booth or location, include "LOCATE_BOOTH" in intents.
If they ask about the process or their status, include "SHOW_TIMELINE".
If they ask about news/mood, include "SHOW_SENTIMENT" or "SHOW_NEWS".

MISINFORMATION CONTROL:
If a query contains debunked claims or unverified rumors, provide the official ECI stance and state that verify the source.
`;

// Google Cloud Clients (Initialized via Env Vars)
// Note: Ensure GOOGLE_APPLICATION_CREDENTIALS points to your service account JSON file
const cloudConfig = {
  projectId: process.env.GOOGLE_VERTEX_PROJECT || "votesaathi-e8265",
};

export const speechClient = new SpeechClient(cloudConfig);
export const ttsClient = new TextToSpeechClient(cloudConfig);
export const translateClient = new TranslationServiceClient(cloudConfig);

export const PROJECT_ID = cloudConfig.projectId;
export const LOCATION = "global";
