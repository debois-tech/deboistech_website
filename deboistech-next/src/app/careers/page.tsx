import type { Metadata } from "next";
import { Careers } from "@/components/ui/careers";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Open roles at deboistech. We're a small, focused team building products that matter — join us if you love ownership, learning, and impact.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — deboistech",
    description: "Open roles at deboistech. Ownership, learning, and impact.",
    url: "/careers",
  },
};

export default function CareersPage() {
  return <Careers />;
}
