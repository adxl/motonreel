import React from "react";

import ChoiceQuestion from "../ChoiceQuestion";

import { DISPONIBILITIES_CLASSIC, ENTRY_POINT } from ".";

const CHOICE_YES = "yes";
const CHOICE_NO = "no";

const choices = [
  {
    key: CHOICE_YES,
    label: "Oui je veux",
    response: "Oui",
  },
  {
    key: CHOICE_NO,
    label: "Non merci",
    response: "Non",
  },
];

const title = "Souhaitez-vous un entretien de révision ?";

export default function AskCheckUp({ onAnswer }) {
  function handleAnswer(answer) {
    const { response } = choices.find((choice) => choice.key === answer);
    switch (answer) {
      case CHOICE_YES:
        return onAnswer(DISPONIBILITIES_CLASSIC, title, response);

      case CHOICE_NO:
        return onAnswer(ENTRY_POINT, title, response);
    }
  }

  return (
    <ChoiceQuestion title={title} onAnswer={handleAnswer} choices={choices} />
  );
}
