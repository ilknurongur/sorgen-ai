import React from 'react';

/**
 * StatusBar — Test modunda ekranın altında sabit duran canlı skor çubuğu.
 * Props:
 *  - answers : Verilen cevaplar dizisi { isCorrect }
 */
const StatusBar = ({ answers }) => {
  const correct = answers.filter(a => a.isCorrect).length;
  const wrong   = answers.filter(a => !a.isCorrect).length;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-lg
      bg-white/80 backdrop-blur-md border border-white p-4 rounded-3xl shadow-2xl
      flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <div className="w-2 h-2 rounded-full bg-rose-500" />
        </div>
        <span className="text-xs font-bold text-slate-600">CANLI SINAV</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400">DOĞRU</p>
          <p className="text-sm font-black text-emerald-600">{correct}</p>
        </div>
        <div className="text-center">
          <p className="text-[10px] font-bold text-slate-400">YANLIŞ</p>
          <p className="text-sm font-black text-rose-600">{wrong}</p>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
