import { PermaScores } from '../types/perma';

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
    name: 'Desengajamento & Rotina Mecânica',
    subtitle: 'Boas relações e saúde, mas baixo estado de Flow (Pilar E: 4,3)',
    badge: 'Exemplo Padrão',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 6.7,
      eng: 4.3,
      rel: 8.3,
      mea: 7.0,
      acc: 7.7,
      overall: 6.8,
      neg: 4.3,
      health: 7.3,
      loneliness: 3.0,
      happiness: 7.0,
      lowestPillar: 'eng'
    }
  },
  {
    id: 'flourishing_balanced',
    name: 'Florescimento Pleno & Equilibrado',
    subtitle: 'Todos os 5 pilares acima de 8,0 com baixo estresse emocional',
    badge: 'Muito Alto',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 9.0,
      eng: 8.7,
      rel: 9.3,
      mea: 8.7,
      acc: 8.3,
      overall: 8.8,
      neg: 2.0,
      health: 8.7,
      loneliness: 1.0,
      happiness: 9.0,
      lowestPillar: 'acc'
    }
  },
  {
    id: 'flourishing_overloaded',
    name: 'Alta Realização com Sobrecarga Emocional',
    subtitle: 'PERMA geral bom (7,6), porém Emoções Negativas em alerta (7,0)',
    badge: 'Diagnóstico Cruzado',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 6.3,
      eng: 7.7,
      rel: 7.0,
      mea: 8.3,
      acc: 8.7,
      overall: 7.6,
      neg: 7.0,
      health: 5.3,
      loneliness: 3.0,
      happiness: 7.0,
      lowestPillar: 'pos'
    }
  },
  {
    id: 'loneliness_support',
    name: 'Alerta de Solidão & Vínculos Frágeis',
    subtitle: 'Relacionamentos baixos (4,0) combinados com Solidão elevada (7,0)',
    badge: 'Atenção Social',
    email: 'spaceaparte@gmail.com',
    scores: {
      pos: 5.7,
      eng: 6.3,
      rel: 4.0,
      mea: 6.7,
      acc: 7.0,
      overall: 5.9,
      neg: 5.3,
      health: 7.0,
      loneliness: 7.0,
      happiness: 5.0,
      lowestPillar: 'rel'
    }
  }
];
