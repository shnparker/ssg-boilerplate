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
  test("should be false when not in a browser", () => {
    const isMobileMock = jest.fn(isMobile);
    const result = isMobileMock();

    expect(isMobileMock, "isMobile was not called.").toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
