/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import api from "@/lib/api";
import { Button } from "./ui/button";
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
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 border-2 border-gray-800">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Nouvelle discussion</h2>
        {message && (
          <span className="mb-4 text-center font-medium text-gray-800">{message}</span>
        )}
        <form className="space-y-4" onSubmit={handleCreateChatRoom}>
          <div className="space-y-2">
            <Label htmlFor="roomName" className="text-gray-800">Nom de la discussion</Label>
            <Input
              type="text"
              name="roomName"
              className="border-2 border-gray-800 bg-gray-100 text-gray-800"
            ></Input>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient" className="text-gray-800">Trouvez un Groove Talker</Label>
            <Input
              type="text"
              name="recipient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-gray-800 bg-gray-100 text-gray-800"
            ></Input>
            {searchTerm !== "" && searchResults.length === 0 ? (
              <span className="text-neutral-medium italic">
                Nous n&apos;avons pas trouvez cet utilisateur
              </span>
            ) : (
              <ul className="max-h-40 overflow-y-auto border-2 border-gray-800 rounded-md bg-gray-100">
                {searchResults.map((result: any) => (
                  <li
                    key={result.id}
                    className={`p-2 hover:bg-gray-200 cursor-pointer flex items-center justify-between ${
                      userRecipient === result.id ? "bg-gray-300" : ""
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
                        className="rounded-full border-2 border-gray-800"
                      />
                      <span className="font-medium text-gray-800">{result.username}</span>
                    </div>
                    {userRecipient === result.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#4682b4]"
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
            <Button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md border-2 border-gray-800 hover:bg-gray-400"
              onClick={() => closeModal(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-[#4682b4] text-white px-4 py-2 rounded-md border-2 border-gray-800 hover:bg-primary"
            >
              Créer la discussion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
