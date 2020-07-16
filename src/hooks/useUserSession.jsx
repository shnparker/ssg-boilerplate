/**
 * USER SESSION HOOK
 *
 * Getter hook to access the current user store.
 * Separated from user store to abstract implementation details.
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */

import React from "react";
import UserSessionContext from "stores/userSessionContext";

const useUserSession = () => {
  const context = React.useContext(UserSessionContext);

  if (typeof context === "undefined") {
    throw new Error("useUserSession must be used within UserSessionProvider");
  }

  return context;
};

export default useUserSession;
