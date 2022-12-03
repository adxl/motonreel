import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "@hooks/auth";

export default function Login() {
  const { login, token } = useAuth();

  const [_emailInput, setEmailInput] = useState("");
  const [_passwordInput, setPasswordInput] = useState("");

  function handleEmailChange(event) {
    setEmailInput(event.target.value);
  }

  function handlePasswordChange(event) {
    setPasswordInput(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    login(_emailInput, _passwordInput);
  }

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <h1 className="mb-5">Connexion</h1>
      <Form onSubmit={handleLogin}>
        <Row className="mb-5">
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
              placeholder="Mot de passe"
              value={_passwordInput}
              onChange={handlePasswordChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" variant="primary">
          Se connecter
        </Button>
        <div className="mt-2 d-flex justify-content-center align-items-center">
          <span>Vous n&apos;avez pas de compte ?&nbsp;</span>
          <Link to="/register">S&apos;inscrire</Link>
        </div>
      </Form>
    </Container>
  );
}
