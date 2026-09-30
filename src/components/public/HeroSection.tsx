import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '../../assets/images';
import { TeacherSettings } from '../../types';

interface HeroSectionProps {
  settings: TeacherSettings;
  onExploreCourses: () => void;
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onExploreCourses,
  onContactClick
}) => {
  return (
    <section id="accueil" className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid: Headline + Visual Focal Anchor */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B]">
              <span className="w-6 h-[1px] bg-[#B0824B]"></span>
              <span>Enseignement du piano sur-mesure</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-[#1E1B18] font-normal leading-[1.12] tracking-tight text-balance">
              Le plaisir de jouer du piano, à votre rythme et avec passion.
            </h1>

            <p className="text-lg sm:text-xl text-[#5A544D] leading-relaxed max-w-2xl font-light">
              Des cours particuliers exigeants et bienveillants, pour les enfants dès 6 ans, les adolescents et les adultes. Un entre-deux entre le conservatoire et le loisir : le sérieux d’un enseignement structuré, la souplesse d’une méthode adaptée à chaque profil.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onExploreCourses}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl transition-all shadow-sm"
              >
                <span>Découvrir les cours</span>
                <ArrowRight className="w-4 h-4 text-[#DFC79D]" />
              </button>

              <button
                onClick={() => document.querySelector('#a-propos')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium text-[#1E1B18] bg-transparent hover:bg-[#F2ECE3] border border-[#D8D1C7] rounded-xl transition-colors"
              >
                <span>Découvrir la professeure</span>
              </button>

              <button
                onClick={onContactClick}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-medium text-[#1E1B18] bg-transparent hover:bg-[#F2ECE3] border border-[#D8D1C7] rounded-xl transition-colors"
              >
                <span>Me contacter</span>
              </button>
            </div>

            {/* Subtle trust & teacher signature line */}
            <div className="pt-4 border-t border-[#E8E2D8] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#7A7369]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#B0824B]" />
                <span>Salle de cours privée à {settings.city || '[Ville]'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#B0824B]" />
                <span>Piano acoustique</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#B0824B]" />
                <span>Tous niveaux & profils</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset with resilient fallback */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-[#E8E2D8] shadow-lg bg-[#EFE9DF]">
              <img
                src={IMAGES.hero}
                alt="Piano dans une salle de cours lumineuse"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] lg:aspect-[3/4] object-cover hover:scale-[1.02] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 text-white/95 pointer-events-none">
                <p className="font-serif-display text-xl font-normal leading-snug">
                  Un espace d'apprentissage feutré et inspirant
                </p>
                <p className="text-xs text-white/80 font-light mt-0.5">
                  Conçu pour libérer le geste et l'écoute pianistique
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 piliers */}
        <div className="mt-20 pt-14 border-t border-[#E8E2D8]">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#1E1B18] font-normal">
              Quatre piliers pour apprendre solidement
            </h2>
            <p className="text-[#6A635B] mt-2 text-base font-light">
              Une pédagogie structurée et bienveillante, pour progresser avec plaisir et régularité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] transition-all hover:border-[#D5C7B0] hover:shadow-sm">
              <div className="text-xs font-semibold text-[#B0824B] tracking-wider mb-3">01</div>
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium mb-2">
                Morceaux choisis avec l'élève
              </h3>
              <p className="text-sm text-[#5A544D] leading-relaxed">
                Le répertoire est construit en concertation : classique, musiques de films, jazz ou variété. La motivation naît du morceau que l’on a hâte de jouer.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] transition-all hover:border-[#D5C7B0] hover:shadow-sm">
              <div className="text-xs font-semibold text-[#B0824B] tracking-wider mb-3">02</div>
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium mb-2">
                Théorie intégrée à la pratique
              </h3>
              <p className="text-sm text-[#5A544D] leading-relaxed">
                Pas de cours de solfège déconnecté du piano. La lecture, le rythme et l'harmonie s'apprennent directement sur le clavier, avec les doigts et les oreilles.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] transition-all hover:border-[#D5C7B0] hover:shadow-sm">
              <div className="text-xs font-semibold text-[#B0824B] tracking-wider mb-3">03</div>
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium mb-2">
                Suivi pédagogique continu
              </h3>
              <p className="text-sm text-[#5A544D] leading-relaxed">
                Des objectifs clairs d'une semaine sur l'autre, des conseils de méthode précis pour le travail à la maison et un point d'étape régulier.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] transition-all hover:border-[#D5C7B0] hover:shadow-sm">
              <div className="text-xs font-semibold text-[#B0824B] tracking-wider mb-3">04</div>
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium mb-2">
                Progression sur-mesure
              </h3>
              <p className="text-sm text-[#5A544D] leading-relaxed">
                Chaque élève avance à son rythme, selon son âge, ses disponibilités et ses objectifs, avec un enseignement sérieux et adapté à son profil.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
