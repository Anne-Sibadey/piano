import React from 'react';
import { Quote, User, PlusCircle } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  // Clear placeholder slots as specifically requested by user
  const placeholderTestimonials = [
    {
      id: 1,
      name: '[Prénom de l\'élève / parent]',
      meta: '[Âge ou profil : ex. Élève adulte depuis 2 ans]',
      quote: '[Témoignage à ajouter : retour d\'expérience sur la pédagogie, l\'ambiance des cours et les progrès constatés...]'
    },
    {
      id: 2,
      name: '[Prénom de l\'élève / parent]',
      meta: '[Âge ou profil : ex. Parent d\'un élève de 9 ans]',
      quote: '[Témoignage à ajouter : retour d\'expérience sur l\'apprentissage de son enfant, la bienveillance et la motivation retrouvée...]'
    },
    {
      id: 3,
      name: '[Prénom de l\'élève / parent]',
      meta: '[Âge ou profil : ex. Adulte en reprise après 15 ans d\'arrêt]',
      quote: '[Témoignage à ajouter : retour d\'expérience sur la levée des blocages techniques et le plaisir immédiat de rejouer...]'
    }
  ];

  return (
    <section id="temoignages" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Retours d'expérience</span>
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            Ils en parlent
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Découvrez les retours et ressentis des élèves et des familles qui partagent cette aventure pianistique.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {placeholderTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 bg-white rounded-2xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5C7B0] transition-colors relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#B0824B]/30 mb-4" />
                <p className="font-serif-display text-lg text-[#3A3530] italic leading-relaxed mb-6">
                  {item.quote}
                </p>
              </div>

              <div className="pt-6 border-t border-[#F2ECE3] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF3EA] border border-[#E8DFC8] flex items-center justify-center text-[#B0824B] shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-[#1E1B18]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#8A8275]">
                    {item.meta}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Authenticity & Customization */}
        <div className="max-w-2xl mx-auto p-4 bg-[#F4EFEA] rounded-xl border border-[#E8E2D8] text-center text-xs text-[#7A7369]">
          <span className="font-medium text-[#1E1B18]">Espace réservé aux avis authentiques : </span>
          Ces cartes sont prêtes à accueillir les véritables mots de vos élèves. Vous pourrez facilement les enrichir et ajouter leurs photographies ou prénoms.
        </div>

      </div>
    </section>
  );
};
