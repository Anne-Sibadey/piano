import React, { useState } from 'react';
import { 
  Users, Search, Plus, Filter, Phone, Mail, Clock, 
  CreditCard, ChevronRight, Music, CheckCircle2, User 
} from 'lucide-react';
import { Student, LessonDuration, StudentStatus } from '../../types';

interface StudentsViewProps {
  students: Student[];
  onOpenNewStudent: () => void;
  onSelectStudent: (student: Student) => void;
  onEditStudent: (student: Student) => void;
  onAddLogForStudent: (studentId: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  onOpenNewStudent,
  onSelectStudent,
  onEditStudent,
  onAddLogForStudent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | StudentStatus>('active');
  const [formulaFilter, setFormulaFilter] = useState<'all' | LessonDuration>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filter students
  const filteredStudents = students.filter((st) => {
    const matchesSearch = 
      `${st.firstName} ${st.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.currentPieces.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || st.status === statusFilter;
    const matchesFormula = formulaFilter === 'all' || st.formula === formulaFilter;

    return matchesSearch && matchesStatus && matchesFormula;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Bar: Title & Add Student CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18] font-medium">
            Gestion des Élèves
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7369] mt-0.5">
            {students.length} élève(s) inscrit(s) au total · {students.filter(s => s.status === 'active').length} actifs
          </p>
        </div>

        <button
          onClick={onOpenNewStudent}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#DFC79D]" />
          <span>Ajouter un élève</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Rechercher par nom, niveau, morceau..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
          />
          <Search className="w-4 h-4 text-[#8A8275] absolute left-3 top-2.5" />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Status segmented control */}
          <div className="flex items-center p-0.5 bg-[#FAF8F5] rounded-lg border border-[#E8E2D8]">
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === 'active' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#7A7369] hover:text-[#1E1B18]'
              }`}
            >
              Actifs ({students.filter(s => s.status === 'active').length})
            </button>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === 'all' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#7A7369] hover:text-[#1E1B18]'
              }`}
            >
              Tous ({students.length})
            </button>
            <button
              onClick={() => setStatusFilter('paused')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === 'paused' ? 'bg-white text-[#1E1B18] shadow-xs' : 'text-[#7A7369] hover:text-[#1E1B18]'
              }`}
            >
              En pause
            </button>
          </div>

          {/* Formula Filter */}
          <select
            value={formulaFilter}
            onChange={(e) => setFormulaFilter(e.target.value as any)}
            className="px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#D8D1C7] rounded-lg focus:outline-none text-[#5A544D]"
          >
            <option value="all">Toutes formules</option>
            <option value="30min">Formule 30 min</option>
            <option value="45min">Formule 45 min</option>
            <option value="60min">Formule 1 heure</option>
          </select>

        </div>

      </div>

      {/* Students Directory Grid / Cards */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredStudents.map((st) => (
            <div
              key={st.id}
              className="p-5 bg-white rounded-2xl border border-[#E8E2D8] hover:border-[#D5C7B0] transition-all flex flex-col justify-between hover:shadow-sm group"
            >
              <div>
                
                {/* Header card: Name, formula badge, and status */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div 
                    onClick={() => onSelectStudent(st)}
                    className="cursor-pointer group-hover:text-[#B0824B] transition-colors"
                  >
                    <h3 className="font-serif-display text-xl font-medium text-[#1E1B18] group-hover:text-[#B0824B] transition-colors">
                      {st.firstName} {st.lastName}
                    </h3>
                    <p className="text-xs text-[#7A7369]">
                      {st.level} {st.age ? `· ${st.age} ans` : ''}
                    </p>
                  </div>

                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF3EA] border border-[#E8DFC8] text-[#B0824B] font-medium shrink-0">
                    {st.formula}
                  </span>
                </div>

                {/* Habitual Slot & Contact */}
                <div className="space-y-1.5 py-3 border-t border-b border-[#F2ECE3] text-xs text-[#5A544D]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#B0824B] shrink-0" />
                    <span className="font-medium text-[#1E1B18]">{st.habitualSlot || 'Créneau non assigné'}</span>
                  </div>

                  {st.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#8A8275] shrink-0" />
                      <span>{st.phone}</span>
                    </div>
                  )}

                  {st.isMinor && st.parentContact && (
                    <div className="text-[11px] text-[#8A8275]">
                      Parent : {st.parentContact.name} ({st.parentContact.phone})
                    </div>
                  )}
                </div>

                {/* Current repertoire teaser */}
                <div className="pt-3 pb-2">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8A8275] mb-1 flex items-center gap-1.5">
                    <Music className="w-3 h-3 text-[#B0824B]" />
                    <span>Répertoire en cours :</span>
                  </div>
                  {st.currentPieces.length > 0 ? (
                    <div className="text-xs text-[#3A3530] font-medium line-clamp-2">
                      {st.currentPieces.join(' · ')}
                    </div>
                  ) : (
                    <div className="text-xs text-[#8A8275] italic">Aucun morceau consigné</div>
                  )}
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="mt-4 pt-3 border-t border-[#F2ECE3] flex items-center justify-between">
                <button
                  onClick={() => onAddLogForStudent(st.id)}
                  className="text-xs font-medium text-[#B0824B] hover:text-[#986D3A] transition-colors"
                >
                  + Noter cours
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditStudent(st)}
                    className="px-2.5 py-1 text-xs text-[#5A544D] hover:text-[#1E1B18] rounded-md hover:bg-[#FAF8F5]"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => onSelectStudent(st)}
                    className="px-3 py-1 text-xs font-medium text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] rounded-lg hover:bg-[#F2ECE3] flex items-center gap-1 transition-colors"
                  >
                    <span>Fiche</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#D8D1C7] space-y-3">
          <Users className="w-8 h-8 text-[#8A8275] mx-auto" />
          <h3 className="font-serif-display text-lg text-[#1E1B18]">
            Aucun élève ne correspond à votre recherche
          </h3>
          <p className="text-xs text-[#7A7369] max-w-sm mx-auto">
            Vérifiez l'orthographe ou réinitialisez les filtres pour afficher l'ensemble des élèves.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setFormulaFilter('all');
            }}
            className="px-4 py-2 text-xs font-medium text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl hover:bg-[#F2ECE3]"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}

    </div>
  );
};
