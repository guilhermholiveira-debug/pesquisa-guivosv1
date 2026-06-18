import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Star, MapPin } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { OpportunityCard } from "@/components/OpportunityCard";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { useAllOpportunities, useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/_app/home")({
  head: () => ({
    meta: [
      { title: "Início — Guivos" },
      { name: "description", content: "Oportunidades recomendadas para você hoje." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const all = useAllOpportunities();
  const user = useAppStore((s) => s.user);
  const recommended = all.slice(0, 4);
  const trending = all.slice(2, 5);

  return (
    <MobileShell withBottomNav wide>
      <header className="px-6 pt-8 pb-4 flex items-start justify-between lg:px-0">
        <div>
          <p className="text-xs uppercase tracking-wider text-primary font-semibold">Quinta, 18 jun</p>
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-foreground mt-1">
            Olá, {user?.name?.split(" ")[0] ?? "Marina"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Encontramos oportunidades para você hoje.
          </p>
        </div>
        <button className="relative rounded-full bg-card border border-border p-2.5 shadow-sm">
          <Bell className="w-5 h-5 text-foreground" strokeWidth={1.8} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
        </button>
      </header>

      <section className="pt-2 pb-2 lg:pt-6">
        <div className="flex items-baseline justify-between px-6 mb-3 lg:px-0">
          <h2 className="text-base font-bold text-foreground">Recomendado para você</h2>
          <button className="text-xs text-primary font-semibold">Ver tudo</button>
        </div>
        {/* Mobile: horizontal scroll. Desktop: 3-col grid (shows up to 3 at once). */}
        <div className="flex gap-3 overflow-x-auto px-6 pb-3 scrollbar-none lg:hidden">
          {recommended.map((o) => (
            <OpportunityCard key={o.id} opp={o} />
          ))}
        </div>
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-5">
          {recommended.slice(0, 3).map((o) => (
            <OpportunityCard key={o.id} opp={o} variant="wide" />
          ))}
        </div>
      </section>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:pt-6">
        <section className="px-6 pt-4 space-y-3 lg:px-0">
          <h2 className="text-base font-bold text-foreground">Próximo de você</h2>
          <MapPlaceholder className="h-40 lg:h-64" />
          <div className="space-y-2">
            {all.slice(0, 2).map((o) => (
              <Link
                key={o.id}
                to="/oportunidade/$id"
                params={{ id: o.id }}
                className="flex items-center gap-3 rounded-2xl bg-card border border-border p-3 shadow-sm hover:border-primary/40 transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${o.gradiente} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{o.titulo}</p>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" strokeWidth={1.8} />
                    {o.distancia}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-6 pt-6 pb-4 space-y-3 lg:px-0 lg:pt-4">
          <h2 className="text-base font-bold text-foreground">Em alta na comunidade</h2>
          <div className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden shadow-sm">
            {trending.map((o) => (
              <Link
                key={o.id}
                to="/oportunidade/$id"
                params={{ id: o.id }}
                className="flex items-center gap-3 p-3.5 hover:bg-accent/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{o.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Recomendado por {o.recomendadoPor ?? "comunidade"}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-foreground shrink-0">
                  <Star className="w-3.5 h-3.5 text-primary fill-primary" strokeWidth={1.8} />
                  {o.recomendacoes}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}
