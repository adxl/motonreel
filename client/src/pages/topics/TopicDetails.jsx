import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams } from "react-router-dom";

import { getSalon } from "@api/salon";
import ChatContainer from "@components/chat";
import { useAuth } from "@hooks/auth";
import { NAMESPACE_SALONS } from "@hooks/chat";

export default function ForumDetails() {
  const { topicId } = useParams();
  const { user, token } = useAuth();

  const [_salon, setSalon] = useState();
  const [_messages, setMessages] = useState([]);
  const [_loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadSalon();
  }, []);

  function loadSalon() {
    getSalon(topicId, token).then(({ data: salon }) => {
      setSalon(salon);
      setMessages(salon.Messages);
      setLoaded(true);
    });
  }

  if (!_loaded) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Discussion</h1>
      <ChatContainer
        domain={NAMESPACE_SALONS}
        recipient={_salon.name}
        roomId={_salon.id}
        roomSize={_salon.userSize}
        onReload={loadSalon}
        messages={_messages}
      />
      <hr />
      <div className="mb-3">
        {user.isAdmin && (
          <Link to={`/forum/${topicId}/edit`}>Modifier le salon</Link>
        )}
      </div>

      <div>
        <Link to="/forum">Retour au forum</Link>
      </div>
    </Container>
  );
}
