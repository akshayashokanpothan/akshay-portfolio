import type { Metadata } from "next";
import { ConnectionJobsAdmin } from "@/components/careers/admin/ConnectionJobsAdmin";

export const metadata: Metadata = {
  title: "Connection Jobs Admin | Careers",
  description: "Secure administrator dashboard for managing Connection Jobs listings.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <ConnectionJobsAdmin />;
}
