import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bordeaux del logo: colore d'identità del brand.
        // Il 600 è il tono primario (CTA, accenti); 700-800 per le sezioni
        // "immerse" (prenotazione, footer). Testo bianco leggibile da 600 in su.
        bordeaux: {
          50: "#FAF4F5",
          100: "#F2E0E3",
          200: "#E2BCC4",
          300: "#C88E9B",
          400: "#A65C70",
          500: "#873B52",
          600: "#6E2438",
          700: "#571A2C",
          800: "#411323",
          900: "#2B0B17",
        },
        // Accento miele/agrumi, usato con parsimonia. Per il testo su fondo
        // chiaro servono i toni 600-700; i più chiari solo per dettagli grafici.
        gold: {
          300: "#E5C285",
          400: "#D9A441",
          500: "#BC8527",
          600: "#96671C",
          700: "#755013",
        },
        // Fondi chiari: off-white con una punta di tinta verso il bordeaux,
        // mai panna/beige. 50 è il fondo pagina, 100 le superfici in rilievo,
        // 200-300 i bordi.
        surface: {
          50: "#FAF7F6",
          100: "#F3EDEC",
          200: "#E7DDDC",
          300: "#D3C5C3",
        },
        // Inchiostro: quasi nero scaldato verso il vino. 950 per i testi,
        // 700 per il testo secondario (≥ 4.5:1 su surface-50), 400 solo per
        // icone mute e decorazioni, mai per testo.
        ink: {
          950: "#211318",
          700: "#5A484E",
          400: "#9C8890",
        },
      },
      fontFamily: {
        // Marcellus: lapidario di matrice classica, un solo peso (400).
        // Hanken Grotesk: sans umanista per corpo testo e interfaccia.
        serif: ["var(--font-marcellus)", "Georgia", "serif"],
        sans: ["var(--font-hanken)", "system-ui", "sans-serif"],
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
          "0%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 1.2s ease-out forwards",
        "subtle-zoom": "subtle-zoom 8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scroll-hint": "scroll-hint 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
