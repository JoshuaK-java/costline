import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/database.types";

/**
 * Admin client with the SECRET key: it **bypasses RLS** and sees every space's data. Server only
 * (`server-only` makes the build fail if a Client Component imports this file). Use it only for
 * rare admin tasks that can't run as the user; everything else uses `lib/supabase/server.ts`.
 */
export const createAdminClient = () =>
  createClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
