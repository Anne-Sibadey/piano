import React, { useState } from 'react';
import { 
  X, User, Calendar, Phone, Mail, MapPin, Music, Award, Clock, 
  CreditCard, BookOpen, Plus, AlertCircle, CheckCircle2, Trash2, Edit3 
} from 'lucide-react';
import { Student, PedagogicalLog } from '../../types';

interface StudentDetailModalProps {
  student: Student | null;
  logs: PedagogicalLog[];
  onClose: () => void;
  onEditStudent: (student: Student) => void;
  onDeleteStudent: (studentId: string) => void;
  onAddLogForStudent: (studentId: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  logs,
  onClose,
  onEditStudent,
  onDeleteStudent,
  onAddLogForStudent
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'pedagogy' | 'history'>('profile');

  if (!student) return null;

  const studentLogs = logs.filter(l => l.studentId === student.id).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border border-[#E8E2D8] flex flex-col overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#FAF3EA] border border-[#E8DFC8] flex items-center justify-center text-[#B0824B] font-serif-display text-xl font-bold">
              {student.firstName[0]}{student.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-display text-2xl text-[#1E1B18] font-medium">
                  {student.firstName} {student.lastName}
                </h3>
                <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                  student.status === 'active'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {student.status === 'active' ? 'Actif' : student.status === 'paused' ? 'En pause' : 'Archivé'}
                </span>
              </div>
              <p className="text-xs text-[#7A7369]">
                {student.level} · Formule {student.formula} · Inscrit(e) depuis {student.startDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEditStudent(student)}
              className="p-2 text-[#5A544D] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors"
              title="Modifier la fiche"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex border-b border-[#E8E2D8] bg-[#FAF8F5] px-6 gap-3 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'profile'
                ? 'border-[#B0824B] text-[#1E1B18] font-semibold'
                : 'border-transparent text-[#7A7369] hover:text-[#1E1B18]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Fiche & Coordonnées</span>
          </button>

          <button
            onClick={() => setActiveTab('pedagogy')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'pedagogy'
                ? 'border-[#B0824B] text-[#1E1B18] font-semibold'
                : 'border-transparent text-[#7A7369] hover:text-[#1E1B18]'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Répertoire & Objectifs</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-medium border-b-2 transition-all ${
              activeTab === 'history'
                ? 'border-[#B0824B] text-[#1E1B18] font-semibold'
                : 'border-transparent text-[#7A7369] hover:text-[#1E1B18]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Historique des cours ({studentLogs.length})</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* TAB 1: Profile & Administrative details */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              
              {/* Top Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8]">
                  <div className="flex items-center gap-2 text-xs text-[#7A7369] mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#B0824B]" />
                    <span>Créneau habituel</span>
                  </div>
                  <div className="font-medium text-sm text-[#1E1B18]">
                    {student.habitualSlot || 'À définir'}
                  </div>
                  <div className="text-[11px] text-[#8A8275] mt-0.5">
                    Durée : {student.formula}
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8]">
                  <div className="flex items-center gap-2 text-xs text-[#7A7369] mb-1">
                    <CreditCard className="w-3.5 h-3.5 text-[#B0824B]" />
                    <span>Paiement & Tarif</span>
                  </div>
                  <div className="font-medium text-sm text-[#1E1B18]">
                    Tarif annuel : {student.pricePerYear || '[À renseigner]'}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      student.paymentStatus === 'up_to_date' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`} />
                    <span className="text-[#5A544D]">
                      {student.paymentStatus === 'up_to_date' ? 'À jour' : student.paymentStatus === 'pending' ? 'Paiement en attente' : 'Échéancier'}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8]">
                  <div className="flex items-center gap-2 text-xs text-[#7A7369] mb-1">
                    <Calendar className="w-3.5 h-3.5 text-[#B0824B]" />
                    <span>Assiduité</span>
                  </div>
                  <div className="font-medium text-sm text-[#1E1B18]">
                    {student.absencesCount} absence(s) cette année
                  </div>
                  <div className="text-[11px] text-[#8A8275] mt-0.5">
                    Début : {student.startDate}
                  </div>
                </div>
              </div>

              {/* Coordinates & Identity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Student Contacts */}
                <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                    Coordonnées de l'élève
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-[#5A544D]">
                    <div className="flex items-center gap-2.5">
                      <User className="w-4 h-4 text-[#8A8275] shrink-0" />
                      <span>Né(e) le {student.birthDate} ({student.age ? `${student.age} ans` : 'Âge non renseigné'})</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#8A8275] shrink-0" />
                      <a href={`tel:${student.phone}`} className="hover:text-[#1E1B18] underline-offset-4 hover:underline">
                        {student.phone || 'Non renseigné'}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#8A8275] shrink-0" />
                      <a href={`mailto:${student.email}`} className="hover:text-[#1E1B18] underline-offset-4 hover:underline">
                        {student.email || 'Non renseigné'}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8A8275] shrink-0" />
                      <span>{student.address || 'Adresse non renseignée'}</span>
                    </div>
                  </div>
                </div>

                {/* Parent Contact if Minor */}
                <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                    Responsable légal / Contact parent
                  </h4>
                  {student.parentContact ? (
                    <div className="space-y-2 text-xs sm:text-sm text-[#5A544D]">
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-[#8A8275] shrink-0" />
                        <span className="font-medium text-[#1E1B18]">{student.parentContact.name} ({student.parentContact.relationship})</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#8A8275] shrink-0" />
                        <a href={`tel:${student.parentContact.phone}`} className="hover:text-[#1E1B18]">
                          {student.parentContact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-[#8A8275] shrink-0" />
                        <a href={`mailto:${student.parentContact.email}`} className="hover:text-[#1E1B18]">
                          {student.parentContact.email}
                        </a>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-[#8A8275] italic">
                      Élève majeur ou contact parent non requis.
                    </p>
                  )}
                </div>

              </div>

              {/* Payment Details & Administrative Notes */}
              <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                  Suivi financier & observations administratives
                </h4>
                <p className="text-xs sm:text-sm text-[#5A544D]">
                  {student.paymentNotes || 'Aucune note particulière de règlement.'}
                </p>
              </div>

              {/* General Observations */}
              <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                  Observations générales de l'enseignant
                </h4>
                <p className="text-xs sm:text-sm text-[#5A544D] leading-relaxed">
                  {student.observations || 'Aucune observation enregistrée.'}
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: Repertoire & Objectives */}
          {activeTab === 'pedagogy' && (
            <div className="space-y-6">
              
              {/* Current Pieces */}
              <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E] flex items-center gap-2">
                    <Music className="w-4 h-4 text-[#B0824B]" />
                    <span>Morceaux en cours d'apprentissage</span>
                  </h4>
                  <span className="text-xs text-[#8A8275]">
                    {student.currentPieces.length} œuvre(s)
                  </span>
                </div>
                
                {student.currentPieces.length > 0 ? (
                  <ul className="space-y-2">
                    {student.currentPieces.map((piece, idx) => (
                      <li key={idx} className="p-3 bg-[#FAF8F5] rounded-lg border border-[#F0EBE2] text-xs sm:text-sm text-[#1E1B18] font-medium flex items-center justify-between">
                        <span>{piece}</span>
                        <span className="text-[11px] text-[#B0824B] font-normal">En travail</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#8A8275] italic">Aucun morceau en cours renseigné.</p>
                )}
              </div>

              {/* Objectives */}
              <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B0824B]" />
                  <span>Objectifs à moyen & long terme</span>
                </h4>
                {student.goals.length > 0 ? (
                  <ul className="space-y-2">
                    {student.goals.map((g, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5A544D]">
                        <CheckCircle2 className="w-4 h-4 text-[#B0824B] shrink-0 mt-0.5" />
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-[#8A8275] italic">Aucun objectif renseigné.</p>
                )}
              </div>

              {/* Pedagogical Observations */}
              <div className="p-5 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] space-y-2">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A443E]">
                  Notes pédagogiques de fond (points d'attention)
                </h4>
                <p className="text-xs sm:text-sm text-[#5A544D] leading-relaxed">
                  {student.pedagogicalNotes || 'Aucune note pédagogique particulière.'}
                </p>
              </div>

              {/* Past Pieces */}
              <div className="p-5 bg-white rounded-xl border border-[#E8E2D8] space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#7A7369]">
                  Morceaux déjà validés & répertoire acquis
                </h4>
                {student.pastPieces.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {student.pastPieces.map((p, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#F4EFEA] text-[#5A544D] rounded-md text-xs border border-[#E8E2D8]">
                        ✓ {p}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#8A8275] italic">Aucun morceau passé consigné.</p>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: Chronological Lesson History */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                    Suivi après-cours
                  </h4>
                  <p className="text-xs text-[#7A7369]">
                    Compte-rendu et consignes laissées après chaque séance.
                  </p>
                </div>
                <button
                  onClick={() => onAddLogForStudent(student.id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] rounded-xl transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter une note de cours</span>
                </button>
              </div>

              {studentLogs.length > 0 ? (
                <div className="space-y-4">
                  {studentLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-5 bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D5C7B0] transition-colors space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-[#F2ECE3] pb-2.5">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#B0824B]" />
                          <span className="font-semibold text-sm text-[#1E1B18]">
                            Séance du {log.date}
                          </span>
                          <span className="text-xs text-[#8A8275]">
                            · {log.durationMinutes} min
                          </span>
                        </div>
                      </div>

                      {/* Pieces */}
                      {log.piecesWorkedOn.length > 0 && (
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8275] block">
                            Morceaux travaillés :
                          </span>
                          <div className="text-xs sm:text-sm font-medium text-[#1E1B18] mt-0.5">
                            {log.piecesWorkedOn.join(', ')}
                          </div>
                        </div>
                      )}

                      {/* Concepts */}
                      {log.conceptsCovered && (
                        <div>
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8275] block">
                            Notions abordées :
                          </span>
                          <p className="text-xs sm:text-sm text-[#5A544D] mt-0.5">
                            {log.conceptsCovered}
                          </p>
                        </div>
                      )}

                      {/* Exercises Given */}
                      {log.exercisesGiven && (
                        <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#F0EBE2]">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B0824B] block">
                            Exercices & Devoirs pour le prochain cours :
                          </span>
                          <p className="text-xs sm:text-sm text-[#1E1B18] font-medium mt-0.5">
                            {log.exercisesGiven}
                          </p>
                        </div>
                      )}

                      {/* Difficulties & Next Goals */}
                      {(log.difficulties || log.nextGoals) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          {log.difficulties && (
                            <div className="text-[#7A7369]">
                              <span className="font-semibold text-[#1E1B18] block">Difficultés constatées :</span>
                              {log.difficulties}
                            </div>
                          )}
                          {log.nextGoals && (
                            <div className="text-[#7A7369]">
                              <span className="font-semibold text-[#1E1B18] block">Objectif séance suivante :</span>
                              {log.nextGoals}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Free Comment */}
                      {log.freeComment && (
                        <div className="pt-2 border-t border-[#F2ECE3] text-xs italic text-[#6A635B]">
                          « {log.freeComment} »
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-[#FAF8F5] rounded-xl border border-dashed border-[#D8D1C7]">
                  <p className="text-xs sm:text-sm text-[#7A7369]">
                    Aucune note de cours enregistrée pour le moment.
                  </p>
                  <button
                    onClick={() => onAddLogForStudent(student.id)}
                    className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#1E1B18] bg-white border border-[#D8D1C7] rounded-lg hover:bg-[#F2ECE3]"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Créer la première note de cours
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 border-t border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm(`Êtes-vous sûr(e) de vouloir archiver ou supprimer l'élève ${student.firstName} ${student.lastName} ?`)) {
                onDeleteStudent(student.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Supprimer cet élève</span>
          </button>

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
