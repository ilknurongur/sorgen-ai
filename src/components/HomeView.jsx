import React from 'react';
import { ChevronRight } from 'lucide-react';
import { SUBJECTS } from '../constants/subjects';

/**
 * HomeView — Ders seçim ekranı.
 * Props: selectedSubject, setSelectedSubject, onStartTest
 */
const HomeView = ({ selectedSubject, setSelectedSubject, onStartTest }) => {
  return (
    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
      <header className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">KPSS Soru-Matik Pro</h1>
        <p className="text-slate-500">Hangi dersle antrenman yapmak istersin?</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SUBJECTS.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setSelectedSubject(sub)}
            className={`p-6 rounded-3xl border-2 transition-all text-left group
              ${selectedSubject.id === sub.id
                ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-100'
                : 'border-white bg-white hover:border-slate-200'
              }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-4xl">{sub.icon}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold
                ${selectedSubject.id === sub.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-500'
                }`}>
                {sub.count} Soru
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{sub.name}</h3>
            <p className="text-xs text-slate-400 line-clamp-1">{sub.topics}</p>
          </button>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onStartTest}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-12 py-5 rounded-3xl font-bold
            transition-all shadow-xl hover:shadow-indigo-200 flex items-center gap-3 text-lg"
        >
          Denemeyi Başlat <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default HomeView;
