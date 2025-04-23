import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Nebula from "@/components/effects/Nebula";
import StarsCanvas from "@/components/effects/StarsCanvas";
import { Suspense } from "react";

// Correct font setup
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
      <body>
        <LoadingScreen />
        <Nebula />
        <Suspense fallback={null}>
          <StarsCanvas />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
