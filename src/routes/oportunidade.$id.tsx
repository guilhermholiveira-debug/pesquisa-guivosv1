import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Target, Star, Heart, Check, Users } from "lucide-react";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { getOpportunity } from "@/data/opportunities";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/oportunidade/$id")({
  head: () => ({
    meta: [
      { title: "Oportunidade — Guivos" },
      { name: "description", content: "Detalhes, avaliações e participação." },
    ],
  }),
  component: Page,
});

function Page() {
  const { id } = useParams({ from: "/oportunidade/$id" });
  const testOpp = useAppStore((s) => s.testOpportunities.find((o) => o.id === id));
  const opp = testOpp ?? getOpportunity(id);
  const [saved, setSaved] = useState(false);
  const [joined, setJoined] = useState(false);

  return (
    <MobileShell withFooter>
      <div className={cn("relative h-64 bg-gradient-to-br", opp.gradiente)}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <Link
          to="/home"
          className="absolute top-5 left-5 rounded-full bg-white/20 backdrop-blur-md p-2.5 text-white border border-white/30"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2} />
        </Link>
        <div className="absolute bottom-5 left-6 right-6 space-y-2">
          <span className="inline-block text-[11px] font-semibold text-white px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/25">
            {opp.categoria}
          </span>
          <h1 className="text-2xl font-bold text-white leading-tight">{opp.titulo}</h1>
        </div>
      </div>

      <div className="px-6 pt-5 space-y-4">
        <div className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden shadow-sm">
          <InfoRow icon={Calendar} label={`${opp.data}, ${opp.hora}`} />
          <InfoRow icon={MapPin} label={opp.endereco} />
          <InfoRow icon={Users} label={`${opp.recomendacoes} pessoas recomendaram`} />
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-foreground">Sobre a oportunidade</h2>
          {opp.descricao.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground leading-relaxed">{p}</p>
          ))}
        </section>

        <section className="rounded-2xl bg-gradient-to-br from-accent/60 to-accent/20 border border-primary/15 p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-primary text-primary-foreground p-2 shrink-0">
              <Target className="w-4 h-4" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-primary font-semibold">
                Transformação esperada
              </p>
              <p className="text-sm text-foreground mt-1 leading-relaxed">{opp.transformacao}</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 pb-2">
          <h2 className="text-sm font-bold text-foreground">Avaliações</h2>
          <div className="space-y-2">
            {opp.avaliacoes.map((a) => (
              <div key={a.nome} className="rounded-2xl bg-card border border-border p-3.5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    {a.iniciais}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{a.nome}</p>
                    <div className="flex items-center gap-0.5 mt-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3 h-3",
                            i < a.estrelas ? "text-primary fill-primary" : "text-muted",
                          )}
                          strokeWidth={1.8}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">"{a.comentario}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 pt-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setSaved((s) => !s)}
            className={cn(
              "h-12 rounded-xl flex-1 border-border font-semibold",
              saved && "border-primary text-primary bg-primary/5",
            )}
          >
            <Heart className={cn("w-4 h-4 mr-1", saved && "fill-primary")} strokeWidth={1.8} />
            {saved ? "Salvo" : "Salvar"}
          </Button>
          <Button
            onClick={() => setJoined((j) => !j)}
            className="h-12 rounded-xl flex-[2] font-semibold"
          >
            <Check className="w-4 h-4 mr-1" strokeWidth={2.2} />
            {joined ? "Confirmado" : "Participar"}
          </Button>
        </div>
      </div>
    </MobileShell>
  );
}

function InfoRow({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-3 p-3.5">
      <div className="rounded-lg bg-accent text-primary p-2">
        <Icon className="w-4 h-4" strokeWidth={1.8} />
      </div>
      <span className="text-sm text-foreground">{label}</span>
    </div>
  );
}
