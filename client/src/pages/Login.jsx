import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "@hooks/auth";

export default function Login() {
  const { login, token } = useAuth();

  const [_emailInput, setEmailInput] = useState("");
  const [_passwordInput, setPasswordInput] = useState("");
  const [_loginInvalid, setLoginInvalid] = useState(false);

  useEffect(() => {
		setLoginInvalid(false);
  }, [_passwordInput, _emailInput]);

  function handleEmailChange(event) {
    setEmailInput(event.target.value);
  }

  function handlePasswordChange(event) {
    setPasswordInput(event.target.value);
  }

  async function handleLogin(event) {
    event.preventDefault();
    const isLogged = await login(_emailInput, _passwordInput);
    if(!isLogged) {
      console.log('info incorect');
      setLoginInvalid(true);
    }
  }

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      { _loginInvalid && <Alert key="danger" variant="danger">Vos identifiants sont incorrects</Alert> }
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
