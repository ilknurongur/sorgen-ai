import React from 'react';
import { BookOpen, LogOut, ChevronRight } from 'lucide-react';

/**
 * TestView — Sınav ekranı.
 * Props:
 *  - selectedSubject        : Seçili ders nesnesi
 *  - currentQuestion        : Mevcut soru objesi { text, options, correctAnswer, explanation }
 *  - currentQuestionIndex   : 0 tabanlı soru indeksi
 *  - answers                : Tüm verilen cevaplar dizisi
 *  - loading                : API yüklenme durumu
 *  - error                  : Hata mesajı (string | null)
 *  - onAnswer               : (optionKey) => void
 *  - onNext                 : () => void
 *  - onExit                 : () => void
 */
const TestView = ({
  selectedSubject,
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  answers,
  loading,
  error,
  onAnswer,
  onNext,
  onExit,
}) => {
  const currentAnswer = answers.find(a => a.index === currentQuestionIndex);
  const isLastQuestion = currentQuestionIndex + 1 >= totalQuestions;
  const progressPct = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-10 relative">
      {/* Başlık Satırı */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
            {selectedSubject.name} Denemesi
          </span>
          <span className="text-sm font-medium text-slate-400">
            Soru {currentQuestionIndex + 1} / {totalQuestions}
          </span>
        </div>
        <button
          onClick={() => {
            if (confirm('Denemeden çıkmak istediğine emin misin? İlerlemen kaydedilmeyecek.')) {
              onExit();
            }
          }}
          className="flex items-center gap-2 px-4 py-2 text-rose-500 hover:bg-rose-50
            rounded-xl transition-colors font-semibold text-sm border border-rose-100"
        >
          <LogOut className="w-4 h-4" /> Sınavdan Çık
        </button>
      </div>

      {/* İlerleme Çubuğu */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-indigo-500 transition-all duration-500"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* İçerik */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-700 font-semibold mb-1">Sorular hazırlanıyor...</p>
          <p className="text-slate-400 text-sm animate-pulse">Yapay zeka soruları üretiyor, lütfen bekleyin (30–60 sn)</p>
        </div>
      ) : error ? (
        <div className="py-16 text-center text-rose-500 font-semibold">{error}</div>
      ) : currentQuestion ? (
        <div className="animate-in fade-in zoom-in-95">
          {/* Soru Metni */}
          <p className="text-lg md:text-xl font-semibold leading-relaxed text-slate-800 mb-8 whitespace-pre-wrap">
            {currentQuestion.text}
          </p>

          {/* Seçenekler */}
          <div className="grid gap-3 mb-8">
            {Object.entries(currentQuestion.options).map(([key, value]) => {
              const isCorrect = key === currentQuestion.correctAnswer;
              const isSelected = currentAnswer?.userAnswer === key;

              return (
                <button
                  key={key}
                  onClick={() => onAnswer(key)}
                  disabled={!!currentAnswer}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all
                    ${!currentAnswer
                      ? 'border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/50'
                      : isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isSelected
                          ? 'border-rose-500 bg-rose-50'
                          : 'border-slate-50 opacity-40'
                    }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0
                    ${!currentAnswer
                      ? 'bg-slate-100 text-slate-500'
                      : isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isSelected
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 text-slate-400'
                    }`}>
                    {key}
                  </span>
                  <span className="flex-1 font-medium">{value}</span>
                </button>
              );
            })}
          </div>

          {/* Açıklama & Sonraki Buton */}
          {currentAnswer && (
            <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100 animate-in slide-in-from-top-2">
              <div className="flex items-center gap-2 mb-2 text-indigo-900 font-bold">
                <BookOpen className="w-5 h-5" /> Analiz
              </div>
              <p className="text-indigo-800 italic text-sm leading-relaxed mb-6">
                {currentQuestion.explanation}
              </p>
              <button
                onClick={onNext}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold
                  hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
              >
                {isLastQuestion ? 'Sonucu Gör' : 'Sıradaki Soru'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default TestView;
