import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import { ContactInquiry, TeacherSettings } from '../../types';

interface ContactSectionProps {
  settings: TeacherSettings;
  preselectedFormula?: string;
  onNewInquiry: (inquiry: ContactInquiry) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  settings,
  preselectedFormula,
  onNewInquiry
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: 'Adulte débutant',
    level: 'Grand débutant (jamais joué)',
    age: '',
    formula: preselectedFormula || 'Formule 45 minutes',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Update formula if user clicked a card in Pricing
  React.useEffect(() => {
    if (preselectedFormula) {
      setFormData((prev) => ({ ...prev, formula: preselectedFormula }));
    }
  }, [preselectedFormula]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newInq: ContactInquiry = {
        id: `inq-${Date.now()}`,
        firstName: formData.firstName.trim() || 'Visiteur',
        lastName: formData.lastName.trim() || '',
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        profile: formData.profile,
        level: formData.level,
        age: formData.age.trim() || 'Non précisé',
        formula: formData.formula,
        message: formData.message.trim(),
        createdAt: new Date().toISOString().split('T')[0],
        status: 'new'
      };

      onNewInquiry(newInq);
      setLoading(false);
      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        profile: 'Adulte débutant',
        level: 'Grand débutant (jamais joué)',
        age: '',
        formula: 'Formule 45 minutes',
        message: ''
      });
    }, 400);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#B0824B] mb-3">
            <span className="w-6 h-[1px] bg-[#B0824B]"></span>
            <span>Premier contact & Inscription</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal tracking-tight text-balance">
            Prenons contact pour échanger sur vos envies
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5A544D] leading-relaxed font-light">
            Une question sur les cours, un doute sur le niveau ou envie de réserver un premier créneau ? Remplissez ce formulaire et je vous répondrai dans les plus brefs délais.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8E2D8] shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 bg-[#FAF3EA] text-[#B0824B] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-2xl text-[#1E1B18] font-medium">
                  Votre demande a bien été transmise !
                </h3>
                <p className="text-sm text-[#5A544D] max-w-md mx-auto leading-relaxed">
                  Merci pour votre message. Je prends le temps d'étudier votre demande et vous recontacterai très prochainement par email ou par téléphone pour convenir d'un rendez-vous.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-xs font-medium text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl hover:bg-[#F2ECE3] transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Identity Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                      Prénom <span className="text-[#B0824B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex. Camille"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] focus:ring-1 focus:ring-[#B0824B] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                      Nom <span className="text-[#B0824B]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex. Martin"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] focus:ring-1 focus:ring-[#B0824B] transition-all"
                    />
                  </div>
                </div>

                {/* Contact Coordinates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                      Adresse Email <span className="text-[#B0824B]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@exemple.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] focus:ring-1 focus:ring-[#B0824B] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                      Téléphone <span className="text-[#B0824B]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="06 00 00 00 00"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] focus:ring-1 focus:ring-[#B0824B] transition-all"
                    />
                  </div>
                </div>

                {/* Profile, Age & Level */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                      Profil de l'élève
                    </label>
                    <select
                      value={formData.profile}
                      onChange={(e) => setFormData({ ...formData, profile: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                    >
                      <option value="Enfant (6-11 ans)">Enfant (6-11 ans)</option>
                      <option value="Adolescent (12-17 ans)">Adolescent (12-17 ans)</option>
                      <option value="Adulte débutant">Adulte débutant</option>
                      <option value="Adulte reprise">Adulte reprise</option>
                      <option value="Parent pour son enfant">Parent pour son enfant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                      Âge de l'élève
                    </label>
                    <input
                      type="text"
                      placeholder="Ex. 9 ans ou 38 ans"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                      Niveau actuel
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                    >
                      <option value="Grand débutant (jamais joué)">Grand débutant</option>
                      <option value="Notions élémentaires (1 an)">Notions élémentaires (1 an)</option>
                      <option value="Intermédiaire (2 à 5 ans)">Intermédiaire (2 à 5 ans)</option>
                      <option value="Avancé (plus de 5 ans)">Avancé (plus de 5 ans)</option>
                      <option value="Reprise après arrêt">Reprise après arrêt</option>
                    </select>
                  </div>
                </div>

                {/* Desired Formula */}
                <div>
                  <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                    Formule souhaitée
                  </label>
                  <select
                    value={formData.formula}
                    onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                  >
                    <option value="Formule 30 minutes">Formule 30 minutes / semaine (enfants & initiation)</option>
                    <option value="Formule 45 minutes">Formule 45 minutes / semaine (format standard recommandé)</option>
                    <option value="Formule 1 heure">Formule 1 heure / semaine (approfondissement)</option>
                    <option value="À déterminer ensemble">Je souhaite un conseil pour choisir</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
                    Votre message ou vos attentes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Parlez-moi de votre projet musical, des morceaux que vous aimeriez jouer, ou de vos disponibilités habituelles..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] focus:ring-1 focus:ring-[#B0824B] transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl transition-all shadow-sm"
                >
                  <Send className="w-4 h-4 text-[#DFC79D]" />
                  <span>{loading ? 'Envoi en cours...' : 'Demander des informations'}</span>
                </button>

                <p className="text-[11px] text-[#8A8275]">
                  * Vos coordonnées restent strictement confidentielles et ne sont utilisées que dans le cadre de nos échanges sur les cours.
                </p>

              </form>
            )}
          </div>

          {/* Right Column: Studio Coordinates & Schedule Availability */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Contact Card */}
            <div className="p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-6">
              <h3 className="font-serif-display text-2xl text-[#1E1B18] font-medium">
                Coordonnées de l'Atelier
              </h3>
              
              <div className="space-y-4 text-sm text-[#5A544D]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#B0824B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1B18] block">Adresse du studio :</span>
                    <span>{settings.address || "[Adresse de l'atelier de piano à renseigner]"}</span>
                    <span className="block text-xs text-[#8A8275] mt-0.5">{settings.city || "[Ville]"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#B0824B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1B18] block">Téléphone :</span>
                    <span>{settings.phone || "+33 (0)6 [À renseigner]"}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#B0824B] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1B18] block">Courrier électronique :</span>
                    <span>{settings.email || "contact@[votre-domaine-piano].fr"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Box */}
            <div className="p-8 bg-[#FAF3EA] rounded-2xl border border-[#E0D5C3] space-y-3">
              <div className="flex items-center gap-2 text-[#B0824B]">
                <Clock className="w-5 h-5" />
                <h4 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                  Disponibilités & Horaires
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-[#5A544D] leading-relaxed">
                Les cours ont lieu du lundi au samedi sur rendez-vous individuel :
              </p>
              <ul className="text-xs text-[#5A544D] space-y-1.5 pt-1">
                <li>• <strong>Lundi, Mardi, Jeudi, Vendredi :</strong> 14h00 – 20h30</li>
                <li>• <strong>Mercredi :</strong> 09h00 – 19h30 (créneaux enfants & adultes)</li>
                <li>• <strong>Samedi :</strong> 09h00 – 15h00</li>
              </ul>
              <div className="pt-2 text-[11px] text-[#7A7369] italic">
                * Les créneaux de fin de journée (après 17h30) et du mercredi après-midi sont rapidement complets. N'hésitez pas à vous manifester en amont de la rentrée.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
