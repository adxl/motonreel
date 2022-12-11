import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

import { createSalon } from "@api/salon";
import { useAuth } from "@hooks/auth";

export default function ForumCreator() {
  const { token } = useAuth();

  const [_nameInput, setNameInput] = useState("");
  const [_userSizeInput, setUserSize] = useState("");

  const [_errorMessage, setErrorMessage] = useState();
  const [_successMessage, setSuccessMessage] = useState();

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [_nameInput, _userSizeInput]);

  function handleNameChange(event) {
    setNameInput(event.target.value);
  }
  function handleUserSizeChange(event) {
    setUserSize(event.target.value);
  }

  function handleCreateForum(event) {
    event.preventDefault();
    if (!_nameInput || !_userSizeInput) return;

    if (isNaN(_userSizeInput) || parseInt(_userSizeInput) <= 0) {
      setErrorMessage(
        "La capacité du salon doit être un nombre et supérieur à zéro"
      );
      return;
    }

    createSalon(_nameInput, _userSizeInput, token)
      .then(({ data: data }) => {
        setSuccessMessage(data.message);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <Container>
      <h1>Créer une discussion</h1>
      {_errorMessage && <Alert variant="danger">{_errorMessage}</Alert>}
      {_successMessage && <Alert variant="success">{_successMessage}</Alert>}
      <Form onSubmit={handleCreateForum}>
        <Row className="mb-5">
          <Form.Group className="mb-3">
            <Form.Label>Nom du Forum</Form.Label>
            <Form.Control
              type="text"
              placeholder="Gang des scooters"
              value={_nameInput}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Capacité du salon</Form.Label>
            <Form.Control
              type="number"
              placeholder="50"
              value={_userSizeInput}
              onChange={handleUserSizeChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary">
          Créer le salon
        </Button>
      </Form>
      <Link to="/forum">Retour au forum</Link>
    </Container>
  );
}
