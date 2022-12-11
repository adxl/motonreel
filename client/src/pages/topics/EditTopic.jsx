import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useParams } from "react-router-dom";

import { getSalon, updateSalon } from "@api/salon";
import { useAuth } from "@hooks/auth";

export default function ForumEditor() {
  const [_errorMessage, setErrorMessage] = useState("");
  const [_successMessage, setSuccessMessage] = useState("");
  const [_isLoaded, setIsLoaded] = useState(false);

  const { token } = useAuth();
  const { topicId } = useParams();
  const [_salon, setSalon] = useState({});

  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
  }, [_salon]);

  useEffect(() => {
    getSalon(topicId, token).then((salon) => {
      setSalon(salon.data);
      setIsLoaded(true);
    });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSalon((values) => ({ ...values, [name]: value }));
  };

  function handleTopicEdit(event) {
    event.preventDefault();
    if (!(_salon.name && _salon.userSize)) return;

    if (isNaN(_salon.userSize) || parseInt(_salon.userSize) <= 0) {
      setErrorMessage(
        "La capacité du salon doit être un nombre et supérieur à zéro"
      );
      return;
    }

    updateSalon(topicId, _salon, token)
      //TODO add checking of numbers of users actively in chat before update */

      .then(({ data: data }) => {
        setSuccessMessage(data.message);
        setSalon(_salon);
        console.log(data);
      })
      .catch(({ err: err }) => {
        setErrorMessage(err.message);
      });
  }

  if (!_isLoaded) return "Chargement..";
  else
    return (
      <Container>
        {_errorMessage && <Alert variant="danger">{_errorMessage}</Alert>}
        {_successMessage && <Alert variant="success">{_successMessage}</Alert>}
        <h1>Modifier la discussion</h1>
        <Form onSubmit={handleTopicEdit}>
          <Row>
            <Form.Group className="mb-3">
              <Form.Label>Nom du salon</Form.Label>
              <Form.Control
                type="text"
                value={_salon.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sa capacité</Form.Label>
              <Form.Control
                type="number"
                name="userSize"
                value={_salon.userSize}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
        <Link to="/forum">Retour au forum</Link>
      </Container>
    );
}
