"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Search,
  AlertCircle,
  Clock,
  Lock,
  LogOut,
  MapPin,
  Briefcase,
  Database,
  ExternalLink,
} from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { Job, WorkMode, EmploymentType } from "@/lib/types/jobs";
import { JOBS } from "@/lib/data/jobs";
import { getJobExpiryInfo } from "@/lib/jobs/expiry";
import { COLORS, fontBody, fontDisplay, fontMono } from "@/lib/tokens";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import { getSupabaseEnv } from "@/lib/supabase/config";

export function ConnectionJobsAdmin() {
  const [supabaseConfigured, setSupabaseConfigured] = useState(false);
  const [checkingConfig, setCheckingConfig] = useState(true);

  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [adminEmail, setAdminEmail] = useState<string>("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Demo / Preview mode if Supabase not configured
  const [previewMode, setPreviewMode] = useState(false);

  // Jobs state
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Published" | "Draft" | "Closed" | "Expired">("All");

  // Notification message
  const [notification, setNotification] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  // Form View state
  const [view, setView] = useState<"list" | "create" | "edit">("list");
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState<Partial<Job>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [savingJob, setSavingJob] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Job | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const loadJobsFromBackend = useCallback(async (accessToken?: string) => {
    setLoadingJobs(true);
    try {
      const token = accessToken || session?.access_token;
      if (!token) return;

      const res = await fetch("/api/admin/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to load jobs");
      }

      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load jobs";
      setNotification({ type: "error", message: msg });
    } finally {
      setLoadingJobs(false);
    }
  }, [session]);

  // Check Supabase configuration on mount
  useEffect(() => {
    const env = getSupabaseEnv();
    setSupabaseConfigured(env.isConfigured);
    setCheckingConfig(false);

    if (env.isConfigured) {
      const client = getBrowserSupabaseClient();
      if (client) {
        client.auth.getSession().then(({ data: { session } }) => {
          if (session) {
            setSession(session);
            setAdminEmail(session.user.email || "Admin");
            loadJobsFromBackend(session.access_token);
          }
        });

        const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
          setSession(session);
          if (session) {
            setAdminEmail(session.user.email || "Admin");
            loadJobsFromBackend(session.access_token);
          } else {
            setJobs([]);
          }
        });

        return () => subscription.unsubscribe();
      }
    } else {
      // In unconfigured state, load local default JOBS for preview if activated
      setJobs(JOBS);
    }
  }, [loadJobsFromBackend]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    try {
      const client = getBrowserSupabaseClient();
      if (!client) {
        throw new Error("Supabase client is not available.");
      }

      const { data, error } = await client.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        setSession(data.session);
        setAdminEmail(data.session.user.email || "Admin");
        loadJobsFromBackend(data.session.access_token);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to authenticate. Please check your credentials.";
      setAuthError(msg);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const client = getBrowserSupabaseClient();
    if (client) {
      await client.auth.signOut();
    }
    setSession(null);
    setAdminEmail("");
    setView("list");
    setPreviewMode(false);
  };

  // Open Create Form
  const openCreateForm = () => {
    setFormData({
      title: "",
      slug: "",
      specialization: "",
      domain: "",
      team: "",
      seniority: "",
      experienceMin: undefined,
      experienceMax: undefined,
      experienceLabel: "",
      location: "",
      workMode: "Remote",
      employmentType: "Full-time",
      closesAt: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      status: "Published",
      applicationUrl: "",
      clarificationUrl: "",
      contactEmail: "",
      summary: "",
      description: "",
      responsibilities: [],
      requirements: [],
      preferredQualifications: [],
      portfolioRequirements: [],
      whyJoin: [],
      applicationInstructions: "",
    });
    setFormErrors({});
    setView("create");
    setEditingJob(null);
  };

  // Open Edit Form
  const openEditForm = (job: Job) => {
    setEditingJob(job);
    setFormData({
      ...job,
    });
    setFormErrors({});
    setView("edit");
  };

  // Form Field Validation
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title || !formData.title.trim()) {
      errors.title = "Job title is required.";
    }

    if (!formData.slug || !formData.slug.trim()) {
      errors.slug = "Unique slug is required.";
    } else if (!/^[a-z0-9-]+$/.test(formData.slug.trim())) {
      errors.slug = "Slug must contain only lowercase letters, numbers, and hyphens.";
    }

    if (!formData.location || !formData.location.trim()) {
      errors.location = "Location is required.";
    }

    if (!formData.closesAt || !/^\d{4}-\d{2}-\d{2}$/.test(formData.closesAt.trim())) {
      errors.closesAt = "Valid closing date (YYYY-MM-DD) is required.";
    }

    if (
      typeof formData.experienceMin === "number" &&
      typeof formData.experienceMax === "number" &&
      formData.experienceMin > formData.experienceMax
    ) {
      errors.experience = "Minimum experience cannot exceed maximum experience.";
    }

    if (formData.status === "Published" || formData.status === "Open") {
      if (!formData.applicationUrl || !formData.applicationUrl.trim()) {
        errors.applicationUrl = "Application URL is required when a job is published.";
      } else if (
        !formData.applicationUrl.startsWith("https://") &&
        !formData.applicationUrl.startsWith("mailto:")
      ) {
        errors.applicationUrl = "Application URL must start with https:// or mailto:.";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save Job (Create or Update)
  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSavingJob(true);
    setNotification(null);

    try {
      if (previewMode) {
        // Mock update in local state for preview mode
        if (view === "create") {
          const newJob: Job = {
            ...(formData as Job),
            id: `job-${Date.now()}`,
          };
          setJobs([newJob, ...jobs]);
          setNotification({ type: "success", message: `Job "${newJob.title}" created successfully (Preview Mode).` });
        } else if (editingJob) {
          const updated = jobs.map((j) => (j.id === editingJob.id ? ({ ...j, ...formData } as Job) : j));
          setJobs(updated);
          setNotification({ type: "success", message: `Job "${formData.title}" updated successfully (Preview Mode).` });
        }
        setView("list");
        return;
      }

      const token = session?.access_token;
      if (!token) {
        throw new Error("Session expired. Please sign in again.");
      }

      if (view === "create") {
        const res = await fetch("/api/admin/jobs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to create job.");
        }

        const data = await res.json();
        setJobs([data.job, ...jobs]);
        setNotification({ type: "success", message: `Job "${data.job.title}" created and saved to database.` });
      } else if (editingJob) {
        const res = await fetch(`/api/admin/jobs/${editingJob.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Failed to update job.");
        }

        const data = await res.json();
        setJobs(jobs.map((j) => (j.id === editingJob.id ? data.job : j)));
        setNotification({ type: "success", message: `Job "${data.job.title}" updated and persisted.` });
      }

      setView("list");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to save job.";
      setNotification({ type: "error", message: msg });
    } finally {
      setSavingJob(false);
    }
  };

  // Toggle Publication Status (Publish / Unpublish)
  const handleTogglePublish = async (job: Job) => {
    const newStatus: "Draft" | "Published" =
      job.status === "Published" || job.status === "Open" ? "Draft" : "Published";

    if (newStatus === "Published" && (!job.applicationUrl || !job.applicationUrl.trim())) {
      setNotification({
        type: "error",
        message: `Cannot publish "${job.title}": Application URL is missing. Please edit the job first.`,
      });
      return;
    }

    try {
      if (previewMode) {
        setJobs(
          jobs.map((j) =>
            j.id === job.id ? { ...j, status: newStatus === "Published" ? "Open" : "Draft" } : j
          )
        );
        setNotification({
          type: "success",
          message: `Job "${job.title}" is now ${newStatus} (Preview Mode).`,
        });
        return;
      }

      const token = session?.access_token;
      if (!token) throw new Error("Authentication required.");

      const res = await fetch(`/api/admin/jobs/${job.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to change publication status.");
      }

      const data = await res.json();
      setJobs(jobs.map((j) => (j.id === job.id ? data.job : j)));
      setNotification({
        type: "success",
        message: `Job "${job.title}" status changed to ${newStatus}.`,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update status.";
      setNotification({ type: "error", message: msg });
    }
  };

  // Delete Job
  const handleDeleteJob = async () => {
    if (!deleteTarget) return;

    if (deleteConfirmationText.trim() !== deleteTarget.title.trim()) {
      setNotification({
        type: "error",
        message: "Confirmation text does not match the job title. Deletion aborted.",
      });
      return;
    }

    setDeleting(true);
    try {
      if (previewMode) {
        setJobs(jobs.filter((j) => j.id !== deleteTarget.id));
        setNotification({
          type: "success",
          message: `Job "${deleteTarget.title}" deleted (Preview Mode).`,
        });
        setDeleteTarget(null);
        setDeleteConfirmationText("");
        return;
      }

      const token = session?.access_token;
      if (!token) throw new Error("Authentication required.");

      const res = await fetch(`/api/admin/jobs/${deleteTarget.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete job.");
      }

      setJobs(jobs.filter((j) => j.id !== deleteTarget.id));
      setNotification({
        type: "success",
        message: `Job "${deleteTarget.title}" has been permanently deleted from database.`,
      });
      setDeleteTarget(null);
      setDeleteConfirmationText("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete job.";
      setNotification({ type: "error", message: msg });
    } finally {
      setDeleting(false);
    }
  };

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    const now = new Date();
    return jobs.filter((job) => {
      const expiry = getJobExpiryInfo(job, now);
      const isExpired = expiry.isExpired;
      const isDraft = job.status === "Draft";
      const isPublished = (job.status === "Published" || job.status === "Open") && !isExpired;
      const isClosed = job.status === "Closed";

      if (statusFilter === "Published" && !isPublished) return false;
      if (statusFilter === "Draft" && !isDraft) return false;
      if (statusFilter === "Closed" && !isClosed) return false;
      if (statusFilter === "Expired" && !isExpired) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = job.title.toLowerCase().includes(q);
        const matchSpecialization = job.specialization?.toLowerCase().includes(q);
        const matchLocation = job.location.toLowerCase().includes(q);
        const matchSlug = job.slug.toLowerCase().includes(q);
        return matchTitle || matchSpecialization || matchLocation || matchSlug;
      }

      return true;
    });
  }, [jobs, statusFilter, searchQuery]);

  // Status counts
  const counts = useMemo(() => {
    const now = new Date();
    let published = 0;
    let draft = 0;
    let expired = 0;
    let closed = 0;

    jobs.forEach((job) => {
      const exp = getJobExpiryInfo(job, now);
      if (exp.isExpired) {
        expired++;
      } else if (job.status === "Draft") {
        draft++;
      } else if (job.status === "Closed") {
        closed++;
      } else {
        published++;
      }
    });

    return { total: jobs.length, published, draft, expired, closed };
  }, [jobs]);

  if (checkingConfig) {
    return (
      <div style={{ background: COLORS.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: fontMono, fontSize: 14, color: COLORS.muted }}>Initializing Connection Jobs Admin...</p>
      </div>
    );
  }

  // View: Unconfigured Setup Prompt
  if (!supabaseConfigured && !previewMode) {
    return (
      <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", padding: "64px 0 100px" }}>
        <Container>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontMono, fontSize: 13, color: COLORS.muted, textDecoration: "none" }}>
                <ArrowLeft size={14} /> Back to careers
              </Link>
            </div>

            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "36px 40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: COLORS.surface, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.accent }}>
                  <Database size={22} />
                </div>
                <div>
                  <h1 style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 500, margin: 0 }}>
                    Connection Jobs Admin
                  </h1>
                  <p style={{ fontFamily: fontBody, fontSize: 13.5, color: COLORS.muted, margin: 0 }}>
                    Supabase Configuration Required
                  </p>
                </div>
              </div>

              <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderStrong}`, borderRadius: 10, padding: "18px 20px", marginBottom: 28 }}>
                <p style={{ fontFamily: fontBody, fontSize: 14, lineHeight: 1.6, color: COLORS.inkSoft, margin: "0 0 12px" }}>
                  The administrative CRUD backend uses <strong>Supabase</strong> for persistent job storage, Row Level Security, and administrator authentication. To connect the database, add the following variables to your local <code>.env.local</code> file:
                </p>
                <pre style={{ background: COLORS.ink, color: "#E0E0E0", padding: "14px 16px", borderRadius: 8, fontSize: 12.5, fontFamily: fontMono, overflowX: "auto", margin: 0 }}>
{`NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key`}
                </pre>
              </div>

              <div style={{ marginBottom: 32 }}>
                <h2 style={{ fontFamily: fontDisplay, fontSize: 16, fontWeight: 500, margin: "0 0 10px" }}>Setup Files Included</h2>
                <ul style={{ margin: 0, paddingLeft: 20, fontFamily: fontBody, fontSize: 13.5, color: COLORS.inkSoft, display: "flex", flexDirection: "column", gap: 6 }}>
                  <li><code>supabase/schema.sql</code> — Complete schema, RLS policies, and admin authorization function.</li>
                  <li><code>supabase/seed.sql</code> — Pre-configured seed data containing all four existing approved roles.</li>
                  <li><code>docs/SUPABASE_ADMIN_SETUP.md</code> — Detailed step-by-step setup guide.</li>
                </ul>
              </div>

              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", borderTop: `1px solid ${COLORS.border}`, paddingTop: 24 }}>
                <Button variant="accent" onClick={() => setPreviewMode(true)} icon={Eye}>
                  Explore Admin Panel (Preview Mode)
                </Button>
                <Button variant="secondary" href="/careers" icon={ArrowLeft}>
                  Return to Public Careers
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // View: Unauthenticated Login Form
  if (!session && !previewMode) {
    return (
      <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", padding: "64px 0 100px", display: "flex", alignItems: "center" }}>
        <Container>
          <div style={{ maxWidth: 440, margin: "0 auto" }}>
            <div style={{ marginBottom: 24, textAlign: "center" }}>
              <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontMono, fontSize: 13, color: COLORS.muted, textDecoration: "none" }}>
                <ArrowLeft size={14} /> Back to public careers
              </Link>
            </div>

            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "36px 36px" }}>
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: COLORS.surface, display: "inline-flex", alignItems: "center", justifyContent: "center", color: COLORS.accent, marginBottom: 14 }}>
                  <Lock size={20} />
                </div>
                <h1 style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 500, color: COLORS.ink, margin: "0 0 8px" }}>
                  Admin Sign In
                </h1>
                <p style={{ fontFamily: fontBody, fontSize: 13.5, color: COLORS.muted, margin: 0 }}>
                  Enter your administrator credentials to access Connection Jobs.
                </p>
              </div>

              {authError && (
                <div style={{ background: "#FDF2F2", border: "1px solid #F8B4B4", borderRadius: 8, padding: "12px 14px", marginBottom: 20, display: "flex", gap: 8, alignItems: "flex-start" }} role="alert">
                  <AlertCircle size={16} color="#C0392B" style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontFamily: fontBody, fontSize: 13, color: "#9B1C1C", margin: 0 }}>{authError}</p>
                </div>
              )}

              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label htmlFor="login-email" style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                    Email Address
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14, color: COLORS.ink, outline: "none" }}
                    placeholder="admin@akshayashokanpothan.com"
                  />
                </div>

                <div>
                  <label htmlFor="login-password" style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                    Password
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14, color: COLORS.ink, outline: "none" }}
                    placeholder="••••••••••••"
                  />
                </div>

                <div style={{ marginTop: 8 }}>
                  <button
                    type="submit"
                    disabled={authLoading}
                    style={{ width: "100%", padding: "12px 20px", borderRadius: 8, background: COLORS.ink, color: COLORS.bg, border: "none", fontFamily: fontBody, fontWeight: 500, fontSize: 14, cursor: authLoading ? "default" : "pointer", opacity: authLoading ? 0.7 : 1, transition: "background 0.2s ease" }}
                  >
                    {authLoading ? "Authenticating..." : "Sign In to Admin"}
                  </button>
                </div>
              </form>

              <div style={{ marginTop: 24, textAlign: "center", borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
                <p style={{ fontFamily: fontMono, fontSize: 11.5, color: COLORS.muted, margin: 0 }}>
                  Public sign-up is disabled. Accounts must be provisioned by a system administrator.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // View: Create / Edit Form
  if (view === "create" || view === "edit") {
    return (
      <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", padding: "40px 0 100px" }}>
        <Container>
          <div style={{ maxWidth: 840, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <button
                onClick={() => setView("list")}
                style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: fontMono, fontSize: 13, color: COLORS.muted }}
              >
                <ArrowLeft size={14} /> Back to dashboard
              </button>
            </div>

            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: "36px 40px" }}>
              <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: `1px solid ${COLORS.border}` }}>
                <h1 style={{ fontFamily: fontDisplay, fontSize: 26, fontWeight: 500, color: COLORS.ink, margin: "0 0 6px" }}>
                  {view === "create" ? "Create New Job Opening" : `Edit: ${editingJob?.title}`}
                </h1>
                <p style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.muted, margin: 0 }}>
                  Fill in the role details below. Changes will immediately reflect according to the publication status.
                </p>
              </div>

              <form onSubmit={handleSaveJob} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {/* 1. Core Information */}
                <div>
                  <h2 style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 500, color: COLORS.ink, margin: "0 0 16px" }}>
                    1. Core Information
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Job Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title || ""}
                        onChange={(e) => {
                          const title = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            title,
                            slug: view === "create" && (!prev.slug || prev.slug === "")
                              ? title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
                              : prev.slug,
                          }));
                        }}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${formErrors.title ? "#E02424" : COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. Product Designer"
                      />
                      {formErrors.title && <span style={{ fontFamily: fontMono, fontSize: 11.5, color: "#C0392B" }}>{formErrors.title}</span>}
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        URL Slug *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug || ""}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${formErrors.slug ? "#E02424" : COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontMono, fontSize: 13.5 }}
                        placeholder="e.g. product-designer-ux"
                      />
                      {formErrors.slug && <span style={{ fontFamily: fontMono, fontSize: 11.5, color: "#C0392B" }}>{formErrors.slug}</span>}
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Specialization (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.specialization || ""}
                        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. UX-first designer"
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Team / Function (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.team || ""}
                        onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. Marketing & Experience Design"
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Domain / Industry (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.domain || ""}
                        onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. FinTech B2B"
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Seniority (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.seniority || ""}
                        onChange={(e) => setFormData({ ...formData, seniority: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. Entry level"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Location & Terms */}
                <div>
                  <h2 style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 500, color: COLORS.ink, margin: "0 0 16px" }}>
                    2. Location & Work Terms
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location || ""}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${formErrors.location ? "#E02424" : COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. Bangalore"
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Work Mode *
                      </label>
                      <select
                        value={formData.workMode || "Remote"}
                        onChange={(e) => setFormData({ ...formData, workMode: e.target.value as WorkMode })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                      >
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Employment Type
                      </label>
                      <select
                        value={formData.employmentType || "Full-time"}
                        onChange={(e) => setFormData({ ...formData, employmentType: (e.target.value || null) as EmploymentType })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                      >
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 16 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Min Experience (Years)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={formData.experienceMin ?? ""}
                        onChange={(e) => setFormData({ ...formData, experienceMin: e.target.value ? parseFloat(e.target.value) : undefined })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. 2"
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Max Experience (Years)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.5"
                        value={formData.experienceMax ?? ""}
                        onChange={(e) => setFormData({ ...formData, experienceMax: e.target.value ? parseFloat(e.target.value) : undefined })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. 3"
                      />
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Custom Experience Label
                      </label>
                      <input
                        type="text"
                        value={formData.experienceLabel || ""}
                        onChange={(e) => setFormData({ ...formData, experienceLabel: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="e.g. 2–3 years or Freshers"
                      />
                    </div>
                  </div>
                  {formErrors.experience && <span style={{ display: "block", marginTop: 6, fontFamily: fontMono, fontSize: 11.5, color: "#C0392B" }}>{formErrors.experience}</span>}
                </div>

                {/* 3. Publication & Closing Date */}
                <div>
                  <h2 style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 500, color: COLORS.ink, margin: "0 0 16px" }}>
                    3. Publication & Application Deadline
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Publication Status *
                      </label>
                      <select
                        value={formData.status === "Open" ? "Published" : (formData.status || "Draft")}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as "Draft" | "Published" | "Closed" })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                      >
                        <option value="Published">Published (Publicly open)</option>
                        <option value="Draft">Draft (Internal only)</option>
                        <option value="Closed">Closed (Archived)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Closing Date (Asia/Kolkata) *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.closesAt || ""}
                        onChange={(e) => setFormData({ ...formData, closesAt: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${formErrors.closesAt ? "#E02424" : COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                      />
                      {formErrors.closesAt && <span style={{ fontFamily: fontMono, fontSize: 11.5, color: "#C0392B" }}>{formErrors.closesAt}</span>}
                    </div>
                  </div>
                </div>

                {/* 4. Application Links */}
                <div>
                  <h2 style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 500, color: COLORS.ink, margin: "0 0 16px" }}>
                    4. Application & Contact Destination
                  </h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Application Form URL (e.g. Tally link) *
                      </label>
                      <input
                        type="text"
                        value={formData.applicationUrl || ""}
                        onChange={(e) => setFormData({ ...formData, applicationUrl: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${formErrors.applicationUrl ? "#E02424" : COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontMono, fontSize: 13 }}
                        placeholder="https://tally.so/r/..."
                      />
                      {formErrors.applicationUrl && <span style={{ fontFamily: fontMono, fontSize: 11.5, color: "#C0392B" }}>{formErrors.applicationUrl}</span>}
                    </div>

                    <div>
                      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                        Contact / Hiring Email (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.contactEmail || ""}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14 }}
                        placeholder="akshayashokan248@gmail.com"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Job Description & Content */}
                <div>
                  <h2 style={{ fontFamily: fontDisplay, fontSize: 17, fontWeight: 500, color: COLORS.ink, margin: "0 0 16px" }}>
                    5. Job Description & Requirements
                  </h2>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                      Short Summary (Card preview)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.summary || ""}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14, resize: "vertical" }}
                      placeholder="Concise overview displayed on the listing card and job header..."
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                      About the Role (Full overview)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14, resize: "vertical" }}
                      placeholder="Detailed background, mission, and team context..."
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 4 }}>
                      Requirements / What We&apos;re Looking For (One per line)
                    </label>
                    <span style={{ display: "block", fontFamily: fontMono, fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>
                      Enter each qualification or skill on a new line.
                    </span>
                    <textarea
                      rows={5}
                      value={Array.isArray(formData.requirements) ? formData.requirements.join("\n") : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                        })
                      }
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14, resize: "vertical" }}
                      placeholder="2–3 years of experience in product design...&#10;Strong foundations in user research and interaction craft...&#10;Figma expertise with auto-layout and tokens..."
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 4 }}>
                      A Strong Plus / Preferred Qualifications (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={Array.isArray(formData.preferredQualifications) ? formData.preferredQualifications.join("\n") : ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredQualifications: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                        })
                      }
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14, resize: "vertical" }}
                      placeholder="Experience with AI-first workflows...&#10;FinTech or B2B SaaS background..."
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: COLORS.inkSoft, marginBottom: 6 }}>
                      Application Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.applicationInstructions || ""}
                      onChange={(e) => setFormData({ ...formData, applicationInstructions: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1px solid ${COLORS.borderStrong}`, background: COLORS.bg, fontFamily: fontBody, fontSize: 14, resize: "vertical" }}
                      placeholder="Share your portfolio, relevant case studies, and examples of work..."
                    />
                  </div>
                </div>

                {/* Form Action Buttons */}
                <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", borderTop: `1px solid ${COLORS.border}`, paddingTop: 20 }}>
                  <Button variant="secondary" onClick={() => setView("list")}>
                    Cancel
                  </Button>
                  <button
                    type="submit"
                    disabled={savingJob}
                    style={{
                      padding: "12px 24px",
                      borderRadius: 8,
                      background: COLORS.ink,
                      color: COLORS.bg,
                      border: "none",
                      fontFamily: fontBody,
                      fontWeight: 500,
                      fontSize: 14,
                      cursor: savingJob ? "default" : "pointer",
                      opacity: savingJob ? 0.7 : 1,
                    }}
                  >
                    {savingJob ? "Saving..." : view === "create" ? "Create & Save Job" : "Update Job Record"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // View: Main Jobs List / Dashboard
  return (
    <div style={{ background: COLORS.bg, color: COLORS.ink, minHeight: "100vh", padding: "40px 0 100px" }}>
      <Container>
        {/* Admin Header */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <h1 style={{ fontFamily: fontDisplay, fontSize: 28, fontWeight: 500, color: COLORS.ink, margin: 0 }}>
                Connection Jobs Admin
              </h1>
              {previewMode && (
                <span style={{ fontFamily: fontMono, fontSize: 11, background: "#FEF08A", color: "#854D0E", padding: "3px 8px", borderRadius: 4, fontWeight: 500 }}>
                  Preview Mode
                </span>
              )}
            </div>
            <p style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.muted, margin: 0 }}>
              Logged in as <span style={{ fontFamily: fontMono, color: COLORS.inkSoft }}>{adminEmail || "Admin User"}</span>
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Button variant="secondary" href="/careers" icon={ExternalLink}>
              View Public Careers
            </Button>
            <Button variant="primary" onClick={openCreateForm} icon={Plus}>
              Create Job
            </Button>
            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "10px 16px",
                borderRadius: 8,
                background: "transparent",
                border: `1px solid ${COLORS.borderStrong}`,
                color: COLORS.muted,
                fontFamily: fontBody,
                fontSize: 13.5,
                cursor: "pointer",
              }}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </header>

        {/* Notification Banner */}
        {notification && (
          <div
            style={{
              padding: "12px 18px",
              borderRadius: 8,
              marginBottom: 24,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background:
                notification.type === "success" ? "#DEF7EC" : notification.type === "error" ? "#FDE8E8" : "#E1EFFE",
              color:
                notification.type === "success" ? "#03543F" : notification.type === "error" ? "#9B1C1C" : "#1E429F",
              border: `1px solid ${
                notification.type === "success" ? "#BCF0DA" : notification.type === "error" ? "#FBD5D5" : "#B3D7FF"
              }`,
            }}
          >
            <span style={{ fontFamily: fontBody, fontSize: 13.5 }}>{notification.message}</span>
            <button
              onClick={() => setNotification(null)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontWeight: "bold" }}
            >
              ×
            </button>
          </div>
        )}

        {/* Stats Strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 28 }}>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 20px" }}>
            <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.muted, textTransform: "uppercase" }}>Total Listings</span>
            <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 500, color: COLORS.ink, marginTop: 4 }}>{counts.total}</div>
          </div>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 20px" }}>
            <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.accent, textTransform: "uppercase" }}>Published & Open</span>
            <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 500, color: COLORS.accent, marginTop: 4 }}>{counts.published}</div>
          </div>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 20px" }}>
            <span style={{ fontFamily: fontMono, fontSize: 12, color: COLORS.muted, textTransform: "uppercase" }}>Drafts</span>
            <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 500, color: COLORS.inkSoft, marginTop: 4 }}>{counts.draft}</div>
          </div>
          <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: "18px 20px" }}>
            <span style={{ fontFamily: fontMono, fontSize: 12, color: "#C0392B", textTransform: "uppercase" }}>Expired</span>
            <div style={{ fontFamily: fontDisplay, fontSize: 24, fontWeight: 500, color: "#C0392B", marginTop: 4 }}>{counts.expired}</div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flex: "1 1 240px", background: COLORS.surface, border: `1px solid ${COLORS.borderStrong}`, borderRadius: 8, padding: "8px 12px" }}>
            <Search size={15} color={COLORS.muted} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, team, location, or slug..."
              style={{ border: "none", background: "transparent", outline: "none", width: "100%", fontFamily: fontBody, fontSize: 13.5, color: COLORS.ink }}
            />
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(["All", "Published", "Draft", "Closed", "Expired"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 6,
                  border: `1px solid ${statusFilter === filter ? COLORS.ink : COLORS.border}`,
                  background: statusFilter === filter ? COLORS.ink : COLORS.surface,
                  color: statusFilter === filter ? COLORS.bg : COLORS.inkSoft,
                  fontFamily: fontMono,
                  fontSize: 12,
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Jobs List */}
        {loadingJobs ? (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontFamily: fontMono, fontSize: 14, color: COLORS.muted }}>Loading job records from database...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div style={{ background: COLORS.white, border: `1px dashed ${COLORS.borderStrong}`, borderRadius: 14, padding: "60px 24px", textAlign: "center" }}>
            <h3 style={{ fontFamily: fontDisplay, fontSize: 18, color: COLORS.ink, margin: "0 0 8px" }}>No matching jobs found</h3>
            <p style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.muted, margin: "0 0 20px" }}>
              {searchQuery ? "Try clearing your search query or filter." : "Create your first job listing to get started."}
            </p>
            {searchQuery ? (
              <Button variant="secondary" onClick={() => setSearchQuery("")}>Clear Search</Button>
            ) : (
              <Button variant="primary" onClick={openCreateForm} icon={Plus}>Create Job</Button>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {filteredJobs.map((job) => {
              const now = new Date();
              const expiry = getJobExpiryInfo(job, now);
              const isExpired = expiry.isExpired;
              const isPublished = (job.status === "Published" || job.status === "Open") && !isExpired;
              const isDraft = job.status === "Draft";

              return (
                <div
                  key={job.id}
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ flex: "1 1 320px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                      <h3 style={{ fontFamily: fontDisplay, fontSize: 18, fontWeight: 500, color: COLORS.ink, margin: 0 }}>
                        {job.title}
                      </h3>

                      {job.specialization && (
                        <span style={{ fontFamily: fontMono, fontSize: 11, background: COLORS.accentSoft, color: COLORS.accent, border: `1px solid ${COLORS.accent}`, padding: "2px 7px", borderRadius: 4 }}>
                          {job.specialization}
                        </span>
                      )}

                      {/* Status Badge */}
                      {isExpired ? (
                        <span style={{ fontFamily: fontMono, fontSize: 11, background: "#FDE8E8", color: "#9B1C1C", border: "1px solid #FBD5D5", padding: "2px 7px", borderRadius: 4 }}>
                          Expired
                        </span>
                      ) : isDraft ? (
                        <span style={{ fontFamily: fontMono, fontSize: 11, background: COLORS.surface, color: COLORS.muted, border: `1px solid ${COLORS.border}`, padding: "2px 7px", borderRadius: 4 }}>
                          Draft
                        </span>
                      ) : isPublished ? (
                        <span style={{ fontFamily: fontMono, fontSize: 11, background: COLORS.accentSoft, color: COLORS.accent, padding: "2px 7px", borderRadius: 4, fontWeight: 500 }}>
                          Published
                        </span>
                      ) : (
                        <span style={{ fontFamily: fontMono, fontSize: 11, background: COLORS.surface, color: COLORS.inkSoft, padding: "2px 7px", borderRadius: 4 }}>
                          Closed
                        </span>
                      )}
                    </div>

                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontFamily: fontBody, fontSize: 13, color: COLORS.muted }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <MapPin size={13} /> {job.location} ({job.workMode})
                      </span>
                      {job.employmentType && (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                          <Briefcase size={13} /> {job.employmentType}
                        </span>
                      )}
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <Clock size={13} /> Closes: {job.closesAt} ({expiry.label})
                      </span>
                      <span style={{ fontFamily: fontMono, fontSize: 11.5, color: COLORS.inkSoft }}>
                        slug: /{job.slug}
                      </span>
                    </div>
                  </div>

                  {/* Row Actions */}
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    {/* View public link */}
                    <Link
                      href={`/careers/${job.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View public detail page"
                      style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: `1px solid ${COLORS.borderStrong}`,
                        color: COLORS.inkSoft,
                        textDecoration: "none",
                        fontFamily: fontBody,
                        fontSize: 13,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <ExternalLink size={13} /> Preview
                    </Link>

                    {/* Publish / Unpublish Toggle */}
                    <button
                      onClick={() => handleTogglePublish(job)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: `1px solid ${COLORS.borderStrong}`,
                        background: COLORS.white,
                        color: isPublished ? COLORS.muted : COLORS.accent,
                        fontFamily: fontBody,
                        fontSize: 13,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      {isPublished ? <EyeOff size={13} /> : <Eye size={13} />}
                      {isPublished ? "Unpublish" : "Publish"}
                    </button>

                    {/* Edit button */}
                    <button
                      onClick={() => openEditForm(job)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: `1px solid ${COLORS.borderStrong}`,
                        background: COLORS.white,
                        color: COLORS.ink,
                        fontFamily: fontBody,
                        fontSize: 13,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Edit2 size={13} /> Edit
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        setDeleteTarget(job);
                        setDeleteConfirmationText("");
                      }}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: "1px solid #FBD5D5",
                        background: "#FFF8F8",
                        color: "#C0392B",
                        fontFamily: fontBody,
                        fontSize: 13,
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(20, 24, 28, 0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              padding: 20,
            }}
          >
            <div style={{ background: COLORS.white, borderRadius: 16, padding: "32px 36px", maxWidth: 480, width: "100%", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
              <h3 style={{ fontFamily: fontDisplay, fontSize: 20, fontWeight: 500, color: "#C0392B", margin: "0 0 12px" }}>
                Confirm Permanent Deletion
              </h3>
              <p style={{ fontFamily: fontBody, fontSize: 14, color: COLORS.inkSoft, lineHeight: 1.6, margin: "0 0 16px" }}>
                You are about to delete <strong>{deleteTarget.title}</strong> (slug: <code>{deleteTarget.slug}</code>). This action cannot be undone.
              </p>
              <p style={{ fontFamily: fontBody, fontSize: 13.5, color: COLORS.muted, margin: "0 0 8px" }}>
                Please type the exact job title <strong style={{ color: COLORS.ink }}>{deleteTarget.title}</strong> below to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmationText}
                onChange={(e) => setDeleteConfirmationText(e.target.value)}
                placeholder={deleteTarget.title}
                style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid #E02424", background: COLORS.bg, fontFamily: fontBody, fontSize: 14, marginBottom: 20 }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
                  Cancel
                </Button>
                <button
                  onClick={handleDeleteJob}
                  disabled={deleting || deleteConfirmationText.trim() !== deleteTarget.title.trim()}
                  style={{
                    padding: "10px 18px",
                    borderRadius: 8,
                    background: "#C0392B",
                    color: "#FFF",
                    border: "none",
                    fontFamily: fontBody,
                    fontWeight: 500,
                    fontSize: 14,
                    cursor: deleting || deleteConfirmationText.trim() !== deleteTarget.title.trim() ? "not-allowed" : "pointer",
                    opacity: deleting || deleteConfirmationText.trim() !== deleteTarget.title.trim() ? 0.5 : 1,
                  }}
                >
                  {deleting ? "Deleting..." : "Permanently Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
