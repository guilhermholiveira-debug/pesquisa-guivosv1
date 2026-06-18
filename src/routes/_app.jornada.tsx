import { createFileRoute } from "@tanstack/react-router";
import { Activity, Calendar, Users, Sparkles, Target, TrendingUp, ArrowRight } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { TimelineItem } from "@/components/TimelineItem";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/jornada")({
  head: () => ({
    meta: [
      { title: "Jornada — Guivos" },
      { name: "description", content: "Veja sua evolução através das oportunidades." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <MobileShell withBottomNav wide>
      <header className="px-6 pt-8 pb-6 lg:px-0">
        <p className="text-xs uppercase tracking-wider text-primary font-semibold">Progresso</p>
        <h1 className="text-[28px] font-bold tracking-tight text-foreground mt-1">Minha Jornada</h1>
        <p className="text-sm text-muted-foreground mt-1">Veja como você está evoluindo.</p>
      </header>

      <section className="px-6 grid grid-cols-3 gap-2.5 lg:px-0 lg:gap-5">
        <Metric icon={Calendar} value="12" label="Oportunidades" />
        <Metric icon={Activity} value="8.4" label="Impacto médio" />
        <Metric icon={Users} value="27" label="Conexões" />
      </section>

      <section className="px-6 pt-8">
        <h2 className="text-base font-bold text-foreground mb-5">Linha do tempo</h2>
        <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
          <TimelineItem
            icon={Sparkles}
            subtitle="Mês 1"
            title="Primeiro contato"
            description="Você participou da sua primeira oportunidade e começou a mapear conexões alinhadas ao seu destino."
          />
          <TimelineItem
            icon={Target}
            subtitle="Mês 3"
            title="Primeiros resultados"
            description="Hábitos consistentes, 3 projetos iniciados e uma rede ativa de 12 pessoas trocando insights."
          />
          <TimelineItem
            icon={TrendingUp}
            subtitle="Mês 6"
            title="Transformação"
            description="Mudança visível de patamar — sua rotina, decisões e oportunidades estão alinhadas ao seu destino."
            last
          />
        </div>
      </section>

      <div className="px-6 pt-6 pb-4">
        <Button variant="outline" className="w-full h-12 rounded-xl text-sm font-semibold border-primary/30 text-primary hover:bg-primary/5">
          Ver todos os resultados <ArrowRight className="w-4 h-4 ml-1" strokeWidth={1.8} />
        </Button>
      </div>
    </MobileShell>
  );
}

function Metric({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3.5 shadow-sm">
      <Icon className="w-4 h-4 text-primary mb-2" strokeWidth={1.8} />
      <p className="text-xl font-bold text-foreground leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{label}</p>
    </div>
  );
}
