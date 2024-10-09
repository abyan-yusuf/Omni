/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        gorgeous: {
          from: {
            opacity: 0,
          },
          to: {
            opacity: "100%",
          },
        },
      },
      boxShadow: {
        rb: "3px 3px 5px",
      },
      backgroundColor: {
        footer: "rgba(210, 210, 210, 1)",
      },
      animation: {
        "fade-in": "gorgeous 0.5s ease-in-out",
      },
    },
  },
  plugins: [
    require("daisyui"),
    ({ addUtilities }) => {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  daisyui: {
    themes: ["cupcake"],
  },
};
