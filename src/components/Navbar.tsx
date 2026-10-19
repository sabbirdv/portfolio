"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MoreHorizontal, X, Zap, ArrowUpRight, Menu, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest >= 50;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
    // Close menus on scroll
    if (isDesktopExpanded) {
      setIsDesktopExpanded(false);
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  });

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setIsDesktopExpanded(false);
        setIsMobileMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsDesktopExpanded(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isDesktopExpanded, isMobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsDesktopExpanded(false);
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // On desktop: show full links if at page top OR if manually expanded via 3-dot
  const isFullDesktopNav = !isScrolled || isDesktopExpanded;

  return (
    <header
      ref={navContainerRef}
      className="fixed top-3 sm:top-5 inset-x-0 z-[100] flex flex-col items-center px-3 sm:px-4 pointer-events-none"
    >
      {/* Main Floating Pill Navbar */}
      <motion.nav
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 34,
          mass: 0.6
        }}
        className={`pointer-events-auto relative flex items-center justify-between rounded-full backdrop-blur-md border transition-all duration-300 max-w-[calc(100vw-1.5rem)] ${
          isScrolled
            ? "bg-[#070B14]/85 border-cyan-500/40 shadow-[0_8px_32px_rgba(0,240,255,0.22),_inset_0_1px_1px_rgba(255,255,255,0.2)]"
            : "bg-[#070B14]/75 border-white/18 shadow-[0_8px_32px_rgba(0,0,0,0.4),_inset_0_1px_1px_rgba(255,255,255,0.15)]"
        } px-3 sm:px-4 py-2 gap-2 sm:gap-3`}
      >
        {/* Left: Brand Icon + Sabbir Hasan */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2 group shrink-0"
        >
          <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-tr from-[#00F0FF] to-white p-[1px] shadow-[0_0_10px_rgba(0,240,255,0.4)]">
            <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#00F0FF] fill-[#00F0FF]/30" />
            </div>
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-tight text-white group-hover:text-[#00F0FF] transition-colors whitespace-nowrap">
            <span className="inline sm:hidden">Sabbir</span>
            <span className="hidden sm:inline">{portfolioData.name}</span>
          </span>
        </a>

        {/* ======================================================== */}
        {/* DESKTOP NAV (Visible on md screens and up)                 */}
        {/* ======================================================== */}
        <div className="hidden md:flex items-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {isFullDesktopNav ? (
              <motion.div
                key="desktop-full-content"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2"
              >
                {/* Horizontal Navigation Links */}
                <div className="flex items-center gap-1 px-1">
                  {portfolioData.navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-150"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>

                {/* Glowing Glass CTA Button */}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="glass-btn-primary relative inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold text-black shrink-0"
                >
                  <span>Hire Me</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {/* Close Button when scrolled and expanded */}
                {isScrolled && (
                  <button
                    type="button"
                    onClick={() => setIsDesktopExpanded(false)}
                    aria-label="Collapse to mini navbar"
                    className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="desktop-mini-toggle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="flex items-center pl-1"
              >
                <button
                  type="button"
                  onClick={() => setIsDesktopExpanded(true)}
                  aria-label="Expand to full navigation"
                  className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4 text-[#00F0FF]" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* MOBILE NAV ACTIONS (Always perfectly fits on mobile)     */}
        {/* ======================================================== */}
        <div className="flex md:hidden items-center gap-1.5">
          {/* Quick Hire CTA for Mobile */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="glass-btn-primary inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-black active:scale-95 transition-transform"
          >
            <span>Hire</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>

          {/* Mobile Hamburger / Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="p-1.5 rounded-full text-slate-200 hover:text-white glass-pill hover:border-cyan-400 active:scale-95 cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 text-[#00F0FF]" />
            ) : (
              <Menu className="w-4 h-4 text-[#00F0FF]" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* ======================================================== */}
      {/* MOBILE FLOATING GLASS DROPDOWN MENU                     */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-auto mt-2 w-[calc(100vw-1.5rem)] max-w-xs rounded-2xl bg-[#070B14]/90 border border-white/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7),_inset_0_1px_1px_rgba(255,255,255,0.15)] p-3.5 flex flex-col gap-1.5 z-50 md:hidden"
          >
            {/* Nav links */}
            {portfolioData.navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-[#00F0FF] hover:bg-white/5 active:bg-cyan-500/10 transition-colors"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            ))}

            <div className="h-px w-full bg-white/10 my-1" />

            {/* Quick Contact & Socials in Mobile Menu */}
            <div className="flex items-center justify-between px-2 pt-1 pb-1">
              <span className="text-[11px] font-mono text-slate-400">Connect:</span>
              <div className="flex items-center gap-2">
                <a
                  href={portfolioData.socials.find((s) => s.name === "GitHub")?.url || "https://github.com/sabbirdv"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full glass-pill text-slate-300 hover:text-white hover:border-cyan-400"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={portfolioData.socials.find((s) => s.name === "LinkedIn")?.url || "https://linkedin.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full glass-pill text-slate-300 hover:text-white hover:border-cyan-400"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioData.email}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-full glass-pill text-[#00F0FF] hover:text-white hover:border-cyan-400"
                  aria-label="Gmail"
                >
                  <Mail className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
