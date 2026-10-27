import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllJobSlugs } from "@/lib/data/jobs";
import { getPublicJobBySlug } from "@/lib/supabase/jobs";
import { JobDetailPage } from "@/components/careers/JobDetailPage";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getAllJobSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);

  if (!job || job.status === "Draft") {
    return {
      title: "Position Not Found | Careers",
      description: "The requested job opening could not be found.",
    };
  }

  const roleDescriptor = job.specialization || job.team || job.domain || "Connection Jobs";
  const title = `${job.title} — ${roleDescriptor} | Careers`;
  const description =
    job.summary ||
    job.description ||
    `Explore the ${job.title} position at Connection Jobs. Review role responsibilities, requirements, and apply directly.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/careers/${job.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/careers/${job.slug}`,
      type: "website",
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const job = await getPublicJobBySlug(slug);

  if (!job || job.status === "Draft") {
    notFound();
  }

  return <JobDetailPage job={job} />;
}
