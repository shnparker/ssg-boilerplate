import * as Sentry from "@sentry/node";
import ServerCookies from "cookies";
import BrowserCookies from "js-cookie";
import { v1 as uuidv1 } from "uuid"; // XXX Use v1 for uniqueness - See https://www.sohamkamani.com/blog/2016/10/05/uuid1-vs-uuid4/
import { isBrowser } from "../browser";

const COOKIE_KEY = "user";

/**
 * Helper to manage cookies universally whether being on the server or browser
 * Switches between BrowserCookies and ServerCookies depending on the runtime engine
 */
class CookieManager {
  /**
   * @param req
   * @param res
   * @param readonlyCookies - Useful if req/res aren't accessible (CSR, or SSR outside of _app), will allow to read cookie (but won't allow writes)
   */
  constructor(req, res, readonlyCookies) {
    this.req = req || null;
    this.res = res || null;
    this.readonlyCookies = readonlyCookies || null;
  }

  // COOKIE CRUD
  // ------------------------------

  initializeCookie() {
    const deviceId = uuidv1();
    const userData = {
      id: deviceId, // Replace with userId if app has authentication
      deviceId,
    };

    this.replaceUserData(userData);

    return userData;
  }

  patchCookie(newData) {
    this.replaceUserData({
      ...this.getUserData(),
      ...newData,
    });
  }

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
        // It's likely because we're calling this code from a view (that doesn't belong to getInitialProps and doesn't have access to req/res even though if it's running on the server)
        const serverCookies = new ServerCookies(this.req, this.res);
        serverCookies.set(COOKIE_KEY, JSON.stringify(newData), serverOptions);
      }
    } catch (e) {
      Sentry.captureException(e);
    }
  }

  static clearCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }

  getUserData(serverOptions) {
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
        // eslint-disable-next-line no-console
        console.warn(
          `Calling "getUserData" from the server side, but neither req/res nor readonlyCookies are provided. The server can't read any cookie and will therefore initialise a temporary user session (which won't override actual cookies since we can't access them)`
        );
      }
    }

    // If cookie's undefined, init (first visit)
    if (typeof cookieData === "undefined") {
      return this.initUserData();
    }

    try {
      const userData = JSON.parse(cookieData);

      if (!userData) {
        return this.initUserData();
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
      return this.initUserData();
    }
  }

  // COOKIE DEFAULTS
  // ------------------------------
  getDefaultServerOptions() {
    const today = new Date();
    return {
      httpOnly: false, // Force cookies to be sent to the browser
      expires: new Date(today.setFullYear(today.getFullYear() + 10)), // 10 years
    };
  }

  getDefaultBrowserOptions() {
    return {
      expires: 365 * 10, // 10 years
    };
  }
}

export default CookieManager;
