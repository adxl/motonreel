import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import { useAuth } from "@hooks/auth";

export default function AdminRequests() {
  const { user } = useAuth();

  function handleChangeDisponibility() {
    alert("marche pas lol");
  }

  function formatDisponibility(disponibility) {
    return disponibility ? "Disponible" : "Non Disponible";
  }

  return (
    <Container>
      <h2>Conseillers</h2>
      <table className="mb-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John </td>
            <td>Oui</td>
          </tr>

          <tr>
            <td>Marie </td>
            <td>Oui</td>
          </tr>
          <tr>
            <td>Carl</td>
            <td>Non</td>
          </tr>
        </tbody>
      </table>
      <div className="d-flex align-items-center">
        <p className="m-0">
          Mon status : {formatDisponibility(user.disponibility)}
        </p>
        &nbsp;
        <Button type="button" onClick={handleChangeDisponibility}>
          Changer
        </Button>
      </div>

      <h2>Mes demandes</h2>
      <table className="mb-3">
        <thead>
          <tr>
            <th>Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tony</td>
            <td>
              <Button variant="success" type="button">
                Accepter
              </Button>
              <Button variant="danger" type="button">
                Refuser
              </Button>
            </td>
          </tr>

          <tr>
            <td>Jim </td>
            <td>
              <Button variant="success" type="button" className="">
                Accepter
              </Button>
              <Button variant="danger" type="button">
                Refuser
              </Button>
            </td>
          </tr>
          <tr>
            <td>Sarah</td>
            <td>
              <Button variant="success" type="button">
                Accepter
              </Button>
              <Button variant="danger" type="button">
                Refuser
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
