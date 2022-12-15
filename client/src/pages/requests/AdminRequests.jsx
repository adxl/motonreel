import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/esm/Row";
import Table from "react-bootstrap/esm/Table";
import { Link } from "react-router-dom";

import { update } from "@api/advisors";
import { getAdvisors } from "@api/advisors";
import { getRequests, updateRequest } from "@api/commRequests";
import { getRendezVous } from "@api/rendezVous";
import { useAlert } from "@hooks/alert";
import { useAuth } from "@hooks/auth";

const tdStyle = {
  verticalAlign: "middle",
};

export default function AdminRequests() {
  const { user, token, refreshUser } = useAuth();
  const { alertError } = useAlert();

  const [_advisors, setAdvisors] = React.useState([]);
  const [_requests, setRequests] = React.useState([]);
  const [_reservations, setReservations] = React.useState([]);

  const optionsDate = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const loadRequests = () =>
    getRequests(token).then(({ data: requests }) => {
      setRequests(requests);
    });

  const loadRendezVous = () =>
    getRendezVous(token)
      .then(({ data: reservations }) => {
        setReservations(reservations);
      })
      .catch((err) => {
        console.log(err);
        alertError("Impossible de récupérer les rendez-vous");
      });

  React.useEffect(() => {
    getAdvisors(token).then(({ data: advisors }) => {
      setAdvisors(advisors);
    });
    loadRequests();
    loadRendezVous();
  }, []);

  function handleChangeStatus(id, status) {
    if (status === "Accepter") {
      updateRequest(id, "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c", token).then(
        () => loadRequests()
      );
    } else {
      updateRequest(id, "342fc969-aa8f-486c-88b4-821042a01640", token).then(
        () => loadRequests()
      );
    }
  }

  function handleChangeDisponibility() {
    update(user.id, !user.disponibility, token).then(() => refreshUser());
  }

  function formatDisponibility(disponibility) {
    return disponibility ? "Disponible" : "Indisponible";
  }

  return (
    <Container>
      <Row>
        <Col xs="12" className="mb-4">
          <Card>
            <Card.Body>
              <h2>Conseillers</h2>
              <div className="d-flex align-items-center justify-content-end mb-4 ">
                <p className="m-0 text-nowrap">Mon status :</p>
                &nbsp;
                <Button
                  type="button"
                  onClick={handleChangeDisponibility}
                  variant={user.disponibility ? "success" : "secondary"}
                >
                  {formatDisponibility(user.disponibility)}
                </Button>
              </div>
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
                      <td>{advisor.name}</td>
                      <td>{formatDisponibility(advisor.disponibility)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col xs="12" className="mb-4">
          <Card>
            <Card.Body>
              <h2>Mes demandes</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Client</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {_requests.map((request) => (
                    <tr key={request.id}>
                      <td style={tdStyle}>{request.clientUser.name}</td>
                      <td style={tdStyle}>{request.requestStatus.name}</td>
                      {request.status ===
                        "a57014e4-19bd-471c-979a-1c77cc16ad4a" && (
                        <td style={tdStyle}>
                          <Button
                            variant="success"
                            type="button"
                            onClick={() => {
                              handleChangeStatus(request.id, "Accepter");
                            }}
                          >
                            Accepter
                          </Button>
                          <Button
                            variant="danger"
                            type="button"
                            onClick={() => {
                              handleChangeStatus(request.id, "Refuser");
                            }}
                          >
                            Refuser
                          </Button>
                        </td>
                      )}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2>Prochains rendez-vous</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Client</th>
                  </tr>
                </thead>
                <tbody>
                  {_reservations
                    .sort((a, b) =>
                      a.rdvType.name.localeCompare(b.rdvType.name)
                    )
                    .map((reservation) => (
                      <tr key={reservation.id}>
                        <td style={tdStyle}>
                          {new Date(reservation.date).toLocaleDateString(
                            "fr",
                            optionsDate
                          )}
                        </td>
                        <td style={tdStyle}>{reservation.rdvType.name}</td>
                        <td style={tdStyle}>{reservation.rdvClient.name}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
