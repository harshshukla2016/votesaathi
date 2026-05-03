// @ts-nocheck
import { API_ROUTES, RATE_LIMIT, EPIC_REGEX, NAV_ITEMS, SUPPORTED_LANGUAGES } from '../../src/utils/constants';

describe('constants', () => {
  it('defines all required API routes', () => {
    expect(API_ROUTES.GEMINI).toBe('/api/gemini');
    expect(API_ROUTES.CHAT).toBe('/api/chat');
    expect(API_ROUTES.SPEECH).toBe('/api/speech');
    expect(API_ROUTES.DEBUG_AI).toBe('/api/debug-ai');
  });

  it('has correct rate limit defaults', () => {
    expect(RATE_LIMIT.DEFAULT_MS).toBe(2000);
    expect(RATE_LIMIT.BACKOFF_INITIAL_MS).toBe(300);
    expect(RATE_LIMIT.MAX_RETRIES).toBe(3);
  });

  it('EPIC_REGEX validates correct EPIC format', () => {
    expect(EPIC_REGEX.test('ABC1234567')).toBe(true);
    expect(EPIC_REGEX.test('XYZ9876543')).toBe(true);
    expect(EPIC_REGEX.test('AB12345')).toBe(false);
    expect(EPIC_REGEX.test('abcdefghij')).toBe(false);
  });

  it('defines navigation items with aria labels', () => {
    expect(NAV_ITEMS.length).toBeGreaterThanOrEqual(5);
    NAV_ITEMS.forEach((item) => {
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('href');
      expect(item).toHaveProperty('icon');
      expect(item).toHaveProperty('ariaLabel');
      expect(item.ariaLabel.length).toBeGreaterThan(0);
    });
  });

  it('supports English and Hindi languages', () => {
    expect(SUPPORTED_LANGUAGES).toContain('en');
    expect(SUPPORTED_LANGUAGES).toContain('hi');
  });
});
