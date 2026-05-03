import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware for runtime security enforcement.
 * Implements OWASP-compliant security headers on every response.
 * Runs at the edge before any page or API route is served.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {NextResponse} The response with injected security headers.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // OWASP Security Headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(self), geolocation=(self)');

  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://translate.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https: wss:",
    "frame-src 'self' https:",
    "worker-src 'self' blob:",
  ].join('; ');
  response.headers.set('Content-Security-Policy', csp);

  // Rate-limit signal header for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-RateLimit-Policy', 'sliding-window');
  }

  return response;
}

/** Matcher: apply middleware to all routes except static assets */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
