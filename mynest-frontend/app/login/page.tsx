/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";
import Spinner from "@/components/spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <div className="flex flex-col h-screen items-center justify-center mx-auto">
          {message && (
            <span className="mb-4 text-center font-medium text-red-500">
              {message}
            </span>
          )}
          <Card className="min-w-[400px]">
            <CardHeader>
              <CardTitle>Connexion</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" name="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input type="password" name="password" />
                </div>
                <Button type="submit" className="w-full bg-[#4682b4]">
                  Se connecter
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div>
                <span>Pas de compte ? </span>
                <Link href="/register" className="text-[#4682b4] font-bold">
                  Inscrivez-vous
                </Link>
              </div>
              <div>
                <span>Mot de passe oublié ? </span>
                <Link
                  href="/login/reset-password"
                  className="text-[#4682b4] font-bold"
                >
                  Cliquez ici
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
