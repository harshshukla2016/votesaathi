// @ts-nocheck
import { formatDate, truncateText, getConfidenceLabel, getInitials } from '../../src/utils/formatters';

describe('formatters', () => {
  describe('formatDate', () => {
    it('formats a Date object correctly', () => {
      const result = formatDate(new Date('2024-01-15'));
      expect(result).toContain('2024');
    });

    it('formats a date string correctly', () => {
      const result = formatDate('2024-06-01');
      expect(result).toContain('2024');
    });

    it('returns "Invalid Date" for garbage input', () => {
      expect(formatDate('not-a-date')).toBe('Invalid Date');
    });
  });

  describe('truncateText', () => {
    it('does not truncate short text', () => {
      expect(truncateText('Hello', 10)).toBe('Hello');
    });

    it('truncates long text with ellipsis', () => {
      const long = 'A'.repeat(200);
      const result = truncateText(long, 50);
      expect(result.length).toBeLessThanOrEqual(51); // 50 chars + ellipsis
      expect(result).toContain('…');
    });

    it('returns empty string for falsy input', () => {
      expect(truncateText('', 10)).toBe('');
      expect(truncateText(null as any, 10)).toBe('');
    });
  });

  describe('getConfidenceLabel', () => {
    it('returns "High" for scores >= 80', () => {
      expect(getConfidenceLabel(80)).toBe('High');
      expect(getConfidenceLabel(100)).toBe('High');
    });

    it('returns "Medium" for scores >= 50 and < 80', () => {
      expect(getConfidenceLabel(50)).toBe('Medium');
      expect(getConfidenceLabel(79)).toBe('Medium');
    });

    it('returns "Low" for scores < 50', () => {
      expect(getConfidenceLabel(0)).toBe('Low');
      expect(getConfidenceLabel(49)).toBe('Low');
    });
  });

  describe('getInitials', () => {
    it('returns initials from a full name', () => {
      expect(getInitials('Harsh Shukla')).toBe('HS');
    });

    it('returns single initial for a single name', () => {
      expect(getInitials('Harsh')).toBe('H');
    });

    it('returns "?" for empty or falsy input', () => {
      expect(getInitials('')).toBe('?');
      expect(getInitials(null as any)).toBe('?');
    });

    it('handles names with extra spaces', () => {
      expect(getInitials('  Harsh   Shukla  ')).toBe('HS');
    });
  });
});
