/**
 * @jest-environment jsdom
 */

import { isBrowser, isMobile } from "utils/platform";

describe("isBrowser", () => {
  test("should be true in an DOM-related environment", () => {
    const isBrowserMock = jest.fn(isBrowser);
    const result = isBrowserMock();

    expect(isBrowserMock, "isBrowser was not called.").toHaveBeenCalled();
    expect(result).toBe(true);
  });
});

describe("isMobile", () => {
  test("should successfully be called", () => {
    // Changing the user agent is not possible in javascript without overriding the getter for the navigator, which is not something I want to do.
    const isMobileMock = jest.fn(isMobile);
    const result = isMobileMock();

    expect(isMobileMock, "isMobile was not called.").toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
