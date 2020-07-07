import * as Sentry from "@sentry/node";
import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

/**
 * Send to Sentry all unhandled rejections & exceptions.
 * @see https://leerob.io/blog/configuring-sentry-for-nextjs-apps
 */
process.on("unhandledRejection", (err) => {
  Sentry.captureException(err);
});

process.on("uncaughtException", (err) => {
  Sentry.captureException(err);
});

/**
 * _document.jsx
 * See https://github.com/vercel/next.js/#custom-document
 */
class AppDocument extends Document {
  static async getInitialProps(ctx) {
    Sentry.addBreadcrumb({
      category: "pages/_document",
      message: `Rendering _document`,
      level: Sentry.Severity.Debug,
    });

    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

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
