import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useParams } from "react-router-dom";

import { getSalon, updateSalon } from "@api/salon";
import { useAlert } from "@hooks/alert";
import { useAuth } from "@hooks/auth";

export default function ForumEditor() {
  const [_isLoaded, setIsLoaded] = useState(false);

  const { token } = useAuth();
  const { alertError, alertSuccess } = useAlert();
  const { topicId } = useParams();
  const [_salon, setSalon] = useState({});

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
    if (!(_salon.name && _salon.userSize))
      return alertError("Des champs sont manquants");

    if (isNaN(_salon.userSize) || parseInt(_salon.userSize) <= 0) {
      alertError(
        "La capacité du salon doit être un nombre et supérieur à zéro"
      );
      return;
    }

    updateSalon(topicId, _salon, token)
      //TODO add checking of numbers of users actively in chat before update */

      .then(({ data: data }) => {
        alertSuccess(data.message);
        setSalon(_salon);
        console.log(data);
      })
      .catch(({ err: err }) => {
        alertError(err.message);
      });
  }

  if (!_isLoaded) return "Chargement..";
  else
    return (
      <Container>
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
          <Button variant="primary" type="submit" className="mb-5">
            Modifier
          </Button>
        </Form>
        <Link to="/forum">Retour au forum</Link>
      </Container>
    );
}
