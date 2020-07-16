/**
 * CUSTOMIZE APP DOCUEMNT
 *
 * A custom Document is commonly used to augment your application's <html> and <body> tags.
 * @see https://github.com/vercel/next.js/#custom-document
 */

import * as Sentry from "@sentry/node";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

//Send to Sentry all unhandled rejections & exceptions.
//@see https://leerob.io/blog/configuring-sentry-for-nextjs-apps
process.on("unhandledRejection", (err) => {
  Sentry.captureException(err);
});

process.on("uncaughtException", (err) => {
  Sentry.captureException(err);
});

class AppDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className={`stage-${process.env.NEXT_PUBLIC_APP_STAGE}`}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default AppDocument;
