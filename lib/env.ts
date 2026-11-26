import { z } from "zod";

/**
 * Environment variables, checked once. A missing or malformed value stops `next build` /
 * `next dev` with a message naming the variable, instead of breaking later at runtime.
 *
 * Rule: every new variable goes into `.env.example` AND a schema below, in the same PR.
 */

/** Say "Missing" when a required variable isn't set; otherwise keep zod's own message. */
const required = {
  error: (issue: { input?: unknown }) =>
    issue.input === undefined ? "Missing: set it in .env.local (or Vercel)" : undefined,
};

/** Public values: inlined into the browser bundle, so never put a secret here. */
const client = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.url(required),
  // Loose on purpose: older Supabase CLIs give local keys without the `sb_publishable_` prefix.
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string(required).min(20),
  NEXT_PUBLIC_APP_URL: z.url().optional(),
});

/** Server-only values: never read these in a Client Component. */
const server = z.object({
  SUPABASE_SECRET_KEY: z.string().startsWith("sb_secret_").optional(),
});

function parse<T extends z.ZodType>(schema: T, values: Record<string, string | undefined>) {
  // Blank values (`NAME=` in .env files) count as "not set".
  const cleaned = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value === "" ? undefined : value]),
  );
  const result = schema.safeParse(cleaned);
  if (!result.success) {
    throw new Error(
      `Invalid environment variables (check .env.local, or Vercel's settings):\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}

/**
 * Public env, safe everywhere. Each `NEXT_PUBLIC_` variable is listed by name because Next.js only
 * inlines variables it can see written out in full.
 */
export const env = parse(client, {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
});

/** Server-only env. Call it only in server code (it reads the full `process.env`). */
export const serverEnv = () => parse(server, process.env);
