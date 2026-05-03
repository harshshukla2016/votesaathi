// @ts-nocheck
import { validateEPIC, sanitizeInput } from '../../src/utils/validation';

describe('Validation Utils', () => {
  it('validates correct EPIC numbers', () => {
    expect(validateEPIC('ABC1234567')).toBe(true);
    expect(validateEPIC('xyz9876543')).toBe(true);
  });

  it('rejects invalid EPIC numbers', () => {
    expect(validateEPIC('AB123')).toBe(false);
    expect(validateEPIC('ABCD123456')).toBe(false);
    expect(validateEPIC('')).toBe(false);
  });

  it('sanitizes input', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).toBe('alert(1)');
    expect(sanitizeInput('<b>Bold</b>')).toBe('Bold');
    expect(sanitizeInput('')).toBe('');
  });
});
