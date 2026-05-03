// @ts-nocheck
import { fetchWithBackoff } from '../../src/services/apiClient';

describe('apiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('resolves on first successful call', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'success' })
      })
    ) as jest.Mock;

    const result = await fetchWithBackoff('/api');
    expect(result.data).toBe('success');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('retries on 500 error and succeeds', async () => {
    let callCount = 0;
    global.fetch = jest.fn(() => {
      callCount += 1;
      if (callCount === 1) {
        return Promise.resolve({
          ok: false,
          status: 500
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'success on retry' })
      });
    }) as jest.Mock;

    const result = await fetchWithBackoff('/api', {}, 3, 10);
    expect(result.data).toBe('success on retry');
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  it('throws after max retries', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500
      })
    ) as jest.Mock;

    await expect(fetchWithBackoff('/api', {}, 2, 10)).rejects.toThrow();
    expect(global.fetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
  });
});
