import { google } from "@ai-sdk/google";
import { vertex } from "@ai-sdk/google-vertex";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function GET() {
  const models = ["gemini-1.5-flash", "gemini-1.5-pro"];
  const results: any[] = [];

  // 1. Test AI Studio (Generative Language API)
  for (const modelId of models) {
    try {
      const { text } = await generateText({
        model: google(modelId),
        prompt: "Say 'studio online'",
      });
      results.push({ provider: "AI_STUDIO", model: modelId, status: "SUCCESS", response: text });
    } catch (err: any) {
      results.push({ provider: "AI_STUDIO", model: modelId, status: "FAILED", error: err.message });
    }
  }

  // 2. Test Vertex AI (Google Cloud Project)
  const vertexModels = [
    { id: "gemini-1.5-flash", loc: "us-central1" },
    { id: "gemini-1.5-pro", loc: "us-central1" }
  ];

  for (const vModel of vertexModels) {
    try {
      const { text } = await generateText({
        model: vertex(vModel.id, {
          project: "votesaathi-e8265",
          location: vModel.loc
        }),
        prompt: "Say 'vertex online'",
      });
      results.push({ provider: "VERTEX_AI", model: vModel.id, status: "SUCCESS", response: text });
    } catch (err: any) {
      results.push({ provider: "VERTEX_AI", model: vModel.id, status: "FAILED", error: err.message });
    }
  }

  return NextResponse.json({
    diagnostics: results,
    env_present: !!process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    service_account_present: !!process.env.GOOGLE_APPLICATION_CREDENTIALS
  });
}
