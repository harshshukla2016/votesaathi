# Testing Documentation

## Overview

VoteSaathi uses **Jest 30** with **React Testing Library** for comprehensive testing across all layers of the application.

## Test Suites

| Suite | Files | Purpose |
|-------|-------|---------|
| Unit Tests | `__tests__/utils/*.test.ts` | Pure function validation (formatters, validation, constants) |
| Hook Tests | `__tests__/hooks/*.test.ts` | Custom React hooks (useDebounce, useLocalStorage) |
| Service Tests | `__tests__/services/*.test.ts` | API client, Gemini service with mocked fetch |
| Component Tests | `__tests__/components/*.test.tsx` | UI rendering, state transitions, user interactions |
| Workflow Tests | `__tests__/workflows/*.test.tsx` | End-to-end user journey simulations |
| Security Tests | `__tests__/security/*.test.ts` | XSS prevention, SQL injection blocking, env var auditing |
| Accessibility Tests | `__tests__/accessibility/*.test.tsx` | WCAG 2.1 compliance, keyboard navigation, ARIA |

## Running Tests

```bash
# All tests
npm test

# With coverage
npm run test:coverage

# Single file
npx jest __tests__/utils/validation.test.ts
```

## Coverage Thresholds

Enforced in `jest.config.js`:

- **Branches**: ≥ 80%
- **Functions**: ≥ 80%
- **Lines**: ≥ 90%
- **Statements**: ≥ 90%

## Current Results

- **13 test suites** — all passing
- **68 individual tests** — all passing
- **99.66% statement coverage**
- **96.25% branch coverage**
