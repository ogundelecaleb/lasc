/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      dark: "#1a202c",
      faint: "#d8e3f8",
      grey: "#a0aec0",
      "dark-blue": "#124072",
      "grey-600": "#718096",
      "secondary-dark-bg": "#33373E",
      "light-gray": "#F7F7F7",
      "half-transparent": "rgba(0, 0, 0, 0.5)",
    },
    extend: {
    backgroundImage:{
      'atm-blub' : "url('/public/Vector.png')"
    }},
  },
  plugins: [require("autoprefixer"), require("tailwind-scrollbar"), require('@tailwindcss/forms'),],
};
