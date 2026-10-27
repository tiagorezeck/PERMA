import React from 'react';
import { X, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { PILLARS_INFO } from '../data/tips';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                O que é o Modelo PERMA?
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                A ciência do Florescimento Humano (Dr. Martin Seligman)
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

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-left">
          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 space-y-4">
            <p className="leading-relaxed">
              O <strong>Modelo PERMA</strong> foi desenvolvido pelo psicólogo norte-americano <strong>Dr. Martin E.P. Seligman</strong>, ex-presidente da Associação Americana de Psicologia (APA) e um dos fundadores da <strong>Psicologia Positiva</strong>.
            </p>

            <p className="leading-relaxed">
              Em seu aclamado livro <em>Flourish: Uma Nova Compreensão Visionária da Felicidade e Bem-Estar</em> (2011), Seligman reformulou a definição de felicidade. Segundo ele, o bem-estar genuíno não é apenas um "sorriso no rosto" ou a ausência de tristeza, mas uma construção multifacetada baseada em <strong>cinco pilares fundamentais</strong>:
            </p>
          </div>

          {/* Pillars List */}
          <div className="space-y-3">
            {Object.values(PILLARS_INFO).map((pillar) => (
              <div
                key={pillar.key}
                className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 flex items-start gap-3.5"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-slate-950 text-sm shrink-0 ${pillar.gradient}`}
                >
                  {pillar.letter}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
                    <span>{pillar.name}</span>
                    <span className="text-xs text-slate-400 font-normal">
                      ({pillar.englishName})
                    </span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Por que medir seu PERMA periodicamente?</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Diferente de traços rígidos de personalidade, o bem-estar psicológico é dinâmico e maleável. Ao monitorar seus índices no <strong>Euphoria Check</strong>, você ganha clareza sobre qual área da sua vida está desnutrida no momento e pode direcionar seus esforços com inteligência e autocompaixão.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-800/40 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
