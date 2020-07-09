import React from "react";
import userSessionContext from "../stores/userSessionContext";

/*
 * @see https://slides.com/djanoskova/react-context-api-create-a-reusable-snackbar#/11
 */
const useUserSession = () => {
  const context = React.useContext(userSessionContext);

  if (typeof context === "undefined") {
    throw new Error("useUserSession must be used within UserSessionProvider");
  }

  return context;
};

export default useUserSession;
