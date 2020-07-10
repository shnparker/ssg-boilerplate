import * as Sentry from "@sentry/node";
import { isBrowser } from "./browser";

/**
 * Returns whether running on a mobile device
 *
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
