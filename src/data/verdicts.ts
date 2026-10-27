import { PillarKey, PermaScores } from '../types/perma';

export interface VerdictData {
  title: string;
  verdict: string;
  shortAdvice: string;
  focusPillar: PillarKey;
}

export function getVerdictForScores(scores: PermaScores): VerdictData {
  const { pos: p, eng: e, rel: r, mea: m, acc: a } = scores;

  // Identify lowest pillar (same priority order as original app.js)
  if (p < e && p < r && p < m && p < a) {
    return {
      focusPillar: 'pos',
      title: 'Atenção especial às suas Emoções Positivas (P)',
      verdict:
        'Percebi que você tem experimentado algumas oscilações em suas emoções positivas ultimamente. É completamente normal ter altos e baixos, mas é essencial observar como você está se sentindo no panorama geral. Vamos trabalhar juntos para identificar atividades e práticas que lhe tragam alegria genuína e o ajudem a manter uma perspectiva positiva da vida. Lembre-se: pequenos passos conscientes diários levam a mudanças profundas no seu bem-estar geral.',
      shortAdvice:
        'Priorize pausas regenerativas, o cultivo da gratidão diária e momentos descompromissados de lazer.'
    };
  } else if (r < p && r < e && r < m && r < a) {
    return {
      focusPillar: 'rel',
      title: 'Prioridade de fortalecimento em Relacionamentos (R)',
      verdict:
        'Espero que você consiga desfrutar de conexões positivas com as pessoas ao seu redor. No entanto, nutrir ainda mais esses vínculos pode ser o divisor de águas para o seu bem-estar geral. Vamos buscar maneiras de aprofundar esses relacionamentos, comunicar-se de forma clara e empática e consolidar uma rede de apoio na qual você possa confiar plenamente nos momentos desafiadores. Laços sociais autênticos e acolhedores são o maior pilar de resiliência e felicidade humana.',
      shortAdvice:
        'Dedique tempo de qualidade a conversas sem tela, compartilhe suas vulnerabilidades e pratique a escuta atenta.'
    };
  } else if (e < r && e < m && e < a) {
    return {
      focusPillar: 'eng',
      title: 'Oportunidade de elevar seu Engajamento & Flow (E)',
      verdict:
        'Observei que você pode não estar tão engajado(a) e entusiasmado(a) em suas atividades diárias recentemente. É crucial encontrar um senso de fluxo (flow) e imersão naquilo que você executa. Vamos explorar seus interesses e talentos mais profundos e ver como podemos incorporá-los à sua rotina. Envolver-se em tarefas que desafiem suas habilidades e ressoem com você renova a vitalidade e a motivação, gerando uma vida muito mais estimulante e satisfatória.',
      shortAdvice:
        'Reduza as distrações digitais, crie blocos de foco pleno e descubra novos desafios que despertem sua paixão.'
    };
  } else if (m < r && m < p && m < e && m < a) {
    return {
      focusPillar: 'mea',
      title: 'Jornada para despertar Sentido & Propósito (M)',
      verdict:
        'Parece que você tem refletido sobre o quadro geral e buscado um senso mais nítido de propósito para a sua existência. Encontrar significado é uma jornada contínua que exige autorreflexão sincera e alinhamento com seus valores mais nobres. Vamos trabalhar juntos para identificar o que realmente importa para você e conectar seus atos diários a um impacto positivo no mundo. Descobrir esse propósito traz uma paz profunda e uma bússola inabalável para todas as suas decisões.',
      shortAdvice:
        'Conecte seu trabalho a causas que ajudem outras pessoas, defina seus valores centrais e pratique a generosidade.'
    };
  } else if (a < r && a < p && a < m && a < e) {
    return {
      focusPillar: 'acc',
      title: 'Reconhecimento das suas Conquistas & Realizações (A)',
      verdict:
        'Quero que saiba que você já alcançou coisas notáveis, e a sua dedicação é extremamente louvável. No entanto, sinto que você pode estar cobrando a si mesmo com padrões excessivamente perfeccionistas. É essencial reconhecer, validar e comemorar suas vitórias, por mais simples que pareçam no dia a dia. Ao definir metas realistas e celebrar o progresso gradual, você nutrirá uma autoconfiança sólida e uma sensação gratificante de maestria.',
      shortAdvice:
        'Crie o hábito de registrar suas micro-conquistas diárias e transforme grandes metas em passos simples e acolhedores.'
    };
  }

  // Balanced or tie fallback
  const lowest = scores.lowestPillar;
  const titles: Record<PillarKey, string> = {
    pos: 'Harmonização de Emoções Positivas (P)',
    eng: 'Expansão de Engajamento e Foco (E)',
    rel: 'Fortalecimento de Laços Afetivos (R)',
    mea: 'Alinhamento de Propósito e Sentido (M)',
    acc: 'Celebração de Conquistas e Autoestima (A)'
  };

  return {
    focusPillar: lowest,
    title: titles[lowest] || 'Harmonia Geral no Modelo PERMA',
    verdict:
      'Suas pontuações refletem um desenvolvimento equilibrado entre as dimensões do bem-estar. Para continuar florescendo e expandindo sua euforia saudável, vale a pena manter a atenção na dimensão que obteve a menor pontuação relativa, adotando pequenas rotinas conscientes que potencializem seus resultados.',
    shortAdvice:
      'Continue aplicando suas forças pessoais diariamente e pratique o autocuidado contínuo.'
  };
}

export function getScoreClassification(score: number): {
  label: string;
  badgeClass: string;
  colorClass: string;
  description: string;
} {
  if (score >= 8.0) {
    return {
      label: 'Florescente',
      badgeClass: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
      colorClass: 'text-emerald-400',
      description: 'Nível elevado de bem-estar psicológico e vitalidade.'
    };
  } else if (score >= 6.0) {
    return {
      label: 'Saudável',
      badgeClass: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
      colorClass: 'text-blue-400',
      description: 'Bom equilíbrio, com espaço claro para expansão e crescimento.'
    };
  } else if (score >= 4.0) {
    return {
      label: 'Moderado',
      badgeClass: 'bg-amber-500/10 text-amber-400 border border-amber-500/30',
      colorClass: 'text-amber-400',
      description: 'Necessita de atenção para evitar estagnação e fadiga mental.'
    };
  } else {
    return {
      label: 'Prioridade',
      badgeClass: 'bg-rose-500/10 text-rose-400 border border-rose-500/30',
      colorClass: 'text-rose-400',
      description: 'Área com maior urgência de suporte e novos hábitos restauradores.'
    };
  }
}
