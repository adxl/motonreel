import React from "react";
import { Link } from "react-router-dom";

export default function ConversationsList() {
  const conversations = [
    { id: "55", user: "Mark" },
    { id: "123", user: "Emma" },
    { id: "96", user: "Ben" },
    { id: "85", user: "Lisa" },
  ];

  return (
    <div>
      <h1>Mes conversations</h1>
      {conversations.map((conversation) => (
        <div key={conversation.id}>
          <Link to={`/chat/${conversation.id}`}>{conversation.user}</Link>
        </div>
      ))}
    </div>
  );
}
