# Custom SVGs

The boilerplate ships with SVGR, which allows us to use svg files as React components.

To generate React components, place custom svg files in `./svg`

Then run the command:

```sh
yarn svg
```

This will output your svg files as React components in `./src/components/svg`, which will allow you to use them as follows

```jsx
...
import CompanyLogo from  'components/svg/CompanyLogo';

return  (
  <div>
    <CompanyLogo>
  </div>
)
```
