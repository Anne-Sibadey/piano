import React from 'react';
import { Check, Info } from 'lucide-react';
import { TeacherSettings } from '../../types';

interface PricingSectionProps {
  settings: TeacherSettings;
  onSelectFormula: (formulaName: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  settings,
  onSelectFormula
}) => {
  return (
    <section id="tarifs" className="py-20 md:py-28 bg-[#F4EFEA]/70 border-t border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Formules d'enseignement</span>
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            Tarifs annuels & formules adaptées à votre pratique
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Une tarification claire sous forme d'engagement annuel pour garantir un créneau régulier et un suivi approfondi tout au long de la saison.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {settings.formulas.map((formula, idx) => {
            const isFeatured = formula.id === '45min';

            return (
              <div
                key={formula.id}
                className={`relative rounded-2xl bg-white border p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'border-[#B0824B] shadow-md ring-1 ring-[#B0824B]/30 md:-translate-y-2'
                    : 'border-[#E8E2D8] hover:border-[#D5C7B0] hover:shadow-sm'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1E1B18] text-[#DFC79D] text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full shadow-sm">
                    Format le plus choisi
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-[#8A8275] uppercase tracking-wider">
                      {formula.durationMinutes} minutes / semaine
                    </span>
                    <h3 className="font-serif-display text-2xl text-[#1E1B18] font-medium mt-1">
                      {formula.name}
                    </h3>
                  </div>

                  <p className="text-xs text-[#6A635B] min-h-[36px] mb-6 leading-relaxed">
                    {formula.recommendedFor}
                  </p>

                  {/* Price Box with strict placeholder adherence */}
                  <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] mb-6 text-center">
                    <div className="text-xs text-[#7A7369] font-medium mb-1">
                      Tarif annuel
                    </div>
                    <div className="font-serif-display text-3xl font-semibold text-[#1E1B18] tracking-tight">
                      {formula.annualPrice}
                    </div>
                  </div>

                  <p className="text-xs text-[#5A544D] leading-relaxed mb-6">
                    {formula.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-[#F2ECE3]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                      Ce qui est inclus :
                    </div>
                    <ul className="space-y-2.5">
                      {formula.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-[#5A544D]">
                          <Check className="w-3.5 h-3.5 text-[#B0824B] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#F2ECE3]">
                  <button
                    onClick={() => onSelectFormula(formula.name)}
                    className={`w-full py-3 text-xs sm:text-sm font-medium rounded-xl transition-all ${
                      isFeatured
                        ? 'bg-[#1E1B18] text-white hover:bg-[#342F2B] shadow-sm'
                        : 'bg-[#FAF8F5] text-[#1E1B18] border border-[#D8D1C7] hover:bg-[#F2ECE3]'
                    }`}
                  >
                    Choisir ce format
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Breakdown of what is included */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-4 h-4" />
            </div>
            <div className="space-y-3">
              <h4 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                Comprendre le fonctionnement du forfait annuel
              </h4>
              <p className="text-xs sm:text-sm text-[#5A544D] leading-relaxed">
                Le tarif annuel correspond à l'ensemble des cours dispensés de septembre à juin (hors vacances scolaires). Il comprend la réservation inconditionnelle de votre créneau hebdomadaire, la préparation individualisée de chaque séance, le prêt ou la fourniture de partitions choisies, ainsi que l'accès au suivi pédagogique continu.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs text-[#6A635B]">
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#F0EBE2]">
                  <span className="font-medium text-[#1E1B18] block mb-0.5">Premier contact</span>
                  Une première séance d'échange et d'évaluation sans engagement.
                </div>
                <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#F0EBE2]">
                  <span className="font-medium text-[#1E1B18] block mb-0.5">Ajustement du créneau</span>
                  Possibilité de faire évoluer le jour ou l'horaire en cours d'année.
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
