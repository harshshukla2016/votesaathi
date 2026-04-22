# VoteSaathi: The Digital Consulate 🇮🇳🛡️

**VoteSaathi** is a production-grade, AI-driven "Digital Consulate" designed to empower Indian citizens with high-fidelity electoral intelligence, verified information, and interactive civic assistance.

## 🏛️ Vertical: Civic Intelligence & Electoral Integrity
VoteSaathi transforms the complex, often fragmented electoral landscape into a unified, resilient, and user-centric command center. It bridges the gap between official data and citizen action through a "Resilience-First" architecture.

---

## 🚀 Key Features & Google Services

### 🧠 Saathi Intelligence Mesh (Vertex AI)
- **Service**: Google Vertex AI (Gemini 1.5 Flash).
- **Logic**: A multi-agent conversational core that provides neutral, actionable electoral guidance.
- **Resilience**: Implements a "Safe Mode" guard that provides hardened fallback intelligence if cloud connectivity is interrupted.

### 🛡️ Truth Center (AI X-Ray Detection)
- **Logic**: Uses a structured "Intelligence Scan" to verify viral claims and misinformation.
- **Aesthetic**: A high-fidelity "Laser Scanner" UI with real-time bias assessment and fact-source mapping.

### 📍 GIS War Room (Open-Source GIS)
- **Service**: Leaflet.js + OpenStreetMap.
- **Utility**: Zero-cost, unlimited interactive mapping for booth locating and constituency analytics.

### 🎙️ Voice Consulate (Zero-Billing AI)
- **Service**: Browser-Native Web Speech API.
- **Efficiency**: 100% free, low-latency text-to-speech and speech-to-text, ensuring the assistant is accessible to all demographics without cost barriers.

### 🌍 Global Consulate (Google Translate)
- **Service**: Google Translate Web Widget.
- **Impact**: Instant localization into 100+ languages, including all major Indian regional dialects.

---

## 🛠️ Technical Approach & Logic

### 1. Resilience-First Architecture
The platform is designed to be "Demo-Ready" at all times. We implemented **Diagnostic Handshakes** for every service. If a service (like Gemini or Firebase) is unconfigured or blocked, the UI gracefully switches to a high-utility "Onboarding Assist" mode instead of crashing.

### 2. Multi-Modal Interaction
The platform supports touch, type, and voice, ensuring that every citizen—regardless of digital literacy—can navigate their voting journey.

### 3. Data Integrity Logic
The **Truth Center** uses a weighted confidence algorithm to score claims based on source verification and bias markers provided by the Saathi Intelligence Core.

---

## ⚖️ Evaluation Focus Areas

### 📦 Code Quality
- **Stack**: Next.js 16 (Turbopack) + Tailwind v4.
- **Structure**: Modular component architecture with clear separation of concerns (Logic vs. UI).
- **Type Safety**: 100% TypeScript coverage.

### 🔒 Security
- **Hardened Auth**: Firebase Authentication with server-side Admin SDK validation.
- **Env Hygiene**: Strictly managed `.env.local` with no secrets exposed to the client.

### ⚡ Efficiency
- **Optimal Resources**: Reduced repository size from 4.8MB to <800KB by externalizing assets and optimizing dependencies.
- **Performance**: High-fidelity Framer Motion animations optimized for 60fps interaction.

### ♿ Accessibility
- **Inclusive Design**: High-contrast ratios, semantic HTML5 structure, and full Voice Consulate support for the visually impaired.

---

## 📝 Assumptions
- **Web Speech Support**: Assumes a modern browser (Chrome/Safari/Edge) for the native Speech Synthesis/Recognition APIs.
- **Service Account**: Assumes a valid `service-account.json` is provided in the root for Admin SDK operations.

---

## 🏁 How to Run
1.  **Install**: `npm install`
2.  **Env**: Populate `.env.local` with your Firebase and Gemini keys.
3.  **Start**: `npm run dev`

**VoteSaathi: Safeguarding Digital Sovereignty, One Vote at a Time.** 🇮🇳🛡️
