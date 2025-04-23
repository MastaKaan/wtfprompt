import { useState, useEffect } from "react";
import { useMotionValue } from "framer-motion";

export const useParallax = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    // Only set up mouse tracking if motion is not reduced
    if (!prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse position to range [-0.5, 0.5]
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        mouseX.set(x);
        mouseY.set(y);
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        mediaQuery.removeEventListener("change", handleMediaChange);
      };
    }

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [mouseX, mouseY, prefersReducedMotion]);

  return { mouseX, mouseY, prefersReducedMotion };
};
