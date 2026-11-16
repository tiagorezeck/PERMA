import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Printer,
  RotateCcw,
  Mail,
  Lightbulb,
  AlertTriangle,
  Smile,
  Flame,
  Users,
  Compass,
  Award,
  HeartPulse,
  CloudRain,
  UserMinus,
  LayoutDashboard,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import { PermaScores, PillarKey, SubscaleKey, TipsCategoryKey } from '../types/perma';
import { PILLARS_INFO } from '../data/tips';
import { PERMA_QUESTIONS } from '../data/questions';
import { getVerdictForScores, getScoreClassification, getDistressClassification } from '../data/verdicts';
import { DEMO_PROFILES } from '../data/demoProfiles';
import { PermaRadarChart } from './PermaRadarChart';

type ReportTabKey = 'panel' | 'charts' | TipsCategoryKey;

interface ResultScreenProps {
  scores: PermaScores;
  answers?: Record<string, number>;
  userEmail?: string;
  isDemo?: boolean;
  activeDemoId?: string;
  onSwitchDemo?: (profileId: string) => void;
  onRetake: () => void;
  onOpenTipsForPillar: (categoryKey: TipsCategoryKey) => void;
  onOpenEmailPreview: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  scores,
  answers,
  userEmail,
  isDemo = false,
  activeDemoId,
  onSwitchDemo,
  onRetake,
  onOpenEmailPreview
}) => {
  const verdictData = getVerdictForScores(scores);
  const overallClass = getScoreClassification(scores.overall);
  const negClass = getDistressClassification(scores.neg);
  const lonelinessClass = getDistressClassification(scores.loneliness);
  const healthClass = getScoreClassification(scores.health);

  const [activeTab, setActiveTab] = useState<ReportTabKey>('panel');

  useEffect(() => {
    setActiveTab('panel');
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, [scores]);

  const handlePrint = () => {
    window.print();
  };

  const handleSelectTab = (tab: ReportTabKey) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pillarCards: {
    key: PillarKey;
    score: number;
  }[] = [
    { key: 'pos', score: scores.pos },
    { key: 'eng', score: scores.eng },
    { key: 'rel', score: scores.rel },
    { key: 'mea', score: scores.mea },
    { key: 'acc', score: scores.acc }
  ];

  const guideKeysOrder: TipsCategoryKey[] = ['pos', 'eng', 'rel', 'mea', 'acc', 'regulation'];
  const guideMeta = PILLARS_INFO[verdictData.recommendedGuide];

  const navButtons: {
    key: ReportTabKey;
    label: string;
    icon: React.ReactNode;
    isRecommended?: boolean;
  }[] = [
    { key: 'panel', label: 'Painel', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { key: 'charts', label: 'Gráficos', icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { key: 'pos', label: 'Emoções Positivas', icon: <Smile className="w-3.5 h-3.5" />, isRecommended: verdictData.recommendedGuide === 'pos' },
    { key: 'eng', label: 'Engajamento', icon: <Flame className="w-3.5 h-3.5" />, isRecommended: verdictData.recommendedGuide === 'eng' },
    { key: 'rel', label: 'Relacionamentos', icon: <Users className="w-3.5 h-3.5" />, isRecommended: verdictData.recommendedGuide === 'rel' },
    { key: 'mea', label: 'Sentido', icon: <Compass className="w-3.5 h-3.5" />, isRecommended: verdictData.recommendedGuide === 'mea' },
    { key: 'acc', label: 'Realização', icon: <Award className="w-3.5 h-3.5" />, isRecommended: verdictData.recommendedGuide === 'acc' },
    { key: 'regulation', label: 'Regulação & Saúde', icon: <HeartPulse className="w-3.5 h-3.5" />, isRecommended: verdictData.recommendedGuide === 'regulation' }
  ];

  const getScoreBadgeForCategory = (cat: TipsCategoryKey) => {
    if (cat === 'regulation') {
      return (
        <div className="flex flex-wrap items-center gap-2 text-xs tabular-nums">
          <span className={`px-2.5 py-0.5 rounded-md font-semibold ${negClass.badgeClass}`}>
            Emoções Negativas: {scores.neg.toFixed(1)}/10
          </span>
          <span className={`px-2.5 py-0.5 rounded-md font-semibold ${healthClass.badgeClass}`}>
            Saúde Física: {scores.health.toFixed(1)}/10
          </span>
          <span className={`px-2.5 py-0.5 rounded-md font-semibold ${lonelinessClass.badgeClass}`}>
            Solidão: {scores.loneliness.toFixed(1)}/10
          </span>
        </div>
      );
    }

    const scoreMap: Record<PillarKey, number> = {
      pos: scores.pos,
      eng: scores.eng,
      rel: scores.rel,
      mea: scores.mea,
      acc: scores.acc
    };
    const score = scoreMap[cat];
    const cls = getScoreClassification(score);
    return (
      <div className="flex items-center gap-2 text-xs tabular-nums">
        <span className="font-extrabold text-slate-900 dark:text-white text-sm">{score.toFixed(1)} / 10</span>
        <span className={`px-2.5 py-0.5 rounded-md font-semibold ${cls.badgeClass}`}>
          {cls.label}
        </span>
      </div>
    );
  };

  const renderChartsSection = () => (
    <div className="space-y-8">
      {/* Top KPI Card: Overall Well-being (16 items) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-md dark:shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Índice Geral de Bem-Estar (Média de 16 itens: 15 PERMA + Felicidade Geral)
            </div>
            <div className="flex flex-wrap items-baseline gap-3 mt-1.5">
              <span className="text-5xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                {scores.overall.toFixed(1)}
              </span>
              <span className="text-xl font-semibold text-slate-400 dark:text-slate-500 tabular-nums">/ 10,0</span>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${overallClass.badgeClass}`}>
                {overallClass.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl">
              {overallClass.description} · Felicidade Geral isolada (Item 23):{' '}
              <strong className="text-slate-900 dark:text-white tabular-nums">{scores.happiness.toFixed(1)}/10</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 no-print">
            <button
              type="button"
              onClick={() => handleSelectTab(verdictData.recommendedGuide)}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap shadow-sm"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Ver Dicas de Evolução</span>
            </button>

            <button
              type="button"
              onClick={onOpenEmailPreview}
              className="px-4 py-2.5 rounded-xl font-semibold text-sm text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
            >
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Resumo por E-mail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Radar Chart + 5 PERMA Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Pentagon Radar */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col justify-between shadow-sm dark:shadow-none">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Equilíbrio dos 5 Pilares
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 mb-3">
              Visão geométrica comparada à referência saudável (6,5)
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <PermaRadarChart scores={scores} />
          </div>
        </div>

        {/* Right: 5 Core Pillars List */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-none">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Subescalas PERMA (Média por Pilar)
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">Escala 0,0 – 10,0</span>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {pillarCards.map(({ key, score }) => {
              const meta = PILLARS_INFO[key];
              const classification = getScoreClassification(score);
              const isLowest = key === verdictData.focusPillar;
              const percentage = Math.round((score / 10) * 100);

              return (
                <div key={key} className="py-3.5 first:pt-1 last:pb-1">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-xs text-slate-950 shrink-0 ${meta.gradient}`}
                      >
                        {meta.letter}
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                            {meta.name}
                          </h3>
                          {isLowest && (
                            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">
                              · Prioridade de foco
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                          {classification.label} · {meta.englishName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tabular-nums">
                        {score.toFixed(1)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectTab(key)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer no-print"
                        title={`Abrir aba de ${meta.name}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <div
                      className={`h-full ${meta.gradient} transition-all duration-500 rounded-full`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Supplementary Indicators: Negative Emotion, Physical Health, Loneliness */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Indicadores Complementares do PERMA-Profiler
          </h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Medidos em paralelo para identificar desgaste oculto ou suporte físico
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Negative Emotion (N) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <CloudRain className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Emoções Negativas (N)</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Menor é melhor</span>
            </div>
            <div className="flex items-baseline gap-2.5 my-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                {scores.neg.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">/ 10</span>
              <span className={`ml-auto px-2.5 py-0.5 rounded-md text-xs font-semibold ${negClass.badgeClass}`}>
                {negClass.label}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Média de ansiedade, raiva e tristeza (itens 4, 14 e 16). {negClass.description}
            </p>
          </div>

          {/* Physical Health (H) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <HeartPulse className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Saúde Física (H)</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Maior é melhor</span>
            </div>
            <div className="flex items-baseline gap-2.5 my-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                {scores.health.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">/ 10</span>
              <span className={`ml-auto px-2.5 py-0.5 rounded-md text-xs font-semibold ${healthClass.badgeClass}`}>
                {healthClass.label}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Vitalidade e satisfação física (itens 6, 12 e 18). {healthClass.description}
            </p>
          </div>

          {/* Loneliness */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <UserMinus className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Solidão Percebida</span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Menor é melhor</span>
            </div>
            <div className="flex items-baseline gap-2.5 my-2">
              <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                {scores.loneliness.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 tabular-nums">/ 10</span>
              <span className={`ml-auto px-2.5 py-0.5 rounded-md text-xs font-semibold ${lonelinessClass.badgeClass}`}>
                {lonelinessClass.label}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Sensação diária de isolamento (item 11). {lonelinessClass.description}
            </p>
          </div>
        </div>
      </div>

      {/* Cross-Profile Psychological Verdict */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-md dark:shadow-xl">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-indigo-50 border border-indigo-200 dark:bg-indigo-500/15 dark:border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                Diagnóstico Cruzado · {verdictData.patternLabel}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1">
                {verdictData.title}
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {verdictData.verdict}
            </p>

            {verdictData.alerts.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 dark:bg-amber-500/10 dark:border-amber-500/30 rounded-xl p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-300">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Pontos de Atenção nos Indicadores Complementares</span>
                </div>
                <ul className="space-y-1 text-xs text-amber-900 dark:text-amber-100/90 list-disc list-inside">
                  {verdictData.alerts.map((alertText, idx) => (
                    <li key={idx}>{alertText}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white block">
                  Ação Recomendada Imediata
                </strong>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  {verdictData.shortAdvice}
                </p>
              </div>
            </div>

            <div className="pt-1 no-print">
              <button
                type="button"
                onClick={() => handleSelectTab(verdictData.recommendedGuide)}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Abrir Guia: {guideMeta.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCategoryReportBlock = (catKey: TipsCategoryKey, isStandaloneView: boolean) => {
    const info = PILLARS_INFO[catKey];
    const isRecommended = verdictData.recommendedGuide === catKey;

    const matchingSubscales: SubscaleKey[] =
      catKey === 'regulation' ? ['neg', 'health', 'loneliness'] : [catKey];

    const relatedQuestions = answers
      ? PERMA_QUESTIONS.filter((q) => matchingSubscales.includes(q.subscale))
      : [];

    return (
      <div key={catKey} className="space-y-5">
        {/* Highlight Banner */}
        <div className={`p-5 sm:p-6 rounded-2xl border ${info.bgLight}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <span className={`px-3 h-8 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xs shrink-0 ${info.gradient}`}>
                {info.letter}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {info.name}
                  </h3>
                  <span className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                    · {info.englishName}
                  </span>
                  {isRecommended && (
                    <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      · Foco Recomendado
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-0.5">
                  {info.tagline}
                </p>
              </div>
            </div>

            <div className="shrink-0">{getScoreBadgeForCategory(catKey)}</div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
            {info.description}
          </p>
        </div>

        {/* Actionable Strategies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {info.tips.map((tipGroup, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-none"
            >
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3.5">
                {tipGroup.title}
              </h4>
              <ul className="space-y-2.5">
                {tipGroup.points.map((point, ptIdx) => (
                  <li key={ptIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Itemized Question Breakdown (if real test answers exist) */}
        {relatedQuestions.length > 0 && answers && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider mb-3">
              Respostas Individuais Registradas Nesta Dimensão
            </h4>
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {relatedQuestions.map((q) => (
                <div key={q.id} className="py-2.5 flex items-center justify-between gap-4 text-xs sm:text-sm">
                  <span className="text-slate-700 dark:text-slate-300">
                    <strong className="text-slate-500 dark:text-slate-400 tabular-nums mr-1.5">Q{q.number}.</strong>
                    {q.text}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums shrink-0">
                    {answers[q.id] ?? 0} / 10
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isStandaloneView && (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-start gap-3 shadow-sm dark:shadow-none">
            <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-sm font-semibold text-slate-900 dark:text-white block">
                Regra Prática da Psicologia Positiva
              </strong>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Escolha apenas uma micro-ação desta seção para praticar nos próximos 7 dias consecutivos. A consistência diária gera mudanças sustentáveis sem causar sobrecarga.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderIndividualSummariesSection = () => {
    const individualSummaries: {
      title: string;
      code: string;
      score: number;
      isInverse?: boolean;
      summary: string;
      targetTab: ReportTabKey;
    }[] = [
      {
        title: 'Emoções Positivas',
        code: 'P',
        score: scores.pos,
        summary: `${getScoreClassification(scores.pos).description} (Média dos itens 3, 13 e 22).`,
        targetTab: 'pos'
      },
      {
        title: 'Engajamento & Flow',
        code: 'E',
        score: scores.eng,
        summary: `${getScoreClassification(scores.eng).description} (Média dos itens 2, 10 e 17).`,
        targetTab: 'eng'
      },
      {
        title: 'Relacionamentos Positivos',
        code: 'R',
        score: scores.rel,
        summary: `${getScoreClassification(scores.rel).description} (Média dos itens 8, 19 e 21).`,
        targetTab: 'rel'
      },
      {
        title: 'Sentido & Propósito',
        code: 'M',
        score: scores.mea,
        summary: `${getScoreClassification(scores.mea).description} (Média dos itens 7, 9 e 20).`,
        targetTab: 'mea'
      },
      {
        title: 'Realização & Maestria',
        code: 'A',
        score: scores.acc,
        summary: `${getScoreClassification(scores.acc).description} (Média dos itens 1, 5 e 15).`,
        targetTab: 'acc'
      },
      {
        title: 'Emoções Negativas',
        code: 'N',
        score: scores.neg,
        isInverse: true,
        summary: `${getDistressClassification(scores.neg).description} (Média dos itens 4, 14 e 16).`,
        targetTab: 'regulation'
      },
      {
        title: 'Saúde Física',
        code: 'H',
        score: scores.health,
        summary: `${getScoreClassification(scores.health).description} (Média dos itens 6, 12 e 18).`,
        targetTab: 'regulation'
      },
      {
        title: 'Solidão Percebida',
        code: 'S',
        score: scores.loneliness,
        isInverse: true,
        summary: `${getDistressClassification(scores.loneliness).description} (Item isolado 11).`,
        targetTab: 'regulation'
      }
    ];

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Resumos Individuais do Relatório (Todas as 8 Dimensões)
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Síntese consolidada por subescala do instrumento PERMA-Profiler
            </p>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            Felicidade Geral (Item 23): <strong className="text-slate-900 dark:text-white">{scores.happiness.toFixed(1)}/10</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
          {individualSummaries.map((item) => {
            const cls = item.isInverse
              ? getDistressClassification(item.score)
              : getScoreClassification(item.score);

            return (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    {item.code}
                  </span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        · {cls.label} {item.isInverse ? '(menor é melhor)' : ''}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">{item.summary}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pl-10 sm:pl-0">
                  <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                    {item.score.toFixed(1)}
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">/10</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectTab(item.targetTab)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 inline-flex items-center gap-1 cursor-pointer no-print"
                  >
                    <span>Ver guia</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">
      {/* Demo Mode Notice Banner */}
      {isDemo && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-indigo-50/90 border border-indigo-200 dark:bg-indigo-950/60 dark:border-indigo-500/40 shadow-md dark:shadow-xl no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold">
                Modo Demonstração · Escala Oficial PERMA-Profiler (23 Itens · 0–10)
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
                Você está visualizando um perfil de exemplo calibrado no algoritmo de médias oficiais. Alterne os cenários abaixo ou faça o teste real.
              </p>
            </div>
            <button
              type="button"
              onClick={onRetake}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              Responder Teste Real
            </button>
          </div>

          {onSwitchDemo && (
            <div className="mt-3 pt-3 border-t border-indigo-200 dark:border-indigo-800/60 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                Cenários:
              </span>
              {DEMO_PROFILES.map((prof) => {
                const isCurrent = activeDemoId === prof.id;
                return (
                  <button
                    key={prof.id}
                    type="button"
                    onClick={() => onSwitchDemo(prof.id)}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-white text-slate-700 hover:bg-indigo-50 border border-indigo-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:border-slate-700'
                    }`}
                  >
                    {prof.name}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Report Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-500 shadow-lg shadow-amber-500/20 mb-3">
          <Trophy className="w-7 h-7 text-slate-950" />
        </div>
        <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
          Relatório Oficial PERMA-Profiler · Butler & Kern (2016)
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1.5 tracking-tight">
          Seu Perfil de Bem-Estar & Florescimento
        </h1>
        {userEmail && (
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Registro: <span className="text-slate-800 dark:text-slate-200 font-medium">{userEmail}</span>
          </p>
        )}
      </div>

      {/* Unified Sticky Navigation Tabs placed directly below "Seu Perfil de Bem-Estar & Florescimento" */}
      <nav
        aria-label="Navegação do Relatório PERMA"
        className="sticky top-16 z-30 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-3 mb-8 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md border-y border-slate-200 dark:border-slate-800 no-print"
      >
        <div className="flex items-center justify-center flex-wrap gap-1.5">
          {navButtons.map((btn) => {
            const isActive = activeTab === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => handleSelectTab(btn.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-600 dark:border-indigo-500 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                }`}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
                {btn.isRecommended && (
                  <span className={`text-[10px] font-bold ${isActive ? 'text-amber-200' : 'text-amber-600 dark:text-amber-400'}`}>
                    · Recomendado
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tab Content */}
      {activeTab === 'panel' && (
        <div className="space-y-12">
          {/* 1. Cards de Gráficos & Diagnóstico Cruzado */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                01. Visão Geral, Gráficos & Diagnóstico Cruzado
              </h2>
              <button
                type="button"
                onClick={() => handleSelectTab('charts')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer no-print"
              >
                Ver somente Gráficos →
              </button>
            </div>
            {renderChartsSection()}
          </section>

          {/* 2. Sequencial Completo de Todos os Relatórios / Guias por Dimensão */}
          <section className="space-y-8">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                02. Relatório Sequencial Completo por Dimensão
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Análise detalhada e estratégias práticas para cada um dos pilares PERMA e regulação emocional
              </p>
            </div>

            <div className="space-y-10">
              {guideKeysOrder.map((catKey) => renderCategoryReportBlock(catKey, false))}
            </div>
          </section>

          {/* 3. Resumos Individuais Consolidados do Relatório */}
          <section className="space-y-4">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                03. Resumos Individuais Consolidados
              </h2>
            </div>
            {renderIndividualSummariesSection()}
          </section>
        </div>
      )}

      {activeTab === 'charts' && (
        <div>{renderChartsSection()}</div>
      )}

      {activeTab !== 'panel' && activeTab !== 'charts' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                Relatório Individual · Psicologia Positiva
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {PILLARS_INFO[activeTab].name}
              </h2>
            </div>

            <button
              type="button"
              onClick={() => handleSelectTab('panel')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 dark:text-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-700 inline-flex items-center gap-2 self-start sm:self-auto cursor-pointer whitespace-nowrap no-print"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao Painel Completo</span>
            </button>
          </div>

          {renderCategoryReportBlock(activeTab, true)}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 mt-10 border-t border-slate-200 dark:border-slate-800 no-print">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 dark:text-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Imprimir ou Salvar PDF</span>
          </button>

          <button
            type="button"
            onClick={onOpenEmailPreview}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 dark:text-slate-300 dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Resumo por E-mail</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onRetake}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-slate-200 hover:bg-slate-300 border border-slate-300 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refazer Avaliação (23 Itens)</span>
        </button>
      </div>
    </div>
  );
};
