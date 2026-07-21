import type { Metadata } from "next";
import { AsteraDocsCaseStudy } from "@/components/case-study/asteradocs/AsteraDocsCaseStudy";

export const metadata: Metadata = {
  title: "AsteraDocs; Enterprise DMS Product Design Case Study | Akshay P",
  description:
    "A product design case study exploring AsteraDocs, an enterprise document management system designed around document organization, approval workflows, version control, role-based permissions, administration, and scalable enterprise UX.",
};

export default function Page() {
  return <AsteraDocsCaseStudy />;
}
