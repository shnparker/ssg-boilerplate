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
import { isBrowser } from "../utils/browser";
import "../styles/index.css";
import "../utils/monitoring/sentry";

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
 * _app.jsx
 * @see https://nextjs.org/docs/advanced-features/custom-app
 */
App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
