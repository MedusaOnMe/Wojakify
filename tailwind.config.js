/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'wojak-blue': '#4a90a4',
        'wojak-skin': '#f5d6ba',
        'wojak-bg': '#fafafa',
      },
      fontFamily: {
        'comic': ['Comic Sans MS', 'cursive', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
