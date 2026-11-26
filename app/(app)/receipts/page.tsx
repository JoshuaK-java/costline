import type { Metadata } from "next";

import { PageHeader } from "@/components/shell/page-header";

export const metadata: Metadata = { title: "Receipts" };

// Placeholder (CL-41). The receipts list comes in Sprint 07 (LST-1 …).
export default function ReceiptsPage() {
  return (
    <PageHeader title="All receipts" description="Every receipt in this project. Coming soon." />
  );
}
