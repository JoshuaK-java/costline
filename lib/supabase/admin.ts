import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/database.types";
import { env, serverEnv } from "@/lib/env";

/**
 * Admin client with the SECRET key: it **bypasses RLS** and sees every space's data. Server only
 * (`server-only` makes the build fail if a Client Component imports this file). Use it only for
 * rare admin tasks that can't run as the user; everything else uses `lib/supabase/server.ts`.
 */
export const createAdminClient = () => {
  const { SUPABASE_SECRET_KEY } = serverEnv();
  if (!SUPABASE_SECRET_KEY) {
    throw new Error("SUPABASE_SECRET_KEY is not set; the admin client needs it (.env.local).");
  }
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
};
