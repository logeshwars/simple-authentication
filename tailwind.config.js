/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Roboto'", "sans-serif"],
      },
      colors: {
        primary: "#265ADD",
        secondary: "#0F1EFB",
        danger: "#e3342f",
      },
    },
  },
  plugins: [],
};
