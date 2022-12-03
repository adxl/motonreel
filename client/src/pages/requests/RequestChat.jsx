import React from "react";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";

import ChatContainer from "@components/chat";

export default function RequestChat() {
  const { requestId } = useParams();

  return (
    <Container>
      <ChatContainer recipient="{{request.advisor.name}}"></ChatContainer>
      <hr />
      <Link to="/requests">Retour</Link>
    </Container>
  );
}
