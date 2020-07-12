import { isBrowser, isMobile } from "utils/platform";

describe("isBrowser", () => {
  test("should be false in a Node environment", () => {
    const isBrowserMock = jest.fn(isBrowser);
    const result = isBrowserMock();

    expect(isBrowserMock, "isBrowser was not called.").toHaveBeenCalled();
    expect(result).toBe(false);
  });
});

describe("isMobile", () => {
  test("should be false when  not in a browser", () => {
    // Changing the user agent is not possible in javascript without overriding the getter for the navigator, which is not something I want to do.
    const isMobileMock = jest.fn(isMobile);
    const result = isMobileMock();

    expect(isMobileMock, "isMobile was not called.").toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
