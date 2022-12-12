import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { Link, redirect, useParams } from "react-router-dom";

import { updateRequest } from "@api/commRequests";
import ChatContainer from "@components/chat";
import { useAuth } from "@hooks/auth";

export default function RequestChat() {
  const { token } = useAuth();
  const { requestId } = useParams();

  async function handleCloseRequest() {
    await updateRequest(
      requestId,
      "770fbb69-658a-4dc9-b5ed-26ae596793a7",
      token
    );
    return redirect("/requests");
  }

  return (
    <Container>
      <ChatContainer recipient="{{request.advisor.name}}"></ChatContainer>
      <hr />
      <Link to="/requests">Retour</Link>
      <Button variant="info" type="button" onClick={handleCloseRequest}>
        Terminer la discussion
      </Button>
    </Container>
  );
}
