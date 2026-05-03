// @ts-nocheck
/**
 * Security Audit Test Suite
 *
 * Validates that input sanitization, environment variable protection,
 * and XSS prevention are correctly implemented across the platform.
 */
import { validateEPIC, sanitizeInput } from '../../src/utils/validation';

describe('Security: Input Sanitization (OWASP XSS Prevention)', () => {
  it('strips script tags', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('alert("xss")');
  });

  it('strips nested HTML tags', () => {
    expect(sanitizeInput('<div><b>Bold</b></div>')).toBe('Bold');
  });

  it('strips event handler attributes', () => {
    expect(sanitizeInput('<img onerror="alert(1)" src="x">')).toBe('');
  });

  it('handles null/undefined gracefully', () => {
    expect(sanitizeInput('')).toBe('');
    expect(sanitizeInput(null as any)).toBe('');
    expect(sanitizeInput(undefined as any)).toBe('');
  });

  it('preserves safe text content', () => {
    expect(sanitizeInput('Hello World 123!')).toBe('Hello World 123!');
  });

  it('strips SVG-based XSS vectors', () => {
    const svg = '<svg onload="alert(1)"><circle></circle></svg>';
    const result = sanitizeInput(svg);
    expect(result).not.toContain('<svg');
    expect(result).not.toContain('onload');
  });
});

describe('Security: EPIC Validation', () => {
  it('accepts valid EPIC format', () => {
    expect(validateEPIC('ABC1234567')).toBe(true);
    expect(validateEPIC('xyz9876543')).toBe(true); // case-insensitive
  });

  it('rejects SQL injection attempts', () => {
    expect(validateEPIC("'; DROP TABLE voters;--")).toBe(false);
  });

  it('rejects XSS payloads in EPIC field', () => {
    expect(validateEPIC('<script>alert(1)</script>')).toBe(false);
  });

  it('rejects empty and malformed input', () => {
    expect(validateEPIC('')).toBe(false);
    expect(validateEPIC('AB12')).toBe(false);
    expect(validateEPIC('ABCD12345678')).toBe(false);
  });
});

describe('Security: Environment Variable Protection', () => {
  it('ensures API keys come from environment variables, not hardcoded strings', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/firebase-config.ts', 'utf8');

    // Verify config reads from process.env
    expect(source).toContain('process.env.NEXT_PUBLIC_FIREBASE_API_KEY');
    expect(source).toContain('process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID');

    // Verify no hardcoded key patterns (AIza... is Google API key prefix)
    expect(source).not.toMatch(/AIza[0-9A-Za-z_-]{35}/);
  });

  it('ensures Gemini API key comes from environment variables', () => {
    const fs = require('fs');
    const source = fs.readFileSync('src/lib/ai-core.ts', 'utf8');

    expect(source).toContain('process.env.GOOGLE_GENERATIVE_AI_API_KEY');
    expect(source).not.toMatch(/AIza[0-9A-Za-z_-]{35}/);
  });
});
