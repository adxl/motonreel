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
    return disponibility ? "Disponible" : "Non Disponible";
  }

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h2>Conseillers</h2>
              <div className="d-flex align-items-center">
                <p className="m-0">
                  Mon status : {formatDisponibility(user.disponibility)}
                </p>
                &nbsp;
                <Button type="button" onClick={handleChangeDisponibility}>
                  Changer
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
                  {advisors.map((advisor) => (
                    <tr key={advisor.id}>
                      <td>{advisor.name}</td>
                      <td>
                        {advisor.disponibility
                          ? "Disponible"
                          : "Non Disponible"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col>
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
                  {requests.map((request) => (
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
    </Container>
  );
}
