import React from 'react';
import { IMAGES } from '../../assets/images';
import { TeacherSettings } from '../../types';
import { Music, GraduationCap, Heart, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  settings: TeacherSettings;
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  settings,
  onContactClick
}) => {
  return (
    <section id="a-propos" className="py-20 md:py-28 bg-[#F4EFEA]/70 border-t border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Présentation de l'enseignant</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            À propos du professeur
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Une transmission vivante de la musique, portée par l'amour de l'instrument et le souci du bien-être de l'élève.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Portrait & Studio Atmosphere */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#E8E2D8] bg-white shadow-md">
              <img
                src={IMAGES.teacher}
                alt="Portrait du professeur au piano"
                referrerPolicy="no-referrer"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="p-6">
                <h3 className="font-serif-display text-2xl text-[#1E1B18] font-medium">
                  {settings.teacherName}
                </h3>
                <p className="text-sm text-[#B0824B] font-medium mt-0.5">
                  {settings.title}
                </p>
                <p className="text-xs text-[#7A7369] mt-3 leading-relaxed">
                  Enseignement privé du piano à {settings.city || '[Ville]'} — Enfants, adolescents et adultes.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                Engagements de l'atelier
              </h4>
              <div className="space-y-2 text-xs text-[#5A544D]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B0824B] shrink-0" />
                  <span>Écoute attentive sans comparaison ni jugement</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B0824B] shrink-0" />
                  <span>Matériel acoustique soigné et entretenu</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#B0824B] shrink-0" />
                  <span>Pédagogie positive et valorisante</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Musical Journey & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Short Bio Block */}
            <div className="p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#1E1B18]">
                <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-2xl font-medium">
                  Biographie
                </h3>
              </div>
              <p className="text-base text-[#5A544D] leading-relaxed">
                {settings.shortBio}
              </p>
            </div>

            {/* Musical Journey (Parcours) */}
            <div className="p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#1E1B18]">
                <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-2xl font-medium">
                  Parcours musical & formation
                </h3>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] text-sm text-[#6A635B] leading-relaxed">
                {settings.musicalJourney}
              </div>
              <p className="text-xs text-[#8A8275] italic">
                * Note : Vous pourrez renseigner ici vos conservatoires, concours, maîtres de stage, diplômes d'État ou réalisations artistiques depuis l'espace administrateur ou directement dans le fichier de configuration.
              </p>
            </div>

            {/* Teaching Philosophy */}
            <div className="p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-4">
              <div className="flex items-center gap-3 text-[#1E1B18]">
                <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
                  <Music className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-2xl font-medium">
                  Philosophie d'enseignement
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#5A544D] leading-relaxed">
                {settings.teachingPhilosophy}
              </p>
              
              <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                <span className="text-xs text-[#7A7369]">Envie d'échanger sur votre projet musical ?</span>
                <button
                  onClick={onContactClick}
                  className="px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] rounded-xl hover:bg-[#342F2B] transition-colors"
                >
                  Prendre contact
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
