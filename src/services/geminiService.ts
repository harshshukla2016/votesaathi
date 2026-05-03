/**
 * Gemini Service Layer
 * Abstracts all Google Gemini AI interactions behind a clean service interface.
 * Implements exponential backoff, input sanitization, and structured error handling.
 *
 * @module geminiService
 */

import { sanitizeInput } from '@/utils/validation';
import { fetchWithBackoff } from './apiClient';
import { API_ROUTES } from '@/utils/constants';

/** Response shape for voter verification calls */
export interface VoterVerificationResult {
  name: string;
  epic: string;
  state: string;
  constituency: string;
  pollingStation: string;
  status: 'Active' | 'Shifted' | 'Deceased';
}

/** Response shape for fact-checking calls */
export interface FactCheckResult {
  truthScore: number;
  status: 'Verified' | 'Disputed' | 'Misinformation';
  analysis: string;
  credibleSources: string[];
  misleadingElements: string[];
}

/**
 * Verifies a voter's EPIC number via the Gemini-powered API Setu gateway.
 *
 * @param {string} epic - The voter's EPIC number (sanitized internally).
 * @returns {Promise<VoterVerificationResult>} The voter verification data.
 * @throws {Error} If the API returns an error after retries.
 */
export async function verifyVoter(epic: string): Promise<VoterVerificationResult> {
  const sanitizedEpic = sanitizeInput(epic).toUpperCase().trim();
  return fetchWithBackoff(API_ROUTES.GEMINI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'voter_verification', epic: sanitizedEpic }),
  });
}

/**
 * Checks a claim for misinformation via the Gemini Truth Center.
 *
 * @param {string} claim - The raw text claim to verify.
 * @param {string} language - Target language ('en' or 'hi').
 * @returns {Promise<FactCheckResult>} The fact-check analysis result.
 * @throws {Error} If the API returns an error after retries.
 */
export async function factCheck(claim: string, language = 'en'): Promise<FactCheckResult> {
  const sanitizedClaim = sanitizeInput(claim);
  return fetchWithBackoff(API_ROUTES.GEMINI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'fact_check', rawContent: sanitizedClaim, language }),
  });
}

/**
 * Sends a general query to the Saathi AI intelligence mesh.
 *
 * @param {string} query - The user query.
 * @param {string} language - Target language ('en' or 'hi').
 * @returns {Promise<Record<string, unknown>>} The AI-generated response object.
 * @throws {Error} If the API returns an error after retries.
 */
export async function askSaathi(query: string, language = 'en'): Promise<Record<string, unknown>> {
  const sanitizedQuery = sanitizeInput(query);
  return fetchWithBackoff(API_ROUTES.GEMINI, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'chat', query: sanitizedQuery, language }),
  });
}
