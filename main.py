import os
from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Import Azure SDK
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

# Muat variabel dari file .env
load_dotenv()

# Inisialisasi aplikasi FastAPI
app = FastAPI(
    title="Teman Hening API",
    description="API untuk analisis teks dengan Azure AI Language Service."
)

# ---- PERUBAHAN DIMULAI DI SINI ----

# 1. Pasang folder 'static' untuk menyajikan file HTML, CSS, JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# 2. Ambil kredensial dari environment variables
language_key = os.getenv("LANGUAGE_KEY")
language_endpoint = os.getenv("LANGUAGE_ENDPOINT")

# Validasi kredensial
if not language_key or not language_endpoint:
    raise Exception("Pastikan LANGUAGE_KEY dan LANGUAGE_ENDPOINT sudah diatur di file .env")

# 3. Model data untuk request body
class TextRequest(BaseModel):
    text: str

# 4. Inisialisasi client Azure AI Language
credential = AzureKeyCredential(language_key)
text_analytics_client = TextAnalyticsClient(endpoint=language_endpoint, credential=credential)

# 5. Endpoint untuk menyajikan halaman utama (index.html)
@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    with open("static/index.html") as f:
        return HTMLResponse(content=f.read(), status_code=200)

# ---- PERUBAHAN SELESAI ----

@app.post("/analyze")
def analyze_text(request: TextRequest):
    """
    Endpoint untuk menganalisis sentimen dan mengekstrak frasa kunci.
    """
    try:
        documents = [request.text]
        sentiment_response = text_analytics_client.analyze_sentiment(documents=documents)[0]
        key_phrases_response = text_analytics_client.extract_key_phrases(documents=documents)[0]

        if sentiment_response.is_error:
            raise Exception(f"Azure Sentiment Error: {sentiment_response.error.message}")
        if key_phrases_response.is_error:
            raise Exception(f"Azure Key Phrases Error: {key_phrases_response.error.message}")

        result = {
            "sentiment": sentiment_response.sentiment,
            "confidence_scores": {
                "positive": sentiment_response.confidence_scores.positive,
                "neutral": sentiment_response.confidence_scores.neutral,
                "negative": sentiment_response.confidence_scores.negative
            },
            "key_phrases": key_phrases_response.key_phrases
        }
        return result
    except Exception as e:
        return {"error": str(e)}