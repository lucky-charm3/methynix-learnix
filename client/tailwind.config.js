/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#0a0a0a", 
        neon: "#39FF14",
        forest: "#0f9d58", 
        lime: "#32CD32",
        grayDark: "#1f1f1f", 
      },
      fontFamily: {
  apple: [
    'Segoe UI',           
    'Roboto',             
    'Helvetica Neue',     
    'Arial', 
    'sans-serif'
  ],
},
    },
  },
  plugins: [],
}

