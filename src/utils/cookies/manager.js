/**
 * COOKIE MANAGEMENT
 *
 * Cookie utils that manages current browser cookies
 * Source of data for user session context store
 */

import * as Sentry from "@sentry/node";
import BrowserCookies from "js-cookie";
import { v1 as uuidv1 } from "uuid";
import { isBrowser } from "utils/platform";

const COOKIE_KEY = "user";

class CookieManager {
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
   * @param {*} browserOptions
   */
  updateCookie(newData, browserOptions = this.getDefaultBrowserOptions()) {
    try {
      if (isBrowser()) {
        const browserCookies = BrowserCookies.withConverter({
          write: function (value) {
            return value;
          },
        });
        browserCookies.set(COOKIE_KEY, JSON.stringify(newData), browserOptions);
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

  getCookie() {
    let cookieData;

    if (isBrowser()) {
      cookieData = BrowserCookies.get(COOKIE_KEY);
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
   * Default browser cookie config
   */
  getDefaultBrowserOptions() {
    return {
      expires: 365 * 10, // 10 years
    };
  }
}

export default CookieManager;
