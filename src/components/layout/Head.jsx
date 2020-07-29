/**
 * PAGE HEAD
 *
 * Built-in component for appending elements to the head of the page
 * @see https://nextjs.org/docs/api-reference/next/head
 */

import React from "react";
import PropTypes from "prop-types";
import NextHead from "next/head";
import { isBrowser } from "utils/platform";

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  ogUrl: PropTypes.string,
  ogImage: PropTypes.string,
  favicon: PropTypes.string,
  additionalContent: PropTypes.node,
};

function Head(props) {
  const defaultTitle = "";
  const defaultDescription = "";
  const defaultOGURL = "";
  const defaultOGImage = "";
  const defaultFavicon = "";

  const {
    title = defaultTitle,
    description = defaultDescription,
    ogImage = defaultOGURL,
    ogUrl = defaultOGImage,
    favicon = defaultFavicon,
    additionalContent,
  } = props;

  if (isBrowser()) {
    const WebFontLoader = require("webfontloader");

    WebFontLoader.load({
      custom: {
        families: ["inter"],
        urls: ["/static/fonts/inter/inter.css"],
      },
    });
  }

  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{`${title} | ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href={favicon} />

      <meta property="og:url" content={ogUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:site" content={ogUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {additionalContent && additionalContent}
    </NextHead>
  );
}

export default Head;
