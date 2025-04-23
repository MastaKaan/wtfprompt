"use client";
import { useRef, useEffect } from "react";

export default function StarsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let ctx = canvas.getContext("2d");
    if (!ctx) return;

    const maxDepth = 300;
    let stars: {
      x: number;
      y: number;
      z: number;
      r: number;
      color: string;
    }[] = [];

    function getRandomStarColor() {
      const colors = ["#F9F9F9", "#E6F6FF", "#B5E8FF", "#FFF9C4", "#FFF0C2"];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function setupCanvasAndStars() {
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Regenerate stars
      const starCount = Math.min(window.innerWidth / 2, 800);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          z: Math.random() * maxDepth,
          r: Math.random() * 1.5,
          color: Math.random() > 0.9 ? getRandomStarColor() : "#FFFFFF",
        });
      }
    }

    setupCanvasAndStars();
    window.addEventListener("resize", setupCanvasAndStars);

    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;
    let animationId: number;

    function animate(timestamp: number) {
      if (!ctx) return;
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;

      if (deltaTime > interval) {
        lastTime = timestamp - (deltaTime % interval);

        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          star.z -= 0.05;
          if (star.z <= 0) {
            star.z = maxDepth;
            star.x = Math.random() * window.innerWidth;
            star.y = Math.random() * window.innerHeight;
          }
          const scale = maxDepth / (maxDepth + star.z);
          const x = star.x * scale;
          const y = star.y * scale;
          const r = star.r * scale;

          if (r > 0.1) {
            ctx.beginPath();
            ctx.fillStyle = star.color;
            ctx.globalAlpha = scale;
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setupCanvasAndStars);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="stars-canvas"
      aria-hidden="true"
      style={{ display: "block" }}
    />
  );
}
