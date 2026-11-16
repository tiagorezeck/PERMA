import { PillarInfo, TipsCategoryKey } from '../types/perma';

export const PILLARS_INFO: Record<TipsCategoryKey, PillarInfo> = {
  pos: {
    key: 'pos',
    letter: 'P',
    name: 'Emoções Positivas',
    englishName: 'Positive Emotion',
    tagline: 'Cultivar alegria, gratidão, serenidade e otimismo realista.',
    color: 'from-amber-400 to-orange-500',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50/90 text-amber-900 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/30',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-700 dark:text-amber-400',
    iconName: 'Smile',
    description:
      'As emoções positivas vão além do prazer imediato: segundo a teoria Broaden-and-Build de Barbara Fredrickson, elas ampliam a flexibilidade cognitiva, reduzem os efeitos fisiológicos do estresse e constroem recursos psicológicos duradouros.',
    tips: [
      {
        title: 'Savoring (Saborear o Presente)',
        points: [
          'Pratique desacelerar intencionalmente durante experiências agradáveis simples (um café, uma caminhada, uma música), notando detalhes sensoriais sem checar o celular.',
          'Adote o exercício "Três Coisas Boas" (Seligman): antes de dormir, registre 3 fatos positivos do dia e o porquê de eles terem acontecido.',
          'Crie micro-pausas de 5 minutos entre blocos de trabalho para respirar e resetar o tônus emocional.'
        ]
      },
      {
        title: 'Gratidão & Otimismo Aterrado',
        points: [
          'Envie uma mensagem específica de agradecimento a alguém cujo gesto muitas vezes passa despercebido.',
          'Ao enfrentar contratempos, distinga o que está sob seu controle imediato do que não está, evitando generalizações catastróficas.',
          'Reduza a exposição passiva a fluxos de notícias e redes sociais logo ao acordar ou antes de dormir.'
        ]
      }
    ]
  },

  eng: {
    key: 'eng',
    letter: 'E',
    name: 'Engajamento & Flow',
    englishName: 'Engagement',
    tagline: 'Imersão profunda em desafios compatíveis com suas forças pessoais.',
    color: 'from-cyan-400 to-blue-600',
    gradient: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50/90 text-cyan-900 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/30',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-700 dark:text-cyan-400',
    iconName: 'Flame',
    description:
      'O engajamento psicológico (estado de Flow, descrito por Mihaly Csikszentmihalyi) surge quando nossas competências encontram um desafio estimulante na medida certa — gerando foco absoluto, curiosidade e perda da noção do tempo.',
    tips: [
      {
        title: 'Calibragem entre Desafio e Habilidade',
        points: [
          'Se uma tarefa parece entediante, adicione um elemento de novidade, prazo curto ou melhoria de método; se gera ansiedade, quebre-a em subtarefas menores.',
          'Mapeie suas 5 principais forças de caráter (curiosidade, criatividade, análise, perseverança, empatia) e aplique uma delas de forma nova nesta semana.'
        ]
      },
      {
        title: 'Arquitetura de Foco Profundo',
        points: [
          'Reserve blocos protegidos de 45 a 60 minutos sem notificações ou alternância de abas para tarefas que exigem concentração plena.',
          'Recupere hobbies analógicos ou práticos (música, culinária, esporte, escrita, jardinagem) que exijam coordenação e presença ativa, não apenas consumo passivo de telas.'
        ]
      }
    ]
  },

  rel: {
    key: 'rel',
    letter: 'R',
    name: 'Relacionamentos Positivos',
    englishName: 'Relationships',
    tagline: 'Vínculos de confiança, apoio mútuo e presença genuína.',
    color: 'from-pink-400 to-rose-600',
    gradient: 'bg-gradient-to-r from-pink-500 to-rose-600',
    bgLight: 'bg-rose-50/90 text-rose-900 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-700 dark:text-rose-400',
    iconName: 'Users',
    description:
      'Estudos longitudinais de décadas demonstram que a qualidade dos relacionamentos íntimos, familiares e comunitários é o preditor mais consistente de longevidade física, saúde cognitiva e satisfação vital.',
    tips: [
      {
        title: 'Resposta Ativo-Construtiva',
        points: [
          'Quando alguém próximo compartilhar uma boa notícia, reaja com entusiasmo autêntico e faça perguntas sobre a conquista — isso fortalece o vínculo mais do que apenas consolar em momentos difíceis.',
          'Pratique presença sem telas em jantares, cafés ou conversas importantes.'
        ]
      },
      {
        title: 'Construção Ativa de Rede de Apoio',
        points: [
          'Não espere uma crise para retomar contatos importantes: envie uma mensagem genuína para um amigo ou familiar com quem não conversa há semanas.',
          'Compartilhe dificuldades de forma honesta com pessoas de confiança; pedir ajuda fortalece a intimidade e reduz o isolamento percebido.'
        ]
      }
    ]
  },

  mea: {
    key: 'mea',
    letter: 'M',
    name: 'Sentido & Propósito',
    englishName: 'Meaning',
    tagline: 'Coerência entre seus valores diários e uma contribuição maior.',
    color: 'from-purple-400 to-indigo-600',
    gradient: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    bgLight: 'bg-purple-50/90 text-purple-900 border-purple-200 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/30',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-700 dark:text-purple-400',
    iconName: 'Compass',
    description:
      'O sentido de vida nasce do sentimento de pertencimento e serviço a algo que transcende o interesse puramente individual — seja uma causa, família, conhecimento, criação artística ou impacto comunitário.',
    tips: [
      {
        title: 'Alinhamento de Valores e Rotina',
        points: [
          'Defina 3 valores centrais inegociáveis e observe quanto tempo da sua semana atual realmente reflete esses valores.',
          'Pratique o "Job Crafting": reformule parte das suas responsabilidades profissionais ou de estudo para enfatizar quem é beneficiado pelo seu trabalho.'
        ]
      },
      {
        title: 'Serviço & Contribuição Concreta',
        points: [
          'Envolva-se em atos regulares de mentoria, voluntariado ou suporte prático a colegas e comunidade — ajudar outros é uma das vias mais rápidas para restaurar o senso de propósito.',
          'Substitua horas de comparação social passiva por projetos pessoais alinhados ao legado que deseja construir.'
        ]
      }
    ]
  },

  acc: {
    key: 'acc',
    letter: 'A',
    name: 'Realização & Maestria',
    englishName: 'Accomplishment',
    tagline: 'Senso de competência, progresso contínuo e domínio pessoal.',
    color: 'from-emerald-400 to-teal-600',
    gradient: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50/90 text-emerald-900 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/30',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-700 dark:text-emerald-400',
    iconName: 'Award',
    description:
      'A dimensão de realização reflete a busca intrínseca por competência, autonomia e conclusão de metas desafiadoras. Ela sustenta a autoeficácia e a confiança na própria capacidade de lidar com responsabilidades.',
    tips: [
      {
        title: 'Visibilidade de Progresso',
        points: [
          'Divida objetivos grandes em entregas semanais mensuráveis e registre cada marco concluído — o cérebro precisa enxergar movimento para manter motivação.',
          'Combata o perfeccionismo paralisante priorizando consistência sustentável em vez de picos exaustivos seguidos de abandono.'
        ]
      },
      {
        title: 'Autocompaixão na Execução',
        points: [
          'Reconheça suas vitórias passadas sem minimizá-las automaticamente.',
          'Ao falhar em uma meta, faça revisão objetiva de processo (horário, ambiente, clareza do passo) em vez de rotular sua capacidade pessoal.'
        ]
      }
    ]
  },

  regulation: {
    key: 'regulation',
    letter: 'N/H',
    name: 'Regulação Emocional & Saúde',
    englishName: 'Emotional Regulation & Health',
    tagline: 'Manejo de ansiedade, tristeza, estresse físico e solidão.',
    color: 'from-rose-400 to-amber-500',
    gradient: 'bg-gradient-to-r from-rose-500 to-amber-500',
    bgLight: 'bg-rose-50/90 text-rose-900 border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/30',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-700 dark:text-rose-400',
    iconName: 'HeartPulse',
    description:
      'No PERMA-Profiler oficial, emoções negativas, solidão e saúde física são medidas em paralelo aos 5 pilares positivos. Mesmo pessoas com boa realização ou propósito podem enfrentar sobrecarga ansiosa, exaustão corporal ou isolamento subjetivo.',
    tips: [
      {
        title: 'Descompressão de Ansiedade, Raiva e Tristeza',
        points: [
          'Nomeie a emoção com precisão ("estou me sentindo sobrecarregado e tenso agora") — a rotulagem afetiva reduz a reatividade da amígdala cerebral.',
          'Adote técnicas fisiológicas rápidas (respiração com expiração prolongada 4-6 segundos, caminhada ao ar livre sem áudio) antes de decisões difíceis.',
          'Se emoções negativas intensas (tristeza ou ansiedade) persistirem acima de 6,0 por semanas, considere conversar com um psicólogo ou médico de confiança.'
        ]
      },
      {
        title: 'Base Física & Combate à Solidão',
        points: [
          'Proteja os três pilares biológicos da estabilidade emocional: regularidade do sono, movimento físico moderado semanal e exposição à luz solar pela manhã.',
          'Contra a solidão, priorize interações síncronas com pertencimento real (grupos de interesse, atividades presenciais ou ligações com voz) em vez de apenas rolar feeds digitais.'
        ]
      }
    ]
  }
};

export const CORE_PILLARS_LIST: PillarInfo[] = [
  PILLARS_INFO.pos,
  PILLARS_INFO.eng,
  PILLARS_INFO.rel,
  PILLARS_INFO.mea,
  PILLARS_INFO.acc
];
