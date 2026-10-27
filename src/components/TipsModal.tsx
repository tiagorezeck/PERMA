import React, { useState } from 'react';
import { X, CheckCircle2, Lightbulb, Smile, Flame, Users, Compass, Award, ExternalLink } from 'lucide-react';
import { PillarKey } from '../types/perma';
import { PILLARS_INFO } from '../data/tips';

interface TipsModalProps {
  initialPillar?: PillarKey;
  isOpen: boolean;
  onClose: () => void;
}

export const TipsModal: React.FC<TipsModalProps> = ({
  initialPillar = 'pos',
  isOpen,
  onClose
}) => {
  const [selectedPillar, setSelectedPillar] = useState<PillarKey>(initialPillar);

  // Sync if initialPillar changes
  React.useEffect(() => {
    if (initialPillar) {
      setSelectedPillar(initialPillar);
    }
  }, [initialPillar]);

  if (!isOpen) return null;

  const currentInfo = PILLARS_INFO[selectedPillar];

  const pillarButtons: { key: PillarKey; letter: string; label: string; icon: React.ReactNode }[] = [
    { key: 'pos', letter: 'P', label: 'Emoções Positivas', icon: <Smile className="w-4 h-4" /> },
    { key: 'eng', letter: 'E', label: 'Engajamento', icon: <Flame className="w-4 h-4" /> },
    { key: 'rel', letter: 'R', label: 'Relacionamentos', icon: <Users className="w-4 h-4" /> },
    { key: 'mea', letter: 'M', label: 'Sentido / Propósito', icon: <Compass className="w-4 h-4" /> },
    { key: 'acc', letter: 'A', label: 'Realização', icon: <Award className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Guia de Estratégias & Dicas Práticas
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Caminhos testados cientificamente para elevar seu bem-estar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-800 overflow-x-auto p-2 gap-1.5 bg-slate-900/90 shrink-0">
          {pillarButtons.map((btn) => {
            const isActive = selectedPillar === btn.key;
            return (
              <button
                key={btn.key}
                onClick={() => setSelectedPillar(btn.key)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{btn.icon}</span>
                <span>{btn.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-left">
          {/* Pillar Banner */}
          <div className={`p-5 rounded-2xl border ${currentInfo.bgLight} border-opacity-40`}>
            <div className="flex items-center gap-3 mb-2">
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm ${currentInfo.gradient}`}>
                {currentInfo.letter}
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">
                  Pilar {currentInfo.letter}: {currentInfo.name} ({currentInfo.englishName})
                </h3>
                <p className="text-xs text-slate-300">
                  {currentInfo.tagline}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed">
              {currentInfo.description}
            </p>
          </div>

          {/* Action Points / Tips Sections */}
          <div className="space-y-4">
            {currentInfo.tips.map((tipGroup, idx) => (
              <div
                key={idx}
                className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 sm:p-5"
              >
                <h4 className="text-sm sm:text-base font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span>{tipGroup.title}</span>
                </h4>
                <ul className="space-y-2.5">
                  {tipGroup.points.map((point, ptIdx) => (
                    <li key={ptIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Daily Micro-Habit Callout */}
          <div className="bg-indigo-950/40 border border-indigo-700/40 rounded-xl p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-xs sm:text-sm font-semibold text-indigo-200 block">
                Regra de Ouro da Psicologia Positiva:
              </strong>
              <p className="text-xs sm:text-sm text-indigo-300/90 mt-0.5">
                Não tente mudar todos os seus hábitos de uma só vez. Escolha apenas UMA ação simples desta lista e pratique com consistência por 7 dias consecutivos. A consistência gera novos caminhos neuronais de satisfação.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-800/40 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            Baseado no Modelo do Dr. Martin Seligman
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-colors cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
