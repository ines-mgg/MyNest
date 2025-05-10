/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/types/user";
import api from "@/lib/api";
import { useState } from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
      <span className="font-bold text-xl">Modifier mon profil</span>
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <div className="space-y-2">
          <Label htmlFor="newEmail">Adresse mail</Label>
          <Input
            type="text"
            name="newEmail"
            id="newEmail"
            defaultValue={email}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPseudo">Pseudo</Label>
          <Input
            type="text"
            name="newPseudo"
            id="newPseudo"
            defaultValue={username}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newBubbleColor">Couleur de bulle de tchat</Label>
          <Input
            type="color"
            name="newBubbleColor"
            id="newBubbleColor"
            defaultValue={customBubbleColor}
            required
          />
        </div>
        <Button type="submit" className="bg-[#4682b4]">
          Mettre à jour mon profil
        </Button>
      </form>
    </div>
  );
}
