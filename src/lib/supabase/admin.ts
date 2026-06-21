import { createClient } from "@supabase/supabase-js";

// Server-ONLY Supabase client using the service-role key.
// Bypasses Row Level Security — never import this into client components.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}
