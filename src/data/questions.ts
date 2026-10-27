import { Question } from '../types/perma';

export const PERMA_QUESTIONS: Question[] = [
  // --- Emoções Positivas (P) ---
  {
    id: 'avalue',
    number: 1,
    pillar: 'pos',
    pillarName: 'Emoções Positivas',
    category: 'Bem-Estar Emocional',
    text: 'Com que frequência você se sente alegre e feliz no seu cotidiano?',
    options: [
      { label: 'Frequentemente (5 pontos)', value: 5 },
      { label: 'Raramente (0 pontos)', value: 0 }
    ],
    explanation: 'Mede a presença constante de sentimentos de alegria, contentamento e satisfação com o momento presente.'
  },
  {
    id: 'bvalue',
    number: 2,
    pillar: 'pos',
    pillarName: 'Emoções Positivas',
    category: 'Bem-Estar Emocional',
    text: 'Você frequentemente vivencia sensações de entusiasmo e empolgação com o que faz?',
    options: [
      { label: 'Frequentemente (5 pontos)', value: 5 },
      { label: 'Raramente (0 pontos)', value: 0 }
    ],
    explanation: 'Avalia a vitalidade e a energia positiva diante de projetos, conversas e atividades.'
  },
  {
    id: 'cvalue',
    number: 3,
    pillar: 'pos',
    pillarName: 'Emoções Positivas',
    category: 'Bem-Estar Emocional',
    text: 'Com que frequência você se sente grato(a) pelas coisas boas da sua vida?',
    options: [
      { label: 'Frequentemente (5 pontos)', value: 5 },
      { label: 'Raramente (0 pontos)', value: 0 }
    ],
    explanation: 'A gratidão é um dos pilares mais fortes para cultivar a resiliência e a felicidade sustentável.'
  },
  {
    id: 'dvalue',
    number: 4,
    pillar: 'pos',
    pillarName: 'Emoções Positivas',
    category: 'Bem-Estar Emocional',
    text: 'Você costuma sentir ciúmes, inveja ou ressentimento em relação aos outros?',
    isReversed: true,
    options: [
      { label: 'Não / Raramente (5 pontos)', value: 5 },
      { label: 'Sim / Frequentemente (0 pontos)', value: 0 }
    ],
    explanation: 'Emoções hostis como inveja ou ciúmes minam o bem-estar e a paz interior.'
  },

  // --- Engajamento (E) ---
  {
    id: 'evalue',
    number: 5,
    pillar: 'eng',
    pillarName: 'Engajamento',
    category: 'Conexão e Desafio',
    text: 'Você busca ativamente novos desafios para se manter estimulado(a) e engajado(a)?',
    options: [
      { label: 'Frequentemente (5 pontos)', value: 5 },
      { label: 'Raramente (0 pontos)', value: 0 }
    ],
    explanation: 'O engajamento surge quando habilidades pessoais se alinham a desafios estimulantes.'
  },
  {
    id: 'fvalue',
    number: 6,
    pillar: 'eng',
    pillarName: 'Engajamento',
    category: 'Estado de Flow',
    text: 'Ao realizar atividades que você gosta, com que frequência você perde a noção do tempo?',
    options: [
      { label: 'Frequentemente (5 pontos)', value: 5 },
      { label: 'Raramente (0 pontos)', value: 0 }
    ],
    explanation: 'Perder a noção do tempo é a marca do estado de "Flow" (fluxo), onde a mente opera no ápice do foco.'
  },
  {
    id: 'gvalue',
    number: 7,
    pillar: 'eng',
    pillarName: 'Engajamento',
    category: 'Concentração Plena',
    text: 'Com que frequência você fica completamente absorvido(a) naquilo que está realizando?',
    options: [
      { label: 'Frequentemente (5 pontos)', value: 5 },
      { label: 'Raramente (0 pontos)', value: 0 }
    ],
    explanation: 'Mede a capacidade de imersão profunda sem distrações cognitivas constantes.'
  },
  {
    id: 'hvalue',
    number: 8,
    pillar: 'eng',
    pillarName: 'Engajamento',
    category: 'Espontaneidade e Expressão',
    text: 'Você se sente livre e à vontade para dançar ou expressar sua personalidade sem medo do julgamento alheio?',
    options: [
      { label: 'Sim / À vontade (5 pontos)', value: 5 },
      { label: 'Não / Inibido(a) (0 pontos)', value: 0 }
    ],
    explanation: 'A desinibição autêntica e a expressão corporal espontânea refletem alto engajamento com a própria vida.'
  },

  // --- Relacionamentos (R) ---
  {
    id: 'ivalue',
    number: 9,
    pillar: 'rel',
    pillarName: 'Relacionamentos',
    category: 'Rede de Apoio',
    text: 'Você sente que possui uma rede sólida de apoio formada por amigos, familiares ou pessoas queridas?',
    options: [
      { label: 'Sim / Tenho apoio (5 pontos)', value: 5 },
      { label: 'Não / Sinto falta (0 pontos)', value: 0 }
    ],
    explanation: 'Saber que existem pessoas com quem contar nos momentos de crise fortalece a saúde mental.'
  },
  {
    id: 'jvalue',
    number: 10,
    pillar: 'rel',
    pillarName: 'Relacionamentos',
    category: 'Conexões Inspiradoras',
    text: 'Com que frequência você passa tempo de qualidade com pessoas que te inspiram e colocam você para cima?',
    options: [
      { label: 'Frequentemente (5 pontos)', value: 5 },
      { label: 'Raramente (0 pontos)', value: 0 }
    ],
    explanation: 'Estar ao redor de indivíduos generosos e motivadores nutre diretamente o otimismo diário.'
  },
  {
    id: 'kvalue',
    number: 11,
    pillar: 'rel',
    pillarName: 'Relacionamentos',
    category: 'Vulnerabilidade Saudável',
    text: 'Você se sente confortável em compartilhar seus pensamentos, sentimentos e vulnerabilidades com os outros?',
    options: [
      { label: 'Sim / Confortável (5 pontos)', value: 5 },
      { label: 'Não / Reservado(a) (0 pontos)', value: 0 }
    ],
    explanation: 'Relações profundas exigem abertura mútua e coragem para ser autêntico.'
  },
  {
    id: 'lvalue',
    number: 12,
    pillar: 'rel',
    pillarName: 'Relacionamentos',
    category: 'Autonomia Afetiva',
    text: 'Você sente que depende desesperadamente de um parceiro(a) para conseguir se sentir feliz?',
    isReversed: true,
    options: [
      { label: 'Não / Sou autônomo(a) (5 pontos)', value: 5 },
      { label: 'Sim / Sinto carência dependente (0 pontos)', value: 0 }
    ],
    explanation: 'Relacionamentos saudáveis florescem a partir da inteireza pessoal, não da codependência.'
  },

  // --- Significado e Propósito (M) ---
  {
    id: 'mvalue',
    number: 13,
    pillar: 'mea',
    pillarName: 'Sentido / Propósito',
    category: 'Direção Existencial',
    text: 'Você sente um senso claro de propósito e direção em sua trajetória de vida?',
    options: [
      { label: 'Sim / Tenho clareza (5 pontos)', value: 5 },
      { label: 'Não / Sinto desorientação (0 pontos)', value: 0 }
    ],
    explanation: 'Ter uma causa ou valor pelo qual viver é um protetor essencial contra o vazio existencial.'
  },
  {
    id: 'nvalue',
    number: 14,
    pillar: 'mea',
    pillarName: 'Sentido / Propósito',
    category: 'Significado Profundo',
    text: 'Você sente que a sua existência possui um significado maior, além das tarefas do dia a dia?',
    options: [
      { label: 'Sim / Sinto significado (5 pontos)', value: 5 },
      { label: 'Não / Apenas sobrevivo (0 pontos)', value: 0 }
    ],
    explanation: 'O significado reside em saber que seus atos impactam algo maior do que o próprio ego.'
  },
  {
    id: 'ovalue',
    number: 15,
    pillar: 'mea',
    pillarName: 'Sentido / Propósito',
    category: 'Consumo Consciente',
    text: 'Você gasta muito tempo consumindo conteúdo tóxico ou com comparações inúteis nas redes sociais?',
    isReversed: true,
    options: [
      { label: 'Não / Uso com moderação (5 pontos)', value: 5 },
      { label: 'Sim / Consumo em excesso (0 pontos)', value: 0 }
    ],
    explanation: 'O consumo digital fútil e a comparação sistemática corroem a percepção de propósito da própria vida.'
  },
  {
    id: 'pvalue',
    number: 16,
    pillar: 'mea',
    pillarName: 'Sentido / Propósito',
    category: 'Vocação e Rotina',
    text: 'Você sente entusiasmo e motivação na sua rotina de estudos, trabalho ou ocupação diária?',
    options: [
      { label: 'Sim / Bastante (5 pontos)', value: 5 },
      { label: 'Não / Pouco ou nada (0 pontos)', value: 0 }
    ],
    explanation: 'Encontrar valor e coerência no trabalho transforma esforço em realização com propósito.'
  },

  // --- Realização / Conquista (A) ---
  {
    id: 'qvalue',
    number: 17,
    pillar: 'acc',
    pillarName: 'Realização',
    category: 'Conquistas Históricas',
    text: 'Você já alcançou grandes objetivos ou metas importantes que você mesmo(a) estabeleceu?',
    options: [
      { label: 'Sim / Já alcancei (5 pontos)', value: 5 },
      { label: 'Não / Ainda não (0 pontos)', value: 0 }
    ],
    explanation: 'Recordar vitórias passadas fortalece a autoeficácia para superar novos obstáculos.'
  },
  {
    id: 'rvalue',
    number: 18,
    pillar: 'acc',
    pillarName: 'Realização',
    category: 'Validação e Legado',
    text: 'Você acredita que seus pais, mentores ou pessoas que você respeita sentem orgulho de você?',
    options: [
      { label: 'Sim / Sentem orgulho (5 pontos)', value: 5 },
      { label: 'Não / Tenho dúvidas (0 pontos)', value: 0 }
    ],
    explanation: 'O reconhecimento daqueles que nos formaram nutre o sentimento de dignidade e conquista.'
  },
  {
    id: 'svalue',
    number: 19,
    pillar: 'acc',
    pillarName: 'Realização',
    category: 'Respeito e Mérito',
    text: 'Você sente que as pessoas reconhecem suas competências e respeitam quem você é?',
    options: [
      { label: 'Sim / Me sinto respeitado(a) (5 pontos)', value: 5 },
      { label: 'Não / Sinto descaso (0 pontos)', value: 0 }
    ],
    explanation: 'Sentir-se respeitado pelo que se faz reforça a autoconfiança e a persistência.'
  },
  {
    id: 'tvalue',
    number: 20,
    pillar: 'acc',
    pillarName: 'Realização',
    category: 'Balanço de Vida',
    text: 'Olhando para a sua trajetória até aqui, você considera que tem feito coisas boas e admiráveis?',
    options: [
      { label: 'Sim / Tenho orgulho (5 pontos)', value: 5 },
      { label: 'Não / Faria tudo diferente (0 pontos)', value: 0 }
    ],
    explanation: 'O balanço retrospectivo positivo alimenta a esperança e a determinação para o futuro.'
  }
];
