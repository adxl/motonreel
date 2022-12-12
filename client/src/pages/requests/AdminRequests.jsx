import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/esm/Table";
import { Link } from "react-router-dom";

import { update } from "@api/advisors";
import { getAdvisors } from "@api/advisors";
import { getRequests } from "@api/commRequests";
import { useAuth } from "@hooks/auth";

const tdStyle = {
  verticalAlign: "middle",
};

export default function AdminRequests() {
  const { user, token, refreshUser } = useAuth();

  const [advisors, setAdvisors] = React.useState([]);
  const [requests, setRequests] = React.useState([]);

  const loadRequests = () =>
    getRequests(token).then(({ data: requests }) => {
      setRequests(requests);
    });

  React.useEffect(() => {
    getAdvisors(token).then(({ data: advisors }) => {
      setAdvisors(advisors);
    });
    loadRequests();
  }, []);

  function handleChangeDisponibility() {
    update(user.id, !user.disponibility, token).then(() => refreshUser());
  }

  function formatDisponibility(disponibility) {
    return disponibility ? "Disponible" : "Non Disponible";
  }

  return (
    <Container>
      <h2>Conseillers</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {advisors.map((advisor) => (
            <tr key={advisor.id}>
              <td>{advisor.name}</td>
              <td>{advisor.disponibility ? "Disponible" : "Non Disponible"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Client</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td style={tdStyle}>{request.clientUser.name}</td>
              <td style={tdStyle}>{request.requestStatus.name}</td>
              {request.status === "a57014e4-19bd-471c-979a-1c77cc16ad4a" && (
                <td style={tdStyle}>
                  <Button variant="success" type="button">
                    Accepter
                  </Button>
                  <Button variant="danger" type="button">
                    Refuser
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
