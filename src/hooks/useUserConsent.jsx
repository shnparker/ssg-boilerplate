/**
 * USER CONSENT HOOK
 *
 * Getter hook to access the current user cookie preference.
 * Separated from user store to abstract implementation details.
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */

import React from "react";
import UserConsentContext from "stores/userConsentContext";

const useUserConsent = () => {
  const context = React.useContext(UserConsentContext);

  if (typeof context === "undefined") {
    throw new Error("useUserConsent must be used within UserConsentProvider");
  }

  return context;
};

export default useUserConsent;
