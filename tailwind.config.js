/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightblue: 'rgb(14, 146, 202)',
        darkblue: 'rgb(0, 105, 141)',
      },
    },
  },
  plugins: [],
}

