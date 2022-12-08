import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getAdvisors } from "@api/advisors";
import { useAuth } from "@hooks/auth";

export default function UserRequests() {
  const { token } = useAuth();

  const [_advisors, setAdvisors] = useState([]);

  useEffect(() => {
    getAdvisors(token).then(({ data: advisors }) => {
      setAdvisors(advisors);
    });
  }, []);

  return (
    <Container>
      <h2>Contacter un conseiller</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {_advisors.map((advisor) => (
            <tr key={advisor.id}>
              <td className="text-capitalize">{advisor.name} </td>
              <td>
                <Button variant="success">Contacter</Button>
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
  );
}
