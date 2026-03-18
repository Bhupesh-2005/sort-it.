/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F7C600',
          hover: '#E5B700',
        },
        secondary: {
          DEFAULT: '#1E7F4F',
          hover: '#186A41',
        },
        background: '#FFFFFF',
        surface: {
          DEFAULT: '#FFFFFF',
          hover: '#F0EAD6'
        },
        text: {
          DEFAULT: '#1F1F1F',
          muted: '#666666'
        }
      }
    },
  },
  plugins: [],
}
