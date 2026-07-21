import type { Metadata } from "next";
import { HomePage } from "@/components/home/HomePage";

export const metadata: Metadata = {
  title: "Akshay P — Product Designer",
  description:
    "Product Designer with 5+ years shaping AI-powered analytics platforms, data engineering tools, and enterprise SaaS — from research to shipped systems, at Dbiz AI Solutions.",
};

export default function Page() {
  return <HomePage />;
}
