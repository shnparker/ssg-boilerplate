/**
 * ERROR MONITORING
 *
 * Implementation and config of Sentry error monitoring
 * Sentry monitoring is optional and will not break if env key not present
 * @see https://docs.sentry.io/
 */

import * as Sentry from "@sentry/node";
import { isBrowser } from "utils/platform";

const isEnabled =
  process.env.NODE_ENV !== "test" && process.env.NODE_ENV !== "development";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    enabled: isEnabled,
    environment: process.env.NEXT_PUBLIC_APP_STAGE,
  });

  // Default scope, additional calls to "configureScope" will add additional data
  Sentry.configureScope((scope) => {
    scope.setTag("appName", process.env.NEXT_PUBLIC_APP_NAME);
    scope.setTag("nodejs", process.version);
    scope.setTag("runtimeEngine", isBrowser() ? "browser" : "server");
    scope.setTag("buildTime", process.env.NEXT_PUBLIC_BUILD_TIME);
  });
}

/**
 * Configure the Sentry scope by extracting useful tags and context from the given request.
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
