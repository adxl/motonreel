import React, { useEffect, useRef } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { useAuth } from "@hooks/auth";
import { SocketProvider, useSocket } from "@hooks/chat";

export default function ChatContainer({
  domain,
  recipient,
  roomId,
  roomSize,
  messages,
  onReload,
}) {
  return (
    <SocketProvider
      namespace={domain}
      roomId={roomId}
      roomSize={roomSize}
      onReload={onReload}
    >
      <div className="mb-5">
        <h2>
          <strong>{recipient}</strong>
        </h2>
      </div>
      <ChatConversation messages={messages} />
    </SocketProvider>
  );
}

function ChatConversation({ messages }) {
  const messageInput = useRef();
  const conversationEnd = useRef();

  const { user } = useAuth();
  const { sendMessage } = useSocket();

  function emptyInput() {
    messageInput.current.value = "";
  }

  function focusInput() {
    messageInput.current.focus();
  }

  function handleSendMessage(e) {
    e.preventDefault();

    const message = messageInput.current.value;
    sendMessage(message);

    emptyInput();
    focusInput();
  }

  useEffect(() => {
    focusInput();
  }, []);

  useEffect(() => {
    if (conversationEnd?.current) {
      conversationEnd.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div>
      <div className="mb-5 chat-area">
        {messages.map(({ id, content, senderUser }) => (
          <div key={id} className="mb-2">
            {senderUser.id === user.id ? (
              <div className="d-flex justify-content-end">
                <Badge pill bg="primary" className="p-2">
                  {content}
                </Badge>
              </div>
            ) : (
              <div className="d-flex justify-content-start">
                <div className="d-flex flex-column">
                  <span className="text-muted">{senderUser.name}</span>
                  <Badge pill bg="secondary" className="p-2">
                    {content}
                  </Badge>
                </div>
              </div>
            )}
          </div>
        ))}
        <div ref={conversationEnd} />
      </div>
      <Form onSubmit={handleSendMessage} className="w-100 framed-top">
        <Container
          fluid
          className="d-flex align-items-end justify-content-between px-0"
        >
          <Form.Group className="m-0 w-100">
            <Form.Control
              className="w-100 square border-0 bg-3"
              required
              placeholder="Message..."
              ref={messageInput}
              type="text"
            />
          </Form.Group>
          <Button type="submit" className="square">
            Envoyer
          </Button>
        </Container>
      </Form>
    </div>
  );
}
