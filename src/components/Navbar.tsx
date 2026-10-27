import React from 'react';
import { Sparkles, BookOpen, Lightbulb, History, RotateCcw } from 'lucide-react';

interface NavbarProps {
  onOpenAbout: () => void;
  onOpenTips: () => void;
  onOpenHistory: () => void;
  onLoadDemo: () => void;
  onReset: () => void;
  currentScreen: 'home' | 'quiz' | 'result';
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAbout,
  onOpenTips,
  onOpenHistory,
  onLoadDemo,
  onReset,
  currentScreen
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={onReset}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent">
                Euphoria Check
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Medidor PERMA
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden xs:block">
              Psicologia Positiva & Bem-Estar
            </p>
          </div>
        </button>

        {/* Action items */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Conheça o Modelo PERMA do Dr. Martin Seligman"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">O que é PERMA?</span>
          </button>

          <button
            onClick={onOpenTips}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Dicas e Estratégias para cada pilar"
          >
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">Dicas & Guias</span>
          </button>

          <button
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            title="Histórico de avaliações anteriores"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Histórico</span>
          </button>

          <button
            onClick={onLoadDemo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all cursor-pointer"
            title="Ver relatório de exemplo imediatamente sem fazer o teste"
          >
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Exemplo de Teste</span>
          </button>

          {currentScreen !== 'home' && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Voltar ao início"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden lg:inline">Reiniciar</span>
            </button>
          )}

          <div className="ml-1 pl-2 border-l border-slate-800 flex items-center text-xs text-slate-400 font-medium select-none">
            <span className="text-base mr-1">🇧🇷</span>
            <span className="hidden lg:inline text-slate-300">PT-BR</span>
          </div>
        </div>
      </div>
    </header>
  );
};
