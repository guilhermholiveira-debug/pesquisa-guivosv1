import { createFileRoute, Link, redirect, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  Trash2,
  Upload,
  TrendingUp,
  Activity,
  Star,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("guivos:auth");
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed?.isLoggedIn) throw redirect({ to: "/login" });
    } catch (e) {
      if ((e as { isRedirect?: boolean })?.isRedirect) throw e;
      throw redirect({ to: "/login" });
    }
  },
  head: () => ({
    meta: [
      { title: "Admin — Guivos" },
      { name: "description", content: "Painel administrativo da Guivos." },
    ],
  }),
  component: AdminPage,
});

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "oportunidades", label: "Oportunidades", icon: Sparkles },
  { id: "usuarios", label: "Usuários", icon: Users },
  { id: "relatorios", label: "Relatórios", icon: BarChart3 },
  { id: "configuracoes", label: "Configurações", icon: Settings },
] as const;

function AdminPage() {
  const [collapsed, setCollapsed] = useState(false);
  const opps = useAppStore((s) => s.opportunities);
  const tests = useAppStore((s) => s.testOpportunities);
  const testUsers = useAppStore((s) => s.testUsers);
  const addTestOpportunities = useAppStore((s) => s.addTestOpportunities);
  const addTestUsers = useAppStore((s) => s.addTestUsers);
  const clearTestData = useAppStore((s) => s.clearTestData);

  const totalOpps = opps.length + tests.length;
  const activeUsers = 1284 + testUsers.length;
  const participations = 3942;
  const recommendationRate = 87;

  const recent = [...opps, ...tests].slice(-6).reverse();

  return (
    <div className="min-h-screen bg-neutral-100 flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "shrink-0 bg-background border-r border-border transition-all duration-200 flex flex-col",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          {!collapsed && (
            <Link to="/" className="font-extrabold text-lg tracking-tight">
              Guivos
            </Link>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="rounded-lg p-2 hover:bg-accent/40 text-muted-foreground"
            aria-label="Alternar sidebar"
          >
            <Menu className="w-4 h-4" strokeWidth={1.8} />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((it) => (
            <button
              key={it.id}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                it.id === "dashboard"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent/40 hover:text-foreground",
              )}
            >
              <it.icon className="w-4 h-4 shrink-0" strokeWidth={1.8} />
              {!collapsed && <span>{it.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Link
            to="/home"
            className="block text-xs text-center text-muted-foreground hover:text-foreground"
          >
            {collapsed ? "↩" : "Voltar ao app"}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <header className="h-16 bg-background border-b border-border px-6 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Visão geral em tempo real</p>
          </div>
          <div className="text-xs text-muted-foreground">Atualizado agora</div>
        </header>

        <div className="p-6 space-y-6 max-w-[1400px]">
          {/* Metrics */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={Sparkles}
              label="Total de Oportunidades"
              value={totalOpps.toString()}
              delta="+12%"
            />
            <MetricCard
              icon={Users}
              label="Usuários Ativos"
              value={activeUsers.toLocaleString("pt-BR")}
              delta="+8%"
            />
            <MetricCard
              icon={Activity}
              label="Participações"
              value={participations.toLocaleString("pt-BR")}
              delta="+24%"
            />
            <MetricCard
              icon={Star}
              label="Taxa de Recomendação"
              value={`${recommendationRate}%`}
              delta="+3%"
            />
          </section>

          {/* Charts */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartCard
              title="Participações por categoria"
              data={[
                { label: "Empreender", value: 78, color: "bg-primary" },
                { label: "Networking", value: 64, color: "bg-secondary" },
                { label: "Crescimento", value: 52, color: "bg-indigo-400" },
                { label: "Saúde", value: 41, color: "bg-purple-400" },
                { label: "Social", value: 33, color: "bg-pink-400" },
              ]}
            />
            <ChartCard
              title="Engajamento últimos 7 dias"
              data={[
                { label: "Seg", value: 35, color: "bg-primary" },
                { label: "Ter", value: 58, color: "bg-primary" },
                { label: "Qua", value: 42, color: "bg-primary" },
                { label: "Qui", value: 71, color: "bg-primary" },
                { label: "Sex", value: 88, color: "bg-secondary" },
                { label: "Sáb", value: 62, color: "bg-secondary" },
                { label: "Dom", value: 47, color: "bg-secondary" },
              ]}
            />
          </section>

          {/* Test tools */}
          <section className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" strokeWidth={2} />
              <h2 className="text-base font-bold">Ferramentas de Teste</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              <GenerateCard
                title="Gerar Oportunidades"
                description="Insere N oportunidades mockadas."
                actionLabel="Gerar"
                icon={PlusCircle}
                onSubmit={(n) => {
                  addTestOpportunities(n);
                  toast.success(`${n} oportunidade(s) gerada(s).`);
                }}
              />
              <GenerateCard
                title="Gerar Usuários"
                description="Insere N usuários mockados."
                actionLabel="Gerar"
                icon={Users}
                onSubmit={(n) => {
                  addTestUsers(n);
                  toast.success(`${n} usuário(s) gerado(s).`);
                }}
              />
              <ClearCard
                onClear={() => {
                  clearTestData();
                  toast.success("Dados de teste removidos.");
                }}
              />
              <ImportCard />
            </div>
          </section>

          {/* Recent table */}
          <section className="rounded-2xl bg-background border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-base font-bold">Últimas oportunidades</h2>
              <span className="text-xs text-muted-foreground">{recent.length} itens</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40 text-xs text-muted-foreground uppercase tracking-wider">
                  <tr>
                    <th className="text-left px-5 py-3 font-semibold">ID</th>
                    <th className="text-left px-5 py-3 font-semibold">Título</th>
                    <th className="text-left px-5 py-3 font-semibold">Categoria</th>
                    <th className="text-left px-5 py-3 font-semibold">Data</th>
                    <th className="text-left px-5 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recent.map((o) => {
                    const isTest = "source" in o && (o as { source?: string }).source === "test";
                    return (
                      <tr key={o.id} className="hover:bg-accent/20">
                        <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                          {o.id.slice(0, 8)}
                        </td>
                        <td className="px-5 py-3 font-medium text-foreground truncate max-w-[280px]">
                          {o.titulo}
                        </td>
                        <td className="px-5 py-3 text-muted-foreground">{o.categoria}</td>
                        <td className="px-5 py-3 text-muted-foreground">{o.data}</td>
                        <td className="px-5 py-3">
                          <span
                            className={cn(
                              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                              isTest
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700",
                            )}
                          >
                            <span
                              className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                isTest ? "bg-amber-500" : "bg-emerald-500",
                              )}
                            />
                            {isTest ? "Teste" : "Publicado"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: any;
  label: string;
  value: string;
  delta: string;
}) {
  return (
    <div className="rounded-2xl bg-background border border-border p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-primary/10 text-primary p-2.5">
          <Icon className="w-4 h-4" strokeWidth={2} />
        </div>
        <span className="text-xs font-semibold text-emerald-600">{delta}</span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function ChartCard({
  title,
  data,
}: {
  title: string;
  data: { label: string; value: number; color: string }[];
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="rounded-2xl bg-background border border-border p-5 shadow-sm">
      <h3 className="text-sm font-bold text-foreground">{title}</h3>
      <div className="mt-5 flex items-end gap-3 h-48">
        {data.map((d) => (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex-1 flex items-end">
              <div
                className={cn("w-full rounded-t-lg transition-all", d.color)}
                style={{ height: `${(d.value / max) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GenerateCard({
  title,
  description,
  actionLabel,
  icon: Icon,
  onSubmit,
}: {
  title: string;
  description: string;
  actionLabel: string;
  icon: any;
  onSubmit: (n: number) => void;
}) {
  const [n, setN] = useState(5);
  return (
    <div className="rounded-2xl bg-background border border-border p-5 shadow-sm flex flex-col">
      <div className="rounded-xl bg-primary/10 text-primary p-2.5 w-fit">
        <Icon className="w-4 h-4" strokeWidth={2} />
      </div>
      <h3 className="text-sm font-bold mt-3">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1 flex-1">{description}</p>
      <div className="mt-4 flex gap-2">
        <input
          type="number"
          min={1}
          max={100}
          value={n}
          onChange={(e) => setN(Math.max(1, Number(e.target.value) || 1))}
          className="w-20 h-9 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-primary"
        />
        <Button
          onClick={() => onSubmit(n)}
          className="flex-1 h-9 rounded-lg text-sm font-semibold"
        >
          {actionLabel}
        </Button>
      </div>
    </div>
  );
}

function ClearCard({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-2xl bg-background border border-border p-5 shadow-sm flex flex-col">
      <div className="rounded-xl bg-destructive/10 text-destructive p-2.5 w-fit">
        <Trash2 className="w-4 h-4" strokeWidth={2} />
      </div>
      <h3 className="text-sm font-bold mt-3">Limpar Dados</h3>
      <p className="text-xs text-muted-foreground mt-1 flex-1">
        Remove oportunidades e usuários com source="test".
      </p>
      <button
        onClick={onClear}
        className="mt-4 w-full inline-flex items-center justify-center gap-2 h-9 rounded-lg border border-destructive/30 bg-destructive/5 text-destructive text-sm font-semibold hover:bg-destructive/10 transition-colors"
      >
        <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
        Limpar todos os dados de teste
      </button>
    </div>
  );
}

function ImportCard() {
  const [filename, setFilename] = useState<string | null>(null);
  return (
    <div className="rounded-2xl bg-background border border-border p-5 shadow-sm flex flex-col">
      <div className="rounded-xl bg-primary/10 text-primary p-2.5 w-fit">
        <Upload className="w-4 h-4" strokeWidth={2} />
      </div>
      <h3 className="text-sm font-bold mt-3">Importar CSV</h3>
      <p className="text-xs text-muted-foreground mt-1 flex-1">
        Upload de arquivo (somente UI nesta demo).
      </p>
      <label className="mt-4 cursor-pointer">
        <input
          type="file"
          accept=".csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setFilename(f.name);
              toast.success(`Arquivo "${f.name}" recebido.`);
            }
          }}
        />
        <div className="inline-flex w-full items-center justify-center gap-2 h-9 rounded-lg border-2 border-dashed border-border text-muted-foreground text-xs font-semibold hover:border-primary hover:text-primary transition-colors">
          <Upload className="w-3.5 h-3.5" strokeWidth={2} />
          {filename ?? "Selecionar arquivo CSV"}
        </div>
      </label>
    </div>
  );
}
