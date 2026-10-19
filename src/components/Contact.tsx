"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolio";

export default function Contact() {
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`;

  return (
    <section id="contact" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[500px] ambient-glow-cyan rounded-full blur-[120px] opacity-15 -z-10" />

      {/* Floating Glassmorphic Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="glass-panel glass-highlight-top relative max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 lg:p-14 text-center flex flex-col items-center gap-8"
      >
        {/* Top: Avatar and Profile Info */}
        <div className="flex items-center gap-3.5 p-2 rounded-full glass-pill pr-5">
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.4)]">
            <Image
              src={portfolioData.avatar}
              alt={portfolioData.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-sm font-bold text-white tracking-tight">
              {portfolioData.name}
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              ● {portfolioData.availability}
            </span>
          </div>
        </div>

        {/* Center: Headline & Pitch */}
        <div className="flex flex-col gap-3 max-w-xl">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Building Something Amazing? <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.25)]">
              Let&apos;s chat.
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-1">
            I build modern, functional, and user-focused digital experiences with React, Next.js, and modern web technologies. Open to collaboration, opportunities and interesting projects.
          </p>
        </div>

        {/* Action Buttons: Pill-shaped frosted glass with glowing neon borders on hover */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full">
          {/* Primary Email Button: Direct Gmail Compose */}
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Compose message in Gmail"
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#070D18]/90 border border-cyan-400/80 text-white font-medium text-xs sm:text-sm shadow-[0_0_20px_rgba(0,240,255,0.35),_inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4 text-[#00F0FF] group-hover:text-black transition-colors" />
            <span>Send Email via Gmail</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* LinkedIn Button */}
          <a
            href={portfolioData.socials.find((s) => s.name === "LinkedIn")?.url || "https://linkedin.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full glass-btn-secondary text-slate-200 hover:text-white font-medium text-xs sm:text-sm"
          >
            <LinkedinIcon className="w-4 h-4 text-[#00F0FF]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* GitHub Button */}
          <a
            href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-full glass-btn-secondary text-slate-200 hover:text-white font-medium text-xs sm:text-sm"
          >
            <GithubIcon className="w-4 h-4 text-[#00F0FF]" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
