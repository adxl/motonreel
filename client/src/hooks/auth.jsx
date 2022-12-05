import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getCurrentUser, login } from "../api/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [_user, setUser] = useState({});
  const [_token, setToken] = useState(
    JSON.parse(sessionStorage.getItem("motonreel-token"))
  );

  const refreshUser = () => {
    if (!_token) return;

    getCurrentUser(_token)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((_) => {
        location.href = "/login";
      });
  };

  useEffect(() => {
    refreshUser();
  }, []);

  useEffect(() => {
    sessionStorage.setItem("motonreel-token", JSON.stringify(_token));
    refreshUser();
  }, [_token]);

  const handleLogin = useCallback((email, password) => {
    return login(email, password)
      .then(({ data: user }) => {
        setToken(user.token);
        location.href = "/";
      })
      .catch((_) => {
        console.log("error");
        return false;
      });
  });

  const handleLogout = useCallback(() => {
    setToken(null);
    location.href = "/login";
  }, []);

  const value = useMemo(
    () => ({
      token: _token,
      user: _user,
      login: handleLogin,
      logout: handleLogout,
    }),
    [_token, _user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
