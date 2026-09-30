export type LessonDuration = '30min' | '45min' | '60min';

export type StudentStatus = 'active' | 'paused' | 'archived';

export type PaymentStatus = 'up_to_date' | 'pending' | 'installments';

export interface ParentContact {
  name: string;
  relationship: string;
  phone: string;
  email: string;
}

export interface Student {
  id: string;
  absenceMinutes?: number; // cumul des absences, modifiable à la main
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  age?: number;
  phone: string;
  email: string;
  address: string;
  isMinor: boolean;
  parentContact?: ParentContact;
  level: string; // 'Débutant', 'Intermédiaire', 'Avancé', 'Reprise'
  startDate: string; // YYYY-MM-DD
  formula: LessonDuration;
  pricePerYear: string; // e.g. "[À renseigner]" or "950 €"
  paymentStatus: PaymentStatus;
  paymentNotes: string;
  habitualSlot: string; // e.g. "Mercredi 14h30 - 15h15"
  goals: string[];
  currentPieces: string[];
  pastPieces: string[];
  pedagogicalNotes: string;
  observations: string;
  absencesCount: number;
  status: StudentStatus;
  createdAt: string;
}

export interface PedagogicalLog {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  durationMinutes: number;
  piecesWorkedOn: string[];
  conceptsCovered: string; // e.g. "Polyrythmie 3 pour 2, phrasé legato, pédale"
  exercisesGiven: string; // e.g. "Hanon n°5 mesures 1 à 12, Gamme de Ré Majeur m.s."
  difficulties: string; // e.g. "Tension main gauche sur les arpèges"
  nextGoals: string; // e.g. "Mémoriser page 2 au tempo modéré"
  freeComment: string;
}

export type EventType = 'course_30' | 'course_45' | 'course_60' | 'vacation' | 'absence' | 'event';

export interface ScheduleEvent {
  id: string;
  studentId?: string;
  studentName?: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "14:00"
  endTime: string; // "14:45"
  durationMinutes: number;
  type: EventType;
  notes?: string;
  roomOrLocation?: string;
  auto?: boolean; // cours généré automatiquement
  absent?: boolean; // élève déclaré absent
}

export interface ContactInquiry {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profile: string; // "Enfant", "Adolescent", "Adulte débutant", "Adulte reprise"
  level: string;
  age: string;
  formula: string;
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'registered' | 'archived';
}

export interface TeacherSettings {
  teacherName: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  shortBio: string;
  musicalJourney: string;
  teachingPhilosophy: string;
  formulas: {
    id: LessonDuration;
    name: string;
    durationMinutes: number;
    recommendedFor: string;
    annualPrice: string;
    description: string;
    features: string[];
  }[];
}
