import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, Rocket, Heart, Users, Sparkles, HandHeart } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { SelectableCard } from "@/components/SelectableCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/onboarding/destino")({
  head: () => ({
    meta: [
      { title: "Defina seu destino — Guivos" },
      { name: "description", content: "Escolha onde quer chegar nos próximos 12 meses." },
    ],
  }),
  component: Page,
});

const options = [
  { id: "carreira", label: "Crescimento profissional", icon: Briefcase },
  { id: "empreender", label: "Empreender", icon: Rocket },
  { id: "saude", label: "Saúde e bem-estar", icon: Heart },
  { id: "networking", label: "Networking", icon: Users },
  { id: "espiritualidade", label: "Espiritualidade", icon: Sparkles },
  { id: "social", label: "Projetos sociais", icon: HandHeart },
] as const;

function Page() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 3 ? [...prev, id] : prev,
    );
  };

  return (
    <MobileShell withFooter wide>
      <div className="px-6 pt-8 pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.8} />
          </Link>
          <span className="text-xs text-muted-foreground font-medium">Etapa 1 de 3</span>
        </div>
        <OnboardingProgress step={1} />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-foreground">
            Onde você quer estar daqui a 12 meses?
          </h1>
          <p className="text-sm text-muted-foreground">Escolha até 3 áreas para começarmos.</p>
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
          onClick={() => navigate({ to: "/onboarding/obstaculos" })}
        >
          Continuar
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-3">
          {selected.length}/3 selecionados
        </p>
      </div>
    </MobileShell>
  );
}
