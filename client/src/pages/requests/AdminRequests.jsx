import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getAdvisors } from "@api/advisors";
import { useAuth } from "@hooks/auth";

export default function AdminRequests() {
  const { user, token } = useAuth();

  const [_advisors, setAdvisors] = useState([]);

  useEffect(() => {
    getAdvisors(token).then(({ data: advisors }) => {
      setAdvisors(advisors);
    });
  }, []);

  function handleChangeDisponibility() {
    alert("marche pas lol");
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
            <th>Prénom</th>
            <th>Disponibilité</th>
          </tr>
        </thead>
        <tbody>
          {_advisors.map((advisor) => (
            <tr key={advisor.id}>
              <td className="text-capitalize">{advisor.name} </td>
              <td>{formatDisponibility(advisor.disponibility)}</td>
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
