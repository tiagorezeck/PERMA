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
import { PermaScores, PillarKey, AssessmentRecord } from './types/perma';
import { DEMO_PROFILES } from './data/demoProfiles';

const STORAGE_KEY_HISTORY = 'euphoria_check_perma_history_v1';
const STORAGE_KEY_EMAIL = 'euphoria_check_perma_email_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'quiz' | 'result'>('home');
  const [userEmail, setUserEmail] = useState('');
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentScores, setCurrentScores] = useState<PermaScores | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [activeDemoId, setActiveDemoId] = useState<string>('flow_challenge');

  // Modals state
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [activeTipsPillar, setActiveTipsPillar] = useState<PillarKey>('pos');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isEmailPreviewOpen, setIsEmailPreviewOpen] = useState(false);

  // History state
  const [history, setHistory] = useState<AssessmentRecord[]>([]);

  // Load history & email on mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const savedEmail = localStorage.getItem(STORAGE_KEY_EMAIL);
      if (savedEmail) {
        setUserEmail(savedEmail);
      }
    } catch {
      // ignore
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

  const calculatePermaScores = (): PermaScores => {
    const a = answers['avalue'] ?? 0;
    const b = answers['bvalue'] ?? 0;
    const c = answers['cvalue'] ?? 0;
    const d = answers['dvalue'] ?? 0;

    const e = answers['evalue'] ?? 0;
    const f = answers['fvalue'] ?? 0;
    const g = answers['gvalue'] ?? 0;
    const h = answers['hvalue'] ?? 0;

    const i = answers['ivalue'] ?? 0;
    const j = answers['jvalue'] ?? 0;
    const k = answers['kvalue'] ?? 0;
    const l = answers['lvalue'] ?? 0;

    const m = answers['mvalue'] ?? 0;
    const n = answers['nvalue'] ?? 0;
    const o = answers['ovalue'] ?? 0;
    const p = answers['pvalue'] ?? 0;

    const q = answers['qvalue'] ?? 0;
    const r = answers['rvalue'] ?? 0;
    const s = answers['svalue'] ?? 0;
    const t = answers['tvalue'] ?? 0;

    // Formulas matching original repo app.js:
    const pos = (a + b + c + d) / 2;
    const eng = (e + f + g + h) / 2;
    const rel = (i + j + k + l) / 2;
    const mea = (m + n + o + p) / 2;
    const acc = (q + r + s + t) / 2;

    const overall = (pos + eng + rel + mea + acc) / 5;

    // Identify lowest pillar with original app.js priority
    let lowestPillar: PillarKey = 'pos';
    if (pos < eng && pos < rel && pos < mea && pos < acc) {
      lowestPillar = 'pos';
    } else if (rel < pos && rel < eng && rel < mea && rel < acc) {
      lowestPillar = 'rel';
    } else if (eng < rel && eng < mea && eng < acc) {
      lowestPillar = 'eng';
    } else if (mea < rel && mea < pos && mea < eng && mea < acc) {
      lowestPillar = 'mea';
    } else if (acc < rel && acc < pos && acc < mea && acc < eng) {
      lowestPillar = 'acc';
    } else {
      // general min lookup
      const scoresArray: { key: PillarKey; val: number }[] = [
        { key: 'pos', val: pos },
        { key: 'eng', val: eng },
        { key: 'rel', val: rel },
        { key: 'mea', val: mea },
        { key: 'acc', val: acc }
      ];
      scoresArray.sort((x, y) => x.val - y.val);
      lowestPillar = scoresArray[0].key;
    }

    return {
      pos,
      eng,
      rel,
      mea,
      acc,
      overall,
      lowestPillar
    };
  };

  const handleQuizSubmit = () => {
    setIsDemoMode(false);
    const scores = calculatePermaScores();
    setCurrentScores(scores);

    // Save to history
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
      scores,
      lowestPillar: scores.lowestPillar
    };

    const updatedHistory = [newRecord, ...history].slice(0, 20); // keep last 20
    setHistory(updatedHistory);
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
    } catch {
      // ignore
    }

    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTipsForPillar = (pillar: PillarKey) => {
    setActiveTipsPillar(pillar);
    setIsTipsOpen(true);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch {
      // ignore
    }
  };

  const handleSelectHistoryRecord = (record: AssessmentRecord) => {
    setIsDemoMode(false);
    setCurrentScores(record.scores);
    if (record.email) setUserEmail(record.email);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar
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
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 px-4 text-center text-xs text-slate-400 no-print">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-slate-300">
              Euphoria Check • Medidor de Felicidade e Bem-Estar PERMA
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Réplica em Português do Brasil inspirada no projeto original de Aryan Inguz.
            </p>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-indigo-400 transition-colors cursor-pointer"
            >
              Teoria de Martin Seligman
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTipsPillar('pos');
                setIsTipsOpen(true);
              }}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Guia dos 5 Pilares
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
