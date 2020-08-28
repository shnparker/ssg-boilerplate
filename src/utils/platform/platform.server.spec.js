import { isBrowser } from "utils/platform";

describe("isBrowser", () => {
  test("should be false in a Node environment", () => {
    const isBrowserMock = jest.fn(isBrowser);
    const result = isBrowserMock();

    expect(isBrowserMock, "isBrowser was not called.").toHaveBeenCalled();
    expect(result).toBe(false);
  });
});
