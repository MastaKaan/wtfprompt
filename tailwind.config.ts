import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        outfit: ["var(--font-outfit)"],
        "space-grotesk": ["var(--font-space-grotesk)"],
      },
      animation: {
        gradientMove: "gradientMove 6s ease infinite",
        nebulaMove: "nebulaMove 25s ease-in-out infinite alternate",
        rotateHalo: "rotateHalo 12s linear infinite",
        fadeIn: "fadeIn 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards",
        cursorBlink: "cursorBlink 1s infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
