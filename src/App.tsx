/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { TipsModal } from './components/TipsModal';
import { AboutModal } from './components/AboutModal';
import { HistoryModal } from './components/HistoryModal';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { PERMA_QUESTIONS } from './data/questions';
import { PermaScores, TipsCategoryKey, AssessmentRecord } from './types/perma';
import { DEMO_PROFILES } from './data/demoProfiles';
import { calculateOfficialPermaScores, normalizeScoresRecord } from './utils/scoring';

const STORAGE_KEY_HISTORY_V2 = 'euphoria_check_perma_history_v2';
const STORAGE_KEY_HISTORY_V1 = 'euphoria_check_perma_history_v1';
const STORAGE_KEY_EMAIL = 'euphoria_check_perma_email_v1';
const STORAGE_KEY_THEME = 'euphoria_check_theme_v1';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_THEME) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'result'>('home');
  const [userEmail, setUserEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentScores, setCurrentScores] = useState<PermaScores | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [activeDemoId, setActiveDemoId] = useState<string>('flow_challenge');

  // Modals state
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [activeTipsPillar, setActiveTipsPillar] = useState<TipsCategoryKey>('pos');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false);

  // History state
  const [history, setHistory] = useState<AssessmentRecord[]>([]);

  // Sync theme class with document root and localStorage
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem(STORAGE_KEY_THEME, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Load history (migrating any v1 records safely) & email on mount
  useEffect(() => {
    try {
      const savedV2 = localStorage.getItem(STORAGE_KEY_HISTORY_V2);
      if (savedV2) {
        const parsed = JSON.parse(savedV2) as AssessmentRecord[];
        setHistory(
          parsed.map((rec) => ({
            ...rec,
            version: rec.version || 'perma-profiler-23',
            scores: normalizeScoresRecord(rec.scores)
          }))
        );
      } else {
        const savedV1 = localStorage.getItem(STORAGE_KEY_HISTORY_V1);
        if (savedV1) {
          const parsedV1 = JSON.parse(savedV1) as Partial<AssessmentRecord>[];
          const migrated: AssessmentRecord[] = parsedV1.map((rec, idx) => {
            const normalized = normalizeScoresRecord(rec.scores || {});
            return {
              id: rec.id || `legacy-${idx}`,
              email: rec.email || '',
              date: rec.date || '',
              version: 'legacy',
              scores: normalized,
              lowestPillar: rec.lowestPillar || normalized.lowestPillar
            };
          });
          setHistory(migrated);
        }
      }

      const savedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleStartQuiz = (email: string) => {
    setUserEmail(email);
    setIsDemoMode(false);
    if (email) {
      try {
        localStorage.setItem(STORAGE_KEY_EMAIL, email);
      } catch {
        // ignore
      }
    }
    setAnswers({});
    setCurrentScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadDemo = (profileId?: string) => {
    const targetId = profileId || 'flow_challenge';
    const profile = DEMO_PROFILES.find((p) => p.id === targetId) || DEMO_PROFILES[0];

    setActiveDemoId(profile.id);
    setIsDemoMode(true);
    setCurrentScores(profile.scores);
    if (!userEmail) {
      setUserEmail(profile.email);
    }
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnswerQuestion = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleQuizSubmit = () => {
    setIsDemoMode(false);
    const scores = calculateOfficialPermaScores(answers);
    setCurrentScores(scores);

    const newRecord: AssessmentRecord = {
      id: Date.now().toString(),
      email: userEmail,
      date: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      version: 'perma-profiler-23',
      scores,
      lowestPillar: scores.lowestPillar
    };

    const updatedHistory = [newRecord, ...history].slice(0, 20);
    setHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY_V2, JSON.stringify(updatedHistory));
    } catch {
      // ignore
    }

    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTipsForPillar = (category: TipsCategoryKey) => {
    setActiveTipsPillar(category);
    setIsTipsOpen(true);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY_V2);
      localStorage.removeItem(STORAGE_KEY_HISTORY_V1);
    } catch {
      // ignore
    }
  };

  const handleSelectHistoryRecord = (record: AssessmentRecord) => {
    setIsDemoMode(false);
    setCurrentScores(normalizeScoresRecord(record.scores));
    if (record.email) setUserEmail(record.email);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        currentScreen={currentScreen}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenTips={() => {
          setActiveTipsPillar('pos');
          setIsTipsOpen(true);
        }}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLoadDemo={() => handleLoadDemo()}
        onReset={() => {
          setIsDemoMode(false);
          setCurrentScreen('home');
        }}
      />

      <main className="flex-1">
        {currentScreen === 'home' && (
          <HeroLanding
            defaultEmail={userEmail}
            onStartQuiz={handleStartQuiz}
            onOpenAbout={() => setIsAboutOpen(true)}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {currentScreen === 'quiz' && (
          <QuizScreen
            questions={PERMA_QUESTIONS}
            answers={answers}
            onAnswer={handleAnswerQuestion}
            onSubmit={handleQuizSubmit}
            onCancel={() => setCurrentScreen('home')}
            onLoadDemo={() => handleLoadDemo()}
          />
        )}

        {currentScreen === 'result' && currentScores && (
          <ResultScreen
            scores={currentScores}
            answers={!isDemoMode && Object.keys(answers).length > 0 ? answers : undefined}
            userEmail={userEmail}
            isDemo={isDemoMode}
            activeDemoId={activeDemoId}
            onSwitchDemo={handleLoadDemo}
            onRetake={() => {
              setIsDemoMode(false);
              setAnswers({});
              setCurrentScreen('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenTipsForPillar={handleOpenTipsForPillar}
            onOpenEmailPreview={() => setIsEmailPreviewOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-900 bg-white/80 dark:bg-slate-950/80 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 dark:text-slate-400 no-print">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="font-semibold text-slate-800 dark:text-slate-300">
              Euphoria Check · Medidor Científico PERMA-Profiler (23 Itens)
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">
              Metodologia Butler & Kern (2016) · Modelo do Dr. Martin Seligman
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Metodologia Oficial
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                setActiveTipsPillar('pos');
                setIsTipsOpen(true);
              }}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
            >
              Guias de Bem-Estar
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <TipsModal
        initialPillar={activeTipsPillar}
        isOpen={isTipsOpen}
        onClose={() => setIsTipsOpen(false)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <HistoryModal
        history={history}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        onSelectRecord={handleSelectHistoryRecord}
        onClearHistory={handleClearHistory}
      />

      {currentScores && (
        <EmailPreviewModal
          scores={currentScores}
          userEmail={userEmail}
          isOpen={isEmailPreviewOpen}
          onClose={() => setIsEmailPreviewOpen(false)}
        />
      )}
    </div>
  );
}
