import React from 'react';
import { X, History, Trash2, Calendar, ArrowRight } from 'lucide-react';
import { AssessmentRecord } from '../types/perma';
import { PILLARS_INFO } from '../data/tips';

interface HistoryModalProps {
  history: AssessmentRecord[];
  isOpen: boolean;
  onClose: () => void;
  onSelectRecord: (record: AssessmentRecord) => void;
  onClearHistory: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  history,
  isOpen,
  onClose,
  onSelectRecord,
  onClearHistory
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-50 border border-cyan-200 dark:bg-cyan-500/15 dark:border-cyan-500/30 flex items-center justify-center">
              <History className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Histórico de Avaliações
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Acompanhe a evolução das suas médias ao longo do tempo
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-400 dark:text-slate-500">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300">
                Nenhuma avaliação registrada ainda
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Ao concluir os 23 itens do PERMA-Profiler, seus resultados ficam salvos aqui no navegador para comparação futura.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const lowestMeta = PILLARS_INFO[item.lowestPillar];
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectRecord(item);
                    onClose();
                  }}
                  className="w-full text-left bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-xl p-4 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="tabular-nums">{item.date}</span>
                      {item.version === 'legacy' && (
                        <span className="text-[11px] text-slate-500 font-normal">
                          · Formato anterior
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 mt-2 text-xs text-slate-700 dark:text-slate-300 font-medium tabular-nums flex-wrap">
                      <span>P: {item.scores.pos.toFixed(1)}</span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span>E: {item.scores.eng.toFixed(1)}</span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span>R: {item.scores.rel.toFixed(1)}</span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span>M: {item.scores.mea.toFixed(1)}</span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span>A: {item.scores.acc.toFixed(1)}</span>
                      <span className="text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-rose-600 dark:text-rose-300">N: {item.scores.neg.toFixed(1)}</span>
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                      Foco: <span className={`font-semibold ${lowestMeta?.textColor || 'text-indigo-600 dark:text-indigo-400'}`}>{lowestMeta?.name || item.lowestPillar}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums block">
                        {item.scores.overall.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">Geral</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          {history.length > 0 ? (
            <button
              type="button"
              onClick={onClearHistory}
              className="text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar histórico</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 border border-slate-200 dark:text-slate-200 dark:hover:text-white dark:bg-slate-800 dark:border-slate-700 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
