import React, { useEffect, useState } from "react";

import { createRendezVous, getAllRendezVous } from "@api/rendezVous";
import { useAlert } from "@hooks/alert";
import { useAuth } from "@hooks/auth";

import ChoiceQuestion from "../ChoiceQuestion";

import { END_DISPONIBILITIES } from ".";

export default function Disponibilities({ typeLabel, typeId, onAnswer }) {
  const { token } = useAuth();
  const { alertError } = useAlert();

  const [_choices, setChoices] = useState([]);

  const title = "Veuillez choisir un créneau pour un rendez-vous " + typeLabel;

  const getWeekAvailabilities = (rendezVous) => {
    const rendezVousDates = rendezVous.map((rdv) =>
      new Date(rdv.date).toDateString()
    );

    const today = new Date();
    const firstDayDate = today.getDate() - today.getDay() + 1;

    const week = Array(7)
      .fill()
      .map((_, i) => {
        const _today = new Date(today);
        const day = new Date(_today.setDate(firstDayDate + i));

        return {
          key: i,
          label: day.toDateString(),
          value: day,
          disabled:
            day <= today || rendezVousDates.includes(day.toDateString()),
        };
      });

    return week;
  };

  useEffect(() => {
    getAllRendezVous(typeId)
      .then(({ data: rendezVous }) => {
        setChoices(getWeekAvailabilities(rendezVous));
      })
      .catch((_) => {
        debugger;
      });
  }, []);

  function handleAnswer(_, value) {
    const choice = _choices.find(
      (choice) => choice.value === value && !choice.disabled
    );
    if (!choice) {
      alertError("Veuillez selectionner une date valide.");
      return;
    }
    createRendezVous(value.toISOString(), typeId, token)
      .then(({ data: data }) => {
        return onAnswer(
          END_DISPONIBILITIES,
          title,
          new Date(data.date).toLocaleDateString("fr")
        );
      })
      .catch(({ data: err }) => {
        alertError(err.message);
      });
  }

  return (
    <ChoiceQuestion title={title} onAnswer={handleAnswer} choices={_choices} />
  );
}
