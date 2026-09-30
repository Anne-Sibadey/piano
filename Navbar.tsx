import React, { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenAdminLogin: () => void;
  isAdminLoggedIn: boolean;
  onGoToAdmin: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdminLogin,
  isAdminLoggedIn,
  onGoToAdmin,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'La Méthode', href: '#methode' },
    { label: 'Les Cours', href: '#cours' },
    { label: 'Tarifs', href: '#tarifs' },
    { label: 'Témoignages', href: '#temoignages' },
    { label: 'À Propos', href: '#a-propos' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#accueil"
            className="flex flex-col group text-left"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#accueil');
            }}
          >
            <span className="font-serif-display text-2xl sm:text-3xl font-medium tracking-tight text-[#1E1B18] group-hover:text-[#B0824B] transition-colors">
              Cours de Piano
            </span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5A544D]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`relative py-1 transition-colors hover:text-[#1E1B18] ${
                    isActive ? 'text-[#1E1B18] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#B0824B]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            {isAdminLoggedIn ? (
              <button
                onClick={onGoToAdmin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1E1B18] bg-[#FAF3EA] border border-[#E0D5C3] rounded-lg hover:bg-[#F3E6D3] transition-colors whitespace-nowrap"
              >
                <Lock className="w-3.5 h-3.5 text-[#B0824B]" />
                <span>Espace enseignant</span>
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-md transition-colors"
                title="Accès réservé au professeur"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Espace enseignant</span>
              </button>
            )}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] rounded-lg hover:bg-[#342F2B] active:scale-[0.98] transition-all whitespace-nowrap shadow-sm"
            >
              Me Contacter
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#5A544D] hover:text-[#1E1B18] rounded-md focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-base font-medium text-[#3A3530] hover:text-[#1E1B18] hover:bg-[#F3EFEA] rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-3 border-t border-[#E8E2D8] flex flex-col gap-2">
            {isAdminLoggedIn ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onGoToAdmin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#1E1B18] bg-[#FAF3EA] border border-[#E0D5C3] rounded-lg"
              >
                <Lock className="w-4 h-4 text-[#B0824B]" />
                Espace enseignant
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdminLogin();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#7A7369] hover:text-[#1E1B18]"
              >
                <Lock className="w-3.5 h-3.5" />
                Espace enseignant
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
