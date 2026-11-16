import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, HelpCircle, LayoutGrid, Eye, Sparkles } from 'lucide-react';
import { Question } from '../types/perma';

interface QuizScreenProps {
  questions: Question[];
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onLoadDemo?: () => void;
}

const LIKERT_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  answers,
  onAnswer,
  onSubmit,
  onCancel,
  onLoadDemo
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'step' | 'list'>('step');
  const [validationError, setValidationError] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const advanceTimerRef = useRef<number | null>(null);

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
    };
  }, []);

  // Keyboard navigation in step mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'step') return;
      if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, viewMode, totalQuestions]);

  const handleSelectValue = (questionId: string, value: number, autoAdvance = true) => {
    onAnswer(questionId, value);
    if (validationError) setValidationError('');

    if (autoAdvance && viewMode === 'step' && currentIndex < totalQuestions - 1) {
      if (advanceTimerRef.current) {
        window.clearTimeout(advanceTimerRef.current);
      }
      advanceTimerRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
        setShowExplanation(false);
      }, 280);
    }
  };

  const handleFinalSubmit = () => {
    if (answeredCount < totalQuestions) {
      const missing = totalQuestions - answeredCount;
      setValidationError(
        `Faltam ${missing} questão(ões) para concluir. Responda a todos os 23 itens na escala de 0 a 10 para calcular suas médias oficiais com precisão.`
      );
      const firstUnansweredIndex = questions.findIndex((q) => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1) {
        if (viewMode === 'step') {
          setCurrentIndex(firstUnansweredIndex);
        } else {
          const el = document.getElementById(`question-${questions[firstUnansweredIndex].id}`);
          el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
      return;
    }
    onSubmit();
  };

  const renderScaleButtons = (q: Question, autoAdvance: boolean) => {
    const selectedVal = answers[q.id];
    return (
      <div>
        <div
          className="grid grid-cols-6 sm:grid-cols-11 gap-1.5 sm:gap-2"
          role="radiogroup"
          aria-label={`Escala de 0 a 10 para a questão ${q.number}`}
        >
          {LIKERT_VALUES.map((val) => {
            const isSelected = selectedVal === val;
            return (
              <button
                key={val}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleSelectValue(q.id, val, autoAdvance)}
                className={`min-h-[44px] rounded-xl font-bold text-sm sm:text-base tabular-nums transition-all duration-150 cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 dark:border-indigo-400 text-white shadow-lg shadow-indigo-600/25 scale-[1.03]'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900 dark:bg-slate-900/70 dark:border-slate-700/80 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-500 dark:hover:text-white'
                }`}
              >
                {val}
              </button>
            );
          })}
        </div>

        {/* Semantic anchors */}
        <div className="mt-2.5 flex items-center justify-between text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 px-0.5 gap-2">
          <span className="text-left font-medium">
            0 · {q.anchorMin}
          </span>
          <span className="text-center hidden sm:inline text-slate-400 dark:text-slate-500">
            5 · {q.anchorMid}
          </span>
          <span className="text-right font-medium">
            10 · {q.anchorMax}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      {/* Top Progress Header */}
      <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 mb-6 shadow-md dark:shadow-xl">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Voltar ao início"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block">
                PERMA-Profiler Oficial · Escala Likert 0–10
              </span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tabular-nums">
                {answeredCount} de {totalQuestions} respondidas ({progressPercent}%)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLoadDemo && (
              <button
                type="button"
                onClick={onLoadDemo}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 dark:text-indigo-300 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:border-indigo-500/30 transition-colors cursor-pointer whitespace-nowrap"
                title="Pular e ver relatório oficial com dados de exemplo"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Ver Exemplo</span>
              </button>
            )}

            {/* Segmented View Toggle */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode('step')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'step'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
                title="Visualizar uma questão por vez"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Foco</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
                title="Visualizar todas as 23 questões em lista"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Lista</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 23-Item Navigation Grid */}
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-1 sm:gap-1.5 flex-wrap">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex && viewMode === 'step';
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowExplanation(false);
                  if (viewMode === 'list') {
                    const el = document.getElementById(`question-${q.id}`);
                    el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-semibold tabular-nums flex items-center justify-center transition-colors cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 bg-indigo-600 text-white'
                    : isAnswered
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30 dark:hover:bg-emerald-500/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200'
                }`}
                title={`Questão ${q.number}`}
              >
                {q.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Validation Banner */}
      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 dark:bg-rose-500/10 dark:border-rose-500/30 flex items-start gap-3 text-rose-800 dark:text-rose-200 text-sm">
          <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Atenção</p>
            <p className="text-xs sm:text-sm text-rose-700 dark:text-rose-300 mt-0.5">{validationError}</p>
          </div>
        </div>
      )}

      {/* Step Mode */}
      {viewMode === 'step' && (
        <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg dark:shadow-2xl">
          {/* Neutral unboxed metadata line */}
          <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="font-medium tabular-nums">
              Questão {currentQuestion.number} de {totalQuestions} · Escala de 0 a 10
            </span>
            {answers[currentQuestion.id] !== undefined && (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                Selecionado: {answers[currentQuestion.id]}/10
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-7 leading-snug">
            {currentQuestion.text}
          </h3>

          {/* 0–10 Likert Selector */}
          <div className="mb-6">{renderScaleButtons(currentQuestion, true)}</div>

          {/* Optional explanation (keeps subscale hidden until user wants context) */}
          <div className="mb-6 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowExplanation(!showExplanation)}
              className="text-xs text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1.5 font-medium cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showExplanation ? 'Ocultar contexto científico' : 'Sobre este item'}</span>
            </button>
            {showExplanation && (
              <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/70 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                <strong className="text-indigo-700 dark:text-indigo-300">{currentQuestion.subscaleName}:</strong>{' '}
                {currentQuestion.explanation}
              </p>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
                setShowExplanation(false);
              }}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => {
                  setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
                  setShowExplanation(false);
                }}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Próxima</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Calcular Relatório PERMA</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* List Mode */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {questions.map((q) => {
            const val = answers[q.id];
            return (
              <div
                key={q.id}
                id={`question-${q.id}`}
                className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm dark:shadow-md"
              >
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-semibold tabular-nums">
                    Questão {q.number} de {totalQuestions}
                  </span>
                  <span className={`font-semibold tabular-nums ${val !== undefined ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
                    {val !== undefined ? `Nota: ${val}/10` : 'Pendente'}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
                  {q.text}
                </h4>

                {renderScaleButtons(q, false)}
              </div>
            );
          })}

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl transition-colors flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Finalizar e Calcular Meu PERMA-Profiler</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
