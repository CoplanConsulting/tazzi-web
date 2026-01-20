import type { SupabaseClient } from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";

let _supabaseAdmin: SupabaseClient | null = null;

// Admin client with service role key - bypasses RLS
export function useSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const config = useRuntimeConfig();
    _supabaseAdmin = createClient(
      config.supabaseUrl,
      config.supabaseServiceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
  }
  return _supabaseAdmin;
}
