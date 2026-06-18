import { create } from "zustand";
import { opportunities as seedOpportunities, type Opportunity } from "@/data/opportunities";

export type TestOpportunity = Opportunity & { source: "test" };
export type TestUser = {
  id: string;
  name: string;
  email: string;
  source: "test";
};

export type User = {
  name: string;
  email: string;
  destinies: string[];
  obstacles: string[];
  availability: { hours: string; distance: string };
};

type State = {
  isLoggedIn: boolean;
  user: User | null;
  opportunities: Opportunity[];
  testOpportunities: TestOpportunity[];
  testUsers: TestUser[];
  saved: string[];
  participating: string[];

  login: (email: string, name?: string) => void;
  logout: () => void;
  setOnboarding: (data: Partial<User>) => void;
  addTestOpportunities: (count: number) => void;
  addTestUsers: (count: number) => void;
  clearTestData: () => void;
  toggleSave: (id: string) => void;
  toggleParticipate: (id: string) => void;
};

const STORAGE_KEY = "guivos:auth";

const readPersisted = (): { isLoggedIn: boolean; user: User | null } => {
  if (typeof window === "undefined") return { isLoggedIn: false, user: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { isLoggedIn: false, user: null };
    return JSON.parse(raw);
  } catch {
    return { isLoggedIn: false, user: null };
  }
};

const persist = (isLoggedIn: boolean, user: User | null) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ isLoggedIn, user }));
  } catch {
    /* ignore */
  }
};

const persisted = readPersisted();

const gradients = [
  "from-indigo-300 via-indigo-400 to-purple-500",
  "from-blue-300 via-indigo-400 to-indigo-500",
  "from-purple-300 via-purple-400 to-indigo-500",
  "from-pink-300 via-rose-300 to-purple-400",
  "from-amber-300 via-orange-400 to-rose-500",
  "from-emerald-300 via-teal-400 to-cyan-500",
];
const categorias = ["Empreender", "Networking", "Crescimento", "Saúde", "Social", "Espiritualidade"];

const makeTestOpportunity = (i: number): TestOpportunity => ({
  id: `t-${Date.now()}-${i}`,
  titulo: `Oportunidade de teste #${i + 1}`,
  categoria: categorias[i % categorias.length],
  gradiente: gradients[i % gradients.length],
  data: "Em breve",
  hora: "19:00",
  distancia: `a ${(i % 8) + 1} km`,
  endereco: "Endereço gerado para testes",
  descricao: ["Oportunidade gerada automaticamente para testes."],
  transformacao: "Validar o fluxo completo da plataforma.",
  avaliacoes: [],
  recomendacoes: Math.floor(Math.random() * 30),
  modalidade: i % 2 === 0 ? "Presencial" : "Online",
  source: "test",
});

export const useAppStore = create<State>((set, get) => ({
  isLoggedIn: persisted.isLoggedIn,
  user: persisted.user,
  opportunities: seedOpportunities,
  testOpportunities: [],
  testUsers: [],
  saved: [],
  participating: [],

  login: (email, name) => {
    const user: User = {
      name: name ?? (email.split("@")[0] || "Convidado"),
      email,
      destinies: get().user?.destinies ?? [],
      obstacles: get().user?.obstacles ?? [],
      availability: get().user?.availability ?? { hours: "5h", distance: "25" },
    };
    persist(true, user);
    set({ isLoggedIn: true, user });
  },
  logout: () => {
    persist(false, null);
    set({ isLoggedIn: false, user: null });
  },
  setOnboarding: (data) => {
    const current = get().user ?? {
      name: "Convidado",
      email: "convidado@guivos.app",
      destinies: [],
      obstacles: [],
      availability: { hours: "5h", distance: "25" },
    };
    const next = { ...current, ...data } as User;
    persist(get().isLoggedIn, next);
    set({ user: next });
  },
  addTestOpportunities: (count) => {
    const items = Array.from({ length: count }, (_, i) => makeTestOpportunity(get().testOpportunities.length + i));
    set({ testOpportunities: [...get().testOpportunities, ...items] });
  },
  addTestUsers: (count) => {
    const items: TestUser[] = Array.from({ length: count }, (_, i) => ({
      id: `tu-${Date.now()}-${i}`,
      name: `Usuário Teste ${get().testUsers.length + i + 1}`,
      email: `teste${get().testUsers.length + i + 1}@guivos.app`,
      source: "test",
    }));
    set({ testUsers: [...get().testUsers, ...items] });
  },
  clearTestData: () => set({ testOpportunities: [], testUsers: [] }),
  toggleSave: (id) =>
    set({
      saved: get().saved.includes(id) ? get().saved.filter((x) => x !== id) : [...get().saved, id],
    }),
  toggleParticipate: (id) =>
    set({
      participating: get().participating.includes(id)
        ? get().participating.filter((x) => x !== id)
        : [...get().participating, id],
    }),
}));

export const useAllOpportunities = () => {
  const opps = useAppStore((s) => s.opportunities);
  const tests = useAppStore((s) => s.testOpportunities);
  return [...opps, ...tests];
};
