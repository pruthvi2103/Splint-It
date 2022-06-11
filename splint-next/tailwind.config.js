/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      width: {
        100: '32rem',
      },
      height: {
        '22x': '22%',
      },
      colors: {
        primary: '#08D2DD',
      },
      fontSize: {
        xxs: '.65rem',
      },
    },
  },
  plugins: [],
};
