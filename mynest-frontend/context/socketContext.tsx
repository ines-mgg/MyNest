/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

const context = createContext<{ socket: Socket | null }>({ socket: null });

export const useSocket = () => {
  return useContext(context);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState<boolean>(false);

  useEffect(() => {
    const createdSocket = io(
      process.env.NEXT_PUBLIC_BACK_URL_GATEWAY_WS ?? "ws://localhost:8001"
    );
    setSocket(createdSocket);
    createdSocket.emit("connection");

    const handleConfirmation = () => {
      setIsSocketConnected(true);
    };

    const handleDisconnect = () => {
      setIsSocketConnected(false);
    };

    createdSocket.on("confirmation", () => {
      console.log("Socket connected");
      handleConfirmation();
    });
    createdSocket.on("disconnect", () => {
      console.log("Socket disconnected");
      handleDisconnect();
    });

    return () => {
      createdSocket.off("confirmation", handleConfirmation);
      createdSocket.off("disconnect", handleDisconnect);
    };
  }, []);
  return (
    <context.Provider value={{ socket: socket }}>{children}</context.Provider>
  );
};
