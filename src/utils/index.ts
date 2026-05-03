/**
 * Barrel export for all utility modules.
 * Provides a clean import interface: `import { validateEPIC, formatDate } from '@/utils'`
 *
 * @module utils
 */

export { validateEPIC, sanitizeInput } from './validation';
export { formatDate, truncateText, getConfidenceLabel, getInitials } from './formatters';
export { API_ROUTES, RATE_LIMIT, EPIC_REGEX, NAV_ITEMS, SUPPORTED_LANGUAGES } from './constants';
export type { SupportedLanguage } from './constants';
