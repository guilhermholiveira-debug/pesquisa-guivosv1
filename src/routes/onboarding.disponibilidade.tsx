import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { OnboardingProgress } from "@/components/OnboardingProgress";
import { SegmentedControl } from "@/components/SegmentedControl";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/onboarding/disponibilidade")({
  head: () => ({
    meta: [
      { title: "Sua disponibilidade — Guivos" },
      { name: "description", content: "Defina tempo e distância para receber oportunidades compatíveis." },
    ],
  }),
  component: Page,
});

const horas = [
  { value: "1h", label: "1h" },
  { value: "3h", label: "3h" },
  { value: "5h", label: "5h" },
  { value: "10h", label: "10h+" },
] as const;

const distancias = [
  { value: "5", label: "5km" },
  { value: "10", label: "10km" },
  { value: "25", label: "25km" },
  { value: "50", label: "50km" },
  { value: "qq", label: "Qualquer" },
] as const;

function Page() {
  const [hora, setHora] = useState<(typeof horas)[number]["value"]>("5h");
  const [dist, setDist] = useState<(typeof distancias)[number]["value"]>("25");
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const setOnboarding = useAppStore((s) => s.setOnboarding);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);

  const finish = () => {
    if (!isLoggedIn) login("convidado@guivos.app", "Convidado");
    setOnboarding({ availability: { hours: hora, distance: dist } });
    navigate({ to: "/home" });
  };

  return (
    <MobileShell withFooter wide>
      <div className="px-6 pt-8 pb-6 space-y-6">
        <div className="flex items-center justify-between">
          <Link to="/onboarding/obstaculos" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" strokeWidth={1.8} />
          </Link>
          <span className="text-xs text-muted-foreground font-medium">Etapa 3 de 3</span>
        </div>
        <OnboardingProgress step={3} />
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <h1 className="text-[26px] font-bold leading-tight tracking-tight text-foreground">
            Quanto tempo você consegue dedicar por semana?
          </h1>
          <p className="text-sm text-muted-foreground">
            Isso nos ajuda a filtrar oportunidades compatíveis com sua rotina.
          </p>
        </motion.div>
      </div>

      <div className="px-6 space-y-8">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <Clock className="w-4 h-4 text-primary" strokeWidth={1.8} />
            <h3 className="text-sm font-semibold">Tempo por semana</h3>
          </div>
          <SegmentedControl options={horas} value={hora} onChange={setHora} />
        </section>

        <section className="space-y-3">
          <div className="flex items-center gap-2 text-foreground">
            <MapPin className="w-4 h-4 text-primary" strokeWidth={1.8} />
            <h3 className="text-sm font-semibold">Distância que aceito percorrer</h3>
          </div>
          <SegmentedControl options={distancias} value={dist} onChange={setDist} />
        </section>

        <div className="rounded-2xl border border-border bg-accent/40 p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Com base nas suas escolhas, você verá oportunidades de até{" "}
            <span className="font-semibold text-foreground">{hora}/semana</span> em um raio de{" "}
            <span className="font-semibold text-foreground">
              {dist === "qq" ? "qualquer distância" : `${dist} km`}
            </span>
            .
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-6 pt-4 pb-6 bg-gradient-to-t from-background via-background to-transparent">
        <Button
          size="lg"
          className="w-full h-12 rounded-xl text-base font-semibold"
          onClick={finish}
        >
          Finalizar
        </Button>
      </div>
    </MobileShell>
  );
}
