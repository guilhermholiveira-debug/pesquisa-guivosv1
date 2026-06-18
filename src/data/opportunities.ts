export type Review = {
  nome: string;
  iniciais: string;
  estrelas: number;
  comentario: string;
};

export type Opportunity = {
  id: string;
  titulo: string;
  categoria: string;
  gradiente: string; // tailwind gradient classes
  data: string;
  hora: string;
  distancia: string;
  endereco: string;
  descricao: string[];
  transformacao: string;
  avaliacoes: Review[];
  recomendacoes: number;
  recomendadoPor?: string;
  modalidade: "Online" | "Presencial";
};

export const opportunities: Opportunity[] = [
  {
    id: "1",
    titulo: "Roda de Conversa: Empreender com Propósito",
    categoria: "Empreender",
    gradiente: "from-indigo-300 via-indigo-400 to-purple-500",
    data: "15 de junho",
    hora: "19:00",
    distancia: "a 2.5 km",
    endereco: "Av. Paulista, 1500 — São Paulo, SP",
    descricao: [
      "Um encontro intimista com fundadores que estão construindo negócios alinhados ao seu propósito de vida. Você vai ouvir histórias reais sobre os bastidores de empreender.",
      "Espaço para perguntas, networking e troca direta com quem está alguns passos à frente na jornada.",
    ],
    transformacao:
      "Sair com clareza sobre seu próximo passo como empreendedor e três novos contatos qualificados.",
    avaliacoes: [
      {
        nome: "Ana Ribeiro",
        iniciais: "AR",
        estrelas: 5,
        comentario: "Mudou minha forma de ver o negócio. Indispensável.",
      },
      {
        nome: "Marcos Lima",
        iniciais: "ML",
        estrelas: 5,
        comentario: "Conexões reais, sem floreio. Voltarei.",
      },
      {
        nome: "Júlia Souza",
        iniciais: "JS",
        estrelas: 5,
        comentario: "Conversa honesta e prática.",
      },
    ],
    recomendacoes: 17,
    recomendadoPor: "Marcos Lima",
    modalidade: "Presencial",
  },
  {
    id: "2",
    titulo: "Café de Networking Tech",
    categoria: "Networking",
    gradiente: "from-blue-300 via-indigo-400 to-indigo-500",
    data: "18 de junho",
    hora: "08:30",
    distancia: "a 3 km",
    endereco: "Vila Madalena, São Paulo",
    descricao: [
      "Encontro descontraído entre profissionais de tecnologia, produto e design. Foco em construir relações duradouras.",
      "Formato dinâmico de rotação para conhecer várias pessoas em pouco tempo.",
    ],
    transformacao: "Ampliar sua rede com 5 a 8 conexões alinhadas ao seu momento de carreira.",
    avaliacoes: [
      { nome: "Pedro Alves", iniciais: "PA", estrelas: 5, comentario: "Voltei com 6 conversas em andamento." },
      { nome: "Camila Dias", iniciais: "CD", estrelas: 4, comentario: "Bem organizado, ambiente leve." },
      { nome: "Rafael Nunes", iniciais: "RN", estrelas: 5, comentario: "Melhor café que fui este ano." },
    ],
    recomendacoes: 24,
    recomendadoPor: "Camila Dias",
    modalidade: "Presencial",
  },
  {
    id: "3",
    titulo: "Curso: Disciplina Diária para Resultados",
    categoria: "Crescimento",
    gradiente: "from-purple-300 via-purple-400 to-indigo-500",
    data: "22 de junho",
    hora: "20:00",
    distancia: "Online",
    endereco: "Transmissão ao vivo",
    descricao: [
      "Programa de 4 semanas para instalar hábitos consistentes que sustentam grandes metas.",
      "Inclui acompanhamento em grupo e um plano semanal personalizado.",
    ],
    transformacao: "Construir uma rotina que produz resultados visíveis em 30 dias.",
    avaliacoes: [
      { nome: "Beatriz Faria", iniciais: "BF", estrelas: 5, comentario: "Mudou minha rotina por completo." },
      { nome: "Diego Pinto", iniciais: "DP", estrelas: 5, comentario: "Conteúdo prático e direto." },
      { nome: "Larissa Melo", iniciais: "LM", estrelas: 4, comentario: "Vale cada minuto." },
    ],
    recomendacoes: 41,
    recomendadoPor: "Diego Pinto",
    modalidade: "Online",
  },
  {
    id: "4",
    titulo: "Trilha de Yoga ao Amanhecer",
    categoria: "Saúde",
    gradiente: "from-pink-300 via-rose-300 to-purple-400",
    data: "20 de junho",
    hora: "06:00",
    distancia: "a 4.8 km",
    endereco: "Parque do Ibirapuera — Portão 3",
    descricao: [
      "Comece o dia com uma prática de yoga ao ar livre, respiração consciente e meditação guiada.",
      "Aberto a todos os níveis, com instrutora certificada.",
    ],
    transformacao: "Restaurar energia e foco para a semana inteira.",
    avaliacoes: [
      { nome: "Helena Castro", iniciais: "HC", estrelas: 5, comentario: "Experiência transformadora." },
      { nome: "Bruno Tavares", iniciais: "BT", estrelas: 5, comentario: "Acordei diferente." },
      { nome: "Sofia Reis", iniciais: "SR", estrelas: 4, comentario: "Lindo nascer do sol." },
    ],
    recomendacoes: 12,
    recomendadoPor: "Helena Castro",
    modalidade: "Presencial",
  },
  {
    id: "5",
    titulo: "Mutirão de Apoio Comunitário",
    categoria: "Social",
    gradiente: "from-amber-300 via-orange-400 to-rose-500",
    data: "25 de junho",
    hora: "09:00",
    distancia: "a 6.2 km",
    endereco: "Centro Comunitário Heliópolis",
    descricao: [
      "Ação social com distribuição de alimentos, oficinas para crianças e atendimento básico de saúde.",
      "Voluntariado direto, com impacto imediato na comunidade.",
    ],
    transformacao: "Sentir o impacto de servir e ampliar sua rede com pessoas que constroem mudança.",
    avaliacoes: [
      { nome: "Tiago Ramos", iniciais: "TR", estrelas: 5, comentario: "Dia que ressignifica tudo." },
      { nome: "Aline Cunha", iniciais: "AC", estrelas: 5, comentario: "Organização impecável." },
      { nome: "Vinícius Maia", iniciais: "VM", estrelas: 5, comentario: "Voltarei em todas." },
    ],
    recomendacoes: 33,
    modalidade: "Presencial",
  },
  {
    id: "6",
    titulo: "Mesa Redonda: Espiritualidade no Cotidiano",
    categoria: "Espiritualidade",
    gradiente: "from-violet-300 via-purple-400 to-fuchsia-500",
    data: "28 de junho",
    hora: "19:30",
    distancia: "a 1.2 km",
    endereco: "Casa Vida, Pinheiros — SP",
    descricao: [
      "Conversa aberta sobre práticas espirituais aplicadas ao dia a dia profissional e pessoal.",
      "Sem doutrina. Espaço seguro para escuta e troca.",
    ],
    transformacao: "Encontrar âncoras internas para tomar decisões mais alinhadas ao que importa.",
    avaliacoes: [
      { nome: "Lucas Prado", iniciais: "LP", estrelas: 5, comentario: "Profundo e acolhedor." },
      { nome: "Mariana Vidal", iniciais: "MV", estrelas: 5, comentario: "Saí em paz." },
      { nome: "Felipe Gusmão", iniciais: "FG", estrelas: 4, comentario: "Boa moderação." },
    ],
    recomendacoes: 9,
    modalidade: "Presencial",
  },
  {
    id: "7",
    titulo: "Workshop: Pitch que Conecta",
    categoria: "Crescimento",
    gradiente: "from-indigo-400 via-purple-400 to-pink-400",
    data: "30 de junho",
    hora: "14:00",
    distancia: "Online",
    endereco: "Transmissão ao vivo",
    descricao: [
      "Aprenda a estruturar um pitch claro, humano e memorável para investidores, clientes ou recrutadores.",
      "Prática ao vivo com feedback individual.",
    ],
    transformacao: "Sair com um pitch de 90 segundos pronto para usar amanhã.",
    avaliacoes: [
      { nome: "Renata Vidal", iniciais: "RV", estrelas: 5, comentario: "Direto ao ponto." },
      { nome: "Carlos Eiras", iniciais: "CE", estrelas: 5, comentario: "Feedback valioso." },
      { nome: "Paula Stein", iniciais: "PS", estrelas: 4, comentario: "Recomendo muito." },
    ],
    recomendacoes: 28,
    recomendadoPor: "Renata Vidal",
    modalidade: "Online",
  },
  {
    id: "8",
    titulo: "Caminhada Consciente no Parque",
    categoria: "Saúde",
    gradiente: "from-emerald-300 via-teal-400 to-cyan-500",
    data: "02 de julho",
    hora: "07:00",
    distancia: "a 5.4 km",
    endereco: "Parque Villa-Lobos — SP",
    descricao: [
      "Caminhada guiada de 5 km com pausas para respiração e contemplação. Ritmo confortável.",
      "Grupo limitado a 20 pessoas.",
    ],
    transformacao: "Conectar corpo, mente e ambiente em uma única prática.",
    avaliacoes: [
      { nome: "Igor Saldanha", iniciais: "IS", estrelas: 5, comentario: "Renovador." },
      { nome: "Tatiana Vega", iniciais: "TV", estrelas: 5, comentario: "Adorei o ritmo." },
      { nome: "Bruna Klein", iniciais: "BK", estrelas: 4, comentario: "Boa companhia." },
    ],
    recomendacoes: 15,
    modalidade: "Presencial",
  },
];

export const getOpportunity = (id: string) =>
  opportunities.find((o) => o.id === id) ?? opportunities[0];
