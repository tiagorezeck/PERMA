export type PillarKey = 'pos' | 'eng' | 'rel' | 'mea' | 'acc';

export type SubscaleKey = PillarKey | 'neg' | 'health' | 'loneliness' | 'happiness';

export type TipsCategoryKey = PillarKey | 'regulation';

export interface Question {
  id: string; // 'q1' through 'q23'
  number: number;
  subscale: SubscaleKey;
  subscaleName: string;
  scaleType: 'frequency' | 'extent' | 'health' | 'satisfaction' | 'happiness';
  text: string;
  anchorMin: string;
  anchorMid: string;
  anchorMax: string;
  explanation: string;
}

export interface PermaScores {
  pos: number; // Positive Emotion (q3, q13, q22)
  eng: number; // Engagement (q2, q10, q17)
  rel: number; // Relationships (q8, q19, q21)
  mea: number; // Meaning (q7, q9, q20)
  acc: number; // Accomplishment (q1, q5, q15)
  overall: number; // Official 16-item mean (15 PERMA items + q23 happiness)
  neg: number; // Negative Emotion (q4, q14, q16) - lower is better
  health: number; // Physical Health (q6, q12, q18)
  loneliness: number; // Loneliness (q11) - lower is better
  happiness: number; // Overall Happiness item (q23)
  lowestPillar: PillarKey;
}

export interface AssessmentRecord {
  id: string;
  email: string;
  date: string;
  version: 'perma-profiler-23' | 'legacy';
  scores: PermaScores;
  lowestPillar: PillarKey;
}

export interface PillarInfo {
  key: TipsCategoryKey;
  letter: string;
  name: string;
  englishName: string;
  tagline: string;
  color: string;
  gradient: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  iconName: string;
  description: string;
  tips: {
    title: string;
    points: string[];
  }[];
}
