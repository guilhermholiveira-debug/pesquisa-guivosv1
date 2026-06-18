import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MapPin, Pencil, Clock, Settings, LogOut, ChevronRight, Bell, Shield } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil — Guivos" },
      { name: "description", content: "Seus destinos, disponibilidades e configurações." },
    ],
  }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const logout = useAppStore((s) => s.logout);
  const user = useAppStore((s) => s.user);

  const handleLogout = () => {
    logout();
    toast.success("Você saiu da Guivos.");
    navigate({ to: "/login" });
  };

  const initials = (user?.name ?? "MS").slice(0, 2).toUpperCase();
  const destinies = user?.destinies?.length
    ? user.destinies
    : ["Empreender", "Networking", "Saúde e bem-estar"];

  return (
    <MobileShell withBottomNav wide>
      <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:pt-6">
        <div>
          <header className="px-6 pt-10 pb-6 flex flex-col items-center text-center">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-[0_10px_30px_-10px_rgba(79,70,229,0.6)]">
                {initials}
              </div>
              <button className="absolute -bottom-1 -right-1 rounded-full bg-card border border-border p-1.5 shadow-sm">
                <Pencil className="w-3 h-3 text-foreground" strokeWidth={1.8} />
              </button>
            </div>
            <h1 className="text-xl font-bold text-foreground mt-3">{user?.name ?? "Marina Santos"}</h1>
            <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" strokeWidth={1.8} /> {user?.email ?? "São Paulo, SP"}
            </p>
          </header>

          <Section title="Meus Destinos" action="Editar">
            <div className="flex flex-wrap gap-2">
              {destinies.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-full bg-accent text-accent-foreground border border-primary/15 px-3 py-1 text-xs font-medium"
                >
                  {t}
                </Badge>
              ))}
            </div>
          </Section>

          <Section title="Disponibilidades" action="Editar">
            <div className="grid grid-cols-2 gap-2">
              <Stat icon={Clock} value={user?.availability?.hours ?? "5h"} label="por semana" />
              <Stat icon={MapPin} value={`${user?.availability?.distance ?? "25"} km`} label="raio máximo" />
            </div>
          </Section>
        </div>

        <div>
          <Section title="Configurações">
            <div className="rounded-2xl bg-card border border-border divide-y divide-border overflow-hidden">
              <Row icon={Bell} label="Notificações" />
              <Row icon={Shield} label="Privacidade" />
              <Row icon={Settings} label="Preferências" />
            </div>
          </Section>

          <div className="px-6 pt-2 pb-4">
            <button
              onClick={handleLogout}
              className="w-full inline-flex items-center justify-center gap-2 h-12 rounded-xl border border-destructive/20 bg-destructive/5 text-destructive font-semibold text-sm hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-4 h-4" strokeWidth={1.8} />
              Sair da Guivos
            </button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-6 pb-6">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-bold text-foreground">{title}</h2>
        {action && (
          <button className="text-xs text-primary font-semibold inline-flex items-center gap-1">
            <Pencil className="w-3 h-3" strokeWidth={1.8} /> {action}
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function Stat({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border p-3.5 shadow-sm">
      <Icon className="w-4 h-4 text-primary mb-2" strokeWidth={1.8} />
      <p className="text-lg font-bold text-foreground leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function Row({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-3.5 text-left hover:bg-accent/30 transition-colors">
      <div className="rounded-lg bg-muted p-2">
        <Icon className="w-4 h-4 text-foreground" strokeWidth={1.8} />
      </div>
      <span className="flex-1 text-sm font-medium text-foreground">{label}</span>
      <ChevronRight className="w-4 h-4 text-muted-foreground" strokeWidth={1.8} />
    </button>
  );
}
