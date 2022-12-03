import React from "react";
import Container from "react-bootstrap/Container";
import { Link, useParams } from "react-router-dom";

export default function ForumEditor() {
  const { topicId } = useParams;

  return (
    <Container>
      <h1>Modifier la discussion</h1>
      <p>Référence de la discussion : {topicId}</p>
      <Link to="/forum">Retour au forum</Link>
    </Container>
  );
}
