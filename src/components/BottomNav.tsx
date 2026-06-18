import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Compass, TrendingUp, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";

const baseItems = [
  { to: "/home", label: "Início", icon: Home },
  { to: "/explorar", label: "Explorar", icon: Compass },
  { to: "/jornada", label: "Jornada", icon: TrendingUp },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const userEmail = useAppStore((s) => s.user?.email ?? "");
  const showAdmin = userEmail.includes("admin");

  const items = showAdmin
    ? [...baseItems, { to: "/admin", label: "Admin", icon: Settings } as const]
    : baseItems;

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-50">
      <div className="mx-3 mb-3 rounded-2xl border border-border bg-background/90 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(15,15,15,0.18)]">
        <ul
          className="grid px-2 py-2"
          style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
        >
          {items.map(({ to, label, icon: Icon }) => {
            const active = pathname === to || pathname.startsWith(to + "/");
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={cn(
                    "flex flex-col items-center gap-1 py-2 rounded-xl transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn("w-5 h-5", active && "stroke-[2.4]")}
                    strokeWidth={active ? 2.4 : 1.8}
                  />
                  <span className={cn("text-[10px] font-medium tracking-wide", active && "text-primary")}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
