import React from "react";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { useAuth } from "@hooks/auth";

import { getAdvisors } from "../../api/advisors";
import { createRequest, getRequests } from "../../api/commRequests";

const tdStyle = {
  verticalAlign: "middle",
};

export default function UserRequests() {
  const { token } = useAuth();
  const [_advisors, setAdvisors] = React.useState([]);
  const [_requests, setRequests] = React.useState([]);

  const [_alertMessage, setAlertMessage] = React.useState("");
  const [_alertVariant, setAlertVariant] = React.useState("success");
  const [_showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    getAdvisors(token).then((advisors) => {
      setAdvisors(advisors.data);
    });
    getRequests(token).then((requests) => {
      setRequests(requests.data);
    });
  }, []);

  const handleRequest = (advisor) => {
    createRequest(advisor, token).then((response) => {
      if (response.status === 201) {
        setAdvisors((advisors) => {
          advisors.filter((removeAdvisor) => removeAdvisor.id !== advisor.id);
        });
        onShowAlert("Votre demande a été envoyée", "success");
      } else {
        onShowAlert("Une erreur est survenue", "danger");
      }
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
            {_advisors !== undefined &&
              _advisors.map((advisor) => {
                if (
                  _requests.find(
                    (request) =>
                      request.advisor !== advisor.id ||
                      (request.status !==
                        "a57014e4-19bd-471c-979a-1c77cc16ad4a" &&
                        request.status !==
                          "23fb3b0e-c5bd-4dc3-b186-60be4987fd7c")
                  ) ||
                  _requests.length === 0
                ) {
                  return (
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
                  );
                }
              })}
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
