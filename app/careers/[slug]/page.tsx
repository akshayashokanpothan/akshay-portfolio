import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJobBySlug, getAllJobSlugs } from "@/lib/data/jobs";
import { JobDetailPage } from "@/components/careers/JobDetailPage";

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
  const job = getJobBySlug(slug);

  if (!job) {
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
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return <JobDetailPage slug={slug} />;
}
