"use client";

import { useRef, useEffect } from "react";
import { useMotionValue } from "framer-motion";

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useMotionValue(false);

  useEffect(() => {
    prefersReducedMotion.set(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Star generation with different sizes for depth perception
    const stars: {
      x: number;
      y: number;
      z: number;
      r: number;
      color: string;
    }[] = [];

    const maxDepth = 300;

    const addStars = () => {
      const starCount = Math.min(window.innerWidth / 2, 800);

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * maxDepth,
          r: Math.random() * 1.5,
          color: Math.random() > 0.9 ? getRandomStarColor() : "#FFFFFF",
        });
      }
    };

    function getRandomStarColor() {
      const colors = ["#F9F9F9", "#E6F6FF", "#B5E8FF", "#FFF9C4", "#FFF0C2"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    setupCanvas();
    addStars();

    // Animation loop with optimized frame handling
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const animate = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval);

        // Clear canvas with better performance
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw stars
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];

          // Slowly rotate stars
          star.z -= 0.05;

          // Reset stars that go too far
          if (star.z <= 0) {
            star.z = maxDepth;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
          }

          // Calculate position with perspective
          const scale = maxDepth / (maxDepth + star.z);
          const x = star.x * scale;
          const y = star.y * scale;
          const r = star.r * scale;

          // Draw star with optimized approach
          if (r > 0.1) {
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.globalAlpha = scale;
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    if (!prefersReducedMotion.get()) {
      const animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }

    window.addEventListener("resize", setupCanvas);
    return () => window.removeEventListener("resize", setupCanvas);
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
