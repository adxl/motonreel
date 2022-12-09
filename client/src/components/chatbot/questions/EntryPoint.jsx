import React from "react";

import ChoiceQuestion from "../ChoiceQuestion";

import { CONTACT_TYPE, VEHICLE_USAGE_TYPE, VEHICLE_YEAR } from ".";

const title = "Bonjour, de quoi avez-vous besoin ?";

const CHOICE_CHECKOUT = "checkout";
const CHOICE_VEHICLES = "vehicles";
const CHOICE_CONTACT = "contact";

const choices = [
  {
    key: CHOICE_CHECKOUT,
    label: "Vérifier l'entretien de mon véhicule",
    response: "Je veux vérifier l'entretien de mon véhicule",
  },
  {
    key: CHOICE_VEHICLES,
    label: "Avoir des informations sur un véhicule",
    response: "Je veux des informations sur un véhicule",
  },
  {
    key: CHOICE_CONTACT,
    label: "Avoir des information de contact",
    response: "Je veux des information de contact",
  },
];

export default function EntryPoint({ onAnswer }) {
  function handleAnswer(answer) {
    const { response } = choices.find((choice) => choice.key === answer);
    switch (answer) {
      case CHOICE_CHECKOUT:
        return onAnswer(VEHICLE_YEAR, title, response);

      case CHOICE_VEHICLES:
        return onAnswer(VEHICLE_USAGE_TYPE, title, response);

      case CHOICE_CONTACT:
        return onAnswer(CONTACT_TYPE, title, response);
    }
  }

  return (
    <ChoiceQuestion title={title} onAnswer={handleAnswer} choices={choices} />
  );
}
