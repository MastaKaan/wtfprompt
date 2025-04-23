"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type SocialButtonProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
  delay?: number;
};

export default function SocialButton({
  icon,
  label,
  href,
  color,
  delay = 0,
}: SocialButtonProps) {
  // Colors for the gradients
  const gradients = {
    tiktok: "linear-gradient(45deg, #ff0050, #00f2ea)",
    discord: "linear-gradient(45deg, #5865F2, #9b62f8)",
    roblox: "linear-gradient(45deg, #e2231a, #ff7800)",
    riot: "linear-gradient(45deg, #fa4454, #f43b69)",
    steam: "linear-gradient(45deg, #1b2838, #66c0f4)",
  };

  // Get gradient based on color prop, default to a general gradient
  const gradient =
    gradients[color as keyof typeof gradients] ||
    "linear-gradient(45deg, var(--neon-blue), var(--neon-purple))";

  const ButtonContent = () => (
    <>
      <motion.span
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.span>
      {label}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4 }}
    >
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <button
            className="social-btn group relative"
            style={
              {
                "--hover-gradient": gradient,
              } as React.CSSProperties
            }
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: gradient }}
            />
            <span className="relative z-10 flex items-center justify-center gap-3">
              <ButtonContent />
            </span>
          </button>
        </Link>
      ) : (
        <button
          className="social-btn group relative"
          style={
            {
              "--hover-gradient": gradient,
            } as React.CSSProperties
          }
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: gradient }}
          />
          <span className="relative z-10 flex items-center justify-center gap-3">
            <ButtonContent />
          </span>
        </button>
      )}
    </motion.div>
  );
}
