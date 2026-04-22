import { NextRequest, NextResponse } from "next/server";
import { speechClient, ttsClient } from "@/lib/ai-core";

/**
 * POST /api/speech
 * Handles STT (Speech-to-Text) and TTS (Text-to-Speech)
 * Request body: { type: 'stt' | 'tts', audio?: string, text?: string, languageCode?: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { type, audio, text, languageCode = "en-IN" } = await req.json();

    if (type === "stt" && audio) {
      // Speech-to-Text
      const request = {
        audio: { content: audio },
        config: {
          encoding: "WEBM_OPUS" as any,
          sampleRateHertz: 48000,
          languageCode: languageCode,
        },
      };

      const [response] = await speechClient.recognize(request as any);
      const transcription = response.results
        ?.map((result) => result.alternatives?.[0].transcript)
        .join("\n");

      if (!transcription) {
        return NextResponse.json({ error: "No speech detected" }, { status: 422 });
      }

      return NextResponse.json({ text: transcription });
    } 
    
    if (type === "tts" && text) {
      // Text-to-Speech
      const [response] = await ttsClient.synthesizeSpeech({
        input: { text },
        voice: { 
          languageCode, 
          ssmlGender: "NEUTRAL",
          name: languageCode === "hi-IN" ? "hi-IN-Wavenet-D" : "en-IN-Wavenet-D"
        },
        audioConfig: { audioEncoding: "MP3" },
      });

      const audioContent = (response.audioContent as Buffer).toString("base64");
      return NextResponse.json({ audio: audioContent });
    }

    return NextResponse.json({ error: "Invalid request type or missing data" }, { status: 400 });
  } catch (error: any) {
    console.error("Speech API Error:", error);
    if (error.message?.includes("Billing") || error.message?.includes("PRECONDITION")) {
      return NextResponse.json({ error: "BILLING_REQUIRED", details: "Google Cloud Billing must be enabled for neural voices." }, { status: 402 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
