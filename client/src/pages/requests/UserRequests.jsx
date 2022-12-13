import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getAdvisors } from "@api/advisors";
import { createRequest, getRequests } from "@api/commRequests";
import { useAlert } from "@hooks/alert";
import { useAuth } from "@hooks/auth";
const tdStyle = {
  verticalAlign: "middle",
};

export default function UserRequests() {
  const { token } = useAuth();
  const { alertError, alertSuccess } = useAlert();

  const [_advisors, setAdvisors] = React.useState([]);
  const [_requests, setRequests] = React.useState([]);

  const loadAdvisors = () =>
    getAdvisors(token)
      .then(({ data: advisors }) => {
        setAdvisors(advisors);
      })
      .catch(() => {
        alertError("Impossible de récupérer les conseillers");
      });

  const loadRequests = () =>
    getRequests(token)
      .then(({ data: requests }) => {
        setRequests(requests);
      })
      .catch(() => {
        alertError("Impossible de récupérer les demandes");
      });

  React.useEffect(() => {
    loadAdvisors();
    loadRequests();
  }, []);

  const handleRequest = (advisor) => {
    createRequest(advisor, token)
      .then(() => {
        loadAdvisors();
        loadRequests();
        alertSuccess("Demande envoyée !");
      })
      .catch(() => {
        return alertError("Une erreur est survenue");
      });
  };

  return (
    <Container>
      <h2>Contacter un conseiller</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {_advisors.map((advisor) => (
            <tr key={advisor.id}>
              <td style={tdStyle}>{advisor.name}</td>
              <td style={tdStyle}>Disponible</td>
              <td style={tdStyle}>
                <Button
                  onClick={() => {
                    handleRequest(advisor.id);
                  }}
                >
                  Envoyer une demande
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex align-items-center">
        <p className="m-0">Pas de conseiller disponible ?</p>
        &nbsp;
        <Link to="/chatbot">Consulter le ChatBot</Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {_requests.map((request) => (
            <tr key={request.id}>
              <td style={tdStyle}>{request.advisorUser.name}</td>
              <td style={tdStyle}>{request.requestStatus.name}</td>
              <td style={tdStyle}>
                {request.status === "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c" && (
                  <Link to={`/requests/${request.id}`}>Accéder tchat</Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
