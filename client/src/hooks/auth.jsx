import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-dom";

import { getCurrentUser, login } from "../api/auth";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [_user, setUser] = useState({});
  const [_token, setToken] = useState();

  const refreshUser = useCallback((token) => {
    if (!token) return;

    getCurrentUser(token)
      .then(({ data }) => {
        setUser(data);
      })
      .catch((_) => {
        debugger;
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    setToken(token);

    refreshUser(token);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("motonreel-token", _token);
    refreshUser(_token);
  }, [_token]);

  const handleLogin = useCallback((data) => {
    login(data)
      .then(({ data: user }) => {
        setToken(user.token);
      })
      .catch((_) => {
        debugger;
      });
  });

  const handleLogout = useCallback(() => {
    setToken(null);
    navigate("/login");
  }, []);

  const value = useMemo(
    () => ({
      token: _token,
      user: _user,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }),
    [_token, _user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
