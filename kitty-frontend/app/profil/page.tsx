"use client";

import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@/types/user";
import Spinner from "@/components/spinner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Profil() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        try {
          const res = await api.get("users/connected/profil");
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
      <Card className="min-w-[1136px] min-h-[505px] border-accent-color flex p-1">
        <section className="flex flex-col bg-accent-color justify-center items-center max-w-[378px] gap-2 p-2">
          {profile.profilPicture ? (
            <Image
              src={profile.profilPicture}
              alt={`photo de profil - ${profile.username}`}
            />
          ) : (
            <div className="w-24 h-24 rounded-full text-white text-3xl font-bold">
              {profile.username.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-bold text-xl">{profile.username}</span>
            <hr className="w-full border-t border-gray-300 my-4" />
          <Button onClick={logout} className="font-semibold">
            Se déconnecter
          </Button>
        </section>
        <section></section>
      </Card>
      {/* button delete profil ici */}
    </div>
  );
}
