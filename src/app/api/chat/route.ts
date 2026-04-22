import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Simple Rate Limiter for Hackathon Efficiency
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 2000; // 2 seconds between requests per IP

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const now = Date.now();
  const lastRequest = rateLimitMap.get(ip) || 0;

  if (now - lastRequest < RATE_LIMIT_MS) {
    return new Response(JSON.stringify({ error: "Too many requests. Please wait." }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  rateLimitMap.set(ip, now);

  const { messages } = await req.json();

  // If no API key is set, we'll provide a friendly mock response for the hackathon
  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.warn("GOOGLE_GENERATIVE_AI_API_KEY is missing. Using mock stream.");
    
    // Create a mock stream
    const encoder = new TextEncoder();
    const mockContent = "Greetings! I'm VoteSaathi, your digital consulate assistant. I've noticed you're exploring electoral insights. While I'm currently in a preview environment without an active API key, I can still guide you through the features of this platform. How can I assist you with the upcoming election data?";
    
    const stream = new ReadableStream({
      async start(controller) {
        for (const word of mockContent.split(' ')) {
          controller.enqueue(encoder.encode(word + ' '));
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  const result = await streamText({
    model: google('models/gemini-1.5-pro-latest'),
    messages,
    system: `You are VoteSaathi, a premium AI assistant for the Digital Consulate application.
    You are professional, authoritative, but approachable.
    Your goal is to help citizens understand electoral data, policy impacts, and the voting process.
    Keep responses concise and use a tone that reflects 'Consulate Grade Security' and trust.
    Refuse to take a side in political debates; provide neutral, data-driven insights instead.`,
  });

  return (result as any).toAIStreamResponse();
}
