import { translateClient, PROJECT_ID, LOCATION } from "./ai-core";

/**
 * Detects the language of the given text.
 * Returns 'en', 'hi', or other ISO codes.
 */
export async function detectLanguage(text: string): Promise<string> {
  try {
    const [response] = await translateClient.detectLanguage({
      parent: `projects/${PROJECT_ID}/locations/${LOCATION}`,
      content: text,
      mimeType: "text/plain",
    });
    return response.languages?.[0]?.languageCode || "en";
  } catch (error) {
    console.error("Language detection failed:", error);
    return "en";
  }
}

/**
 * Translates text to the target language.
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const [response] = await translateClient.translateText({
      parent: `projects/${PROJECT_ID}/locations/${LOCATION}`,
      contents: [text],
      mimeType: "text/plain",
      targetLanguageCode: targetLanguage,
    });
    return response.translations?.[0]?.translatedText || text;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
}

/**
 * Helper to ensure the response is bilingual if requested.
 */
export async function ensureLanguage(text: string, targetLang: string): Promise<string> {
  const currentLang = await detectLanguage(text);
  if (currentLang !== targetLang) {
    return translateText(text, targetLang);
  }
  return text;
}
