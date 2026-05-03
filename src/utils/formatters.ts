/**
 * Formatting utility functions for the VoteSaathi Digital Consulate.
 * Provides consistent data formatting across all components.
 *
 * @module formatters
 */

/**
 * Formats a date into a localized Indian English string.
 *
 * @param {Date | string | number} date - The date to format.
 * @returns {string} The formatted date string, e.g. "3 May 2026".
 */
export function formatDate(date: Date | string | number): string {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Truncates a string to the specified length with an ellipsis.
 *
 * @param {string} text - The text to truncate.
 * @param {number} maxLength - Maximum allowed characters (default: 100).
 * @returns {string} The truncated text.
 */
export function truncateText(text: string, maxLength = 100): string {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}

/**
 * Converts a percentage number into a human-readable label.
 *
 * @param {number} score - A number between 0 and 100.
 * @returns {string} A label like "High", "Medium", or "Low".
 */
export function getConfidenceLabel(score: number): string {
  if (score >= 80) return 'High';
  if (score >= 50) return 'Medium';
  return 'Low';
}

/**
 * Generates initials from a full name for avatar placeholders.
 *
 * @param {string} name - The full name string.
 * @returns {string} Up to 2 uppercase initials.
 */
export function getInitials(name: string): string {
  if (!name || typeof name !== 'string') return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}
