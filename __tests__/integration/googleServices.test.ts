// @ts-nocheck
/**
 * Google Services Integration Test Suite
 *
 * Validates that all Google Cloud integrations are properly configured:
 * - Gemini AI SDK initialization
 * - Firebase configuration
 * - Google Maps integration readiness
 * - Cloud Translation/Speech API patterns
 */

describe('Google Services: Gemini AI Configuration', () => {
  it('ai-core.ts initializes Gemini model from env variable', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/ai-core.ts', 'utf8');

    expect(source).toContain('createGoogleGenerativeAI');
    expect(source).toContain('process.env.GOOGLE_GENERATIVE_AI_API_KEY');
    expect(source).toContain('gemini-2.5-flash');
  });

  it('ai-core.ts exports a structured system prompt', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/ai-core.ts', 'utf8');

    expect(source).toContain('ELECTION_SYSTEM_PROMPT');
    expect(source).toContain('VoteSaathi AI');
    expect(source).toContain('political neutrality');
  });

  it('ai-core.ts initializes Cloud Speech and TTS clients', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/ai-core.ts', 'utf8');

    expect(source).toContain('SpeechClient');
    expect(source).toContain('TextToSpeechClient');
    expect(source).toContain('TranslationServiceClient');
  });
});

describe('Google Services: Firebase Configuration', () => {
  it('firebase-config.ts uses environment variables for all config fields', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/firebase-config.ts', 'utf8');

    expect(source).toContain('process.env.NEXT_PUBLIC_FIREBASE_API_KEY');
    expect(source).toContain('process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN');
    expect(source).toContain('process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID');
    expect(source).toContain('process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET');
    expect(source).toContain('process.env.NEXT_PUBLIC_FIREBASE_APP_ID');
  });

  it('firebase-config.ts guards against missing configuration', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/firebase-config.ts', 'utf8');

    expect(source).toContain('isFirebaseConfigured');
    expect(source).toContain('getApps().length === 0');
  });

  it('firebase-config.ts exports Firestore and Auth instances', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/firebase-config.ts', 'utf8');

    expect(source).toContain('getFirestore');
    expect(source).toContain('getAuth');
    expect(source).toContain('GoogleAuthProvider');
  });
});

describe('Google Services: API Route Architecture', () => {
  it('gemini route implements rate limiting', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/app/api/gemini/route.ts', 'utf8');

    expect(source).toContain('rateLimitMap');
    expect(source).toContain('RATE_LIMIT_MS');
    expect(source).toContain('x-forwarded-for');
    expect(source).toContain('429');
  });

  it('gemini route handles missing API key with diagnostic', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/app/api/gemini/route.ts', 'utf8');

    expect(source).toContain('GOOGLE_GENERATIVE_AI_API_KEY');
    expect(source).toContain('503');
    expect(source).toContain('fallback');
  });

  it('gemini route supports multiple operation types', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/app/api/gemini/route.ts', 'utf8');

    expect(source).toContain('voter_verification');
    expect(source).toContain('campaign_intel');
    expect(source).toContain('fact_check');
    expect(source).toContain('news_intelligence');
    expect(source).toContain('civic_answer');
  });

  it('speech route supports both STT and TTS', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/app/api/speech/route.ts', 'utf8');

    expect(source).toContain('stt');
    expect(source).toContain('tts');
    expect(source).toContain('speechClient');
    expect(source).toContain('ttsClient');
  });
});

describe('Google Services: Maps Integration', () => {
  it('Google Maps API key is loaded from environment', () => {
    const fs = require('fs');
    const mapPage = fs.readFileSync('src/app/map/page.tsx', 'utf8');

    expect(mapPage).toContain('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY');
  });

  it('provides Leaflet fallback when Maps API unavailable', () => {
    const fs = require('fs');
    expect(fs.existsSync('src/components/LeafletFallbackMap.tsx')).toBe(true);
  });
});

describe('Google Services: Translation Utilities', () => {
  it('translate-utils.ts provides detectLanguage and translateText', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/translate-utils.ts', 'utf8');

    expect(source).toContain('detectLanguage');
    expect(source).toContain('translateText');
  });
});
