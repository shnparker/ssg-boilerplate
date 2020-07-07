import * as Sentry from "@sentry/node";
import NextErrorComponent from "next/error";
import React from "react";
import PropTypes from "prop-types";

/**
 * _error.jsx
 * @see https://github.com/vercel/next.js/blob/canary/examples/with-sentry/pages/_error.js
 * @see https://github.com/vercel/next.js/discussions/12913 Discussion about hybrid SSG/SSR apps considerations
 */

AppError.propTypes = {
  statusCode: PropTypes.string.isRequired,
  hasGetInitialPropsRun: PropTypes.bool.isRequired,
  err: PropTypes.object.isRequired,
};

function AppError({ statusCode, hasGetInitialPropsRun, err }) {
  if (process.env.NEXT_PUBLIC_APP_STAGE !== "production") {
    console.debug(
      "AppError - Unexpected error caught, it was captured and sent to Sentry. Error details:"
    );
    console.error(err);
  }

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
  }

  return (
    <NextErrorComponent
      statusCode={statusCode}
      // Only display title in non-production stages, to avoid leaking debug information to end-users
      // When "null" is provided, it'll fallback to Next.js default message (based on the statusCode)
      title={
        process.env.NEXT_PUBLIC_APP_STAGE !== "production"
          ? err?.message ?? null
          : null
      }
    />
  );
}

AppError.getInitialProps = async ({ res, err, asPath }) => {
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

  if (res?.statusCode === 404) {
    // Opinionated: do not record an exception in Sentry for 404
    return { statusCode: 404 };
  }
  if (err) {
    Sentry.captureException(err);
    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );

  return errorInitialProps;
};

export default AppError;
