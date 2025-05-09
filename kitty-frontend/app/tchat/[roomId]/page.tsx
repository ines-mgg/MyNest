/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/authContext";
import { useSocket } from "@/context/socketContext";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TchatRoom() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth } = useAuth();
  const { socket } = useSocket();
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);

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
    const handleNewMessage = (data: any) => {
      console.log("New message received:", data);
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

    fetchData();

    return () => {
      socket.off("send-chat-update", handleNewMessage);
      socket.emit("leave-chat-room", roomId);
    };
  }, [socket, isAuthenticated, roomId, checkingAuth, router]);

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
          <div key={message.id || index} className="mb-2">
            <div
              className="flex items-center p-2 rounded-lg"
              style={{
                backgroundColor: message.sender?.customBubbleColor || "#ffffff",
              }}
            >
              <span className="font-bold">{message.sender?.username}</span>
            </div>
            <p className="ml-10">{message?.content}</p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200">
        <form onSubmit={handleSendMessage} className="">
          <Input
            type="text"
            name="message"
            placeholder={`Envoyer un message dans ${roomName}`}
            className="w-full p-2 border rounded"
          />
          <Button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  );
}
