import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase yapılandırması — Canvas ortamında __firebase_config değişkeninden,
// yerel geliştirmede .env dosyasından okunur.
let firebaseConfig;

// Canvas / Firebase Studio ortamı
if (typeof __firebase_config !== 'undefined' && __firebase_config) {
  try {
    firebaseConfig = JSON.parse(__firebase_config);
  } catch (e) {
    console.error('__firebase_config parse hatası:', e);
    firebaseConfig = null;
  }
}

// .env fallback
if (!firebaseConfig || !firebaseConfig.apiKey) {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
  if (!apiKey || apiKey.startsWith('buraya')) {
    console.error(
      '🔴 Firebase yapılandırması eksik!\n' +
      '.env dosyanızdaki VITE_FIREBASE_* değişkenlerini doldurun.\n' +
      'Bakınız: https://console.firebase.google.com → Proje Ayarları → Uygulamalar'
    );
  }
  firebaseConfig = {
    apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || '',
    authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || '',
    projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || '',
    storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '',
  };
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Uygulama koleksiyon kimliği
export const APP_ID =
  typeof __app_id !== 'undefined' ? __app_id : 'kpss-soru-matik-pro';

// Gemini API anahtarı — ortam değişkeninden gelir, boş bırakılırsa Canvas sağlar.
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
