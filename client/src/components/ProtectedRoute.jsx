import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "@hooks/auth";

export default function ProtectedRoute({ el: Element }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  return (
    <div className="dashboard">
      <div>
        <div>nav</div> {/* TODO: créer un composant Nav */}
        <Element />
      </div>
    </div>
  );
}
