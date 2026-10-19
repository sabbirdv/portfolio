"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
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

// Project Initial 3D Deck Angles (Fan angle deck matching Austin Serb)
const initialDeckAngles = [
  { rotZ: 0, rotX: 3, rotY: -2, zIndex: 46 },
  { rotZ: -5, rotX: 4, rotY: 2, zIndex: 45 },
  { rotZ: 6, rotX: 2, rotY: -3, zIndex: 44 },
  { rotZ: -9, rotX: 3, rotY: 3, zIndex: 43 },
  { rotZ: 10, rotX: 2, rotY: -2, zIndex: 42 },
  { rotZ: -14, rotX: 4, rotY: 2, zIndex: 41 }
];

export default function HeroProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopStackTargetRef = useRef<HTMLDivElement>(null);
  const mobileStackTargetRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Exact measured delta translations from grid slot to hero stack target
  const [offsets, setOffsets] = useState<Array<{ x: number; y: number }>>([
    { x: 300, y: -580 },
    { x: -300, y: -580 },
    { x: 300, y: -980 },
    { x: -300, y: -980 },
    { x: 300, y: -1380 },
    { x: -300, y: -1380 }
  ]);

  // Recalculate exact pixel deltas on mount and resize
  useEffect(() => {
    setMounted(true);

    const updateMeasurements = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);

      const targetEl = desktop
        ? desktopStackTargetRef.current
        : mobileStackTargetRef.current;

      if (!targetEl) return;
      const targetRect = targetEl.getBoundingClientRect();
      const targetCenter = {
        x: targetRect.left + targetRect.width / 2,
        y: targetRect.top + targetRect.height / 2
      };

      const newOffsets = cardRefs.current.map((cardEl) => {
        if (!cardEl) return { x: 0, y: 0 };
        const cardRect = cardEl.getBoundingClientRect();
        const cardCenter = {
          x: cardRect.left + cardRect.width / 2,
          y: cardRect.top + cardRect.height / 2
        };

        return {
          x: targetCenter.x - cardCenter.x,
          y: targetCenter.y - cardCenter.y
        };
      });

      setOffsets(newOffsets);
    };

    // Staggered triggers to account for font loading and layout stabilization
    const timer1 = setTimeout(updateMeasurements, 60);
    const timer2 = setTimeout(updateMeasurements, 250);
    const timer3 = setTimeout(updateMeasurements, 600);

    window.addEventListener("resize", updateMeasurements);
    window.addEventListener("orientationchange", updateMeasurements);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      window.removeEventListener("resize", updateMeasurements);
      window.removeEventListener("orientationchange", updateMeasurements);
    };
  }, []);

  // Track scroll progress across Hero and transition zone
  const { scrollY } = useScroll();

  // Smooth scroll interpolation from 0 (Hero top) to 480px (entering Projects Grid)
  const rawProgress = useTransform(scrollY, [0, 480], [0, 1]);
  const smoothProgress = useSpring(rawProgress, {
    stiffness: 260,
    damping: 30,
    mass: 0.5
  });

  // Hero headline & bio fade slightly as user scrolls down
  const heroOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0.25]);
  const heroY = useTransform(smoothProgress, [0, 0.45], [0, -35]);

  const projects = portfolioData.projects;

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Subtle Ambient Radial Lighting */}
      <div className="pointer-events-none absolute top-10 left-1/4 w-[650px] h-[650px] ambient-glow-cyan rounded-full blur-[120px] opacity-25 -z-10" />
      <div className="pointer-events-none absolute top-40 right-1/4 w-[650px] h-[650px] ambient-glow-purple rounded-full blur-[120px] opacity-20 -z-10" />

      {/* ======================================================== */}
      {/* 1. HERO SECTION                                          */}
      {/* ======================================================== */}
      <section
        id="hero"
        className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center pt-24 sm:pt-28 pb-10 sm:pb-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* HERO LEFT COLUMN (Spans full width on mobile, 7 cols on desktop) */}
            <motion.div
              style={{ opacity: heroOpacity, y: heroY }}
              className="lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6 z-10 w-full"
            >
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

              {/* Bold High-Contrast Headline + Mobile 3D Deck Anchor */}
              <div className="flex items-center justify-between gap-3 sm:gap-4 w-full">
                {/* Left: Responsive Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 min-w-0 space-y-1 sm:space-y-1.5"
                >
                  <span className="block text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Sabbir Hasan
                  </span>
                  <TypewriterRole />
                </motion.div>

                {/* Right (Mobile Only): 3D Card Deck Anchor Slot matching Austin Serb mobile screenshot */}
                <div
                  ref={mobileStackTargetRef}
                  className="block lg:hidden shrink-0 w-[145px] sm:w-[175px] h-[95px] sm:h-[115px] relative"
                  aria-hidden="true"
                />
              </div>

              {/* Crisp, Highly Legible Bio from README.md */}
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

              {/* "See My Github" Button with Avatar & Neon Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <a
                  href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0B101E]/90 border border-white/20 text-white font-medium text-sm shadow-[0_0_25px_rgba(0,240,255,0.25)] hover:border-[#00F0FF] hover:shadow-[0_0_35px_rgba(0,240,255,0.45)] transition-all duration-300 active:scale-95"
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
              </motion.div>
            </motion.div>

            {/* HERO RIGHT COLUMN (Desktop Only: 3D Stack Landing Anchor) */}
            <div
              ref={desktopStackTargetRef}
              className="hidden lg:flex lg:col-span-5 relative h-[380px] sm:h-[420px] w-full items-center justify-center perspective-[1200px]"
              aria-hidden="true"
            >
              <div className="absolute w-80 h-80 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
              <div className="absolute w-64 h-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LATEST PROJECTS SECTION (1-Col Mobile, 2-Col Desktop) */}
      {/* ======================================================== */}
      <section id="projects" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-[#00F0FF] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineered Works</span>
          </div>
          <div className="pointer-events-none relative z-50 mix-blend-exclusion select-none">
            <h2 className="inline-block text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Latest Projects
            </h2>
          </div>
        </div>

        {/* Responsive Grid: 1-Column on Mobile, 2-Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-40 perspective-[1200px]">
          {projects.map((project, index) => {
            return (
              <ProjectCardItem
                key={project.id}
                project={project}
                index={index}
                smoothProgress={smoothProgress}
                offset={offsets[index] || { x: 0, y: 0 }}
                isDesktop={isDesktop}
                mounted={mounted}
                cardRef={(el) => {
                  cardRefs.current[index] = el;
                }}
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
// INDIVIDUAL 3D FLOATING PROJECT CARD COMPONENT
// ====================================================================
interface ProjectCardItemProps {
  project: Project;
  index: number;
  smoothProgress: MotionValue<number>;
  offset: { x: number; y: number };
  isDesktop: boolean;
  mounted: boolean;
  cardRef: (el: HTMLDivElement | null) => void;
}

function ProjectCardItem({
  project,
  index,
  smoothProgress,
  offset,
  isDesktop,
  mounted,
  cardRef
}: ProjectCardItemProps) {
  const config = initialDeckAngles[index] || { rotZ: 0, rotX: 0, rotY: 0, zIndex: 10 };

  // Scroll Interpolation Transforms: smoothly transition from Hero Stack to Grid
  const cardX = useTransform(smoothProgress, [0, 1], [offset.x, 0]);
  const cardY = useTransform(smoothProgress, [0, 1], [offset.y, 0]);
  const cardRotZ = useTransform(smoothProgress, [0, 1], [config.rotZ, 0]);
  const cardRotX = useTransform(smoothProgress, [0, 1], [config.rotX, 0]);
  const cardRotY = useTransform(smoothProgress, [0, 1], [config.rotY, 0]);

  // Initial scale: on mobile the cards start at ~0.42 to match the compact hero stack; on desktop ~0.82
  const initialScale = isDesktop ? 0.82 : 0.42;
  const cardScale = useTransform(smoothProgress, [0, 1], [initialScale, 1]);

  // Dynamic Z-Index: stacked hero deck requires top card on top; in grid, all z-10
  const cardZIndex = useTransform(smoothProgress, [0, 0.95, 1], [config.zIndex, config.zIndex, 10]);

  // Details Visibility:
  // In Hero (smoothProgress 0 to 0.6), details are 100% hidden (opacity: 0) -> ONLY THE IMAGE IS VISIBLE!
  // When scrolling into Project section (smoothProgress 0.6 to 0.92), details smoothly fade in!
  const detailsOpacity = useTransform(smoothProgress, [0.6, 0.92], [0, 1]);
  const detailsY = useTransform(smoothProgress, [0.6, 0.92], [16, 0]);

  return (
    <div
      ref={cardRef}
      className="relative w-full h-[240px] sm:h-[280px] md:h-[340px] lg:h-[390px] overflow-visible rounded-2xl sm:rounded-3xl"
    >
      <motion.div
        style={{
          x: mounted ? cardX : 0,
          y: mounted ? cardY : 0,
          rotateZ: mounted ? cardRotZ : 0,
          rotateX: mounted ? cardRotX : 0,
          rotateY: mounted ? cardRotY : 0,
          scale: mounted ? cardScale : 1,
          zIndex: mounted ? cardZIndex : 10,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-full transform-gpu will-change-transform overflow-visible origin-center rounded-2xl sm:rounded-3xl"
      >
        <div
          onClick={() => window.open(project.liveUrl, "_blank", "noopener,noreferrer")}
          className="group cursor-pointer relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden isolate bg-[#0A0F1D] border border-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 ease-out hover:border-[#00F0FF] hover:shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:-translate-y-1.5 flex flex-col justify-between p-4 sm:p-6 lg:p-7 select-none"
        >
          {/* Specular Diagonal Glass Highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Full-bleed Project Image with strict corner radius clipping */}
          <div className="absolute inset-0 -z-10 rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070D18]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-center rounded-2xl sm:rounded-3xl transition-transform duration-300 ease-out group-hover:scale-103"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority={index < 2}
            />
            {/* Dynamic Glass Gradient Overlay: only darkens when details fade in on scroll */}
            <motion.div
              style={{ opacity: detailsOpacity }}
              className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-[#05070A] via-[#05070A]/70 to-transparent pointer-events-none"
            />
          </div>

          {/* TOP BAR: Category Frosted Glass Badge (fades in on scroll to project section) */}
          <motion.div
            style={{ opacity: detailsOpacity, y: detailsY }}
            className="flex items-center justify-between z-10 w-full pointer-events-auto"
          >
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
            <div className="flex items-center gap-1.5 sm:gap-2">
              {project.githubUrl && (
                <button
                  type="button"
                  title="View GitHub Repository"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                  }}
                  className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#05070A]/80 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/15 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.4)] transition-all duration-300 shadow-md cursor-pointer"
                >
                  <GithubIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </button>
              )}
              <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-[#05070A]/80 border border-white/15 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:bg-[#00F0FF] group-hover:border-[#00F0FF] group-hover:shadow-[0_0_12px_#00F0FF] transition-all duration-300 shadow-md">
                <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.div>

          {/* BOTTOM BAR: Tech tags, Title, and Action Link Button (fades in on scroll) */}
          <motion.div
            style={{ opacity: detailsOpacity, y: detailsY }}
            className="z-10 flex flex-col gap-2 sm:gap-3 w-full pointer-events-auto"
          >
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
                <h3 className="text-base sm:text-xl lg:text-2xl font-bold text-white tracking-tight group-hover:text-[#00F0FF] transition-colors drop-shadow-md truncate">
                  {project.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-1 mt-0.5 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#00F0FF]/15 border border-cyan-400/40 text-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-black group-hover:border-[#00F0FF] group-hover:shadow-[0_0_15px_rgba(0,240,255,0.7)] transition-all duration-300 whitespace-nowrap shrink-0 shadow-md">
                <span>Live Demo</span>
                <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
