import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://akshay-ap.dev"),
  title: {
    default: "Akshay P | Product Designer | 5+ YoE in B2B SaaS",
    template: "%s | Akshay P",
  },
  description:
    "Product Designer with 5+ years shaping AI-powered analytics platforms, data engineering tools, and enterprise SaaS from research to shipped systems.",
  openGraph: {
    title: "Akshay P | Product Designer | 5+ YoE in B2B SaaS",
    description:
      "Product Designer with 5+ years shaping AI-powered analytics platforms, data engineering tools, and enterprise SaaS.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
