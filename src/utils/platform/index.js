/**
 * PLATFORM UTILS
 *
 * Utils to detect user devices and next.js runtimes
 */

import * as Sentry from "@sentry/node";

/**
 * Checks whether the current runtime is a browser
 * @return {boolean}
 */
export const isBrowser = () => typeof window !== "undefined";

/**
 * Returns whether current runtime is on a mobile device
 * @return {boolean}
 */
export const isMobile = () => {
  if (isBrowser()) {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    } catch (e) {
      console.log(e);
      Sentry.captureException(e);
    }
  } else {
    return false;
  }
};
