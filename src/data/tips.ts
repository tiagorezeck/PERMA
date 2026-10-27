import { PillarInfo } from '../types/perma';

export const PILLARS_INFO: Record<string, PillarInfo> = {
  pos: {
    key: 'pos',
    letter: 'P',
    name: 'Emoções Positivas',
    englishName: 'Positive Emotion',
    tagline: 'Cultivar alegria, gratidão, esperança e serenidade no presente.',
    color: 'from-amber-400 to-orange-500',
    gradient: 'bg-gradient-to-r from-amber-500 to-orange-500',
    bgLight: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    borderColor: 'border-amber-500',
    textColor: 'text-amber-400',
    iconName: 'Smile',
    description:
      'As emoções positivas não são apenas um estado passageiro de prazer; elas ampliam nosso repertório intelectual e social, construindo resiliência biológica e psicológica contra o estresse.',
    tips: [
      {
        title: 'Autorreflexão & Consciência Emocional',
        points: [
          'Observe as oscilações naturais do seu humor durante o dia sem julgá-las duramente.',
          'Pratique a técnica dos "3 Momentos Bons": anote três coisas simples que deram certo antes de dormir.',
          'Identifique os gatilhos que drenam sua alegria e estabeleça limites saudáveis.'
        ]
      },
      {
        title: 'Práticas de Gratidão e Otimismo',
        points: [
          'Escreva ou envie uma mensagem sincera de agradecimento a alguém que fez a diferença na sua semana.',
          'Ressignifique contratempos buscando o aprendizado prático que eles trazem.',
          'Consuma intencionalmente conteúdos que tragam risadas, leveza e inspiração genuína.'
        ]
      },
      {
        title: 'Pequenos Passos, Grande Impacto',
        points: [
          'Lembre-se de que micro-momentos de contentamento diário geram transformações neuroquímicas profundas ao longo das semanas.',
          'Reserve pelo menos 15 minutos do seu dia para uma atividade que gere puro prazer descompromissado.'
        ]
      }
    ]
  },

  eng: {
    key: 'eng',
    letter: 'E',
    name: 'Engajamento & Flow',
    englishName: 'Engagement',
    tagline: 'Perder a noção do tempo em atividades que exigem suas maiores forças.',
    color: 'from-cyan-400 to-blue-600',
    gradient: 'bg-gradient-to-r from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    borderColor: 'border-cyan-500',
    textColor: 'text-cyan-400',
    iconName: 'Flame',
    description:
      'O estado de Flow (Fluxo), teorizado por Mihaly Csikszentmihalyi e integrado por Seligman, ocorre quando nos fundimos com a atividade em um nível tão imersivo que o tempo parece parar e a autocrítica desaparece.',
    tips: [
      {
        title: 'Diagnóstico do Estado de Fluxo',
        points: [
          'Avalie quais momentos da sua última semana fizeram você esquecer o celular e as preocupações.',
          'Identifique suas principais forças de caráter (como curiosidade, criatividade, liderança ou bom humor).',
          'Encontre o ponto ideal entre o nível do desafio e a sua competência para evitar tédio e ansiedade.'
        ]
      },
      {
        title: 'Foco Profundo & Eliminação de Ruído',
        points: [
          'Trabalhe ou estude em blocos ininterruptos (técnica Pomodoro ou sessões de 45-60 minutos no modo foco).',
          'Desative notificações irrelevantes que fragmentam sua atenção em dezenas de pedaços durante o dia.',
          'Crie rituais de entrada para atividades intelectuais ou artísticas (música instrumental, ambiente limpo).'
        ]
      },
      {
        title: 'Integração na Rotina',
        points: [
          'Aplique suas forças pessoais até mesmo em tarefas rotineiras (ex: transforme um relatório burocrático em um design visual cativante).',
          'Pratique um hobby criativo manual ou corporal que demande dedicação e presença absoluta.'
        ]
      }
    ]
  },

  rel: {
    key: 'rel',
    letter: 'R',
    name: 'Relacionamentos Positivos',
    englishName: 'Relationships',
    tagline: 'Construir laços autênticos, rede de apoio e amor mútuo.',
    color: 'from-pink-400 to-rose-600',
    gradient: 'bg-gradient-to-r from-pink-500 to-rose-600',
    bgLight: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
    borderColor: 'border-rose-500',
    textColor: 'text-rose-400',
    iconName: 'Users',
    description:
      'Os seres humanos são criaturas hiper-sociais. Os estudos de Harvard sobre desenvolvimento adulto comprovam: a qualidade dos nossos relacionamentos interpessoais é o maior preditor isolado de saúde física e felicidade ao longo da vida.',
    tips: [
      {
        title: 'Cultivo de Relações Saudáveis',
        points: [
          'Priorize relacionamentos onde haja respeito mútuo, apoio incondicional e entusiasmo pelas suas vitórias.',
          'Identifique relações tóxicas ou drenantes e construa limites protetivos cordiais.',
          'Esteja presente por inteiro em conversas: guarde o celular e pratique a escuta ativa sem interromper.'
        ]
      },
      {
        title: 'Construção da Rede de Apoio',
        points: [
          'Não hesite em pedir ajuda quando estiver sob pressão; a vulnerabilidade corajosa estreita laços.',
          'Esteja disponível para escutar seus amigos sem tentar consertar tudo imediatamente, oferecendo acolhimento.',
          'Planeje encontros presenciais ou chamadas de vídeo com amigos e familiares queridos regularmente.'
        ]
      },
      {
        title: 'Comunicação Construtiva & Afeto',
        points: [
          'Celebre ativamente as conquistas alheias (resposta ativo-construtiva): comemore de verdade o sucesso de quem você ama.',
          'Expresse afeto explícito com palavras, elogios sinceros e pequenos gestos de consideração cotidiana.'
        ]
      }
    ]
  },

  mea: {
    key: 'mea',
    letter: 'M',
    name: 'Sentido & Propósito',
    englishName: 'Meaning',
    tagline: 'Pertencer e servir a algo que você acredita ser maior do que o ego.',
    color: 'from-purple-400 to-indigo-600',
    gradient: 'bg-gradient-to-r from-purple-500 to-indigo-600',
    bgLight: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-400',
    iconName: 'Compass',
    description:
      'O sentido de vida responde à pergunta: "Por que eu acordo todas as manhãs?". Ele ancora o ser humano em tempos de adversidade, transformando até os sofrimentos em etapas de crescimento e evolução.',
    tips: [
      {
        title: 'Exploração Existencial & Valores',
        points: [
          'Liste seus três valores inegociáveis (ex: verdade, justiça, compaixão, aprendizado ou liberdade).',
          'Avalie se a sua rotina atual reflete esses valores ou se você está operando no piloto automático.',
          'Entenda que o sentido não é algo que se "encontra pronto", mas algo que você constrói com suas escolhas diárias.'
        ]
      },
      {
        title: 'Contribuição para Além de Si',
        points: [
          'Dedique tempo a um ato voluntário, mentoria comunitária ou suporte a alguém em situação de vulnerabilidade.',
          'Enxergue o impacto social indireto do seu trabalho: como o que você faz ajuda outras pessoas a viverem melhor?',
          'Reduza o tempo gasto com consumismo superficial e comparação nas redes sociais.'
        ]
      },
      {
        title: 'Direção e Clareza',
        points: [
          'Escreva sua declaração pessoal de missão em uma ou duas frases inspiradoras.',
          'Alinhe seus objetivos de longo prazo àquilo que você gostaria de deixar como legado duradouro no mundo.'
        ]
      }
    ]
  },

  acc: {
    key: 'acc',
    letter: 'A',
    name: 'Realização & Maestria',
    englishName: 'Accomplishment',
    tagline: 'Buscar o domínio, a competência e a vitória sobre metas autodeterminadas.',
    color: 'from-emerald-400 to-teal-600',
    gradient: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    borderColor: 'border-emerald-500',
    textColor: 'text-emerald-400',
    iconName: 'Award',
    description:
      'A busca por realização nos impulsiona a atingir metas, desenvolver talentos e sentir o gosto da mestria. Ter orgulho do próprio esforço e saber finalizar projetos é vital para a autoestima sustentável.',
    tips: [
      {
        title: 'Reconheça suas Conquistas Passadas',
        points: [
          'Faça uma lista de tudo o que você já superou e construiu até hoje. Você já é um sobrevivente talentoso.',
          'Combata a síndrome do impostor confrontando fatos e evidências reais com sensações infundadas de insuficiência.',
          'Permita-se receber elogios e comemorar marcos importantes sem minimizar seu próprio mérito.'
        ]
      },
      {
        title: 'Metas Claras e Micro-Vitórias',
        points: [
          'Adote metas no formato SMART (Específicas, Mensuráveis, Alcançáveis, Relevantes e Temporais).',
          'Divida grandes projetos complexos em micro-tarefas diárias simples de concluir.',
          'Comemore o progresso contínuo, não apenas a linha de chegada final.'
        ]
      },
      {
        title: 'Disciplina Gentil & Resiliência',
        points: [
          'Cultive o hábito de revisar suas metas semanalmente com auto-compaixão diante de imprevistos.',
          'Veja os erros e atrasos como ajustes de rota e dados de aprendizado, jamais como condenação de capacidade.'
        ]
      }
    ]
  }
};
