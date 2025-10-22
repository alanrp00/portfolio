import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: "#f7f7f7",
          100: "#ececec",
          200: "#dadada",
          900: "#1b1b1b",
          950: "#101010",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
};
export default config;
