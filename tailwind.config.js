const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "brand-blue": "rgb(79, 213, 214)",
      },
    },
    typography: {
      default: {
        css: {
          color: "#333",
          a: {
            color: "rgb(0, 182, 201)",
            "&:hover": {
              color: "rgb(0, 216, 216);",
            },
          },
        },
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/ui")],
};
