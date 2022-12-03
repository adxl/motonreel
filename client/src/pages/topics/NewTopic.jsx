import React from "react";
import { Link } from "react-router-dom";

export default function ForumCreator() {
  return (
    <>
      <h1>Créer une discussion</h1>
      <Link to="/forum">Retour au forum</Link>
    </>
  );
}
