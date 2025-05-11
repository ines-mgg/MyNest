/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types/user";
import api from "@/lib/api";
import { useState } from "react";

export default function UpdateUserForm(user: { user: User }) {
  const {
    user: { email, username, customBubbleColor, isAccountActivated, role },
  } = user;
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("newEmail");
    const username = formData.get("newPseudo");
    const customBubbleColor = formData.get("newBubbleColor");

    try {
      const res = await api.patch("auth/profil", {
        role,
        email,
        username,
        customBubbleColor,
        isAccountActivated,
      });
      if (res.status === 200) {
        setMessage("Votre profil a été mis à jour");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Erreur réseau :", error.message);
        setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-full gap-2 p-2">
      <span className="font-bold text-xl text-gray-900">
        Modifier mon profil
      </span>
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <div className="space-y-2">
          <label htmlFor="newEmail" className="text-gray-900 font-semibold">
            Adresse mail
          </label>
          <input
            type="text"
            name="newEmail"
            id="newEmail"
            defaultValue={email}
            required
            className="w-full px-2 py-1 border border-gray-800 bg-gray-200 shadow-inner focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="newPseudo" className="text-gray-900 font-semibold">
            Pseudo
          </label>
          <input
            type="text"
            name="newPseudo"
            id="newPseudo"
            defaultValue={username}
            required
            className="w-full px-2 py-1 border border-gray-800 bg-gray-200 shadow-inner focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="newBubbleColor"
            className="text-gray-900 font-semibold"
          >
            Couleur de bulle de tchat
          </label>
          <input
            type="color"
            name="newBubbleColor"
            id="newBubbleColor"
            defaultValue={customBubbleColor}
            required
            className="w-full px-2 py-1 border border-gray-800 bg-gray-200 shadow-inner focus:outline-none"
          />
        </div>
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
          Mettre à jour mon profil
        </button>
      </form>
    </div>
  );
}
