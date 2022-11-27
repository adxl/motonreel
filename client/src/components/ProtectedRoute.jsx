import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { getCurrentUser } from "@api/auth";
import { AuthProvider } from "@hooks/auth";

export default function ProtectedRoute({ el: Element }) {
  const [_user, setUser] = useState({});
  const [_isAuth, setIsAuth] = useState(false);
  const [_isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    getCurrentUser()
      .then(({ data: user }) => {
        setUser(user);
        setIsAuth(true);
      })
      .finally(() => setIsLoaded(true));
  }, [Element]);

  if (!_isLoaded) return "loading";

  if (!_isAuth) return <Navigate to="/login" />;

  return (
    <div className="dashboard">
      <AuthProvider user={_user}>
        <div>
          <div>nav</div> {/* TODO: créer un composant Nav */}
          <Element />
        </div>
      </AuthProvider>
    </div>
  );
}
