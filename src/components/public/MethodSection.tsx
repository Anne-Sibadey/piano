import React from 'react';
import { IMAGES } from '../../assets/images';
import { Sparkles, UserCheck, BookOpen, Ear, Layers, Sun } from 'lucide-react';

export const MethodSection: React.FC = () => {
  const comparisonAspects = [
    {
      title: "Personnalisation & écoute",
      text: "L'apprentissage s'adapte à vos goûts, vos aspirations et vos contraintes d'agenda, sans programme imposé uniforme."
    },
    {
      title: "Choix du répertoire",
      text: "Vous participez activement au choix des œuvres : grands classiques, musiques de films, jazz, musiques contemporaines ou pièces néo-classiques."
    },
    {
      title: "Théorie musicale incarnée",
      text: "La compréhension du solfège et des accords est immédiatement rattachée à vos morceaux, pour que chaque notion prenne du sens sous vos doigts."
    },
    {
      title: "Travail de l'oreille & musicalité",
      text: "Développement de l'écoute intérieure, de la justesse rythmique et de la sensibilité au timbre, avant même la lecture purement visuelle."
    },
    {
      title: "Geste pianistique & décontraction",
      text: "Recherche d'un geste naturel et délié, utilisant le poids du bras pour éviter toute crispation ou fatigue musculaire."
    },
    {
      title: "Autonomie & plaisir durable",
      text: "Vous apprenez comment travailler sereinement chez vous, pour devenir rapidement autonome et conserver l'envie de jouer toute votre vie."
    }
  ];

  const targetAudiences = [
    {
      badge: "Tous âges",
      title: "Grands Débutants",
      description: "Pour celles et ceux qui n'ont jamais touché un piano ou lu une note. Une méthode progressive qui vous fait jouer dès la première séance, sans prérequis rébarbatifs."
    },
    {
      badge: "Dès 6-7 ans",
      title: "Enfants",
      description: "Un éveil stimulant et joyeux où le jeu, le chant et la coordination se rencontrent. Les bases solides se construisent dans la valorisation et l'encouragement constant."
    },
    {
      badge: "11-17 ans",
      title: "Adolescents",
      description: "Un espace d'expression artistique valorisant. Possibilité d'aborder des musiques actuelles, du jazz ou des bandes originales, tout en consolidant les acquis techniques."
    },
    {
      badge: "Actifs & retraités",
      title: "Adultes",
      description: "Conçu pour s'intégrer harmonieusement à une vie active ou à un temps retrouvé. Une parenthèse hebdomadaire bienfaisante, exigeante mais dénuée de tout stress compétitif."
    },
    {
      badge: "Après une pause",
      title: "Reprise du Piano",
      description: "Vous avez fait du piano il y a quelques années (ou décennies) et souhaitez renouer avec l'instrument ? Nous libérons les blocages passés pour retrouver le pur bonheur de jouer."
    }
  ];

  return (
    <section id="methode" className="py-20 md:py-28 bg-[#F4EFEA]/60 border-t border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Philosophie d'enseignement</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            Une approche vivante, exigeante et libérée de la rigidité académique
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Les conservatoires et écoles institutionnelles accomplissent un travail formidable pour former les futurs professionnels. Mon atelier propose une alternative complémentaire : une formation rigoureuse et bienveillante, dédiée à celles et ceux qui souhaitent faire de la musique un plaisir intime, épanouissant et sur-mesure.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm">
              <h3 className="font-serif-display text-2xl text-[#1E1B18] font-medium mb-3">
                L’équilibre entre rigueur technique et liberté musicale
              </h3>
              <p className="text-sm sm:text-base text-[#5A544D] leading-relaxed mb-4">
                La technique pianistique n'est pas une fin en soi : elle n'a d'intérêt que si elle vous donne la liberté d'exprimer une intention, une nuance, un sentiment. 
              </p>
              <p className="text-sm sm:text-base text-[#5A544D] leading-relaxed">
                Plutôt que d'aligner des heures d'exercices mécaniques sans contexte, chaque geste technique est abordé directement à travers les œuvres que vous aimez, avec des clés concrètes pour libérer la respiration et la souplesse corporelle.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-xl border border-[#E8E2D8]">
                <div className="flex items-center gap-2.5 mb-2 text-[#1E1B18]">
                  <Ear className="w-4 h-4 text-[#B0824B]" />
                  <h4 className="font-medium text-sm">Développer l'écoute</h4>
                </div>
                <p className="text-xs text-[#6A635B] leading-relaxed">
                  Apprendre à entendre le silence, la couleur harmonique et la résonance de la corde.
                </p>
              </div>

              <div className="p-5 bg-white rounded-xl border border-[#E8E2D8]">
                <div className="flex items-center gap-2.5 mb-2 text-[#1E1B18]">
                  <Sparkles className="w-4 h-4 text-[#B0824B]" />
                  <h4 className="font-medium text-sm">L'interprétation avant tout</h4>
                </div>
                <p className="text-xs text-[#6A635B] leading-relaxed">
                  Comprendre l'histoire du compositeur et faire chanter la ligne mélodique avec votre propre sensibilité.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-md bg-[#FAF8F5]">
              <img
                src={IMAGES.handsKeys}
                alt="Mains sur le clavier et partitions de piano"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6 bg-white border-t border-[#E8E2D8]">
                <blockquote className="font-serif-display text-lg text-[#1E1B18] italic leading-snug">
                  « Le piano n'est pas un meuble d'exercices, c'est un orchestre sous dix doigts. Le secret réside dans le plaisir de la résonance. »
                </blockquote>
                <p className="text-xs text-[#8A8275] mt-2">
                  — Note de philosophie pédagogique de l'atelier
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 6 Core Aspects Grid */}
        <div className="mb-24">
          <div className="mb-8">
            <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18]">
              Les 6 axes de notre travail au piano
            </h3>
            <p className="text-sm text-[#6A635B] mt-1">
              Des piliers clairs pour une progression équilibrée sans surcharge cognitive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisonAspects.map((aspect, idx) => (
              <div
                key={aspect.title}
                className="p-6 bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D5C7B0] transition-colors"
              >
                <div className="text-xs font-semibold text-[#B0824B] tracking-wider mb-2">
                  0{idx + 1}
                </div>
                <h4 className="font-serif-display text-lg text-[#1E1B18] font-medium mb-2">
                  {aspect.title}
                </h4>
                <p className="text-sm text-[#5A544D] leading-relaxed">
                  {aspect.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Target Audience Section: "À qui s'adressent ces cours ?" */}
        <div className="pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="font-serif-display text-3xl sm:text-4xl text-[#1E1B18] font-normal">
              À qui s'adressent ces cours ?
            </h3>
            <p className="text-sm sm:text-base text-[#6A635B] mt-2">
              Quel que soit votre âge ou votre relation passée avec la musique, la porte vous est grande ouverte.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {targetAudiences.map((aud) => (
              <div
                key={aud.title}
                className="p-6 bg-white rounded-xl border border-[#E8E2D8] flex flex-col justify-between hover:shadow-sm transition-all"
              >
                <div>
                  <div className="text-xs font-medium text-[#7A7369] mb-2">
                    {aud.badge}
                  </div>
                  <h4 className="font-serif-display text-xl text-[#1E1B18] font-medium mb-3">
                    {aud.title}
                  </h4>
                  <p className="text-sm text-[#5A544D] leading-relaxed">
                    {aud.description}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F2ECE3] flex items-center justify-between text-xs text-[#B0824B] font-medium">
                  <span>Programme adapté</span>
                  <span>1er rendez-vous sans engagement</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
