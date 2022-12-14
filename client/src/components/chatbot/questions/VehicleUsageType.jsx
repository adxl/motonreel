import React from "react";

import ChoiceQuestion from "../ChoiceQuestion";

import {
  DISPONIBILITIES_OFFROAD,
  DISPONIBILITIES_ROAD,
  DISPONIBILITIES_SPORT,
} from ".";

const CHOICE_ROAD = "road";
const CHOICE_OFFROAD = "off_road";
const CHOICE_SPORT = "sport";

const choices = [
  { key: CHOICE_ROAD, label: "Routier", response: "Usage routier" },
  {
    key: CHOICE_OFFROAD,
    label: "Tout-terrain",
    response: "Usage tout-terrain",
  },
  { key: CHOICE_SPORT, label: "Sportif", response: "Usage sportif" },
];

const title = "Quel est l'usage du véhicule ?";

export default function VehicleUsageType({ onAnswer }) {
  function handleAnswer(answer) {
    const { response } = choices.find((choice) => choice.key === answer);
    switch (answer) {
      case CHOICE_ROAD:
        return onAnswer(DISPONIBILITIES_ROAD, title, response);

      case CHOICE_OFFROAD:
        return onAnswer(DISPONIBILITIES_OFFROAD, title, response);

      case CHOICE_SPORT:
        return onAnswer(DISPONIBILITIES_SPORT, title, response);
    }
  }

  return (
    <ChoiceQuestion title={title} onAnswer={handleAnswer} choices={choices} />
  );
}
