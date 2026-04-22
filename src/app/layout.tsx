import type { Metadata, Viewport } from "next";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
});

export const viewport: Viewport = {
  themeColor: "#FE9832",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://votesaathi.app"),
  title: {
    default: "VoteSaathi - India's AI Digital Consulate | Electoral Intelligence",
    template: "%s | VoteSaathi",
  },
  description: "Navigate your civic duties with VoteSaathi, the production-grade AI Digital Consulate. Get real-time election insights, verify news at the Truth Center, and access localized voter assistance across India.",
  keywords: [
    "Indian Elections 2024", "AI Voter Assistant", "VoteSaathi", 
    "Election Intelligence", "Fact Check India", "Digital Consulate", 
    "Polling Booth Locator", "Civic Tech India", "Voter Education"
  ],
  authors: [{ name: "VoteSaathi Intelligence Mesh" }],
  creator: "Harsh Shukla",
  publisher: "VoteSaathi Digital Consulate",
  formatDetection: {
    email: false,
    address: true,
    telephone: false,
  },
  openGraph: {
    title: "VoteSaathi | Safeguarding Your Vote with AI",
    description: "The premium command center for every Indian voter. Real-time analytics, misinformation detection, and multi-lingual support.",
    url: "https://votesaathi.app",
    siteName: "VoteSaathi",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VoteSaathi Digital Consulate Dashboard",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VoteSaathi | India's AI Digital Consulate",
    description: "Empowering Indian citizens with AI-driven election insights and verified information.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
      "hi-IN": "/hi-IN",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        <link rel="manifest" href="/manifest.json" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "VoteSaathi Digital Consulate",
              "url": "https://votesaathi.app",
              "logo": "https://votesaathi.app/logo.png",
              "description": "Premium AI-driven electoral intelligence platform for Indian citizens.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nirvachan Sadan, Ashoka Rd",
                "addressLocality": "New Delhi",
                "addressRegion": "Delhi",
                "postalCode": "110001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "28.6231",
                "longitude": "77.2082"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-11-23052205",
                "contactType": "Voter Support",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is VoteSaathi?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "VoteSaathi is an AI Digital Consulate that provides verified electoral intelligence, polling booth locations, and misinformation detection for Indian citizens."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How does Saathi AI help voters?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Saathi AI uses Gemini 1.5 Flash to provide real-time, neutral guidance on voting procedures, candidate information, and electoral laws."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${publicSans.variable} antialiased selection:bg-primary/30 selection:text-primary bg-background text-on-background min-h-screen`}
      >
        <AuthProvider>
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen transform -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] mix-blend-screen transform translate-y-1/3"></div>
          </div>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
