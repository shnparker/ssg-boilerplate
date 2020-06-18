const bundleAnalyzer = require('@next/bundle-analyzer');
const nextSourceMaps = require('@zeit/next-source-maps');
const packageJson = require('./package');

const withSourceMaps = nextSourceMaps();
const withBundleAnalyzer = bundleAnalyzer({
  // Run with "yarn analyse:bundle" - See https://www.npmjs.com/package/@next/bundle-analyzer
  enabled: process.env.ANALYZE_BUNDLE === 'true',
});

const date = new Date();

module.exports = withBundleAnalyzer(
  withSourceMaps({
    env: {
      // XXX All env variables defined in ".env*" files that aren't public (don't start with "NEXT_PUBLIC_") must manually be made available at build time below
      // See https://nextjs.org/docs/api-reference/next.config.js/environment-variables
      // XXX Duplication of the environment variables, this is only used locally
      // while now.json:build:env will be used on the Now platform (See https://vercel.com/docs/v2/build-step/#providing-environment-variables)
    //   SENTRY_DSN: process.env.SENTRY_DSN,

      // Dynamic env variables
      NEXT_PUBLIC_BUILD_TIME: date.toString(),
      NEXT_PUBLIC_BUILD_TIMESTAMP: +date,
      NEXT_PUBLIC_APP_NAME: packageJson.name,
      NEXT_PUBLIC_APP_VERSION: packageJson.version,
    },
    webpack: (config, { isServer, buildId }) => {
      if (isServer) {
        // IS_SERVER_INITIAL_BUILD is meant to be defined only at build time and not at run time, and therefore must not be "made public"
        process.env.IS_SERVER_INITIAL_BUILD = '1';
      }

      const APP_VERSION_RELEASE = `${packageJson.version}_${buildId}`;
      config.plugins.map((plugin, i) => {
        if (plugin.definitions) {
          // If it has a "definitions" key, then we consider it's the DefinePlugin where ENV vars are stored
          // Dynamically add some "public env" variables that will be replaced during the build through "DefinePlugin"
          // Those variables are considered public because they are available at build time and at run time (they'll be replaced during initial build, by their value)
          plugin.definitions[
            'process.env.NEXT_PUBLIC_APP_BUILD_ID'
          ] = JSON.stringify(buildId);
          plugin.definitions[
            'process.env.NEXT_PUBLIC_APP_VERSION_RELEASE'
          ] = JSON.stringify(APP_VERSION_RELEASE);
        }
      });

      if (isServer) {
        // Trick to only log once
        console.debug(
          `[webpack] Building release "${APP_VERSION_RELEASE}" using NODE_ENV="${
            process.env.NODE_ENV
          }" ${
            process.env.IS_SERVER_INITIAL_BUILD
              ? 'with IS_SERVER_INITIAL_BUILD="1"'
              : ''
          }`
        );
      }

      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty',
      };

      // XXX See https://github.com/vercel/next.js/blob/canary/examples/with-sentry-simple/next.config.js
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
      // https://nextjs.org/docs#customizing-webpack-config
      //
      // So ask Webpack to replace @sentry/node imports with @sentry/browser when
      // building the browser's bundle
      if (!isServer) {
        config.resolve.alias['@sentry/node'] = '@sentry/browser';
      }

      return config;
    },
  })
);
