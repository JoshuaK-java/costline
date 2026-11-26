import type { Metadata } from "next";

import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DialogDemo, ToastDemo } from "./demos";

// Throwaway page to check the UI foundation (CL-40) at a glance in both themes. Remove before launch.
// All data on this page is made up.

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const PHASES = [
  { key: "land", name: "Land & financing", className: "bg-phase-land" },
  { key: "permits", name: "Permits & engineering", className: "bg-phase-permits" },
  { key: "site", name: "Site & utilities", className: "bg-phase-site" },
  { key: "shell", name: "Structure & shell", className: "bg-phase-shell" },
  { key: "systems", name: "HVAC, electrical & plumbing", className: "bg-phase-systems" },
  { key: "interior", name: "Interior finishes", className: "bg-phase-interior" },
  { key: "fixtures", name: "Fixtures & appliances", className: "bg-phase-fixtures" },
  { key: "misc", name: "Misc & running costs", className: "bg-phase-misc" },
];

const TOKENS = [
  { name: "background", className: "bg-background" },
  { name: "card", className: "bg-card" },
  { name: "primary", className: "bg-primary" },
  { name: "secondary", className: "bg-secondary" },
  { name: "muted / accent", className: "bg-muted" },
  { name: "selected", className: "bg-selected" },
  { name: "border", className: "bg-border" },
  { name: "destructive", className: "bg-destructive" },
  { name: "warning", className: "bg-warning" },
];

const SAMPLE_RECEIPTS = [
  { date: "2026-03-02", vendor: "Example Lumber Co.", phase: "Structure & shell", amount: 1840.5 },
  {
    date: "2026-03-09",
    vendor: "Sample Electric",
    phase: "HVAC, electrical & plumbing",
    amount: 925,
  },
  { date: "2026-03-15", vendor: "Demo Tile & Stone", phase: "Interior finishes", amount: 312.75 },
];

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold">{title}</h2>
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  const total = SAMPLE_RECEIPTS.reduce((sum, r) => sum + r.amount, 0);

  return (
    <main className="mx-auto w-full max-w-4xl space-y-8 px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Styleguide</h1>
          <p className="text-muted-foreground">CostLine UI foundation (CL-40). Sample data only.</p>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Delete</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Paid</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="outline">Draft</Badge>
          <Badge variant="destructive">Duplicate</Badge>
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid gap-3 sm:grid-cols-2">
          <Input placeholder="Search receipts" />
          <Input type="number" inputMode="decimal" placeholder="Amount" />
          <Input placeholder="Invalid field" aria-invalid />
          <Input placeholder="Disabled" disabled />
        </div>
      </Section>

      <Section title="Card, dialog & toast">
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Total spent</CardTitle>
            <CardDescription>All phases, sample numbers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold tabular-nums">{money.format(total)}</p>
          </CardContent>
          <CardFooter className="gap-2">
            <DialogDemo />
            <ToastDemo />
          </CardFooter>
        </Card>
      </Section>

      <Section title="Table">
        <Card className="py-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SAMPLE_RECEIPTS.map((r) => (
                <TableRow key={r.date + r.vendor}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.vendor}</TableCell>
                  <TableCell>{r.phase}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {money.format(r.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right tabular-nums">{money.format(total)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </Section>

      <Section title="Phase colors">
        <ul className="grid gap-2 sm:grid-cols-2">
          {PHASES.map((p) => (
            <li key={p.key} className="flex items-center gap-3">
              <span className={`size-6 shrink-0 rounded-md ${p.className}`} />
              <span>{p.name}</span>
              <code className="ml-auto font-mono text-xs text-muted-foreground">
                --phase-{p.key}
              </code>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Theme tokens">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {TOKENS.map((t) => (
            <li key={t.name} className="flex items-center gap-3">
              <span className={`size-6 shrink-0 rounded-md border ${t.className}`} />
              <span>{t.name}</span>
            </li>
          ))}
        </ul>
        <p className="text-muted-foreground">
          Text: <span className="text-foreground">foreground</span> ·{" "}
          <span className="text-muted-foreground">muted</span> ·{" "}
          <span className="text-primary">primary</span> ·{" "}
          <span className="text-destructive">destructive</span> ·{" "}
          <span className="text-warning">warning</span>
        </p>
      </Section>
    </main>
  );
}
