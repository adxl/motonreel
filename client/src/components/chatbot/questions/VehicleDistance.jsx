import React from "react";

import { useAlert } from "@hooks/alert";

import TextQuestion from "../TextQuestion";

import { ASK_CHECKUP, DISPONIBILITIES_CLASSIC } from ".";

const title = "Quel est le kilométrage du véhicule ?";

export default function VehicleDistance({ onAnswer }) {
  const { alertError } = useAlert();
  function handleAnswer(answer) {
    answer = parseFloat(answer);
    if (!answer) {
      alertError("Veuillez fournir une réponse valide !");
      return;
    }

    if (answer >= 10_000) {
      onAnswer(DISPONIBILITIES_CLASSIC, title, answer);
    } else {
      onAnswer(ASK_CHECKUP, title, answer + " Km");
    }
  }

  return <TextQuestion title={title} onAnswer={handleAnswer} />;
}
