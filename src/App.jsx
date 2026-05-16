import React, { useState } from 'react';

// --- Hooks ---
import { useAuth }      from './hooks/useAuth';
import { useFirestore } from './hooks/useFirestore';
import { useQuestion }  from './hooks/useQuestion';

// --- Components ---
import Navbar         from './components/Navbar';
import HomeView       from './components/HomeView';
import TestView       from './components/TestView';
import StatsView      from './components/StatsView';
import StatusBar      from './components/StatusBar';

// --- Constants ---
import { SUBJECTS } from './constants/subjects';

const App = () => {
  // ── Global State ─────────────────────────────────────────────────────────
  const [activeTab, setActiveTab]               = useState('home');
  const [selectedSubject, setSelectedSubject]   = useState(SUBJECTS[0]);
  const [answers, setAnswers]                   = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // ── Custom Hooks ──────────────────────────────────────────────────────────
  const { user }                                   = useAuth();
  const { stats, saveTestResult }                  = useFirestore(user);
  const { questions, loading, error, generateAll } = useQuestion();

  // Mevcut soru: questions dizisinden index ile alınır
  const currentQuestion = questions[currentQuestionIndex] ?? null;

  // ── Test Akışı ────────────────────────────────────────────────────────────

  /** Denemeyi sıfırlar ve tüm soruları tek seferde getirir */
  const startTest = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setActiveTab('test');
    generateAll(selectedSubject);
  };

  /** Kullanıcı bir şık seçtiğinde çalışır */
  const handleAnswer = (key) => {
    if (!currentQuestion) return;
    const isCorrect = key === currentQuestion.correctAnswer;
    setAnswers(prev => [...prev, { index: currentQuestionIndex, userAnswer: key, isCorrect }]);
  };

  /** "Sıradaki Soru" veya "Sonucu Gör" butonuna basıldığında çalışır */
  const handleNext = () => {
    const nextIdx = currentQuestionIndex + 1;

    if (nextIdx < questions.length) {
      setCurrentQuestionIndex(nextIdx);
    } else {
      const correctCount = answers.filter(a => a.isCorrect).length;
      console.log('App: Sınav bitti, sonuçlar kaydediliyor. Doğru:', correctCount);
      alert(`Sınav bitti! Skorunuz: ${correctCount} / ${questions.length}. İstatistiklere kaydediliyor...`);
      
      saveTestResult(selectedSubject.name, correctCount, questions.length);
      setActiveTab('stats');
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-6 pb-24">
      <div className="max-w-4xl mx-auto">

        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'home' && (
          <HomeView
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onStartTest={startTest}
          />
        )}

        {activeTab === 'test' && (
          <TestView
            selectedSubject={selectedSubject}
            currentQuestion={currentQuestion}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={questions.length || selectedSubject.count}
            answers={answers}
            loading={loading}
            error={error}
            onAnswer={handleAnswer}
            onNext={handleNext}
            onExit={() => setActiveTab('home')}
          />
        )}



        {activeTab === 'stats' && (
          <StatsView stats={stats} />
        )}

      </div>

      {activeTab === 'test' && <StatusBar answers={answers} />}
    </div>
  );
};

export default App;
