import { PermaScores, PillarKey } from '../types/perma';

export interface DemoProfile {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  scores: PermaScores;
  email: string;
}

export const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'flow_challenge',
    name: 'Alerta em Engajamento & Flow (Pilar E)',
    subtitle: 'Rotina monótona ou desvio de foco, boas relações e realizações',
    badge: 'Recomendado para Teste',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 7.5,
      eng: 4.0,
      rel: 8.5,
      mea: 7.5,
      acc: 8.0,
      overall: 7.1,
      lowestPillar: 'eng'
    }
  },
  {
    id: 'flourishing_balanced',
    name: 'Alto Florescimento & Equilíbrio',
    subtitle: 'Níveis elevados em quase todas as 5 áreas com foco em maestria',
    badge: 'Florescente',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 9.0,
      eng: 8.5,
      rel: 9.5,
      mea: 8.5,
      acc: 7.5,
      overall: 8.6,
      lowestPillar: 'acc'
    }
  },
  {
    id: 'emotions_fluctuation',
    name: 'Oscilações em Emoções Positivas (Pilar P)',
    subtitle: 'Período de altos e baixos emocionais e necessidade de autocuidado',
    badge: 'Atenção Emocional',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 4.0,
      eng: 7.5,
      rel: 8.0,
      mea: 8.0,
      acc: 7.5,
      overall: 7.0,
      lowestPillar: 'pos'
    }
  },
  {
    id: 'relationships_support',
    name: 'Necessidade de Apoio Social (Pilar R)',
    subtitle: 'Isolamento recente ou necessidade de aprofundar laços de confiança',
    badge: 'Vínculos Sociais',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 7.5,
      eng: 8.0,
      rel: 4.0,
      mea: 7.5,
      acc: 8.0,
      overall: 7.0,
      lowestPillar: 'rel'
    }
  }
];
