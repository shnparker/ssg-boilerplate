/**
 * 500 ERROR PAGE
 *
 * By default Next.js provides a 500 error page that matches the default 404 page’s style.
 * This page is not statically optimized as it allows server-side errors to be reported.
 * This is why 404 and 500 (other errors) are separated.
 * @see https://nextjs.org/docs/advanced-features/custom-error-page
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/_error.js
 */

import * as Sentry from "@sentry/node";
import NextErrorComponent from "next/error";
import React from "react";
import PropTypes from "prop-types";

AppError.propTypes = {
  statusCode: PropTypes.string.isRequired,
  hasGetInitialPropsRun: PropTypes.bool.isRequired,
  err: PropTypes.object.isRequired,
};

function AppError({ statusCode, hasGetInitialPropsRun, err }) {
  console.error(err);

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
  }

  return (
    <NextErrorComponent
      statusCode={statusCode}
      title={
        process.env.NEXT_PUBLIC_APP_STAGE !== "production"
          ? err?.message ?? null
          : null
      }
    />
  );
}

AppError.getInitialProps = async ({ res, err }) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({
    res,
    err,
  });

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  // Opinionated: do not record an exception in Sentry for 404
  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }

  if (err) {
    Sentry.captureException(err);
    return errorInitialProps;
  }

  return errorInitialProps;
};

export default AppError;
