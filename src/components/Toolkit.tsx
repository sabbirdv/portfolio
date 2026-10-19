"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { TechIcon } from "@/components/TechIcons";

export default function Toolkit() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="toolkit" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] ambient-glow-cyan rounded-full blur-[120px] opacity-20 -z-10" />

      {/* Main Glassmorphic Wrapper */}
      <div className="glass-panel rounded-3xl p-8 sm:p-12 lg:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Tech Stack Grid */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[#00F0FF] text-xs font-mono uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Technologies</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Engineering <br />
                <span className="bg-gradient-to-r from-white via-cyan-100 to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                  Toolkit
                </span>
              </h2>
            </div>

            <div>
              <p className="text-base sm:text-lg font-medium text-slate-300 tracking-tight mb-7">
                My tech stack
              </p>

              {/* 5-Column Grid with authentic logos & gentle hover physics */}
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3.5 sm:gap-4">
                {portfolioData.techStack.map((tech, index) => (
                  <motion.div
                    key={tech.id}
                    initial={{ opacity: 0, scale: 0.6, y: 25 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                      delay: index * 0.035
                    }}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setHoveredSkill(tech.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group relative flex flex-col items-center justify-center aspect-square rounded-2xl bg-[#090E18]/85 border border-white/10 hover:border-cyan-400/70 hover:shadow-[0_0_18px_rgba(0,240,255,0.25)] backdrop-blur-xl cursor-pointer transition-colors duration-200"
                  >
                    {/* Authentic Brand Logo (No excessive inner scaling) */}
                    <div className="flex items-center justify-center p-3">
                      <TechIcon id={tech.id} className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm" />
                    </div>

                    {/* Floating Pill Tooltip (matching screenshot: black pill directly above card) */}
                    <div
                      className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-30 whitespace-nowrap rounded-full bg-black border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-xl transition-all duration-200 ${
                        hoveredSkill === tech.name
                          ? "opacity-100 -translate-y-1"
                          : "opacity-0 translate-y-1"
                      }`}
                    >
                      {tech.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Currently Working On (from README.md) */}
          <div className="lg:col-span-5 flex flex-col gap-5 lg:pt-8">
            <span className="text-xs uppercase tracking-widest text-slate-400 font-mono">
              Currently Working On
            </span>

            <div className="flex flex-col gap-3">
              {portfolioData.currentlyWorkingOn.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.07 }}
                  className="group p-4 rounded-2xl bg-[#070D18]/70 border border-white/10 hover:border-cyan-400/50 hover:bg-[#0B1322]/90 transition-all duration-200 flex items-center gap-3.5 shadow-sm"
                >
                  <div className="w-8 h-8 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-[#00F0FF] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)] transition-all shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Quick Link to GitHub Repositories */}
            <div className="pt-4 border-t border-white/10">
              <a
                href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors"
              >
                <span>View real-world projects on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
