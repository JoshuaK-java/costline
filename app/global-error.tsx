"use client"; // error boundaries must be client components

import { useEffect } from "react";

import "./globals.css";

/**
 * Last-resort screen when the root layout itself crashes. It replaces the whole document, so it
 * brings its own <html>/<body> and styles, and the theme class from next-themes isn't there:
 * apply the saved theme (or the device's) here. Sentry (CL-75) hooks in later.
 */
export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("theme");
    } catch {
      // storage blocked: fall back to the device setting
    }
    const dark =
      saved === "dark" ||
      (saved !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", dark);
  }, [error]);

  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col items-center justify-center gap-4 px-4 text-center">
        <title>Something went wrong · CostLine</title>
        <h1 className="text-lg font-semibold">Something went wrong</h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          CostLine hit an unexpected error. Your data is safe. Try again, or reload the page.
        </p>
        <button
          type="button"
          onClick={() => retry()}
          className="h-8 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
