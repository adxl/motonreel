import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { getSalons } from "@api/salon";
import { useAuth } from "@hooks/auth";

export default function Forum() {
  const { token } = useAuth();
  const [_salons, setSalons] = useState([]);

  const {
    user: { isAdmin },
  } = useAuth();

  useEffect(() => {
    getSalons(token).then((salons) => {
      setSalons(salons.data);
    });
  }, []);

  return (
    <>
      <h1>Bienvenue dans le forum</h1>

      {isAdmin && <Link to="/forum/new">Ouvrir une nouvelle discussion</Link>}
      {isAdmin && <hr />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Forum</th>
            <th>Limites de personnes</th>
            <th>Message au total</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {_salons.map((topic) => (
            <tr key={topic.id}>
              <td>
                <Link to={`/forum/${topic.id}`}>{topic.name}</Link>
              </td>
              <td>
                {topic.Users.length}/{topic.userSize}
              </td>
              <td> {topic.Messages.length}</td>
              {isAdmin && (
                <td>
                  <Button variant="primary" size="sm" className="me-1">
                    Modifier
                  </Button>
                  <Button variant="danger" size="sm">
                    Supprimer le salon
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
