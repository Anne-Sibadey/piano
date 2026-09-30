import React, { useState, useEffect } from 'react';
import { X, Save, Calendar, Clock, User, Trash2 } from 'lucide-react';
import { ScheduleEvent, Student, EventType } from '../../types';

interface ScheduleEventModalProps {
  isOpen: boolean;
  eventToEdit: ScheduleEvent | null;
  students: Student[];
  preselectedDate?: string;
  onClose: () => void;
  onSave: (event: ScheduleEvent) => void;
  onDelete?: (eventId: string) => void;
}

export const ScheduleEventModal: React.FC<ScheduleEventModalProps> = ({
  isOpen,
  eventToEdit,
  students,
  preselectedDate,
  onClose,
  onSave,
  onDelete
}) => {
  const [studentId, setStudentId] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(preselectedDate || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('14:30');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [type, setType] = useState<EventType>('course_45');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState('Atelier de piano');

  useEffect(() => {
    if (eventToEdit) {
      setStudentId(eventToEdit.studentId || '');
      setTitle(eventToEdit.title);
      setDate(eventToEdit.date);
      setStartTime(eventToEdit.startTime);
      setDurationMinutes(eventToEdit.durationMinutes);
      setType(eventToEdit.type);
      setNotes(eventToEdit.notes || '');
      setLocation(eventToEdit.roomOrLocation || 'Atelier de piano');
    } else {
      setStudentId('');
      setTitle('Cours de piano');
      setDate(preselectedDate || new Date().toISOString().split('T')[0]);
      setStartTime('14:30');
      setDurationMinutes(45);
      setType('course_45');
      setNotes('');
      setLocation('Atelier de piano');
    }
  }, [eventToEdit, preselectedDate, isOpen]);

  if (!isOpen) return null;

  // Calculate end time
  const calculateEndTime = (start: string, duration: number): string => {
    const [h, m] = start.split(':').map(Number);
    if (isNaN(h) || isNaN(m)) return '15:15';
    const totalMinutes = h * 60 + m + duration;
    const endH = Math.floor(totalMinutes / 60) % 24;
    const endM = totalMinutes % 60;
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  };

  const handleStudentSelect = (selectedId: string) => {
    setStudentId(selectedId);
    if (!selectedId) return;
    const st = students.find(s => s.id === selectedId);
    if (st) {
      let dur = 45;
      let t: EventType = 'course_45';
      if (st.formula === '30min') {
        dur = 30;
        t = 'course_30';
      } else if (st.formula === '60min') {
        dur = 60;
        t = 'course_60';
      }
      setDurationMinutes(dur);
      setType(t);
      setTitle(`Cours de piano (${dur} min) — ${st.firstName} ${st.lastName}`);
      if (st.currentPieces.length > 0) {
        setNotes(st.currentPieces.join(', '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedStudent = students.find(s => s.id === studentId);
    const finalStudentName = selectedStudent ? `${selectedStudent.firstName} ${selectedStudent.lastName}` : undefined;
    const calculatedEnd = calculateEndTime(startTime, durationMinutes);

    const savedEvent: ScheduleEvent = {
      id: eventToEdit ? eventToEdit.id : `evt-${Date.now()}`,
      studentId: studentId || undefined,
      studentName: finalStudentName,
      title: title.trim() || 'Séance de cours',
      date,
      startTime,
      endTime: calculatedEnd,
      durationMinutes,
      type,
      notes: notes.trim(),
      roomOrLocation: location.trim()
    };

    onSave(savedEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E8E2D8] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8E2D8] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-[#B0824B]" />
            <h3 className="font-serif-display text-xl text-[#1E1B18] font-medium">
              {eventToEdit ? 'Modifier le créneau' : 'Programmer un cours ou événement'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A7369] hover:text-[#1E1B18] hover:bg-[#F2ECE3] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Student Association */}
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Associer un élève (optionnel)
            </label>
            <select
              value={studentId}
              onChange={(e) => handleStudentSelect(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
            >
              <option value="">-- Aucun élève associé (Événement / Vacances) --</option>
              {students.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.firstName} {st.lastName} ({st.formula})
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Libellé de l'événement <span className="text-[#B0824B]">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Cours de piano — Alexandre Vasseur"
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl focus:outline-none focus:border-[#B0824B]"
            />
          </div>

          {/* Date, Start Time & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Heure début
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Durée
              </label>
              <select
                value={durationMinutes}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setDurationMinutes(val);
                  if (val === 30) setType('course_30');
                  else if (val === 45) setType('course_45');
                  else if (val === 60) setType('course_60');
                }}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
              >
                <option value={30}>30 min</option>
                <option value={45}>45 min</option>
                <option value={60}>1 heure</option>
                <option value={90}>1h30</option>
              </select>
            </div>
          </div>

          {/* Type code */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Type de créneau
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EventType)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
              >
                <option value="course_30">Cours (30 min)</option>
                <option value="course_45">Cours (45 min)</option>
                <option value="course_60">Cours (1 heure)</option>
                <option value="vacation">Vacances / Pause</option>
                <option value="absence">Absence prévue</option>
                <option value="event">Audition / Stage / Réunion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#3A3530] mb-1">
                Lieu
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Atelier de piano"
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-[#3A3530] mb-1">
              Notes pour la séance
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex. Morceaux prévus, point d'étape..."
              className="w-full px-3.5 py-2 text-sm bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl"
            />
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
            {eventToEdit && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Voulez-vous supprimer ce créneau ?')) {
                    onDelete(eventToEdit.id);
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Supprimer</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-[#5A544D] bg-[#FAF8F5] border border-[#D8D1C7] rounded-xl hover:bg-[#F2ECE3]"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2 text-xs sm:text-sm font-medium text-white bg-[#1E1B18] hover:bg-[#342F2B] rounded-xl shadow-sm"
              >
                <Save className="w-4 h-4 text-[#DFC79D]" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
