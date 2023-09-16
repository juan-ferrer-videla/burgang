//const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      inter: ["var(--font-inter)", "sans-serif"],
      shadows: ["var(--font-shadows)", "sans"],
    },
    extend: {
      container: {
        center: true,
        padding: { DEFAULT: "1rem", sm: "2rem", md: "3rem" },
      },
      dropShadow: {
        custom: "2px 10px 10px #ffbf00",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit, minmax(20rem, 1fr))",
      },
      borderWidth: {
        10: "12px",
      },
      screens: {
        "3xl": "1720px",
      },
      keyframes: {
        increase: {
          "0%": { transform: "scale(0.5)" },
          "80%": { transform: "scale(1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      colors: {
        primary: "#ff9200",
        weak: "#888888",
      },
      animation: { increase: "increase 1.4s ease-in-out forwards" },
    },
  },
  plugins: [],
};
