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
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Présentation de l'enseignant</span>
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            À propos du professeur
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Une transmission vivante de la musique, portée par l'amour de l'instrument et le souci du bien-être de l'élève.
          </p>
        </div>

        {/* Portrait + présentation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          <div className="rounded-2xl overflow-hidden border border-[#E8E2D8] bg-white shadow-md">
            <img
              src={IMAGES.teacher}
              alt="Portrait du professeur au piano"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="space-y-5">
            <div>
              <h3 className="font-serif-display text-3xl text-[#1E1B18] font-medium">{settings.teacherName}</h3>
              <p className="text-sm text-[#B0824B] font-medium mt-1">{settings.title}</p>
              <p className="text-xs text-[#7A7369] mt-1">
                Enseignement privé du piano à {settings.city || '[Ville]'} — Enfants dès 6 ans, adolescents et adultes.
              </p>
            </div>
            <div className="flex items-center gap-3 text-[#1E1B18] pt-2 border-t border-[#E8E2D8]">
              <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-serif-display text-2xl font-medium">Biographie</h4>
            </div>
            <p className="text-base text-[#5A544D] leading-relaxed">{settings.shortBio}</p>
          </div>
        </div>

        {/* Parcours et philosophie côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 items-stretch">
          <div className="p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#1E1B18]">
              <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-2xl font-medium">Parcours musical & formation</h3>
            </div>
            <p className="text-base text-[#5A544D] leading-relaxed">{settings.musicalJourney}</p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-[#1E1B18]">
              <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-2xl font-medium">Philosophie d'enseignement</h3>
            </div>
            <p className="text-base text-[#5A544D] leading-relaxed">{settings.teachingPhilosophy}</p>
          </div>
        </div>

        {/* Engagements */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-3 gap-6">
          {['Écoute attentive sans comparaison ni jugement', 'Matériel acoustique soigné et entretenu', 'Pédagogie positive et valorisante'].map((t) => (
            <div key={t} className="flex items-start gap-2.5 text-sm text-[#5A544D]">
              <CheckCircle2 className="w-4 h-4 text-[#B0824B] shrink-0 mt-0.5" />
              <span>{t}</span>
            </div>
          ))}
        </div>

        {/* Appel à l'action centré */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#7A7369] mb-4">Envie d'échanger sur votre projet musical ?</p>
          <button
            onClick={onContactClick}
            className="px-7 py-3 text-sm font-medium text-white bg-[#1E1B18] rounded-xl hover:bg-[#342F2B] transition-colors"
          >
            Prendre contact
          </button>
        </div>

      </div>
    </section>
  );
};
