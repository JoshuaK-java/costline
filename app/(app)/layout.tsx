import { NavLinks } from "@/components/shell/nav-links";
import { ProjectSwitcher } from "@/components/shell/project-switcher";
import { UserMenu } from "@/components/shell/user-menu";
import { ThemeToggle } from "@/components/theme-toggle";

/**
 * The app shell (CL-41): the frame around every signed-in screen. A server component; only the
 * nav links (active item) and the menus are client components.
 *
 * Phone (<= 760px): top bar + bottom tab bar. Tablet/desktop (>= 761px): sidebar + top bar.
 * viewportFit "cover" (root layout) lets the page run under the notch/home bar, so the bars pad
 * themselves with env(safe-area-inset-*).
 */
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-dvh flex-1">
      <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r bg-card pl-[env(safe-area-inset-left)] tablet:flex">
        <div className="flex h-14 items-center px-5 text-lg font-semibold">CostLine</div>
        <nav aria-label="Main" className="flex-1 px-3 py-2">
          <NavLinks variant="sidebar" />
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b bg-card pt-[env(safe-area-inset-top)]">
          <div className="flex h-14 items-center gap-2 pr-[max(1rem,env(safe-area-inset-right))] pl-[max(1rem,env(safe-area-inset-left))] tablet:pl-4">
            <span className="shrink-0 font-semibold tablet:hidden">CostLine</span>
            <ProjectSwitcher />
            <div className="ml-auto flex shrink-0 items-center gap-2">
              <ThemeToggle />
              <UserMenu />
            </div>
          </div>
        </header>

        {/* bottom padding on phone keeps content clear of the fixed tab bar */}
        <main className="flex-1 px-4 py-6 pb-[calc(5rem+env(safe-area-inset-bottom))] tablet:px-6 tablet:pb-6">
          {children}
        </main>
      </div>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-30 border-t bg-card pb-[env(safe-area-inset-bottom)] tablet:hidden"
      >
        <NavLinks variant="tabbar" />
      </nav>
    </div>
  );
}
