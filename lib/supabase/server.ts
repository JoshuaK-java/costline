import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import type { Database } from "@/lib/database.types";

/**
 * Supabase client for Server Components, Server Actions and Route Handlers. Reads the user's
 * session from the request cookies. Create a new one per request (never store it in a module
 * variable). Before trusting who the user is, verify with `auth.getClaims()` or `auth.getUser()`,
 * never `auth.getSession()` alone.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // Called from a Server Component, which can't set cookies. Safe to ignore: proxy.ts
            // refreshes the session on every request.
          }
        },
      },
    },
  );
}
