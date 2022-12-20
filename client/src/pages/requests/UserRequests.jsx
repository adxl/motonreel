import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getAdvisors } from "@api/advisors";
import { createRequest, getRequests } from "@api/commRequests";
import { getUserRendezVous } from "@api/rendezVous";
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
  const [_reservations, setReservations] = React.useState([]);

  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const loadAdvisors = () =>
    getAdvisors(token)
      .then(({ data: advisors }) => {
        setAdvisors(advisors);
      })
      .catch(() => {
        alertError("Impossible de récupérer les conseillers");
      });

  const loadRendezVous = () =>
    getUserRendezVous(token)
      .then(({ data: reservations }) => {
        setReservations(reservations);
      })
      .catch(() => {
        alertError("Impossible de récupérer les rendez-vous");
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
    loadRendezVous();
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
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2>Contacter un conseiller</h2>
              {_advisors.length ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {_advisors.map((advisor) => (
                      <tr key={advisor.id}>
                        <td style={tdStyle}>{advisor.name}</td>
                        <td style={tdStyle}>Disponible</td>
                        <td style={tdStyle}>
                          <Button
                            className="text-nowrap"
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
              ) : (
                <p>Aucun conseiller disponible</p>
              )}
              <div className="d-flex align-items-center">
                <p className="m-0">Pas de conseiller disponible ?</p>
                &nbsp;
                <Link to="/chatbot">Consulter le ChatBot</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <h2>Mes demandes</h2>
              {_requests.length > 0 && (
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
                        {request.status ===
                          "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c" && (
                          <td style={tdStyle}>
                            <Link to={`/requests/${request.id}`}>
                              Accéder au tchat
                            </Link>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Mes prochains rendez-vous</h2>

          {_reservations.length ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {_reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td style={tdStyle}>
                      {new Date(reservation.date).toLocaleDateString(
                        "fr",
                        optionsDate
                      )}
                    </td>
                    <td style={tdStyle}>{reservation.rdvType.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>Aucune reservations en cours</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}
