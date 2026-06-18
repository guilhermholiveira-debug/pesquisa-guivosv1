import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Guivos" },
      { name: "description", content: "Acesse sua conta da Guivos." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    login(email.trim());
    toast.success("Bem-vindo de volta!");
    if (email.includes("admin")) {
      navigate({ to: "/admin" });
    } else {
      navigate({ to: "/home" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-background rounded-3xl border border-border shadow-[0_30px_80px_-40px_rgba(79,70,229,0.35)] p-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.8} /> Voltar
        </Link>
        <div className="mt-6">
          <h1 className="text-2xl font-bold tracking-tight">Entrar na Guivos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Use qualquer email para entrar nesta demo. Inclua "admin" para acessar o painel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="voce@email.com"
              className="w-full h-11 rounded-xl bg-card border border-border px-4 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 rounded-xl bg-card border border-border px-4 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold">
            Entrar
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-5">
          Ainda não tem conta?{" "}
          <Link to="/onboarding/destino" className="text-primary font-semibold">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
