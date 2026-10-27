import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, getServiceRoleSupabaseClient, getServerSupabaseClient } from "@/lib/supabase/server";
import { mapJobToRow, mapRowToJob, DatabaseJobRow } from "@/lib/supabase/jobs";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const verification = await verifyAdminRequest(authHeader);

  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error || "Unauthorized" }, { status: 401 });
  }

  const client = getServiceRoleSupabaseClient() || getServerSupabaseClient();
  if (!client) {
    return NextResponse.json({ error: "Database client unavailable" }, { status: 503 });
  }

  const { data, error } = await client
    .from("jobs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const jobs = (data as DatabaseJobRow[]).map(mapRowToJob);
  return NextResponse.json({ jobs, user: verification.email });
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const verification = await verifyAdminRequest(authHeader);

  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error || "Unauthorized" }, { status: 401 });
  }

  const client = getServiceRoleSupabaseClient() || getServerSupabaseClient();
  if (!client) {
    return NextResponse.json({ error: "Database client unavailable" }, { status: 503 });
  }

  try {
    const body = await request.json();

    // Validation
    if (!body.title || !body.title.trim()) {
      return NextResponse.json({ error: "Job title is required." }, { status: 400 });
    }
    if (!body.slug || !body.slug.trim()) {
      return NextResponse.json({ error: "Unique slug is required." }, { status: 400 });
    }
    if (!body.location || !body.location.trim()) {
      return NextResponse.json({ error: "Location is required." }, { status: 400 });
    }
    if (!body.workMode || !["On-site", "Hybrid", "Remote"].includes(body.workMode)) {
      return NextResponse.json({ error: "Valid work mode (On-site, Hybrid, Remote) is required." }, { status: 400 });
    }
    if (!body.closesAt || !/^\d{4}-\d{2}-\d{2}$/.test(body.closesAt.trim())) {
      return NextResponse.json({ error: "Valid closing date in YYYY-MM-DD format is required." }, { status: 400 });
    }

    if (
      typeof body.experienceMin === "number" &&
      typeof body.experienceMax === "number" &&
      body.experienceMin > body.experienceMax
    ) {
      return NextResponse.json(
        { error: "Minimum experience cannot exceed maximum experience." },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const normalizedSlug = body.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const { data: existingJob } = await client
      .from("jobs")
      .select("id")
      .eq("slug", normalizedSlug)
      .maybeSingle();

    if (existingJob) {
      return NextResponse.json({ error: "A job with this slug already exists." }, { status: 409 });
    }

    const rowToInsert = mapJobToRow({
      ...body,
      slug: normalizedSlug,
    });

    const { data, error } = await client
      .from("jobs")
      .insert(rowToInsert)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const createdJob = mapRowToJob(data as DatabaseJobRow);
    return NextResponse.json({ job: createdJob }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to parse request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
