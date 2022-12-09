import React from "react";

import { useAlert } from "@hooks/alert";

import TextQuestion from "../TextQuestion";

import { VEHICLE_LAST_CHECK } from ".";

const title = "Quelle est l'année du véhicule ?";

export default function VehicleYear({ onAnswer }) {
  const { alertError } = useAlert();
  function handleAnswer(answer) {
    answer = parseInt(answer);

    if (!(answer && answer >= 1300 && answer <= new Date().getFullYear())) {
      alertError("Voiture hors du temps !");
      return;
    }
    onAnswer(VEHICLE_LAST_CHECK, title, answer);
  }

  return <TextQuestion title={title} onAnswer={handleAnswer} />;
}
