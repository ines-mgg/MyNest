import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Groove Talk : Chat en Temps Réel pour Passionnés de Vinyles",
  description:
    "Rejoignez Groove Talk, le chat en direct dédié aux amoureux des vinyles. Partagez vos découvertes, discutez de vos collections, trouvez des conseils et connectez-vous avec d’autres passionnés.",
};

export default function Home() {
  return (
    <>
      <section className="text-center py-10 bg-neutral-light">
        <h1 className="text-4xl font-bold text-[#222222]">
          Groove Talk : Connectez-vous à la Communauté des Passionnés de Vinyles
        </h1>
        <p className="mt-4 text-lg text-neutral-medium">
          Le son de votre passion, le rythme de vos conversations.
        </p>
      </section>
      <section className="py-10 px-6">
        <h2 className="text-2xl font-semibold text-[#222222]">
          Bienvenue sur Groove Talk
        </h2>
        <p className="mt-4 text-neutral-medium">
          L&apos;espace de discussion en temps réel conçu spécialement pour les
          passionnés de vinyles. Que vous soyez un collectionneur chevronné à la
          recherche de raretés, un audiophile en quête du son parfait, ou un
          nouvel adepte découvrant la richesse du format vinyle, vous trouverez
          ici une communauté chaleureuse et engagée.
        </p>
      </section>
      <section className="py-10 px-6 bg-secondary">
        <h2 className="text-2xl font-semibold text-[#222222]">
          Participez aux Conversations
        </h2>
        <p className="mt-4 text-[#222222]">
          Participez à des conversations animées sur vos albums préférés, les
          dernières sorties vinyles, les techniques de nettoyage de disques, les
          platines vinyles, et bien plus encore. Groove Talk est l&apos;endroit
          idéal pour échanger des conseils, partager vos trouvailles en matière
          de disquaires, et vivre pleinement votre passion pour la musique sur
          vinyle.
        </p>
      </section>
      <section className="py-10 px-6">
        <h2 className="text-2xl font-semibold text-[#222222]">
          Rejoignez la Communauté
        </h2>
        <p className="mt-4 text-neutral-medium">
          Rejoignez la conversation dès maintenant et faites vibrer votre amour
          pour les microsillons !
        </p>
        <br />
        <Link
          href="/register"
          className="mt-6 px-6 py-3 bg-[#D4AF37] text-white font-semibold rounded-lg shadow-md hover:bg-primary hover:text-secondary"
        >
          Rejoindre Maintenant
        </Link>
      </section>
    </>
  );
}
