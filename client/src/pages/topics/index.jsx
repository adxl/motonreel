import React, { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

import { deleteSalon, getSalons } from "@api/salon";
import ModalConfirmation from "@components/modal";
import { useAlert } from "@hooks/alert";
import { useAuth } from "@hooks/auth";

export default function Forum() {
  const { token } = useAuth();
  const [_salons, setSalons] = useState([]);
  const [_isLoaded, setIsLoaded] = useState(false);

  const {
    user: { isAdmin },
  } = useAuth();

  const { alertError, alertSuccess } = useAlert();

  useEffect(() => {
    getSalons(token).then((salons) => {
      setSalons(salons.data);
      setIsLoaded(true);
    });
  }, [_salons]);

  function handleDeleteConfirm(id, hideModal) {
    deleteSalon(id, token)
      .then(({ data: data }) => {
        hideModal(false);
        alertSuccess(data.message);
      })
      .catch(({ data: data }) => alertError(data.message));
  }

  if (!_isLoaded) return "Chargement..";
  else
    return (
      <>
        <h1>Bienvenue dans le forum</h1>
        {isAdmin && <Link to="/forum/new">Ouvrir une nouvelle discussion</Link>}
        {isAdmin && <hr />}
        <p>Nombre de salons : {_salons.length}</p>
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
                <td>Temps réel/{topic.userSize}</td>
                <td> {topic.Messages.length}</td>
                {isAdmin && (
                  <td>
                    <Link to={`/forum/${topic.id}/edit`} className="me-1">
                      <Button variant="primary" size="sm">
                        Modifier
                      </Button>
                    </Link>
                    <ModalConfirmation
                      variantButton="danger"
                      sizeButton="sm"
                      handleConfirmAction={(hideModal) =>
                        handleDeleteConfirm(topic.id, hideModal)
                      }
                      buttonText="Supprimer"
                      title={`Voulez-vous vraiment supprimer le salon - ${topic.name}?`}
                    />
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
}
