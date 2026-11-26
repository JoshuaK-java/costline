import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/lib/database.types";
import { env } from "@/lib/env";

/**
 * Supabase client for Client Components ("use client"). Uses the publishable key, so it acts as
 * the signed-in user (or anonymous) and RLS decides what it can see. The session lives in cookies,
 * shared with the server client.
 */
export const createClient = () =>
  createBrowserClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
