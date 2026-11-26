"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { isActive, NAV_ITEMS } from "./nav-items";

/**
 * The only client part of the shell: it needs the current URL to highlight the active item.
 * "sidebar" = vertical list (tablet/desktop), "tabbar" = bottom tabs (phone).
 */
export function NavLinks({ variant }: { variant: "sidebar" | "tabbar" }) {
  const pathname = usePathname();

  return (
    <ul className={cn(variant === "sidebar" ? "flex flex-col gap-1" : "grid grid-cols-3")}>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                variant === "sidebar"
                  ? "h-9 gap-3 rounded-md px-3 font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  : "h-16 flex-col justify-center gap-1 text-xs font-medium text-muted-foreground",
                active &&
                  (variant === "sidebar"
                    ? "bg-secondary text-primary hover:bg-secondary hover:text-primary"
                    : "text-primary"),
              )}
            >
              <Icon className="size-5 shrink-0" aria-hidden />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
