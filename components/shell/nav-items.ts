import { LayoutDashboardIcon, ReceiptIcon, SettingsIcon, type LucideIcon } from "lucide-react";

export type NavItem = { href: string; label: string; icon: LucideIcon };

/** Main navigation: sidebar on tablet/desktop, bottom tab bar on phone. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/receipts", label: "Receipts", icon: ReceiptIcon },
  { href: "/settings", label: "Settings", icon: SettingsIcon },
];

/** "/" is only active on the dashboard itself; other items also match their sub-pages. */
export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
