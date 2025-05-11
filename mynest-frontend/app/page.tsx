import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MyNest : Votre Réseau Social Rétro Inspiré de Windows 98",
  description:
    "Rejoignez MyNest, le réseau social rétro inspiré de Windows 98. Connectez-vous, personnalisez votre profil et vivez une expérience nostalgique.",
};

export default function Home() {
  return (
    <div className="bg-gray-200 min-h-screen font-tahoma text-gray-800">
      <main className="p-4">
        <section className="border border-gray-400 bg-gray-300 p-4 shadow-inner">
          <h2 className="text-xl font-bold mb-2">Bienvenue sur MyNest</h2>
          <p className="mb-4">
            MyNest est votre réseau social rétro, inspiré de l&apos;esthétique
            classique de Windows 98. Connectez-vous, personnalisez votre profil,
            et vivez une expérience nostalgique unique.
          </p>
          <Link
            href="/register"
            className="px-4 py-2 text-white font-bold text-center"
            style={{
              backgroundColor: "#0078d7",
              border: "2px solid #000",
              boxShadow: "inset -2px -2px 0 #fff, inset 2px 2px 0 #000",
              textShadow: "1px 1px 2px #000",
            }}
          >
            Rejoindre Maintenant
          </Link>
        </section>

        <section className="mt-6 border border-gray-400 bg-gray-300 p-4 shadow-inner">
          <h2 className="text-xl font-bold mb-2">Fonctionnalités</h2>
          <ul className="list-disc pl-6">
            <li>Personnalisez votre profil.</li>
            <li>Rencontrez des gens</li>
            <li>Explorez les posts de la communauté.</li>
            <li>Profitez d&apos;une interface utilisateur nostalgique.</li>
          </ul>
        </section>

        <section className="mt-6 border border-gray-400 bg-gray-300 p-4 shadow-inner">
          <h2 className="text-xl font-bold mb-2">Pourquoi MyNest ?</h2>
          <p>
            MyNest vous offre une expérience unique en combinant la nostalgie de
            Windows 98 avec les fonctionnalités modernes des réseaux sociaux.
            Rejoignez-nous et revivez l&apos;âge d&apos;or de
            l&apos;informatique !
          </p>
        </section>
      </main>
    </div>
  );
}
