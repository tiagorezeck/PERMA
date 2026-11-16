import React from 'react';
import { Sparkles, BookOpen, Lightbulb, History, RotateCcw, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenAbout: () => void;
  onOpenTips: () => void;
  onOpenHistory: () => void;
  onLoadDemo: () => void;
  onReset: () => void;
  currentScreen: 'home' | 'quiz' | 'result';
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  onOpenAbout,
  onOpenTips,
  onOpenHistory,
  onLoadDemo,
  onReset,
  currentScreen
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand */}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-700 to-indigo-600 dark:from-white dark:via-indigo-100 dark:to-indigo-300 bg-clip-text text-transparent">
                Euphoria Check
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/10 dark:text-indigo-400 dark:border-indigo-500/20">
                Medidor PERMA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden xs:block">
              Psicologia Positiva & Bem-Estar
            </p>
          </div>
        </button>

        {/* Action items */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={onOpenAbout}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Conheça o Modelo PERMA do Dr. Martin Seligman"
          >
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden md:inline">O que é PERMA?</span>
          </button>

          <button
            type="button"
            onClick={onOpenTips}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Dicas e Estratégias para cada pilar"
          >
            <Lightbulb className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span className="hidden md:inline">Dicas & Guias</span>
          </button>

          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Histórico de avaliações anteriores"
          >
            <History className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="hidden sm:inline">Histórico</span>
          </button>

          <button
            type="button"
            onClick={onLoadDemo}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 dark:text-indigo-300 dark:bg-indigo-500/10 dark:hover:bg-indigo-500/20 dark:border-indigo-500/30 transition-all cursor-pointer"
            title="Ver relatório de exemplo imediatamente sem fazer o teste"
          >
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden xs:inline">Exemplo de Teste</span>
            <span className="xs:hidden">Exemplo</span>
          </button>

          {currentScreen !== 'home' && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
              title="Voltar ao início"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden lg:inline">Reiniciar</span>
            </button>
          )}

          {/* Icon-only Theme Toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            title={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition-colors cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          <div className="hidden sm:flex ml-0.5 pl-2.5 border-l border-slate-200 dark:border-slate-800 items-center text-xs text-slate-500 dark:text-slate-400 font-medium select-none">
            <span className="text-base mr-1">🇧🇷</span>
            <span className="hidden lg:inline text-slate-700 dark:text-slate-300">PT-BR</span>
          </div>
        </div>
      </div>
    </header>
  );
};
