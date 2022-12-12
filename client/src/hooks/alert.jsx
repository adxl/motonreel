import React, { createContext, useContext, useMemo, useState } from "react";
import Alert from "react-bootstrap/Alert";

const AlertContext = createContext(null);
export const useAlert = () => useContext(AlertContext);

export function AlertProvider({ children }) {
  const [_alert, setAlert] = useState({
    message: "",
    type: "info",
  });
  const [_isVisible, setIsVisible] = useState(false);

  function sendAlert(message, type) {
    setAlert({ type, message });
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  }

  function alertSuccess(message) {
    sendAlert(message, "success");
  }

  function alertError(message) {
    sendAlert(message, "danger");
  }

  const value = useMemo(
    () => ({
      alertSuccess,
      alertError,
    }),
    []
  );

  return (
    <AlertContext.Provider value={value}>
      <Alert variant={_alert.type} show={_isVisible}>
        {_alert.message}
      </Alert>
      {children}
    </AlertContext.Provider>
  );
}
