import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Question from "./Question";

export default function TextQuestion({ title, onAnswer }) {
  const [_input, setInput] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleInputChange(event) {
    setInput(event.target.value);
  }

  function handleAnswer(event) {
    event.preventDefault();
    onAnswer(_input);
    setInput("");
  }

  return (
    <Question title={title}>
      <Form onSubmit={handleAnswer}>
        <div className="d-flex align-items-center">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Entrez votre réponse"
              value={_input}
              ref={inputRef}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Envoyer
          </Button>
        </div>
      </Form>
    </Question>
  );
}
