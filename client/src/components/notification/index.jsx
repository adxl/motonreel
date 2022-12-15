import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { sendNotification } from "@api/notifications";
import { useAuth } from "@hooks/auth";

const divStyle = {
  width: "500px",
};

export default function Notification() {
  const { token } = useAuth();
  const [_message, setMessage] = React.useState("");

  function handleMessageChange(event) {
    setMessage(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    sendNotification(_message, token);
  }

  return (
    <div className="fixed-bottom" style={divStyle}>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-5">
              <Col xs={8}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Message aux utilisateurs"
                    value={_message}
                    onChange={handleMessageChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Button type="submit" variant="primary">
                  Envoyer
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
