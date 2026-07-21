import type { Metadata } from "next";
import { FactWeaversCaseStudy } from "@/components/case-study/FactWeaversCaseStudy";

export const metadata: Metadata = {
  title: "FactWeavers; Product Design Case Study",
  description:
    "A product design case study exploring the transformation of FactWeavers into an AI-assisted data-to-decision platform, covering metric creation, conversational analytics, dashboards, role-based experiences, and scalable design systems.",
  openGraph: {
    title: "FactWeavers; Product Design Case Study | Akshay P",
    description:
      "A product design case study exploring the transformation of FactWeavers into an AI-assisted data-to-decision platform, covering metric creation, conversational analytics, dashboards, role-based experiences, and scalable design systems.",
    type: "article",
  },
};

export default function Page() {
  return <FactWeaversCaseStudy />;
}
