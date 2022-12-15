import React from "react";
import Badge from "react-bootstrap/Badge";

import Avatar from "@components/chat/Avatar";

export default function ChatHistory({ history }) {
  return history.map((message, i) => (
    <div key={i}>
      <div className="d-flex justify-content-start mb-2 align-items-center">
        <Avatar />
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
