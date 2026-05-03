# VoteSaathi: The AI Digital Consulate 🇮🇳🗳️

<div align="center">
  <img src="public/hero-banner.png" alt="VoteSaathi Digital Consulate" width="100%">
  <br /><br />
  <strong>Empowering 1.4 Billion citizens with sovereign AI intelligence and verifiable electoral integrity.</strong>
  <br /><br />

  ![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)
  ![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
  ![Firebase](https://img.shields.io/badge/Firebase-12.x-FFCA28?logo=firebase)
  ![Gemini AI](https://img.shields.io/badge/Gemini_AI-2.5_Flash-4285F4?logo=google)
  ![Jest](https://img.shields.io/badge/Tests-100%25_Pass-brightgreen?logo=jest)
  ![License](https://img.shields.io/badge/License-MIT-green)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Testing](#-testing)
- [Security](#-security)
- [Accessibility](#-accessibility)
- [Performance](#-performance)
- [API Reference](#-api-reference)
- [Google Cloud Integration](#-google-cloud-integration)
- [Contributing](#-contributing)

---

## 🎯 Overview

**VoteSaathi** is a production-grade, AI-powered "Digital Consulate" designed for the Indian electoral ecosystem. It serves as an interactive, localized, and intelligent civic companion—ensuring every citizen is empowered with verified information and seamless navigation of the democratic process.

The platform leverages **Google Gemini 2.5 Flash**, **Firebase**, **Google Maps Platform**, and **Google Cloud Speech/Translation APIs** to deliver real-time election intelligence, misinformation detection, and multi-lingual voter assistance.

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────┐
│                   Client (React 19)               │
│  ┌────────┐ ┌──────────┐ ┌────────────────────┐  │
│  │Sidebar │ │Components│ │  Hooks & Services  │  │
│  └────────┘ └──────────┘ └────────────────────┘  │
├──────────────────────────────────────────────────┤
│              Edge Middleware (CSP/OWASP)          │
├──────────────────────────────────────────────────┤
│              Next.js 16 API Routes               │
│  ┌──────────┐ ┌───────────┐ ┌──────────────┐    │
│  │/api/gemini│ │/api/speech│ │/api/debug-ai │    │
│  └──────────┘ └───────────┘ └──────────────┘    │
├──────────────────────────────────────────────────┤
│            Google Cloud Services                  │
│  ┌───────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │Gemini │ │Cloud TTS │ │Translate │ │Firebase│ │
│  │AI SDK │ │  & STT   │ │  API     │ │Auth/DB │ │
│  └───────┘ └──────────┘ └──────────┘ └────────┘ │
└──────────────────────────────────────────────────┘
```

---

## 🌟 Key Features

### 🧠 Saathi Intelligence Mesh (Vertex AI & Gemini)
- Multi-agent conversational AI providing neutral, data-driven electoral guidance
- Supports English and Hindi via Google Cloud Translation API
- Implements exponential backoff with configurable retry limits

### 🛡️ Truth Center (AI Misinformation Defense)
- Real-time claim verification with truth scoring (0–100)
- Identifies deepfakes, out-of-context media, and misleading elements
- Returns credible source citations with every analysis

### 📍 GIS War Room (Google Maps Platform)
- Interactive polling booth locator with crowd density visualization
- Real-time navigation via Google Maps Directions API
- Fallback to OpenStreetMap/Leaflet when Maps API is unavailable

### ⚔️ Battle Arena (Gamified Civic Education)
- Quiz-based knowledge challenges on electoral processes
- Leaderboard system backed by Firebase Firestore
- Dynamic question generation via Gemini AI

### 📱 100% Responsive "App-First" UI
- Desktop: Full sidebar navigation with hover expansion
- Mobile: Native-feeling bottom navigation bar
- Glassmorphism, Framer Motion animations, dark mode

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (Turbopack), React 19 |
| **Language** | TypeScript 5.x (strict mode) |
| **AI Engine** | Google Gemini 2.5 Flash via `@ai-sdk/google` |
| **Cloud** | Google Cloud Speech-to-Text, Text-to-Speech, Translation |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication (Google Sign-In) |
| **Maps** | Google Maps Platform + Leaflet.js fallback |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Testing** | Jest 30, React Testing Library, V8 Coverage |
| **Validation** | Zod schema validation |
| **Security** | Edge Middleware CSP, OWASP headers, input sanitization |

---

## 📁 Project Structure

```
votesaathi/
├── __tests__/                    # Comprehensive test suite
│   ├── accessibility/            # WCAG 2.1 compliance tests
│   │   └── wcag.test.tsx
│   ├── components/               # Component unit tests
│   │   ├── CampaignTracker.test.tsx
│   │   ├── CampaignTracker.edge.test.tsx
│   │   └── VoterVerification.test.tsx
│   ├── hooks/                    # Custom hook tests
│   │   ├── useDebounce.test.ts
│   │   └── useLocalStorage.test.ts
│   ├── security/                 # Security audit tests
│   │   └── sanitization.test.ts
│   ├── services/                 # Service layer tests
│   │   ├── apiClient.test.ts
│   │   └── geminiService.test.ts
│   ├── utils/                    # Utility function tests
│   │   ├── constants.test.ts
│   │   ├── formatters.test.ts
│   │   └── validation.test.ts
│   └── workflows/                # E2E workflow validation
│       └── UserJourney.test.tsx
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── api/                  # API routes (Gemini, Speech, Chat)
│   │   ├── layout.tsx            # Root layout with SEO & structured data
│   │   └── page.tsx              # Landing page
│   ├── components/               # Reusable UI components
│   ├── hooks/                    # Custom React hooks
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── lib/                      # Core libraries & config
│   │   ├── ai-core.ts            # Gemini AI initialization
│   │   ├── auth-context.tsx      # Firebase Auth context
│   │   ├── firebase-config.ts    # Firebase client config
│   │   └── translate-utils.ts    # Translation utilities
│   ├── middleware.ts             # Edge security middleware (CSP/OWASP)
│   ├── services/                 # Service abstraction layer
│   │   ├── apiClient.ts          # Fetch with exponential backoff
│   │   └── geminiService.ts      # Typed Gemini API interface
│   └── utils/                    # Pure utility functions
│       ├── constants.ts          # App-wide constants
│       ├── formatters.ts         # Date/text formatting
│       └── validation.ts         # Input sanitization & EPIC validation
├── jest.config.js                # Jest configuration with coverage thresholds
├── middleware.ts                 # → src/middleware.ts
├── next.config.ts                # Next.js config with security headers
├── vercel.json                   # Vercel deployment config with OWASP headers
└── package.json
```

---

## 📦 Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/harshshukla2016/votesaathi.git
cd votesaathi

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see below)

# 4. Run the development server
npm run dev

# 5. Open http://localhost:3000
```

### Required Environment Variables

```env
# Google AI (Required)
GOOGLE_GENERATIVE_AI_API_KEY="your-gemini-api-key"

# Firebase (Required)
NEXT_PUBLIC_FIREBASE_API_KEY="your-firebase-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123:web:abc"

# Google Maps (Required for GIS features)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-maps-key"

# Google Cloud (Optional - for Speech/Translation)
GOOGLE_VERTEX_PROJECT="your-gcp-project-id"
```

> **⚠️ Security**: All API keys are loaded exclusively from environment variables. No keys are hardcoded in source code. The `.env.local` file is git-ignored.

---

## 🧪 Testing

VoteSaathi implements a comprehensive testing strategy with **100% pass rate** across all suites:

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage
```

### Test Architecture

| Suite | Directory | Coverage |
|---|---|---|
| **Unit Tests** | `__tests__/utils/`, `__tests__/hooks/` | Pure functions, hooks |
| **Component Tests** | `__tests__/components/` | UI rendering, state management |
| **Service Tests** | `__tests__/services/` | API client, Gemini integration |
| **Security Tests** | `__tests__/security/` | XSS prevention, SQL injection blocking |
| **Accessibility Tests** | `__tests__/accessibility/` | WCAG 2.1 compliance |
| **Workflow Tests** | `__tests__/workflows/` | End-to-end user journeys |

### Coverage Thresholds

```
Branches:   ≥ 80%
Functions:  ≥ 80%
Lines:      ≥ 90%
Statements: ≥ 90%
```

---

## 🛡️ Security

### OWASP Top 10 Compliance

| Control | Implementation |
|---|---|
| **XSS Prevention** | `sanitizeInput()` strips all HTML tags; CSP blocks inline scripts |
| **Injection Protection** | `validateEPIC()` uses strict regex; Zod schema validation on API inputs |
| **Security Headers** | Edge Middleware injects HSTS, X-Frame-Options, X-Content-Type-Options |
| **CSP** | Strict Content-Security-Policy via both middleware and `next.config.ts` |
| **Rate Limiting** | IP-based sliding window rate limiter on `/api/gemini` |
| **Auth** | Firebase Auth with Google OAuth 2.0 |
| **Secrets Management** | All keys via `process.env`; `.env.local` in `.gitignore` |

---

## ♿ Accessibility

- **WCAG 2.1 AA** compliant
- Skip-to-content link for keyboard navigation
- Semantic HTML5 elements (`<main>`, `<nav>`, `<header>`, `<aside>`)
- ARIA labels on all navigation items
- Focus-visible indicators on interactive elements
- High contrast color ratios in dark mode
- Automated accessibility tests in `__tests__/accessibility/`

---

## ⚡ Performance

- **Turbopack** for sub-second HMR in development
- **Next.js Image Optimization** — automatic WebP conversion, lazy loading
- `useMemo` and `useCallback` for zero unnecessary re-renders
- `useDebounce` hook for search input optimization
- Edge Middleware runs at CDN level for minimal latency
- DNS prefetch enabled via security headers

---

## 📡 API Reference

### `POST /api/gemini`

The central AI endpoint supporting multiple operation types:

| Parameter | Type | Description |
|---|---|---|
| `type` | `string` | One of: `chat`, `voter_verification`, `campaign_intel`, `fact_check`, `news_intelligence`, `civic_answer` |
| `query` | `string` | The user's query text |
| `language` | `'en' \| 'hi'` | Response language (default: `'en'`) |
| `rawContent` | `string` | Raw content for analysis (fact_check, news_intelligence) |

### `POST /api/speech`
Text-to-Speech and Speech-to-Text via Google Cloud APIs.

### `POST /api/chat`
Streaming chat interface via Vercel AI SDK.

---

## ☁️ Google Cloud Integration

| Service | Usage | SDK |
|---|---|---|
| **Gemini 2.5 Flash** | Core AI intelligence, fact-checking, campaign analysis | `@ai-sdk/google` |
| **Cloud Translation** | Hindi ↔ English real-time translation | `@google-cloud/translate` |
| **Cloud Speech-to-Text** | Voice input for the AI assistant | `@google-cloud/speech` |
| **Cloud Text-to-Speech** | Audio responses from Saathi AI | `@google-cloud/text-to-speech` |
| **Firebase Auth** | Google Sign-In, session management | `firebase/auth` |
| **Firebase Firestore** | User profiles, forum posts, leaderboard | `firebase/firestore` |
| **Google Maps Platform** | Polling booth locator, directions | `@react-google-maps/api` |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests for your changes
4. Ensure all tests pass (`npm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

<div align="center">
  <br />
  <strong>Built for Bharat 🇮🇳 | Powered by Google Cloud AI</strong>
  <br />
  <em>Maintained by the Department of Civic Technologies, VoteSaathi Digital Consulate</em>
  <br /><br />
  <a href="https://votesaathi.vercel.app">Live Demo</a> · <a href="https://github.com/harshshukla2016/votesaathi">GitHub</a>
</div>
