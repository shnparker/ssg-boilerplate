import * as Sentry from "@sentry/node";
import React from "react";

function Footer() {
  Sentry.addBreadcrumb({
    category: "fileLabel",
    message: `Rendering footer`,
    level: Sentry.Severity.Debug,
  });

  return <footer></footer>;
}

export default Footer;
