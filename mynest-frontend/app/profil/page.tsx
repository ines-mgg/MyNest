"use client";

import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import { Conversation } from "@/types/conversation";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
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
        <div className="flex flex-col items-center gap-2 border-[#4682b4] border-2 min-h-screen bg-gray-200 shadow-inner">
          <span className="font-bold text-2xl text-gray-800 bg-gray-300 p-2 rounded-md shadow-md">
            Hey {profile.username} !
          </span>
          <div className="flex flex-col items-center justify-between gap-2 bg-gray-300 p-4 rounded-md shadow-md">
            <Image
              src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/profil-pictures/${profile.profilPicture}`}
              alt={`photo de profil - ${profile.username}`}
              width={96}
              height={96}
              className="border border-gray-500 rounded-full"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => setShowUpdateModal(true)}
                className="bg-[#4682b4] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary flex items-center gap-2 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.443 19.27a4.5 4.5 0 01-1.691 1.07l-3.386 1.128 1.128-3.386a4.5 4.5 0 011.07-1.691L16.862 3.487z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 7.5l6 6"
                  />
                </svg>
              </Button>
              <Button
                onClick={() => setShowDeleteModal(true)}
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-3-3v6"
                  />
                </svg>
              </Button>
              <Button
                onClick={logout}
                className="bg-[#777777] text-black px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary flex items-center gap-2 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-9A2.25 2.25 0 002.25 5.25v13.5A2.25 2.25 0 004.5 21h9a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <div className="w-full mt-4 bg-gray-300 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Derniers messages reçus
            </h2>
            {profile.conversations && profile.conversations.length > 0 ? (
              <div className="flex flex-col gap-4">
                {profile.conversations.map((conversation: Conversation) => (
                  <Link
                    href={`/tchat/${conversation.id}`}
                    key={conversation.id}
                    className="p-4 border rounded-lg shadow-md bg-gray-100 hover:bg-gray-200"
                  >
                    <h3 className="font-semibold text-lg hover:text-[#4682b4]">
                      {conversation.roomName}
                    </h3>
                    {conversation.messages &&
                    conversation.messages.length > 0 ? (
                      <div className="mt-2 flex items-start gap-3 p-3 bg-gray-200 rounded-lg shadow-sm">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_BACK_URL}/uploads/profil-pictures/${conversation.messages[0].sender.profilPicture}`}
                          alt={`photo de profil - ${profile.username}`}
                          width={40}
                          height={40}
                          className="rounded-full border border-gray-500"
                        />
                        <div>
                          <p
                            className="p-2 rounded-lg shadow-md"
                            style={{
                              backgroundColor:
                                conversation.messages[0].sender
                                  .customBubbleColor,
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
