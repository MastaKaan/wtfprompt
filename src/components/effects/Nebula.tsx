"use client";

import { useRef, useEffect } from "react";
import { useMotionValue, motion } from "framer-motion";
import { useParallax } from "@/lib/hooks/useParallax";

export default function Nebula() {
  const { mouseX, mouseY } = useParallax();
  const nebulaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMotionValue(false);

  useEffect(() => {
    prefersReducedMotion.set(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, [prefersReducedMotion]);

  return (
    <motion.div
      ref={nebulaRef}
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-60 filter blur-[90px]"
      animate={
        prefersReducedMotion.get()
          ? {}
          : {
              x: mouseX.get() * 30,
              y: mouseY.get() * 30,
            }
      }
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 30%),
          radial-gradient(circle at 80% 60%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 40% 80%, rgba(56, 189, 248, 0.05) 0%, transparent 35%)
        `,
      }}
    />
  );
}
