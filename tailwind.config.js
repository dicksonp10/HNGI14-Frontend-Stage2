module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: {
          400: "#9277FF",
          600: "#7C5DFA",
        },
        red: {
          500: "#EC5757",
          400: "#FF9797",
        },
        dark: {
          100: "#141625",
          200: "#1E2139",
          300: "#252945",
        },
      },
      fontFamily: {
        spartan: ['"League Spartan"', "sans-serif"],
      },
      screens: {
        mobile: "320px",
        tablet: "768px",
        desktop: "1024px",
      },
    },
  },
  plugins: [],
};
