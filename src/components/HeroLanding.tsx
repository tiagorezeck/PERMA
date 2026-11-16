import React, { useState } from 'react';
import { ArrowRight, Mail, Sparkles, HeartHandshake, ShieldCheck, Eye } from 'lucide-react';
import { CORE_PILLARS_LIST } from '../data/tips';
import { DEMO_PROFILES } from '../data/demoProfiles';

interface HeroLandingProps {
  onStartQuiz: (email: string) => void;
  onOpenAbout: () => void;
  onLoadDemo: (profileId?: string) => void;
  defaultEmail?: string;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStartQuiz,
  onOpenAbout,
  onLoadDemo,
  defaultEmail = ''
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email.trim())) {
        setEmailError('Por favor, informe um formato de e-mail válido (exemplo: voce@email.com).');
        return;
      }
    }
    setEmailError('');
    onStartQuiz(email.trim());
  };

  return (
    <div className="relative py-8 sm:py-12 lg:py-16 overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-600/15 dark:via-purple-600/15 dark:to-pink-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Split on Notebook/Desktop, stacked cleanly on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Editorial Intro */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <p className="text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-300 mb-3">
              Psicologia Positiva · Instrumento Validado PERMA-Profiler (23 Itens)
            </p>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight text-balance">
              Euphoria Check
              <span className="block mt-2 text-2xl sm:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
                Medidor Científico PERMA-Profiler
              </span>
            </h1>

            <p className="max-w-2xl mx-auto lg:mx-0 text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              Avalie seu florescimento humano pela metodologia oficial de{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">Butler & Kern (2016)</strong> na escala contínua de{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">0 a 10</strong>, medindo os 5 pilares de Martin Seligman mais Saúde Física, Emoções Negativas e Solidão.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-600 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-none">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>100% Gratuito e Confidencial</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs dark:shadow-none">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Escala Contínua 0,0 – 10,0</span>
              </span>
            </div>
          </div>

          {/* Right: Main CTA Card */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl dark:shadow-2xl text-left">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Iniciar Avaliação Oficial
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                    23 questões em escala Likert (0 a 10) · Leva cerca de 4 minutos
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-600/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center shrink-0">
                  <HeartHandshake className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label htmlFor="user-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Seu e-mail para o resumo personalizado (opcional):
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="user-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      placeholder="voce@exemplo.com"
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  {emailError && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 mt-1.5">
                      {emailError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-lg shadow-indigo-500/25 dark:shadow-indigo-950/50 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Começar Questionário Oficial (23 Itens)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => onLoadDemo()}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 dark:text-indigo-300 dark:bg-indigo-950/50 dark:hover:bg-indigo-900/50 dark:border-indigo-700/50 dark:hover:border-indigo-500/80 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Eye className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Ver Resultado de Exemplo (Sem Fazer o Teste)</span>
                  </button>
                </div>
              </form>

              {/* Demo Profiles Quick Selector */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block mb-2">
                  Explore cenários de relatório na escala 0–10:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DEMO_PROFILES.map((prof) => (
                    <button
                      key={prof.id}
                      type="button"
                      onClick={() => onLoadDemo(prof.id)}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/70 dark:bg-slate-950/70 dark:hover:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/70 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors truncate">
                          {prof.name}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 tabular-nums shrink-0">
                          {prof.scores.overall.toFixed(1)}/10
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {prof.subtitle}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* 5 Pillars indicators */}
              <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">5 Pilares + 3 Indicadores:</span>
                <div className="flex items-center gap-1.5 text-xs font-bold">
                  <span title="P - Emoções Positivas" className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center">P</span>
                  <span title="E - Engajamento" className="w-7 h-7 rounded-lg bg-cyan-500 text-slate-950 flex items-center justify-center">E</span>
                  <span title="R - Relacionamentos" className="w-7 h-7 rounded-lg bg-rose-500 text-slate-950 flex items-center justify-center">R</span>
                  <span title="M - Sentido / Propósito" className="w-7 h-7 rounded-lg bg-purple-500 text-slate-950 flex items-center justify-center">M</span>
                  <span title="A - Realização" className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center">A</span>
                  <span className="text-slate-400 dark:text-slate-500 font-normal px-1">+</span>
                  <span title="Indicadores Complementares: Emoções Negativas, Saúde Física e Solidão" className="px-2 h-7 rounded-lg bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 flex items-center justify-center text-[11px]">
                    N · H · Solidão
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Pillars Cards spanning full notebook width */}
        <div className="text-left mt-12 lg:mt-16 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                Os 5 Pilares do Bem-Estar PERMA
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Cada pilar é mensurado por 3 itens validados e calculado pela média exata de 0,0 a 10,0.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenAbout}
              className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold inline-flex items-center gap-1 group self-start sm:self-auto cursor-pointer"
            >
              <span>Metodologia científica</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CORE_PILLARS_LIST.map((pillar) => (
              <div
                key={pillar.key}
                className="bg-white hover:bg-slate-50 dark:bg-slate-900/70 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 transition-colors shadow-xs dark:shadow-none"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-slate-950 shrink-0 ${pillar.gradient}`}>
                    {pillar.letter}
                  </span>
                  <span className={`text-sm font-bold ${pillar.textColor}`}>
                    {pillar.name}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.tagline}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Citation Footer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 text-center">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            100% Gratuito e Confidencial (dados ficam no seu navegador)
          </span>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-600">·</span>
          <span>
            Butler & Kern (2016) · Adaptação Brasileira: Carvalho, Aquino & Natividade
          </span>
        </div>
      </div>
    </div>
  );
};
