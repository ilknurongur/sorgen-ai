import React from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';

/**
 * ErrorBookView — Hata defteri ekranı.
 * Props:
 *  - errorBook            : Hata defteri öğeleri dizisi
 *  - onDelete             : (docId) => void
 */
const ErrorBookView = ({ errorBook, onDelete }) => {
  const sorted = [...errorBook].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4">
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Hata Defteri</h2>
        <p className="text-slate-500 text-sm">
          Yanlış cevapladığın sorular burada birikir. Tekrar ederek pekiştirebilirsin.
        </p>
      </header>

      {sorted.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl text-center border border-slate-100">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-slate-400">Henüz hiç hata yapmadın. Harikasın!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sorted.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold uppercase tracking-widest">
                  {item.subject}
                </span>
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-slate-300 hover:text-rose-500 transition-colors p-1"
                  title="Sil"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-slate-800 font-medium mb-4 line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                {item.text}
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800 text-sm italic">
                <strong>Doğru Cevap {item.correctAnswer}:</strong> {item.explanation}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ErrorBookView;
