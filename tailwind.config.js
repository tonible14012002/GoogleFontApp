/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      }
    },
    screens: {
      'tablet': '640px',
      // => @media (min-width: 1024px) { ... }

      'laptop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
}

