import { ChatRoom } from "@/types/chat";
import Link from "next/link";
import api from "@/lib/api";
import Image from "next/image";
import { useState } from "react";

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
    <div className="flex flex-col gap-2 border p-4 rounded-md bg-gray-300 border-gray-800 shadow-inner">
      <div className="flex justify-between items-center">
        {updateChatRoomName === false ? (
          <Link href={`/tchat/${room.id}`} className="flex-1">
            <span className="font-bold text-xl text-[#0078d7] hover:text-[#005a9e]">
              {room.roomName}
            </span>
          </Link>
        ) : (
          <form onSubmit={handleUpdateChatRoomName} className="flex gap-2">
            <input
              type="text"
              name="roomName"
              defaultValue={room.roomName}
              className="flex-1 px-2 py-1 border border-gray-800 bg-gray-200 shadow-inner focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 text-white font-bold text-center"
              style={{
                backgroundColor: "#0078d7",
                border: "2px solid #000",
                boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                textShadow: "1px 1px 2px #000",
              }}
            >
              Modifier
            </button>
            <button
              onClick={() => setUpdateChatRoomName(false)}
              className="px-4 py-2 text-white font-bold text-center"
              style={{
                backgroundColor: "#ff5c5c",
                border: "2px solid #000",
                boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                textShadow: "1px 1px 2px #000",
              }}
            >
              Annuler
            </button>
          </form>
        )}

        <div className="flex gap-2">
          {updateChatRoomName === false && (
            <>
              <button
                onClick={handleEditClick}
                className="px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#0078d7",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
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
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#ff5c5c",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
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
              </button>
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
            className="rounded-full border border-gray-800"
          />
        ))}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-200 bg-opacity-90 flex justify-center items-center z-50">
          <div className="bg-gray-300 border border-gray-800 p-6 rounded-md shadow-inner">
            <h2 className="text-lg font-bold mb-4 text-gray-900">
              Confirmer la suppression
            </h2>
            <p className="mb-4 text-gray-700">
              Êtes-vous sûr de vouloir supprimer {room.roomName} ?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#0078d7",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#ff5c5c",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
