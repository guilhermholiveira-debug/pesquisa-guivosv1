import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Target, Sparkles, TrendingUp, ArrowRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { OpportunityCard } from "@/components/OpportunityCard";
import { opportunities } from "@/data/opportunities";
import { useAppStore } from "@/store/useAppStore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Guivos — Descubra oportunidades que transformam sua vida" },
      {
        name: "description",
        content:
          "A Guivos é seu assistente pessoal para encontrar eventos, cursos, grupos e experiências alinhadas com seus objetivos.",
      },
      { property: "og:title", content: "Guivos — Assistente pessoal de oportunidades" },
      {
        property: "og:description",
        content:
          "Encontre eventos, cursos e experiências alinhadas ao que importa pra você.",
      },
    ],
  }),
  component: LandingPage,
});

const steps = [
  {
    icon: Target,
    title: "Defina seu destino",
    description: "Diga onde quer chegar e quais obstáculos enfrenta hoje.",
  },
  {
    icon: Sparkles,
    title: "Receba recomendações",
    description: "A Guivos seleciona oportunidades alinhadas ao seu momento.",
  },
  {
    icon: TrendingUp,
    title: "Acompanhe sua evolução",
    description: "Veja sua jornada se transformar em resultados concretos.",
  },
];

const testimonials = [
  {
    nome: "Ana Ribeiro",
    iniciais: "AR",
    cargo: "Empreendedora",
    comentario:
      "Em 3 meses eu já tinha entrado em rodas de negócio que eu nem sabia que existiam. Mudou minha rotina.",
  },
  {
    nome: "Marcos Lima",
    iniciais: "ML",
    cargo: "Product Manager",
    comentario:
      "Diferente de qualquer plataforma de eventos. As recomendações da Guivos realmente fazem sentido pra mim.",
  },
  {
    nome: "Júlia Souza",
    iniciais: "JS",
    cargo: "Designer",
    comentario:
      "Voltei a ter clareza do que faz sentido investir meu tempo. É como ter um curador pessoal.",
  },
];

function LandingPage() {
  const navigate = useNavigate();
  const login = useAppStore((s) => s.login);
  const isLoggedIn = useAppStore((s) => s.isLoggedIn);

  const start = () => {
    if (!isLoggedIn) login("convidado@guivos.app", "Convidado");
    navigate({ to: "/onboarding/destino" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/80 border-b border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            Guivos
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center justify-center h-9 px-4 rounded-xl border border-border text-sm font-medium hover:bg-accent/40 transition-colors"
            >
              Entrar
            </Link>
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Cadastrar
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-accent/40 via-background to-background" />
        <div className="absolute -top-32 -right-32 -z-10 w-[480px] h-[480px] rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 -z-10 w-[420px] h-[420px] rounded-full bg-secondary/15 blur-3xl" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-16 pb-20 lg:pt-28 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground border border-primary/15 px-3 py-1 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} />
              Seu próximo passo começa aqui
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Descubra oportunidades que{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                transformam sua vida
              </span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
              A Guivos é seu assistente pessoal para encontrar eventos, cursos, grupos e
              experiências alinhadas com seus objetivos.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                onClick={start}
                className="h-12 px-7 rounded-xl text-base font-semibold"
              >
                Começar agora <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
              </Button>
              <Link
                to="/login"
                className="inline-flex items-center justify-center h-12 px-6 rounded-xl border border-border text-sm font-semibold hover:bg-accent/40 transition-colors"
              >
                Já tenho conta
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hidden lg:block"
          >
            <div className="relative mx-auto w-[300px] h-[600px] rounded-[3rem] border-8 border-foreground/90 bg-background shadow-2xl overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-6 bg-foreground/90" />
              <div className="p-5 pt-10 space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-primary font-semibold">
                    Quinta, 18 jun
                  </p>
                  <h3 className="text-lg font-bold mt-1">Olá, Marina</h3>
                </div>
                <div className="space-y-2">
                  {opportunities.slice(0, 3).map((o) => (
                    <div
                      key={o.id}
                      className="rounded-xl border border-border p-2.5 flex items-center gap-2.5 bg-card"
                    >
                      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${o.gradiente}`} />
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold truncate">{o.titulo}</p>
                        <p className="text-[10px] text-muted-foreground">{o.distancia}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Como funciona</h2>
            <p className="mt-3 text-muted-foreground">
              Três passos simples para começar a transformar a sua semana.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground mb-4">
                  <s.icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 lg:py-24 bg-accent/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Quem usa, transforma
            </h2>
            <p className="mt-3 text-muted-foreground">
              Histórias reais de pessoas que encontraram seu próximo passo na Guivos.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.nome}
                className="rounded-2xl bg-card border border-border p-6 shadow-sm flex flex-col"
              >
                <div className="flex items-center gap-1 text-primary mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed flex-1">
                  "{t.comentario}"
                </p>
                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center text-sm font-bold">
                    {t.iniciais}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.nome}</p>
                    <p className="text-xs text-muted-foreground">{t.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Oportunidades em destaque */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Oportunidades em destaque
              </h2>
              <p className="mt-2 text-muted-foreground">
                Uma amostra do que está acontecendo nesta semana.
              </p>
            </div>
            <button
              type="button"
              onClick={start}
              className="text-sm font-semibold text-primary inline-flex items-center gap-1"
            >
              Ver tudo na minha home <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {opportunities.slice(0, 3).map((o) => (
              <OpportunityCard key={o.id} opp={o} variant="wide" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-10 lg:p-14 text-primary-foreground shadow-[0_30px_80px_-30px_rgba(79,70,229,0.55)]">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/10 blur-3xl" />
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl">
              Pronto pra encontrar seu próximo passo?
            </h3>
            <p className="mt-3 text-base text-primary-foreground/90 max-w-xl">
              Leva menos de 2 minutos para configurar seu perfil. Depois, é só receber suas
              recomendações.
            </p>
            <button
              type="button"
              onClick={start}
              className="mt-7 inline-flex items-center justify-center h-12 px-7 rounded-xl bg-background text-foreground font-semibold hover:bg-background/90 transition-colors"
            >
              Começar agora <ArrowRight className="w-4 h-4 ml-1" strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row gap-6 sm:items-center sm:justify-between text-sm">
          <p className="font-extrabold tracking-tight text-base">Guivos</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Sobre</a>
            <a href="#" className="hover:text-foreground transition-colors">Como funciona</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </nav>
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Guivos</p>
        </div>
      </footer>
    </div>
  );
}
