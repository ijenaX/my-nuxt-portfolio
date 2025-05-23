/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#041010',
        secondary: '#454B4E',
        accent: '#DE2B37',
        highlight: '#BCC8DE',
      },
      fontFamily: {
        Montserrat: 'Montserrat, sans-serif',
        AvaFont: 'AvaFont',
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
};
