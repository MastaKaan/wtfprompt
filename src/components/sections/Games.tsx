"use client";

import { motion } from "framer-motion";
import GameCard from "@/components/ui/GameCard";

export default function Games() {
  const games = [
    {
      title: "Valorant",
      description: "i have a love hate relationship with this game",
      image: "/assets/valorant.png",
    },
    {
      title: "Discord",
      description:
        "Is it really a game? No, but it's where I spend lots of my time anyway.",
      image: "/assets/discord.png",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
    >
      <h2>what i play</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[clamp(1.5rem,3vw,2.5rem)]">
        {games.map((game, index) => (
          <GameCard
            key={index}
            title={game.title}
            description={game.description}
            image={game.image}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.section>
  );
}
