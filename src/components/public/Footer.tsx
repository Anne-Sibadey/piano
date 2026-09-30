import React from 'react';
import { Lock, Heart } from 'lucide-react';
import { TeacherSettings } from '../../types';

interface FooterProps {
  settings: TeacherSettings;
  onOpenLegal: (tab: 'cgu' | 'mentions' | 'privacy') => void;
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenLegal,
  onOpenAdminLogin,
  isAdminLoggedIn,
  onGoToAdmin
}) => {
  return (
    <footer className="bg-[#1C1917] text-[#FAF8F5] pt-16 pb-12 border-t border-[#2C2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2C2825]">
          
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-serif-display text-2xl font-normal tracking-tight text-white block">
              Atelier Piano
            </span>
            <p className="text-xs sm:text-sm text-[#A8A196] leading-relaxed max-w-sm font-light">
              Enseignement du piano personnalisé, bienveillant et exigeant. Un accompagnement sur-mesure pour enfants, adolescents et adultes au cœur de {settings.city || '[Ville]'}.
            </p>
            <div className="pt-2 text-xs text-[#7A7369]">
              Piano d'expression acoustique · Tous répertoires
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DFC79D]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#A8A196]">
              <li>
                <a href="#accueil" className="hover:text-white transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#methode" className="hover:text-white transition-colors">La Méthode</a>
              </li>
              <li>
                <a href="#cours" className="hover:text-white transition-colors">Les Cours & Organisation</a>
              </li>
              <li>
                <a href="#tarifs" className="hover:text-white transition-colors">Formules & Tarifs</a>
              </li>
              <li>
                <a href="#temoignages" className="hover:text-white transition-colors">Témoignages</a>
              </li>
              <li>
                <a href="#a-propos" className="hover:text-white transition-colors">À Propos du Professeur</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact & Inscription</a>
              </li>
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#DFC79D]">
              Atelier & Contact
            </h4>
            <div className="space-y-2 text-xs text-[#A8A196]">
              <p>{settings.address || "[Adresse du studio à renseigner]"}</p>
              <p>{settings.city || "[Ville & Code postal]"}</p>
              <p className="pt-1 text-white">{settings.phone || "+33 (0)6 [À renseigner]"}</p>
              <p>{settings.email || "contact@[mon-domaine-piano].fr"}</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Legal Links & Discreet Teacher Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7369]">
          
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Atelier Piano. Tous droits réservés.</span>
            <button
              onClick={() => onOpenLegal('cgu')}
              className="hover:text-[#A8A196] transition-colors underline-offset-4 hover:underline"
            >
              Conditions Générales
            </button>
            <button
              onClick={() => onOpenLegal('mentions')}
              className="hover:text-[#A8A196] transition-colors underline-offset-4 hover:underline"
            >
              Mentions Légales
            </button>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#A8A196] transition-colors underline-offset-4 hover:underline"
            >
              Politique de Confidentialité
            </button>
          </div>

          <div>
            {isAdminLoggedIn ? (
              <button
                onClick={onGoToAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#DFC79D] bg-[#2C2825] hover:bg-[#3D3733] rounded-lg transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Panneau Administrateur (Actif)</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center gap-1.5 text-xs text-[#5A544D] hover:text-[#A8A196] transition-colors"
              >
                <Lock className="w-3 h-3" />
                <span>Accès Enseignant</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </footer>
  );
};
