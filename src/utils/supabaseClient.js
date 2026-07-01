import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are placeholders or empty
const isValidSupabase = 
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') && 
  supabaseAnonKey !== 'your-supabase-public-anon-key' &&
  supabaseUrl.startsWith('https://');

export const supabase = isValidSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase) {
  console.warn("⚠️ Supabase credentials are missing or invalid. Running in LocalStorage fallback mode.");
} else {
  console.log("⚡ Supabase client initialized successfully. Connected to cloud database.");
}
