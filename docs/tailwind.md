# Tailwind UI

To add TailwindUI to this project, follow these instructions:

### Swap out packages

Tailwind UI already includes the plugins we add to the config, so we'll remove them:

```sh
yarn remove @tailwindcss/custom-forms @tailwindcss/typography
```

Add the UI package

```sh
yarn add @tailwindcss/ui
```

### Update tailwind.config.js

```diff
plugins: [
-  require("@tailwindcss/typography"),
-  require("@tailwindcss/custom-forms"),
+  require("@tailwindcss/ui")
],
```
