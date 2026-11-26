import Link from "next/link";

import { Button } from "@/components/ui/button";

/** 404 for any unknown URL. Renders inside the root layout (theme works), without the app shell. */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-5xl font-semibold text-muted-foreground tabular-nums">404</p>
      <div className="space-y-1">
        <h1 className="text-lg font-semibold">Page not found</h1>
        <p className="text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
      </div>
      <Button asChild>
        <Link href="/">Go to the dashboard</Link>
      </Button>
    </main>
  );
}
