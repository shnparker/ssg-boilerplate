import * as Sentry from "@sentry/node";
import { isBrowser } from "../browser";

// Don't initialise Sentry if SENTRY_DSN isn't defined (won't crash the app, usage of the Sentry lib is resilient to this and doesn't cause any issue)
if (process.env.SENTRY_DSN) {
  /**
   * Helper to avoid duplicating the init() call in every /pages/api file.
   * Also used in pages/_app for the client side, which automatically applies it for all frontend pages.
   */
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: process.env.NODE_ENV !== "test",
    environment: process.env.NEXT_PUBLIC_APP_STAGE,
  });

  // Scope configured by default, subsequent calls to "configureScope" will add additional data
  Sentry.configureScope((scope) => {
    // See https://www.npmjs.com/package/@sentry/node
    scope.setTag("appName", process.env.NEXT_PUBLIC_APP_NAME);
    scope.setTag("appVersion", process.env.NEXT_PUBLIC_APP_VERSION);
    scope.setTag("nodejs", process.version);
    scope.setTag("runtimeEngine", isBrowser() ? "browser" : "server");
    scope.setTag("buildTime", process.env.NEXT_PUBLIC_BUILD_TIME);
  });
}

/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
 *
 * @param req
 */
export const configureReq = (request) => {
  Sentry.configureScope((scope) => {
    scope.setTag("host", request?.headers?.host);
    scope.setTag("url", request?.url);
    scope.setTag("method", request?.method);
    scope.setContext("query", request?.query);
    scope.setContext("cookies", request?.cookies);
    scope.setContext("body", request?.body);
    scope.setContext("headers", request?.headers);
  });
};

export default Sentry;
