import React from "react";
import PageLayout from "components/layout/PageLayout";
import Logo from "components/svg/Logo";

export default function Home() {
  return (
    <PageLayout
      pageName="Home"
      headProps={{
        title: "Home",
      }}
    >
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto mb-6">
            <Logo />
            <p className="text-base text-center leading-6 font-semibold tracking-wide uppercase">
              Introducing
            </p>
            <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-brand-blue">
                Next.js Website Boilerplate
              </span>
            </h1>
            <p className="text-xl text-gray-500 leading-8">
              This project is meant to provide developers with a plug-and-play experience for
              rapidly developing marketing websites for clients. It includes general website
              features such as cookies & consent, the latest testing tools and a great CSS library
              to build your own components with. If you need a more complete solution including
              multi-tenancy, i18n, and CMS integration, please check out{" "}
              <a href="https://github.com/UnlyEd/next-right-now" className="underline">
                Next Right Now
              </a>
              , which has heavily inspired this boilerplate.
            </p>
          </div>
          <div className="prose prose-lg text-gray-500 mx-auto">
            <h2>Built with:</h2>
            <ul>
              <li>
                <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                  React
                </a>
              </li>
              <li>
                <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer">
                  Next.js
                </a>
              </li>
              <li>
                <a href="https://react-svgr.com/" target="_blank" rel="noopener noreferrer">
                  SVGR
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
                  TailwindCSS
                </a>
              </li>
              <li>
                <a href="https://tailwindui.com" target="_blank" rel="noopener noreferrer">
                  Tailwind UI
                </a>
              </li>
              <li>
                <a href="https://fontawesome.com/" target="_blank" rel="noopener noreferrer">
                  FontAwesome Icons
                </a>
              </li>
              <li>
                <a href="https://jestjs.io/" target="_blank" rel="noopener noreferrer">
                  Jest
                </a>
              </li>
              <li>
                <a href="https://www.cypress.io/" target="_blank" rel="noopener noreferrer">
                  Cypress
                </a>
              </li>
              <li>
                <a href="https://sentry.io" target="_blank" rel="noopener noreferrer">
                  Sentry
                </a>
              </li>
              <li>
                <a href="https://amplitude.com/" target="_blank" rel="noopener noreferrer">
                  Amplitude
                </a>
              </li>
              <li>
                <a href="https://eslint.org/" target="_blank" rel="noopener noreferrer">
                  ESLint
                </a>
              </li>
              <li>
                <a href="https://eslint.org/" target="_blank" rel="noopener noreferrer">
                  Prettier
                </a>
              </li>
              <li>
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                  Vercel Deployment
                </a>
              </li>
            </ul>
            <h2>Getting started</h2>
            <p>To get a local copy up and running follow these simple steps.</p>
            <h3>Prerequisites</h3>
            <p>
              This is an example of how to list things you need to use the software and how to
              install them.
            </p>
            <ul>
              <li>Node</li>
              <li>Yarn</li>
            </ul>
            <h3>Installation</h3>
            <ol>
              <li>
                <p>Clone the boilerplate</p>
                <code>git clone https://github.com/shnparker/nextjs-website-boilerplate.git</code>
              </li>
              <li>
                <p>Install dependancies</p>
                <code>yarn install</code>
              </li>
            </ol>
            <h2>Usage</h2>
            <p>
              The boilerplate is set up to work seamlessly so that you can just start adding
              components. The only requirement is to plug in the following customizations:
            </p>
            <ul>
              <li>
                <a
                  href="https://github.com/shnparker/nextjs-website-boilerplate/blob/master/docs/fonts.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fonts
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shnparker/nextjs-website-boilerplate/blob/master/docs/alias.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Alias paths
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shnparker/nextjs-website-boilerplate/blob/master/docs/env.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Environment variables
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shnparker/nextjs-website-boilerplate/blob/master/docs/default.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Default head
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shnparker/nextjs-website-boilerplate/blob/master/docs/svg.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SVG generation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shnparker/nextjs-website-boilerplate/blob/master/docs/tailwind.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind UI
                </a>
              </li>
            </ul>
            <p>
              I&apos;ve readded Tailwind UI after clearing licensing queries with the creators. The
              Tailwind UI npm package is public and free, but the premade components are licensed,
              therefore this project will contain no premade components. If you have not purchased
              Tailwind UI (which I highly recommend everyone does), you can remove it from your
              project by following the short{" "}
              <a
                href="https://github.com/shnparker/nextjs-website-boilerplate/blob/master/docs/tailwind.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tailwind UI
              </a>{" "}
              guide.
            </p>
            <p>When everything is set, run the app.</p>
            <code>yarn dev</code>
            <h2>Deployment</h2>
            <p>
              Zero-configuration deployment when deploying Next.js projects to Vercel. See{" "}
              <a
                href="https://vercel.com/guides/deploying-nextjs-with-vercel"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deploying Next.js with Vercel
              </a>
            </p>
            <h2>Roadmap</h2>
            <p>
              See the{" "}
              <a
                href="https://github.com/shnparker/nextjs-website-boilerplate/issues"
                target="_blank"
                rel="noopener noreferrer"
              >
                open issues
              </a>{" "}
              for a list of proposed features (and known issues).
            </p>
            <h2>Contributing</h2>
            <p>
              Contributions are what make the open source community such an amazing place to be
              learn, inspire, and create. Any contributions you make are{" "}
              <strong>greatly appreciated</strong>.
            </p>
            <ol>
              <li>Fork the Project</li>
              <li>
                <p>Create your Feature Branch</p>
                <code>git checkout -b feature/AmazingFeature</code>
              </li>
              <li>
                <p>Commit your changes</p>
                <code>git commit -m &apos;Add some AmazingFeature&apos;</code>
              </li>
              <li>
                <p>Push to the Branch </p>
                <code>git push origin feature/AmazingFeature</code>
              </li>
              <li>Open a Pull Request</li>
            </ol>
            <h2>License</h2>
            <p>Distributed under the MIT License. See `LICENSE` for more information.</p>
            <h2>Contact</h2>
            <p>
              Shane Parker -{" "}
              <a href="https://twitter.com/shnparker" target="_blank" rel="noopener noreferrer">
                @shnparker
              </a>{" "}
              - <a href="mailto:">shane@sitestack.co.za</a>
            </p>
            <p>
              Project link:{" "}
              <a href="https://github.com/shnparker/nextjs-website-boilerplate">
                https://github.com/shnparker/nextjs-website-boilerplate
              </a>
            </p>
            <h2>Acknowledgements</h2>
            <ul>
              <li>
                <a href="https://github.com/UnlyEd/next-right-now">Next Right Now</a>
              </li>
              <li>
                <a href="https://github.com/othneildrew/Best-README-Template">
                  Best-README-template
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
