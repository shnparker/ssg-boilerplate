/**
 *  USER COOKIE CONSENT STORE
 *
 * Stores users preference to cookie data
 * Only to be used via the useUserConsent hook.
 */

import React from "react";

const initialContext = {};
const UserConsentContext = React.createContext(initialContext);

export default UserConsentContext;
