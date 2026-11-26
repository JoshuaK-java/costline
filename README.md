This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Local Supabase

Needs Docker Desktop running. Commands (run in the repo folder):

```bash
npx supabase start     # start
npx supabase stop      # stop (keeps data)
npx supabase status    # show URLs/keys again
npx supabase db reset  # wipe + re-run migrations + seed
```

`npx supabase db reset` = fresh local DB with sample data (from `supabase/seed.sql`; made-up data only).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. `.env.local` is git-ignored; never commit it.

Rules:

- `NEXT_PUBLIC_…` variables are **visible in the browser**. Only put non-secret values there.
- Everything else is **server-only**.
- Real values live in: `.env.local` (your PC), Vercel (CL-59), GitHub Actions secrets (CL-60), and the vault (CL-58).
- When you add a new variable, add it to `.env.example`, the env validation (CL-61), Vercel and the vault, **all in the same PR**.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Contributing

Before creating a branch, committing, or opening a pull request, read the project's conventions in [CONTRIBUTING.md](CONTRIBUTING.md).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
