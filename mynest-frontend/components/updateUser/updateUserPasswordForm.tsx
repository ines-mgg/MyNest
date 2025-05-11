/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";
import { useState } from "react";

export default function UpdateUserPasswordForm() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      const res = await api.patch("auth/profil-password", {
        password: newPassword,
      });
      if (res.status === 200) {
        setMessage("Votre mot de passe a été mis à jour");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Erreur réseau :", error.message);
        setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="self-end flex flex-col justify-center items-center h-full gap-2 p-2">
      <span className="font-bold text-xl text-gray-900">
        Modifier mon mot de passe
      </span>
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <div className="space-y-2">
          <label htmlFor="newPassword" className="text-gray-900 font-semibold">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-2 py-1 border border-gray-800 bg-gray-200 shadow-inner focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="text-gray-900 font-semibold"
          >
            Confirmer le nouveau mot de passe
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          Mettre à jour le mot de passe
        </button>
      </form>
    </div>
  );
}
