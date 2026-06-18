import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E8622A",
          "orange-light": "#FF7A3D",
          "orange-glow": "rgba(232,98,42,0.25)",
          charcoal: "#1A1A1A",
          "charcoal-light": "#242424",
          "charcoal-card": "#1E1E1E",
          gray: "#8A8A8A",
          "gray-light": "#B0B0B0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "ring-pulse": "ring-pulse 3s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite alternate",
        "star-pop": "star-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "slide-in": "slide-in 0.5s ease-out forwards",
      },
      keyframes: {
        "ring-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%": { boxShadow: "0 0 20px rgba(232,98,42,0.2)" },
          "100%": { boxShadow: "0 0 40px rgba(232,98,42,0.5)" },
        },
        "star-pop": {
          "0%": { transform: "scale(0.8)" },
          "60%": { transform: "scale(1.3)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient":
          "radial-gradient(ellipse at top, #2A1810 0%, #1A1A1A 60%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "orange-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(232,98,42,0.4) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
