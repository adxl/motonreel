import React from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import { Link, Navigate, useParams } from "react-router-dom";

import { updateRequest } from "@api/commRequests";
import { getRequest } from "@api/commRequests";
import ChatContainer from "@components/chat";
import { useAuth } from "@hooks/auth";

export default function RequestChat() {
  const { user } = useAuth();
  const { requestId } = useParams();
  const [_request, setRequest] = React.useState({});
  const [_isLoaded, setIsLoaded] = React.useState(false);

  useEffect(() => {
    getRequest(requestId, user.token).then(({ data: request }) => {
      setRequest(request);
      setIsLoaded(true);
    });
  });

  function handleCloseRequest() {
    updateRequest(
      requestId,
      "770fbb69-658a-4dc9-b5ed-26ae596793a7",
      user.token
    );
    location.href = "/requests";
  }

  if (_isLoaded && _request.status !== "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c") {
    return <Navigate to="/requests" />;
  }

  return (
    <Container>
      {_isLoaded && (
        <ChatContainer
          recipient={
            user.isAdmin ? _request.clientUser.name : _request.advisorUser.name
          }
        ></ChatContainer>
      )}
      <hr />
      <Link to="/requests">Retour</Link>
      {user.isAdmin && (
        <Button variant="info" type="button" onClick={handleCloseRequest}>
          Terminer la discussion
        </Button>
      )}
    </Container>
  );
}
