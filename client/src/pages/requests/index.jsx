import React from "react";
import Container from "react-bootstrap/Container";

import { useAuth } from "@hooks/auth";

const AdminRequests = React.lazy(() => import("@pages/requests/AdminRequests"));
const UserRequests = React.lazy(() => import("@pages/requests/UserRequests"));

export default function CommunicationRequests() {
  const {
    user: { isAdmin },
  } = useAuth();

  return (
    <Container>
      <h1 className="mb-4">Demandes de communication</h1>
      <React.Suspense fallback="Chargement...">
        {isAdmin ? <AdminRequests /> : <UserRequests />}
      </React.Suspense>
    </Container>
  );
}
