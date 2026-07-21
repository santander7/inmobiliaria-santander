/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0055a4',
        secondary: '#003366',
        dark: '#003366',
        darker: '#001a33',
        light: '#F8FAFC'
      }
    },
  },
  plugins: [],
}
