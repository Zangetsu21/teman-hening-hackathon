# Teman Hening
### AI Companion untuk Kesehatan Mental dan Ketenangan Diri

![Python](https://img.shields.io/badge/Python-3.9-3776AB?style=for-the-badge&logo=python) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi) ![Azure](https://img.shields.io/badge/Microsoft_Azure-0078D4?style=for-the-badge&logo=microsoft-azure)

Proyek ini dibuat untuk **elevAIte with Dicoding Online Hackathon 2025** dengan tema "Mendukung SDG Indonesia dengan AI".

---

![Demo Aplikasi Teman Hening]([https://photos.app.goo.gl/xGm8UxSKJj1E3Y5Z7])

### 📖 Tentang Proyek
**Teman Hening** adalah aplikasi web interaktif yang berfungsi sebagai teman AI (AI Companion). Proyek ini lahir dari keprihatinan terhadap isu kesehatan mental di Indonesia, khususnya yang dipicu oleh stres dan dampak negatif judi online. Menyadari adanya stigma yang menghalangi banyak orang untuk mencari bantuan, Teman Hening hadir sebagai "pertolongan pertama digital" yang anonim, mudah diakses, dan proaktif dalam memberikan dukungan.

Alih-alih hanya mendeteksi perasaan pengguna, aplikasi ini secara aktif memandu mereka melalui alat bantu praktis (*coping mechanism tools*) yang berdasar pada prinsip psikologi terapan.

### ✨ Fitur Utama
* **💬 Chat AI Kontekstual:** Mampu memberikan respons empatik yang disesuaikan dengan sentimen dan frasa kunci dari cerita pengguna.
* **🧘 Latihan Pernapasan Terpandu:** Sesi interaktif untuk membantu pengguna menenangkan diri saat merasa cemas atau panik.
* **💡 Latihan Grounding 5-4-3-2-1:** Sesi terpandu untuk membantu memutus siklus pikiran negatif dan mengembalikan fokus ke saat ini.
* **🔒 100% Anonim:** Tidak memerlukan login atau data pribadi untuk menciptakan ruang yang aman bagi pengguna.
* **🎨 Desain Menenangkan:** Antarmuka yang bersih dengan palet warna yang menenangkan untuk kenyamanan maksimal.

### 🚀 Teknologi yang Digunakan
Proyek ini dibangun menggunakan tumpukan teknologi modern yang dihosting sepenuhnya di platform Microsoft Azure.

* **Backend:** Python 3.9, FastAPI
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla JS)
* **Cloud Platform:** Microsoft Azure
    * **Hosting:** Azure App Service
    * **AI Service:** Azure AI Language Service (Sentiment Analysis & Key Phrase Extraction)
* **Server Produksi:** Gunicorn

### ⚙️ Cara Menjalankan Proyek Secara Lokal
Untuk menjalankan proyek ini di komputer lokal Anda, ikuti langkah-langkah berikut:

1.  **Prasyarat:**
    * Python 3.9+
    * Git

2.  **Clone Repositori:**
    ```bash
    git clone [URL_REPOSITORI_GITHUB_ANDA]
    cd teman-hening
    ```

3.  **Setup Virtual Environment:**
    ```bash
    # Buat virtual environment
    python -m venv venv

    # Aktifkan
    # Windows
    .\venv\Scripts\activate
    # macOS/Linux
    source venv/bin/activate
    ```

4.  **Install Dependensi:**
    ```bash
    pip install -r requirements.txt
    ```

5.  **Konfigurasi Environment Variables:**
    * Buat file bernama `.env` di dalam folder utama proyek.
    * Isi file tersebut dengan kunci API Anda:
        ```ini
        LANGUAGE_KEY="MASUKKAN_KEY_ANDA_DI_SINI"
        LANGUAGE_ENDPOINT="MASUKKAN_ENDPOINT_ANDA_DI_SINI"
        ```

6.  **Jalankan Aplikasi:**
    ```bash
    uvicorn main:app --reload
    ```
    Buka browser Anda dan kunjungi `http://127.0.0.1:8000`.
