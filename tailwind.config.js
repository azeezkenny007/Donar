/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: "#192F2C",
          secondary: "#2F5C56",
          neutral: "#FEFEFE",
          accent: "#7AF1DC",
          accent2: "#3E94E3",
        },
        light: {
          primary: "#FFFFFF",
          secondary: "#7AF1DC",
          neutral: "#FEFEFE",
          accent: "#7AF1DC",
          accent2: "#3E94E3",
        },
      },
      fontFamily: {
        head: ' "Play", sans-serif',
        body: "'Mandali', sans-serif;",
      },
      fontSize: {
        text: "20px",
      },
    },
  },
  plugins: [],
};
