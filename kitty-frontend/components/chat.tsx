import { useSocket } from "@/context/socketContext";
import { useEffect, useState } from "react";

export default function Chat() {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!socket) return;
    socket.on("send-chat-update", (messagesData) => {
        setMessages(messagesData);
        console.log(messagesData);
    })
  }, [socket]);
}
