import React from 'react';
import { 
  Users, Calendar, Clock, AlertCircle, Plus, BookOpen, 
  ArrowRight, CheckCircle2, ChevronRight, MessageSquare 
} from 'lucide-react';
import { Student, PedagogicalLog, ScheduleEvent, ContactInquiry } from '../../types';

interface DashboardViewProps {
  students: Student[];
  logs: PedagogicalLog[];
  scheduleEvents: ScheduleEvent[];
  inquiries: ContactInquiry[];
  onOpenNewStudent: () => void;
  onOpenNewLog: (studentId?: string) => void;
  onOpenNewScheduleEvent: () => void;
  onSelectStudent: (student: Student) => void;
  onGoToTab: (tab: 'students' | 'calendar' | 'pedagogy' | 'inquiries') => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  logs,
  scheduleEvents,
  inquiries,
  onOpenNewStudent,
  onOpenNewLog,
  onOpenNewScheduleEvent,
  onSelectStudent,
  onGoToTab
}) => {
  const activeStudents = students.filter(s => s.status === 'active');
  const pendingPayments = students.filter(s => s.paymentStatus === 'pending');
  const newInquiries = inquiries.filter(i => i.status === 'new');
  
  // Sort events by date & time
  const upcomingEvents = [...scheduleEvents]
    .sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime))
    .slice(0, 5);

  const recentLogs = [...logs]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 4);

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner & Quick Action Buttons */}
      <div className="p-6 sm:p-8 bg-white rounded-2xl border border-[#E8E2D8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B0824B]">
            Espace d'enseignement
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18] font-medium mt-1">
            Tableau de Bord
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7369] mt-0.5">
            Bienvenue dans votre espace de gestion pédagogique et administrative.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onOpenNewLog()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl shadow-sm transition-all"
          >
            <BookOpen className="w-4 h-4 text-[#DFC79D]" />
            <span>Nouveau compte-rendu</span>
          </button>

          <button
            onClick={onOpenNewStudent}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] hover:bg-[#F2ECE3] rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4 text-[#B0824B]" />
            <span>Nouvel élève</span>
          </button>

          <button
            onClick={onOpenNewScheduleEvent}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1E1B18] bg-[#FAF8F5] border border-[#D8D1C7] hover:bg-[#F2ECE3] rounded-xl transition-colors"
          >
            <Calendar className="w-4 h-4 text-[#B0824B]" />
            <span>Programmer un cours</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Active Students */}
        <div 
          onClick={() => onGoToTab('students')}
          className="p-5 bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D5C7B0] cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-[#7A7369] mb-2">
            <span className="text-xs font-medium">Élèves actifs</span>
            <Users className="w-4 h-4 text-[#B0824B]" />
          </div>
          <div className="font-serif-display text-3xl font-semibold text-[#1E1B18] tabular-nums">
            {activeStudents.length}
          </div>
          <div className="text-[11px] text-[#8A8275] mt-1 flex items-center justify-between">
            <span>Sur {students.length} inscrits</span>
            <span className="text-[#B0824B] hover:underline">Voir liste →</span>
          </div>
        </div>

        {/* Schedule / Lessons this week */}
        <div 
          onClick={() => onGoToTab('calendar')}
          className="p-5 bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D5C7B0] cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-[#7A7369] mb-2">
            <span className="text-xs font-medium">Créneaux programmés</span>
            <Calendar className="w-4 h-4 text-[#B0824B]" />
          </div>
          <div className="font-serif-display text-3xl font-semibold text-[#1E1B18] tabular-nums">
            {scheduleEvents.filter(e => e.type.startsWith('course')).length}
          </div>
          <div className="text-[11px] text-[#8A8275] mt-1 flex items-center justify-between">
            <span>Cette semaine & à venir</span>
            <span className="text-[#B0824B] hover:underline">Calendrier →</span>
          </div>
        </div>

        {/* Pending Inquiries */}
        <div 
          onClick={() => onGoToTab('inquiries')}
          className="p-5 bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D5C7B0] cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-[#7A7369] mb-2">
            <span className="text-xs font-medium">Demandes reçues</span>
            <MessageSquare className="w-4 h-4 text-[#B0824B]" />
          </div>
          <div className="font-serif-display text-3xl font-semibold text-[#1E1B18] tabular-nums">
            {newInquiries.length}
          </div>
          <div className="text-[11px] text-[#8A8275] mt-1 flex items-center justify-between">
            <span className={newInquiries.length > 0 ? 'text-amber-700 font-medium' : ''}>
              {newInquiries.length > 0 ? `${newInquiries.length} à traiter` : 'Toutes traitées'}
            </span>
            <span className="text-[#B0824B] hover:underline">Gérer →</span>
          </div>
        </div>

        {/* Pending Payments */}
        <div 
          onClick={() => onGoToTab('students')}
          className="p-5 bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D5C7B0] cursor-pointer transition-all hover:shadow-sm"
        >
          <div className="flex items-center justify-between text-[#7A7369] mb-2">
            <span className="text-xs font-medium">Paiements à suivre</span>
            <AlertCircle className={`w-4 h-4 ${pendingPayments.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`} />
          </div>
          <div className="font-serif-display text-3xl font-semibold text-[#1E1B18] tabular-nums">
            {pendingPayments.length}
          </div>
          <div className="text-[11px] text-[#8A8275] mt-1 flex items-center justify-between">
            <span>{pendingPayments.length > 0 ? 'Échéances en attente' : 'Tous à jour'}</span>
            <span className="text-[#B0824B] hover:underline">Détails →</span>
          </div>
        </div>

      </div>

      {/* Main Two-Column Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Upcoming Classes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#B0824B]" />
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                Prochains cours programmés
              </h3>
            </div>
            <button
              onClick={() => onGoToTab('calendar')}
              className="text-xs text-[#B0824B] hover:underline flex items-center gap-1"
            >
              <span>Voir tout l'emploi du temps</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E2D8] divide-y divide-[#F2ECE3] overflow-hidden shadow-sm">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((evt) => {
                const linkedStudent = evt.studentId ? students.find(s => s.id === evt.studentId) : null;

                return (
                  <div key={evt.id} className="p-4 hover:bg-[#FAF8F5] transition-colors flex items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-lg bg-[#FAF3EA] border border-[#E8DFC8] flex flex-col items-center justify-center text-center shrink-0">
                        <span className="text-[10px] text-[#7A7369] font-medium uppercase leading-tight">
                          {new Date(evt.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                        </span>
                        <span className="font-serif-display font-bold text-sm text-[#1E1B18] leading-tight">
                          {new Date(evt.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-[#1E1B18]">
                          {evt.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#7A7369] mt-0.5">
                          <Clock className="w-3 h-3 text-[#B0824B]" />
                          <span>{evt.startTime} – {evt.endTime} ({evt.durationMinutes} min)</span>
                          {evt.notes && <span>· {evt.notes}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {linkedStudent && (
                        <button
                          onClick={() => onSelectStudent(linkedStudent)}
                          className="px-2.5 py-1 text-xs font-medium text-[#5A544D] bg-[#FAF8F5] border border-[#D8D1C7] rounded-lg hover:text-[#1E1B18] hover:bg-[#F2ECE3] transition-colors"
                        >
                          Fiche élève
                        </button>
                      )}
                      <button
                        onClick={() => onOpenNewLog(evt.studentId)}
                        className="px-2.5 py-1 text-xs font-medium text-white bg-[#1E1B18] rounded-lg hover:bg-[#342F2B] transition-colors"
                      >
                        Noter cours
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-[#7A7369]">
                Aucun cours programmé prochainement.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Recent Pedagogical Notes */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B0824B]" />
              <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
                Derniers suivis pédagogiques
              </h3>
            </div>
            <button
              onClick={() => onGoToTab('pedagogy')}
              className="text-xs text-[#B0824B] hover:underline flex items-center gap-1"
            >
              <span>Tous les comptes-rendus</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentLogs.length > 0 ? (
              recentLogs.map((log) => {
                const student = students.find(s => s.id === log.studentId);
                const studentName = student ? `${student.firstName} ${student.lastName}` : 'Élève';

                return (
                  <div
                    key={log.id}
                    onClick={() => student && onSelectStudent(student)}
                    className="p-4 bg-white rounded-xl border border-[#E8E2D8] hover:border-[#D5C7B0] transition-colors cursor-pointer space-y-2 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-sm text-[#1E1B18]">
                        {studentName}
                      </span>
                      <span className="text-[#8A8275]">
                        {log.date} · {log.durationMinutes} min
                      </span>
                    </div>

                    {log.piecesWorkedOn.length > 0 && (
                      <div className="text-xs text-[#4A443E]">
                        <span className="font-medium">Morceaux : </span>
                        {log.piecesWorkedOn.join(', ')}
                      </div>
                    )}

                    {log.exercisesGiven && (
                      <div className="p-2 bg-[#FAF8F5] rounded text-xs text-[#5A544D] border border-[#F0EBE2]">
                        <span className="font-medium text-[#B0824B]">À travailler : </span>
                        {log.exercisesGiven}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-[#E8E2D8] text-xs text-[#7A7369]">
                Aucun compte-rendu récent.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
