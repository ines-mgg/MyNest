import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Groupes de Discussion Vinyles : Genres, Collections, Matériel | Groove Talk",
  description:
    "Explorez les groupes de discussion de Groove Talk dédiés à différents aspects du vinyle : rock, jazz, classique, collections rares, matériel audio, etc. Trouvez les conversations qui vous intéressent !",
};

export default function About() {
  return (
    <main className="py-10 px-6 bg-neutral-light">
      <section className="text-center">
        <h1 className="text-4xl font-bold text-[#222222]">
          Explorez nos Groupes de Discussion Vinyles
        </h1>
        <p className="mt-4 text-lg text-neutral-medium">
          Sur Groove Talk, les conversations s&apos;organisent autour de vos
          centres d&apos;intérêt. Découvrez nos groupes de discussion dédiés à
          une variété de sujets liés au monde du vinyle.
        </p>
      </section>
      <section className="mt-10">
        <p className="text-neutral-medium">
          Que votre passion se porte sur le rock vintage, le jazz soulful, les
          symphonies classiques sur galette noire, ou que vous soyez un fervent
          collectionneur de pressages originaux et d&apos;éditions limitées,
          vous trouverez un espace pour partager votre expertise et apprendre
          des autres. Nous avons également des canaux dédiés au matériel audio,
          aux conseils d&apos;entretien de vos vinyles, et aux discussions
          générales sur la culture vinyle. Rejoignez les groupes qui vous
          passionnent et commencez à échanger avec d&apos;autres amoureux du son
          analogique.
        </p>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-[#222222]">
          Nos Groupes de Discussion
        </h2>
        <ul className="mt-6 space-y-6">
          <li className="bg-secondary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#222222]">
              Rock & Pop Vinyle
            </h3>
            <p className="text-[#222222]">
              Discutez des albums emblématiques, des raretés et des nouvelles
              sorties rock et pop sur vinyle. Partagez vos artistes préférés et
              vos découvertes.
            </p>
          </li>
          <li className="bg-secondary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#222222]">
              Jazz sur Vinyle
            </h3>
            <p className="text-[#222222]">
              Un espace pour les amateurs de jazz en vinyle. Échangez sur les
              grands classiques, les artistes contemporains et les pressages de
              collection.
            </p>
          </li>
          <li className="bg-secondary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#222222]">
              Vinyle Classique
            </h3>
            <p className="text-[#222222]">
              Explorez le monde de la musique classique sur vinyle. Partagez vos
              interprétations favorites et discutez des qualités sonores des
              enregistrements analogiques.
            </p>
          </li>
          <li className="bg-secondary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#222222]">
              Collections Rares & Limitées
            </h3>
            <p className="text-[#222222]">
              Montrez vos trouvailles, demandez des estimations et discutez des
              astuces pour dénicher des pépites rares.
            </p>
          </li>
          <li className="bg-secondary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#222222]">
              Platines & Matériel Audio
            </h3>
            <p className="text-[#222222]">
              Tout ce qui concerne les platines vinyles, les amplificateurs, les
              enceintes et l&apos;amélioration de votre système audio pour une
              écoute optimale.
            </p>
          </li>
          <li className="bg-secondary p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-[#222222]">
              Entretien & Nettoyage Vinyle
            </h3>
            <p className="text-[#222222]">
              Partagez vos méthodes et posez vos questions sur le nettoyage et
              la conservation de vos précieux disques.
            </p>
          </li>
        </ul>
      </section>
    </main>
  );
}
