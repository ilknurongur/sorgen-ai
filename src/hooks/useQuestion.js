import { useState, useCallback } from 'react';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const MODEL = 'llama-3.3-70b-versatile';
// Kaliteyi korumak için tek seferde en fazla 5 soru istiyoruz
const BATCH_SIZE = 5;

const callGroq = async (prompt) => {
  if (!GROQ_API_KEY) throw new Error('GROQ_API_KEY_MISSING');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'system',
          content: 'Sen bir ÖSYM Sınav Komisyonu üyesisin. KPSS standartlarında, akademik derinliği olan, çeldiricileri çok güçlü ve mantıksal hatası olmayan sorular üretmekle yükümlüsün.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5 // Çeşitlilik ve doğruluk arasında denge sağlamak için 0.5 idealdir
    }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error?.message || `HTTP_${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

export const useQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState(null);

  const generateAll = useCallback(async (subject) => {
    if (!GROQ_API_KEY) {
      setError('Lütfen .env dosyasına VITE_GROQ_API_KEY ekleyin.');
      return;
    }

    setLoading(true);
    setError(null);
    setQuestions([]);

    const totalCount = subject.count;
    const batchCount = Math.ceil(totalCount / BATCH_SIZE);
    const accumulatedQuestions = [];

    try {
      for (let i = 0; i < batchCount; i++) {
        const currentBatchSize = Math.min(BATCH_SIZE, totalCount - i * BATCH_SIZE);
        
        // Derse özel talimatları belirle
        let subjectSpecificRule = "";
        if (subject.id === 'turkce') {
          subjectSpecificRule = "Dil bilgisi ve anlam bilgisi ağırlıklı olmalı. Paragraf sorularında mutlaka önce 4-6 cümlelik bir okuma parçası ver, sonra 'Bu parçaya göre...' diye sor.";
        } else if (subject.id === 'cografya') {
          subjectSpecificRule = "Türkiye coğrafyası ağırlıklı; iklim, yer şekilleri, nüfus ve ekonomik faaliyetlere (tarım, maden, sanayi) odaklan. Soruları bölge veya il bazlı kurgula.";
        } else if (subject.id === 'vatandaslik') {
          subjectSpecificRule = "Anayasa hukuku, temel hukuk kavramları ve idare hukuku odaklı olmalı. ÖSYM'nin hukuk diliyle (örn: 'Hangi durumda...', 'Hangisi ... organıdır?') sor.";
        } else if (subject.id === 'guncel') {
          subjectSpecificRule = "Son 2 yılın önemli olayları, uluslararası kuruluşlar (NATO, UNESCO vb.), ödül alan sanatçılar ve önemli spor olaylarına odaklan.";
        }

        const prompt = `
Branş: ${subject.name}
Konu Kapsamı: ${subject.topics}
Bu Partta Üretilecek Soru Sayısı: ${currentBatchSize}

ÖZEL KURALLAR:
${subjectSpecificRule}

GENEL ÖSYM KURALLARI:
0. ÇEŞİTLİLİK: Soruların temalarını (bilim, sanat, tarih, felsefe, günlük hayat) her soruda değiştir. Aynı cümle yapılarını ve aynı kelime kalıplarını tekrar etme.
1. DOĞRULUK: Her soruyu hazırladıktan sonra cevabın akademik olarak %100 doğru olduğunu teyit et. Tartışmalı veya güncelliğini yitirmiş bilgileri kullanma.
2. MANTIK: Soruların ve şıkların birbirini yalanlamadığından, cevabın akademik olarak kesin olduğundan emin ol.
2. ÇELDİRİCİ: Şıklar birbirine yakın olmalı. Çok saçma veya 'hiçbiri' gibi şıklar kullanma.
3. DİL: Tamamen resmi, ciddi ve hatasız bir Türkçe kullan.
4. FORMAT: SADECE aşağıdaki JSON formatında yanıt ver:
{
  "questions": [
    {
      "text": "Soru metni (Türkçe ise paragraf buraya dahil edilecek)",
      "options": { "A": "...", "B": "...", "C": "...", "D": "...", "E": "..." },
      "correctAnswer": "A",
      "explanation": "Doğru cevabın neden A olduğunu akademik olarak açıkla."
    }
  ]
}
`;

        const raw = await callGroq(prompt);
        const parsed = JSON.parse(raw);
        if (parsed.questions) {
          accumulatedQuestions.push(...parsed.questions);
          // UI'ı her batch sonunda güncelle (kullanıcı beklerken soruların geldiğini görsün)
          setQuestions([...accumulatedQuestions]);
        }
      }
    } catch (err) {
      console.error('Soru üretim hatası:', err);
      setError(`Soru üretilirken hata oluştu: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { questions, loading, error, generateAll };
};
