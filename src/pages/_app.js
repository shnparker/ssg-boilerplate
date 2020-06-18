import '../styles/index.css';
import React from 'react';
import PropTypes from 'prop-types';

App.propTypes = {
  Component: PropTypes.element.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
