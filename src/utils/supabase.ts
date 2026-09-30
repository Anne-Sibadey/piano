import { createClient } from '@supabase/supabase-js';

// Adresse et clé PUBLIQUE (publishable) : conçues pour figurer dans le code d'un site.
// La protection des données repose sur les règles de sécurité (RLS) définies dans Supabase.
export const supabase = createClient(
  'https://roxtodshwfuepmwbverv.supabase.co',
  'sb_publishable_F1Bf8QPxXniHHYZ55srrpQ_0uJLJg2s'
);
