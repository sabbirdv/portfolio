import type { Metadata } from "next";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";

export const metadata: Metadata = {
  title: "Sabbir Hasan",
  description:
    "Portfolio of Sabbir Hasan, a Full Stack Web Developer & Creative Designer building modern, functional, and user-focused digital experiences with React, Next.js, and TypeScript.",
  icons: {
    icon: [
      { url: "/images/sabbir-circle.png" },
      { url: "/favicon.ico" }
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/images/sabbir-circle.png" }
    ]
  },
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
    title: "Sabbir Hasan",
    description:
      "I design and build modern, functional, and user-focused digital experiences.",
    siteName: "Sabbir Hasan Portfolio"
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabbir Hasan",
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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/images/sabbir-circle.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/sabbir-circle.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen font-sans bg-[#05070A] text-slate-100 cyber-grid-bg antialiased selection:bg-[#00F0FF] selection:text-black">
        <SplashCursor
          colors={['#00F0FF', '#10B981', '#A855F7', '#00FF88', '#3B82F6', '#EC4899']}
          rainbow={false}
          colorSpeed={1.3}
          intensity={1.35}
          swirl={3.8}
          trail={1.05}
          glow={0.5}
          shading={0.65}
          force={1.1}
          quality="low"
          zIndex={0}
        />
        {children}
      </body>
    </html>
  );
}
