/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect } from "react";
import { useState } from "react";
import api from "@/lib/api";
import Image from "next/image";

interface CreateChatRoomProps {
  closeModal: (value: SetStateAction<boolean>) => void;
}

export default function CreateChatRoomModal({
  closeModal,
}: CreateChatRoomProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [userRecipient, setUserRecipient] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const fetchSearchResults = async () => {
        if (searchTerm.trim() !== "") {
          try {
            const res = await api.get(`users/search/${searchTerm}`);
            setSearchResults(res.data);
          } catch (error: any) {
            if (error.response) {
              console.error("Erreur API :", error.response.data.message);
              setMessage(error.response.data.message);
            } else {
              console.error("Erreur réseau :", error.message);
              setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
            }
          }
        }
      };
      fetchSearchResults();
    }, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  const handleCreateChatRoom = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const roomName = formData.get("roomName");

    if (userRecipient === "") {
      setMessage("Veuillez sélectionner un utilisateur.");
      return;
    }
    try {
      const res = await api.post("chat", {
        roomName,
        recipientId: userRecipient,
      });
      setMessage(res.data.message);
      if (res.status === 200) {
        setTimeout(() => {
          closeModal(true);
        }, 5000);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Erreur API :", error.response.data.message);
        setMessage(error.response.data.message);
      } else {
        console.error("Erreur réseau :", error.message);
        setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-90 flex justify-center items-center z-50">
      <div
        className="bg-gray-300 rounded-md shadow-inner p-6 w-96 border-2"
        style={{
          borderColor: "#808080",
          boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
        }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Nouvelle discussion
        </h2>
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <form className="space-y-4" onSubmit={handleCreateChatRoom}>
          <div className="space-y-2">
            <label htmlFor="roomName" className="text-gray-900 font-semibold">
              Nom de la discussion
            </label>
            <input
              type="text"
              name="roomName"
              className="flex-1 p-2 border rounded w-full"
              style={{
                border: "2px solid #000",
                backgroundColor: "#fff",
                color: "#000",
                boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
              }}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="recipient" className="text-gray-900 font-semibold">
              Trouvez un utilisateur
            </label>
            <input
              type="text"
              name="recipient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-2 border rounded w-full"
              style={{
                border: "2px solid #000",
                backgroundColor: "#fff",
                color: "#000",
                boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
              }}
            />
            {searchTerm !== "" && searchResults.length === 0 ? (
              <span className="text-gray-500 italic">
                Aucun utilisateur trouvé.
              </span>
            ) : (
              <ul className="max-h-40 overflow-y-auto border border-gray-800 rounded-md bg-gray-200 shadow-inner">
                {searchResults.map((result: any) => (
                  <li
                    key={result.id}
                    className={`p-2 hover:bg-gray-300 cursor-pointer flex items-center justify-between ${
                      userRecipient === result.id ? "bg-gray-400" : ""
                    }`}
                    onClick={() => {
                      setUserRecipient(result.id);
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/profil-pictures/${result.profilPicture}`}
                        alt={`photo de profil - ${result.username}`}
                        width={32}
                        height={32}
                        className="rounded-full border border-gray-800"
                      />
                      <span className="font-medium text-gray-900">
                        {result.username}
                      </span>
                    </div>
                    {userRecipient === result.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#0078d7]"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-between">
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
              onClick={() => closeModal(false)}
            >
              Annuler
            </button>

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
              Créer la discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
