# SORGEN-AI 
** ÖSYM Tarzı Soru Üretimi ve Anlama Modeli (Flan-T5 Tabanlı NLP Projesi) **

---

## **Proje Özeti**

Bu proje **ÖSYM sınav tarzındaki Türkçe soruları** analiz edip benzer nitelikte yeni sorular üretebilen bir yapay zeka modeli geliştirmeyi amaçlar.
Proje, PDF dosyalarından alınan orijinal sınav sorularını metin formatında döndürür, bu verileri temizler ve ardından
** Flan-T5 ** modeli üzerine ince ayar (fine-tuning) yaparak doğal dil anlama/üretme becerisi kazandırır.

**Amaç** <br>
Modelin, kullanıcıdan aldığı "ders" veya "konu" girdisine göre  Ösym tarzında yeni sorular üretebilmesi.

**Kapsam** <br>
Şu anda yalnızca **Türkçe dersi** ile başlanmıştır.
İlerleyen aşamalarda diğer dersler (Matematik, Tarih vb.) de veri setine eklenecektir.

---

## **Teknik Yapı**

| Katman | Açıklama|
|--------|---------|
| **Veri Toplama** | ÖYM PDF dosyalarından soru metinlerinin çıkarılması |
| **Veri Hazırlama** | Regex+ Python ile soru-cevap ayrımı, temizleme |
| **Veri Dönüştürme** | JSON -> JSONL fromatına çeviri (model eğitimi uyumu)|
| **Model Eğitimi** | Flan-T5-base modeliyle fine-tuning |
| **Değerlendirme** | Moodelin benzer tarzda soru üretme başarısının test edilemsi |

---

## **Proje Dizin Yapısı**

sorgen-ai/ <br>
├── data/ <br>
│ ├── raw/ # Ham PDF verileri <br>
│ ├── processed/ # Temizlenmiş ve dönüştürülmüş JSON/JSONL dosyaları<br>
├── notebooks/<br>
│ ├── 01_pdf_to_text.ipynb<br>
│ ├── 02_text_cleaning.ipynb<br>
│ ├── 03_eda_analysis.ipynb<br>
│ ├── 04_json_to_jsonl.ipynb<br>
│ └── 05_model_training.ipynb<br>
├── models/<br>
│ └── flan_t5_turkce/ # Eğitilmiş model dosyaları<br>
├── utils/<br>
│ └── helpers.py # Yardımcı fonksiyonlar (örnek)<br>
└── README.md<br>

---

## **Kullanılan Teknolojiler**
| Teknoloji | Amaç |
|-----------|------|
| Python 3.10| Veri işleme ve model eğitimi |
| Jupyter Notebook | Veri analizi ve ön işleme|
| HuggingFace Transformers | Model eğitimi ve değerlendirme |
| Datasets $ Accelerate | JSONL verilerini yükleme ve GPU optimizasyonu|
| Google Colab | Modelin GPU üzerinde eğitimi |
| Regex | PDF'ten çıkarılan metnin temizlenmesi |

---

## **Çalıştırma Adımları**

### Ortam Kurulumu
´´´bash
pip install -r requerements.txt

### Veri Hazırlığı
01_pdf_to_text.ipynb ve 02_text_cleaning.ipynb notebook'larını çalıştır

### JSON -> JSONL Dönüşümü
04_json_to_jsonl.ipynb notebook'u

### Model Eğitimi (Colab Üzerinde)
!git clone https://github.com/ilknurongur/sorgen-ai.git <br>
%cd sorgen-ai <br>
!pip install transformers datasets accelerate <br>
ve ardından <br>
from datasets import load_dataset <br>
dataset = load_dataset("json", data_files= "data/processed/turkce_questions.jsonl") <br>

---

# **Gelecek Çalışmalar**
Diğer derslerin (Matematik, Tarih, Vatandaşlık) eklenmesi <br>
Soru türlerine göre (paragraf, anlam bilgisi, dil bilgisi) alt etiketleme <br>
Web arayüzü( Flask/ FastAPI + React) ile kullanıcıdan sınav oluşturma isteği alma <br>
Modelin Türkçe metin üretim kalitesinin BLEU +ROUGE skorlarıyla ölçülmesi <br>

# **Yazar**
İlknur Ongur <br>
ilknurongur@gmail.com <br>
Süleymann Demirel Üniversitesi - Bilgisayar Mühendisi <br>

---

# **English Summary** 
SORGEN-AI is an NLP-based fine-tuned model designed to generate exam-style questions similar to Turkish national exams.(ÖSYM) <br>
The project converts real exam PDFs into text, cleans the data , and fine-tunes the Flan-T5 modle for question generation and comprehension. <br>

## **Key Features** 
Automatically learns the structure of ÖSYM-style Turkish quetions. <br>
Can generate new questions for selected subjects. <br>
Supports HuggingFace-compatible JSONL datasets. <br>
Moduler design: Jupyter (preprocessing) + Colab (training). <br>

## **Keywords**
#NaturelLanguageProcessing #FlanT5 #AIinEducation #NLP #HuggingFace #Python #ÖSYM #OSYM # FineTuning

## **License**
This project is open-source under the MIT License. <br>
Feel free to fork and extend the model foor educationall purposes












