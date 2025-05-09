import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { Button } from "./ui/button";

export default function Header() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <header className="p-4 flex justify-between items-center bg-color-neutral-light shadow-md">
      <Link href="/">
        <span className="text-3xl font-bold text-[#222222] hover:text-[#D4AF37]">
          Groove Talk
        </span>
      </Link>
      <nav className="flex gap-4">
        <Link
          href="/about"
          className="text-lg font-bold text-[#222222] hover:text-[#D4AF37]"
        >
          La communauté
        </Link>
      </nav>
      {isAuthenticated ? (
        <div className="flex gap-4 items-center">
          <Link
            href="/profil"
            className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary"
          >
            Mon profil
          </Link>
          <Link
            href="/tchat"
            className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary"
          >
            Mes discussions
          </Link>
          <span className="text-[#222222] font-medium">
            {isAdmin ? "Bienvenue, Admin" : "Bienvenue, Utilisateur"}
          </span>
        </div>
      ) : (
        <Button className="bg-[#D4AF37] text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary hover:text-secondary">
          <Link href="/login">Se connecter</Link>
        </Button>
      )}
    </header>
  );
}
