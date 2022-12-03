import React from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function UserRequests() {
  return (
    <Container>
      <h2>Contacter un conseiller</h2>
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
        <p className="m-0">Pas de conseiller disponible ?</p>
        &nbsp;
        <Link to="/chatbot">Consulter le ChatBot</Link>
      </div>
    </Container>
  );
}
