import React, { useState } from 'react';
import { ArrowRight, Mail, Sparkles, HeartHandshake, Smile, Flame, Users, Compass, Award, ShieldCheck, Eye, PlayCircle } from 'lucide-react';
import { PILLARS_INFO } from '../data/tips';
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

  const pillarsList = Object.values(PILLARS_INFO);

  return (
    <div className="relative py-8 sm:py-12 md:py-16 overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold mb-6">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
          <span>Psicologia Positiva & Teoria do Florescimento Humano</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Euphoria Check
          <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            O seu Medidor Avançado de PERMA
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
          Avalie sua felicidade autêntica e descubra em quais dimensões você está florescendo e onde estão suas maiores oportunidades de crescimento pessoal, segundo a ciência do Dr. Martin Seligman.
        </p>

        {/* CTA Card (Faithful to Euphoria-Check index.ejs) */}
        <div className="max-w-xl mx-auto bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/50 mb-10 text-left">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Iniciar Avaliação PERMA</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Responda a 20 questões objetivas (leva cerca de 3 minutos).
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-indigo-400" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="user-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                Seu e-mail para relatório personalizado (opcional):
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
                  className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
              {emailError && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                  {emailError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Começar Meu Teste Agora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Demo Result Button (Requested by user to see report without taking test) */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onLoadDemo()}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm text-indigo-300 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/60 hover:border-indigo-500/80 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group"
              >
                <Eye className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span>Ver Resultado de Exemplo (Sem Fazer o Teste)</span>
              </button>
            </div>
          </form>

          {/* Demonstration Profiles Quick Selector */}
          <div className="mt-4 pt-4 border-t border-slate-700/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Ou explore perfis de demonstração prontos:
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DEMO_PROFILES.map((prof) => (
                <button
                  key={prof.id}
                  type="button"
                  onClick={() => onLoadDemo(prof.id)}
                  className="p-2.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-700/70 hover:border-indigo-500 text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {prof.name}
                    </span>
                    <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
                      {prof.scores.overall.toFixed(1)}/10
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {prof.subtitle}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Pillars avatar icons (from original index.ejs) */}
          <div className="mt-6 pt-5 border-t border-slate-700/60 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400 font-medium">Os 5 Pilares Avaliados:</span>
            <div className="flex items-center -space-x-1.5">
              <span title="P - Emoções Positivas" className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xs ring-2 ring-slate-800 shadow">P</span>
              <span title="E - Engajamento" className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 font-bold text-xs ring-2 ring-slate-800 shadow">E</span>
              <span title="R - Relacionamentos" className="w-8 h-8 rounded-full bg-rose-500 flex items-center justify-center text-slate-950 font-bold text-xs ring-2 ring-slate-800 shadow">R</span>
              <span title="M - Sentido / Propósito" className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-slate-950 font-bold text-xs ring-2 ring-slate-800 shadow">M</span>
              <span title="A - Realização" className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-xs ring-2 ring-slate-800 shadow">A</span>
            </div>
          </div>
        </div>

        {/* 5 Pillars Quick Cards */}
        <div className="text-left mt-14 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Como Funciona a Teoria do Bem-Estar PERMA?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Criado por Martin Seligman, o modelo avalia 5 elementos indispensáveis para a felicidade autêntica.
              </p>
            </div>
            <button
              onClick={onOpenAbout}
              className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>Saiba mais sobre a teoria</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {pillarsList.map((pillar) => {
              const iconsMap: Record<string, React.ReactNode> = {
                Smile: <Smile className="w-5 h-5" />,
                Flame: <Flame className="w-5 h-5" />,
                Users: <Users className="w-5 h-5" />,
                Compass: <Compass className="w-5 h-5" />,
                Award: <Award className="w-5 h-5" />
              };

              return (
                <div
                  key={pillar.key}
                  className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 rounded-xl p-4 transition-all hover:border-slate-600"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white ${pillar.gradient}`}>
                      {pillar.letter}
                    </span>
                    <span className={`text-sm font-bold ${pillar.textColor}`}>
                      {pillar.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.tagline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust & Scientific Citation Footer */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            100% Gratuito, Seguro e Confidencial
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span>Baseado no livro <em>"Flourish: Uma Nova Compreensão Visionária da Felicidade e Bem-Estar"</em> (Dr. Martin Seligman)</span>
        </div>
      </div>
    </div>
  );
};
