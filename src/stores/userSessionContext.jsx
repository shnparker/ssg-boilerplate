import React from "react";

const initialContext = {};

/**
 * The userSession is empty by default and will only be filled on the browser,
 * because it relies on data from cookies that are stored on the end user's browser
 */
const userSessionContext = React.createContext(initialContext);

export default userSessionContext;
