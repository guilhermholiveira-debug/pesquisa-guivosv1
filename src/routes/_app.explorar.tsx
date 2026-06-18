import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, ChevronRight, Clock } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { useAllOpportunities } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar — Guivos" },
      { name: "description", content: "Encontre oportunidades próximas no mapa." },
    ],
  }),
  component: Page,
});

const filters = ["Hoje", "Esta semana", "Online", "Presencial"] as const;

function Page() {
  const all = useAllOpportunities();
  const [filter, setFilter] = useState<(typeof filters)[number]>("Esta semana");

  const visible = all.filter((o) => {
    if (filter === "Online") return o.modalidade === "Online";
    if (filter === "Presencial") return o.modalidade === "Presencial";
    return true;
  });

  return (
    <MobileShell withBottomNav wide>
      <header className="px-6 pt-8 pb-4 lg:px-0">
        <h1 className="text-[28px] font-bold tracking-tight text-foreground">Explorar</h1>
        <p className="text-sm text-muted-foreground mt-1">Oportunidades perto de você.</p>
      </header>

      <div className="px-6 lg:px-0">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
          <input
            placeholder="Buscar por tema, local ou pessoa..."
            className="w-full h-11 rounded-xl bg-card border border-border pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "shrink-0 px-3.5 h-8 rounded-full text-xs font-medium border transition-colors",
                filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:border-primary/40",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:pt-6">
        <div className="px-6 pt-4 lg:px-0 lg:pt-0 lg:sticky lg:top-6 lg:self-start">
          <MapPlaceholder className="h-52 lg:h-[520px]" />
        </div>

        <section className="px-6 pt-5 pb-2 lg:px-0 lg:pt-0">
          <div className="flex items-baseline justify-between mb-3">
            <h2 className="text-base font-bold text-foreground">{visible.length} oportunidades</h2>
            <button className="text-xs text-primary font-semibold">Ordenar</button>
          </div>
          <div className="space-y-2">
            {visible.map((o) => (
              <Link
                key={o.id}
                to="/oportunidade/$id"
                params={{ id: o.id }}
                className="flex items-center gap-3 rounded-2xl bg-card border border-border p-3.5 shadow-sm hover:border-primary/40 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${o.gradiente} shrink-0 flex items-center justify-center`}>
                  <MapPin className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{o.titulo}</p>
                  <div className="flex items-center gap-2.5 text-[11px] text-muted-foreground mt-1">
                    <span>{o.distancia}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" strokeWidth={1.8} />
                      {o.data}, {o.hora}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" strokeWidth={1.8} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileShell>
  );
}
