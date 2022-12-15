import React from "react";
import { Navigate } from "react-router-dom";

import Nav from "@components/nav";
import Notification from "@components/notification";
import { useAuth } from "@hooks/auth";

export default function ProtectedRoute({ el: Element, requireAdmin }) {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Nav />
      <Element />
      {user.isAdmin && <Notification />}
    </>
  );
}
