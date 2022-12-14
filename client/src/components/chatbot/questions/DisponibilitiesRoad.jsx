import React from "react";

import Disponibilities from "./Disponibilities";

export default function DisponibilitiesRoad({ onAnswer }) {
  const typeId = "9f937831-47ee-4a22-9249-cbacf9d1f3f6";

  return (
    <Disponibilities typeLabel="routier" typeId={typeId} onAnswer={onAnswer} />
  );
}
