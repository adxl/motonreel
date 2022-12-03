import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";

import { useAuth } from "@hooks/auth";

export default function Logout() {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Container>
      <p>Vous vous êtes bien déconnecté</p>
    </Container>
  );
}
