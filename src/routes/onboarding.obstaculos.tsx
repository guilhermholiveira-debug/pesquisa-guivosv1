import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Coins, Target, UserPlus, Clock, Compass } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { SelectableCard } from "@/components/SelectableCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/obstaculos")({
  head: () => ({
    meta: [
      { title: "Seus obstáculos — Guivos" },
      { name: "description", content: "Identifique os principais desafios que estão te impedindo." },
    ],
  }),
  component: Page,
});

const options = [
  { id: "conhecimento", label: "Falta de conhecimento", icon: BookOpen },
  { id: "dinheiro", label: "Falta de dinheiro", icon: Coins },
  { id: "disciplina", label: "Falta de disciplina", icon: Target },
  { id: "contatos", label: "Falta de contatos", icon: UserPlus },
  { id: "tempo", label: "Falta de tempo", icon: Clock },
  { id: "oportunidades", label: "Falta de oportunidades", icon: Compass },
] as const;

function Page() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (id: string) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : p.length < 3 ? [...p, id] : p,
    );

  return (
    <MobileShell withFooter wide>
      <div className="px-6 pt-8 pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/destino" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.8} />
          </Link>
          <span className="text-xs text-muted-foreground font-medium">Etapa 2 de 3</span>
        </div>
        <OnboardingProgress step={2} />
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-foreground">
            O que está te impedindo hoje?
          </h1>
          <p className="text-sm text-muted-foreground">Selecione os principais desafios.</p>
        </motion.div>
      </div>

      <div className="px-6 grid grid-cols-2 gap-3 lg:grid-cols-3 lg:px-0 lg:gap-5">
        {options.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <SelectableCard
              icon={opt.icon}
              label={opt.label}
              selected={selected.includes(opt.id)}
              onClick={() => toggle(opt.id)}
              disabled={selected.length >= 3}
            />
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 pt-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          size="lg"
          className="w-full h-12 rounded-xl text-base font-semibold"
          disabled={selected.length === 0}
          onClick={() => navigate({ to: "/onboarding/disponibilidade" })}
        >
          Continuar
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">{selected.length}/3 selecionados</p>
      </div>
    </MobileShell>
  );
}
