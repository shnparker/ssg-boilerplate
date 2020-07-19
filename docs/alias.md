# Alias

An alias path has been set up for every folder in `./src`

If you would like to change the paths, edit them here:

JS Config (propagates to Next.js webpack path resolver):

```json
"paths": {
  "pages/*": ["/pages/*"],
  "components/*": ["/components/*"],
  "hooks/*": ["/hooks/*"],
  "stores/*": ["/stores/*"],
  "styles/*": ["/styles/*"],
  "utils/*": ["/utils/*"]
}
```

ESLint: `./eslintrc.yml`

```yml
settings:
  import/resolver:
    alias:
      map:
        - - pages
          - "./src/pages"
        - - components
          - "./src/components"
        - - hooks
          - "./src/hooks"
        - - stores
          - "./src/stores"
        - - styles
          - "./src/styles"
        - - utils
          - "./src/utils"
      extensions:
        - ".js"
        - ".jsx"
```

Jest: `./jest.config.js`

```javascript
moduleNameMapper: {
  "^pages(.*)$": "<rootDir>/src/pages$1",
  "^components(.*)$": "<rootDir>/src/components$1",
  "^hooks(.*)$": "<rootDir>/src/hooks$1",
  "^stores(.*)$": "<rootDir>/src/stores$1",
  "^styles(.*)$": "<rootDir>/src/styles$1",
  "^utils(.*)$": "<rootDir>/src/utils$1",
},
```
