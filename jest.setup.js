/**
 * JEST PRE-TEST SETUP
 *
 * A list of paths to modules that run some code to configure or set up
 * the testing framework before each test file in the suite is executed.
 * @see https://jestjs.io/docs/en/configuration#setupfilesafterenv-array
 */

//  Once an ENV var is found by dotenv, it won't be overridden
//  The order must be from the most important to the less important
//  @see https://github.com/motdotla/dotenv/issues/256#issuecomment-598676663
require("dotenv").config({ path: ".env.local" });
require("dotenv").config({ path: ".env" });

// Importing next polyfills fetch
// @see https://github.com/vercel/next.js/discussions/13678#discussioncomment-22383
// @see https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support
require("next");
