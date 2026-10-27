import type { Metadata } from "next";
import { CareersPage } from "@/components/careers/CareersPage";
import { getPublicJobs } from "@/lib/supabase/jobs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Connection Jobs | Careers",
  description:
    "Opportunities to work with creative teams, build meaningful products, and grow your craft. Explore open roles and reach out with questions.",
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Connection Jobs | Careers | Akshay P",
    description:
      "Opportunities to work with creative teams, build meaningful products, and grow your craft.",
    url: "/careers",
    type: "website",
  },
};

export default async function Page() {
  const jobs = await getPublicJobs();
  return <CareersPage initialJobs={jobs} />;
}
