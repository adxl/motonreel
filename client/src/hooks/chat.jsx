import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

import { useAuth } from "@hooks/auth";

export const NAMESPACE_REQUESTS = "commRequests";
export const NAMESPACE_SALONS = "salons";
export const NAMESPACE_PRIVATE = "private";

const SocketContext = React.createContext();
export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ namespace, roomId, onReload, children }) {
  const { token } = useAuth();

  const [_socket, setSocket] = useState();

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL + "/" + namespace;
    const socket = io(socketUrl, {
      auth: {
        token,
      },
      reconnection: false,
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.emit("join", roomId);

    setSocket(socket);

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (_socket) {
      _socket.on("message", () => {
        onReload();
      });
    }
  }, [_socket]);

  const sendMessage = (content) => {
    const message = {
      room: roomId,
      content,
    };
    _socket.emit("message", message);
    onReload();
  };

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}
