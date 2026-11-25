import type { Metadata } from "next";

import { PageHeader } from "@/components/shell/page-header";

export const metadata: Metadata = { title: "Dashboard" };

// Placeholder (CL-41). The real dashboard comes in Sprint 09 (DSH-1 …).
export default function DashboardPage() {
  return <PageHeader title="Dashboard" description="Spending overview. Coming soon." />;
}
