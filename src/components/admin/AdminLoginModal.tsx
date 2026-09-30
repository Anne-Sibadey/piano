import React, { useState } from 'react';
import { Lock, X, KeyRound, AlertCircle, Mail } from 'lucide-react';
import { supabase } from '../../utils/supabase';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (authError) {
      setError(true);
    } else {
      setError(false);
      setPassword('');
      onSuccess();
    }
  };

  const inputClass = 'w-full px-4 py-2.5 pl-10 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] focus:ring-1 focus:ring-[#B0824B]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-[#E8E2D8] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">Espace Enseignant</h3>
              <p className="text-xs text-[#7A7369]">Accès privé réservé au professeur</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input type="email" required autoFocus autoComplete="username" placeholder="Adresse e-mail"
              value={email} onChange={(e) => { setEmail(e.target.value); setError(false); }} className={inputClass} />
            <Mail className="w-4 h-4 text-[#8A8275] absolute left-3.5 top-3" />
          </div>
          <div className="relative">
            <input type="password" required autoComplete="current-password" placeholder="Mot de passe"
              value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }} className={inputClass} />
            <KeyRound className="w-4 h-4 text-[#8A8275] absolute left-3.5 top-3" />
          </div>
          {error && (
            <p className="flex items-center gap-1.5 text-xs text-red-600">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>E-mail ou mot de passe incorrect.</span>
            </p>
          )}
          <button type="submit" disabled={loading}
            className="w-full py-3 text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] disabled:opacity-60 rounded-xl transition-all shadow-sm">
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
};
