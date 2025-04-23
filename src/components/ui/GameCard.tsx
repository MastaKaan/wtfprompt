"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type GameCardProps = {
  title: string;
  description: string;
  image: string;
  delay?: number;
};

export default function GameCard({
  title,
  description,
  image,
  delay = 0,
}: GameCardProps) {
  return (
    <motion.div
      className="bg-[rgba(13,25,48,0.6)] rounded-[calc(var(--card-radius)-0.2rem)] overflow-hidden shadow-lg border border-sky-300/20 transition-all duration-300 relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0 15px 40px rgba(56, 189, 248, 0.2)",
        borderColor: "rgba(56, 189, 248, 0.6)",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-70% to-sky-400/10 z-1 opacity-0 transition-opacity duration-400 hover:opacity-100" />

      <div className="w-full h-[180px] relative overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      <div className="p-[clamp(1rem,3vw,1.5rem)]">
        <h3 className="text-[var(--neon-blue)] text-[clamp(1.1rem,2vw,1.5rem)] mb-2 font-semibold">
          {title}
        </h3>
        <p className="text-[var(--text)] text-[clamp(0.9rem,1.8vw,1rem)] leading-relaxed opacity-80">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
