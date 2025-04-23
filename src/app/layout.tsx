import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Nebula from "@/components/effects/Nebula";
import StarsCanvas from "@/components/effects/StarsCanvas";
import { Suspense } from "react";

// Font setup
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["400", "600", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "prompt",
  description: "6'5 nonchalant humble rich dreadhead",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon and manifest links can go here if needed */}
      </head>
      <body>
        <LoadingScreen />
        {/* Visual FX backgrounds, aria-hidden for accessibility */}
        <Nebula aria-hidden="true" />
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
        {/* No-JS fallback */}
        <noscript>
          <style>{`
            .stars-canvas, .nebula { display: none !important; }
          `}</style>
          <div
            style={{
              background: "#070b14",
              width: "100vw",
              height: "100vh",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 0,
            }}
          />
        </noscript>
        {/* Main content */}
        {children}
      </body>
    </html>
  );
}
