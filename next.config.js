/**
 * NEXT.JS CONFIG
 *
 * It gets used by the Next.js server and build phases, and it's not included in the browser build.
 * will not be parsed by Webpack, Babel or TypeScript
 * @see https://nextjs.org/docs/api-reference/next.config.js/introduction
 */

const bundleAnalyzer = require("@next/bundle-analyzer");
const nextSourceMaps = require("@zeit/next-source-maps");

const withSourceMaps = nextSourceMaps();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE_BUNDLE === "true",
});

const date = new Date();

module.exports = withBundleAnalyzer(
  withSourceMaps({
    // Dynamic environment variables
    env: {
      NEXT_PUBLIC_BUILD_TIME: date.toString(),
      NEXT_PUBLIC_BUILD_TIMESTAMP: +date,
    },
    /*
     * WEBPACK CONFIG
     
     * The webpack function is executed twice, once for the server and once for the client. 
     * This allows you to distinguish between client and server configuration using the isServer property
     * @see https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
     */

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
      // server and once for the client. So ask Webpack to replace @sentry/node
      // imports with @sentry/browser when building the browser's bundle
      if (!isServer) {
        config.resolve.alias["@sentry/node"] = "@sentry/browser";
      }

      return config;
    },
  })
);
