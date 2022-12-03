import React from "react";

export default function ChatContainer({ recipient }) {
  return (
    <div>
      <p>{recipient}</p>
      {"<<<CHAT>>>"}
    </div>
  );
}
