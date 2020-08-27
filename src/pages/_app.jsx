/**
 * CUSTOM APP COMPONENT
 *
 * Next.js uses the App component to initialize pages.
 * You can override it and control the page initialization.
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */

import React from "react";
import PropTypes from "prop-types";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { isBrowser } from "utils/platform";
import { v1 as uuidv1 } from "uuid";
import "styles/index.css";
import "utils/monitoring";
import { sendWebVitals, getAmplitudeInstance } from "utils/analytics";
import * as Sentry from "@sentry/node";
import { AmplitudeProvider } from "@amplitude/react-amplitude";
import UserConsentContext from "stores/userConsentContext";
import UserSessionContext from "stores/userSessionContext";
import initCookieConsent, { getUserConsent } from "utils/cookies/consent";
import "cookieconsent/build/cookieconsent.min.css";
import CookieManager from "utils/cookies/manager";

/**
 * Font Awesome Icons
 * @see https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
 */
config.autoAddCss = false;
library.add(faFacebook, faTwitter, faInstagram, faLinkedin);

/**
 * Global variable meant to keep all metrics together, until there are enough to send them in batch as a single report
 */

const globalWebVitalsMetric = {
  reportId: uuidv1(),
  metrics: {},
  reportedCount: 0,
};

/**
 * Amplitude Analytics
 * Will be called once for every metric that has to be reported.
 *
 * There are, at minimum, 3 metrics being received (Next.js-hydration, FCP and TTFB)
 * Then, 2 other metrics can be received optionally (FID, LCP)
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting Initial release notes
 */
export function reportWebVitals(metrics) {
  const { name } = metrics;
  const count = globalWebVitalsMetric.reportedCount;
  globalWebVitalsMetric.metrics[name] = metrics;
  const keysLength = Object.keys(globalWebVitalsMetric.metrics)?.length;

  // Temporise analytics API calls by waiting for at least 5 metrics to be received before sending the first report
  // (because 3 metrics will be received upon initial page load, and then 2 more upon first click)
  // Then, send report every 2 metrics (because each client-side redirection will generate 2 metrics)
  if ((count === 0 && keysLength === 5) || (count > 0 && keysLength === 2)) {
    sendWebVitals(globalWebVitalsMetric);

    // Reset and prepare next metrics to be reported
    globalWebVitalsMetric.metrics = {};
    globalWebVitalsMetric.reportedCount++;
  }
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
  err: PropTypes.object,
};

function App({ Component, pageProps, err }) {
  Sentry.addBreadcrumb({
    category: "pages/_app",
    message: `Rendering _app`,
    level: Sentry.Severity.Debug,
  });

  const cookiesManager = new CookieManager();
  const userSession = cookiesManager.getCookie();
  const userId = userSession.id;
  const userConsent = getUserConsent();
  const amplitudeInstance = getAmplitudeInstance({ userId, userConsent });
  const injectedPageProps = {
    ...pageProps,
    cookiesManager,
    userSession,
  };

  if (isBrowser()) {
    initCookieConsent({
      // allowedPages: [
      //   // We only allow it on those 2 pages to avoid display that boring popup on every page
      //   `${window.location.origin}/${locale}/terms`,
      //   `${window.location.origin}/${locale}/examples/built-in-features/cookies-consent`,
      // ],
      amplitudeInstance,
      userConsent,
    });

    return (
      <AmplitudeProvider
        amplitudeInstance={amplitudeInstance}
        apiKey={process.env.NEXT_PUBLIC_AMPLITUDE_KEY}
        userId={userId}
      >
        <UserSessionContext.Provider value={userSession}>
          <UserConsentContext.Provider value={userConsent}>
            <Component {...injectedPageProps} error={err} />
          </UserConsentContext.Provider>
        </UserSessionContext.Provider>
      </AmplitudeProvider>
    );
  }

  return (
    <UserSessionContext.Provider value={userSession}>
      <Component {...injectedPageProps} error={err} />
    </UserSessionContext.Provider>
  );
}

export default App;
