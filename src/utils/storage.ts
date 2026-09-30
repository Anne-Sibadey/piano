import { supabase } from './supabase';
import { Student, PedagogicalLog, ScheduleEvent, ContactInquiry, TeacherSettings } from '../types';

export interface PrivateData {
  students?: Student[];
  logs?: PedagogicalLog[];
  schedule?: ScheduleEvent[];
  settings?: TeacherSettings;
  inquiries: ContactInquiry[];
}

// Réglages publics (affichés sur le site) : lisibles sans connexion.
export const loadPublicSettings = async (): Promise<TeacherSettings | null> => {
  const { data, error } = await supabase.from('app_data').select('value').eq('key', 'settings').maybeSingle();
  if (error) { console.error(error); return null; }
  return (data?.value as TeacherSettings) ?? null;
};

// Données privées : uniquement pour le compte professeur connecté.
export const loadPrivateData = async (): Promise<PrivateData> => {
  const [kv, inq] = await Promise.all([
    supabase.from('app_data').select('key,value'),
    supabase.from('inquiries').select('data').order('created_at', { ascending: false }),
  ]);
  if (kv.error) throw kv.error;
  if (inq.error) throw inq.error;
  const get = (k: string) => kv.data.find((r) => r.key === k)?.value;
  return {
    students: get('students'),
    logs: get('logs'),
    schedule: get('schedule'),
    settings: get('settings'),
    inquiries: inq.data.map((r) => r.data as ContactInquiry),
  };
};

export const saveKey = async (key: string, value: unknown): Promise<boolean> => {
  const { error } = await supabase.from('app_data').upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) console.error(error);
  return !error;
};

// Visiteur : peut seulement envoyer un message.
export const insertInquiry = async (inq: ContactInquiry): Promise<boolean> => {
  const { error } = await supabase.from('inquiries').insert({ id: inq.id, data: inq });
  if (error) console.error(error);
  return !error;
};

// Professeur : met à jour un message (ex. changement de statut).
export const updateInquiry = async (inq: ContactInquiry): Promise<boolean> => {
  const { error } = await supabase.from('inquiries').update({ data: inq }).eq('id', inq.id);
  if (error) console.error(error);
  return !error;
};
