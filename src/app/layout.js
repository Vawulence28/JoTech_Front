import "./globals.css";

import { AuthProvider } from "@/contexts/AuthContext";

import Navbar from "@/components/layout/Navbar";

import PWARegister from "@/components/pwa/PWARegister";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import OfflineBanner from "@/components/pwa/OfflineBanner";

export const metadata = {
  metadataBase: new URL("https://jo-tech-hub.vercel.app"),

  title: {
    default: "JO-Tech Learn",
    template: "%s | JO-Tech Learn",
  },

  description:
    "JO-Tech Learn is an AI-powered personalized learning platform that generates structured learning roadmaps, tracks progress, rewards consistency with badges and certificates, and helps learners achieve their career goals.",

  applicationName: "JO-Tech Learn",

  keywords: [
    "AI Learning",
    "Learning Roadmap",
    "Personalized Learning",
    "Skill Development",
    "Career Growth",
    "Education",
    "Online Learning",
    "Learning Platform",
    "Learning Tracker",
    "Learning Streak",
    "Certificates",
    "Badges",
    "Productivity",
    "AI Education",
    "JO-Tech Learn",
  ],

  authors: [
    {
      name: "JO-Tech",
      url: "https://jo-tech-hub.vercel.app",
    },
  ],

  creator: "JO-Tech",

  publisher: "JO-Tech",

  category: "education",

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

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jo-tech-hub.vercel.app",

    title: "JO-Tech Learn",

    description:
      "Generate personalized learning roadmaps, stay consistent with daily lessons, recover missed sessions, earn certificates, badges, and track your learning progress.",

    siteName: "JO-Tech Learn",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JO-Tech Learn",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "JO-Tech Learn",

    description:
      "A personalized learning platform with smart roadmaps, streak tracking, certificates, badges and progress analytics.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon.png",
        type: "image/png",
      },
    ],

    shortcut: "/favicon.ico",

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
      },
    ],
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    title: "JO-Tech Learn",
    statusBarStyle: "default",
  },

  appLinks: {
    web: {
      url: "https://jo-tech-hub.vercel.app",
      should_fallback: true,
    },
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A8A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">

        <AuthProvider>

          {/* Register Service Worker */}
          <PWARegister />

          {/* Offline Notification */}
          <OfflineBanner />

          {/* Install App Prompt */}
          <InstallPrompt />

          {/* Global Navigation */}
          <Navbar />

          {/* Page Content */}
          <main className="min-h-screen">
            {children}
          </main>

        </AuthProvider>

      </body>
    </html>
  );
}