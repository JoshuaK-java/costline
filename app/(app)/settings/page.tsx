import type { Metadata } from "next";

import { PageHeader } from "@/components/shell/page-header";

export const metadata: Metadata = { title: "Settings" };

// Placeholder (CL-41).
export default function SettingsPage() {
  return (
    <PageHeader title="Settings" description="Account, project and app settings. Coming soon." />
  );
}
