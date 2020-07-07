/**
 * @jest-environment jsdom
 */

import { isMobile } from "./mobile";

describe("isMobile", () => {
  test("should successfully be called", () => {
    // Changing the user agent is not possible in javascript without overriding the getter for the navigator, which is not something I want to do.
    const isMobileMock = jest.fn(isMobile);
    const result = isMobileMock();

    expect(isMobileMock, "isMobile was not called.").toHaveBeenCalled();
    expect(result).toBeUndefined();
  });
});
