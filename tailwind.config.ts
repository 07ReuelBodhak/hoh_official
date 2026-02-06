import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ffe5e5",
          100: "#ffb2b2",
          200: "#ff8080",
          300: "#ff4d4d",
          400: "#ff1a1a",
          500: "#b20000",
          600: "#900000",
          700: "#700000",
          800: "#500000",
          900: "#300000",
        },
      },
    },
  },
  plugins: [],
};

export default config;
