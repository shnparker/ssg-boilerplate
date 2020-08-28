import BrowserCookies from "js-cookie";

// Defines whether the user do not consent to data tracking by default (until they've made a choice)
export const USER_OPT_IN_BY_DEFAULT = true;
export const CONSENT_COOKIE_NAME = "cookieconsent_status";

/**
 * Resolves whether the user has opt-in or opt-out for analytics tracking.
 * Handles special cases when users have dismissed or not made a choice yet.
 */
export const getUserConsent = () => {
  const userConsentChoice = BrowserCookies.get(CONSENT_COOKIE_NAME);
  const isUserOptOut = userConsentChoice === "deny";
  const isUserOptIn =
    userConsentChoice === "allow" || (userConsentChoice === "dismiss" && USER_OPT_IN_BY_DEFAULT);

  let hasConsentedAnalytics;

  if (isUserOptOut) {
    hasConsentedAnalytics = false;
  } else if (isUserOptIn) {
    hasConsentedAnalytics = true;
  } else {
    // User hasn't made a choice yet
    hasConsentedAnalytics = USER_OPT_IN_BY_DEFAULT;
  }

  return {
    hasConsentedAnalytics,
    hasConsentedCookies: userConsentChoice === "allow" || userConsentChoice === "deny",
  };
};

export const shouldDisplayConsentPopup = (allowedPages) => {
  if (!allowedPages) {
    return true;
  }

  return allowedPages.includes(window.location.href);
};

/**
 * Initialise the Cookie Consent UI popup
 * Relies on Osano open source "cookieconsent" software (v3) https://github.com/osano/cookieconsent
 *
 * XXX This component lives completely outside of React render tree, it could/should probably be rewritten as a React component to be more "react-friendly"
 * XXX You'll need to refresh the browser when updating this file or changes won't be applied
 *
 * @param options
 *
 * @see https://www.osano.com/cookieconsent/documentation/
 * @see https://www.osano.com/cookieconsent/documentation/javascript-api/
 * @see https://www.osano.com/cookieconsent/download/
 */
const init = (options) => {
  const { allowedPages = null, amplitudeInstance, userConsent } = options;
  const { hasConsentedAnalytics, hasConsentedCookies } = userConsent;

  if (!shouldDisplayConsentPopup(allowedPages)) {
    return;
  }

  require("cookieconsent");

  const cc = window.cookieconsent;
  const additionalMessage = `<br /><b>
    ${
      hasConsentedAnalytics
        ? "Thank you for accepting our cookies and anonymous analytics. Please reconfirm your choice."
        : "You have declined our use of cookies. Please consider helping us improve our site and reconfirm your choice."
    }
    </b><br /><br />`;

  const message = `We use cookies to enhance your experience and collect anonymous statistics about how our site is used.
    No personal information is collected, nor shared with any third-party.</i><br />${
      hasConsentedCookies ? additionalMessage : ""
    }`;

  // Use https://www.osano.com/cookieconsent/download/ "Start Coding" to use the UI configuration builder
  // See https://www.osano.com/cookieconsent/documentation/javascript-api/ for advanced API options and documentation
  const cookieConsentSettings = {
    // Behavior
    autoOpen: true,
    autoAttach: true,
    type: "opt-out", // We consider the user is opt-in by default and must opt-out manually to disable tracking
    revokable: true, // Doesn't seem to work as expected, stuff gets revoked even when set to false, and also depends on the country
    whitelistPage: [], // Doesn't seem to work at all, no visible effect
    blacklistPage: [],
    location: false, // XXX Can also be an object with advanced configuration to implement your own geolocation resolvers
    cookie: {
      name: CONSENT_COOKIE_NAME,
      path: "/",
      domain: window.location.hostname, // Uses the current domain
      expiryDays: 365,
      secure: process.env.NEXT_PUBLIC_APP_STAGE !== "development", // Always use a secure cookie on non-dev stages
    },
    dismissOnScroll: false,
    dismissOnTimeout: false, // XXX Beware there is a bug, buggy, will override previous choice stored in cookie
    dismissOnWindowClick: false,

    // UI (colors, visual design)
    theme: "classic",
    position: "bottom-right",
    palette: {
      popup: {
        background: "rgb(0, 182, 201)",
      },
      button: {
        background: "#fff",
        text: "rgb(0, 182, 201)",
      },
    },
    // elements: {
    //   header: '<span class="cc-header"></span>',
    //   message: '<span id="cookieconsent:desc" class="cc-message"></span>',
    //   messagelink: '<span id="cookieconsent:desc" class="cc-message"> <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a></span>',
    //   dismiss: '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss"></a>',
    //   allow: '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow"></a>',
    //   deny: '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny"></a>',
    //   link: '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="" target="_blank"></a>',
    //   close: '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close"></span>',
    // },
    // window: '<div role="”dialog”" aria-label="”cookieconsent”" aria-describedby="”cookieconsent:desc”" class="”cc-window" ”></div>',
    // compliance: {
    //   'info': '<div class="cc-compliance"></div>',
    //   'opt-in': '<div class="cc-compliance cc-highlight"></div>',
    //   'opt-out': '<div class="cc-compliance cc-highlight"></div>',
    // },

    // Content (texts, wording)
    content: {
      header: "Cookies used on this site",
      message: message,
      dismiss: "Dismiss",
      allow: "Accept",
      deny: "Decline",
      link: "Learn more about cookies",
      //   href: "/${locale}/terms",
      target: "_blank", // Use "_blank" if you use an external "href" value
      close: "&#x274c;",
      policy: "Privacy policy",
    },

    onInitialise: function (status) {
      console.info("onInitialise", `User consent from "${CONSENT_COOKIE_NAME}" cookie:`, status);
    },

    onStatusChange: function (status) {
      if (status === "deny") {
        // Store user choice, then disable analytics tracking
        amplitudeInstance.logEvent("user-consent-manually-given", {
          choice: "deny",
          at: +new Date(),
          message,
        });
        amplitudeInstance.setOptOut(true);
        // TODO Delete the amplitude cookie to clear all traces? It'd be better, but cookie's name is random... And it'd be regenerated anyway... See https://github.com/amplitude/Amplitude-JavaScript/issues/277
      } else if (status === "allow") {
        // Enable analytics tracking, then store user choice
        amplitudeInstance.setOptOut(false);
        amplitudeInstance.logEvent("user-consent-manually-given", {
          choice: "allow",
          at: +new Date(),
          message,
        });
      }
    },

    onRevokeChoice: function () {
      console.info("onRevokeChoice");
      console.info(
        `Previous choice has been revoked, "${CONSENT_COOKIE_NAME}" cookie has been deleted.`
      );
    },
  };
  cc.initialise(cookieConsentSettings);
};

export default init;
