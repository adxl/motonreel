import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import ChatHistory from "@components/chatbot/ChatHistory";
import questions, { ENTRY_POINT } from "@components/chatbot/questions";

export default function ChatBot() {
  const [_currentQuestion, setNextQuestion] = useState(null);

  const [_history, setHistory] = useState([]);

  function init() {
    setNextQuestion(ENTRY_POINT);
    setHistory([]);
  }

  useEffect(() => {
    init();
  }, []);

  function handleAnswer(nextComponent, question, answer) {
    const historyEntry = {
      question,
      answer,
    };

    const history = [..._history, historyEntry];
    setHistory(history);
    setNextQuestion(nextComponent);
  }

  function renderQuestion() {
    if (!_currentQuestion) {
      return <Spinner animation="border" />;
    }

    const CurrentQuestion = questions[_currentQuestion];
    return <CurrentQuestion onAnswer={handleAnswer} />;
  }

  return (
    <div className="w-50 mx-auto">
      <h1 className="mb-5">Chatbot</h1>
      <div className="mb-5">
        <ChatHistory history={_history} />
      </div>
      {renderQuestion()}
      {_history.length > 0 && (
        <div className="mt-5">
          <Button variant="outline-danger" onClick={init}>
            Relancer le chatbot
          </Button>
        </div>
      )}
    </div>
  );
}
