/**
 * CURRENT USER SESSION STORE
 *
 * Populated by the users browser cookies.
 * Only to be used via the useUserSession hook.
 */

import React from "react";

const initialContext = {};
const UserSessionContext = React.createContext(initialContext);

export default UserSessionContext;
