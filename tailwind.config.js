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
        default: "#D5EDF1",
        focus: "#6BBEEC",
        error: "#b4391a",
        'post-hashtag':"rgba(152, 66, 8, 1)",
      },
      boxShadow: {
        'post-sh': "0px 3px 6.1px 0px rgba(0, 0, 0, 0.25)",
      },
      backgroundColor: {
        'post': "rgba(248, 248, 248, 1)",
        'comment-input':"rgba(217, 217, 217, 1)",
      },
      borderRadius: {
        'post-br': "20px",
        'comment-br': "30px",
        'comment-input-br':"10px"
      },
      borderWidth: {
        'comment-bw': "1px",
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
};
