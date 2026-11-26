import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import type { Database } from "@/lib/database.types";
import { env } from "@/lib/env";

/**
 * Refreshes the Supabase session on every request (called from `proxy.ts`). Server Components
 * can't write cookies, so this is where an expired access token is swapped for a new one and the
 * new cookies are sent back to the browser.
 *
 * Follows Supabase's "Server-Side Auth for Next.js" guide. No sign-in redirect yet: that comes
 * with the auth cards.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  // A new client per request; never keep it in a module variable.
  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers) {
          for (const { name, value } of cookiesToSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
          // Cache-Control / Expires / Pragma: stop a CDN from caching a response that carries
          // someone's session cookie.
          for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
        },
      },
    },
  );

  // IMPORTANT: no code between createServerClient and getClaims(). getClaims() verifies the
  // token and triggers the refresh; removing it makes users get signed out at random.
  await supabase.auth.getClaims();

  // IMPORTANT: return `response` as is. A different NextResponse would drop the refreshed
  // cookies and sign the user out.
  return response;
}
