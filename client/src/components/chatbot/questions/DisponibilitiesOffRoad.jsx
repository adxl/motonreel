import React from "react";

import Disponibilities from "./Disponibilities";

export default function DisponibilitiesOffRoad({ onAnswer }) {
  const typeId = "74e2746c-48e3-4caa-bccf-a0be5b1107be";

  return (
    <Disponibilities
      typeLabel="tout-terrain"
      typeId={typeId}
      onAnswer={onAnswer}
    />
  );
}
