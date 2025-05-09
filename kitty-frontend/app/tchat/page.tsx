/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Spinner from "@/components/spinner";
import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateChatRoom from "@/components/createChatRoom";
import Link from "next/link";

export default function Tchat() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth } = useAuth();
  const [rooms, setRooms] = useState([]);
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
  }, [checkingAuth, isAuthenticated, router]);

  return (
    <>
      {checkingAuth || !rooms ? (
        <Spinner />
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-2xl">Mes discussions</h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary"
            >
              Nouvelle discussion
            </button>
          </div>
          {rooms.length === 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-lg">
                Vous n&apos;avez pas encore de discussion.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                {rooms.map((room: any) => (
                  <Link
                    href={`/tchat/${room.id}`}
                    key={room.id}
                    className="flex flex-col gap-2 border p-4 rounded-lg"
                  >
                    <h2 className="font-bold text-xl text-[#D4AF37]">
                      {room.roomName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Dernière mise à jour :{" "}
                      {new Date(room.updatedAt).toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
          {showModal && <CreateChatRoom closeModal={setShowModal} />}
        </div>
      )}
    </>
  );
}
