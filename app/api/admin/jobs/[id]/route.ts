import { NextRequest, NextResponse } from "next/server";
import { verifyAdminRequest, getServiceRoleSupabaseClient, getServerSupabaseClient } from "@/lib/supabase/server";
import { mapJobToRow, mapRowToJob, DatabaseJobRow } from "@/lib/supabase/jobs";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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
      return NextResponse.json({ error: "Valid work mode is required." }, { status: 400 });
    }
    if (!body.closesAt || !/^\d{4}-\d{2}-\d{2}$/.test(body.closesAt.trim())) {
      return NextResponse.json({ error: "Valid closing date (YYYY-MM-DD) is required." }, { status: 400 });
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

    // Slug collision check with other jobs
    const normalizedSlug = body.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-");
    const { data: collision } = await client
      .from("jobs")
      .select("id")
      .eq("slug", normalizedSlug)
      .neq("id", id)
      .maybeSingle();

    if (collision) {
      return NextResponse.json({ error: "Another job is already using this slug." }, { status: 409 });
    }

    const rowToUpdate = mapJobToRow({
      ...body,
      slug: normalizedSlug,
    });

    const { data, error } = await client
      .from("jobs")
      .update({
        ...rowToUpdate,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const updatedJob = mapRowToJob(data as DatabaseJobRow);
    return NextResponse.json({ job: updatedJob });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to parse request";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
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
    const updatePayload: Record<string, string | number | null | undefined> = {
      updated_at: new Date().toISOString(),
    };

    if (body.status !== undefined) {
      if (!["Draft", "Published", "Closed"].includes(body.status)) {
        return NextResponse.json({ error: "Status must be Draft, Published, or Closed." }, { status: 400 });
      }
      updatePayload.status = body.status;
    }

    if (body.closesAt !== undefined) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(body.closesAt).trim())) {
        return NextResponse.json({ error: "Closing date must be in YYYY-MM-DD format." }, { status: 400 });
      }
      updatePayload.closes_at = String(body.closesAt).trim();
    }

    const { data, error } = await client
      .from("jobs")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const updatedJob = mapRowToJob(data as DatabaseJobRow);
    return NextResponse.json({ job: updatedJob });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const authHeader = request.headers.get("authorization");
  const verification = await verifyAdminRequest(authHeader);

  if (!verification.authorized) {
    return NextResponse.json({ error: verification.error || "Unauthorized" }, { status: 401 });
  }

  const client = getServiceRoleSupabaseClient() || getServerSupabaseClient();
  if (!client) {
    return NextResponse.json({ error: "Database client unavailable" }, { status: 503 });
  }

  const { error } = await client
    .from("jobs")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, deletedId: id });
}
