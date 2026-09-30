import React from 'react';
import { Calendar, Clock, RefreshCw, CheckCircle, Award, Compass } from 'lucide-react';
import { IMAGES } from '../../assets/images';

export const CoursesSection: React.FC = () => {
  return (
    <section id="cours" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Organisation & Fonctionnement</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            Comment se déroulent les cours au quotidien ?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Un cadre de travail clair, régulier et flexible, pensé pour vous offrir la meilleure progression possible tout en respectant votre rythme de vie.
          </p>
        </div>

        {/* Top Grid: Narrative & Practical Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Column: Visual Moment */}
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
                    L'atelier & l'instrument
                  </h3>
                  <p className="text-sm text-[#5A544D] leading-relaxed">
                    Les cours ont lieu sur un véritable piano acoustique d'expression, entretenu et accordé plusieurs fois par an, pour une sensibilité tactile et une palette de nuances incomparables.
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#F2ECE3] text-xs text-[#7A7369]">
                  Atelier privatif insonorisé et lumineux à [Ville / Quartier]
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Practical Rules */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5C7B0] transition-colors">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="font-serif-display text-lg text-[#1E1B18] font-medium mb-2">
                  Fréquence & Rythme
                </h4>
                <p className="text-sm text-[#5A544D] leading-relaxed">
                  Cours particuliers hebdomadaires sur un créneau fixe réservé à l'élève pour toute l'année scolaire (du lundi au samedi).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-xs text-[#8A8275]">
                Créneaux de 30 min, 45 min ou 1h
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5C7B0] transition-colors">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <h4 className="font-serif-display text-lg text-[#1E1B18] font-medium mb-2">
                  Organisation de l'Année
                </h4>
                <p className="text-sm text-[#5A544D] leading-relaxed">
                  L'année s'organise de début septembre à fin juin (environ 30 à 34 séances annuelles selon le calendrier officiel de la zone académique).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-xs text-[#8A8275]">
                Rythme aligné sur le calendrier scolaire
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5C7B0] transition-colors">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center mb-3">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h4 className="font-serif-display text-lg text-[#1E1B18] font-medium mb-2">
                  Absences & Reports
                </h4>
                <p className="text-sm text-[#5A544D] leading-relaxed">
                  En cas d'imprévu ou de maladie prévenue au moins 48 heures à l'avance, une solution de report ou de créneau de rattrapage est proposée dans la limite des disponibilités.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-xs text-[#8A8275]">
                Souplesse et compréhension mutuelle
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5C7B0] transition-colors">
              <div>
                <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center mb-3">
                  <Compass className="w-5 h-5" />
                </div>
                <h4 className="font-serif-display text-lg text-[#1E1B18] font-medium mb-2">
                  Suivi Individuel
                </h4>
                <p className="text-sm text-[#5A544D] leading-relaxed">
                  À la fin de chaque séance, les points travaillés et les objectifs hebdomadaires sont notés. Vous repartez avec des consignes claires pour votre pratique à domicile.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] text-xs text-[#8A8275]">
                Conseils d'écoute & partitions adaptées
              </div>
            </div>

          </div>

        </div>

        {/* School Holidays and Optional Workshops */}
        <div className="p-8 bg-[#F4EFEA] rounded-2xl border border-[#E8E2D8] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="font-serif-display text-2xl text-[#1E1B18] font-medium mb-2">
              Vacances scolaires & stages facultatifs
            </h3>
            <p className="text-sm text-[#5A544D] leading-relaxed">
              Les cours réguliers s'interrompent pendant les vacances scolaires pour permettre à chacun de se ressourcer. Des stages d'approfondissement thématiques (musique de chambre, découverte du jazz, harmonie ou préparation d'audition) sont régulièrement proposés sur inscription volontaire.
            </p>
          </div>
          <a
            href="#contact"
            className="shrink-0 px-6 py-3 text-sm font-medium text-[#1E1B18] bg-white hover:bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl transition-colors shadow-sm"
          >
            Renseignements sur les stages
          </a>
        </div>

      </div>
    </section>
  );
};
