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

export default function Register() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth } = useAuth();
  const [message, setMessage] = useState<string | null>();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profil");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await api.post("auth/register", {
        username,
        email,
        password,
      });
      setMessage(res.data.message);
      if (res.status === 200) {
        setTimeout(() => {
          router.push("/login");
        }, 5000);
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
            <div className="mb-4 text-center font-medium">{message}</div>
          )}
          <Card className="min-w-[400px]">
            <CardHeader>
              <CardTitle>Inscription</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Pseudo</Label>
                  <Input type="text" name="username" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" name="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input type="password" name="password" />
                </div>
                <Button type="submit" className="w-full bg-accent-color">
                  S&apos;inscrire
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <span>Déjà un compte? </span>
              &nbsp;
              <Link href="/login" className="text-accent-color font-bold">
                Connectez vous
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
}
