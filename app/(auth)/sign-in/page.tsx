import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = { title: "Sign in" };

// Placeholder (CL-41). Google and Apple sign-in come in Sprint 02 (CL-50 – CL-55).
// Outside the (app) group, so it has no app shell.
export default function SignInPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-lg">Sign in to CostLine</CardTitle>
          <CardDescription>Sign-in isn&apos;t set up yet.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button variant="outline" disabled>
            Continue with Google
          </Button>
          <Button variant="outline" disabled>
            Continue with Apple
          </Button>
        </CardContent>
        <CardFooter>
          <Button variant="link" className="px-0" asChild>
            <Link href="/">Back to the app</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
