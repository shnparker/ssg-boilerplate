/**
 * USAGE ANALYTICS
 *
 * Implementation and config of Amplitude data analytics
 * Amplitude requires a key, use 5ea02d86a6840c165fcc01377131fa13 for dummy account
 * @see https://developers.amplitude.com/docs
 */

import * as Sentry from "@sentry/node";
import CookieManager from "utils/cookies";
import { isBrowser } from "utils/platform";

// All actions must use action verb (imperative form)
export const AMPLITUDE_ACTIONS = {
  CLICK: "click", // When an element is clicked (mouse) or tapped (screen, mobile)
  SELECT: "select", // When an element is selected (checkbox, select input, multi choices)
  REMOVE: "remove", // When an element is removed/delete
  OPEN: "open", // When an element is opened
  CLOSE: "close", // When an element is closed
};

export const getAmplitudeInstance = (props) => {
  if (isBrowser()) {
    const { customerRef, iframeReferrer, isInIframe, userId } = props;

    Sentry.configureScope((scope) => {
      scope.setTag("iframe", `${isInIframe}`);
      scope.setExtra("iframe", isInIframe);
      scope.setExtra("iframeReferrer", iframeReferrer);
    });

    const amplitude = require("amplitude-js");
    const amplitudeInstance = amplitude.getInstance();

    amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
      userId,
      logLevel:
        process.env.NEXT_PUBLIC_APP_STAGE === "production" ? "DISABLE" : "WARN",
      includeGclid: true,
      includeReferrer: true,
      includeUtm: true,
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    });

    amplitudeInstance.setVersionName(process.env.NEXT_PUBLIC_APP_VERSION);

    // We're only doing this when detecting a new session, as it won't be executed multiple times for the same session anyway, and it avoids noise
    if (amplitudeInstance.isNewSession()) {
      // Store whether the visitor originally came from an iframe (and from where)
      const visitor = new amplitudeInstance.Identify();
      // XXX Learn more about "setOnce" at https://github.com/amplitude/Amplitude-JavaScript/issues/223
      // This will help track down the users who discovered our platform because of an iframe
      visitor.setOnce("initial_iframe", isInIframe);
      visitor.setOnce("initial_iframeReferrer", iframeReferrer);

      // XXX We set all "must-have" properties here (instead of doing it in the "AmplitudeProvider", as userProperties), because react-amplitude will send the next "page-displayed" event BEFORE sending the $identify event
      visitor.setOnce("customer.ref", customerRef);
      visitor.setOnce("iframe", isInIframe);
      visitor.setOnce("iframeReferrer", iframeReferrer);

      amplitudeInstance.identify(visitor);
    }

    return amplitudeInstance;
  } else {
    return null;
  }
};

/**
 * Initialise Amplitude and send web-vitals metrics report.
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 */
export const sendWebVitals = (report) => {
  try {
    const amplitude = require("amplitude-js");
    const amplitudeInstance = amplitude.getInstance();
    const cookieManager = new CookieManager();
    const userData = cookieManager.getUserData();

    amplitudeInstance.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY, null, {
      // userId: null,
      userId: userData.id,
      logLevel:
        process.env.NEXT_PUBLIC_APP_STAGE === "production" ? "DISABLE" : "WARN",
      includeGclid: true,
      includeReferrer: true,
      includeUtm: true,
      onError: (error) => {
        Sentry.captureException(error);
        console.error(error);
      },
    });

    amplitudeInstance.logEvent(`report-web-vitals`, {
      app: {
        name: process.env.NEXT_PUBLIC_APP_NAME,
        stage: process.env.NEXT_PUBLIC_APP_STAGE,
      },
      page: {
        url: location.href,
        path: location.pathname,
        origin: location.origin,
        name: null,
      },
      report,
    });
    console.debug("report-web-vitals report sent to Amplitude");
  } catch (e) {
    Sentry.captureException(e);
    console.error(e);
  }
};
