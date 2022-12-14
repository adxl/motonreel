import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getCurrentUser, login } from "@api/auth";
import { useAlert } from "@hooks/alert";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [_user, setUser] = useState({});
  const [_token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("motonreel-token"))
  );

  const { alertInfo } = useAlert();

  const eventSource = React.useMemo(() => {
    if (_token) {
      const es = new EventSource(import.meta.env.VITE_API_URL + "/events");

      es.onopen = () => {
        console.log("ready to collect events !");
      };

      es.onmessage = (event) => {
        alertInfo(event.data);
      };

      return es;
    }
  }, [_token]);

  const refreshUser = () => {
    if (!_token) return;

    getCurrentUser(_token)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((_) => {
        sessionStorage.setItem("motonreel-token", JSON.stringify(null));
        location.href = "/login";
      });
  };

  useEffect(() => {
    refreshUser();
    return () => eventSource && eventSource.close();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("motonreel-token", JSON.stringify(_token));
    refreshUser();
  }, [_token]);

  function handleLogin(email, password) {
    return new Promise((_, reject) => {
      login(email, password)
        .then(({ data: user }) => {
          setToken("Bearer " + user.token);
          location.href = "/";
        })
        .catch((error) => {
          reject(error.response.data);
        });
    });
  }

  const handleLogout = useCallback(() => {
    setToken(null);
    eventSource.close();
    location.href = "/login";
  }, []);

  const value = useMemo(
    () => ({
      token: _token,
      setToken: setToken,
      user: _user,
      login: handleLogin,
      logout: handleLogout,
      refreshUser: refreshUser,
    }),
    [_token, _user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
