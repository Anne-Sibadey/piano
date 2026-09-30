import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, 
  Clock, User, MapPin, Filter 
} from 'lucide-react';
import { ScheduleEvent, Student, EventType } from '../../types';
import { dayOffReason, toISO } from '../../utils/schoolCalendar';

// Grille horaire fixe : 7h30 → 20h00
const START = 7 * 60 + 30;
const END = 20 * 60;
const PX = 1.4; // pixels par minute
const PAD = 10;
const GRID_H = (END - START) * PX + 2 * PAD;
const y = (m: number) => (m - START) * PX + PAD;
const SLOTS = Array.from({ length: (END - START) / 30 + 1 }, (_, i) => START + i * 30);
const slotLabel = (m: number) => `${Math.floor(m / 60)}h${String(m % 60).padStart(2, '0')}`;
const toMin = (t: string) => { const [h, m] = (t || '0:0').split(':').map(Number); return h * 60 + (m || 0); };

// Place les cours qui se chevauchent côte à côte.
const layout = (evs: ScheduleEvent[]) => {
  const items = evs
    .map((e) => { const s = toMin(e.startTime); const en = e.endTime ? toMin(e.endTime) : s + (e.durationMinutes || 45); return { e, s, en, lane: 0, lanes: 1 }; })
    .sort((a, b) => a.s - b.s || a.en - b.en);
  const out: typeof items = [];
  let cluster: typeof items = [];
  let clusterEnd = -1;
  const flush = () => { const n = Math.max(0, ...cluster.map((c) => c.lane)) + 1; cluster.forEach((c) => (c.lanes = n)); out.push(...cluster); cluster = []; };
  for (const it of items) {
    if (cluster.length && it.s >= clusterEnd) { flush(); clusterEnd = -1; }
    const used = new Set(cluster.filter((c) => c.en > it.s).map((c) => c.lane));
    let lane = 0;
    while (used.has(lane)) lane++;
    it.lane = lane;
    cluster.push(it);
    clusterEnd = Math.max(clusterEnd, it.en);
  }
  if (cluster.length) flush();
  return out;
};

interface CalendarViewProps {
  events: ScheduleEvent[];
  students: Student[];
  onOpenNewEvent: (date?: string) => void;
  onEditEvent: (event: ScheduleEvent) => void;
  onSelectStudent: (student: Student) => void;
  onGenerateYear?: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  students,
  onOpenNewEvent,
  onEditEvent,
  onSelectStudent,
  onGenerateYear
}) => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
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
    setCurrentDate(new Date());
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
            Planning hebdomadaire des cours et gestion des créneaux de la salle de cours
          </p>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2.5">
          {onGenerateYear && (
            <button
              onClick={onGenerateYear}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1E1B18] bg-white hover:bg-[#FAF8F5] border border-[#D5C7B0] rounded-xl transition-all"
            >
              <CalendarIcon className="w-4 h-4 text-[#B0824B]" />
              <span>Générer les cours de l'année</span>
            </button>
          )}
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

      {/* Grille horaire fixe (7h30 - 20h00), du lundi au samedi */}
      <div className="bg-white rounded-2xl border border-[#E8E2D8] shadow-sm overflow-x-auto">
        <div className="min-w-[780px]">
          <div className="grid border-b border-[#E8E2D8] bg-[#FAF8F5]" style={{ gridTemplateColumns: '56px repeat(6, minmax(0, 1fr))' }}>
            <div />
            {weekDays.map((day) => {
              const dateStr = toISO(day);
              const isToday = dateStr === toISO(new Date());
              const offReason = dayOffReason(dateStr);
              return (
                <div key={dateStr} className={`p-2.5 text-center border-l border-[#E8E2D8] ${isToday ? 'bg-[#FAF3EA]' : ''}`}>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7369]">
                    {day.toLocaleDateString('fr-FR', { weekday: 'long' })}
                  </div>
                  <div className={`font-serif-display text-lg font-medium mt-0.5 ${isToday ? 'text-[#B0824B] font-bold' : 'text-[#1E1B18]'}`}>
                    {day.getDate()} {day.toLocaleDateString('fr-FR', { month: 'short' })}
                  </div>
                  <div className="h-4 text-[10px] uppercase tracking-wide text-[#8A8275]">{offReason || ''}</div>
                  <button
                    onClick={() => onOpenNewEvent(dateStr)}
                    className="mt-1 inline-flex items-center gap-1 px-2 py-0.5 text-[11px] text-[#7A7369] hover:text-[#1E1B18] hover:bg-white rounded-md border border-dashed border-[#D8D1C7]"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Ajouter</span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="grid" style={{ gridTemplateColumns: '56px repeat(6, minmax(0, 1fr))' }}>
            <div className="relative" style={{ height: GRID_H }}>
              {SLOTS.map((m) => (
                <div key={m} className="absolute right-1.5 -translate-y-1/2 text-[10px] text-[#8A8275]" style={{ top: y(m) }}>
                  {slotLabel(m)}
                </div>
              ))}
            </div>

            {weekDays.map((day) => {
              const dateStr = toISO(day);
              const offReason = dayOffReason(dateStr);
              const dayEvents = filteredEvents.filter((e) => e.date === dateStr);
              return (
                <div key={dateStr} className={`relative border-l border-[#E8E2D8] ${offReason ? 'bg-[#F3EFEA]' : ''}`} style={{ height: GRID_H }}>
                  {SLOTS.map((m) => (
                    <div key={m} className={`absolute inset-x-0 border-t ${m % 60 === 0 ? 'border-[#E8E2D8]' : 'border-[#F1EDE6]'}`} style={{ top: y(m) }} />
                  ))}
                  {layout(dayEvents).map(({ e, s, en, lane, lanes }) => {
                    const top = Math.min(y(Math.max(s, START)), y(END) - 22);
                    const h = Math.max((Math.min(en, END) - Math.max(s, START)) * PX, 22);
                    return (
                      <div
                        key={e.id}
                        onClick={() => onEditEvent(e)}
                        title={`${e.startTime} – ${e.endTime} · ${e.title}`}
                        className={`absolute z-10 rounded-lg border px-1.5 py-0.5 text-[11px] leading-tight overflow-hidden cursor-pointer hover:shadow-md ${getEventStyle(e.type)}`}
                        style={{ top: top + 1, height: h - 2, left: `calc(${(lane / lanes) * 100}% + 2px)`, width: `calc(${100 / lanes}% - 4px)` }}
                      >
                        <div className="font-semibold">{e.startTime}–{e.endTime}</div>
                        <div className="font-medium text-[#1E1B18] truncate">{e.title}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
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
