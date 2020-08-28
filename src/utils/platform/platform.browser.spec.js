import { isBrowser } from "utils/platform";

describe("isBrowser", () => {
  test("should be true in an DOM-related environment", () => {
    const isBrowserMock = jest.fn(isBrowser);
    const result = isBrowserMock();

    expect(isBrowserMock).toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
