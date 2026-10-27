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

  const plainTextSummary = `🌟 Euphoria Check - Seu Relatório PERMA 🌟

Destinatário: ${targetEmail}
Data: ${new Date().toLocaleDateString('pt-BR')}

Seus Resultados no Modelo PERMA (0 a 10):
- Emoções Positivas (P): ${scores.pos.toFixed(1)} / 10
- Engajamento (E): ${scores.eng.toFixed(1)} / 10
- Relacionamentos (R): ${scores.rel.toFixed(1)} / 10
- Sentido / Propósito (M): ${scores.mea.toFixed(1)} / 10
- Realização (A): ${scores.acc.toFixed(1)} / 10

Média Geral de Bem-Estar: ${scores.overall.toFixed(1)} / 10

Diagnóstico Personalizado:
${verdictData.title}
"${verdictData.verdict}"

Ação Recomendada:
${verdictData.shortAdvice}

Gerado pelo Euphoria Check - Medidor PERMA (Baseado no Modelo do Dr. Martin Seligman).`;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Mail className="w-4 h-4 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Prévia do E-mail Personalizado
              </h2>
              <p className="text-xs text-slate-400">
                Modelo fiel ao envio automático do Euphoria Check
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

        {/* Email Canvas (Styled inspired by original repo's HTML template) */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-slate-950/50">
          <div className="bg-white text-slate-900 rounded-xl p-6 sm:p-8 shadow-xl border-t-6 border-indigo-600 font-sans text-center max-w-md mx-auto">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-3">
              <Sparkles className="w-6 h-6" />
            </div>

            <h1 className="text-2xl font-black text-indigo-600 mb-1 tracking-tight">
              Euphoria Check
            </h1>
            <p className="text-xs text-slate-500 mb-6">
              Relatório de Bem-Estar & Evolução Pessoal
            </p>

            <div className="text-left bg-slate-50 border border-slate-100 rounded-lg p-4 mb-5">
              <p className="text-xs text-slate-600 font-semibold mb-2">
                Suas Pontuações PERMA Calculadas:
              </p>
              <div className="space-y-1.5 text-xs text-slate-800">
                <div className="flex justify-between">
                  <span>😊 Emoções Positivas (P):</span>
                  <strong>{scores.pos.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>🔥 Engajamento & Flow (E):</span>
                  <strong>{scores.eng.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>👥 Relacionamentos (R):</span>
                  <strong>{scores.rel.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>🧭 Sentido / Propósito (M):</span>
                  <strong>{scores.mea.toFixed(1)} / 10</strong>
                </div>
                <div className="flex justify-between">
                  <span>🏆 Realização (A):</span>
                  <strong>{scores.acc.toFixed(1)} / 10</strong>
                </div>
              </div>
            </div>

            <div className="text-left bg-indigo-50/60 border border-indigo-100 rounded-lg p-4 mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                {verdictData.title}
              </span>
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{verdictData.verdict}"
              </p>
            </div>

            <div className="inline-block bg-indigo-600 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md mb-4">
              Acesse suas Dicas de Evolução
            </div>

            <p className="text-[11px] text-slate-400 border-t border-slate-100 pt-3">
              Este e-mail foi gerado via Euphoria Check • Baseado na Psicologia Positiva de Martin Seligman
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-800/40 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copiar Texto</span>
                </>
              )}
            </button>

            <button
              onClick={handleSimulateSend}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Simular Envio</span>
            </button>
          </div>

          {sentNotice && (
            <span className="text-xs text-emerald-400 font-medium animate-fade-in">
              ✓ Notificação preparada para {targetEmail}!
            </span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
