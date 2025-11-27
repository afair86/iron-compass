/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ic: {
          bg: '#0B0D10', // slightly lighter, deep black
          surface: '#181A1D',
          card: '#181A1D', // card matches mockup, less blue
          text: '#F3EBDD', // cream for headings
          muted: '#C7C7C7', // lighter muted for body
          red: '#C62828', // flat, bright red
          redHover: '#E53935',
          redDark: '#8B1A1A',
        },
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)',
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
    },
  },
  plugins: [],
};
