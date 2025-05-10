/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
      <span className="font-bold text-xl">Modifier mon mot de passe</span>
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <div className="space-y-2">
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <Input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirmer le nouveau mot de passe
          </Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="bg-[#4682b4]">
          Mettre à jour le mot de passe
        </Button>
      </form>
    </div>
  );
}
