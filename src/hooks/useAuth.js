import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import { auth } from '../firebase/config';

/**
 * useAuth — Kullanıcı oturum yönetimi.
 * Firebase yoksa "Misafir" kullanıcı döndürür.
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Eğer Firebase Auth başlatılamadıysa (Render vb.) sahte kullanıcı oluştur
    if (!auth) {
      console.log('Auth: Firebase Auth bulunamadı, Misafir modu aktif.');
      setUser({ uid: 'guest-user', isAnonymous: true, displayName: 'Misafir Kullanıcı' });
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        try {
          await signInAnonymously(auth);
        } catch (e) {
          console.error('Anonim giriş hatası:', e);
        }
      } else {
        setUser(u);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { user, loading };
};
