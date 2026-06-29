import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette ispirata alla natura siciliana
        terracotta: {
          50: "#fbf3ee",
          100: "#f4ddcf",
          200: "#e7b89e",
          300: "#d9926d",
          400: "#cf774f",
          500: "#c2623c", // terra calda principale
          600: "#a64f30",
          700: "#833d27",
          800: "#5f2d1d",
          900: "#3d1d13",
        },
        olive: {
          50: "#f6f7f0",
          100: "#e7ead5",
          200: "#cfd5ac",
          300: "#b2bb7e",
          400: "#97a259",
          500: "#7a8645", // verde ulivo principale
          600: "#5f6a36",
          700: "#49512c",
          800: "#373d24",
          900: "#262a1a",
        },
        sand: {
          50: "#fdfbf7",
          100: "#f7f1e7",
          200: "#efe3cf",
          300: "#e2cdab",
        },
        cream: "#fdfcf9", // bianco puro/caldo per gli spazi
      },
      fontFamily: {
        // Serif elegante per i titoli, sans pulito per il corpo
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "subtle-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 1.2s ease-out forwards",
        "subtle-zoom": "subtle-zoom 20s ease-out forwards",
        "scroll-hint": "scroll-hint 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
