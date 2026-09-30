import React from 'react';
import { Quote, User } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Marco Polo',
      quote: "Excellente professeure de piano, pédagogue et bienveillante, ma fille a rapidement progressé. Très bonne communication et ponctualité. Je la recommande sans hésitation.",
    },
    {
      name: 'Nicolas Guillou',
      quote: "Une super professeur de piano. Un travail assidu et complet qui mélange solfège et travail pratique en même temps. Une pédagogie adaptée et une très bonne communication.",
    },
    {
      name: 'Marie-Odile Manceau',
      quote: "Anne est une excellente professeure bienveillante et cadrante. Chacun de ses élèves progresse à son rythme, avec ses précieux conseils, dans un enseignement classique et très structuré. Je remercie Anne pour sa patience, aussi !",
    },
    {
      name: 'Carolina',
      quote: "Je suis à ma 2e année de cours de piano avec Anne qui est une excellente professeur. N'ayant jamais étudié les notes de musique on a commencé du début. La méthode est facile à appliquer et on joue rapidement ce qui rend l'apprentissage plus enthousiaste. Anne fait preuve d'une grande patience et d'un accompagnement généreux. Je recommande Anne les yeux fermés.",
    },
  ];

  return (
    <section id="temoignages" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
            Quelques avis laissés sur Google par des élèves et des familles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((item) => (
            <div key={item.name} className="p-8 bg-white rounded-2xl border border-[#E8E2D8] flex flex-col justify-between hover:border-[#D5C7B0] transition-colors">
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
                  <h4 className="font-medium text-sm text-[#1E1B18]">{item.name}</h4>
                  <p className="text-xs text-[#8A8275]">Avis Google</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
