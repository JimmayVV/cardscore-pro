import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sriracha: ["sriracha", "sans-serif"],
        jost: ["Jost Variable", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
