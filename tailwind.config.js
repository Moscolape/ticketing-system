/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mo': "320px",
      },
      colors: {
        primary :{
          DEFAULT: '#5DB379',
          bg: '#F7FAF8',
          dark: '#274B33',
          middle: '#55A36E'
        },
        main: {
          1: '#8F9695',
          2: '#B2B7B6',
          3: '#3E4645'
        }
      },
      fontSize: {
        h1: '4.500rem', // 72px
        h2: '3.750rem', // 60px
        h3: '3.500rem', // 56px
        h4: '3.125rem', // 50px
        h5: '2.500rem', // 40px
        h6: '2.000rem', // 32px
        h7: '1.750rem', // 28px
        h8: '1.500rem', // 24px
        h9: '1.250rem', // 20px
        h10: '1.125rem', // 18px
        h11: '1.000rem', // 16px
        h12: '0.875rem', // 14px
        h13: '0.750rem', // 12px
        h14: '0.625rem', // 10px
      },
    },
  },
  plugins: [],
}