/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/authContext";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const { isAuthenticated, checkingAuth } = useAuth();
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

    try {
      const res = await api.post("auth/reset-password-request", {
        email,
      });
      if (res.status === 200) {
        setMessage(res.data.message || "Un mail vous a été envoyé !");
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
            <CardTitle>Vous avez oublié votre mot de passe ?</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" name="email" />
              </div>
              <Button type="submit" className="w-full bg-[#D4AF37]">
                Réinitialiser le mot de passe
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
