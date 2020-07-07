import React from "react";
// import DefaultLayout from '../components/pageLayouts/DefaultLayout';

/**
 * 404 separated from other error pages
 * See https://nextjs.org/docs/advanced-features/custom-error-page
 */

const NotFoundError = (props) => {
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
};

export default NotFoundError;
