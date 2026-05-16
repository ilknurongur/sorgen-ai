import React from 'react';
import { LayoutList, BookOpen, BarChart3 } from 'lucide-react';

const TABS = [
  { id: 'home',   label: 'Ders Seçimi',   icon: LayoutList },
  { id: 'stats',  label: 'İstatistikler', icon: BarChart3 },
];

/**
 * Navbar — Üst sekme navigasyonu.
 * Test modunda geçiş devre dışıdır.
 */
const Navbar = ({ activeTab, setActiveTab }) => {
  const isTestMode = activeTab === 'test';

  return (
    <div className="flex justify-center mb-8">
      <nav className="inline-flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            disabled={isTestMode}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all
              ${activeTab === id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-50 disabled:opacity-50'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
