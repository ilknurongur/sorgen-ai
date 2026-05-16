import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

/**
 * Firebase Yapılandırması
 * Not: LocalStorage moduna geçildiğinden, bu anahtarlar boş olsa bile uygulama çökmez.
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
export const APP_ID = 'kpss-soru-matik-pro';

let app, db, auth;

// Sadece anahtarlar varsa Firebase'i başlat, yoksa uygulamayı çökertme
if (firebaseConfig.apiKey && firebaseConfig.apiKey !== 'YOUR_API_KEY') {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app);
    auth = getAuth(app);
    console.log('Firebase başarıyla başlatıldı.');
  } catch (error) {
    console.warn('Firebase başlatılamadı, uygulama Yerel Modda çalışacak.');
  }
} else {
  console.log('Firebase yapılandırması eksik, uygulama Yerel Modda (LocalStorage) çalışıyor.');
}

export { db, auth };
