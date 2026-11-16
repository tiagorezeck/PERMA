import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Lightbulb, Smile, Flame, Users, Compass, Award, HeartPulse } from 'lucide-react';
import { TipsCategoryKey } from '../types/perma';
import { PILLARS_INFO } from '../data/tips';

interface TipsModalProps {
  initialPillar?: TipsCategoryKey;
  isOpen: boolean;
  onClose: () => void;
}

export const TipsModal: React.FC<TipsModalProps> = ({
  initialPillar = 'pos',
  isOpen,
  onClose
}) => {
  const [selectedPillar, setSelectedPillar] = useState<TipsCategoryKey>(initialPillar);

  useEffect(() => {
    if (initialPillar) {
      setSelectedPillar(initialPillar);
    }
  }, [initialPillar]);

  if (!isOpen) return null;

  const currentInfo = PILLARS_INFO[selectedPillar] || PILLARS_INFO.pos;

  const pillarButtons: { key: TipsCategoryKey; label: string; icon: React.ReactNode }[] = [
    { key: 'pos', label: 'Emoções Positivas', icon: <Smile className="w-4 h-4" /> },
    { key: 'eng', label: 'Engajamento', icon: <Flame className="w-4 h-4" /> },
    { key: 'rel', label: 'Relacionamentos', icon: <Users className="w-4 h-4" /> },
    { key: 'mea', label: 'Sentido', icon: <Compass className="w-4 h-4" /> },
    { key: 'acc', label: 'Realização', icon: <Award className="w-4 h-4" /> },
    { key: 'regulation', label: 'Regulação & Saúde', icon: <HeartPulse className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 dark:bg-amber-500/15 dark:border-amber-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Guia Prático Baseado em Evidências
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Estratégias da Psicologia Positiva para os 5 pilares e regulação emocional
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto p-2 gap-1.5 bg-slate-50 dark:bg-slate-950/60 shrink-0">
          {pillarButtons.map((btn) => {
            const isActive = selectedPillar === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => setSelectedPillar(btn.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-5 text-left">
          <div className={`p-5 rounded-2xl border ${currentInfo.bgLight}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-2.5 h-8 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xs ${currentInfo.gradient}`}>
                {currentInfo.letter}
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {currentInfo.name} · {currentInfo.englishName}
                </h3>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  {currentInfo.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 mt-2 leading-relaxed">
              {currentInfo.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentInfo.tips.map((tipGroup, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5"
              >
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3">
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
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Modelo PERMA · Dr. Martin Seligman & Butler/Kern
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:text-white dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
