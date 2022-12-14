import React from "react";

import ChoiceQuestion from "../ChoiceQuestion";

import { END_CONTACT_EMAIL, END_CONTACT_PHONE } from ".";

const CHOICE_EMAIL = "email";
const CHOICE_PHONE = "phone";

const choices = [
  {
    key: CHOICE_EMAIL,
    label: "Adresse e-mail",
    response: "Je veux l'adresse e-mail'",
  },
  {
    key: CHOICE_PHONE,
    label: "Numéro de téléphone",
    response: "Je veux le numéro de téléphone",
  },
];

const title = "Quelle information de contact souhaitez-vous ?";

export default function ContactType({ onAnswer }) {
  function handleAnswer(answer) {
    const { response } = choices.find((choice) => choice.key === answer);
    switch (answer) {
      case CHOICE_EMAIL:
        return onAnswer(END_CONTACT_EMAIL, title, response);

      case CHOICE_PHONE:
        return onAnswer(END_CONTACT_PHONE, title, response);

      default:
        break;
    }
  }

  return (
    <ChoiceQuestion title={title} onAnswer={handleAnswer} choices={choices} />
  );
}
