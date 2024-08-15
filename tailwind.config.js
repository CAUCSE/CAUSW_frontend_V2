const { addDynamicIconSelectors } = require("@iconify/tailwind");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        default: "#99dfec",
        focus: "#6BBEEC",
        error: "#b4391a",
      },
    },

    
  },
  plugins: [addDynamicIconSelectors()],

};
