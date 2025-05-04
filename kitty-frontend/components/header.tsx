import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Button } from "./ui/button";

export default function Header() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="p-2 flex justify-between items-center">
      <Link href="/">
        <span className="text-3xl font-bold text-gray-800">KittyChat</span>
      </Link>
      {isAuthenticated ? (
        <div className="flex gap-2 items-center">
          <Button className="bg-accent-color p-2 rounded-2xl font-semibold hover:bg-dark-accent-color">
            <Link href="/profil">Mon profil</Link>
          </Button>
        </div>
      ) : (
        <Button className="bg-accent-color p-2 rounded-2xl font-semibold hover:bg-dark-accent-color">
          <Link href="/login">Se connecter</Link>
        </Button>
      )}
    </header>
  );
}
