import { useState, useEffect } from 'react';

/**
 * useFirestore — Yerel Kayıt (LocalStorage) Versiyonu.
 * Firebase hatalarını baypas eder ve verileri tarayıcıda tutar.
 */
export const useFirestore = (user) => {
  const [stats, setStats] = useState([]);

  // Uygulama açıldığında yerel hafızadan verileri çek
  useEffect(() => {
    const savedStats = localStorage.getItem('sorgen_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error('Yerel veriler okunamadı:', e);
      }
    }
  }, []);

  /** Sınav sonucunu yerel hafızaya kaydeder */
  const saveTestResult = async (subjectName, score, total) => {
    const newResult = {
      id: Date.now().toString(),
      subject: subjectName,
      score: score,
      total: total,
      date: new Date().toISOString()
    };

    const updatedStats = [newResult, ...stats];
    setStats(updatedStats);
    localStorage.setItem('sorgen_stats', JSON.stringify(updatedStats));
    console.log('Yerel Kayıt Başarılı:', newResult);
  };

  const deleteFromErrorBook = () => {}; // Artık kullanılmıyor

  return { stats, saveTestResult, deleteFromErrorBook };
};
