import React from "react";

import { useAlert } from "@hooks/alert";

import TextQuestion from "../TextQuestion";

import { DISPONIBILITIES_CLASSIC, VEHICLE_DISTANCE } from ".";

const title = "Quelle est l'année de la dernière visite du véhicule ?";

export default function VehicleLastCheck({ onAnswer }) {
  const { alertError } = useAlert();
  function handleAnswer(answer) {
    answer = parseInt(answer);
    if (!(answer && answer >= 1300 && answer <= new Date().getFullYear())) {
      alertError("Date d'entretien hors du temps !");
      return;
    }

    const thisYear = new Date().getFullYear();
    const checkYear = new Date(answer, 0, 1).getFullYear();

    if (thisYear - checkYear > 1) {
      onAnswer(DISPONIBILITIES_CLASSIC, title, answer);
    } else {
      onAnswer(VEHICLE_DISTANCE, title, answer);
    }
  }

  return <TextQuestion title={title} onAnswer={handleAnswer}></TextQuestion>;
}
