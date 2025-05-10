import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Button } from "./ui/button";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-300 border-b border-gray-400 p-2 flex items-center justify-between">
      <Link href="/">
        <span className="text-3xl font-bold text-[#222222] hover:text-[#4682b4]">
          MyNest
        </span>
      </Link>
      <Link
        href="/about"
        className="text-lg font-bold text-[#222222] hover:text-[#4682b4]"
      >
        La communauté
      </Link>
      {isAuthenticated ? (
        <div className="flex gap-4 items-center">
          <Link
            href="/profil"
            className="bg-[#4682b4] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary"
          >
            Mon profil
          </Link>
          <Link
            href="/tchat"
            className="bg-[#4682b4] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary"
          >
            Mes discussions
          </Link>
          {/* <span className="text-[#222222] font-medium">
            {isAdmin ? "Bienvenue, Admin" : "Bienvenue, Utilisateur"}
          </span> */}
        </div>
      ) : (
        <Button className="bg-[#4682b4] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary">
          <Link href="/login">Se connecter</Link>
        </Button>
      )}
    </header>
  );
}
