module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      circular: ["Circular", "sans-serif"],
    },
    extend: {
      colors: {
        cardBackground: "#2C3E50",
        btnClr: " rgba(255, 255, 255, 0.2)",
        textPrimary: "#2C3E50        ",
        brandGreen: "#4CAF50",
      },
    },
  },
  plugins: [],
};
