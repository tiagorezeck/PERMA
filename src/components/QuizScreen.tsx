import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, HelpCircle, LayoutGrid, Eye, Sparkles } from 'lucide-react';
import { Question } from '../types/perma';
import { PILLARS_INFO } from '../data/tips';

interface QuizScreenProps {
  questions: Question[];
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onLoadDemo?: () => void;
}

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

  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const currentQuestion = questions[currentIndex];
  const pillarMeta = PILLARS_INFO[currentQuestion.pillar];

  // Keyboard navigation for step mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode !== 'step') return;

      if (e.key === '1') {
        const opt = currentQuestion.options[0];
        if (opt) {
          handleSelectOption(currentQuestion.id, opt.value);
        }
      } else if (e.key === '2') {
        const opt = currentQuestion.options[1];
        if (opt) {
          handleSelectOption(currentQuestion.id, opt.value);
        }
      } else if (e.key === 'ArrowRight' && currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((prev) => prev - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQuestion, viewMode, totalQuestions]);

  const handleSelectOption = (questionId: string, value: number) => {
    onAnswer(questionId, value);
    if (validationError) setValidationError('');

    // In step mode, auto advance after 250ms for great fluid UX if not last question
    if (viewMode === 'step' && currentIndex < totalQuestions - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
      }, 250);
    }
  };

  const handleFinalSubmit = () => {
    if (answeredCount < totalQuestions) {
      setValidationError(
        `Faltam ${totalQuestions - answeredCount} questão(ões) para você responder. Por favor, complete todas as perguntas para calcular sua pontuação PERMA com precisão científica.`
      );
      // Auto-jump to first unanswered in step mode
      const firstUnansweredIndex = questions.findIndex((q) => answers[q.id] === undefined);
      if (firstUnansweredIndex !== -1 && viewMode === 'step') {
        setCurrentIndex(firstUnansweredIndex);
      }
      return;
    }
    onSubmit();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Top Header & Progress */}
      <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-4 sm:p-5 mb-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              title="Voltar ao início"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Questionário de Bem-Estar
              </span>
              <h2 className="text-sm sm:text-base font-bold text-white">
                Progresso: {answeredCount} de {totalQuestions} respondidas ({progressPercent}%)
              </h2>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {onLoadDemo && (
              <button
                type="button"
                onClick={onLoadDemo}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all cursor-pointer"
                title="Pular e ver relatório com dados de exemplo"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ver Exemplo de Relatório</span>
              </button>
            )}

            {/* Toggle view mode */}
            <div className="flex items-center bg-slate-900/80 border border-slate-700 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setViewMode('step')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'step'
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Visualizar uma pergunta por vez"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Foco</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Visualizar todas as perguntas em lista"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Lista</span>
              </button>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Selector Quick Grid */}
        <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between gap-1 overflow-x-auto py-1">
          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentIndex && viewMode === 'step';
              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    if (viewMode === 'list') {
                      const el = document.getElementById(`question-${q.id}`);
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    isCurrent
                      ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white shadow-md'
                      : isAnswered
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                      : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}
                  title={`Questão ${idx + 1}: ${q.pillarName}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Validation alert banner */}
      {validationError && (
        <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-rose-200">Atenção!</p>
            <p className="text-xs sm:text-sm mt-0.5">{validationError}</p>
          </div>
        </div>
      )}

      {/* Step View Mode */}
      {viewMode === 'step' && (
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {/* Pillar Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${pillarMeta.bgLight}`}
              >
                Pilar {pillarMeta.letter}: {currentQuestion.pillarName}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                • {currentQuestion.category}
              </span>
            </div>

            <span className="text-xs font-bold text-slate-400 bg-slate-900/60 px-2.5 py-1 rounded-md">
              {currentIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 leading-snug">
            {currentQuestion.text}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                  className={`w-full p-4 sm:p-5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 ring-2 ring-indigo-500/50 text-white shadow-lg shadow-indigo-950/40'
                      : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:border-slate-500 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                      }`}
                    >
                      {optIdx + 1}
                    </span>
                    <span className="text-base sm:text-lg font-medium">
                      {option.label}
                    </span>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-indigo-400 bg-indigo-500'
                        : 'border-slate-600 group-hover:border-slate-400'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Context / Explanation toggler */}
          {currentQuestion.explanation && (
            <div className="mb-6 pt-3 border-t border-slate-700/50">
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5 font-medium cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>{showExplanation ? 'Ocultar explicação' : 'Por que fazemos esta pergunta?'}</span>
              </button>
              {showExplanation && (
                <p className="mt-2 text-xs text-slate-400 bg-slate-900/60 p-3 rounded-lg border border-slate-700/40 leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              )}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-300 bg-slate-900/80 border border-slate-700 hover:bg-slate-700 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1))}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Próxima</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Calcular Meu PERMA Score</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* List View Mode (All questions in one page) */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {questions.map((q, idx) => {
            const pMeta = PILLARS_INFO[q.pillar];
            return (
              <div
                key={q.id}
                id={`question-${q.id}`}
                className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-md transition-all"
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${pMeta.bgLight}`}>
                    {q.number}. {q.pillarName}
                  </span>
                  <span className="text-xs text-slate-400">
                    {answers[q.id] !== undefined ? 'Respondida' : 'Pendente'}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold text-white mb-4">
                  {q.text}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = answers[q.id] === opt.value;
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.value)}
                        className={`p-3 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600/20 border-indigo-500 text-white font-semibold'
                            : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <span>{opt.label}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-indigo-400 bg-indigo-500' : 'border-slate-600'
                          }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={handleFinalSubmit}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Finalizar e Calcular Meu PERMA Score</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
