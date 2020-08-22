<!-- PROJECT LOGO -->
<img src="./svg/logo.svg" alt="Logo" />
<br />
<p align="center">
  <h3 align="center">Next.js Website Boilerplate</h3>

  <p align="center">
    An opinionated boilerplate project that allows rapid development of a SSG/SSR hybrid app meant for marketing web pages.
<br />
<br />
<a href="https://github.com/shnparker/nextjs-website-boilerplate"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://github.com/shnparker/nextjs-website-boilerplate/issues">Report Bug</a>
·
<a href="https://github.com/shnparker/nextjs-website-boilerplate/issues">Request Feature</a>

  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- Product screenshot -->
<!-- [![Product Name Screen Shot][product-screenshot]](http://placecorgi.com/500) -->

This project is meant to provide developers with a plug-and-play experience for rapidly developing marketing websites for clients. It includes general website features such as cookies & consent, the latest testing tools and a great CSS library to build your own components with.

If you need a more complete solution including multi-tenancy, i18n, and CMS integration, please check out [Next Right Now](https://github.com/UnlyEd/next-right-now), which has heavily inspired this boilerplate.

### Built With

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [SVGR React Components](https://react-svgr.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Tailwind UI](https://tailwindui.com/)
- [FontAwesome Icons](https://fontawesome.com/)
- [Jest](https://jestjs.io/)
- [Cypress](https://www.cypress.io/)
- [Sentry](https://sentry.io)
- [Amplitude](https://amplitude.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Vercel Deployment](https://vercel.com)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- Node
- Yarn

### Installation

1. Clone the repo

```sh
git clone https://github.com/shnparker/nextjs-website-boilerplate.git
```

2. Install dependancies

```sh
yarn install
```

<!-- USAGE EXAMPLES -->

## Usage

The boilerplate is set up to work seamlessly so that you can just start adding components.
The only requirement is to plug in the following customizations:

- [Fonts][docs-fonts]
- [Alias paths][docs-alias]
- [Environment variables][docs-env]
- [Default head][docs-defaults]
- [SVG Generation][docs-svg]
- [Tailwind UI][docs-tailwind]

I've readded [Tailwind UI](https://tailwindui.com) after clearing licensing queries with the creators. The Tailwind UI npm package is public and free, but the premade components are licensed, therefore this project will contain no premade components.
If you have not purchased Tailwind UI (which I highly recommend everyone does), you can remove it from your project by following the short [Tailwind UI Replacement][docs-tailwind] guide.

When everything is set, run the app.

```sh
yarn dev
```

## Deployment

Zero-configuration deployment when deploying Next.js projects to Vercel.
See [Deploying Next.js with Vercel](https://vercel.com/guides/deploying-nextjs-with-vercel)

<!-- ROADMAP -->

## Roadmap

See the [open issues][issues-url] for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

Shane Parker - [@shnparker][twitter-url] - [shane@sitestack.co.za][email-url]

Project Link: [https://github.com/shnparker/nextjs-website-boilerplate][repo-url]

<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

- [Next Right Now](https://github.com/UnlyEd/next-right-now)
- [Best-README-template](https://github.com/othneildrew/Best-README-Template)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[twitter-url]: https://twitter.com/shnparker
[email-url]: mailto:shane@sitestack.co.za
[repo-url]: https://github.com/shnparker/nextjs-website-boilerplate
[issues-url]: https://github.com/shnparker/nextjs-website-boilerplate/issues

<!-- Docs -->

[docs-fonts]: docs/fonts.md
[docs-alias]: docs/alias.md
[docs-svg]: docs/svg.md
[docs-defaults]: docs/defaults.md
[docs-env]: docs/env.md
[docs-tailwind]: docs/tailwind.md
