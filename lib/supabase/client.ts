import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./config";

let browserClient: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client for browser components.
 * Returns null if Supabase environment variables are not configured.
 */
export function getBrowserSupabaseClient(): SupabaseClient | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (browserClient) {
    return browserClient;
  }

  const { url, anonKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    return null;
  }

  browserClient = createClient(url, anonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}
