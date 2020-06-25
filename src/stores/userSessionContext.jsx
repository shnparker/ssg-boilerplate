import React from 'react';

const initialContext = {};

/**
 * The userSession is empty by default and will only be filled on the browser,
 * because it relies on data from cookies that are stored on the end user's browser
 *
 * Uses native React Context API, meant to be used from hooks only, not by functional components
 * @see https://reactjs.org/docs/context.html
 * @see https://medium.com/better-programming/react-hooks-usecontext-30eb560999f
 */
const userSessionContext = React.createContext(initialContext);

export default userSessionContext;
