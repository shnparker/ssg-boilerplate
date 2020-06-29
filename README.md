# SSG Boilerplate
An opinionated boilerplate project that allows rapid development of a SSG/SSR hybrid app. This project is **HEAVILY** inspired by the fantastic work of [Vadorequest](https://github.com/Vadorequest) and his [Next Right Now](https://github.com/UnlyEd/next-right-now) boilerplate. This project aims to replicate production-grade practises, simplify and remove features from that NRN that may not be needed for simpler business use-cases, such as building marketing websites as a freelancer.

By creating a boilerplate from scratch using NRN as a reference, the main goal of this project is for me to learn about what NRN offers and adapt it to fit my needs.

## What's in the box
The following technologies have been pre-configured to "just work". You can simply start developing and reference the individual docs of each library in order to get started, however it is recommended to understand how each of these work and fit together as you progress.

### JS Frameworks & Libraries
- React
- Next.js Framework
- SVGR React Components

### UI Libraries
- TailwindCSS (including TailwindUI)
- FontAwesome Icons

### Testing
- Jest
- Cypress

### Monitoring & Analytics
- Sentry

### Developer Experience
- ESLint
- Vercel Deployment

## How does this differ from NRN
NRN is a far more complete solution and includes technologies that this boilerplate doesn't, such as:
- Localization
- Internationalization
- Multi-tenancy
- Server technologies

This boilerplate focuses less on the server-side and more on just having a fantastic SSG experience, but also supports SSR.

## Removing TailwindUI
All of the packages included have a free tier, except for TailwindUI (the paid UI library of TailwindCSS)

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

