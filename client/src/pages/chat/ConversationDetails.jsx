import React, { useState } from "react";
import { useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link, useParams } from "react-router-dom";

import { createPrivateChat, getPrivateChat } from "@api/privateChat";
import ChatContainer from "@components/chat";
import { useAuth } from "@hooks/auth";
import { NAMESPACE_PRIVATE } from "@hooks/chat";

export default function ConversationsDetails() {
  const { secUserId } = useParams();
  const { token } = useAuth();

  const [_privateChat, setPrivateChat] = useState();
  const [_secUser, setSecUser] = useState();
  const [_messages, setMessages] = useState([]);
  const [_isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getPrivateChat(secUserId, token)
      .then(({ data: privateChat }) => {
        setup(privateChat);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          createPrivateChat(secUserId, token)
            .then(({ data: privateChat }) => {
              setup(privateChat);
            })
            .catch((err) => console.log(err));
        }
      });
  }, []);

  function setup(privateChat) {
    setPrivateChat(privateChat);
    setMessages(privateChat.Messages);
    setSecondUser(privateChat);
    setIsLoaded(true);
  }

  function setSecondUser(privateChat) {
    setSecUser(
      privateChat.firstUser.id === secUserId
        ? privateChat.firstUser
        : privateChat.secondUser
    );
  }

  async function loadPrivateMessages() {
    return new Promise((resolve) => {
      getPrivateChat(secUserId, token).then(({ data: privateChat }) => {
        setup(privateChat);
        resolve();
      });
    });
  }

  if (!_isLoaded) {
    return <Spinner animation="border" />;
  }

  return (
    <div>
      <ChatContainer
        recipient={_secUser.name}
        domain={NAMESPACE_PRIVATE}
        onReload={loadPrivateMessages}
        messages={_messages}
        roomId={_privateChat.id}
      />
      <Link to="/chat">Retour à mes conversations</Link>
    </div>
  );
}
