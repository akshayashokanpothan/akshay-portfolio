import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "./config";

/**
 * Returns a server-side Supabase client using the anonymous public key.
 * Used for public read-only server component queries.
 */
export function getServerSupabaseClient(): SupabaseClient | null {
  const { url, anonKey, isConfigured } = getSupabaseEnv();
  if (!isConfigured) {
    return null;
  }

  return createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Returns a server-side Supabase client using the service role key.
 * Used exclusively in protected server-side API routes for administrative operations.
 * NEVER exposed to client bundles.
 */
export function getServiceRoleSupabaseClient(): SupabaseClient | null {
  const { url, serviceRoleKey, isConfigured, hasServiceRole } = getSupabaseEnv();
  if (!isConfigured || !hasServiceRole) {
    return null;
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

/**
 * Verifies an incoming authorization bearer token and checks if the user is an authorized admin.
 */
export async function verifyAdminRequest(authHeader: string | null): Promise<{
  authorized: boolean;
  userId?: string;
  email?: string;
  error?: string;
}> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { authorized: false, error: "Missing or invalid authorization header" };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const { url, anonKey, serviceRoleKey, isConfigured } = getSupabaseEnv();

  if (!isConfigured) {
    return { authorized: false, error: "Supabase is not configured" };
  }

  // Use service role if available, otherwise anon client
  const client = serviceRoleKey
    ? createClient(url, serviceRoleKey, { auth: { persistSession: false } })
    : createClient(url, anonKey, { auth: { persistSession: false } });

  const { data: { user }, error: authError } = await client.auth.getUser(token);
  if (authError || !user) {
    return { authorized: false, error: authError?.message || "Invalid or expired session" };
  }

  // Check public.admin_users table to verify this user is an authorized admin
  const { data: adminRecord, error: adminError } = await client
    .from("admin_users")
    .select("id, email")
    .eq("id", user.id)
    .maybeSingle();

  if (adminError || !adminRecord) {
    // If admin_users table exists and user is not in it, reject
    return {
      authorized: false,
      error: "User is authenticated but not authorized as a Connection Jobs administrator.",
    };
  }

  return {
    authorized: true,
    userId: user.id,
    email: user.email,
  };
}
