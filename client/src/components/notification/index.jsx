import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

import { sendNotification } from "@api/notifications";
import { useAuth } from "@hooks/auth";

export default function Notification() {
  const { token } = useAuth();
  const [_message, setMessage] = React.useState("");

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendNotification(_message, token).then(() => {
      setMessage("");
    });
  }

  return (
    <div className="fixed-bottom p-2" style={{ width: 500 }}>
      <Card className="p-1">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="/all : Message aux utilisateurs"
              value={_message}
              onChange={handleMessageChange}
            />
            <Button type="submit" variant="primary">
              Envoyer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
