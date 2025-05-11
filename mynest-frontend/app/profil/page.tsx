"use client";

import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import { Conversation } from "@/types/conversation";
import Spinner from "@/components/spinner";
import DeleteUser from "@/components/deleteUser";
import UpdateUserModal from "@/components/updateUserModal";
import Link from "next/link";

export default function Profil() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

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
  }, [checkingAuth, isAuthenticated, router, profile]);

  return (
    <>
      {checkingAuth || !profile ? (
        <Spinner />
      ) : (
        <div className="flex flex-col items-center gap-4 border-[#808080] border-2 min-h-screen bg-gray-200 shadow-inner p-4">
          <span className="font-bold text-2xl text-white bg-[#0078d7] p-2 rounded-md shadow-md">
            Bienvenue, {profile.username} !
          </span>
          <div className="flex flex-col items-center justify-between gap-4 bg-gray-300 p-4 rounded-md shadow-md">
            {profile.profilPicture ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/profil-pictures/${profile.profilPicture}`}
                alt={`photo de profil - ${profile.username}`}
                width={96}
                height={96}
                className="border border-gray-500 rounded-full"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-400 text-white text-3xl font-bold flex items-center justify-center">
                {profile.username.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => setShowUpdateModal(true)}
                className="px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#0078d7",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
              >
                Modifier
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#0078d7",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
              >
                Déconnexion
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#ff5c5c",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
              >
                Supprimer
              </button>
            </div>
          </div>
          <div className="w-full mt-4 bg-gray-300 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2 text-[#0078d7]">
              Derniers messages
            </h2>
            {profile.conversations && profile.conversations.length > 0 ? (
              <div className="flex flex-col gap-4">
                {profile.conversations.map((conversation: Conversation) => (
                  <Link
                    href={`/tchat/${conversation.id}`}
                    key={conversation.id}
                    className="p-4 border border-gray-400 rounded-md shadow-inner bg-gray-200 hover:bg-gray-300"
                  >
                    <h3 className="font-semibold text-lg text-gray-900">
                      {conversation.roomName}
                    </h3>
                    {conversation.messages &&
                    conversation.messages.length > 0 ? (
                      <div className="mt-2 flex items-start gap-3 p-3 bg-gray-300 rounded-md shadow-inner">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/profil-pictures/${conversation.messages[0].sender.profilPicture}`}
                          alt={`photo de profil - ${profile.username}`}
                          width={40}
                          height={40}
                          className="rounded-full border border-gray-500"
                        />
                        <div>
                          <p
                            className="p-2 rounded-md shadow-inner"
                            style={{
                              backgroundColor:
                                conversation.messages[0].sender
                                  .customBubbleColor || "#f0f0f0",
                            }}
                          >
                            {conversation.messages[0].content}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            <span className="font-medium">
                              {conversation.messages[0].sender.username}
                            </span>
                            <span className="text-gray-400"> - </span>
                            {new Date(
                              conversation.messages[0].createdAt
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-500">Aucun message reçu</p>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                Vous n&apos;avez pas encore de conversations.
              </p>
            )}
          </div>
          {showUpdateModal && (
            <UpdateUserModal
              userInfos={profile}
              closeModal={setShowUpdateModal}
            />
          )}
          {showDeleteModal && (
            <DeleteUser
              action={handleDeleteAccount}
              closeModal={setShowDeleteModal}
            />
          )}
        </div>
      )}
    </>
  );
}
