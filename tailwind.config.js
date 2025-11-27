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
          bg: '#05060A',
          surface: '#0B0F16',
          card: '#111827',
          text: '#F2F4F7',
          muted: '#9CA3AF',
          red: '#B11226',
          redHover: '#D21F3C',
          redDark: '#5F0B16',
        },
      },
      fontFamily: {
        body: 'var(--font-body)',
        heading: 'var(--font-heading)',
      },
    },
  },
  plugins: [],
};
