/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'steens-dark': '#0b0d1e',
        'steens-purple': '#471a49',
        'steens-magenta': '#872566',
        'steens-pink': '#d758ac',
      }
    },
  },
  plugins: [],
}