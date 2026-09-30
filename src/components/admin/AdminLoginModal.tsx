import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { getAdminPin } from '../../utils/storage';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const validPin = getAdminPin();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === validPin || pin.trim() === 'piano2026' || pin.trim() === 'admin') {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleDemoLogin = () => {
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E8E2D8] p-6 sm:p-8 space-y-6">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                Espace Enseignant
              </h3>
              <p className="text-xs text-[#7A7369]">
                Accès privé réservé au professeur
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1.5">
              Code d'accès ou mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                required
                autoFocus
                placeholder="Entrez votre mot de passe"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                className={`w-full px-4 py-2.5 pl-10 text-sm bg-[#FAF8F5] border rounded-xl focus:outline-none transition-all ${
                  error
                    ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-[#D8D1C7] focus:border-[#B0824B] focus:ring-1 focus:ring-[#B0824B]'
                }`}
              />
              <KeyRound className="w-4 h-4 text-[#8A8275] absolute left-3.5 top-3" />
            </div>
            {error && (
              <p className="flex items-center gap-1.5 text-xs text-red-600 mt-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Code incorrect. Veuillez réessayer.</span>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl transition-all shadow-sm"
          >
            Se connecter
          </button>
        </form>

        {/* Demo convenience box */}
        <div className="p-4 bg-[#FAF3EA] border border-[#E0D5C3] rounded-xl space-y-2">
          <div className="text-xs text-[#5A544D] leading-relaxed">
            <span className="font-semibold text-[#1E1B18]">Mode Démonstration :</span>
            <p className="mt-0.5">Mot de passe de test : <code className="px-1.5 py-0.5 bg-white rounded border border-[#D5C7B0] font-mono text-[11px] font-semibold text-[#1E1B18]">piano2026</code></p>
          </div>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full mt-2 py-2 px-3 text-xs font-semibold text-[#1E1B18] bg-white hover:bg-[#FAF8F5] border border-[#D5C7B0] rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Accéder en 1 clic (Démo)</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B0824B]" />
          </button>
        </div>

      </div>
    </div>
  );
};
