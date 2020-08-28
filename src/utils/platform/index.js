/**
 * PLATFORM UTILS
 *
 * Utils to detect user devices and next.js runtimes
 */

/**
 * Checks whether the current runtime is a browser
 * @return {boolean}
 */
export const isBrowser = () => typeof window !== "undefined";
