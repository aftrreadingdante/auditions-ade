import { createClient } from "@supabase/supabase-js";

// Identifiants PUBLICS du projet (sûrs dans le navigateur : l'accès réel est
// contrôlé par les règles de sécurité de la base).
// ⛔ Ne jamais mettre ici la clé "Secret" / service_role.

const SUPABASE_URL = "https://srxiemjsyczcvtryyywb.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_rvvxZvOJRmxJoe9BaseCKQ_FvyZKV6v";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
