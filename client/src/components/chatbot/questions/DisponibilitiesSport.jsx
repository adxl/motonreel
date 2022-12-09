import React from "react";

import Disponibilities from "./Disponibilities";

export default function DisponibilitiesSport({ onAnswer }) {
  const typeId = "fb0c3373-9ff7-4290-9bac-cac5503108ea";

  return (
    <Disponibilities typeLabel="sportif" typeId={typeId} onAnswer={onAnswer} />
  );
}
