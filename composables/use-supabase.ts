import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

import { createClient } from "@supabase/supabase-js";

let _supabaseClient: SupabaseClient | null = null;

/**
 * Composable for accessing the Supabase client on the client-side
 */
export function useSupabase() {
  const config = useRuntimeConfig();

  if (!_supabaseClient) {
    _supabaseClient = createClient(
      config.public.supabaseUrl,
      config.public.supabaseKey,
    );
  }

  return _supabaseClient;
}

/**
 * Composable for accessing the current user session
 */
export function useSupabaseSession() {
  const supabase = useSupabase();
  const session = ref<Session | null>(null);
  const user = ref<User | null>(null);
  const loading = ref(true);

  // Initialize session
  const initSession = async () => {
    loading.value = true;
    const { data } = await supabase.auth.getSession();
    session.value = data.session;
    user.value = data.session?.user ?? null;
    loading.value = false;
  };

  // Listen for auth changes
  supabase.auth.onAuthStateChange((_event, newSession) => {
    session.value = newSession;
    user.value = newSession?.user ?? null;
  });

  // Initialize on mount
  if (import.meta.client) {
    initSession();
  }

  return {
    session: readonly(session),
    user: readonly(user),
    loading: readonly(loading),
    /**
     * Get the current access token for API requests
     */
    getAccessToken: async () => {
      const { data } = await supabase.auth.getSession();
      return data.session?.access_token ?? null;
    },
  };
}
