/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981',
        secondary: '#34D399',
        dark: '#0F172A',
        darker: '#1E293B',
        light: '#F8FAFC'
      }
    },
  },
  plugins: [],
}
