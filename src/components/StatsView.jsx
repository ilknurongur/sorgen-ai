import React from 'react';
import { Trophy, History, Target, TrendingUp } from 'lucide-react';

/**
 * StatsView — Performans özeti ekranı.
 * Props:
 *  - stats : Sınav istatistikleri dizisi { id, subject, score, total, date }
 */
const StatsView = ({ stats }) => {
  const sorted = [...stats].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Genel İstatistikler
  const totalTests = stats.length;
  const totalCorrect = stats.reduce((acc, curr) => acc + curr.score, 0);
  const totalQuestions = stats.reduce((acc, curr) => acc + curr.total, 0);
  const avgSuccess = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Branş Bazlı Başarı
  const subjectStats = stats.reduce((acc, curr) => {
    if (!acc[curr.subject]) {
      acc[curr.subject] = { correct: 0, total: 0, count: 0 };
    }
    acc[curr.subject].correct += curr.score;
    acc[curr.subject].total += curr.total;
    acc[curr.subject].count += 1;
    return acc;
  }, {});

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Performans Özeti</h2>
        <p className="text-slate-500 text-sm">Sınav geçmişin ve branş bazlı başarı durumun.</p>
      </header>

      {/* Üst Özet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-indigo-50 rounded-xl">
              <History className="w-5 h-5 text-indigo-600" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Toplam Deneme</span>
          </div>
          <p className="text-3xl font-black text-slate-800">{totalTests}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-emerald-50 rounded-xl">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Ort. Başarı</span>
          </div>
          <p className="text-3xl font-black text-slate-800">%{avgSuccess}</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-amber-50 rounded-xl">
              <Target className="w-5 h-5 text-amber-600" />
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase">Toplam Doğru</span>
          </div>
          <p className="text-3xl font-black text-slate-800">{totalCorrect}</p>
        </div>
      </div>

      {/* Branş Bazlı Başarı Çubukları */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          Branş Bazlı Başarı Oranı
        </h3>
        <div className="space-y-6">
          {Object.entries(subjectStats).length === 0 ? (
            <p className="text-center text-slate-400 italic py-4">Henüz veri yok.</p>
          ) : (
            Object.entries(subjectStats).map(([subject, s]) => {
              const percent = Math.round((s.correct / s.total) * 100);
              return (
                <div key={subject}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-bold text-slate-700">{subject}</span>
                    <span className="text-sm font-black text-indigo-600">%{percent}</span>
                  </div>
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-600 rounded-full transition-all duration-1000"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Geçmiş Sınavlar Listesi */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 font-bold text-slate-700">
          Son Sınav Geçmişi
        </div>
        <div className="divide-y divide-slate-50">
          {sorted.length === 0 ? (
            <div className="p-10 text-center text-slate-400 italic">
              Henüz tamamlanmış deneme yok.
            </div>
          ) : (
            sorted.slice(0, 10).map((s) => (
              <div
                key={s.id}
                className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <div className="flex flex-col">
                  <span className="font-bold text-slate-800">{s.subject}</span>
                  <span className="text-xs text-slate-400">
                    {new Date(s.date).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`text-lg font-black ${
                      s.score / s.total >= 0.7 ? 'text-emerald-500' : 'text-amber-500'
                    }`}
                  >
                    {s.score} / {s.total}
                  </span>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Net Skor</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsView;
