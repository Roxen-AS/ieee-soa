import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#04060B",
        bg1: "#060810",
        bg2: "#090D16",
        bg3: "#0D1320",
        s1: "#111929",
        ink: "#F2F0FF",
        ink2: "#7B8599",
        ink3: "#2E3A4E",
        a1: "#C8FF00",
        a2: "#FF2D55",
        a3: "#00D4FF",
        a4: "#9B5FFF",
      },
      fontFamily: {
        oxanium: ["Oxanium", "monospace"],
        mono: ["Space Mono", "monospace"],
        body: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
