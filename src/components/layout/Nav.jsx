import * as Sentry from "@sentry/node";
import React from "react";

function Nav() {
  Sentry.addBreadcrumb({
    category: "fileLabel",
    message: `Rendering navbar`,
    level: Sentry.Severity.Debug,
  });

  return <nav></nav>;
}

export default Nav;
