import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { sendNotification } from "@api/notifications";
import { useAuth } from "@hooks/auth";

export default function Notification() {
  const { token } = useAuth();
  const [_message, setMessage] = React.useState("");

  const inputRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener("keyup", focusInput);
    return () => {
      document.removeEventListener("keyup", focusInput);
    };
  }, []);

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendNotification(_message, token).then(() => {
      setMessage("");
    });
  }

  function focusInput(e) {
    if (e.key === "/") {
      inputRef.current.focus();
    }
  }

  return (
    <div className="fixed-bottom p-2" style={{ width: 800 }}>
      <Card className="p-1">
        <Card.Body>
          <Form onSubmit={handleSubmit} className="d-flex align-items-center">
            <InputGroup>
              <InputGroup.Text>/all</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tapez '/' pour envoyer un message général"
                value={_message}
                ref={inputRef}
                onChange={handleMessageChange}
              />
            </InputGroup>
            <Button type="submit" variant="primary">
              Envoyer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
