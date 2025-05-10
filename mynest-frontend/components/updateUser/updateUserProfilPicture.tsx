/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";

export default function UpdateUserProfilPicture() {
  const [message, setMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("file") as File;
    if (!file) {
      setMessage("Vous devez saisir une image");
      return;
    }
    try {
      const res = await api.post("auth/profil-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        setMessage("Votre photo de profil a été mise à jour");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Erreur réseau :", error.message);
        setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className=" self-end flex flex-col justify-center items-center h-full gap-2 p-2">
      <span className="font-bold text-xl">Modifier ma photo de profil</span>
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <div className="space-y-2 flex flex-col justify-center items-center">
          <Label htmlFor="file">
            {file
              ? "Apperçu de votre photo de profil"
              : "Entrez une photo de profil"}
          </Label>
          {file && (
            <div className="mt-2 ">
              <Image
                src={URL.createObjectURL(file)}
                alt="Aperçu de la photo de profil"
                width={96}
                height={96}
              />
            </div>
          )}
          <Input
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg"
            required
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null;
              setFile(selectedFile);
            }}
          />
        </div>
        <Button type="submit" className="bg-[#4682b4]">
          Mettre à jour la photo de profil
        </Button>
      </form>
    </div>
  );
}
