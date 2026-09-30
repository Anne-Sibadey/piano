import React from 'react';
import { Calendar, Clock, Compass, MessageCircle } from 'lucide-react';
import { IMAGES } from '../../assets/images';

export const CoursesSection: React.FC<{ city?: string }> = ({ city }) => {
  const cards = [
    { icon: Clock, title: 'Fréquence & Rythme', foot: 'Créneaux de 30 min, 45 min ou 1h',
      text: "Cours particuliers hebdomadaires, sur un créneau fixe réservé à l'élève pour toute l'année scolaire (du lundi au vendredi)." },
    { icon: Calendar, title: "Organisation de l'Année", foot: 'Rythme aligné sur le calendrier scolaire',
      text: "L'année s'organise de la rentrée de septembre à la fin juin (début juillet selon les années). Les cours sont suspendus pendant les vacances scolaires et les jours fériés." },
    { icon: Compass, title: 'Suivi Individuel', foot: "Conseils d'écoute & partitions adaptées",
      text: "À la fin de chaque séance, les points travaillés et les objectifs de la semaine sont notés. Vous repartez avec des consignes claires pour votre pratique à domicile." },
    { icon: MessageCircle, title: 'Communication & Ponctualité', foot: 'Un dialogue simple et transparent',
      text: "Un échange régulier avec les élèves et leurs parents sur les progrès et les objectifs à venir. Les cours commencent et se terminent à l'heure, pour respecter le temps de chacun." },
  ];

  return (
    <section id="cours" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Organisation & Fonctionnement</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            Comment se déroulent les cours au quotidien ?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Un cadre de travail clair et régulier, pensé pour offrir la meilleure progression possible tout en respectant votre rythme de vie.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          <div className="lg:col-span-5 flex flex-col">
            <div className="rounded-2xl overflow-hidden border border-[#E8E2D8] bg-[#EFE9DF] shadow-md h-full flex flex-col justify-between">
              <img
                src={IMAGES.studentLesson}
                alt="Séance de cours de piano particulier"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display text-xl text-[#1E1B18] mb-2 font-medium">
                    La salle de piano & l'instrument
                  </h3>
                  <p className="text-sm text-[#5A544D] leading-relaxed">
                    Les cours ont lieu sur un véritable piano acoustique, entretenu et accordé plusieurs fois par an, pour une sensibilité tactile et une palette de nuances incomparables.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#F2ECE3] text-xs text-[#7A7369]">
                  Salle de cours privée, calme et lumineuse à {city || '[Ville / Quartier]'}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map(({ icon: Icon, title, text, foot }) => (
              <div key={title} className="p-6 bg-white rounded-xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5C7B0] transition-colors">
                <div>
                  <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif-display text-lg text-[#1E1B18] font-medium mb-2">{title}</h4>
                  <p className="text-sm text-[#5A544D] leading-relaxed">{text}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-xs text-[#8A8275]">{foot}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
