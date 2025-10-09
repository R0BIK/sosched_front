/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        accentColor: "var(--accent-color)",
        mainWhite: "var(--main-white-color)",
        mainBlack: "var(--main-black-color)",
        secondText: "var(--second-text-color)",
        greenTrue: "var(--green-true-color)",
        redFalse: "var(--red-false-color)",
      },
      boxShadow: {
        custom: "0 2px 10px var(--black-shadow)",
      },
      fontFamily: {
        sans: ['"SF Compact Display"', "sans-serif"],
      }
    },
  },
  plugins: [],
}