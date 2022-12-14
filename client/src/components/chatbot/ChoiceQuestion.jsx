import React from "react";
import Button from "react-bootstrap/Button";

import Question from "./Question";

export default function ChoiceQuestion({ title, choices, onAnswer }) {
  function handleAnswer(answer, value) {
    onAnswer(answer, value);
  }

  return (
    <Question title={title}>
      <div>
        {choices.map((choice) => (
          <div key={choice.key} className="w-100 mb-1">
            <Button
              variant="light"
              className="w-100"
              onClick={() => handleAnswer(choice.key, choice.value)}
              disabled={choice.disabled}
            >
              {choice.label}
            </Button>
          </div>
        ))}
      </div>
    </Question>
  );
}
