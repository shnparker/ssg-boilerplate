/**
 * @jest-environment jsdom
 */

import {isBrowser} from './browser';

describe('isBrowser', () => {
  test('should be true in an DOM-related environment', () => {
    const isBrowserMock  = jest.fn(isBrowser);
    const result = isBrowserMock();

    expect(isBrowserMock, 'isBrowser was not called.').toHaveBeenCalled();
    expect(result).toBe(true);
  });
});
