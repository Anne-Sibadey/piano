import React, { useEffect, useState } from 'react';
import { X, FileText, Shield, Scale } from 'lucide-react';
import { TeacherSettings } from '../../types';

type Tab = 'cgu' | 'mentions' | 'privacy';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: Tab;
  settings: TeacherSettings;
}

// N'affiche une coordonnée que si elle est réellement renseignée (pas un texte entre crochets).
const ok = (v?: string) => !!v && v.trim() !== '' && !v.includes('[');

const Block: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="space-y-1.5">
    <h4 className="font-serif-display text-lg font-semibold text-[#1E1B18]">{title}</h4>
    <div className="space-y-2">{children}</div>
  </section>
);

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, onClose, defaultTab = 'mentions', settings }) => {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  useEffect(() => { setActiveTab(defaultTab); }, [defaultTab, isOpen]);

  if (!isOpen) return null;

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'mentions', label: 'Mentions légales', icon: <Scale className="w-4 h-4" /> },
    { id: 'privacy', label: 'Politique de confidentialité', icon: <Shield className="w-4 h-4" /> },
    { id: 'cgu', label: "Conditions d'utilisation", icon: <FileText className="w-4 h-4" /> },
  ];

  const contactLine = ok(settings.email) ? settings.email : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-[#E8E2D8] flex flex-col overflow-hidden">

        <div className="px-6 py-4 border-b border-[#E8E2D8] flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#B0824B]" />
            <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">Informations légales</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap border-b border-[#E8E2D8] bg-[#FAF8F5] px-6 gap-2 pt-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                activeTab === t.id ? 'border-[#B0824B] text-[#1E1B18] font-semibold' : 'border-transparent text-[#7A7369] hover:text-[#1E1B18]'
              }`}
            >
              {t.icon}
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-[#4A443E] text-sm leading-relaxed">

          {activeTab === 'mentions' && (
            <>
              <Block title="Éditrice du site">
                <p>Ce site est édité par <strong>Anne Sibadey</strong>, enseignante de piano (cours particuliers).</p>
                <ul className="space-y-0.5">
                  {ok(settings.address) && <li>Adresse : {settings.address}{ok(settings.city) ? `, ${settings.city}` : ''}</li>}
                  {!ok(settings.address) && ok(settings.city) && <li>Ville : {settings.city}</li>}
                  {ok(settings.phone) && <li>Téléphone : {settings.phone}</li>}
                  {contactLine && <li>E-mail : {contactLine}</li>}
                </ul>
                <p>Directrice de la publication : Anne Sibadey.</p>
              </Block>
              <Block title="Hébergement">
                <p>Le site est hébergé par GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis (github.com).</p>
                <p>Les données de l'espace enseignant et des messages reçus sont enregistrées par Supabase (supabase.com), sur des serveurs situés dans l'Union européenne.</p>
              </Block>
              <Block title="Propriété intellectuelle">
                <p>Les textes, la mise en page et les éléments graphiques de ce site sont protégés par le droit d'auteur. Toute reproduction, totale ou partielle, sans autorisation écrite préalable est interdite.</p>
              </Block>
              <Block title="Avis">
                <p>Les avis affichés proviennent de Google et sont reproduits avec l'accord de leurs auteurs.</p>
              </Block>
              <Block title="Responsabilité">
                <p>Je m'efforce de fournir des informations exactes et à jour, sans garantie d'exhaustivité. Le site peut contenir des liens vers des sites tiers dont je ne maîtrise pas le contenu.</p>
              </Block>
              <Block title="Droit applicable">
                <p>Le présent site est soumis au droit français.</p>
              </Block>
            </>
          )}

          {activeTab === 'privacy' && (
            <>
              <p className="text-xs text-[#7A7369]">Dernière mise à jour : 30 septembre 2026</p>
              <Block title="Responsable du traitement">
                <p>Anne Sibadey, enseignante de piano{contactLine ? ` – ${contactLine}` : ''}.</p>
              </Block>
              <Block title="Principe">
                <p>Je ne collecte que les données nécessaires pour répondre aux demandes et organiser les cours. Elles ne sont ni vendues, ni utilisées à des fins publicitaires.</p>
              </Block>
              <Block title="Données collectées et finalités">
                <ul className="list-disc pl-5 space-y-1.5">
                  <li><strong>Formulaire de contact</strong> : nom, prénom, adresse e-mail, téléphone, âge et niveau de l'élève, formule souhaitée, message. Finalité : répondre à votre demande (mesures précontractuelles prises à votre demande).</li>
                  <li><strong>Élèves</strong> : identité, coordonnées, coordonnées du représentant légal pour les mineurs, niveau, créneau hebdomadaire et suivi pédagogique. Finalité : organiser et suivre les cours (exécution du contrat).</li>
                  <li><strong>Espace enseignant</strong> : adresse e-mail et mot de passe de connexion, réservés à l'enseignante (intérêt légitime de sécurité).</li>
                  <li><strong>Données techniques</strong> : l'hébergeur traite l'adresse IP et les journaux de connexion pour délivrer le site en sécurité (intérêt légitime).</li>
                </ul>
              </Block>
              <Block title="Durées de conservation">
                <p>Les demandes restées sans suite sont conservées 3 ans au maximum après le dernier contact. Le dossier d'un élève est conservé pendant la durée des cours, puis supprimé au plus tard un an après leur fin.</p>
              </Block>
              <Block title="Destinataires et transferts">
                <p>Seule l'enseignante a accès aux données. Elles sont hébergées par Supabase (Union européenne), et le site est diffusé par GitHub (États-Unis). Les transferts hors Union européenne sont encadrés par les garanties prévues par le RGPD.</p>
                <p>Le site charge ses polices de caractères depuis Google Fonts : votre adresse IP est alors transmise à Google pour l'affichage des polices.</p>
              </Block>
              <Block title="Mineurs">
                <p>Les demandes concernant un enfant sont faites par ses parents ou son représentant légal.</p>
              </Block>
              <Block title="Cookies">
                <p>Le site n'utilise aucun cookie publicitaire ni outil de mesure d'audience. L'espace enseignant utilise un stockage local du navigateur, strictement nécessaire à la connexion.</p>
              </Block>
              <Block title="Sécurité">
                <p>Les échanges sont chiffrés (HTTPS) et l'accès aux données est réservé à l'enseignante, par authentification.</p>
              </Block>
              <Block title="Vos droits">
                <p>Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation ou l'opposition au traitement, ainsi que leur portabilité{contactLine ? `, en écrivant à ${contactLine}` : ', en me contactant par le formulaire du site'}. Je réponds dans un délai d'un mois. En cas de désaccord, vous pouvez saisir la CNIL (cnil.fr).</p>
              </Block>
            </>
          )}

          {activeTab === 'cgu' && (
            <>
              <Block title="Objet du site">
                <p>Ce site présente l'activité d'enseignement du piano d'Anne Sibadey et permet de la contacter. Il ne permet ni de réserver, ni de payer un cours en ligne.</p>
              </Block>
              <Block title="Informations et tarifs">
                <p>Les informations, formules et tarifs présentés sont donnés à titre indicatif. Les conditions des cours (créneau, tarif, règlement, calendrier) sont précisées et acceptées séparément, lors de l'inscription, en dehors du site.</p>
              </Block>
              <Block title="Formulaire de contact">
                <p>Il sert uniquement à demander des informations. L'envoyer ne crée aucun engagement, ni pour vous, ni pour moi. Merci de ne pas y indiquer de données sensibles.</p>
              </Block>
              <Block title="Accès au site">
                <p>Le site est accessible librement. Il peut être modifié ou suspendu à tout moment, sans préavis, pour maintenance ou évolution.</p>
              </Block>
              <Block title="Espace enseignant">
                <p>L'accès à cet espace est réservé à l'enseignante. Toute tentative d'accès non autorisé est interdite.</p>
              </Block>
              <Block title="Propriété intellectuelle et droit applicable">
                <p>Voir les mentions légales. Les présentes conditions sont soumises au droit français.</p>
              </Block>
            </>
          )}

        </div>

        <div className="px-6 py-4 border-t border-[#E8E2D8] bg-[#FAF8F5] flex justify-end">
          <button onClick={onClose} className="px-5 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] rounded-xl hover:bg-[#342F2B] transition-colors">
            Fermer
          </button>
        </div>

      </div>
    </div>
  );
};
