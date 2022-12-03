import React from "react";
import { Link, useParams } from "react-router-dom";

import ChatContainer from "@components/chat";

export default function ConversationsDetails() {
  const { conversationId } = useParams();

  return (
    <div>
      <ChatContainer recipient={conversationId} />
      <Link to="/chat">Retour à mes conversations</Link>
    </div>
  );
}
