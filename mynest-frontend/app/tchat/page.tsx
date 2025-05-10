"use client";

import Spinner from "@/components/spinner";
import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateChatRoomModal from "@/components/createChatRoomModal";
import { Button } from "@/components/ui/button";
import { ChatRoom } from "@/types/chat";
import ChatRoomDisplay from "@/components/chatRoomDisplay";

export default function Tchat() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated && !checkingAuth) {
        router.push("/login");
      } else {
        try {
          const res = await api.get("chat");
          setRooms(res.data);
        } catch (error) {
          console.error("Failed to fetch chat data:", error);
        }
      }
    }
    fetchData();
  }, [checkingAuth, isAuthenticated, router, rooms]);

  return (
    <>
      {checkingAuth || !rooms ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-2 min-h-screen bg-gray-200 text-black font-windows98 p-4 border-4 border-gray-400 shadow-windows98">
          <div className="flex justify-between items-center border-b-2 border-gray-400 pb-2 mb-4">
            <h1 className="font-bold text-2xl text-gray-800">Mes discussions</h1>
            <Button
              onClick={() => setShowModal(true)}
              className="bg-gray-300 text-black px-4 py-2 rounded border border-gray-500 hover:bg-gray-400"
            >
              Nouvelle discussion
            </Button>
          </div>
          {rooms.length === 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-lg text-gray-800">
                Vous n&apos;avez pas encore de discussion.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {rooms.map((room: ChatRoom) => (
                <ChatRoomDisplay room={room} key={room.id} />
              ))}
            </div>
          )}
          {showModal && <CreateChatRoomModal closeModal={setShowModal} />}
        </div>
      )}
    </>
  );
}
