import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos de MyNest : Votre Réseau Social Rétro Inspiré de Windows 98",
  description:
    "Découvrez MyNest, un réseau social rétro inspiré de MySpace et de l'esthétique Windows 98. Connectez-vous, personnalisez votre profil et explorez des groupes de discussion uniques.",
};

export default function About() {
  return (
    <main className="py-10 px-6 bg-gray-200 font-tahoma text-gray-800">
      <section className="border border-gray-400 bg-gray-300 p-4 shadow-inner">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Bienvenue sur MyNest
        </h1>
        <p className="mt-4 text-center text-gray-700">
          MyNest est votre réseau social rétro, inspiré de MySpace et de
          l&apos;esthétique classique de Windows 98. Connectez-vous, personnalisez
          votre profil et explorez des groupes de discussion uniques.
        </p>
      </section>
      <section className="mt-10 border border-gray-400 bg-gray-300 p-4 shadow-inner">
        <h2 className="text-2xl font-semibold text-gray-900">
          Pourquoi choisir MyNest ?
        </h2>
        <p className="mt-4 text-gray-700">
          MyNest vous offre une expérience unique en combinant la nostalgie de
          Windows 98 avec les fonctionnalités modernes des réseaux sociaux.
          Rejoignez-nous pour :
        </p>
        <ul className="mt-4 list-disc pl-6 text-gray-700">
          <li>Créer et personnaliser votre profil avec des thèmes rétro.</li>
          <li>
            Rejoindre des groupes de discussion sur vos centres d&apos;intérêt.
          </li>
          <li>Partager vos pensées et interagir avec d&apos;autres utilisateurs.</li>
          <li>Explorer une interface utilisateur nostalgique et intuitive.</li>
        </ul>
      </section>
      <section className="mt-10 border border-gray-400 bg-gray-300 p-4 shadow-inner">
        <h2 className="text-2xl font-semibold text-gray-900">
          Nos Groupes de Discussion
        </h2>
        <p className="mt-4 text-gray-700">
          Découvrez des groupes de discussion variés et connectez-vous avec des
          personnes partageant vos passions :
        </p>
        <ul className="mt-6 space-y-6">
          <li className="bg-gray-200 border border-gray-400 p-4 shadow-inner">
            <h3 className="text-xl font-bold text-gray-900">Musique & Art</h3>
            <p className="text-gray-700">
              Discutez de vos artistes préférés, partagez vos créations et
              explorez les tendances artistiques.
            </p>
          </li>
          <li className="bg-gray-200 border border-gray-400 p-4 shadow-inner">
            <h3 className="text-xl font-bold text-gray-900">
              Technologie & Geek
            </h3>
            <p className="text-gray-700">
              Parlez de gadgets, de jeux vidéo rétro, et des dernières
              innovations technologiques.
            </p>
          </li>
          <li className="bg-gray-200 border border-gray-400 p-4 shadow-inner">
            <h3 className="text-xl font-bold text-gray-900">
              Lifestyle & Bien-être
            </h3>
            <p className="text-gray-700">
              Échangez sur des sujets comme la santé, le fitness, et les
              habitudes de vie positives.
            </p>
          </li>
          <li className="bg-gray-200 border border-gray-400 p-4 shadow-inner">
            <h3 className="text-xl font-bold text-gray-900">Cinéma & Séries</h3>
            <p className="text-gray-700">
              Partagez vos films et séries préférés, et découvrez de nouvelles
              recommandations.
            </p>
          </li>
          <li className="bg-gray-200 border border-gray-400 p-4 shadow-inner">
            <h3 className="text-xl font-bold text-gray-900">Gaming</h3>
            <p className="text-gray-700">
              Rejoignez des discussions sur les jeux vidéo rétro et modernes, et
              connectez-vous avec d&apos;autres gamers.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
