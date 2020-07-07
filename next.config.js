const bundleAnalyzer = require("@next/bundle-analyzer");
const nextSourceMaps = require("@zeit/next-source-maps");
const packageJson = require("./package");

const withSourceMaps = nextSourceMaps();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE_BUNDLE === "true",
});

const date = new Date();

module.exports = withBundleAnalyzer(
  withSourceMaps({
    env: {
      // XXX All env variables defined in ".env*" files that aren't public (don't start with "NEXT_PUBLIC_") must manually be made available at build time below
      // See https://nextjs.org/docs/api-reference/next.config.js/environment-variables
      SENTRY_DSN: process.env.SENTRY_DSN,

      // Dynamic env variables
      NEXT_PUBLIC_BUILD_TIME: date.toString(),
      NEXT_PUBLIC_BUILD_TIMESTAMP: +date,
      NEXT_PUBLIC_APP_NAME: packageJson.name,
      NEXT_PUBLIC_APP_VERSION: packageJson.version,
    },
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: "empty",
      };

      // In `pages/_app.js`, Sentry is imported from @sentry/node. While
      // @sentry/browser will run in a Node.js environment, @sentry/node will use
      // Node.js-only APIs to catch even more unhandled exceptions.
      //
      // This works well when Next.js is SSRing your page on a server with
      // Node.js, but it is not what we want when your client-side bundle is being
      // executed by a browser.
      //
      // Luckily, Next.js will call this webpack function twice, once for the
      // server and once for the client. Read more:
      // https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle
      if (!isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      return config;
    },
  })
);
