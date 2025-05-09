/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import api from "@/lib/api";
import { Button } from "./ui/button";

interface CreateChatRoomProps {
  closeModal: (value: SetStateAction<boolean>) => void;
}

export default function CreateChatRoom({ closeModal }: CreateChatRoomProps) {
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
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Nouvelle discussion</h2>
        {message && (
          <span className="mb-4 text-center font-medium">{message}</span>
        )}
        <form className="space-y-4" onSubmit={handleCreateChatRoom}>
          <div className="space-y-2">
            <Label htmlFor="roomName">Nom de la discussion</Label>
            <Input type="text" name="roomName"></Input>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient">Trouvez un Groove Talker</Label>
            <Input
              type="text"
              name="recipient"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            ></Input>
            {searchTerm !== "" && searchResults.length === 0 ? (
              <span className="text-neutral-medium italic">
                Nous n&apos;avons pas trouvez cet utilisateur
              </span>
            ) : (
              <ul className="max-h-40 overflow-y-auto border rounded-md">
                {searchResults.map((result: any) => (
                  <li
                    key={result.id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                    onClick={() => {
                      setUserRecipient(result.id);
                    }}
                  >
                    {result.username}
                    {userRecipient === result.id && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#D4AF37]"
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
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
              onClick={() => closeModal(false)}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-[#D4AF37] text-white px-4 py-2 rounded-md hover:bg-primary"
            >
              Créer la discussion
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
