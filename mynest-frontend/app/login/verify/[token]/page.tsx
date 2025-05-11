/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Spinner from "@/components/spinner";

export default function VerifyToken() {
  const router = useRouter();
  const { token } = useParams();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const res = await api.get(`/auth/verify/${token}`);
        setMessage(
          res.data.message || "Votre compte a été vérifié avec succès !"
        );
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } catch (error: any) {
        if (error.response) {
          setMessage(error.response.data.message || "Une erreur est survenue.");
        } else {
          setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
        }
      }
    };

    if (token) {
      verifyToken();
    }
  }, [router, token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Vérification du compte</h1>
      {message ? <p className="text-center">{message}</p> : <Spinner />}
    </div>
  );
}
