"use client";

import { motion } from "framer-motion";

type AboutItemProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

export default function AboutItem({ icon, children }: AboutItemProps) {
  return (
    <motion.div
      className="flex items-start gap-4"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }} // Fixed the typo here - was "a0.3"
    >
      <motion.div
        className="min-w-[30px] h-[30px] text-[var(--neon-blue)] flex items-center justify-center"
        whileHover={{ scale: 1.2, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>
      <div>{children}</div>
    </motion.div>
  );
}
