import React from "react";
import { Navigate } from "react-router-dom";

import Nav from "@components/nav";
import { useAuth } from "@hooks/auth";

export default function ProtectedRoute({ el: Element }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return (
    <>
      <Nav />
      <Element />
    </>
  );
}
