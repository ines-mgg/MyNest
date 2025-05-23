"use client";

import ChatMessageDisplay from "@/components/chatMessageDisplay";
import { useAuth } from "@/context/authContext";
import { useSocket } from "@/context/socketContext";
import api from "@/lib/api";
import { Message } from "@/types/message";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TchatRoom() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth } = useAuth();
  const { socket } = useSocket();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!isAuthenticated && !checkingAuth) {
      router.push("/login");
      return;
    }
    if (!socket) {
      console.error("Socket is not connected");
      router.push("/tchat");
      return;
    }
    if (!roomId) {
      console.error("Room ID is not provided");
      router.push("/tchat");
      return;
    }

    socket.emit("join-chat-room", roomId);
    const handleNewMessage = (data: Message[]) => {
      setMessages(data);
    };
    socket.on("send-chat-update", handleNewMessage);

    const fetchData = async () => {
      try {
        const res = await api.get(`chat/${roomId}`);
        if (res.status === 200) {
          setRoomName(res.data.roomName);
          setMessages(res.data.messages);
        } else {
          console.error("Failed to fetch room data");
          router.push("/tchat");
        }
      } catch (error) {
        console.error("Failed to fetch room data:", error);
        router.push("/tchat");
      }
    };

    if (messages.length === 0) {
      fetchData();
    }

    return () => {
      socket.off("send-chat-update", handleNewMessage);
      socket.emit("leave-chat-room", roomId);
    };
  }, [socket, isAuthenticated, roomId, checkingAuth, router, messages.length]);

  const handleSendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const content = formData.get("message");

    try {
      const res = await api.post(`chat/${roomId}`, {
        content,
      });
      if (res.status === 201) {
        console.log("Message sent successfully");
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessageDisplay message={message} key={message.id || index} />
        ))}
      </div>
      <div
        className="p-4"
        style={{
          backgroundColor: "#87ceeb",
          borderTop: "2px solid #000",
          boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
          position: "sticky",
          bottom: 0,
        }}
      >
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            name="message"
            placeholder={`Envoyer un message dans ${roomName}`}
            className="flex-1 p-2 border rounded"
            style={{
              border: "2px solid #000",
              backgroundColor: "#e0ffff",
              color: "#000",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
            }}
            required
          />
          <button
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "#0078d7",
              color: "#fff",
              fontWeight: "bold",
              textShadow: "1px 1px 2px #000",
              border: "2px solid #000",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
            }}
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
