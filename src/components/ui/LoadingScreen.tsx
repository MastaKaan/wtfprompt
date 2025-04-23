"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen for the custom loading complete event
    const handleLoadingComplete = () => {
      setTimeout(() => setIsLoading(false), 800);
    };

    window.addEventListener("loadingComplete", handleLoadingComplete);

    // Fallback in case event doesn't fire
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      window.removeEventListener("loadingComplete", handleLoadingComplete);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[var(--midnight)] flex justify-center items-center z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="font-space-grotesk text-xl text-[var(--neon-blue)] tracking-[3px]"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            LOADING...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
