import React, { useState } from 'react';
import { X, FileText, Shield, Scale } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'cgu' | 'mentions' | 'privacy';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'cgu'
}) => {
  const [activeTab, setActiveTab] = useState<'cgu' | 'mentions' | 'privacy'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#E8E2D8] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#B0824B]" />
            <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
              Informations Légales & Contractuelles
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#E8E2D8] bg-[#FAF8F5] px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab('cgu')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'cgu'
                ? 'border-[#B0824B] text-[#1E1B18] font-semibold'
                : 'border-transparent text-[#7A7369] hover:text-[#1E1B18]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Conditions Générales</span>
          </button>

          <button
            onClick={() => setActiveTab('mentions')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'mentions'
                ? 'border-[#B0824B] text-[#1E1B18] font-semibold'
                : 'border-transparent text-[#7A7369] hover:text-[#1E1B18]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Mentions Légales</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'privacy'
                ? 'border-[#B0824B] text-[#1E1B18] font-semibold'
                : 'border-transparent text-[#7A7369] hover:text-[#1E1B18]'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Politique de Confidentialité</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-[#4A443E] text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: CGU (All 13 user sections) */}
          {activeTab === 'cgu' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#FAF3EA] border border-[#E0D5C3] rounded-xl text-xs text-[#7A7369]">
                <strong className="text-[#1E1B18]">Note de précaution légale : </strong>
                Ce document constitue une trame indicative organisée selon les rubriques usuelles de l'enseignement musical libéral. Les clauses entre crochets [ ] doivent être validées et personnalisées conformément à votre statut juridique et fiscal.
              </div>

              <div className="space-y-4">
                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    1. Objet
                  </h4>
                  <p>
                    Les présentes Conditions Générales régissent les modalités d'enseignement du piano dispensé par [Nom / Raison Sociale de l'Enseignant], ci-après dénommé « le Professeur », à toute personne inscrite ou représentée légalement, ci-après dénommée « l'Élève ».
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    2. Inscription
                  </h4>
                  <p>
                    L'inscription devient définitive après validation du créneau horaire hebdomadaire et réception du dossier d'inscription complété, ainsi que des modalités de règlement convenues.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    3. Organisation des cours
                  </h4>
                  <p>
                    Les cours particuliers sont dispensés à la salle de cours située au [Adresse] selon la formule convenue (30 minutes, 45 minutes ou 1 heure hebdomadaire). L'élève s'engage à respecter la ponctualité des séances afin de ne pas empiéter sur le cours suivant.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    4. Engagement annuel
                  </h4>
                  <p>
                    L'adhésion aux cours de piano implique un engagement pour l'année scolaire en cours (de septembre à juin), garantissant la continuité pédagogique et la réservation exclusive du créneau hebdomadaire.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    5. Paiement
                  </h4>
                  <p>
                    Le montant annuel est fixé selon la formule choisie : [Tarif annuel à renseigner]. Le paiement peut être échelonné en [1, 3 ou 10 versements] par [virement bancaire / chèques / prélèvement]. Tout trimestre entamé reste dû dans son intégralité.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    6. Absences de l'élève
                  </h4>
                  <p>
                    Toute absence doit être signalée au moins [48 heures à l'avance]. Dans la mesure des disponibilités du professeur et du planning hebdomadaire, un créneau de report pourra être envisagé. Tout cours annulé sans prévenance dans ce délai sera réputé dû et ne donnera lieu à aucun remboursement.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    7. Absences du professeur
                  </h4>
                  <p>
                    En cas d'absence exceptionnelle du professeur (maladie, cas de force majeure), les cours non dispensés feront l'objet d'un rattrapage programmé d'un commun accord ou, à défaut, d'un avoir ou d'un remboursement proportionnel.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    8. Vacances scolaires
                  </h4>
                  <p>
                    Les cours ne sont pas dispensés pendant les vacances scolaires de la zone [Zone académique A / B / C], sauf organisation spécifique de stages optionnels d'approfondissement sur inscription préalable.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    9. Résiliation
                  </h4>
                  <p>
                    En cas de motif impérieux et légitime (déménagement longue distance, raison médicale attestée rendant la pratique impossible), le contrat pourra être résilié moyennant un préavis écrit d'un mois [Modalités de préavis et de calcul à valider].
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    10. Responsabilités
                  </h4>
                  <p>
                    Pour les élèves mineurs, la responsabilité du professeur est engagée exclusivement pendant la durée effective de la séance à l'intérieur du studio. Les parents sont tenus de s'assurer de la présence du professeur avant de laisser leur enfant.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    11. Données personnelles
                  </h4>
                  <p>
                    Les informations recueillies sont nécessaires à la gestion administrative des cours et au suivi pédagogique de l'élève. Conformément à la législation RGPD, elles ne font l'objet d'aucune cession commerciale à des tiers.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    12. Droit à l'image
                  </h4>
                  <p>
                    Toute captation audio ou vidéo réalisée lors des cours ou des auditions annuelles ne pourra être partagée ou publiée qu'après recueil de l'accord exprès de l'élève ou de ses représentants légaux.
                  </p>
                </section>

                <section>
                  <h4 className="font-serif-display text-base font-semibold text-[#1E1B18] mb-1">
                    13. Modification des conditions générales
                  </h4>
                  <p>
                    Le professeur se réserve le droit de modifier les présentes conditions générales à chaque rentrée scolaire. Les élèves en seront informés au moins 30 jours avant leur entrée en vigueur.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 2: Mentions Légales */}
          {activeTab === 'mentions' && (
            <div className="space-y-4">
              <h4 className="font-serif-display text-lg font-semibold text-[#1E1B18]">
                Mentions Légales du Site
              </h4>
              <div className="space-y-3">
                <p><strong>Éditeur du site :</strong> [Nom et prénom du professeur / Raison sociale]</p>
                <p><strong>Statut juridique :</strong> [Micro-entreprise / Profession libérale / Association — À renseigner]</p>
                <p><strong>Numéro SIRET :</strong> [Numéro SIRET à 14 chiffres à renseigner]</p>
                <p><strong>Adresse de domiciliation :</strong> [Adresse complète du studio ou siège]</p>
                <p><strong>Directeur de la publication :</strong> [Nom du professeur]</p>
                <p><strong>Contact :</strong> contact@[mon-domaine-piano].fr | +33 6 [À renseigner]</p>
                <p><strong>Hébergement du site :</strong> Hébergé sur infrastructure cloud sécurisée [Nom de l'hébergeur et coordonnées à renseigner]</p>
                <p><strong>Propriété intellectuelle :</strong> L'ensemble des textes, photographies, éléments graphiques et maquettes présents sur ce site sont la propriété exclusive de l'éditeur ou font l'objet d'une licence d'exploitation réservée.</p>
              </div>
            </div>
          )}

          {/* TAB 3: Politique de Confidentialité */}
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h4 className="font-serif-display text-lg font-semibold text-[#1E1B18]">
                Politique de Confidentialité & Traitement des Données (RGPD)
              </h4>
              <p>
                Le respect de votre vie privée et de vos données personnelles est une priorité absolue dans le cadre de mon activité d'enseignement du piano.
              </p>
              <div className="space-y-3">
                <p>
                  <strong>Données collectées :</strong> Dans le cadre des formulaires de contact et d'inscription, nous collectons vos nom, prénom, numéro de téléphone, adresse email, ainsi que les indications sur l'âge et le niveau pianistique de l'élève.
                </p>
                <p>
                  <strong>Finalité du traitement :</strong> Ces données ont pour unique but de traiter votre demande d'information, d'établir le planning des cours et d'assurer le suivi pédagogique régulier de l'élève.
                </p>
                <p>
                  <strong>Conservation et sécurité :</strong> Vos données sont conservées pour la durée stricte de la relation pédagogique et ne sont jamais transmises, vendues ou louées à des tiers.
                </p>
                <p>
                  <strong>Vos droits :</strong> Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez à tout moment d'un droit d'accès, de rectification, de portabilité et de suppression de vos données personnelles sur simple demande par email.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E8E2D8] bg-[#FAF8F5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] rounded-xl hover:bg-[#342F2B] transition-colors"
          >
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
