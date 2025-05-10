/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/authContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ConfirmResetPassword() {
  const router = useRouter();
  const { token } = useParams();
  const [message, setMessage] = useState<string | null>(null);
  const { isAuthenticated, checkingAuth } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !checkingAuth) {
      router.push("/profil");
    }
  }, [checkingAuth, isAuthenticated, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      if (res.status === 201) {
        setMessage(
          res.data.message || "Votre mot de passe a été mofidié avec succès !"
        );
        setTimeout(() => {
          router.push("/login");
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
      <div className="flex flex-col h-screen items-center justify-center mx-auto">
        {message && (
          <span className="mb-4 text-center font-medium text-red-500">
            {message}
          </span>
        )}
        <Card className="min-w-[400px]">
          <CardHeader>
            <CardTitle>Entrez votre nouveau mot de passe</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input type="password" name="password" />
              </div>
              <Button type="submit" className="w-full bg-[#4682b4]">
                Modifier le mot de passe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
