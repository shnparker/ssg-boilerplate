module.exports = {
  purge: ['.src/components/**/*.jsx', './pages/**/*.jsx'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')],
};
