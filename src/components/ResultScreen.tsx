import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  ArrowRight,
  Printer,
  RotateCcw,
  Mail,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  Smile,
  Flame,
  Users,
  Compass,
  Award
} from 'lucide-react';
import { PermaScores, PillarKey } from '../types/perma';
import { PILLARS_INFO } from '../data/tips';
import { getVerdictForScores, getScoreClassification } from '../data/verdicts';

import { DEMO_PROFILES } from '../data/demoProfiles';

interface ResultScreenProps {
  scores: PermaScores;
  userEmail?: string;
  isDemo?: boolean;
  activeDemoId?: string;
  onSwitchDemo?: (profileId: string) => void;
  onRetake: () => void;
  onOpenTipsForPillar: (pillarKey: PillarKey) => void;
  onOpenEmailPreview: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  scores,
  userEmail,
  isDemo = false,
  activeDemoId,
  onSwitchDemo,
  onRetake,
  onOpenTipsForPillar,
  onOpenEmailPreview
}) => {
  const verdictData = getVerdictForScores(scores);
  const lowestInfo = PILLARS_INFO[verdictData.focusPillar];
  const overallClass = getScoreClassification(scores.overall);

  // Trigger confetti celebration on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const pillarCards: {
    key: PillarKey;
    score: number;
    icon: React.ReactNode;
  }[] = [
    { key: 'pos', score: scores.pos, icon: <Smile className="w-5 h-5 text-amber-300" /> },
    { key: 'eng', score: scores.eng, icon: <Flame className="w-5 h-5 text-cyan-300" /> },
    { key: 'rel', score: scores.rel, icon: <Users className="w-5 h-5 text-rose-300" /> },
    { key: 'mea', score: scores.mea, icon: <Compass className="w-5 h-5 text-purple-300" /> },
    { key: 'acc', score: scores.acc, icon: <Award className="w-5 h-5 text-emerald-300" /> }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Demo Mode Notice Banner (When viewing test results without taking quiz) */}
      {isDemo && (
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-indigo-950/70 border border-indigo-500/40 shadow-xl backdrop-blur-md no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                    Modo Demonstração / Exemplo de Teste
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Sem Fazer o Teste
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Você está visualizando um relatório completo de demonstração. Você pode alternar entre outros perfis de teste ou responder o questionário real.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onRetake}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-md cursor-pointer"
              >
                Responder Teste Real
              </button>
            </div>
          </div>

          {/* Switcher pills */}
          {onSwitchDemo && (
            <div className="mt-3 pt-3 border-t border-indigo-800/60 flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[11px] text-slate-400 font-medium shrink-0">
                Alternar exemplo:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {DEMO_PROFILES.map((prof) => {
                  const isCurrent = activeDemoId === prof.id;
                  return (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => onSwitchDemo(prof.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-indigo-600 text-white font-bold shadow-sm'
                          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
                      }`}
                    >
                      {prof.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Top Banner (Replicating Euphoria-Check Leaderboard Header) */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-yellow-500 shadow-xl shadow-amber-500/20 mb-4 animate-bounce">
          <Trophy className="w-8 h-8 text-slate-950 font-bold" />
        </div>

        <div className="inline-block">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Relatório de Florescimento & Euforia
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-3 mb-2 tracking-tight">
          Suas Pontuações PERMA
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Métricas calculadas com base nas 5 dimensões do bem-estar autêntico do Dr. Martin Seligman.
        </p>

        {userEmail && (
          <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs text-slate-300">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Relatório registrado para: <strong className="text-white">{userEmail}</strong></span>
          </div>
        )}
      </div>

      {/* Overall Score Highlight Card */}
      <div className="bg-gradient-to-br from-indigo-900/60 via-slate-800 to-purple-900/60 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">
              Índice Geral de Bem-Estar (Média PERMA)
            </span>
            <div className="flex items-baseline justify-center md:justify-start gap-3 mt-1">
              <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                {scores.overall.toFixed(1)}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-400">/ 10.0</span>
              <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${overallClass.badgeClass}`}>
                {overallClass.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-lg">
              {overallClass.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenTipsForPillar(verdictData.focusPillar)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer transition-all text-sm"
            >
              <Lightbulb className="w-4 h-4 text-amber-300" />
              <span>Ver Dicas de Evolução</span>
            </button>

            <button
              onClick={onOpenEmailPreview}
              className="w-full sm:w-auto px-4 py-3 rounded-xl font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 flex items-center justify-center gap-2 cursor-pointer transition-all text-sm"
              title="Ver formato do e-mail do sistema"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Ver Formato do E-mail</span>
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Profile Cards (Directly replicating Euphoria Check's Result.ejs) */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Detalhamento por Pilar (Leaderboard PERMA)</span>
          </h2>
          <span className="text-xs text-slate-400">Escala de 0 a 10</span>
        </div>

        <div className="space-y-3">
          {pillarCards.map(({ key, score, icon }) => {
            const meta = PILLARS_INFO[key];
            const classification = getScoreClassification(score);
            const isLowest = key === verdictData.focusPillar;
            const percentage = Math.round((score / 10) * 100);

            return (
              <div
                key={key}
                className={`group bg-slate-800/80 hover:bg-slate-800 border rounded-2xl p-4 sm:p-5 transition-all shadow-md ${
                  isLowest
                    ? 'border-indigo-500/60 ring-1 ring-indigo-500/30'
                    : 'border-slate-700/70 hover:border-slate-600'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  {/* Left: Avatar + Title */}
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shadow-md shrink-0 ${meta.gradient}`}
                    >
                      <span className="text-slate-950 font-black text-base">{meta.letter}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-200 transition-colors">
                          {meta.name}
                        </h3>
                        <span className="text-xs text-slate-400 hidden xs:inline">
                          ({meta.englishName})
                        </span>
                        {isLowest && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                            Foco de Melhoria
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                        {meta.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Right: Score + Badge + Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${classification.badgeClass}`}>
                      {classification.label}
                    </span>

                    <div className="text-right min-w-[70px]">
                      <span className="text-2xl font-black text-white">{score.toFixed(1)}</span>
                      <span className="text-xs font-medium text-slate-400">/10</span>
                    </div>

                    <button
                      onClick={() => onOpenTipsForPillar(key)}
                      className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/80 transition-colors cursor-pointer"
                      title={`Ver dicas práticas para ${meta.name}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Animated Horizontal Progress Bar */}
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700/40">
                  <div
                    className={`h-full ${meta.gradient} transition-all duration-700 rounded-full`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Personalized Scientific Verdict (Exact adaptation of app.js verdict) */}
      <div className="bg-slate-800/90 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-xl mb-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-1">
            <Sparkles className="w-6 h-6 text-indigo-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Diagnóstico Personalizado
              </span>
              <span className="text-xs text-slate-400">• Modelo Martin Seligman</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              {verdictData.title}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-4">
              "{verdictData.verdict}"
            </p>

            <div className="bg-slate-900/70 border border-slate-700/60 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-xs sm:text-sm font-semibold text-white block">
                  Ação Recomendada Imediata:
                </strong>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                  {verdictData.shortAdvice}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenTipsForPillar(verdictData.focusPillar)}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Explorar Dicas de {lowestInfo.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer (Print / Screenshot, Retake, etc) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-800 no-print">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4 text-slate-400" />
          <span>Imprimir ou Salvar PDF</span>
        </button>

        <button
          onClick={onRetake}
          className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-700 hover:bg-slate-600 flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Refazer Questionário</span>
        </button>
      </div>
    </div>
  );
};
