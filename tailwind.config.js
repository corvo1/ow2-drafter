/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
            900: '#0F172A',
            800: '#1E293B',
            700: '#334155',
        },
        orange: {
            500: '#FA8112',
        }
      }
    },
  },
  plugins: [],
}
