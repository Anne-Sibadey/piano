import React, { useState, useEffect } from 'react';
import { X, Save, BookOpen, Music, CheckCircle2 } from 'lucide-react';
import { Student, PedagogicalLog } from '../../types';

interface PedagogicalLogModalProps {
  isOpen: boolean;
  students: Student[];
  preselectedStudentId?: string;
  onClose: () => void;
  onSaveLog: (log: PedagogicalLog) => void;
}

export const PedagogicalLogModal: React.FC<PedagogicalLogModalProps> = ({
  isOpen,
  students,
  preselectedStudentId,
  onClose,
  onSaveLog
}) => {
  const [selectedStudentId, setSelectedStudentId] = useState(
    preselectedStudentId || (students.length > 0 ? students[0].id : '')
  );

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [piecesInput, setPiecesInput] = useState('');
  const [conceptsCovered, setConceptsCovered] = useState('');
  const [exercisesGiven, setExercisesGiven] = useState('');
  const [difficulties, setDifficulties] = useState('');
  const [nextGoals, setNextGoals] = useState('');
  const [freeComment, setFreeComment] = useState('');

  // When preselected student changes
  useEffect(() => {
    if (preselectedStudentId) {
      setSelectedStudentId(preselectedStudentId);
      const student = students.find(s => s.id === preselectedStudentId);
      if (student) {
        if (student.formula === '30min') setDurationMinutes(30);
        else if (student.formula === '60min') setDurationMinutes(60);
        else setDurationMinutes(45);

        if (student.currentPieces.length > 0) {
          setPiecesInput(student.currentPieces.join(', '));
        }
      }
    }
  }, [preselectedStudentId, students, isOpen]);

  if (!isOpen) return null;

  const currentStudent = students.find(s => s.id === selectedStudentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    const newLog: PedagogicalLog = {
      id: `log-${Date.now()}`,
      studentId: selectedStudentId,
      date,
      durationMinutes,
      piecesWorkedOn: piecesInput.split(',').map(s => s.trim()).filter(Boolean),
      conceptsCovered: conceptsCovered.trim(),
      exercisesGiven: exercisesGiven.trim(),
      difficulties: difficulties.trim(),
      nextGoals: nextGoals.trim(),
      freeComment: freeComment.trim()
    };

    onSaveLog(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl max-h-[92vh] rounded-2xl shadow-2xl border border-[#E8E2D8] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#B0824B]" />
            <div>
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                Compte-rendu de séance de cours
              </h3>
              <p className="text-xs text-[#7A7369]">
                Enregistrer les points abordés et le travail pour la semaine prochaine
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Student selection & Date / Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Élève concerné <span className="text-[#B0824B]">*</span>
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  const st = students.find(s => s.id === e.target.value);
                  if (st) {
                    if (st.formula === '30min') setDurationMinutes(30);
                    else if (st.formula === '60min') setDurationMinutes(60);
                    else setDurationMinutes(45);
                    if (st.currentPieces.length > 0) setPiecesInput(st.currentPieces.join(', '));
                  }
                }}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
              >
                {students.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.firstName} {st.lastName} ({st.formula})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Date du cours
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Durée effective
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 heure (60 min)</option>
              </select>
            </div>
          </div>

          {/* Pieces worked on */}
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1 flex items-center justify-between">
              <span>Morceaux travaillés (séparés par des virgules)</span>
              {currentStudent && currentStudent.currentPieces.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPiecesInput(currentStudent.currentPieces.join(', '))}
                  className="text-[11px] text-[#B0824B] hover:underline"
                >
                  Charger le répertoire de l'élève
                </button>
              )}
            </label>
            <input
              type="text"
              placeholder="Ex. Chopin Nocturne op. 9 n°2, Gamme de Ré Majeur"
              value={piecesInput}
              onChange={(e) => setPiecesInput(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
            />
          </div>

          {/* Concepts Covered */}
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Notions abordées (technique, harmonie, rythme...)
            </label>
            <textarea
              rows={2}
              placeholder="Ex. Nuance subito piano, détente du poignet gauche, pédale synchronisée sur le changement d'accord..."
              value={conceptsCovered}
              onChange={(e) => setConceptsCovered(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] resize-none"
            />
          </div>

          {/* Exercises Given */}
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Exercices & consignes donnés pour la maison
            </label>
            <textarea
              rows={2}
              placeholder="Ex. Mesures 12 à 24 mains séparées puis ensemble au métronome à 72. Revoir les 4 premières mesures sans regarder le clavier."
              value={exercisesGiven}
              onChange={(e) => setExercisesGiven(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] resize-none"
            />
          </div>

          {/* Difficulties & Next Goals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Difficultés rencontrées / Points d'attention
              </label>
              <textarea
                rows={2}
                placeholder="Ex. Rythme pointé hésitant mesure 15"
                value={difficulties}
                onChange={(e) => setDifficulties(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Objectifs pour le prochain cours
              </label>
              <textarea
                rows={2}
                placeholder="Ex. Jouer la première page de mémoire avec le phrasé chantant"
                value={nextGoals}
                onChange={(e) => setNextGoals(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B] resize-none"
              />
            </div>
          </div>

          {/* Free Comment */}
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Commentaire libre / Ressenti global de la séance
            </label>
            <input
              type="text"
              placeholder="Ex. Très belle énergie aujourd'hui, l'élève a gagné en confiance et en projection sonore."
              value={freeComment}
              onChange={(e) => setFreeComment(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
            />
          </div>

          {/* Modal Actions */}
          <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm font-medium text-[#5A544D] bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl hover:bg-[#F2ECE3] transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] rounded-xl shadow-sm transition-all"
            >
              <Save className="w-4 h-4 text-[#DFC79D]" />
              <span>Enregistrer le compte-rendu</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
