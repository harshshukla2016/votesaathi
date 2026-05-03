/**
 * Barrel export for all service modules.
 * @module services
 */

export { fetchWithBackoff } from './apiClient';
export { verifyVoter, factCheck, askSaathi } from './geminiService';
export type { VoterVerificationResult, FactCheckResult } from './geminiService';
