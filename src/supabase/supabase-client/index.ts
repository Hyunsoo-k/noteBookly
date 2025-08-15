import { createClient, SupabaseClient } from "@supabase/supabase-js";

const VITE_SUPABASE_PROJECT_URL = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseClient: SupabaseClient = createClient(
  VITE_SUPABASE_PROJECT_URL!,
  VITE_SUPABASE_ANON_KEY!
);

export default supabaseClient;