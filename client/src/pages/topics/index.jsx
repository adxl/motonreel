import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "@hooks/auth";

export default function Forum() {
  const {
    user: { isAdmin },
  } = useAuth();

  const mockTopics = [
    { id: "12", subject: "Entretien maison" },
    { id: "56", subject: "Les types de motos" },
    { id: "85", subject: "Choisir ses pneus" },
  ];

  return (
    <>
      <h1>Bienvenue dans le forum</h1>

      {/* TODO: lister les discussions du forum */}
      {mockTopics.map((topic) => (
        <div key={topic.id}>
          <Link to={`/forum/${topic.id}`}>{topic.subject}</Link>
        </div>
      ))}

      <hr />
      {isAdmin && <Link to="/forum/new">Ouvrir une nouvelle discussion</Link>}
    </>
  );
}
