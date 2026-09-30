import { Student, ScheduleEvent } from '../types';

// ⚠️ À mettre à jour chaque année (dates officielles, zone C : Paris, Créteil, Versailles…).
// Chaque période est indiquée en jours SANS cours (du samedi de départ au dimanche précédant la reprise du lundi).
export const SCHOOL_YEAR = {
  label: '2026-2027 (zone C)',
  start: '2026-09-01',
  end: '2027-07-02', // dernier jour de cours : modifiable
  breaks: [
    { name: 'Vacances de la Toussaint', from: '2026-10-17', to: '2026-11-01' },
    { name: 'Vacances de Noël', from: '2026-12-19', to: '2027-01-03' },
    { name: "Vacances d'hiver", from: '2027-02-06', to: '2027-02-21' },
    { name: 'Vacances de printemps', from: '2027-04-03', to: '2027-04-18' },
    { name: "Pont de l'Ascension", from: '2027-05-06', to: '2027-05-09' },
  ],
};

export const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const fromISO = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };

const easter = (y: number) => {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(y, month - 1, day);
};

const holidayCache = new Map<number, Set<string>>();
const holidays = (y: number) => {
  if (!holidayCache.has(y)) {
    const set = new Set(['01-01', '05-01', '05-08', '07-14', '08-15', '11-01', '11-11', '12-25'].map((x) => `${y}-${x}`));
    const e = easter(y);
    [1, 39, 50].forEach((n) => { const d = new Date(e); d.setDate(d.getDate() + n); set.add(toISO(d)); }); // Pâques, Ascension, Pentecôte (lundis/jeudi)
    holidayCache.set(y, set);
  }
  return holidayCache.get(y)!;
};

// Motif d'absence de cours pour un jour (vacances ou férié), sinon null.
export const dayOffReason = (date: string): string | null => {
  const br = SCHOOL_YEAR.breaks.find((b) => date >= b.from && date <= b.to);
  if (br) return br.name;
  return holidays(Number(date.slice(0, 4))).has(date) ? 'Jour férié' : null;
};

const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

// Lit un créneau écrit à la main, ex. « Mercredi 14h30 - 15h15 » → { jour, heure de début }.
export const parseSlot = (text: string) => {
  const s = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const day = DAYS.findIndex((d) => s.includes(d));
  const m = s.match(/(\d{1,2})\s*(?:h|:)\s*(\d{2})?/);
  if (day < 0 || !m) return null;
  const hh = Number(m[1]), mm = m[2] ? Number(m[2]) : 0;
  if (hh > 23 || mm > 59) return null;
  return { day, hh, mm };
};

const hhmm = (mins: number) => `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`;

export const generateYear = (students: Student[], events: ScheduleEvent[], from: string) => {
  const kept = events.filter((e) => !(e.auto && e.date >= from));
  const ids = new Set(kept.map((e) => e.id));
  const created: ScheduleEvent[] = [];
  const skipped: string[] = [];
  for (const st of students) {
    if (st.status !== 'active') continue;
    const slot = parseSlot(st.habitualSlot || '');
    if (!slot) { skipped.push(`${st.firstName} ${st.lastName}`); continue; }
    const dur = parseInt(st.formula, 10) || 45;
    let begin = from > SCHOOL_YEAR.start ? from : SCHOOL_YEAR.start;
    if (st.startDate && st.startDate > begin) begin = st.startDate;
    const d = fromISO(begin);
    while (d.getDay() !== slot.day) d.setDate(d.getDate() + 1);
    for (; toISO(d) <= SCHOOL_YEAR.end; d.setDate(d.getDate() + 7)) {
      const date = toISO(d);
      const id = `auto-${st.id}-${date}`;
      if (dayOffReason(date) || ids.has(id)) continue;
      const start = slot.hh * 60 + slot.mm;
      created.push({
        id, studentId: st.id, studentName: `${st.firstName} ${st.lastName}`,
        title: `Cours — ${st.firstName} ${st.lastName}`, date,
        startTime: hhmm(start), endTime: hhmm(start + dur), durationMinutes: dur,
        type: `course_${dur}` as ScheduleEvent['type'], auto: true,
      });
    }
  }
  return { events: [...kept, ...created], created: created.length, skipped };
};

export const formatMinutes = (min: number) => {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  if (h === 0) return `${m} min`;
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`;
};

// Hachures légères pour un cours où l'élève est absent
export const HATCH = 'repeating-linear-gradient(135deg, rgba(30,27,24,0.08) 0, rgba(30,27,24,0.08) 5px, transparent 5px, transparent 10px)';
