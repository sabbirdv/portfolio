"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, FolderGit2 } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { portfolioData, Project } from "@/data/portfolio";

// Looping Typewriter for Role Headline
function TypewriterRole() {
  const roles = [
    "Full Stack Developer",
    "Creative Designer",
    "MERN Stack Specialist",
    "JavaScript & TypeScript"
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <div className="flex items-center min-h-[32px] sm:min-h-[42px] lg:min-h-[48px]">
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-100 to-[#00F0FF] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.3)]">
        {displayText}
      </span>
      <span
        className="inline-block w-[3px] h-[1.15em] ml-1.5 bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse rounded-full align-middle"
        aria-hidden="true"
      />
    </div>
  );
}

export default function HeroProjects() {
  const projects = portfolioData.projects;
  const featuredProject = projects[0];
  const secondaryProject = projects[1];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Subtle Ambient Radial Lighting */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-[650px] h-[650px] ambient-glow-cyan rounded-full blur-[120px] opacity-25 -z-10" />
      <div className="pointer-events-none absolute top-40 right-1/4 w-[650px] h-[650px] ambient-glow-purple rounded-full blur-[120px] opacity-20 -z-10" />

      {/* ======================================================== */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section
        id="hero"
        className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center pt-24 sm:pt-28 pb-12 sm:pb-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* HERO LEFT COLUMN */}
            <div className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 z-10 w-full">
              {/* Glowing Emerald Available for Hire Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#071311]/80 border border-emerald-500/40 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-300 tracking-wide font-mono">
                  Available for Hire / Bangladesh
                </span>
              </motion.div>

              {/* Bold High-Contrast Headline */}
              <div className="space-y-1 sm:space-y-1.5 w-full">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]"
                >
                  Sabbir Hasan
                </motion.h1>
                <TypewriterRole />
              </div>

              {/* Crisp, Highly Legible Bio */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-sm sm:text-base md:text-lg text-slate-200 max-w-xl leading-relaxed font-normal"
              >
                <strong className="text-white font-semibold">
                  I design and build modern, functional, and user-focused digital experiences.
                </strong>{" "}
                Full Stack Web Developer &amp; Creative Designer focused on building modern web applications and meaningful digital experiences.
              </motion.p>

              {/* CTAs: See My Github + Explore Projects */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-3.5 pt-1"
              >
                <a
                  href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-[#0B101E]/90 border border-white/20 text-white font-medium text-sm shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:border-[#00F0FF] hover:shadow-[0_0_35px_rgba(0,240,255,0.45)] transition-all duration-300 active:scale-95"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.5)]">
                    <Image
                      src={portfolioData.avatar}
                      alt={portfolioData.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <span className="tracking-tight text-white font-medium group-hover:text-[#00F0FF] transition-colors">
                    See My Github
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#00F0FF] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 hover:text-white font-medium text-sm transition-all duration-300 hover:border-cyan-400/50"
                >
                  <FolderGit2 className="w-4 h-4 text-[#00F0FF]" />
                  <span>Explore Projects</span>
                </a>
              </motion.div>
            </div>

            {/* HERO RIGHT COLUMN (Desktop Only: Lightweight GPU-Floating Featured Showcase) */}
            <div className="hidden lg:flex lg:col-span-5 relative w-full items-center justify-center">
              {/* Soft Ambient Radial Backdrop */}
              <div className="absolute w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
              <div className="absolute w-64 h-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

              {/* Showcase Container with pure GPU CSS Float */}
              <div className="relative w-full max-w-[420px] aspect-[4/3] animate-subtle-float">
                {/* Secondary Background Layer Card */}
                {secondaryProject && (
                  <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-[#080D1A] border border-cyan-500/20 translate-x-4 -translate-y-3 rotate-3 opacity-60 overflow-hidden shadow-2xl pointer-events-none">
                    <Image
                      src={secondaryProject.image}
                      alt={secondaryProject.title}
                      fill
                      className="object-cover object-center opacity-30"
                      sizes="400px"
                    />
                  </div>
                )}

                {/* Main Front Featured Card */}
                {featuredProject && (
                  <div className="group relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0A0F1D] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] transition-all duration-300 hover:border-[#00F0FF] hover:shadow-[0_0_35px_rgba(0,240,255,0.35)] flex flex-col justify-between p-5 select-none">
                    {/* Full-bleed Project Image */}
                    <div className="absolute inset-0 -z-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070D18]">
                      <Image
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        fill
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="450px"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070A] via-[#05070A]/70 to-[#05070A]/20 pointer-events-none" />
                    </div>

                    {/* Stretched Link to Featured Project */}
                    <a
                      href={featuredProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${featuredProject.title} live demo`}
                      className="absolute inset-0 z-10 cursor-pointer"
                    />

                    {/* Top Bar: Featured Badge & Links */}
                    <div className="flex items-center justify-between z-20 w-full">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-slate-100 bg-[#05070A]/85 border border-white/20 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                        Featured Project
                      </span>

                      <div className="flex items-center gap-2 relative z-30">
                        {featuredProject.githubUrl && (
                          <a
                            href={featuredProject.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View GitHub Repository"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-full bg-[#05070A]/90 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.5)] transition-all shadow-md"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        <a
                          href={featuredProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Open Live Preview"
                          onClick={(e) => e.stopPropagation()}
                          className="w-8 h-8 rounded-full bg-[#05070A]/90 border border-white/20 flex items-center justify-center text-slate-300 hover:text-black hover:bg-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_12px_#00F0FF] transition-all shadow-md"
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Bottom Bar: Title, Description, and Live Demo Button */}
                    <div className="z-20 flex flex-col gap-2 w-full">
                      <div className="flex flex-wrap gap-1.5">
                        {featuredProject.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#05070A]/85 border border-white/15 text-slate-200 shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-end justify-between gap-3 mt-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-[#00F0FF] transition-colors truncate">
                            {featuredProject.title}
                          </h3>
                          <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">
                            {featuredProject.description}
                          </p>
                        </div>

                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-[#00F0FF]/15 border border-cyan-400/50 text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-black transition-all whitespace-nowrap shadow-md">
                          <span>Live Demo</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LATEST PROJECTS SECTION (1-Col Mobile, 2-Col Desktop) */}
      {/* ======================================================== */}
      <section id="projects" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-28">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[#00F0FF] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineered Works</span>
          </div>
          <div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Latest Projects
            </h2>
          </div>
        </div>

        {/* Responsive Grid: 1-Column on Mobile, 2-Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          {projects.map((project, index) => {
            return (
              <ProjectCardItem
                key={project.id}
                project={project}
                index={index}
              />
            );
          })}
        </div>

        {/* View More Projects on GitHub */}
        <div className="mt-14 sm:mt-16 flex justify-center">
          <a
            href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0A0F1D]/80 border border-white/10 hover:border-cyan-400 text-slate-200 hover:text-white font-medium text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)]"
          >
            <span>Explore All Repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-[#00F0FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </section>
    </div>
  );
}

// ====================================================================
// INDIVIDUAL LIGHTWEIGHT PROJECT CARD COMPONENT
// Fast loading, zero-lag viewport reveal with IntersectionObserver
// ====================================================================
interface ProjectCardItemProps {
  project: Project;
  index: number;
}

function ProjectCardItem({ project, index }: ProjectCardItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        ease: "easeOut",
        delay: index % 2 === 0 ? 0 : 0.08
      }}
      className="relative w-full h-[250px] sm:h-[290px] md:h-[340px] lg:h-[370px] rounded-2xl sm:rounded-3xl overflow-hidden group bg-[#0A0F1D] border border-white/15 hover:border-[#00F0FF] shadow-[0_15px_40px_rgba(0,0,0,0.6)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)] transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col justify-between p-4 sm:p-6 lg:p-7 select-none"
    >
      {/* Specular Diagonal Glass Highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Full-bleed Project Image with strict corner radius clipping */}
      <div className="absolute inset-0 -z-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070D18]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover object-center rounded-2xl sm:rounded-3xl transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          loading={index < 2 ? "eager" : "lazy"}
          priority={index < 2}
        />
        {/* Permanent Crisp Gradient Overlay - highly legible on all devices */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-[#05070A] via-[#05070A]/75 to-[#05070A]/20 pointer-events-none" />
      </div>

      {/* Stretched Link for the entire card (Live Demo) */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.title} live demo`}
        className="absolute inset-0 z-10 cursor-pointer rounded-2xl sm:rounded-3xl"
      />

      {/* TOP BAR: Category Badge & Quick Links */}
      <div className="flex items-center justify-between z-20 w-full pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-medium text-slate-100 bg-[#05070A]/85 border border-white/15 backdrop-blur-md shadow-md">
          <span
            className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full shadow-[0_0_8px]"
            style={{
              backgroundColor: project.accent,
              color: project.accent
            }}
          />
          {project.category}
        </span>

        {/* Top-Right Quick Link Icons: GitHub & Live Demo */}
        <div className="flex items-center gap-1.5 sm:gap-2 relative z-30">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="View GitHub Repository"
              onClick={(e) => e.stopPropagation()}
              className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#05070A]/90 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/15 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.5)] transition-all duration-300 shadow-md cursor-pointer relative z-30"
            >
              <GithubIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
            </a>
          )}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Live Preview"
            onClick={(e) => e.stopPropagation()}
            className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#05070A]/90 border border-white/20 flex items-center justify-center text-slate-300 hover:text-black hover:bg-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_12px_#00F0FF] transition-all duration-300 shadow-md relative z-30 cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* BOTTOM BAR: Tech tags, Title, and Action Link Button */}
      <div className="z-20 flex flex-col gap-2 sm:gap-3 w-full pointer-events-auto">
        {/* Tech Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-[#05070A]/85 border border-white/15 text-slate-200 backdrop-blur-md shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between gap-3 sm:gap-4 mt-0.5">
          <div className="flex-1 min-w-0">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="relative z-30 block text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight hover:text-[#00F0FF] transition-colors drop-shadow-md truncate"
            >
              {project.title}
            </a>
            <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action Button: Native Anchor Link */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Live Preview"
            onClick={(e) => e.stopPropagation()}
            className="relative z-30 inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold bg-[#00F0FF]/15 border border-cyan-400/50 text-[#00F0FF] hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)] transition-all duration-300 whitespace-nowrap shrink-0 shadow-lg cursor-pointer"
          >
            <span>Live Demo</span>
            <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
