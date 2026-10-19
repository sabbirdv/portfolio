"use client";

import React, { useEffect, useRef, useState } from "react";

interface FluidParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  maxLife: number;
  life: number;
  colorType: "cyan" | "purple" | "blue";
}

interface TrailNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function FluidCursorBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default to center viewport before interaction)
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      vx: 0,
      vy: 0,
      active: false,
      lastMoveTime: Date.now()
    };

    // Scroll state tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollTime = Date.now();

    // Fluid trailing chain (24 nodes following with viscous damping)
    const TRAIL_LENGTH = 24;
    const trailNodes: TrailNode[] = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: mouse.x,
      y: mouse.y,
      vx: 0,
      vy: 0
    }));

    // Active fluid particles / droplets
    const particles: FluidParticle[] = [];
    const MAX_PARTICLES = 65;

    // Handle high DPI display
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Spawn a glowing fluid particle
    const spawnParticle = (
      x: number,
      y: number,
      customVx?: number,
      customVy?: number,
      scale = 1
    ) => {
      if (particles.length >= MAX_PARTICLES) return;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 1.8 + 0.4;
      const vx = customVx !== undefined ? customVx : Math.cos(angle) * speed;
      const vy = customVy !== undefined ? customVy : Math.sin(angle) * speed;

      const colors: ("cyan" | "purple" | "blue")[] = [
        "cyan",
        "cyan",
        "purple",
        "blue"
      ];
      const colorType = colors[Math.floor(Math.random() * colors.length)];
      const baseRadius = (Math.random() * 14 + 10) * scale;
      const maxLife = Math.random() * 45 + 35;

      particles.push({
        x: x + (Math.random() - 0.5) * 16,
        y: y + (Math.random() - 0.5) * 16,
        vx,
        vy,
        radius: baseRadius,
        baseRadius,
        alpha: Math.random() * 0.4 + 0.35,
        maxLife,
        life: maxLife,
        colorType
      });
    };

    // Pointer move listener
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - mouse.targetX;
      const dy = clientY - mouse.targetY;
      mouse.vx = dx * 0.3;
      mouse.vy = dy * 0.3;

      mouse.targetX = clientX;
      mouse.targetY = clientY;
      mouse.active = true;
      mouse.lastMoveTime = Date.now();

      // Spawn fluid particles based on pointer speed
      const speed = Math.hypot(mouse.vx, mouse.vy);
      if (speed > 3) {
        const count = Math.min(Math.floor(speed / 4), 3);
        for (let i = 0; i < count; i++) {
          spawnParticle(clientX, clientY, -mouse.vx * 0.15 + (Math.random() - 0.5) * 1.5, -mouse.vy * 0.15 + (Math.random() - 0.5) * 1.5);
        }
      }
    };

    // Scroll listener: reacts dynamically when user scrolls the page
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      const now = Date.now();
      const dt = Math.max(now - lastScrollTime, 16);

      scrollVelocity = deltaY / dt;
      lastScrollY = currentScrollY;
      lastScrollTime = now;

      // When scrolling, generate fluid wake particles streaming at the cursor position
      if (Math.abs(deltaY) > 2) {
        mouse.active = true;
        const wakeCount = Math.min(Math.floor(Math.abs(deltaY) / 10) + 1, 4);
        for (let i = 0; i < wakeCount; i++) {
          // Particles stream opposite to scroll direction
          const streamVy = -Math.sign(deltaY) * (Math.random() * 3 + 1.5);
          const spreadVx = (Math.random() - 0.5) * 3;
          spawnParticle(mouse.x, mouse.y, spreadVx, streamVy, 1.3);
        }
      }
    };

    // Wheel listener for direct mouse-wheel fluid reaction
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 10) {
        mouse.active = true;
        const count = Math.min(Math.floor(Math.abs(e.deltaY) / 40) + 1, 3);
        for (let i = 0; i < count; i++) {
          spawnParticle(
            mouse.x,
            mouse.y,
            (Math.random() - 0.5) * 4,
            -Math.sign(e.deltaY) * (Math.random() * 2.5 + 1),
            1.2
          );
        }
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    // Main 60/120fps Animation Loop
    const render = () => {
      // Clear canvas with transparency
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse spring relaxation
      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;

      // Decay scroll velocity gradually
      scrollVelocity *= 0.92;

      // Update viscous fluid trailing chain
      trailNodes[0].x += (mouse.x - trailNodes[0].x) * 0.35;
      trailNodes[0].y += (mouse.y - trailNodes[0].y) * 0.35;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = trailNodes[i - 1];
        const curr = trailNodes[i];
        // Spring factor diminishes along the chain for fluid viscosity
        const factor = 0.28 - (i / TRAIL_LENGTH) * 0.12;
        curr.x += (prev.x - curr.x) * factor;
        curr.y += (prev.y - curr.y) * factor;
      }

      // Fluid visibility fade
      const idleTime = Date.now() - mouse.lastMoveTime;
      const isDormant = idleTime > 4000 && !mouse.active;
      const masterAlpha = isDormant ? Math.max(0.2, 1 - (idleTime - 4000) / 3000) : 0.85;

      // 1. Render Large Ambient Atmospheric Fluid Pool (Underlying soft glow)
      const scrollExpansion = Math.min(Math.abs(scrollVelocity) * 20, 60);
      const ambientRadius = 380 + scrollExpansion;
      const ambientGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        ambientRadius
      );
      ambientGrad.addColorStop(0, `rgba(0, 240, 255, ${0.12 * masterAlpha})`);
      ambientGrad.addColorStop(0.35, `rgba(168, 85, 247, ${0.08 * masterAlpha})`);
      ambientGrad.addColorStop(0.7, `rgba(11, 17, 30, ${0.04 * masterAlpha})`);
      ambientGrad.addColorStop(1, "rgba(5, 7, 10, 0)");

      ctx.fillStyle = ambientGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, ambientRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Render Cyber Matrix Spotlight (illuminating grid lines around mouse)
      const gridSpotlightRadius = 240;
      const gridGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        gridSpotlightRadius
      );
      gridGrad.addColorStop(0, `rgba(0, 240, 255, ${0.18 * masterAlpha})`);
      gridGrad.addColorStop(0.5, `rgba(0, 240, 255, ${0.06 * masterAlpha})`);
      gridGrad.addColorStop(1, "rgba(0, 240, 255, 0)");

      ctx.save();
      ctx.fillStyle = gridGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, gridSpotlightRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // 3. Render Viscous Fluid Liquid Streamer (Molten fluid ribbon)
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < TRAIL_LENGTH; i++) {
        const node = trailNodes[i];
        const progress = 1 - i / TRAIL_LENGTH; // 1 at cursor, 0 at tail
        const nodeRadius = (progress * 55 + 8) * (1 + Math.abs(scrollVelocity) * 0.05);
        const nodeAlpha = progress * 0.22 * masterAlpha;

        const nodeGrad = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          nodeRadius
        );

        if (i % 2 === 0) {
          // Neon Cyan node
          nodeGrad.addColorStop(0, `rgba(0, 240, 255, ${nodeAlpha * 1.5})`);
          nodeGrad.addColorStop(0.45, `rgba(0, 240, 255, ${nodeAlpha * 0.6})`);
          nodeGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
        } else {
          // Neon Purple node
          nodeGrad.addColorStop(0, `rgba(168, 85, 247, ${nodeAlpha * 1.4})`);
          nodeGrad.addColorStop(0.5, `rgba(168, 85, 247, ${nodeAlpha * 0.5})`);
          nodeGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
        }

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 4. Render Active Fluid Splash Particles / Embers
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 1;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Particle physics
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;

        const lifeRatio = p.life / p.maxLife;
        const currentRadius = p.baseRadius * (0.4 + 0.6 * lifeRatio);
        const currentAlpha = p.alpha * lifeRatio * masterAlpha;

        const pGrad = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentRadius
        );

        if (p.colorType === "cyan") {
          pGrad.addColorStop(0, `rgba(0, 240, 255, ${currentAlpha})`);
          pGrad.addColorStop(0.6, `rgba(0, 240, 255, ${currentAlpha * 0.3})`);
          pGrad.addColorStop(1, "rgba(0, 240, 255, 0)");
        } else if (p.colorType === "purple") {
          pGrad.addColorStop(0, `rgba(168, 85, 247, ${currentAlpha})`);
          pGrad.addColorStop(0.6, `rgba(168, 85, 247, ${currentAlpha * 0.3})`);
          pGrad.addColorStop(1, "rgba(168, 85, 247, 0)");
        } else {
          pGrad.addColorStop(0, `rgba(59, 130, 246, ${currentAlpha})`);
          pGrad.addColorStop(0.6, `rgba(59, 130, 246, ${currentAlpha * 0.25})`);
          pGrad.addColorStop(1, "rgba(59, 130, 246, 0)");
        }

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Intense Focal Glow Spot right beneath the pointer
      const focalRadius = 18;
      const focalGrad = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        focalRadius
      );
      focalGrad.addColorStop(0, `rgba(255, 255, 255, ${0.8 * masterAlpha})`);
      focalGrad.addColorStop(0.3, `rgba(0, 240, 255, ${0.5 * masterAlpha})`);
      focalGrad.addColorStop(1, "rgba(0, 240, 255, 0)");

      ctx.fillStyle = focalGrad;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, focalRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
