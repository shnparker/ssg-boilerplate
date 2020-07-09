import { isBrowser } from "../../utils/browser";
import NextHead from "next/head";
import React from "react";
import PropTypes from "prop-types";

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  ogImage: PropTypes.string,
  favicon: PropTypes.string,
  additionalContent: PropTypes.node,
};

/**
 * Custom <head>
 *
 * @see https://nextjs.org/docs/api-reference/next/head
 */
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
    url = defaultOGImage,
    favicon = defaultFavicon,
    additionalContent,
  } = props;

  if (isBrowser()) {
    const WebFontLoader = require("webfontloader");

    // Load our fonts. Until they're loaded, fallback fonts will be used (configured in UniversalGlobalStyles)
    // This fixed an issue when loading fonts from external sources that don't show the text until the font is loaded
    // With this, instead of not showing any text, it'll show the text using its fallback font, and then show the font once loaded
    // @see https://github.com/typekit/webfontloader#custom
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
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/*<link rel="icon" sizes="192x192" href="/touch-icon.png" />*/}
      {/*<link rel="apple-touch-icon" href="/touch-icon.png" />*/}
      {/*<link rel="mask-icon" href="/favicon-mask.svg" color="#49B882" />*/}
      <link rel="icon" href={favicon} />

      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* // DISABLED because of https://github.com/mikemaccana/outdated-browser-rework/issues/57#issuecomment-620532590 */}
      {/* TLDR; Display false-positive warnings on embedded browsers if they're too old and the user can't do anything about it (e.g: Facebook Chrome, Linkedin Chrome, etc.) */}
      {/*<script async={true} src="https://storage.googleapis.com/the-funding-place/assets/libs/outdated-browser-rework/outdated-browser-rework.min.js" />*/}
      {/*<link rel="stylesheet" href="https://storage.googleapis.com/the-funding-place/assets/libs/outdated-browser-rework/outdated-browser-rework.css" />*/}

      {additionalContent && additionalContent}
    </NextHead>
  );
}

export default Head;
