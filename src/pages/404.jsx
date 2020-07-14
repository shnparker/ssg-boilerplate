/**
 * 404 ERROR PAGE
 *
 * A 404 page may be accessed very often. Server-rendering an error page for every visit increases the load of the Next.js server.
 * This can result in increased costs and slow experiences. This file is statically generated at build time.
 * To avoid the above pitfalls, Next.js provides a static 404 page by default without having to add any additional files.
 * @see https://nextjs.org/docs/advanced-features/custom-error-page
 */

import React from "react";
// import DefaultLayout from '../components/pageLayouts/DefaultLayout';

function NotFoundError(props) {
  return (
    // <DefaultLayout
    //   {...props}
    //   pageName={"404"}
    //   headProps={{
    //     title: "404 Not Found - Next Right Now",
    //   }}
    // >
    <div {...props}>
      <>
        <h1>Page not found</h1>

        <p>The page you&apos;re looking for doesn&apos;t exist</p>
      </>
    </div>
    // </DefaultLayout>
  );
}

export default NotFoundError;
