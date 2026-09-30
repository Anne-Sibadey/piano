import React, { useState } from 'react';
import { 
  BookOpen, Plus, Calendar, Music, User, 
  Search, Award, Clock, ArrowRight 
} from 'lucide-react';
import { PedagogicalLog, Student } from '../../types';

interface PedagogicalTrackerViewProps {
  logs: PedagogicalLog[];
  students: Student[];
  onOpenNewLog: (studentId?: string) => void;
  onSelectStudent: (student: Student) => void;
}

export const PedagogicalTrackerView: React.FC<PedagogicalTrackerViewProps> = ({
  logs,
  students,
  onOpenNewLog,
  onSelectStudent
}) => {
  const [selectedStudentFilter, setSelectedStudentFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sort logs by date descending
  const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  // Filter logs
  const filteredLogs = sortedLogs.filter((log) => {
    const matchesStudent = selectedStudentFilter === 'all' || log.studentId === selectedStudentFilter;
    const student = students.find(s => s.id === log.studentId);
    const studentName = student ? `${student.firstName} ${student.lastName}` : '';
    const matchesSearch = 
      studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.piecesWorkedOn.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.conceptsCovered.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.exercisesGiven.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStudent && matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18] font-medium">
            Suivi Pédagogique & Cahier de Cours
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7369] mt-0.5">
            Historique chronologique des séances, devoirs donnés et bilans de progression
          </p>
        </div>

        <button
          onClick={() => onOpenNewLog()}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#DFC79D]" />
          <span>Consigner un cours</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Rechercher par élève, morceau, exercice..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
          />
          <Search className="w-4 h-4 text-[#8A8275] absolute left-3 top-2.5" />
        </div>

        {/* Student selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#7A7369] whitespace-nowrap">Filtrer par élève :</span>
          <select
            value={selectedStudentFilter}
            onChange={(e) => setSelectedStudentFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D8D1C7] rounded-lg text-[#1E1B18] focus:outline-none"
          >
            <option value="all">Tous les élèves ({students.length})</option>
            {students.map((st) => (
              <option key={st.id} value={st.id}>
                {st.firstName} {st.lastName}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Chronological Stream of Logs */}
      {filteredLogs.length > 0 ? (
        <div className="space-y-4">
          {filteredLogs.map((log) => {
            const student = students.find(s => s.id === log.studentId);

            return (
              <div
                key={log.id}
                className="p-6 bg-white rounded-2xl border border-[#E8E2D8] hover:border-[#D5C7B0] transition-colors shadow-xs space-y-4"
              >
                {/* Header: Student name, Date & Duration */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#F2ECE3] gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FAF3EA] text-[#B0824B] flex items-center justify-center font-serif-display font-semibold text-sm">
                      {student ? `${student.firstName[0]}${student.lastName[0]}` : 'EL'}
                    </div>
                    <div>
                      {student ? (
                        <button
                          onClick={() => onSelectStudent(student)}
                          className="font-serif-display text-lg font-medium text-[#1E1B18] hover:text-[#B0824B] transition-colors flex items-center gap-1.5 text-left"
                        >
                          <span>{student.firstName} {student.lastName}</span>
                          <span className="text-xs text-[#8A8275] font-normal">({student.level})</span>
                        </button>
                      ) : (
                        <span className="font-serif-display text-lg font-medium text-[#1E1B18]">Élève</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#7A7369]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B0824B]" />
                      <span>{log.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#B0824B]" />
                      <span>{log.durationMinutes} min</span>
                    </div>
                  </div>
                </div>

                {/* Body Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                  
                  {/* Left Column: Pieces & Concepts */}
                  <div className="space-y-3">
                    {log.piecesWorkedOn.length > 0 && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8275] block mb-1">
                          Morceaux travaillés :
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {log.piecesWorkedOn.map((piece, idx) => (
                            <span key={idx} className="px-2.5 py-1 bg-[#FAF8F5] text-[#1E1B18] font-medium rounded-md border border-[#E8E2D8]">
                              {piece}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {log.conceptsCovered && (
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#8A8275] block mb-1">
                          Notions abordées :
                        </span>
                        <p className="text-[#5A544D] leading-relaxed">
                          {log.conceptsCovered}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Homework & Difficulties */}
                  <div className="space-y-3">
                    {log.exercisesGiven && (
                      <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#F0EBE2]">
                        <span className="text-xs font-semibold uppercase tracking-wider text-[#B0824B] block mb-1">
                          Exercices pour le prochain cours :
                        </span>
                        <p className="text-[#1E1B18] font-medium leading-relaxed">
                          {log.exercisesGiven}
                        </p>
                      </div>
                    )}

                    {(log.difficulties || log.nextGoals) && (
                      <div className="space-y-1.5 text-xs">
                        {log.difficulties && (
                          <p className="text-[#6A635B]">
                            <strong className="text-[#1E1B18]">Difficulté : </strong>{log.difficulties}
                          </p>
                        )}
                        {log.nextGoals && (
                          <p className="text-[#6A635B]">
                            <strong className="text-[#1E1B18]">Objectif fixé : </strong>{log.nextGoals}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                </div>

                {/* Free Comment */}
                {log.freeComment && (
                  <div className="pt-2 border-t border-[#F2ECE3] text-xs italic text-[#7A7369]">
                    Commentaire : « {log.freeComment} »
                  </div>
                )}

              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#D8D1C7] space-y-3">
          <BookOpen className="w-8 h-8 text-[#8A8275] mx-auto" />
          <h3 className="font-serif-display text-lg text-[#1E1B18]">
            Aucun compte-rendu pour le moment
          </h3>
          <p className="text-xs text-[#7A7369]">
            Enregistrez les devoirs et notions abordées pour chaque élève après sa séance de cours.
          </p>
          <button
            onClick={() => onOpenNewLog()}
            className="px-4 py-2 text-xs font-medium text-white bg-[#1E1B18] rounded-xl hover:bg-[#342F2B]"
          >
            Créer un compte-rendu
          </button>
        </div>
      )}

    </div>
  );
};
