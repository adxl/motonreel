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

  function sendAlert(message, type, timeout = 1500) {
    setAlert({ type, message });
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, timeout);
  }

  function alertSuccess(message) {
    sendAlert(message, "success");
  }

  function alertError(message) {
    sendAlert(message, "danger");
  }

  function alertInfo(message) {
    sendAlert(message, "info", 2000);
  }

  const value = useMemo(
    () => ({
      alertSuccess,
      alertError,
      alertInfo,
    }),
    []
  );

  return (
    <div className="pt-5">
      <AlertContext.Provider value={value}>
        <Alert variant={_alert.type} show={_isVisible}>
          {_alert.message}
        </Alert>
        {children}
      </AlertContext.Provider>
    </div>
  );
}
