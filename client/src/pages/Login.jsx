import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
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
  const [_errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setErrorMessage(null);
  }, [_passwordInput, _emailInput]);

  function handleEmailChange(event) {
    setEmailInput(event.target.value);
  }

  function handlePasswordChange(event) {
    setPasswordInput(event.target.value);
  }

  function handleLogin(event) {
    event.preventDefault();
    if (!(_emailInput && _passwordInput)) return;

    login(_emailInput, _passwordInput).catch((error) => {
      setErrorMessage(error.message);
    });
  }

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <h1 className="mb-5">Connexion</h1>
      {_errorMessage && <Alert variant="danger">{_errorMessage}</Alert>}
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
