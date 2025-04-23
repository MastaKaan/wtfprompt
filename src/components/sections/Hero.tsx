"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CosmicHalo from "@/components/effects/CosmicHalo";
import { useParallax } from "@/lib/hooks/useParallax";

export default function Hero() {
  const { mouseX, mouseY } = useParallax();

  return (
    <motion.div
      className="flex flex-col items-center mb-14 relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative">
        <CosmicHalo
          style={{
            transform: `translate(${mouseX.get() * -20}px, ${
              mouseY.get() * -20
            }px) rotate(${mouseX.get() * 10}deg)`,
          }}
        />

        <motion.div
          className="w-[clamp(120px,15vw,180px)] h-[clamp(120px,15vw,180px)] rounded-full 
                     relative bg-[var(--deep-space)] flex items-center justify-center overflow-hidden"
         
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-br from-[var(--neon-blue)] to-[var(--rich-gold)]" />
          <div className="absolute inset-[3px] bg-[var(--deep-space)] rounded-full overflow-hidden">
            <Image
              src="/assets/pfp.png"
              alt="Profile Picture"
              width={180}
              height={180}
              priority
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </motion.div>
      </div>

      <motion.h1
        className="text-center mt-6 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        hey, i&apos;m <span className="text-gradient">prompt</span>
      </motion.h1>

      <motion.p
        className="text-center text-[var(--neon-blue)] text-[clamp(1rem,3vw,1.3rem)] mb-2 tracking-wide opacity-80 font-light font-space-grotesk"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        student, 16 years old. born in 🇬🇧, from 🇹🇷
      </motion.p>

      <motion.p
        className="text-center text-[var(--neon-blue)] italic text-[clamp(0.8rem,2vw,1rem)] mb-8 opacity-80"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        &quot;i&apos;m such an avid feminist&quot; — me, constantly having to
        clarify... (P.S if you click on the pfp 5 times you get a surprise 👀)
      </motion.p>

      <motion.div
        className="flex gap-5 opacity-90 font-space-grotesk font-light text-[clamp(0.75rem,2vw,0.9rem)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="flex items-center gap-1">
          <span className="text-[var(--rich-gold)]">↑</span>
          <span>6&apos;5</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[var(--rich-gold)]">✦</span>
          <span>humble</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[var(--rich-gold)]">⚡</span>
          <span>hates period cramps</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
