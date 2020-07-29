/**
 * ISOMORPHIC COOKIE MANAGEMENT
 *
 * Cookie utils that manages both browser/server environments
 * Source of data for user session context store
 */

import * as Sentry from "@sentry/node";
import BrowserCookies from "js-cookie";
import ServerCookies from "cookies";
import { v1 as uuidv1 } from "uuid";
import { isBrowser } from "utils/platform";

const COOKIE_KEY = "user";

class CookieManager {
  //Useful if req/res aren't accessible (CSR, or SSR outside of _app), will allow to read cookie (but won't allow writes)
  constructor(req, res, readonlyCookies) {
    this.req = req || null;
    this.res = res || null;
    this.readonlyCookies = readonlyCookies || null;
  }

  // COOKIE CRUD
  // ------------------------------

  /**
   * Creates an initial default cookie
   */
  createCookie() {
    const deviceId = uuidv1();
    const userData = {
      id: deviceId,
      deviceId,
    };

    this.updateCookie(userData);

    return userData;
  }

  /**
   * Partially updates an existing cookie with provided data
   * @param {*} newData
   */
  patchCookie(newData) {
    this.updateCookie({
      ...this.getCookie(),
      ...newData,
    });
  }

  /**
   * Replaces the existing cookie entirely with provided data
   * @param {*} newData
   * @param {*} serverOptions
   * @param {*} browserOptions
   */
  updateCookie(
    newData,
    serverOptions = this.getDefaultServerOptions(),
    browserOptions = this.getDefaultBrowserOptions()
  ) {
    try {
      if (isBrowser()) {
        //  "js-cookies" apply a "percent encoding" when writing data, which isn't compatible with the "cookies" lib
        //  We therefore override this behaviour because we need to write proper JSON
        //  @see https://github.com/js-cookie/js-cookie#encoding
        const browserCookies = BrowserCookies.withConverter({
          write: function (value) {
            return value;
          },
        });
        browserCookies.set(COOKIE_KEY, JSON.stringify(newData), browserOptions);
      } else if (this.req && this.res) {
        // If running on the server side but req or res aren't set, then we don't do anything
        const serverCookies = new ServerCookies(this.req, this.res);
        serverCookies.set(COOKIE_KEY, JSON.stringify(newData), serverOptions);
      }
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }
  }

  /**
   * Removes all cookies from the client browser
   */
  deleteCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  /**
   * Get the current cookie object
   * @param {*} serverOptions
   */
  getCookie(serverOptions) {
    let cookieData;

    if (isBrowser()) {
      cookieData = BrowserCookies.get(COOKIE_KEY);
    } else {
      const serverCookies = new ServerCookies(this.req, this.res);

      // If running on the server side but req or res aren't set, then we should have access to readonlyCookies provided through the _app:getInitialProps
      // Otherwise, it means that's we're trying to read our cookies through SSR but have no way of reading them, which will cause a odd behaviour
      // XXX To avoid this issue, the easiest way is to provide readonlyCookies through the constructor, so that we can read cookies from server side
      if (this.req && this.res) {
        cookieData = serverCookies.get(COOKIE_KEY, serverOptions);
      } else if (this.readonlyCookies) {
        cookieData = this.readonlyCookies?.[COOKIE_KEY];
      } else {
        console.warn(
          "Attempted to fetch cookies on the server with no res/req, temporary user session created."
        );
      }
    }

    // Create default cookie for user on first visit.
    if (typeof cookieData === "undefined") {
      return this.createCookie();
    }

    try {
      const userData = JSON.parse(cookieData);

      if (!userData) {
        return this.createCookie();
      } else {
        return userData;
      }
    } catch (e) {
      Sentry.withScope((scope) => {
        scope.setExtra("cookieData", cookieData);

        Sentry.captureException(e);
      });

      console.error(e);

      // Data unreadable, creating new data
      return this.createCookie();
    }
  }

  // COOKIE DEFAULTS
  // ------------------------------

  /**
   * Default server cookie config
   */
  getDefaultServerOptions() {
    const today = new Date();
    return {
      httpOnly: false, // Force cookies to be sent to the browser
      expires: new Date(today.setFullYear(today.getFullYear() + 10)), // 10 years
    };
  }

  /**
   * Default browser cookie config
   */
  getDefaultBrowserOptions() {
    return {
      expires: 365 * 10, // 10 years
    };
  }
}

export default CookieManager;
