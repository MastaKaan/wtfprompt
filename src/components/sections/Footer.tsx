"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      className="text-center mt-[clamp(2.5rem,5vw,4rem)] pb-[clamp(1.5rem,3vw,2.5rem)] relative text-[var(--neon-blue)] text-[clamp(0.9rem,2vw,1.1rem)] font-space-grotesk tracking-wide flex flex-col gap-2 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <div>
        © 2025 |{" "}
        <span className="relative after:content-['|'] after:absolute after:right-[-12px] after:top-0 after:text-[var(--neon-blue)] after:animate-cursorBlink">
          prompt™
        </span>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-4 text-[clamp(0.7rem,1.5vw,0.9rem)]">
        <Link
          href="https://nohello.net/en/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--rich-gold)]"
        >
          no hello
        </Link>
        <Link
          href="https://dontasktoask.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--rich-gold)]"
        >
          dont ask to ask
        </Link>
      </div>
    </motion.footer>
  );
}
