# Fonts

1. Add your preferred font to `./src/public/static/fonts` directory
2. Inject the font to the webfontloader in `./src/components/layout/Head.jsx`

```javascript
WebFontLoader.load({
  custom: {
    families: ["inter"],
    urls: ["/static/fonts/inter/inter.css"],
  },
});
```

3. Make your font available in `./tailwind.config.js`

```javascript
theme: {
  extend: {
    fontFamily: {
      sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    },
  },
},
```

4. Optionally provide a fallback font while webfontloader still loading in `./src/styles/index.css`

```css
html:not(.wf-active) {
  font-family: "Arial", sans-serif;
}
```
