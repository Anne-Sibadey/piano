import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, 
  Clock, User, MapPin, Filter 
} from 'lucide-react';
import { ScheduleEvent, Student, EventType } from '../../types';

interface CalendarViewProps {
  events: ScheduleEvent[];
  students: Student[];
  onOpenNewEvent: (date?: string) => void;
  onEditEvent: (event: ScheduleEvent) => void;
  onSelectStudent: (student: Student) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  students,
  onOpenNewEvent,
  onEditEvent,
  onSelectStudent
}) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date('2026-10-05')); // Default to a Monday week
  const [typeFilter, setTypeFilter] = useState<'all' | 'courses' | 'vacation' | 'absence'>('all');

  // Compute start of current week (Monday)
  const getStartOfWeek = (d: Date): Date => {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  };

  const weekStart = getStartOfWeek(currentDate);

  // Generate 6 days for the week (Monday - Saturday)
  const weekDays = Array.from({ length: 6 }).map((_, i) => {
    const day = new Date(weekStart);
    day.setDate(day.getDate() + i);
    return day;
  });

  const nextWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + (viewMode === 'week' ? 7 : 30));
    setCurrentDate(d);
  };

  const prevWeek = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - (viewMode === 'week' ? 7 : 30));
    setCurrentDate(d);
  };

  const setToday = () => {
    setCurrentDate(new Date('2026-10-05'));
  };

  // Filter events
  const filteredEvents = events.filter((evt) => {
    if (typeFilter === 'courses') return evt.type.startsWith('course');
    if (typeFilter === 'vacation') return evt.type === 'vacation';
    if (typeFilter === 'absence') return evt.type === 'absence';
    return true;
  });

  // Event color badge styling helper
  const getEventStyle = (type: EventType) => {
    switch (type) {
      case 'course_30':
        return 'bg-[#FFF8EE] border-[#ECC48D] text-[#8C5E1B]';
      case 'course_45':
        return 'bg-[#F2ECE3] border-[#D5C7B0] text-[#1E1B18]';
      case 'course_60':
        return 'bg-[#EBF7F2] border-[#A8DFC9] text-[#165842]';
      case 'vacation':
        return 'bg-[#EEF4FF] border-[#B7D0FF] text-[#1E40AF]';
      case 'absence':
        return 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]';
      case 'event':
      default:
        return 'bg-[#FAF5FF] border-[#E9D5FF] text-[#6B21A8]';
    }
  };

  const getEventDurationLabel = (type: EventType, duration: number) => {
    if (type === 'course_30') return '30 min';
    if (type === 'course_45') return '45 min';
    if (type === 'course_60') return '1 heure';
    if (type === 'vacation') return 'Vacances';
    if (type === 'absence') return 'Absence';
    return `${duration} min`;
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1E1B18] font-medium">
            Emploi du Temps
          </h2>
          <p className="text-xs sm:text-sm text-[#7A7369] mt-0.5">
            Planning hebdomadaire des cours et gestion des créneaux de l'atelier
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onOpenNewEvent()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] active:scale-[0.99] rounded-xl shadow-sm transition-all"
          >
            <Plus className="w-4 h-4 text-[#DFC79D]" />
            <span>Programmer un créneau</span>
          </button>
        </div>
      </div>

      {/* Toolbar: Navigation, Period Display, View Mode, Filters */}
      <div className="p-4 bg-white rounded-xl border border-[#E8E2D8] flex flex-wrap items-center justify-between gap-4 shadow-xs">
        
        {/* Navigation arrows & Today */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#FAF8F5] rounded-lg border border-[#E8E2D8] p-0.5">
            <button
              onClick={prevWeek}
              className="p-1.5 hover:bg-white rounded-md text-[#5A544D] hover:text-[#1E1B18] transition-colors"
              title="Semaine précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={setToday}
              className="px-3 py-1 text-xs font-medium text-[#1E1B18] hover:bg-white rounded-md transition-colors"
            >
              Aujourd'hui
            </button>
            <button
              onClick={nextWeek}
              className="p-1.5 hover:bg-white rounded-md text-[#5A544D] hover:text-[#1E1B18] transition-colors"
              title="Semaine suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <span className="font-serif-display text-lg text-[#1E1B18] font-medium ml-2">
            Semaine du {weekDays[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Visual Legend & Filter */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B0824B]" />
            <span className="text-[#5A544D]">Cours 45m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ECC48D]" />
            <span className="text-[#5A544D]">Cours 30m</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#165842]" />
            <span className="text-[#5A544D]">Cours 1h</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1E40AF]" />
            <span className="text-[#5A544D]">Vacances</span>
          </div>
        </div>

      </div>

      {/* Week Calendar Grid (6 columns: Lundi to Samedi) */}
      <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-sm overflow-hidden">
        
        {/* Days Header */}
        <div className="grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-[#E8E2D8] bg-[#FAF8F5] border-b border-[#E8E2D8]">
          {weekDays.map((day) => {
            const dateStr = day.toISOString().split('T')[0];
            const isToday = dateStr === new Date().toISOString().split('T')[0];

            return (
              <div key={dateStr} className={`p-3 text-center ${isToday ? 'bg-[#FAF3EA]' : ''}`}>
                <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7369]">
                  {day.toLocaleDateString('fr-FR', { weekday: 'long' })}
                </div>
                <div className={`font-serif-display text-lg font-medium mt-0.5 ${isToday ? 'text-[#B0824B] font-bold' : 'text-[#1E1B18]'}`}>
                  {day.getDate()} {day.toLocaleDateString('fr-FR', { month: 'short' })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Days Content Columns */}
        <div className="grid grid-cols-1 md:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-[#E8E2D8] min-h-[460px]">
          {weekDays.map((day) => {
            const dateStr = day.toISOString().split('T')[0];
            const dayEvents = filteredEvents.filter(e => e.date === dateStr);

            return (
              <div 
                key={dateStr} 
                className="p-3 flex flex-col justify-between bg-white/70 hover:bg-[#FAF8F5]/50 transition-colors relative min-h-[160px] md:min-h-0"
              >
                {/* Events list for this day */}
                <div className="space-y-2.5">
                  {dayEvents.length > 0 ? (
                    dayEvents.map((evt) => (
                      <div
                        key={evt.id}
                        onClick={() => onEditEvent(evt)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer hover:shadow-xs transition-all ${getEventStyle(evt.type)}`}
                      >
                        <div className="flex items-center justify-between font-semibold">
                          <span>{evt.startTime} – {evt.endTime}</span>
                          <span className="text-[10px] opacity-80">{getEventDurationLabel(evt.type, evt.durationMinutes)}</span>
                        </div>
                        <div className="font-medium mt-1 text-[#1E1B18] line-clamp-1">
                          {evt.title}
                        </div>
                        {evt.notes && (
                          <div className="text-[11px] opacity-75 mt-0.5 line-clamp-1">
                            {evt.notes}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="pt-8 text-center text-xs text-[#A8A196] italic">
                      Aucun cours
                    </div>
                  )}
                </div>

                {/* Quick Add on this specific day */}
                <button
                  onClick={() => onOpenNewEvent(dateStr)}
                  className="mt-4 w-full py-1.5 text-[11px] font-medium text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#FAF8F5] rounded-lg border border-dashed border-[#D8D1C7] transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Ajouter</span>
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* Vacation / Special Periods Banner */}
      <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E8E2D8] flex items-center justify-between text-xs text-[#5A544D]">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-[#B0824B]" />
          <span><strong>Vacances scolaires de la zone :</strong> Les cours s'interrompent automatiquement durant les congés scolaires officiels sauf stages spécifiques.</span>
        </div>
        <button
          onClick={() => onOpenNewEvent()}
          className="text-[#B0824B] hover:underline shrink-0"
        >
          Bloquer une période d'absence
        </button>
      </div>

    </div>
  );
};
