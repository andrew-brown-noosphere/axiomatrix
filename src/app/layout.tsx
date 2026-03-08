import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import LayoutWrapper from "@/components/LayoutWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AxiomMatrix | DevSecOps Solutions",
  description:
    "Next-generation DevSecOps solutions for enterprises navigating the AI era. Security. Certainty. Delivered.",
  keywords: [
    "DevSecOps",
    "Security Solutions",
    "CI/CD Security",
    "AI Security",
    "Supply Chain Security",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-[#0a0a0f] text-zinc-100`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Script
          src="/tracking.js"
          data-org="axiommatrix"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
