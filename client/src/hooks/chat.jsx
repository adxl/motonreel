import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import io from "socket.io-client";

import { useAlert } from "@hooks/alert";
import { useAuth } from "@hooks/auth";

export const NAMESPACE_REQUESTS = "commRequests";
export const NAMESPACE_SALONS = "salons";
export const NAMESPACE_PRIVATE = "private";

const SocketContext = React.createContext();
export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({
  namespace,
  roomId,
  roomSize = 2,
  onReload,
  children,
}) {
  const { token } = useAuth();
  const { alertError } = useAlert();

  const [_socket, setSocket] = useState();
  const [_isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const socketUrl = import.meta.env.VITE_API_URL + "/" + namespace;
    const socket = io(socketUrl, {
      auth: {
        token,
      },
      reconnection: false,
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("joined", () => {
      setIsLoaded(true);
    });
    socket.on("overflow", () => {
      alertError(
        "Vous ne pouvez pas rejoindre cette communication pour le moment"
      );
      setTimeout(() => {
        location.href = "/forum";
      }, 1500);
    });

    socket.emit("join", { roomId, roomSize });

    setSocket(socket);
    return () => socket.close();
  }, []);

  useEffect(() => {
    if (_socket) {
      _socket.on("message", () => {
        onReload().then(() => {
          setIsLoaded(true);
        });
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
      {!_isLoaded ? <Spinner className="my-5" /> : children}
    </SocketContext.Provider>
  );
}
