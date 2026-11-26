"use client"; // error boundaries must be client components

import { TriangleAlertIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Shown inside the shell when a screen crashes. Next 16 passes `retry` (re-fetch and re-render);
 * `error` is `unknown` because client code can throw anything.
 */
export default function AppError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    // Sentry (CL-75) will report this.
    console.error(error);
  }, [error]);

  const digest = error instanceof Error && "digest" in error ? String(error.digest) : null;

  return (
    <div
      role="alert"
      className="mx-auto flex max-w-md flex-col items-center gap-4 py-16 text-center"
    >
      <TriangleAlertIcon className="size-10 text-warning" aria-hidden />
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="text-sm text-muted-foreground">
          This screen couldn&apos;t load. Your data is safe. Try again, or go back to the dashboard.
        </p>
        {digest && <p className="font-mono text-xs text-muted-foreground">Error ID: {digest}</p>}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => retry()}>Try again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
