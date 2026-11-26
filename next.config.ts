import type { NextConfig } from "next";

import { serverEnv } from "./lib/env";

// Validate env vars before anything builds: importing lib/env checks the public ones, and
// serverEnv() the server-only ones. A bad or missing value stops `next build` / `next dev` here.
serverEnv();

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
