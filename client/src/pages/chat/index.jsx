import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import { getUsers } from "@api/auth";
import { useAlert } from "@hooks/alert";
import { useAuth } from "@hooks/auth";

export default function ConversationsList() {
  const { alertError } = useAlert();
  const { token } = useAuth();

  const [_users, setUsers] = useState([]);
  const [_isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    getUsers(token)
      .then(({ data: users }) => {
        setUsers(users);
        setIsLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        alertError("Erreur lors de la récupération des utilisateurs");
      });
  }, []);

  return (
    <div>
      <h1>Mes conversations</h1>
      {_isLoaded &&
        _users.length > 0 &&
        _users.map((user) => (
          <div key={user.id}>
            <Link to={`/chat/${user.id}`}>{user.name}</Link>
          </div>
        ))}
      {_isLoaded && _users.length <= 0 && (
        <p>Aucun autre utilisateurs existe</p>
      )}
    </div>
  );
}
