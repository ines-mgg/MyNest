/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/lib/api";
import { useState } from "react";
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
    <div className="self-end flex flex-col justify-center items-center h-full gap-2 p-2">
      <span className="font-bold text-xl text-gray-900">
        Modifier ma photo de profil
      </span>
      <form onSubmit={handleSubmit} className="space-y-4">
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <div className="space-y-2 flex flex-col justify-center items-center">
          <label htmlFor="file" className="text-gray-900 font-semibold">
            {file
              ? "Aperçu de votre photo de profil"
              : "Entrez une photo de profil"}
          </label>
          {file && (
            <div className="mt-2">
              <Image
                src={URL.createObjectURL(file)}
                alt="Aperçu de la photo de profil"
                width={96}
                height={96}
                className="border border-gray-800 rounded-full"
              />
            </div>
          )}
          <input
            type="file"
            name="file"
            id="file"
            accept="image/png, image/jpeg"
            required
            onChange={(e) => {
              const selectedFile = e.target.files?.[0] || null;
              setFile(selectedFile);
            }}
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
          Mettre à jour la photo de profil
        </button>
      </form>
    </div>
  );
}
