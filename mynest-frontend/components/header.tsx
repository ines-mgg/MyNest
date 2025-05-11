import Link from "next/link";
import { useAuth } from "@/context/authContext";

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-300 border-b border-gray-400 p-2 flex items-center justify-between shadow-inner">
      <Link href="/">
        <span className="text-3xl font-bold text-gray-900 hover:text-blue-600 font-tahoma">
          MyNest
        </span>
      </Link>
      {!isAuthenticated && (
        <Link
          href="/about"
          className="text-lg font-bold text-gray-900 hover:text-blue-600 font-tahoma"
        >
          La communauté
        </Link>
      )}

      {isAuthenticated ? (
        <div className="flex gap-4 items-center">
          <Link
            href="/profil"
            className="px-4 py-2 text-white font-bold text-center"
            style={{
              backgroundColor: "#0078d7",
              border: "2px solid #000",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
              textShadow: "1px 1px 2px #000",
            }}
          >
            Mon profil
          </Link>
          <Link
            href="/tchat"
            className="px-4 py-2 text-white font-bold text-center"
            style={{
              backgroundColor: "#0078d7",
              border: "2px solid #000",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
              textShadow: "1px 1px 2px #000",
            }}
          >
            Mes discussions
          </Link>
        </div>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 text-white font-bold text-center"
          style={{
            backgroundColor: "#0078d7",
            border: "2px solid #000",
            boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
            textShadow: "1px 1px 2px #000",
          }}
        >
          Se connecter
        </Link>
      )}
    </header>
  );
}
