// Font Awesome Icons
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { faFacebook, faTwitter, faInstagram, faLinkedin  } from '@fortawesome/free-brands-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import '../styles/index.css';
import React from 'react';
import PropTypes from 'prop-types';

// See https://github.com/FortAwesome/react-fontawesome#integrating-with-other-tools-and-frameworks
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically since it's being imported above
library.add(
  faFacebook, faTwitter, faInstagram, faLinkedin,
  faHome
);

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
