import React from "react";

import Disponibilities from "./Disponibilities";

export default function DisponibilitiesClassic({ onAnswer }) {
  const typeId = "a3b548d9-f83a-4738-ace7-d104671b07c3";
  return (
    <Disponibilities
      typeLabel="classique"
      typeId={typeId}
      onAnswer={onAnswer}
    />
  );
}
