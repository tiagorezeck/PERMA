import React from 'react';
import { X, History, Trash2, Calendar, ArrowRight, Award } from 'lucide-react';
import { AssessmentRecord, PillarKey } from '../types/perma';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
              <History className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Histórico de Avaliações
              </h2>
              <p className="text-xs text-slate-400">
                Acompanhe a evolução do seu florescimento no tempo
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
                <History className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-300">
                Nenhuma avaliação anterior registrada
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Assim que você completar o questionário PERMA pela primeira vez, seus resultados ficarão salvos aqui para comparação.
              </p>
            </div>
          ) : (
            history.map((item) => {
              const lowestMeta = PILLARS_INFO[item.lowestPillar];
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectRecord(item);
                    onClose();
                  }}
                  className="bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-xl p-4 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs font-semibold text-slate-300">
                        {item.date}
                      </span>
                      {item.email && (
                        <span className="text-[11px] text-slate-400">
                          • {item.email}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-medium">
                        P: {item.scores.pos.toFixed(1)}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-medium">
                        E: {item.scores.eng.toFixed(1)}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-medium">
                        R: {item.scores.rel.toFixed(1)}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-medium">
                        M: {item.scores.mea.toFixed(1)}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-medium">
                        A: {item.scores.acc.toFixed(1)}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
                      <span>Foco:</span>
                      <span className={`font-semibold ${lowestMeta?.textColor || 'text-indigo-400'}`}>
                        {lowestMeta?.name || item.lowestPillar}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xl font-bold text-white block">
                        {item.scores.overall.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-400">Média Geral</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-800/40 flex items-center justify-between">
          {history.length > 0 ? (
            <button
              onClick={onClearHistory}
              className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar histórico</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-700 transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
