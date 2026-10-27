import type { Job } from "@/lib/types/jobs";
import { JOBS, getJobBySlug } from "@/lib/data/jobs";
import { getServerSupabaseClient } from "./server";
import { DatabaseJobRow, mapRowToJob, mapJobToRow } from "./mappers";

export type { DatabaseJobRow };
export { mapRowToJob, mapJobToRow };

/**
 * Fetches all public, published jobs.
 * Falls back to confirmed in-memory JOBS if Supabase is unconfigured or unavailable.
 */
export async function getPublicJobs(): Promise<Job[]> {
  const client = getServerSupabaseClient();
  if (!client) {
    // Graceful fallback to static confirmed seed jobs
    return JOBS;
  }

  try {
    const { data, error } = await client
      .from("jobs")
      .select("*")
      .eq("status", "Published")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return JOBS;
    }

    return (data as DatabaseJobRow[]).map(mapRowToJob);
  } catch (err) {
    console.error("Error fetching jobs from Supabase, using fallback:", err);
    return JOBS;
  }
}

/**
 * Fetches a single public, published job by slug.
 * Falls back to confirmed in-memory JOBS if Supabase is unconfigured or unavailable.
 */
export async function getPublicJobBySlug(slug: string): Promise<Job | undefined> {
  const client = getServerSupabaseClient();
  if (!client) {
    return getJobBySlug(slug);
  }

  try {
    const { data, error } = await client
      .from("jobs")
      .select("*")
      .eq("slug", slug)
      .eq("status", "Published")
      .maybeSingle();

    if (error || !data) {
      return getJobBySlug(slug);
    }

    return mapRowToJob(data as DatabaseJobRow);
  } catch (err) {
    console.error("Error fetching job by slug from Supabase, using fallback:", err);
    return getJobBySlug(slug);
  }
}
