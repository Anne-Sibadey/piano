import { Student, PedagogicalLog, ScheduleEvent, ContactInquiry, TeacherSettings } from '../types';
import { initialStudents, initialPedagogicalLogs, initialScheduleEvents, initialInquiries, initialTeacherSettings } from '../data/initialData';

const STORAGE_KEYS = {
  STUDENTS: 'atelier_piano_students_v1',
  LOGS: 'atelier_piano_logs_v1',
  SCHEDULE: 'atelier_piano_schedule_v1',
  INQUIRIES: 'atelier_piano_inquiries_v1',
  SETTINGS: 'atelier_piano_settings_v1',
  ADMIN_AUTH: 'atelier_piano_admin_auth_v1',
  ADMIN_PIN: 'atelier_piano_admin_pin_v1'
};

export const getStoredStudents = (): Student[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.STUDENTS);
    return raw ? JSON.parse(raw) : initialStudents;
  } catch (e) {
    console.error('Error loading students from localStorage', e);
    return initialStudents;
  }
};

export const saveStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Error saving students to localStorage', e);
  }
};

export const getStoredLogs = (): PedagogicalLog[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    return raw ? JSON.parse(raw) : initialPedagogicalLogs;
  } catch (e) {
    console.error('Error loading pedagogical logs from localStorage', e);
    return initialPedagogicalLogs;
  }
};

export const saveLogs = (logs: PedagogicalLog[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(logs));
  } catch (e) {
    console.error('Error saving pedagogical logs to localStorage', e);
  }
};

export const getStoredSchedule = (): ScheduleEvent[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
    return raw ? JSON.parse(raw) : initialScheduleEvents;
  } catch (e) {
    console.error('Error loading schedule from localStorage', e);
    return initialScheduleEvents;
  }
};

export const saveSchedule = (events: ScheduleEvent[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(events));
  } catch (e) {
    console.error('Error saving schedule to localStorage', e);
  }
};

export const getStoredInquiries = (): ContactInquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    return raw ? JSON.parse(raw) : initialInquiries;
  } catch (e) {
    console.error('Error loading inquiries from localStorage', e);
    return initialInquiries;
  }
};

export const saveInquiries = (inquiries: ContactInquiry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  } catch (e) {
    console.error('Error saving inquiries to localStorage', e);
  }
};

export const getStoredSettings = (): TeacherSettings => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return raw ? JSON.parse(raw) : initialTeacherSettings;
  } catch (e) {
    console.error('Error loading settings from localStorage', e);
    return initialTeacherSettings;
  }
};

export const saveSettings = (settings: TeacherSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving settings to localStorage', e);
  }
};

export const checkIsAdminAuthenticated = (): boolean => {
  try {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  } catch {
    return false;
  }
};

export const setAdminAuthenticated = (auth: boolean): void => {
  try {
    if (auth) {
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    }
  } catch (e) {
    console.error(e);
  }
};

export const getAdminPin = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_PIN) || 'piano2026';
  } catch {
    return 'piano2026';
  }
};

export const setAdminPin = (newPin: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, newPin);
  } catch (e) {
    console.error(e);
  }
};
