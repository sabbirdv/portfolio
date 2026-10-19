import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sabbir Hasan (sabbirdv) | Full Stack Web Developer & Creative Designer",
  description:
    "Portfolio of Sabbir Hasan, a Full Stack Web Developer & Creative Designer building modern, functional, and user-focused digital experiences with React, Next.js, and TypeScript.",
  keywords: [
    "Sabbir Hasan",
    "sabbirdv",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Tailwind CSS",
    "TypeScript",
    "Portfolio"
  ],
  authors: [{ name: "Sabbir Hasan", url: "https://github.com/sabbirdv" }],
  creator: "Sabbir Hasan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://github.com/sabbirdv",
    title: "Sabbir Hasan | Full Stack Web Developer & Creative Designer",
    description:
      "I design and build modern, functional, and user-focused digital experiences.",
    siteName: "Sabbir Hasan Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabbir Hasan | Full Stack Web Developer & Creative Designer",
    description:
      "I design and build modern, functional, and user-focused digital experiences."
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${jetBrainsMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen font-sans bg-[#05070A] text-slate-100 cyber-grid-bg antialiased selection:bg-[#00F0FF] selection:text-black">
        <SplashCursor
          colors={['#00F0FF', '#10B981', '#A855F7', '#00FF88', '#3B82F6', '#EC4899']}
          rainbow={false}
          colorSpeed={1.2}
          intensity={0.75}
          swirl={3.0}
          trail={0.8}
          glow={0.2}
          shading={0.5}
          force={0.85}
          zIndex={0}
        />
        {children}
      </body>
    </html>
  );
}
