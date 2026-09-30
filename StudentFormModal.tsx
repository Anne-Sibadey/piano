import React, { useState, useEffect } from 'react';
import { X, Save, User, Clock, CreditCard, Music, Sparkles } from 'lucide-react';
import { Student, LessonDuration, PaymentStatus } from '../../types';
import { toISO } from '../../utils/schoolCalendar';

interface StudentFormModalProps {
  isOpen: boolean;
  studentToEdit: Student | null;
  onClose: () => void;
  onSave: (student: Student) => void;
}

export const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isOpen,
  studentToEdit,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    phone: '',
    email: '',
    address: '',
    isMinor: false,
    parentName: '',
    parentRelation: 'Parent',
    parentPhone: '',
    parentEmail: '',
    level: 'Débutant (1ère année)',
    startDate: toISO(new Date()),
    formula: '45min' as LessonDuration,
    pricePerYear: '[À RENSEIGNER]',
    paymentStatus: 'up_to_date' as PaymentStatus,
    paymentNotes: '',
    habitualSlot: 'Mercredi 14h30 - 15h15',
    absenceMinutes: 0,
    absencesCount: 0,
    goalsInput: '',
    currentPiecesInput: '',
    pastPiecesInput: '',
    pedagogicalNotes: '',
    observations: '',
    status: 'active' as 'active' | 'paused' | 'archived'
  });

  useEffect(() => {
    if (studentToEdit) {
      setFormData({
        firstName: studentToEdit.firstName,
        lastName: studentToEdit.lastName,
        birthDate: studentToEdit.birthDate,
        phone: studentToEdit.phone,
        email: studentToEdit.email,
        address: studentToEdit.address,
        isMinor: studentToEdit.isMinor,
        parentName: studentToEdit.parentContact?.name || '',
        parentRelation: studentToEdit.parentContact?.relationship || 'Parent',
        parentPhone: studentToEdit.parentContact?.phone || '',
        parentEmail: studentToEdit.parentContact?.email || '',
        level: studentToEdit.level,
        startDate: studentToEdit.startDate,
        formula: studentToEdit.formula,
        pricePerYear: studentToEdit.pricePerYear,
        paymentStatus: studentToEdit.paymentStatus,
        paymentNotes: studentToEdit.paymentNotes,
        habitualSlot: studentToEdit.habitualSlot,
        absenceMinutes: studentToEdit.absenceMinutes || 0,
        absencesCount: studentToEdit.absencesCount || 0,
        goalsInput: studentToEdit.goals.join('\n'),
        currentPiecesInput: studentToEdit.currentPieces.join('\n'),
        pastPiecesInput: studentToEdit.pastPieces.join('\n'),
        pedagogicalNotes: studentToEdit.pedagogicalNotes,
        observations: studentToEdit.observations,
        status: studentToEdit.status
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '2012-05-15',
        phone: '',
        email: '',
        address: '',
        isMinor: false,
        parentName: '',
        parentRelation: 'Parent',
        parentPhone: '',
        parentEmail: '',
        level: 'Débutant',
        startDate: toISO(new Date()),
        formula: '45min',
        pricePerYear: '[À RENSEIGNER]',
        paymentStatus: 'up_to_date',
        paymentNotes: '',
        habitualSlot: '',
        absenceMinutes: 0,
        absencesCount: 0,
        goalsInput: '',
        currentPiecesInput: '',
        pastPiecesInput: '',
        pedagogicalNotes: '',
        observations: '',
        status: 'active'
      });
    }
  }, [studentToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Calculate approximate age if birthDate provided
    let calculatedAge: number | undefined = undefined;
    if (formData.birthDate) {
      const birthYear = new Date(formData.birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (!isNaN(birthYear)) {
        calculatedAge = currentYear - birthYear;
      }
    }

    const studentToSave: Student = {
      id: studentToEdit ? studentToEdit.id : `eleve-${Date.now()}`,
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      birthDate: formData.birthDate,
      age: calculatedAge,
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      address: formData.address.trim(),
      isMinor: formData.isMinor,
      parentContact: formData.isMinor && formData.parentName.trim() ? {
        name: formData.parentName.trim(),
        relationship: formData.parentRelation,
        phone: formData.parentPhone.trim(),
        email: formData.parentEmail.trim()
      } : undefined,
      level: formData.level,
      startDate: formData.startDate,
      formula: formData.formula,
      pricePerYear: formData.pricePerYear.trim(),
      paymentStatus: formData.paymentStatus,
      paymentNotes: formData.paymentNotes.trim(),
      habitualSlot: formData.habitualSlot.trim(),
      absenceMinutes: formData.absenceMinutes,
      goals: formData.goalsInput.split('\n').map(s => s.trim()).filter(Boolean),
      currentPieces: formData.currentPiecesInput.split('\n').map(s => s.trim()).filter(Boolean),
      pastPieces: formData.pastPiecesInput.split('\n').map(s => s.trim()).filter(Boolean),
      pedagogicalNotes: formData.pedagogicalNotes.trim(),
      observations: formData.observations.trim(),
      absencesCount: formData.absencesCount,
      status: formData.status,
      createdAt: studentToEdit ? studentToEdit.createdAt : toISO(new Date())
    };

    onSave(studentToSave);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl border border-[#E8E2D8] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <User className="w-5 h-5 text-[#B0824B]" />
            <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
              {studentToEdit ? `Modifier la fiche : ${studentToEdit.firstName} ${studentToEdit.lastName}` : 'Ajouter un nouvel élève'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Identity & Basic Details */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E] border-b border-[#F2ECE3] pb-1.5">
              Identité de l'élève
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Prénom <span className="text-[#B0824B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex. Alexandre"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Nom <span className="text-[#B0824B]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex. Vasseur"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  placeholder="06 00 00 00 00"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="eleve@exemple.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Adresse postale
              </label>
              <input
                type="text"
                placeholder="Ex. 14 rue de la Paix, 75002 Paris"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
              />
            </div>

            {/* Minor Toggle */}
            <div className="pt-2">
              <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-[#3A3530]">
                <input
                  type="checkbox"
                  checked={formData.isMinor}
                  onChange={(e) => setFormData({ ...formData, isMinor: e.target.checked })}
                  className="rounded text-[#B0824B] focus:ring-[#B0824B]"
                />
                <span>L'élève est mineur (renseigner les coordonnées des parents)</span>
              </label>
            </div>

            {/* Parent Contact Details */}
            {formData.isMinor && (
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] space-y-3 animate-in fade-in">
                <span className="text-xs font-semibold text-[#1E1B18] block">
                  Responsable légal / Contact parent
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-[#5A544D] mb-1">Nom & Prénom du parent</label>
                    <input
                      type="text"
                      placeholder="Ex. Sophie Laurent (Mère)"
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8D1C7] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5A544D] mb-1">Lien de parenté</label>
                    <input
                      type="text"
                      placeholder="Ex. Mère / Père / Tuteur"
                      value={formData.parentRelation}
                      onChange={(e) => setFormData({ ...formData, parentRelation: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8D1C7] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5A544D] mb-1">Téléphone parent</label>
                    <input
                      type="tel"
                      placeholder="06 12 34 56 78"
                      value={formData.parentPhone}
                      onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8D1C7] rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#5A544D] mb-1">Email parent</label>
                    <input
                      type="email"
                      placeholder="parent@exemple.com"
                      value={formData.parentEmail}
                      onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#D8D1C7] rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Academic & Pedagogical Settings */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E] border-b border-[#F2ECE3] pb-1.5">
              Formule, Planning & Tarif
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Formule
                </label>
                <select
                  value={formData.formula}
                  onChange={(e) => setFormData({ ...formData, formula: e.target.value as LessonDuration })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                >
                  <option value="30min">30 minutes / sem</option>
                  <option value="45min">45 minutes / sem</option>
                  <option value="60min">1 heure / sem</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Niveau actuel
                </label>
                <input
                  type="text"
                  placeholder="Ex. Débutant 1ère année"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Créneau habituel
                </label>
                <input
                  type="text"
                  placeholder="Ex. Mercredi 14h30 (jour + heure de début)"
                  value={formData.habitualSlot}
                  onChange={(e) => setFormData({ ...formData, habitualSlot: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Absences cumulées
                </label>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A544D]">
                  <input
                    type="number"
                    min={0}
                    value={formData.absencesCount}
                    onChange={(e) => setFormData({ ...formData, absencesCount: Math.max(0, Math.floor(Number(e.target.value) || 0)) })}
                    className="w-20 px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                  />
                  <span>absence(s) ·</span>
                  <input
                    type="number"
                    min={0}
                    value={Math.floor(formData.absenceMinutes / 60)}
                    onChange={(e) => setFormData({ ...formData, absenceMinutes: Math.max(0, Number(e.target.value) || 0) * 60 + (formData.absenceMinutes % 60) })}
                    className="w-20 px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                  />
                  <span>h</span>
                  <input
                    type="number"
                    min={0}
                    max={59}
                    value={formData.absenceMinutes % 60}
                    onChange={(e) => setFormData({ ...formData, absenceMinutes: Math.floor(formData.absenceMinutes / 60) * 60 + Math.min(59, Math.max(0, Number(e.target.value) || 0)) })}
                    className="w-20 px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                  />
                  <span>min</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Tarif de la séance convenu
                </label>
                <input
                  type="text"
                  placeholder="[À renseigner] ou 950 €"
                  value={formData.pricePerYear}
                  onChange={(e) => setFormData({ ...formData, pricePerYear: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Statut de paiement
                </label>
                <select
                  value={formData.paymentStatus}
                  onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value as PaymentStatus })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                >
                  <option value="up_to_date">À jour</option>
                  <option value="pending">En attente de paiement</option>
                  <option value="installments">Échéancier en cours</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Statut de l'élève
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
                >
                  <option value="active">Actif</option>
                  <option value="paused">En pause</option>
                  <option value="archived">Archivé</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Modalités & Notes de paiement
              </label>
              <input
                type="text"
                placeholder="Ex. Règlement en 3 chèques trimestriels"
                value={formData.paymentNotes}
                onChange={(e) => setFormData({ ...formData, paymentNotes: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
              />
            </div>

          </div>

          {/* Repertoire & Pedagogical details */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E] border-b border-[#F2ECE3] pb-1.5">
              Répertoire & Pédagogie
            </h4>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Morceaux actuellement travaillés (un par ligne)
              </label>
              <textarea
                rows={2}
                placeholder="Ex. Chopin — Nocturne op. 9 n°2&#10;Yann Tiersen — Comptine d'un autre été"
                value={formData.currentPiecesInput}
                onChange={(e) => setFormData({ ...formData, currentPiecesInput: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Objectifs fixés (un par ligne)
              </label>
              <textarea
                rows={2}
                placeholder="Ex. Indépendance main gauche / main droite&#10;Préparer l'audition de printemps"
                value={formData.goalsInput}
                onChange={(e) => setFormData({ ...formData, goalsInput: e.target.value })}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Notes pédagogiques de fond
                </label>
                <textarea
                  rows={3}
                  placeholder="Points techniques à surveiller, affinité musicale, type de clavier à domicile..."
                  value={formData.pedagogicalNotes}
                  onChange={(e) => setFormData({ ...formData, pedagogicalNotes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#3A3530] mb-1">
                  Observations libres
                </label>
                <textarea
                  rows={3}
                  placeholder="Informations diverses, caractère de l'élève, motivation..."
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl resize-none"
                />
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs sm:text-sm font-medium text-[#5A544D] hover:text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl hover:bg-[#F2ECE3] transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] rounded-xl shadow-sm transition-all"
            >
              <Save className="w-4 h-4 text-[#DFC79D]" />
              <span>{studentToEdit ? 'Enregistrer les modifications' : 'Créer la fiche élève'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
