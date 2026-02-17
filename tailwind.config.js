const plugin = require("tailwindcss/plugin");

const ironPalette = {
  matte: "#0A0A0B",
  slate: "#111113",
  steel: "#1B1F24",
  frame: "#1E3A4A",
  card: "#111111",
  accent: "#B01015",
  accentBright: "#D14232",
  neonBlue: "#2EC4F1",
  neonRed: "#FF2E45",
  bone: "#F1F1F1",
  mist: "#C8C8C8",
  smoke: "#9CA3AF",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iron: ironPalette,
      },
      fontFamily: {
        body: "var(--font-body)",
        heading: "var(--font-heading)",
      },
      boxShadow: {
        "panel-soft": "0 25px 80px rgba(0, 0, 0, 0.55)",
        "neon-blue": "0 0 12px rgba(46,196,241,0.65), 0 0 30px rgba(46,196,241,0.45)",
        "neon-red": "0 0 12px rgba(176,16,21,0.7), 0 0 30px rgba(176,16,21,0.5)",
      },
      backgroundImage: {
        "steel-brushed":
          "linear-gradient(120deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 35%), radial-gradient(circle at 20% 20%, rgba(46,196,241,0.08), transparent 55%)",
        "ember-radial": "radial-gradient(circle at 50% 0%, rgba(176,16,21,0.25), transparent 70%)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
        30: "7.5rem",
      },
      letterSpacing: {
        mega: "0.6em",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      const glowUtilities = {
        ".glow-neon-blue": {
          boxShadow: theme("boxShadow.neon-blue"),
          borderColor: theme("colors.iron.neonBlue"),
        },
        ".glow-neon-red": {
          boxShadow: theme("boxShadow.neon-red"),
          borderColor: theme("colors.iron.accent"),
        },
      };
      addUtilities(glowUtilities, ["responsive", "hover"]);
    }),
  ],
};
