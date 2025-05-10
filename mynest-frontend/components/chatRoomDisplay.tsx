import { ChatRoom } from "@/types/chat";
import Link from "next/link";
import { Button } from "./ui/button";
import api from "@/lib/api";
import Image from "next/image";
import { useState } from "react";
import { Input } from "./ui/input";

export default function ChatRoomDisplay({ room }: { room: ChatRoom }) {
  const [updateChatRoomName, setUpdateChatRoomName] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    try {
      await api.delete(`chat/${room.id}`);
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setUpdateChatRoomName(true);
  };

  const handleUpdateChatRoomName = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newRoomName = formData.get("roomName");

    try {
      await api.patch(`chat/${room.id}`, { roomName: newRoomName });
      setUpdateChatRoomName(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-lg bg-white border-gray-300 shadow-inner">
      <div className="flex justify-between items-center">
        {updateChatRoomName === false ? (
          <Link href={`/tchat/${room.id}`} className="flex-1">
            <span className="font-bold text-xl text-[#4682b4] hover:text-[#222222]">
              {room.roomName}
            </span>
          </Link>
        ) : (
          <form onSubmit={handleUpdateChatRoomName} className="flex">
            <Input
              type="text"
              name="roomName"
              defaultValue={room.roomName}
              className="border border-gray-300 bg-gray-100 p-1 shadow-inner"
            />
            <Button
              type="submit"
              className="bg-[#4682b4] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary ml-2"
            >
              Modifier
            </Button>
            <Button
              type="button"
              onClick={() => setUpdateChatRoomName(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 ml-2"
            >
              Annuler
            </Button>
          </form>
        )}

        <div className="flex gap-1.5">
          {updateChatRoomName === false && (
            <>
              <Button
                onClick={handleEditClick}
                className="bg-[#4682b4] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.443 19.27a4.5 4.5 0 01-1.691 1.07l-3.386 1.128 1.128-3.386a4.5 4.5 0 011.07-1.691L16.862 3.487z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 7.5l6 6"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 text-white px-2 py-1 rounded-lg font-semibold hover:bg-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 18M9 18L9 9M15 18L15 9M4.5 6H19.5M10.5 6V4.5C10.5 3.67157 11.1716 3 12 3C12.8284 3 13.5 3.67157 13.5 4.5V6M4.5 6L5.25 19.5C5.25 20.3284 5.92157 21 6.75 21H17.25C18.0784 21 18.75 20.3284 18.75 19.5L19.5 6"
                  />
                </svg>
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        {room.users.map((user) => (
          <Image
            key={user.id}
            src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/profil-pictures/${user.profilPicture}`}
            alt={`photo de profil - ${user.username}`}
            width={40}
            height={40}
            className="rounded-full border border-gray-300"
          />
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white border border-gray-300 p-6 rounded-lg shadow-inner">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-4">
              Êtes-vous sûr de vouloir supprimer {room.roomName} ?
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-400"
              >
                Annuler
              </Button>
              <Button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
