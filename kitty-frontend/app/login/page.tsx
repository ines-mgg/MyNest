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
  const [resMessage, setResMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profil");
    }
  }, [isAuthenticated, router]);

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
        router.push("/profil");
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Erreur API :", error.response.data.message);
        setResMessage(error.response.data.message);
      } else {
        console.error("Erreur réseau :", error.message);
        setResMessage("Une erreur réseau est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <>
      {checkingAuth ? (
        <Spinner />
      ) : (
        <div className="flex flex-col h-screen items-center justify-center mx-auto">
          {resMessage && (
            <div className="mb-4 text-center font-medium text-red-500">
              {resMessage}
            </div>
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
                <Button type="submit" className="w-full bg-accent-color">
                  Se connecter
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <span>Pas de compte? </span>
              &nbsp;
              <Link href="/register" className="text-accent-color font-bold">
                Inscrivez vous
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
