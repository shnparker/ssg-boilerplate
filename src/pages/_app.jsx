import React from "react";
import PropTypes from "prop-types";
import { config, library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faHome, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { isBrowser } from "@/utils/browser";
import { v1 as uuidv1 } from "uuid";
import "@/styles/index.css";
import { sendWebVitals } from "@/utils/analytics/amplitude";
import "@/utils/monitoring/sentry";

/**
 * Font Awesome Icons
 * @see https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
 */
config.autoAddCss = false;
library.add(faFacebook, faTwitter, faInstagram, faLinkedin, faHome, faSpinner);

/**
 * Why Did You Render
 * @see https://github.com/welldone-software/why-did-you-render
 */
if (isBrowser() && process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");

  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: true,
    logOwnerReasons: true,
    collapseGroups: true,
  });
}

/**
 * Global variable meant to keep all metrics together, until there are enough to send them in batch as a single report
 */
const globalWebVitalsMetric = {
  reportId: uuidv1(),
  metrics: {},
  reportedCount: 0,
};

/**
 * Will be called once for every metric that has to be reported.
 *
 * There are, at minimum, 3 metrics being received (Next.js-hydration, FCP and TTFB)
 * Then, 2 other metrics can be received optionally (FID, LCP)
 * @see https://web.dev/vitals/ Essential metrics for a healthy site
 * @see https://nextjs.org/blog/next-9-4#integrated-web-vitals-reporting Initial release notes
 */
export function reportWebVitals(metrics) {
  if (process.env.NEXT_PUBLIC_APP_STAGE !== "production") {
    console.debug(metrics);
  }

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

/**
 * _app.jsx
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
  err: PropTypes.object,
};

function App({ Component, pageProps, err }) {
  return <Component {...pageProps} err={err} />;
}

export default App;
