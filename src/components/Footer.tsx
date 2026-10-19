"use client";

import React from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolio";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#030508] border-t border-white/10 pt-20 pb-0 overflow-hidden">
      {/* Background cyber grid and subtle ambient glow */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Main Content Container (Constrained) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Massive headline */}
        <div className="mb-14">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.1]">
            Let&apos;s create{" "}
            <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              incredible work
            </span>{" "}
            together.
          </h2>
        </div>

        {/* Email and Socials bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-12 border-b border-white/10">
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-1">
              Email Directly
            </span>
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Open Gmail to compose email"
              className="text-lg sm:text-2xl font-bold text-white hover:text-[#00F0FF] transition-colors inline-flex items-center gap-2 group"
            >
              <span>{portfolioData.email}</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:bg-[#00F0FF] group-hover:text-black font-mono transition-colors">
                Gmail ↗
              </span>
            </a>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs uppercase tracking-widest text-slate-500 font-mono mb-2">
              Socials &amp; Repositories
            </span>
            <div className="flex items-center gap-2">
              {portfolioData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-[#00F0FF] hover:shadow-[0_0_15px_rgba(0,240,255,0.4)] flex items-center justify-center text-slate-300 transition-all"
                >
                  {social.name === "GitHub" && <GithubIcon className="w-4 h-4" />}
                  {social.name === "LinkedIn" && <LinkedinIcon className="w-4 h-4" />}
                  {social.name === "Email" && <Mail className="w-4 h-4" />}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation & Copyright */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-8 text-xs text-slate-400">
          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-5 font-medium">
            <a href="#hero" onClick={scrollToTop} className="hover:text-white transition-colors">
              Home
            </a>
            {portfolioData.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 font-mono">
            <span>Based in {portfolioData.location}</span>
            <span>&copy; 2026 {portfolioData.name}. All rights reserved.</span>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH MASSIVE BRAND WATERMARK TYPOGRAPHY (Edge-to-Edge with original gradient & overlay) */}
      <div className="w-full select-none overflow-hidden flex justify-center opacity-25 hover:opacity-40 transition-opacity duration-500 pt-6 sm:pt-10 pb-0 leading-none">
        <svg
          viewBox="0 0 1600 215"
          className="w-full h-auto block select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="footerWatermarkGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
              <stop offset="65%" stopColor="#94A3B8" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#030508" stopOpacity="0" />
            </linearGradient>
          </defs>
          <text
            x="800"
            y="175"
            textAnchor="middle"
            fill="url(#footerWatermarkGradient)"
            style={{
              fontSize: "205px",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              fontFamily: "var(--font-sans), sans-serif"
            }}
          >
            {portfolioData.name.toUpperCase()}
          </text>
        </svg>
      </div>
    </footer>
  );
}
