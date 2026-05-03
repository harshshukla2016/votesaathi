/**
 * Application-wide constants for the VoteSaathi Digital Consulate.
 * Centralizes configuration to prevent magic strings and improve maintainability.
 *
 * @module constants
 */

/** API route paths used throughout the application */
export const API_ROUTES = {
  GEMINI: '/api/gemini',
  CHAT: '/api/chat',
  SPEECH: '/api/speech',
  DEBUG_AI: '/api/debug-ai',
} as const;

/** Rate limiting configuration (milliseconds) */
export const RATE_LIMIT = {
  DEFAULT_MS: 2000,
  BACKOFF_INITIAL_MS: 300,
  MAX_RETRIES: 3,
} as const;

/** EPIC voter ID validation pattern: 3 uppercase letters followed by 7 digits */
export const EPIC_REGEX = /^[A-Z]{3}[0-9]{7}$/;

/** Supported application languages */
export const SUPPORTED_LANGUAGES = ['en', 'hi'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

/** Navigation items for the sidebar and mobile nav */
export const NAV_ITEMS = [
  { name: 'Dashboard', href: '/dashboard', icon: 'grid_view', ariaLabel: 'Go to Dashboard' },
  { name: 'AI Assistant', href: '/chat', icon: 'smart_toy', ariaLabel: 'Open AI Voting Assistant' },
  { name: 'Truth Center', href: '/truth', icon: 'verified_user', ariaLabel: 'Open Misinformation Scanner' },
  { name: 'Live Results', href: '/map', icon: 'analytics', ariaLabel: 'View Live Election Results Map' },
  { name: 'Citizen Forum', href: '/forum', icon: 'forum', ariaLabel: 'Join the Citizen Forum' },
  { name: 'Battle Arena', href: '/battle', icon: 'sports_kabaddi', ariaLabel: 'Enter the Knowledge Battle Arena' },
  { name: 'Mastery', href: '/learn', icon: 'psychology', ariaLabel: 'Start Learning Modules' },
  { name: 'Rankings', href: '/leaderboard', icon: 'military_tech', ariaLabel: 'View Leaderboard Rankings' },
  { name: 'My Ballot', href: '/ballot', icon: 'how_to_vote', ariaLabel: 'Access My Ballot Dashboard' },
  { name: 'Voter Education', href: '/timeline', icon: 'menu_book', ariaLabel: 'Read Voter Education Timeline' },
] as const;
