"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { portfolioData, Project } from "@/data/portfolio";

// ============================================================================
// PERFORMANCE-OPTIMIZED TYPEWRITER (Single-timer, zero layout reflow)
// ============================================================================
const ROLES = [
  "Full Stack Developer",
  "Creative Designer",
  "MERN Stack Specialist",
  "JavaScript & TypeScript"
] as const;

function TypewriterRole() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIndex];
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
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
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

// 2D Hardware-accelerated composite fanning deck angles
const DECK_CONFIG = [
  { rotZ: -5, zIndex: 50 },
  { rotZ: 4, zIndex: 48 },
  { rotZ: -9, zIndex: 46 },
  { rotZ: 7, zIndex: 44 },
  { rotZ: -13, zIndex: 42 },
  { rotZ: 11, zIndex: 40 }
] as const;

export default function HeroProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopStackTargetRef = useRef<HTMLDivElement>(null);
  const mobileStackTargetRef = useRef<HTMLDivElement>(null);

  // References to direct DOM nodes to completely bypass React render cycles on scroll
  const cardOuterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailsTopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const detailsBottomRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroTextRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  // Pre-calculated or measured offsets (slot center to stack center)
  const offsetsRef = useRef<Array<{ x: number; y: number }>>([
    { x: 300, y: -580 },
    { x: -300, y: -580 },
    { x: 300, y: -980 },
    { x: -300, y: -980 },
    { x: 300, y: -1380 },
    { x: -300, y: -1380 }
  ]);

  const isDesktopRef = useRef(true);
  const isReducedMotionRef = useRef(false);

  // ==========================================================================
  // PRINCIPAL PERFORMANCE ENGINE: Decoupled rAF Composite Loop
  // ==========================================================================
  useEffect(() => {
    setMounted(true);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    isReducedMotionRef.current = prefersReducedMotion;

    // Cache viewport & target measurements once (decoupled from scroll)
    const updateMeasurements = () => {
      const desktop = window.innerWidth >= 768; // md breakpoint for tablet & desktop
      isDesktopRef.current = desktop;

      const targetEl = desktop
        ? desktopStackTargetRef.current
        : mobileStackTargetRef.current;

      if (!targetEl) return;
      const targetRect = targetEl.getBoundingClientRect();
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      offsetsRef.current = cardOuterRefs.current.map((cardEl) => {
        if (!cardEl) return { x: 0, y: 0 };
        const cardRect = cardEl.getBoundingClientRect();
        return {
          x: targetCenterX - (cardRect.left + cardRect.width / 2),
          y: targetCenterY - (cardRect.top + cardRect.height / 2)
        };
      });
    };

    updateMeasurements();

    let rafId = 0;
    let isTicking = false;
    let currentProgress = -1; // Force initial render
    let lastScrollY = window.scrollY;

    const TRANSITION_HEIGHT = 440; // Pixel threshold where cards land in grid
    const LERP_FACTOR = 0.22; // Desktop momentum; mobile uses 1.0 (zero lag)

    // Render loop executing purely on the browser compositor via rAF
    const render = () => {
      const isDesktop = isDesktopRef.current;
      const isReduced = isReducedMotionRef.current;

      // Calculate target progress clamped [0, 1]
      const targetProgress = isReduced
        ? 1
        : Math.min(1, Math.max(0, lastScrollY / TRANSITION_HEIGHT));

      // On mobile, lock 1:1 to touch scroll (LERP = 1.0) for zero input latency
      const lerp = isDesktop && !isReduced ? LERP_FACTOR : 1.0;
      currentProgress += (targetProgress - currentProgress) * lerp;

      // Snap when close enough to sleep rAF loop and eliminate idle battery drain
      if (Math.abs(targetProgress - currentProgress) < 0.001) {
        currentProgress = targetProgress;
        isTicking = false;
      }

      const p = currentProgress;
      const remaining = 1 - p;
      const initialScale = isDesktop ? 0.82 : 0.33;
      const rotZMultiplier = isDesktop ? 1.0 : 0.6;
      const scale = initialScale + (1 - initialScale) * p;

      // 1. Update Hero Text Opacity & Translation (Composite only)
      if (heroTextRef.current) {
        const heroP = Math.min(1, p / 0.45);
        const heroOpacity = 1 - heroP * 0.75;
        const heroTranslateY = -heroP * 30;
        heroTextRef.current.style.opacity = heroOpacity.toFixed(3);
        heroTextRef.current.style.transform = `translate3d(0, ${heroTranslateY.toFixed(1)}px, 0)`;
      }

      // 2. Details (Title, Tags, Buttons) Fade-in Curve: 0% in Hero, fades in from p=0.45 to 0.85
      const detailsP = Math.max(0, Math.min(1, (p - 0.45) / 0.4));
      const detailsOpacity = detailsP.toFixed(3);
      const detailsTranslateY = ((1 - detailsP) * 14).toFixed(1);

      // 3. Batch apply hardware-accelerated transforms to all cards
      const offsets = offsetsRef.current;
      const cardsCount = cardInnerRefs.current.length;

      for (let i = 0; i < cardsCount; i++) {
        const innerEl = cardInnerRefs.current[i];
        const outerEl = cardOuterRefs.current[i];
        if (!innerEl || !outerEl) continue;

        const config = DECK_CONFIG[i] || { rotZ: 0, zIndex: 10 };

        if (p >= 0.999) {
          // Idle in grid: clear transforms & will-change to free GPU VRAM
          innerEl.style.transform = "";
          innerEl.style.willChange = "auto";
          outerEl.style.zIndex = "20";
        } else {
          // Active transition state: engage will-change (70..60, always in front of header)
          innerEl.style.willChange = "transform";
          outerEl.style.zIndex = String(config.zIndex + 20);

          const offset = offsets[i] || { x: 0, y: 0 };
          const x = (offset.x * remaining).toFixed(1);
          const y = (offset.y * remaining).toFixed(1);
          const rotZ = (config.rotZ * rotZMultiplier * remaining).toFixed(2);
          const s = scale.toFixed(3);

          innerEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${rotZ}deg)`;
        }

        // Update details visibility without triggering layout reflow
        const topEl = detailsTopRefs.current[i];
        const bottomEl = detailsBottomRefs.current[i];

        if (topEl) {
          topEl.style.opacity = detailsOpacity;
          topEl.style.transform = `translate3d(0, ${detailsTranslateY}px, 0)`;
        }
        if (bottomEl) {
          bottomEl.style.opacity = detailsOpacity;
          bottomEl.style.transform = `translate3d(0, ${detailsTranslateY}px, 0)`;
        }
      }

      // Continue rAF loop only while transitioning; automatically sleep when idle
      if (isTicking) {
        rafId = requestAnimationFrame(render);
      }
    };

    // Passive scroll listener: purely updates scroll coordinate without executing work
    const onScroll = () => {
      lastScrollY = window.scrollY;

      // Only run when within transition range or settling
      if (!isTicking) {
        if (lastScrollY <= TRANSITION_HEIGHT + 100 || currentProgress < 0.999) {
          isTicking = true;
          rafId = requestAnimationFrame(render);
        }
      }
    };

    const onResize = () => {
      updateMeasurements();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    // Initial render tick to position deck at scroll 0
    isTicking = true;
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center">
            {/* HERO LEFT COLUMN */}
            <div
              ref={heroTextRef}
              className="md:col-span-7 flex flex-col items-start gap-4 sm:gap-6 z-10 w-full transform-gpu"
              style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
            >
              {/* Glowing Emerald Available for Hire Badge (Compact on mobile to prevent overlap) */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/35 backdrop-blur-md shadow-[0_4px_16px_rgba(16,185,129,0.2),_inset_0_1px_0_rgba(255,255,255,0.15)] mb-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
                </span>
                <span className="text-xs font-semibold text-emerald-300 tracking-wide font-mono whitespace-nowrap">
                  Available for Hire<span className="hidden sm:inline"> / Bangladesh</span>
                </span>
              </div>

              {/* Bold Headline + Mobile Deck Anchor Slot */}
              <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
                <div className="flex-1 min-w-0 space-y-1 sm:space-y-1.5 pr-2">
                  <span className="block text-3xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Sabbir Hasan
                  </span>
                  <TypewriterRole />
                </div>

                {/* Right (Mobile Only <768px): Calibrated Card Deck Anchor Slot */}
                <div
                  ref={mobileStackTargetRef}
                  className="block md:hidden shrink-0 w-[115px] sm:w-[130px] h-[78px] sm:h-[90px] relative"
                  aria-hidden="true"
                />
              </div>

              {/* Crisp, Highly Legible Bio */}
              <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-xl leading-relaxed font-normal">
                <strong className="text-white font-semibold">
                  I design and build modern, functional, and user-focused digital experiences.
                </strong>{" "}
                Full Stack Web Developer &amp; Creative Designer focused on building modern web applications and meaningful digital experiences.
              </p>

              {/* "See My Github" Button with Avatar & Neon Glow */}
              <div>
                <a
                  href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-4 py-2.5 rounded-full glass-card glass-card-interactive border-white/20 hover:border-[#00F0FF] shadow-[0_4px_20px_rgba(0,0,0,0.35),_inset_0_1px_1px_rgba(255,255,255,0.2)] active:scale-95 cursor-pointer"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.5)]">
                    <Image
                      src={portfolioData.githubAvatar || portfolioData.avatar}
                      alt={portfolioData.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                      priority
                      decoding="async"
                    />
                  </div>
                  <span className="tracking-tight text-white font-medium group-hover:text-[#00F0FF] transition-colors">
                    See My Github
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#00F0FF] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </a>
              </div>
            </div>

            {/* HERO RIGHT COLUMN (Tablet & Desktop md+: Stack Landing Anchor) */}
            <div
              ref={desktopStackTargetRef}
              className="hidden md:flex md:col-span-5 relative h-[360px] lg:h-[420px] w-full items-center justify-center overflow-visible"
              aria-hidden="true"
            >
              <div className="absolute w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
              <div className="absolute w-60 h-60 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. LATEST PROJECTS SECTION (1-Col Mobile, 2-Col Tablet/Desktop) */}
      {/* ======================================================== */}
      <section id="projects" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-28">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-pill text-[#00F0FF] text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Engineered Works</span>
          </div>
          <div className="pointer-events-none select-none">
            <h2 className="inline-block text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Latest Projects
            </h2>
          </div>
        </div>

        {/* Responsive Grid: 1-Column on Mobile, 2-Column on Tablet & Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-30">
          {projects.map((project, index) => {
            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardOuterRefs.current[index] = el;
                }}
                style={{
                  zIndex: mounted ? (DECK_CONFIG[index]?.zIndex || 10) + 20 : 20
                }}
                className="relative w-full h-[250px] sm:h-[290px] md:h-[340px] lg:h-[390px] overflow-visible rounded-2xl sm:rounded-3xl"
              >
                {/* Hardware-accelerated GPU Composite Layer */}
                <div
                  ref={(el) => {
                    cardInnerRefs.current[index] = el;
                  }}
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "translate3d(0, 0, 0)"
                  }}
                  className="w-full h-full transform-gpu overflow-visible origin-center rounded-2xl sm:rounded-3xl"
                >
                  <div className="group relative h-full w-full rounded-2xl sm:rounded-3xl overflow-hidden glass-card glass-card-interactive flex flex-col justify-between p-3 sm:p-5 lg:p-6 select-none">
                    {/* Layer 0: Full-bleed Project Image (100% clean, crisp, no dark overlay) */}
                    <div className="absolute inset-0 z-0 rounded-2xl sm:rounded-3xl overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-center rounded-2xl sm:rounded-3xl transition-transform duration-300 ease-out group-hover:scale-103"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        priority={index < 2}
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                      />
                    </div>

                    {/* Layer 1: Specular Diagonal Glass Highlight */}
                    <div className="pointer-events-none absolute inset-0 z-[1] rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Layer 2: Stretched Link for the entire card (Live Demo) */}
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live demo`}
                      className="absolute inset-0 z-10 cursor-pointer rounded-2xl sm:rounded-3xl"
                    />

                    {/* Layer 3: TOP BAR (Category Badge & Quick Links - driven by decoupled rAF) */}
                    <div
                      ref={(el) => {
                        detailsTopRefs.current[index] = el;
                      }}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translate3d(0, 0, 0)"
                      }}
                      className="flex items-center justify-between z-20 w-full pointer-events-auto transform-gpu"
                    >
                      <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-mono font-semibold text-cyan-300 bg-black/50 border border-cyan-500/35 backdrop-blur-md shadow-md">
                        <span
                          className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full shadow-[0_0_8px]"
                          style={{
                            backgroundColor: project.accent,
                            color: project.accent
                          }}
                        />
                        {project.category}
                      </span>

                      {/* Top-Right Quick Link Icons */}
                      <div className="flex items-center gap-1.5 sm:gap-2 relative z-30">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View GitHub Repository"
                            onClick={(e) => e.stopPropagation()}
                            className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black/50 border border-cyan-500/35 backdrop-blur-md flex items-center justify-center text-cyan-300 hover:text-white hover:border-[#00F0FF] hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)] transition-all duration-300 shadow-md cursor-pointer relative z-30"
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
                          className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-black/50 border border-cyan-500/35 backdrop-blur-md flex items-center justify-center text-cyan-300 hover:text-black hover:bg-[#00F0FF] hover:border-[#00F0FF] hover:shadow-[0_0_15px_#00F0FF] transition-all duration-300 shadow-md relative z-30 cursor-pointer"
                        >
                          <ArrowUpRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 transition-transform hover:translate-x-0.5 hover:-translate-y-0.5" />
                        </a>
                      </div>
                    </div>

                    {/* Layer 3: BOTTOM BAR (Floating Frosted Glass Capsule - driven by decoupled rAF) */}
                    <div
                      ref={(el) => {
                        detailsBottomRefs.current[index] = el;
                      }}
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "translate3d(0, 0, 0)"
                      }}
                      className="z-20 w-full pointer-events-auto transform-gpu"
                    >
                      <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-black/50 backdrop-blur-md border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.15)] flex flex-col gap-1.5 sm:gap-2 w-full">
                        {/* Tech tags: 3 pills visible on both mobile and desktop */}
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium bg-black/50 backdrop-blur-sm border border-cyan-500/35 text-cyan-200 shadow-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title Row + Action Button */}
                        <div className="flex items-center justify-between gap-2.5 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="relative z-30 block text-xs sm:text-lg lg:text-xl font-bold text-white tracking-tight hover:text-[#00F0FF] transition-colors truncate"
                            >
                              {project.title}
                            </a>
                          </div>

                          {/* Action Button: Live Demo */}
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="Open Live Preview"
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-30 inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-sm font-bold bg-[#00F0FF]/20 border border-cyan-400/70 text-[#00F0FF] shadow-[0_4px_16px_rgba(0,240,255,0.25)] hover:bg-[#00F0FF] hover:text-black hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.8)] backdrop-blur-sm transition-all duration-300 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="w-3 sm:w-3.5 h-3 sm:h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Projects on GitHub */}
        <div className="mt-14 sm:mt-16 flex justify-center">
          <a
            href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass-btn-secondary text-slate-200 hover:text-white font-medium text-sm"
          >
            <span>Explore All Repositories on GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-[#00F0FF] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </section>
    </div>
  );
}
