/**
 * @jest-environment jsdom
 */

import CookieManager from "utils/cookies/manager";

const cookieManager = new CookieManager();

describe(`Cookie Manager`, () => {
  describe(`browser`, () => {
    beforeEach(() => {
      cookieManager.deleteCookies();
    });

    describe(`constructor`, () => {
      test(`should init correctly (no arg)`, async () => {
        const cookieManager = new CookieManager();

        expect(cookieManager.req).toEqual(null);
        expect(cookieManager.res).toEqual(null);
      });
    });

    describe(`createCookie`, () => {
      test(`should init the user and return it`, async () => {
        const cookieManager = new CookieManager();
        const userSession = cookieManager.createCookie();

        expect(userSession.id).toBeDefined();
        expect(userSession.deviceId).toBeDefined();
        expect(document.cookie).toEqual(
          `user={"id":"${userSession.id}","deviceId":"${userSession.deviceId}"}`
        );
      });
    });

    describe(`getCookie`, () => {
      test(`should automatically init the user data when the cookie doesn't exist`, async () => {
        const cookieManager = new CookieManager();
        const userSession = cookieManager.getCookie();

        expect(userSession.id).toBeDefined();
        expect(userSession.deviceId).toBeDefined();
        expect(document.cookie).toEqual(
          `user={"id":"${userSession.id}","deviceId":"${userSession.deviceId}"}`
        );
      });

      test(`should return the existing user data when they already exist`, async () => {
        document.cookie = 'user={"id":"user-2","deviceId":"device-2"}';

        const cookieManager = new CookieManager();
        const userSession = cookieManager.getCookie();

        expect(userSession.id).toBeDefined();
        expect(userSession.deviceId).toBeDefined();
        expect(document.cookie).toEqual(
          `user={"id":"user-2","deviceId":"device-2"}`
        );
      });
    });

    describe(`updateCookie`, () => {
      test(`should write the user data to a "user" cookie`, async () => {
        const cookieManager = new CookieManager();

        cookieManager.updateCookie({
          id: "user-1",
          deviceId: "device-1",
        });

        expect(document.cookie).toEqual(
          'user={"id":"user-1","deviceId":"device-1"}'
        );
      });
    });

    describe(`patchCookie`, () => {
      test(`should patch only given properties and left other unchanged`, async () => {
        const cookieManager = new CookieManager();
        const userSession = cookieManager.getCookie();
        cookieManager.patchCookie({
          persona: "persona-1",
        });

        const userSessionPatched = cookieManager.getCookie();

        expect(userSessionPatched.id).toBeDefined();
        expect(userSessionPatched.deviceId).toBeDefined();
        expect(document.cookie).toEqual(
          `user={"id":"${userSession.id}","deviceId":"${userSession.deviceId}","persona":"${userSessionPatched.persona}"}`
        );
      });
    });
  });
});
