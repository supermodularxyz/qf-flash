const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    height: (theme) => ({
      auto: "auto",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
    minHeight: (theme) => ({
      0: "0",
      ...theme("spacing"),
      full: "100%",
      screen: "calc(var(--vh) * 100)",
    }),
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        flying: "shaking .4s infinite",
      },
      keyframes: {
        flyIn: {
          "0%": { transform: `translateX(-100%)` },
          "5%": { transform: `translateX(0)` },
          "95%": { transform: `translateX(10%)` },
          "100%": { transform: `translateX(100%)` },
        },
        shaking: {
          "0%": { transform: `translateY(0)` },
          "25%": { transform: `translateY(2px)` },
          "50%": { transform: `translateY(-2px)` },
          "75%": { transform: `translateY(2px)` },
          "100%": { transform: `translateY(0)` },
        },
      },
    },
  },
  plugins: [],
};
