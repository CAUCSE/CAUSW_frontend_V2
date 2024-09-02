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
        boardBackground: "#E8E8E8",
        boardPageBackground: "#F8F8F8",
        'post-hashtag':"rgba(152, 66, 8, 1)",
        'post-like':"rgba(253, 29, 29, 1)",
        'post-star':"rgba(255, 199, 27, 1)",
        'post-comment':"rgba(107, 190, 236, 1)",
        'create-post-text':"rgba(183, 183, 183, 1)",
        'non-checked-text':"rgba(140, 140, 140, 1)",
        'checked-text':"rgba(255, 0, 0, 1)",
        'confirm-btn':"rgba(240, 76, 35, 1)",
        'vote-btn':"rgba(255, 206, 49, 1)",
        'notice-board-role':"rgba(255, 245, 197, 1)",
        'normal-board-role':"rgba(232, 232, 232, 1)",
        'normal-board-role-text':"rgba(139, 139, 139, 1)",
        'vote-title':"rgba(217, 217, 217, 1)",
        'vote-theme':"rgba(107, 190, 236, 1)",
      },
      boxShadow: {
        'post-sh': "0px 3px 6.1px 0px rgba(0, 0, 0, 0.25)",
        'vote-option': "inset 0 0 0 2px white",
      },
      backgroundColor: {
        'post': "rgba(248, 248, 248, 1)",
        'comment-input':"rgba(217, 217, 217, 1)",
        'post-like':"rgba(254, 237, 233, 1)",
        'post-star':"rgba(255, 245, 197, 1)",
        'post-comment':"rgba(234, 246, 248, 1)",
        'post-form':"rgba(230, 38, 176, 0.3)",
        'child-comment':"rgba(209, 209, 209, 1)",
        'comment-btn':"rgba(232, 232, 232, 1)"
      },
      borderRadius: {
        'post-br': "20px",
        'comment-br': "30px",
        'comment-input-br':"10px"
      },
      borderWidth: {
        'comment-bw': "1px",
        'post-title-input': "1px",
      },
    },
  },
  plugins: [addDynamicIconSelectors(), require("tailwind-scrollbar-hide")],
};
