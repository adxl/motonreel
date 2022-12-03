import React from "react";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";

import ChatContainer from "@components/chat";
import { useAuth } from "@hooks/auth";

export default function ForumDetails() {
  const { topicId } = useParams;

  const {
    user: { isAdmin },
  } = useAuth();

  return (
    <Container>
      <h1>Discussion</h1>
      <p>Référence de la discussion : {topicId}</p>
      <p>Sujet de la discussion : -</p>

      <ChatContainer recipient={"sujet du salon"}></ChatContainer>

      {isAdmin && <Link to={`/forum/${topicId}/edit`}>Modifier le salon</Link>}

      <hr />
      <Link to="/forum">Retour au forum</Link>
    </Container>
  );
}
