import React, { useState } from 'react';
import { X, Mail, Copy, Check, Sparkles, Send } from 'lucide-react';
import { PermaScores } from '../types/perma';
import { getVerdictForScores } from '../data/verdicts';

interface EmailPreviewModalProps {
  scores: PermaScores;
  userEmail: string;
  isOpen: boolean;
  onClose: () => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  scores,
  userEmail,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);
  const [sentNotice, setSentNotice] = useState(false);

  if (!isOpen) return null;

  const verdictData = getVerdictForScores(scores);
  const targetEmail = userEmail || 'seuemail@exemplo.com';

  const plainTextSummary = `Euphoria Check · Relatório Oficial PERMA-Profiler (23 Itens)

Destinatário: ${targetEmail}
Data: ${new Date().toLocaleDateString('pt-BR')}

Índice Geral de Bem-Estar (16 itens): ${scores.overall.toFixed(1)} / 10,0
Felicidade Geral (Item 23): ${scores.happiness.toFixed(1)} / 10,0

Os 5 Pilares PERMA:
- Emoções Positivas (P): ${scores.pos.toFixed(1)} / 10
- Engajamento (E): ${scores.eng.toFixed(1)} / 10
- Relacionamentos (R): ${scores.rel.toFixed(1)} / 10
- Sentido / Propósito (M): ${scores.mea.toFixed(1)} / 10
- Realização (A): ${scores.acc.toFixed(1)} / 10

Indicadores Complementares:
- Emoções Negativas (N - menor é melhor): ${scores.neg.toFixed(1)} / 10
- Saúde Física (H): ${scores.health.toFixed(1)} / 10
- Solidão (menor é melhor): ${scores.loneliness.toFixed(1)} / 10

Diagnóstico Cruzado (${verdictData.patternLabel}):
${verdictData.title}
${verdictData.verdict}

Ação Recomendada:
${verdictData.shortAdvice}

Baseado no PERMA-Profiler (Butler & Kern, 2016).`;

  const handleCopy = () => {
    navigator.clipboard.writeText(plainTextSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateSend = () => {
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 dark:bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 dark:bg-indigo-500/15 dark:border-indigo-500/30 flex items-center justify-center">
              <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Prévia do Resumo por E-mail
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Relatório formatado com todas as subescalas oficiais
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

        {/* Email Canvas */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-100 dark:bg-slate-950/60">
          <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-xl border border-slate-200 font-sans text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-indigo-50 text-indigo-600 mb-3">
              <Sparkles className="w-5 h-5" />
            </div>

            <h1 className="text-2xl font-black text-indigo-600 mb-1 tracking-tight">
              Euphoria Check
            </h1>
            <p className="text-xs text-slate-500 mb-5">
              PERMA-Profiler Oficial · Bem-Estar Geral: <strong className="tabular-nums text-slate-800">{scores.overall.toFixed(1)}/10</strong>
            </p>

            <div className="text-left bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
              <p className="text-xs text-slate-600 font-bold mb-2">
                Os 5 Pilares PERMA (0–10):
              </p>
              <div className="space-y-1.5 text-xs text-slate-800 tabular-nums">
                <div className="flex justify-between">
                  <span>Emoções Positivas (P):</span>
                  <strong>{scores.pos.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>Engajamento & Flow (E):</span>
                  <strong>{scores.eng.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>Relacionamentos (R):</span>
                  <strong>{scores.rel.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>Sentido / Propósito (M):</span>
                  <strong>{scores.mea.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>Realização (A):</span>
                  <strong>{scores.acc.toFixed(1)} / 10</strong>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-bold mt-3 pt-3 border-t border-slate-200 mb-1.5">
                Indicadores Complementares:
              </p>
              <div className="space-y-1 text-xs text-slate-700 tabular-nums">
                <div className="flex justify-between">
                  <span>Emoções Negativas (N):</span>
                  <strong>{scores.neg.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>Saúde Física (H):</span>
                  <strong>{scores.health.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>Solidão:</span>
                  <strong>{scores.loneliness.toFixed(1)} / 10</strong>
                </div>
              </div>
            </div>

            <div className="text-left bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-5">
              <span className="text-[11px] font-bold text-indigo-700 block mb-1">
                {verdictData.title}
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {verdictData.verdict}
              </p>
            </div>

            <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              Euphoria Check · Baseado em Butler & Kern (2016)
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 dark:text-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>Copiar Relatório</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleSimulateSend}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Preparar Envio</span>
            </button>
          </div>

          {sentNotice && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Resumo pronto para {targetEmail}
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
