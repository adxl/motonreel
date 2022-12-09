import React from "react";
import Badge from "react-bootstrap/Badge";

export default function ChatHistory({ history }) {
  const BotAvatar = React.memo(function BotAvatar() {
    return (
      <img
        src="https://robohash.org/motonreeltr?set=set3"
        alt="avatar"
        style={{ width: 50 }}
      />
    );
  });

  return history.map((message, i) => (
    <div key={i}>
      <div className="d-flex justify-content-start mb-2 align-items-center">
        <BotAvatar />
        <Badge pill bg="secondary" className="px-3 py-2">
          {message.question}
        </Badge>
      </div>
      <div className="d-flex justify-content-end mb-2">
        <Badge pill bg="primary" className="px-3 py-2">
          {message.answer}
        </Badge>
      </div>
    </div>
  ));
}
