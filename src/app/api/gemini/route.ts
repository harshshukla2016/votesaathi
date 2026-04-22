import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { model, ELECTION_SYSTEM_PROMPT } from "@/lib/ai-core";
import { detectLanguage, translateText } from "@/lib/translate-utils";

/**
 * POST /api/gemini
 * Input: { query: string, language?: 'en' | 'hi' }
 */
export async function POST(req: NextRequest) {
  try {
    const { query, language = "en", type = "chat", rawContent = "" } = await req.json();

    // 0. Diagnostic Check for API Key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({ 
        error: "Consulate Intelligence Offline",
        diagnostic: "The 'GOOGLE_GENERATIVE_AI_API_KEY' is missing from .env.local. Please provide a Gemini 1.5 API Key to activate this feature.",
        fallback: true 
      }, { status: 503 });
    }

    // 1. Handle specialized News Intelligence, Fact Checking, & Forum Answers
    if (type === "news_intelligence" || type === "fact_check" || type === "civic_answer") {
       const systemPrompt = type === "news_intelligence" 
         ? `You are an AI News Analyst for the VoteSaathi Digital Consulate. Analyze raw news articles and provide a neutral intelligence briefing. Output MUST be valid JSON: { "shortSummary": "text", "keyTakeaways": [], "biasAssessment": { "score": 0-100, "label": "Neutral|Leaning|Persuasive", "reasoning": "text" }, "verifiedFacts": [] }`
         : type === "fact_check"
         ? `You are an AI Misinformation Detector for the VoteSaathi Digital Consulate. Your task is to verify electoral claims and rumors. Output MUST be valid JSON: { "truthScore": 0-100, "status": "Verified|Disputed|Misinformation", "analysis": "text", "credibleSources": ["source name"], "misleadingElements": ["e.g. Deepfake", "Out of Context"] }`
         : `You are the Saathi AI Liaison for the Citizen Forum. Provide a concise, expert, and neutral answer to the citizen's question about the election process. Output MUST be valid JSON: { "answer": "text", "confidence": "high", "officialSources": ["Election Commission of India"] }`;

       const { text: rawAiText } = await generateText({
         model: model,
         system: systemPrompt,
         prompt: `Content to Analyze:\n${rawContent || query}\n\nPlease generate the response in ${language === 'hi' ? 'Hindi' : 'English'}.`,
       });

       const cleanJson = rawAiText.replace(/```json|```/g, "").trim();
       return NextResponse.json(JSON.parse(cleanJson));
    }

    // 2. Default Chat/Query Logic
    const userLang = language || await detectLanguage(query);

    // 2. Translate input to English for more consistent prompt processing if it's in Hindi
    let processingQuery = query;
    if (userLang === "hi") {
      processingQuery = await translateText(query, "en");
    }

    // 3. Generate response via Gemini 1.5 Flash with structured output
    const { text } = await generateText({
      model: model,
      system: ELECTION_SYSTEM_PROMPT,
      prompt: `User Query: ${processingQuery}\n\nPlease generate a response following the JSON schema provided in the system prompt. Ensure the tone is neutral and professional.`,
    });

    // 4. Parse the AI response (Gemini might return markdown blocks, we need raw JSON)
    let jsonResponse;
    try {
      const cleanJson = text.replace(/```json|```/g, "").trim();
      jsonResponse = JSON.parse(cleanJson);
    } catch (e) {
      // Fallback if parsing fails
      jsonResponse = {
        title: "Information Assessment",
        summary: text,
        steps: [],
        sources: ["Election Commission of India"],
        language_detected: userLang
      };
    }

    // 5. Translate the final response back to Hindi if requested
    if (userLang === "hi") {
      jsonResponse.title = await translateText(jsonResponse.title, "hi");
      jsonResponse.summary = await translateText(jsonResponse.summary, "hi");
      jsonResponse.steps = await Promise.all(
        jsonResponse.steps.map((step: string) => translateText(step, "hi"))
      );
      jsonResponse.language_detected = "hi";
    }

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    const status = error.message?.includes("API key") ? 401 : 500;
    return NextResponse.json({ 
      error: "Consulate Intelligence Error",
      diagnostic: error.message,
      fallback: true
    }, { status });
  }
}
