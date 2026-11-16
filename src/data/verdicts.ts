import { PermaScores, PillarKey, TipsCategoryKey } from '../types/perma';

export interface VerdictData {
  title: string;
  patternLabel: string;
  verdict: string;
  shortAdvice: string;
  focusPillar: PillarKey;
  recommendedGuide: TipsCategoryKey;
  alerts: string[];
}

export interface ScoreClassification {
  label: string;
  badgeClass: string;
  colorClass: string;
  description: string;
}

/**
 * Faixas normativas de referência para dimensões positivas (P, E, R, M, A, Saúde, Bem-Estar Geral)
 * baseadas no manual do PERMA-Profiler (Butler & Kern, 2016).
 */
export function getScoreClassification(score: number): ScoreClassification {
  if (score >= 9.0) {
    return {
      label: 'Muito Alto',
      badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      description: 'Florescimento pleno e consistência elevada nesta dimensão.'
    };
  }
  if (score >= 8.0) {
    return {
      label: 'Alto',
      badgeClass: 'bg-teal-50 text-teal-700 border border-teal-200 dark:bg-teal-500/15 dark:text-teal-300 dark:border-teal-500/30',
      colorClass: 'text-teal-600 dark:text-teal-400',
      description: 'Nível robusto de bem-estar, acima da média populacional.'
    };
  }
  if (score >= 6.5) {
    return {
      label: 'Saudável',
      badgeClass: 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:border-blue-500/30',
      colorClass: 'text-blue-600 dark:text-blue-400',
      description: 'Funcionamento normal e equilibrado, com espaço para expansão.'
    };
  }
  if (score >= 5.0) {
    return {
      label: 'Abaixo da Média',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
      colorClass: 'text-amber-600 dark:text-amber-400',
      description: 'Área moderadamente desnutrida; merece atenção intencional.'
    };
  }
  return {
    label: 'Subótimo',
    badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
    colorClass: 'text-rose-600 dark:text-rose-400',
    description: 'Sinal de atenção prioritária e necessidade de novos hábitos restauradores.'
  };
}

/**
 * Faixas interpretativas para indicadores de polaridade inversa (Emoções Negativas e Solidão),
 * onde valores MENORES representam maior bem-estar.
 */
export function getDistressClassification(score: number): ScoreClassification {
  if (score <= 2.9) {
    return {
      label: 'Baixo (Saudável)',
      badgeClass: 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30',
      colorClass: 'text-emerald-600 dark:text-emerald-400',
      description: 'Desgaste emocional ou isolamento mínimo no momento atual.'
    };
  }
  if (score <= 5.9) {
    return {
      label: 'Moderado',
      badgeClass: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30',
      colorClass: 'text-amber-600 dark:text-amber-400',
      description: 'Presença intermitente de tensão emocional ou distanciamento.'
    };
  }
  return {
    label: 'Elevado (Alerta)',
    badgeClass: 'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/15 dark:text-rose-300 dark:border-rose-500/30',
    colorClass: 'text-rose-600 dark:text-rose-400',
    description: 'Sobrecarga relevante; recomenda-se cuidado ativo e rede de apoio.'
  };
}

/**
 * Motor diagnóstico refinado: cruza os 5 pilares PERMA com Emoções Negativas, Saúde Física e Solidão.
 */
export function getVerdictForScores(scores: PermaScores): VerdictData {
  const { pos, eng, rel, mea, acc, overall, neg, health, loneliness, lowestPillar } = scores;

  const alerts: string[] = [];
  if (neg >= 6.0) {
    alerts.push(
      `Emoções Negativas elevadas (${neg.toFixed(1)}/10): frequência expressiva de ansiedade, irritação ou tristeza.`
    );
  }
  if (loneliness >= 6.0) {
    alerts.push(
      `Solidão elevada (${loneliness.toFixed(1)}/10): sensação subjetiva de isolamento no cotidiano.`
    );
  }
  if (health < 5.0) {
    alerts.push(
      `Saúde Física abaixo do ideal (${health.toFixed(1)}/10): baixa vitalidade física pode drenar foco e humor.`
    );
  }

  const pillarSpecificAdvice: Record<PillarKey, { title: string; body: string; action: string }> = {
    pos: {
      title: 'Fortalecimento de Emoções Positivas (P)',
      body: 'Entre os cinco pilares do PERMA, suas Emoções Positivas apresentaram o menor índice relativo. Isso indica que alegria, contentamento e entusiasmo têm aparecido menos na sua rotina, mesmo quando você cumpre suas tarefas. Cultivar micro-momentos intencionais de gratidão e descanso regenerativo ajuda a reequilibrar seu tônus afetivo.',
      action: 'Adote a prática diária de registrar 3 momentos positivos do dia e proteja 15 minutos diários para lazer genuíno sem telas.'
    },
    eng: {
      title: 'Expansão de Engajamento & Flow (E)',
      body: 'Seu ponto de maior oportunidade está no pilar de Engajamento. É possível que suas atividades atuais estejam excessivamente mecânicas, repetitivas ou fragmentadas por distrações constantes, impedindo você de entrar no estado de Flow (absorção plena). Recolocar suas maiores forças pessoais em desafios na medida certa renovará sua energia.',
      action: 'Crie blocos de foco de 45 minutos sem notificações e inclua uma atividade desafiadora que você realmente goste nesta semana.'
    },
    rel: {
      title: 'Nutrição de Relacionamentos Positivos (R)',
      body: 'Os Relacionamentos apareceram como a dimensão que mais pede cuidado neste momento. Na psicologia positiva, vínculos seguros e apoio mútuo são o principal fator protetor contra o esgotamento. Aprofundar conversas autênticas e permitir-se contar com pessoas de confiança trará um ganho rápido para todo o seu bem-estar.',
      action: 'Inicie uma conversa presencial ou por ligação com alguém importante para você, praticando escuta ativa sem distrações.'
    },
    mea: {
      title: 'Clareza de Sentido & Propósito (M)',
      body: 'Sua menor pontuação relativa está em Sentido e Propósito. Quando a rotina desconecta você do "porquê" das suas escolhas, mesmo dias produtivos podem deixar uma sensação de vazio. Conectar suas ações cotidianas a valores pessoais claros ou ao bem de outras pessoas restaura direção e coerência interna.',
      action: 'Liste seus 3 valores centrais e identifique como aplicá-los intencionalmente em um projeto pessoal ou ato de contribuição.'
    },
    acc: {
      title: 'Consolidação de Realização & Maestria (A)',
      body: 'O pilar de Realização foi sua dimensão menos pontuada. Isso pode refletir tanto objetivos pouco claros quanto uma autocrítica severa que impede você de reconhecer os avanços que já conquista. Quebrar metas complexas em entregas simples e celebrar o progresso constante fortalece sua autoeficácia.',
      action: 'Defina uma meta pequena e mensurável para os próximos 7 dias e registre cada etapa concluída.'
    }
  };

  // Caso 1: Florescimento ou bom PERMA, mas com sobrecarga emocional alta (Burnout / Estresse oculto)
  if (overall >= 6.8 && neg >= 6.0) {
    return {
      focusPillar: lowestPillar,
      recommendedGuide: 'regulation',
      patternLabel: 'Bom Desempenho com Sobrecarga Emocional',
      title: 'Atenção à Regulação Emocional: Florescimento sob Tensão',
      verdict: `Seu Índice Geral PERMA (${overall.toFixed(1)}/10) demonstra áreas positivas bem construídas, mas seu nível de Emoções Negativas (${neg.toFixed(1)}/10) está elevado. Na psicologia positiva, esse padrão é típico de pessoas funcionais e comprometidas que carregam alta carga de ansiedade, irritabilidade ou tristeza silenciosa. Antes de exigir ainda mais produtividade de si, vale priorizar descompressão e cuidado emocional.`,
      shortAdvice:
        'Priorize pausas de recuperação física, limites claros de agenda e técnicas de regulação da ansiedade; em paralelo, cuide do pilar mais baixo.',
      alerts
    };
  }

  // Caso 2: Solidão alta combinada com relacionamentos baixos
  if (loneliness >= 6.0 && rel < 6.5) {
    return {
      focusPillar: 'rel',
      recommendedGuide: 'rel',
      patternLabel: 'Alerta de Isolamento & Vínculos',
      title: 'Prioridade em Conexões Autênticas e Redução da Solidão',
      verdict: `Além da pontuação de Relacionamentos (${rel.toFixed(1)}/10), o indicador de Solidão atingiu ${loneliness.toFixed(1)}/10. A solidão subjetiva não depende apenas de estar fisicamente sozinho, mas da sensação de não ser compreendido ou apoiado. Reconstruir pontes seguras com amigos, familiares ou comunidades com interesses afins é o caminho de maior impacto imediato para você.`,
      shortAdvice:
        'Busque interações síncronas (encontros, ligações ou grupos presenciais) e compartilhe como tem se sentido com alguém de confiança.',
      alerts
    };
  }

  // Caso 3: Saúde física comprometida impactando energia e pilares positivos
  if (health < 5.0 && (pos < 6.5 || eng < 6.5)) {
    return {
      focusPillar: lowestPillar,
      recommendedGuide: 'regulation',
      patternLabel: 'Impacto Somático no Bem-Estar',
      title: 'Base Física Pede Cuidado para Sustentar Emoção e Foco',
      verdict: `Sua avaliação de Saúde Física (${health.toFixed(1)}/10) está em zona de atenção e acompanha pontuações reduzidas em disposição emocional ou engajamento. Corpo e mente operam de forma integrada: privação de sono, sedentarismo ou fadiga física crônica reduzem diretamente a capacidade de experimentar prazer e fluxo.`,
      shortAdvice:
        'Comece restaurando sono regular, hidratação e caminhadas leves antes de tentar mudanças psicológicas complexas.',
      alerts
    };
  }

  // Caso 4: Florescimento Pleno e Equilibrado
  if (pos >= 8.0 && eng >= 8.0 && rel >= 8.0 && mea >= 8.0 && acc >= 8.0 && neg <= 3.5 && loneliness <= 3.5) {
    return {
      focusPillar: lowestPillar,
      recommendedGuide: lowestPillar,
      patternLabel: 'Florescimento Pleno',
      title: 'Excelente Equilíbrio Multidimensional no Modelo PERMA',
      verdict: `Parabéns: todas as cinco dimensões do seu PERMA-Profiler atingiram patamares altos (média geral ${overall.toFixed(1)}/10) com baixo desgaste emocional (${neg.toFixed(1)}/10) e baixa solidão (${loneliness.toFixed(1)}/10). Esse perfil caracteriza florescimento humano consistente. Continue nutrindo seus hábitos de sustentação e observe o pilar relativamente mais discreto para seguir evoluindo.`,
      shortAdvice:
        pillarSpecificAdvice[lowestPillar].action,
      alerts
    };
  }

  // Caso 5: Diagnóstico padrão centrado no menor pilar PERMA + alertas complementares se existirem
  const detail = pillarSpecificAdvice[lowestPillar];
  const extraNote =
    neg >= 5.0
      ? ` Vale também monitorar suas Emoções Negativas (${neg.toFixed(1)}/10) para evitar que a tensão cotidiana ofusque seus avanços.`
      : '';

  return {
    focusPillar: lowestPillar,
    recommendedGuide: lowestPillar,
    patternLabel: `Foco de Evolução: ${lowestPillar.toUpperCase()}`,
    title: detail.title,
    verdict: `${detail.body}${extraNote}`,
    shortAdvice: detail.action,
    alerts
  };
}
