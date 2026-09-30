import React, { useState } from 'react';
import { Save, CheckCircle2, DollarSign, User, ShieldCheck } from 'lucide-react';
import { TeacherSettings } from '../../types';
import { getAdminPin, setAdminPin } from '../../utils/storage';

interface SettingsViewProps {
  settings: TeacherSettings;
  onSaveSettings: (settings: TeacherSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings
}) => {
  const [formData, setFormData] = useState<TeacherSettings>({ ...settings });
  const [pin, setPin] = useState(getAdminPin());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePriceChange = (formulaId: string, newPrice: string) => {
    setFormData((prev) => ({
      ...prev,
      formulas: prev.formulas.map((f) =>
        f.id === formulaId ? { ...f, annualPrice: newPrice } : f
      )
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    if (pin.trim()) {
      setAdminPin(pin.trim());
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18] font-medium">
            Paramètres & Tarifs Publics
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7369] mt-0.5">
            Personnalisez vos coordonnées, tarifs et contenus du site sans toucher au code
          </p>
        </div>

        <button
          type="submit"
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Save className="w-4 h-4 text-[#DFC79D]" />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-800 flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Vos paramètres et tarifs ont été enregistrés avec succès. Le site public est mis à jour.</span>
        </div>
      )}

      {/* Tariffs Section */}
      <div className="p-6 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-[#1E1B18] border-b border-[#F2ECE3] pb-3">
          <DollarSign className="w-5 h-5 text-[#B0824B]" />
          <h3 className="font-serif-display text-xl font-medium">
            Tarifs des 3 Formules Annuelles
          </h3>
        </div>
        <p className="text-xs text-[#7A7369]">
          Renseignez vos tarifs réels pour remplacer la mention temporaire <code>[À RENSEIGNER]</code> sur la page publique des tarifs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {formData.formulas.map((f) => (
            <div key={f.id} className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] space-y-2">
              <label className="block text-xs font-semibold text-[#1E1B18]">
                {f.name} ({f.durationMinutes} min)
              </label>
              <input
                type="text"
                value={f.annualPrice}
                onChange={(e) => handlePriceChange(f.id, e.target.value)}
                placeholder="Ex. 850 € / an"
                className="w-full px-3.5 py-2 text-sm bg-white border border-[#D8D1C7] rounded-lg font-medium text-[#1E1B18] focus:outline-none focus:border-[#B0824B]"
              />
              <p className="text-[11px] text-[#8A8275]">
                {f.recommendedFor}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Identity & Studio Coordinates */}
      <div className="p-6 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-[#1E1B18] border-b border-[#F2ECE3] pb-3">
          <User className="w-5 h-5 text-[#B0824B]" />
          <h3 className="font-serif-display text-xl font-medium">
            Identité & Coordonnées du Professeur
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Nom & Prénom
            </label>
            <input
              type="text"
              value={formData.teacherName}
              onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Titre professionnel
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Adresse de l'Atelier
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Ville
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
            />
          </div>
        </div>

        {/* Bio, Journey, Philosophy */}
        <div className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Courte biographie
            </label>
            <textarea
              rows={3}
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Parcours musical & formation
            </label>
            <textarea
              rows={3}
              value={formData.musicalJourney}
              onChange={(e) => setFormData({ ...formData, musicalJourney: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Philosophie d'enseignement
            </label>
            <textarea
              rows={3}
              value={formData.teachingPhilosophy}
              onChange={(e) => setFormData({ ...formData, teachingPhilosophy: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl resize-none"
            />
          </div>
        </div>
      </div>

      {/* Security & Access PIN */}
      <div className="p-6 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-[#1E1B18]">
          <ShieldCheck className="w-5 h-5 text-[#B0824B]" />
          <h3 className="font-serif-display text-xl font-medium">
            Sécurité & Mot de passe Espace Enseignant
          </h3>
        </div>

        <div className="max-w-xs">
          <label className="block text-xs font-medium text-[#3A3530] mb-1">
            Mot de passe d'accès administrateur
          </label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl font-mono"
          />
          <p className="text-[11px] text-[#8A8275] mt-1">
            Par défaut : <code>piano2026</code>
          </p>
        </div>
      </div>

      {/* Bottom Save Action */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 px-8 py-3 text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl shadow-sm transition-all"
        >
          <Save className="w-4 h-4 text-[#DFC79D]" />
          <span>Enregistrer les modifications</span>
        </button>
      </div>

    </form>
  );
};
