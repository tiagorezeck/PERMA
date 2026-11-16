import { PermaScores, PillarKey } from '../types/perma';

export function roundOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Official Butler & Kern (2016) PERMA-Profiler scoring algorithm.
 * Each domain score is the arithmetic mean of its 3 items (0–10 scale).
 * Overall Well-being is the mean of the 15 core PERMA items + item 23 (Overall Happiness) = 16 items.
 */
export function calculateOfficialPermaScores(answers: Record<string, number>): PermaScores {
  const g = (id: string) => {
    const val = answers[id];
    return typeof val === 'number' && !Number.isNaN(val) ? val : 0;
  };

  // Core 5 PERMA pillars (3 items each)
  const posRaw = (g('q3') + g('q13') + g('q22')) / 3;
  const engRaw = (g('q2') + g('q10') + g('q17')) / 3;
  const relRaw = (g('q8') + g('q19') + g('q21')) / 3;
  const meaRaw = (g('q7') + g('q9') + g('q20')) / 3;
  const accRaw = (g('q1') + g('q5') + g('q15')) / 3;

  // Supplementary indicators
  const negRaw = (g('q4') + g('q14') + g('q16')) / 3;
  const healthRaw = (g('q6') + g('q12') + g('q18')) / 3;
  const lonelinessRaw = g('q11');
  const happinessRaw = g('q23');

  // Official Overall Well-Being = mean of the 15 core PERMA items + q23 (16 items total)
  const coreSum16 =
    g('q1') + g('q2') + g('q3') + g('q5') +
    g('q7') + g('q8') + g('q9') + g('q10') +
    g('q13') + g('q15') + g('q17') + g('q19') +
    g('q20') + g('q21') + g('q22') + g('q23');
  const overallRaw = coreSum16 / 16;

  const pos = roundOneDecimal(posRaw);
  const eng = roundOneDecimal(engRaw);
  const rel = roundOneDecimal(relRaw);
  const mea = roundOneDecimal(meaRaw);
  const acc = roundOneDecimal(accRaw);
  const overall = roundOneDecimal(overallRaw);
  const neg = roundOneDecimal(negRaw);
  const health = roundOneDecimal(healthRaw);
  const loneliness = roundOneDecimal(lonelinessRaw);
  const happiness = roundOneDecimal(happinessRaw);

  const pillars: { key: PillarKey; val: number }[] = [
    { key: 'pos', val: posRaw },
    { key: 'eng', val: engRaw },
    { key: 'rel', val: relRaw },
    { key: 'mea', val: meaRaw },
    { key: 'acc', val: accRaw }
  ];
  pillars.sort((a, b) => a.val - b.val);
  const lowestPillar = pillars[0].key;

  return {
    pos,
    eng,
    rel,
    mea,
    acc,
    overall,
    neg,
    health,
    loneliness,
    happiness,
    lowestPillar
  };
}

/**
 * Normalizes any legacy history record stored before the 23-item upgrade.
 */
export function normalizeScoresRecord(raw: Partial<PermaScores>): PermaScores {
  const pos = typeof raw.pos === 'number' ? raw.pos : 0;
  const eng = typeof raw.eng === 'number' ? raw.eng : 0;
  const rel = typeof raw.rel === 'number' ? raw.rel : 0;
  const mea = typeof raw.mea === 'number' ? raw.mea : 0;
  const acc = typeof raw.acc === 'number' ? raw.acc : 0;
  const overall =
    typeof raw.overall === 'number'
      ? raw.overall
      : roundOneDecimal((pos + eng + rel + mea + acc) / 5);

  const pillars: { key: PillarKey; val: number }[] = [
    { key: 'pos', val: pos },
    { key: 'eng', val: eng },
    { key: 'rel', val: rel },
    { key: 'mea', val: mea },
    { key: 'acc', val: acc }
  ];
  pillars.sort((a, b) => a.val - b.val);

  return {
    pos,
    eng,
    rel,
    mea,
    acc,
    overall,
    neg: typeof raw.neg === 'number' ? raw.neg : 3.0,
    health: typeof raw.health === 'number' ? raw.health : 7.0,
    loneliness: typeof raw.loneliness === 'number' ? raw.loneliness : 2.0,
    happiness: typeof raw.happiness === 'number' ? raw.happiness : overall,
    lowestPillar: raw.lowestPillar || pillars[0].key
  };
}
