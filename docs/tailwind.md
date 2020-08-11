# Tailwind UI

To remove Tailwind UI from this project, follow these instructions:

### Swap out packages

Tailwind has additional packages that can extend your capabilities without UI, lets add them:

```sh
yarn add @tailwindcss/custom-forms @tailwindcss/typography
```

Remove the UI package

```sh
yarn remove @tailwindcss/ui
```

### Update tailwind.config.js

```diff
plugins: [
+  require("@tailwindcss/typography"),
+  require("@tailwindcss/custom-forms"),
-  require("@tailwindcss/ui")
],
```
