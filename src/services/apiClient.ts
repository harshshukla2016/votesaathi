/**
 * ApiClient Service
 * Handles unified API requests with built-in exponential backoff.
 */

/**
 * Fetches data with exponential backoff retries.
 * 
 * @param {string} url - The endpoint URL.
 * @param {RequestInit} options - Fetch options.
 * @param {number} retries - Maximum number of retries.
 * @param {number} backoff - Initial backoff delay in ms.
 * @returns {Promise<any>} The JSON response.
 */
export async function fetchWithBackoff(url: string, options: RequestInit = {}, retries = 3, backoff = 300): Promise<any> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status >= 500 && retries > 0) {
        const err = new Error("Server Error - Retry");
        (err as any)._retryable = true;
        throw err;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err: any) {
    if (err._retryable && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithBackoff(url, options, retries - 1, backoff * 2);
    }
    throw err;
  }
}
