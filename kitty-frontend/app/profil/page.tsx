"use client";

import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import UpdateUserPasswordForm from "@/components/updateUserPasswordForm";
import UpdateUserForm from "@/components/updateUserForm";

export default function Profil() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    try {
      await api.delete("auth/profil");
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        try {
          const res = await api.get("auth/profil");
          setProfile(res.data);
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
        }
      }
    }
    fetchData();
  }, [isAuthenticated, router]);

  if (!profile) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Mon profil</h1>
      <div className="max-w-[1136px] border-none shadow-none flex justify-between py-0.5">
        <section className="flex flex-col bg-accent-color justify-center items-center h-full gap-2 p-2 rounded">
          {profile.profilPicture ? (
            <Image
              src={profile.profilPicture}
              alt={`photo de profil - ${profile.username}`}
            />
          ) : (
            <div className="w-24 h-24 rounded-full text-white text-3xl font-bold flex items-center justify-center">
              {profile.username.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-bold text-xl">{profile.username}</span>
          <hr className="w-full border-t border-gray-300 my-4" />
          <Button onClick={logout} className="font-semibold">
            Se déconnecter
          </Button>
        </section>
        <UpdateUserForm user={profile} />
        <UpdateUserPasswordForm />
      </div>
      <Button className="self-start" onClick={() => setShowModal(true)}>
        Supprimer le compte
      </Button>
      {showModal && (
        <div className="inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-4">
              Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
              irréversible.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setShowModal(false)}
                className="font-semibold"
              >
                Annuler
              </Button>
              <Button
                onClick={handleDeleteAccount}
                className="font-semibold bg-red-500 text-white"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
