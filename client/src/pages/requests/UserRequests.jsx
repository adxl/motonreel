import React from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getAdvisors } from "@api/advisors";
import { createRequest } from "@api/commRequests";
import { useAuth } from "@hooks/auth";

const tdStyle = {
  verticalAlign: "middle",
};

export default function UserRequests() {
  const { token } = useAuth();
  const [_advisors, setAdvisors] = React.useState([]);

  const loadAdvisors = () =>
    getAdvisors(token)
      .then(({ data: advisors }) => {
        setAdvisors(advisors);
      })
      .catch(() => {
        onShowAlert("", "danger");
      });

  const [_alertMessage, setAlertMessage] = React.useState("");
  const [_alertVariant, setAlertVariant] = React.useState("success");
  const [_showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    loadAdvisors();
  }, []);

  const handleRequest = (advisor) => {
    createRequest(advisor, token)
      .then(() => {
        loadAdvisors();
      })
      .catch(() => {
        onShowAlert("Une erreur est survenue", "danger");
      });
  };

  const onShowAlert = (message, variant) => {
    setAlertMessage(message);
    setAlertVariant(variant);

    setShowAlert(true, () => {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    });
  };

  return (
    <>
      <Alert variant={_alertVariant} show={_showAlert}>
        {_alertMessage}
      </Alert>
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
      </Container>
    </>
  );
}
