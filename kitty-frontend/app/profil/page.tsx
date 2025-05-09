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
import DeleteUser from "@/components/deleteUser";

export default function Profil() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth, logout } = useAuth();
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
      if (!isAuthenticated && !checkingAuth) {
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
  }, [checkingAuth, isAuthenticated, router]);

  return (
    <>
      {checkingAuth || !profile ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center gap-6 p-6 bg-neutral-light min-h-screen">
          <h1 className="font-bold text-3xl text-color-primary">
            Bienvenue sur votre profil, {profile.username} !
          </h1>
          <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
            {/* Profil Section */}
            <section className="flex flex-col items-center bg-secondary p-6 rounded-lg shadow-lg w-full md:w-1/3">
              {profile.profilPicture ? (
                <Image
                  src={profile.profilPicture}
                  alt={`photo de profil - ${profile.username}`}
                  width={96}
                  height={96}
                  className="rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-accent text-white text-3xl font-bold flex items-center justify-center">
                  {profile.username.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="font-bold text-xl mt-4 text-primary">
                {profile.username}
              </span>
              <hr className="w-full border-t border-gray-300 my-4" />
              <Button
                onClick={logout}
                className="font-semibold bg-accent text-white hover:bg-primary hover:text-secondary"
              >
                Se déconnecter
              </Button>
            </section>

            {/* Update Forms */}
            <div className="flex flex-col gap-6 w-full md:w-2/3">
              <UpdateUserForm user={profile} />
              <UpdateUserPasswordForm />
            </div>
          </div>

          {/* Delete Account Section */}
          <Button
            className="self-start bg-red-500 text-white hover:bg-red-600"
            onClick={() => setShowModal(true)}
          >
            Supprimer le compte
          </Button>
          {showModal && (
            <DeleteUser
              action={handleDeleteAccount}
              closeModal={setShowModal}
            />
          )}
        </div>
      )}
    </>
  );
}
