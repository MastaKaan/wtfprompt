"use client";

import { motion } from "framer-motion";

type CosmicHaloProps = {
  style?: React.CSSProperties;
};

export default function CosmicHalo({ style }: CosmicHaloProps) {
  return (
    <motion.div
      className="absolute w-[220px] h-[220px] rounded-full opacity-70 z-[-1] animate-rotateHalo"
      style={{
        background: `conic-gradient(
          transparent 0deg,
          var(--neon-blue) 120deg,
          var(--neon-purple) 240deg,
          transparent 360deg
        )`,
        filter: "blur(20px)",
        ...style,
      }}
    />
  );
}
