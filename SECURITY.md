# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability, please email **security@votesaathi.app**.

## Security Measures

### Input Sanitization
All user inputs are sanitized via `sanitizeInput()` in `src/utils/validation.ts`, which strips HTML tags to prevent XSS attacks. EPIC numbers are validated against a strict regex pattern.

### Content Security Policy
A strict CSP is enforced at two layers:
1. **Edge Middleware** (`src/middleware.ts`) — Runtime CSP injection at the CDN edge
2. **Next.js Config** (`next.config.ts`) — Build-time header configuration
3. **Vercel Config** (`vercel.json`) — Deployment-level header enforcement

### Authentication
Firebase Authentication with Google OAuth 2.0 provider. Session tokens are managed by Firebase SDK with automatic refresh.

### API Security
- IP-based rate limiting on all `/api/*` routes (2000ms sliding window)
- API keys loaded exclusively from environment variables
- No secrets committed to version control (enforced via `.gitignore`)

### OWASP Top 10 Coverage

| # | Risk | Mitigation |
|---|------|------------|
| A01 | Broken Access Control | Firebase Auth + route-level guards |
| A02 | Cryptographic Failures | HTTPS enforced via HSTS headers |
| A03 | Injection | Input sanitization + Zod validation |
| A05 | Security Misconfiguration | Automated security header injection |
| A07 | XSS | CSP + HTML tag stripping |
| A09 | Security Logging | `console.error` on all API failures |

### Headers Enforced
- `Strict-Transport-Security` (HSTS with 2-year max-age)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(self), geolocation=(self)`
