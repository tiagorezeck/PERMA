import React from 'react';
import { X, BookOpen, Sparkles } from 'lucide-react';
import { CORE_PILLARS_LIST } from '../data/tips';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 dark:bg-indigo-500/15 dark:border-indigo-500/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Metodologia Oficial PERMA-Profiler
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Butler & Kern (2016) · Modelo de Florescimento de Martin Seligman
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

        {/* Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-left">
          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
            <p>
              O <strong className="text-slate-900 dark:text-white">PERMA-Profiler</strong> foi desenvolvido por{' '}
              <strong className="text-slate-900 dark:text-white">Julie Butler e Margaret L. Kern (2016)</strong> na Universidade da Pensilvânia para operacionalizar a teoria do bem-estar do psicólogo{' '}
              <strong className="text-slate-900 dark:text-white">Dr. Martin Seligman</strong> (<em>Flourish</em>, 2011). No Brasil, recebeu adaptação e validação psicométrica por{' '}
              <strong className="text-slate-900 dark:text-white">Carvalho, Aquino & Natividade</strong>.
            </p>
            <p>
              O instrumento oficial possui <strong className="text-slate-900 dark:text-white">23 itens</strong> avaliados em escala contínua de <strong className="text-slate-900 dark:text-white">0 a 10</strong>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
              <li><strong className="text-slate-900 dark:text-white">15 itens centrais</strong>: 3 perguntas para cada um dos 5 pilares do PERMA.</li>
              <li><strong className="text-slate-900 dark:text-white">8 itens complementares</strong>: 3 de Emoções Negativas (N), 3 de Saúde Física (H), 1 de Solidão e 1 de Felicidade Geral.</li>
            </ul>
          </div>

          <div className="space-y-3">
            {CORE_PILLARS_LIST.map((pillar) => (
              <div
                key={pillar.key}
                className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-start gap-3.5"
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-slate-950 text-sm shrink-0 ${pillar.gradient}`}
                >
                  {pillar.letter}
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {pillar.name}{' '}
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                      · {pillar.englishName}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Cálculo das Médias e Interpretação</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              A pontuação de cada pilar é a média aritmética dos seus 3 itens (de 0,0 a 10,0). O Índice Geral de Bem-Estar corresponde à média dos 15 itens PERMA somados ao item 23 (16 itens). Já Emoções Negativas e Solidão são exibidas separadamente porque medir sofrimento à parte evita mascarar sinais de estresse por trás de conquistas profissionais.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-end">
          <button
            type="button"
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
