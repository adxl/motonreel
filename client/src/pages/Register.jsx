import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, redirect } from "react-router-dom";

import { register } from "@api/auth";
import { useAuth } from "@hooks/auth";

export default function Login() {
  const { token } = useAuth();

  const [_nameInput, setNameInput] = useState("");
  const [_emailInput, setEmailInput] = useState("");
  const [_passwordInput, setPasswordInput] = useState("");
  const [_secondPasswordInput, setSecondPasswordInput] = useState("");

  function handleNameChange(event) {
    setNameInput(event.target.value);
  }
  function handleEmailChange(event) {
    setEmailInput(event.target.value);
  }

  function handlePasswordChange(event) {
    setPasswordInput(event.target.value);
  }

  function handleSecondPasswordChange(event) {
    setSecondPasswordInput(event.target.value);
  }

  function handleRegister(event) {
    event.preventDefault();
    if (_passwordInput !== _secondPasswordInput) {
      return;
    }
    debugger;
    register(_nameInput, _emailInput, _passwordInput);
  }

  useEffect(() => {
    if (token) redirect("/");
  }, [token]);

  return (
    <Container>
      <h1 className="mb-5">Inscription</h1>
      <Form onSubmit={handleRegister}>
        <Row className="mb-5">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Nom"
              value={_nameInput}
              onChange={handleNameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              value={_emailInput}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              className="mb-2"
              placeholder="Mot de passe"
              value={_passwordInput}
              onChange={handlePasswordChange}
            />
            <Form.Control
              type="password"
              placeholder="Confirmer le mot de passe"
              value={_secondPasswordInput}
              onChange={handleSecondPasswordChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary">
          S&apos;inscrire
        </Button>
        <div className="mt-2 d-flex justify-content-center align-items-center">
          <span>Vous avez déjà un compte ?</span>
          <Link to="/login">&nbsp;Se connecter</Link>
        </div>
      </Form>
    </Container>
  );
}
