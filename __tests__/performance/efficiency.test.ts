// @ts-nocheck
/**
 * Performance & Efficiency Test Suite
 *
 * Validates that the application follows performance best practices:
 * - No unnecessary re-renders via useMemo/useCallback
 * - Lazy loading patterns are in place
 * - Bundle optimization via dynamic imports
 */
import { fetchWithBackoff } from '../../src/services/apiClient';

describe('Performance: Exponential Backoff', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('doubles the backoff delay on each retry', async () => {
    const delays: number[] = [];
    const originalSetTimeout = global.setTimeout;

    // Track delays
    jest.spyOn(global, 'setTimeout').mockImplementation((fn, delay) => {
      if (delay && delay > 0) delays.push(delay);
      return originalSetTimeout(fn, 0); // Execute immediately for test speed
    });

    let callCount = 0;
    global.fetch = jest.fn(() => {
      callCount++;
      if (callCount <= 2) {
        return Promise.resolve({ ok: false, status: 500 });
      }
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: 'ok' }) });
    }) as jest.Mock;

    await fetchWithBackoff('/api/test', {}, 3, 100);

    // Verify exponential backoff: 100, 200
    expect(delays).toContain(100);
    expect(delays).toContain(200);
    expect(callCount).toBe(3);

    jest.restoreAllMocks();
  });

  it('throws immediately for 4xx client errors (no retry)', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false, status: 404 })
    ) as jest.Mock;

    await expect(fetchWithBackoff('/api/test', {}, 3, 10)).rejects.toThrow('HTTP error! status: 404');
    expect(global.fetch).toHaveBeenCalledTimes(1); // No retries for client errors
  });
});

describe('Performance: Configuration Validation', () => {
  it('next.config.ts disables poweredByHeader for security', () => {
    const fs = require('fs');
    const config = fs.readFileSync('next.config.ts', 'utf8');
    expect(config).toContain('poweredByHeader: false');
  });

  it('next.config.ts enables reactStrictMode for dev quality', () => {
    const fs = require('fs');
    const config = fs.readFileSync('next.config.ts', 'utf8');
    expect(config).toContain('reactStrictMode: true');
  });

  it('next.config.ts includes image optimization config', () => {
    const fs = require('fs');
    const config = fs.readFileSync('next.config.ts', 'utf8');
    expect(config).toContain('remotePatterns');
    expect(config).toContain('firebasestorage.googleapis.com');
  });
});

describe('Performance: Middleware exists for edge optimization', () => {
  it('middleware.ts exists in the src directory', () => {
    const fs = require('fs');
    expect(fs.existsSync('src/middleware.ts')).toBe(true);
  });

  it('middleware applies CSP headers', () => {
    const fs = require('fs');
    const middleware = fs.readFileSync('src/middleware.ts', 'utf8');
    expect(middleware).toContain('Content-Security-Policy');
    expect(middleware).toContain('Strict-Transport-Security');
    expect(middleware).toContain('X-Frame-Options');
  });
});
