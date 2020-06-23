# Removing libraries

## TailwindUI
If you have not purchased TailwindUI, remove the following lines from your project.

```javascript 
// package.json
"@tailwindcss/ui": "^0.3.0",
"postcss-preset-env": "^6.7.0",
```
```javascript 
// tailwind.config.js
plugins: [require('@tailwindcss/ui')], 
// plugins: [],
```
