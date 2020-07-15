/**
 * ERROR SCAFFOLDING
 *
 * Adds debug info on non-production environments
 */

import * as React from "react";
import PropTypes from "prop-types";

ErrorLayout.propTypes = {
  error: PropTypes.object.isRequired,
  context: PropTypes.object,
};

function ErrorLayout({ error, context }) {
  let stringifiedContext;
  try {
    stringifiedContext = JSON.stringify(context, null, 2);
  } catch (e) {
    stringifiedContext = null;
  }

  return (
    <main>
      <h1>Service currently unavailable</h1>

      <div>
        <p>
          Try to refresh the page. Please contact our support below if the issue
          persists.
        </p>
      </div>

      {process.env.NEXT_PUBLIC_APP_STAGE !== "production" && (
        <div>
          <hr />
          <i>
            The below &quot;debug info&quot; are only displayed on
            non-production stages.
            <br />
            Note that debug information about the error are also available on
            the server/browser console.
          </i>

          <h2>Debug information:</h2>

          <pre
            style={{
              fontFamily: "monospace",
              color: "#666",
              background: "#f4f4f4",
              pageBreakInside: "avoid",
              fontSize: "15px",
              lineHeight: 1.6,
              overflow: "auto",
              padding: "1em 1.5em",
              display: "block",
              wordWrap: "break-word",
            }}
          >
            <b>Error message</b>:<br />
            <code>{error?.message}</code>
            <hr />
            {context && (
              <>
                <b>Error additional context</b>:<br />
                <code>{stringifiedContext}</code>
                <hr />
              </>
            )}
            <b>Stack trace</b>:<br />
            <code>{error?.stack}</code>
          </pre>
        </div>
      )}
    </main>
  );
}

export default ErrorLayout;
