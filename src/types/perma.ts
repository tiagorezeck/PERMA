export type PillarKey = 'pos' | 'eng' | 'rel' | 'mea' | 'acc';

export interface Question {
  id: string; // 'avalue', 'bvalue', etc.
  number: number;
  pillar: PillarKey;
  pillarName: string;
  category: string;
  text: string;
  options: {
    label: string;
    value: number;
  }[];
  explanation?: string;
  isReversed?: boolean;
}

export interface PermaScores {
  pos: number; // Positive Emotion
  eng: number; // Engagement
  rel: number; // Relationships
  mea: number; // Meaning
  acc: number; // Accomplishment
  overall: number; // Average
  lowestPillar: PillarKey;
}

export interface AssessmentRecord {
  id: string;
  email: string;
  date: string;
  scores: PermaScores;
  lowestPillar: PillarKey;
}

export interface PillarInfo {
  key: PillarKey;
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
