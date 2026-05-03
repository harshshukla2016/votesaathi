// @ts-nocheck
import { verifyVoter, factCheck, askSaathi } from '../../src/services/geminiService';

// Mock the underlying apiClient
jest.mock('../../src/services/apiClient', () => ({
  fetchWithBackoff: jest.fn(),
}));

import { fetchWithBackoff } from '../../src/services/apiClient';

describe('geminiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('verifyVoter', () => {
    it('calls API with sanitized EPIC number', async () => {
      const mockResult = { name: 'Harsh', epic: 'ABC1234567', status: 'Active' };
      (fetchWithBackoff as jest.Mock).mockResolvedValue(mockResult);

      const result = await verifyVoter('abc1234567');

      expect(fetchWithBackoff).toHaveBeenCalledWith(
        '/api/gemini',
        expect.objectContaining({
          method: 'POST',
          body: expect.stringContaining('ABC1234567'),
        })
      );
      expect(result).toEqual(mockResult);
    });

    it('strips HTML from EPIC input', async () => {
      (fetchWithBackoff as jest.Mock).mockResolvedValue({});

      await verifyVoter('<script>alert(1)</script>ABC1234567');

      expect(fetchWithBackoff).toHaveBeenCalledWith(
        '/api/gemini',
        expect.objectContaining({
          body: expect.not.stringContaining('<script>'),
        })
      );
    });
  });

  describe('factCheck', () => {
    it('sends sanitized claim to the API', async () => {
      const mockResult = { truthScore: 85, status: 'Verified' };
      (fetchWithBackoff as jest.Mock).mockResolvedValue(mockResult);

      const result = await factCheck('This is a claim', 'en');
      expect(result.truthScore).toBe(85);
      expect(fetchWithBackoff).toHaveBeenCalledTimes(1);
    });

    it('defaults language to English', async () => {
      (fetchWithBackoff as jest.Mock).mockResolvedValue({});

      await factCheck('Some claim');
      expect(fetchWithBackoff).toHaveBeenCalledWith(
        '/api/gemini',
        expect.objectContaining({
          body: expect.stringContaining('"language":"en"'),
        })
      );
    });
  });

  describe('askSaathi', () => {
    it('sends user query with sanitized input', async () => {
      const mockReply = { title: 'Info', summary: 'Answer here' };
      (fetchWithBackoff as jest.Mock).mockResolvedValue(mockReply);

      const result = await askSaathi('How do I vote?', 'hi');
      expect(result).toEqual(mockReply);
      expect(fetchWithBackoff).toHaveBeenCalledWith(
        '/api/gemini',
        expect.objectContaining({
          body: expect.stringContaining('"language":"hi"'),
        })
      );
    });
  });
});
