"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  return (
    <section id="about" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 w-[550px] h-[550px] ambient-glow-purple rounded-full blur-[110px] opacity-20 -z-10" />

      {/* Main Glassmorphic Panel */}
      <div className="glass-panel glass-highlight-top rounded-3xl p-8 sm:p-12 lg:p-14">
        {/* Section Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#00F0FF] text-xs font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Profile &amp; Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            About <br />
            <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              {portfolioData.name}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left column: Photo card with verified socials */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative group max-w-sm w-full mx-auto lg:mx-0 rounded-3xl overflow-hidden glass-card glass-highlight-top p-3 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_25px_rgba(0,240,255,0.2)]">
              <div className="relative aspect-[4/4.8] w-full rounded-2xl overflow-hidden">
                <Image
                  src={portfolioData.avatar}
                  alt={portfolioData.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-transparent to-transparent opacity-80" />

                {/* Social icons pill overlay at bottom of photo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2.5 p-2 rounded-full glass-pill shadow-xl">
                  {portfolioData.socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="p-2 rounded-full text-slate-200 hover:text-white hover:bg-white/10 hover:shadow-[0_0_12px_rgba(0,240,255,0.5)] transition-all"
                    >
                      {social.name === "GitHub" && <GithubIcon className="w-4 h-4" />}
                      {social.name === "LinkedIn" && <LinkedinIcon className="w-4 h-4" />}
                      {social.name === "Email" && <Mail className="w-4 h-4" />}
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-4 flex flex-col">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  {portfolioData.name}
                </h3>
                <p className="text-xs text-cyan-300 font-mono mt-0.5">
                  {portfolioData.role}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Designer · Builder · Problem Solver
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Exact Narrative & Bullet Points from README.md */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-slate-200 leading-relaxed text-base sm:text-lg">
            <p className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
              I care about both how a product works and how people experience it.
            </p>

            {portfolioData.bioParagraphs.map((paragraph, index) => (
              <p key={index} className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Exact README.md Highlights Checklist */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-white/10">
              {portfolioData.highlights.map((item) => (
                <div key={item} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs sm:text-sm text-slate-200 hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all">
                  <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
