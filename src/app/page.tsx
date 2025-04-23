"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Games from "@/components/sections/Games";
import Socials from "@/components/sections/Socials";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);

      // Send loading complete event to LoadingScreen component via custom event
      const event = new CustomEvent("loadingComplete");
      window.dispatchEvent(event);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  return (
    <main>
      {isLoaded && (
        <motion.div
          className="max-w-[1100px] mx-auto px-[clamp(1rem,5vw,2rem)] py-[clamp(2rem,5vw,3.5rem)] relative z-10"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <Hero />
          <About />
          <Games />
          <Socials />
          <Footer />
        </motion.div>
      )}
    </main>
  );
}
