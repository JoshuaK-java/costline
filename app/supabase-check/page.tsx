import type { Metadata } from "next";
import { Suspense } from "react";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Supabase check",
  robots: { index: false, follow: false },
};

/**
 * Smoke test for the Supabase clients (CL-42): reaches the Supabase API and asks who is signed in.
 * Throwaway, like /styleguide; remove before launch.
 */
export default function SupabaseCheckPage() {
  return (
    <main className="mx-auto w-full max-w-md space-y-4 px-4 py-16">
      <h1 className="text-lg font-semibold">Supabase check</h1>
      <Suspense fallback={<p className="text-sm text-muted-foreground">Checking…</p>}>
        <Status />
      </Suspense>
    </main>
  );
}

async function Status() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  // 1. Is the Supabase API reachable with our publishable key?
  let reachable = false;
  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! },
      cache: "no-store",
    });
    reachable = res.ok;
  } catch {
    // stack not running or wrong URL
  }

  // 2. Who is signed in? getUser() verifies the session with Supabase Auth.
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
      <dt className="text-muted-foreground">Supabase URL</dt>
      <dd className="font-mono">{url}</dd>
      <dt className="text-muted-foreground">API reachable</dt>
      <dd className={reachable ? "text-primary" : "text-destructive"}>
        {reachable ? "Yes" : "No (is `npx supabase start` running?)"}
      </dd>
      <dt className="text-muted-foreground">User</dt>
      <dd>{data.user ? data.user.email : "Not signed in"}</dd>
    </dl>
  );
}
