"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { MoreHorizontal, X, Zap, ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest >= 50;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }
    // Scrolling automatically closes the manually expanded state back to mini nav
    if (isExpanded) {
      setIsExpanded(false);
    }
  });

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsExpanded(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsExpanded(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Determine whether to show the full navbar or mini island
  // Full nav is shown when at page top (!isScrolled) OR when user clicked 3-dot (isExpanded)
  const isFullNav = !isScrolled || isExpanded;

  return (
    <div
      ref={navContainerRef}
      className="fixed top-5 inset-x-0 z-[100] flex items-center justify-center px-4 pointer-events-none"
    >
      <motion.nav
        layout
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 32,
          mass: 0.8
        }}
        className={`pointer-events-auto relative flex items-center justify-between rounded-full backdrop-blur-2xl border transition-colors duration-300 ${
          isScrolled
            ? "bg-[#070B14]/90 border-cyan-500/30 shadow-[0_8px_30px_rgba(0,240,255,0.2)] ring-1 ring-cyan-500/20"
            : "bg-[#070B14]/80 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] ring-1 ring-white/5"
        } ${isFullNav ? "px-4 sm:px-5 py-2 sm:py-2.5 gap-3" : "px-3.5 py-2 gap-2"}`}
      >
        {/* Left: Brand Icon + Sabbir Hasan */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#00F0FF] to-white p-[1px] shadow-[0_0_10px_rgba(0,240,255,0.4)]">
            <div className="w-full h-full rounded-full bg-[#05070A] flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="w-3.5 h-3.5 text-[#00F0FF] fill-[#00F0FF]/30" />
            </div>
          </div>
          <span className="font-bold text-sm tracking-tight text-white group-hover:text-[#00F0FF] transition-colors whitespace-nowrap">
            {portfolioData.name}
          </span>
        </a>

        {/* Morphing Nav Content: Full Nav vs Mini 3-Dot Toggle */}
        <AnimatePresence mode="popLayout" initial={false}>
          {isFullNav ? (
            /* FULL NAVBAR CONTENT (At page top, or when 3-dot is clicked on mini nav) */
            <motion.div
              key="full-nav-content"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.88, filter: "blur(4px)" }}
              transition={{ duration: 0.22 }}
              className="flex items-center gap-1 sm:gap-2"
            >
              {/* Navigation Links */}
              <div className="flex items-center gap-0.5 sm:gap-1 px-1 sm:px-2">
                {portfolioData.navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-150"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Glowing CTA Button */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-semibold text-black bg-gradient-to-r from-white to-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* If scrolled and manually expanded, show a toggle button to collapse back to mini nav */}
              {isScrolled && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  aria-label="Collapse to mini navbar"
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          ) : (
            /* COMPACT MINI NAV: Shows ONLY 3-Dot Button which expands the navbar on click */
            <motion.div
              key="mini-toggle-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center pl-0.5"
            >
              <button
                type="button"
                onClick={() => setIsExpanded(true)}
                aria-label="Expand to full navigation"
                aria-expanded={isExpanded}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <MoreHorizontal className="w-4 h-4 text-[#00F0FF]" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
