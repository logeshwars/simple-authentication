
/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  darkMode:'class',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Roboto'", "sans-serif"],
      },
      colors: {
        primary: "#265ADD",
        secondary: "#0F1EFB",
        darkPrimary:"#15212E",
        darkSecondary:"#213143"
      },
    },
  },
  plugins: [],
};
