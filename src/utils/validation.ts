/**
 * Validates whether the given string is a correctly formatted EPIC number.
 * 
 * @param {string} epic - The EPIC number to validate.
 * @returns {boolean} True if the EPIC number matches standard format (e.g., 3 letters + 7 numbers).
 */
export function validateEPIC(epic: string): boolean {
  if (!epic || typeof epic !== 'string') return false;
  // Standard format: 3 uppercase letters followed by 7 digits
  const epicRegex = /^[A-Z]{3}[0-9]{7}$/;
  return epicRegex.test(epic.toUpperCase().trim());
}

/**
 * Sanitizes user input to prevent XSS.
 * 
 * @param {string} input - The raw input string.
 * @returns {string} The sanitized string.
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  return input.replace(/<[^>]*>?/gm, '');
}
