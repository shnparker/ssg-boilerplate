/**
 * 404 ERROR PAGE
 *
 * A 404 page may be accessed very often. Server-rendering an error page for every visit increases the load of the Next.js server.
 * This can result in increased costs and slow experiences. This file is statically generated at build time.
 * To avoid the above pitfalls, Next.js provides a static 404 page by default without having to add any additional files.
 * @see https://nextjs.org/docs/advanced-features/custom-error-page
 */

import React from "react";
import PageLayout from "components/layout/PageLayout";

function NotFoundError(props) {
  return (
    <PageLayout
      {...props}
      pageName={"404"}
      headProps={{
        title: "Page not found",
      }}
    >
      <div {...props}>
        <>
          <h1>Page not found</h1>

          <p>The page you&apos;re looking for doesn&apos;t exist</p>
        </>
      </div>
    </PageLayout>
  );
}

export default NotFoundError;
