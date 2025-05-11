/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Spinner from "@/components/spinner";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth, login } = useAuth();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && !checkingAuth) {
      router.push("/profil");
    }
  }, [checkingAuth, isAuthenticated, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await api.post("auth/login", {
        email,
        password,
      });
      if (res.status === 200) {
        login(res.data.token);
        setTimeout(() => {
          router.push("/profil");
        }, 3000);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Erreur API :", error.response.data.message);
        setMessage(error.response.data.message);
      } else {
        console.error("Erreur réseau :", error.message);
        setMessage("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <>
      {checkingAuth ? (
        <Spinner />
      ) : (
        <div className="flex flex-col h-screen items-center justify-center bg-gray-200 font-tahoma text-gray-800">
          {message && (
            <span className="mb-4 text-center font-medium text-red-500">
              {message}
            </span>
          )}
          <div
            className="border border-gray-400 bg-gray-300 p-6 shadow-inner w-[400px]"
            style={{
              borderColor: "#808080",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
            }}
          >
            <div className="border-b border-gray-400 pb-2 mb-4">
              <h1 className="text-2xl font-bold text-center text-gray-900">
                Connexion
              </h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-2 py-1 border border-gray-800 bg-gray-200 shadow-inner focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-900"
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  className="w-full px-2 py-1 border border-gray-800 bg-gray-200 shadow-inner focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white font-bold text-center"
                style={{
                  backgroundColor: "#0078d7",
                  border: "2px solid #000",
                  boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
                  textShadow: "1px 1px 2px #000",
                }}
              >
                Se connecter
              </button>
            </form>
            <div className="mt-4 border-t border-gray-400 pt-4 text-sm">
              <div className="mb-2">
                <span>Pas de compte ? </span>
                <Link href="/register" className="text-blue-600 font-bold">
                  Inscrivez-vous
                </Link>
              </div>
              <div>
                <span>Mot de passe oublié ? </span>
                <Link
                  href="/login/reset-password"
                  className="text-blue-600 font-bold"
                >
                  Cliquez ici
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}