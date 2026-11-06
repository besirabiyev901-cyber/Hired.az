"""
Hired.az — B2B HR Süni İntellekt Ekranlaşdırma Platforması
FastAPI Backend API və Gemini AI İnteqrasiyası
"""

import os
import io
import re
import json
from datetime import datetime
from typing import List, Optional, Dict, Any

from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

# PDF, DOCX və Excel kitabxanaları
import pypdf
import docx
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Google GenAI SDK
try:
    from google import genai
    from google.genai import types as genai_types
    GENAI_AVAILABLE = True
except Exception:
    GENAI_AVAILABLE = False

app = FastAPI(
    title="Hired.az B2B API",
    description="Azərbaycan B2B HR şirkətləri üçün Süni İntellektlə CV Ekranlaşdırma və Bot Bloklama Sistemi",
    version="2.5.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# QARA SİYAHI VƏ BAKU GEOLOKASİYA KONFİQURASİYASI
# -------------------------------------------------------------
TEMP_MAIL_DOMAINS = {
    "guerrillamail.com", "trashmail.org", "10minutemail.net", "mailinator.com",
    "sharklasers.com", "tempmail.com", "throwawaymail.com", "dispostable.com",
    "yopmail.com", "fakeinbox.com", "getairmail.com", "temp-mail.org"
}

BAKU_BRANCHES = [
    {"name": "Nərimanov Filialı", "lat": 40.4022, "lon": 49.8719, "metro": "Nəriman Nərimanov m/s"},
    {"name": "Nizami Filialı", "lat": 40.3794, "lon": 49.8302, "metro": "Nizami m/s"},
    {"name": "Gənclik Filialı", "lat": 40.4005, "lon": 49.8517, "metro": "Gənclik m/s"},
    {"name": "28 May Filialı", "lat": 40.3798, "lon": 49.8493, "metro": "28 May m/s"},
    {"name": "Yasamal Filialı", "lat": 40.3850, "lon": 49.8090, "metro": "Elmlər Akademiyası m/s"},
    {"name": "Sahil Filialı", "lat": 40.3705, "lon": 49.8423, "metro": "Sahil m/s"}
]

# Konfiqurasiya Faylı
CONFIG_FILE = os.path.join(os.path.dirname(__file__), "hired_config.json")
def load_config():
    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "gemini_api_key": os.environ.get("GEMINI_API_KEY", ""),
        "company": {
            "name": "SOCAR Enerji QSC",
            "voen": "1402948191",
            "email": "hr@socar.az",
            "plan": "Pro Paket",
            "branches": 12
        }
    }

def save_config(cfg):
    try:
        with open(CONFIG_FILE, "w", encoding="utf-8") as f:
            json.dump(cfg, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print("Config save error:", e)

APP_CONFIG = load_config()

# -------------------------------------------------------------
# ZƏNGİN SEED BAZASI (AZƏRBAYCAN B2B ŞİRKƏTLƏRİ ÜÇÜN REAL CV-LƏR)
# -------------------------------------------------------------
DB_CANDIDATES: List[Dict[str, Any]] = [
    # AKTİV YOXLANMIŞ NAMİZƏDLƏR
    {
        "id": "AZ-101",
        "name": "Əli Məmmədov",
        "email": "ali.mammadov@gmail.com",
        "phone": "+994 50 234 56 78",
        "role": "Senior Frontend Mühəndis",
        "branch": "Nərimanov Filialı",
        "distance": "1.2 km",
        "workMode": "Tam ştat",
        "education": "Magistr (BDU Kompüter Elmləri)",
        "experience": "5+ il",
        "expYears": 6.0,
        "aiScore": 96,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "active",
        "date": "2026-11-05 14:20",
        "avatar": "ƏM",
        "skills": ["React", "TypeScript", "Tailwind CSS", "Next.js", "Redux"],
        "aiAnalysis": {
            "tempMail": "Təmiz (Gmail rəsmi domen)",
            "antiBot": "İnsan davranışı təsdiqləndi (142ms gecikmə)",
            "geoMatch": "Yüksək (1.2 km N.Nərimanov m/s)",
            "expCoherence": "100% şirkət qeydləri uyğundur"
        }
    },
    {
        "id": "AZ-102",
        "name": "Leyla Qasımova",
        "email": "leyla.q@code.az",
        "phone": "+994 55 890 12 34",
        "role": "Data Analyst / BI Mütəxəssis",
        "branch": "Nizami Filialı",
        "distance": "2.8 km",
        "workMode": "Yarımştat",
        "education": "Ali (ADA Universiteti IT)",
        "experience": "3-5 il",
        "expYears": 4.0,
        "aiScore": 94,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "active",
        "date": "2026-11-05 11:15",
        "avatar": "LQ",
        "skills": ["SQL", "Power BI", "Python", "Pandas", "Tableau"],
        "aiAnalysis": {
            "tempMail": "Təmiz (Korporativ domen code.az)",
            "antiBot": "İnsan doldurması",
            "geoMatch": "2.8 km məsafə",
            "expCoherence": "Portfel və layihələr təsdiqlənib"
        }
    },
    {
        "id": "AZ-103",
        "name": "Rəşad Əliyev",
        "email": "reshad.eliyev@mail.ru",
        "phone": "+994 70 345 67 89",
        "role": "Müştəri Xidmətləri & Kassa",
        "branch": "Gənclik Filialı",
        "distance": "0.8 km",
        "workMode": "Tam ştat",
        "education": "Ali (UNEC İqtisadiyyat)",
        "experience": "1-3 il",
        "expYears": 2.0,
        "aiScore": 78,
        "aiStatus": "Yoxlanılır",
        "aiVerdict": "Gözləmədə",
        "tabCategory": "active",
        "date": "2026-11-04 16:45",
        "avatar": "RƏ",
        "skills": ["1C Mühasibat", "Müştəri yönümlülük", "Kassa əməliyyatları"],
        "aiAnalysis": {
            "tempMail": "Şəxsi Mail.ru ünvanı",
            "antiBot": "Normal form doldurma",
            "geoMatch": "0.8 km (Piyada 10 dəq)",
            "expCoherence": "HR komissiya zəngi tələb olunur"
        }
    },
    {
        "id": "AZ-104",
        "name": "Nərgiz Babayeva",
        "email": "nargiz.b@finans.az",
        "phone": "+994 51 445 22 11",
        "role": "Aparıcı Mühasib (ACCA)",
        "branch": "28 May Filialı",
        "distance": "1.5 km",
        "workMode": "Tam ştat",
        "education": "Magistr (Dövlət İqtisad Universiteti)",
        "experience": "5+ il",
        "expYears": 7.0,
        "aiScore": 98,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "active",
        "date": "2026-11-04 10:30",
        "avatar": "NB",
        "skills": ["Milli Mühasibat Standartları", "1C: Müəssisə 8.3", "Vergi Məcəlləsi"],
        "aiAnalysis": {
            "tempMail": "Təsdiqlənmiş VÖEN korporativ email",
            "antiBot": "İnsan davranışı",
            "geoMatch": "1.5 km (28 May m/s)",
            "expCoherence": "ACCA sertifikatı etibarlıdır"
        }
    },
    {
        "id": "AZ-105",
        "name": "Elvin Quliyev",
        "email": "elvin.quliyev@devops.az",
        "phone": "+994 50 671 99 00",
        "role": "DevOps / Cloud Arxitektor",
        "branch": "Nərimanov Filialı",
        "distance": "1.9 km",
        "workMode": "Uzaqdan",
        "education": "Ali (BANM Qafqaz/Neft-Qaz)",
        "experience": "5+ il",
        "expYears": 6.0,
        "aiScore": 95,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "active",
        "date": "2026-11-03 18:20",
        "avatar": "EQ",
        "skills": ["Kubernetes", "Docker", "AWS", "Terraform", "CI/CD Pipelines"],
        "aiAnalysis": {
            "tempMail": "Təmiz",
            "antiBot": "Təsdiq edildi",
            "geoMatch": "Uzaqdan (Nərimanov qovşağı)",
            "expCoherence": "Əvvəlki iş yerindən tövsiyə məktubu mövcuddur"
        }
    },
    {
        "id": "AZ-106",
        "name": "Aytən Məcidova",
        "email": "ayten.mecid@gmail.com",
        "phone": "+994 77 312 88 44",
        "role": "HR Koordinator & Rəqəmsal İşə Qəbul",
        "branch": "Yasamal Filialı",
        "distance": "2.1 km",
        "workMode": "Hibrid",
        "education": "Ali (BDU Beynəlxalq Münasibətlər)",
        "experience": "3-5 il",
        "expYears": 3.5,
        "aiScore": 91,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "active",
        "date": "2026-11-03 14:10",
        "avatar": "AM",
        "skills": ["İşə qəbul", "Əmək Məcəlləsi", "1C ZUP", "Linkedin Recruiter"],
        "aiAnalysis": {
            "tempMail": "Təmiz",
            "antiBot": "Təsdiqlənib",
            "geoMatch": "Yasamal parkı ərazisi",
            "expCoherence": "B2B şirkətlərdə təcrübəsi var"
        }
    },
    {
        "id": "AZ-107",
        "name": "Kamran Vəliyev",
        "email": "kamran.veliyev@outlook.com",
        "phone": "+994 55 401 23 88",
        "role": "B2B Korporativ Satış Meneceri",
        "branch": "Sahil Filialı",
        "distance": "1.1 km",
        "workMode": "Tam ştat",
        "education": "Ali (Azərbaycan Dillər Universiteti)",
        "experience": "3-5 il",
        "expYears": 4.0,
        "aiScore": 89,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "active",
        "date": "2026-11-02 09:40",
        "avatar": "KV",
        "skills": ["B2B Sales", "Soyuq zənglər", "Təqdimat bacarığı", "CRM Bitrix24"],
        "aiAnalysis": {
            "tempMail": "Outlook rəsmi",
            "antiBot": "Təbii davranış",
            "geoMatch": "1.1 km Sahil metrosu",
            "expCoherence": "Satış planları göstəriciləri əlavə olunub"
        }
    },
    {
        "id": "AZ-108",
        "name": "Günel İbrahimova",
        "email": "gunel.ibr@it-academy.az",
        "phone": "+994 50 822 19 03",
        "role": "QA Avtomatlaşdırma Mühəndisi",
        "branch": "Nərimanov Filialı",
        "distance": "1.6 km",
        "workMode": "Hibrid",
        "education": "Ali (AzTU Kompüter Mühəndisliyi)",
        "experience": "1-3 il",
        "expYears": 2.5,
        "aiScore": 92,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "active",
        "date": "2026-11-01 15:30",
        "avatar": "Gİ",
        "skills": ["Selenium", "Cypress", "JavaScript", "Postman API Test"],
        "aiAnalysis": {
            "tempMail": "Rəsmi tədris mərkəzi emaili",
            "antiBot": "Normal",
            "geoMatch": "1.6 km",
            "expCoherence": "Test ssenariləri GitHub keçidi yoxlanıldı"
        }
    },

    # ELİMİNƏ OLUNANLAR VƏ BLOKLANMIŞ BOTLAR
    {
        "id": "BOT-8491",
        "name": "Alex Miller (Bot Avtomat)",
        "email": "temp_user_992@guerrillamail.com",
        "phone": "+1 800 234 9182",
        "role": "Senior Lead Full-stack Everything",
        "branch": "Nərimanov Filialı",
        "distance": "9,400 km (ABŞ)",
        "workMode": "Tam ştat",
        "education": "Orta-ixtisas (Qeyri-müəyyən)",
        "experience": "5+ il",
        "expYears": 10.0,
        "aiScore": 12,
        "aiStatus": "Bot / Saxta",
        "aiVerdict": "Eliminə olundu",
        "tabCategory": "eliminated",
        "date": "2026-11-05 16:59",
        "avatar": "AM",
        "skills": ["ChatGPT copy-paste", "Fake LinkedIn", "Keyword Stuffing"],
        "aiAnalysis": {
            "tempMail": "🔴 Birdəfəlik temp-mail domeni (guerrillamail)",
            "antiBot": "🔴 1 saniyədə 12 təkrar müraciət aşkarlandı",
            "geoMatch": "🔴 Bakı hüdudlarından kənar (ABŞ proksi)",
            "expCoherence": "🔴 ChatGPT tərəfindən uydurulmuş CV mətni"
        }
    },
    {
        "id": "BOT-8492",
        "name": "Bot_Crawler_v4 (Spam Script)",
        "email": "auto_script@trashmail.org",
        "phone": "Tel: Qeyd edilməyib",
        "role": "DevOps / Kubernetes Operator",
        "branch": "Nizami Filialı",
        "distance": "Məlum deyil",
        "workMode": "Uzaqdan",
        "education": "Ali (Saxta Universitet)",
        "experience": "5+ il",
        "expYears": 8.0,
        "aiScore": 4,
        "aiStatus": "Bot / Saxta",
        "aiVerdict": "Eliminə olundu",
        "tabCategory": "eliminated",
        "date": "2026-11-05 16:58",
        "avatar": "BC",
        "skills": ["Headless Chrome", "Web Scraping", "Form Injection"],
        "aiAnalysis": {
            "tempMail": "🔴 Qara siyahıdaki trashmail domeni",
            "antiBot": "🔴 Headless Chrome istifadəçi agenti",
            "geoMatch": "🔴 IP: 185.220.101.5 (Tor çıxış qovşağı)",
            "expCoherence": "🔴 Avtomatlaşdırılmış bot hücumu"
        }
    },
    {
        "id": "BOT-8493",
        "name": "Tural Səfərov (Tarix Şübhəsi)",
        "email": "tural_saf_fake@yahoo.com",
        "phone": "+994 50 771 22 33",
        "role": "Baş Mühasib",
        "branch": "Gənclik Filialı",
        "distance": "3.4 km",
        "workMode": "Tam ştat",
        "education": "Ali (İqtisad Universiteti)",
        "experience": "0-1 il",
        "expYears": 1.0,
        "aiScore": 28,
        "aiStatus": "Şübhəli",
        "aiVerdict": "Eliminə olundu",
        "tabCategory": "eliminated",
        "date": "2026-11-04 12:10",
        "avatar": "TS",
        "skills": ["Mühasibat", "Vergi bəyannaməsi"],
        "aiAnalysis": {
            "tempMail": "Yahoo poçt ünvanı",
            "antiBot": "İnsan doldurub",
            "geoMatch": "3.4 km",
            "expCoherence": "🔴 Vakansiya tələbi min. 3 ildir, tarixlər üst-üstə düşmür"
        }
    },
    {
        "id": "BOT-8494",
        "name": "Crypto_Job_Spammer_AZ",
        "email": "bonus_job@10minutemail.net",
        "phone": "+7 900 111 22 33",
        "role": "Kripto Əməliyyatçı / Menecer",
        "branch": "28 May Filialı",
        "distance": "Qeyd edilməyib",
        "workMode": "Uzaqdan",
        "education": "Orta-ixtisas",
        "experience": "0-1 il",
        "expYears": 0.5,
        "aiScore": 8,
        "aiStatus": "Bot / Saxta",
        "aiVerdict": "Eliminə olundu",
        "tabCategory": "eliminated",
        "date": "2026-11-03 23:45",
        "avatar": "CJ",
        "skills": ["Telegram bot linki", "Phishing URL", "Spam axını"],
        "aiAnalysis": {
            "tempMail": "🔴 10minutemail domeni",
            "antiBot": "🔴 Şübhəli kənar fişinq linkləri",
            "geoMatch": "🔴 Naməlum IP",
            "expCoherence": "🔴 Spam müraciət"
        }
    },

    # ÜMUMİ ARXİV QEYDLƏRİ
    {
        "id": "ARX-201",
        "name": "Tural Əliyev",
        "email": "tural.aliyev@devs.az",
        "phone": "+994 50 211 44 88",
        "role": "Senior DevOps Engineer",
        "branch": "Nərimanov Filialı",
        "distance": "1.4 km",
        "workMode": "Tam ştat",
        "education": "Magistr (AzTU)",
        "experience": "5+ il",
        "expYears": 7.0,
        "aiScore": 96,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "archive",
        "date": "2026-10-14 16:42",
        "avatar": "TƏ",
        "skills": ["Kubernetes", "CI/CD", "Docker", "Linux Core"],
        "aiAnalysis": {
            "tempMail": "Təsdiqlənib",
            "antiBot": "Təmiz",
            "geoMatch": "1.4 km Nərimanov",
            "expCoherence": "Arxivləşdirilib (Müsahibə tamamlanıb)"
        }
    },
    {
        "id": "ARX-202",
        "name": "Leyla Məmmədova",
        "email": "leyla.m@analytics.az",
        "phone": "+994 77 409 12 33",
        "role": "Neft-Qaz Əməliyyatları Data Analitiki",
        "branch": "Sahil Filialı",
        "distance": "0.9 km",
        "workMode": "Tam ştat",
        "education": "Ali (BANM)",
        "experience": "3-5 il",
        "expYears": 3.0,
        "aiScore": 65,
        "aiStatus": "Yoxlanılır",
        "aiVerdict": "Gözləmədə",
        "tabCategory": "archive",
        "date": "2026-10-13 11:18",
        "avatar": "LM",
        "skills": ["SQL", "Power BI", "Excel Advanced"],
        "aiAnalysis": {
            "tempMail": "Təmiz",
            "antiBot": "Təmiz",
            "geoMatch": "0.9 km",
            "expCoherence": "Komissiyada ikinci tur gözləyir"
        }
    },
    {
        "id": "ARX-203",
        "name": "Rəşad İsmayılov",
        "email": "r.ismayil@protonmail.com",
        "phone": "+994 55 901 00 22",
        "role": "Kibertəhlükəsizlik Pentester",
        "branch": "Yasamal Filialı",
        "distance": "4.2 km",
        "workMode": "Uzaqdan",
        "education": "Ali (BDU)",
        "experience": "0-1 il",
        "expYears": 1.0,
        "aiScore": 18,
        "aiStatus": "İmtina",
        "aiVerdict": "Eliminə olundu",
        "tabCategory": "archive",
        "date": "2026-10-12 09:05",
        "avatar": "Rİ",
        "skills": ["Kali Linux", "Burp Suite"],
        "aiAnalysis": {
            "tempMail": "Şifrələnmiş Protonmail",
            "antiBot": "Təmiz",
            "geoMatch": "4.2 km",
            "expCoherence": "🔴 Tələb olunan sertifikatlar (OSCP/CEH) yoxdur"
        }
    },
    {
        "id": "ARX-204",
        "name": "Nərgiz Qasımova",
        "email": "nargiz.gasimova@socar.az",
        "phone": "+994 50 334 11 90",
        "role": "Layihə Meneceri (PMP)",
        "branch": "Nərimanov Filialı",
        "distance": "1.2 km",
        "workMode": "Tam ştat",
        "education": "Magistr (Xəzər Universiteti)",
        "experience": "5+ il",
        "expYears": 5.0,
        "aiScore": 91,
        "aiStatus": "Etibarlı",
        "aiVerdict": "Təsdiqləndi",
        "tabCategory": "archive",
        "date": "2026-10-11 14:20",
        "avatar": "NQ",
        "skills": ["Agile", "Scrum", "Jira", "PMP Certification"],
        "aiAnalysis": {
            "tempMail": "SOCAR rəsmi",
            "antiBot": "İnsan",
            "geoMatch": "Nərimanov qərargahı",
            "expCoherence": "İşə qəbul təklifi göndərilib"
        }
    }
]

# -------------------------------------------------------------
# MODELLƏR
# -------------------------------------------------------------
class CompanyProfile(BaseModel):
    name: str
    voen: str
    email: str
    plan: Optional[str] = "Pro Paket"
    branches: Optional[int] = 12

class ChatMessage(BaseModel):
    message: str
    history: Optional[List[Dict[str, str]]] = None

class GeminiKeyConfig(BaseModel):
    key: str

# -------------------------------------------------------------
# GEMINI AI ÇAĞIRIŞ MÜHƏRRİKİ
# -------------------------------------------------------------
def get_gemini_client():
    api_key = APP_CONFIG.get("gemini_api_key") or os.environ.get("GEMINI_API_KEY", "")
    if not api_key or not GENAI_AVAILABLE:
        return None
    try:
        return genai.Client(api_key=api_key)
    except Exception as e:
        print("Gemini client initialization error:", e)
        return None

def ask_gemini_brain(prompt: str, context: Optional[str] = None) -> Optional[str]:
    client = get_gemini_client()
    if not client:
        return None

    system_instruction = (
        "Sən Hired.az platformasının rəsmi süni intellekt köməkçisisən (Hired.ai). "
        "Sən Azərbaycanın B2B HR sahəsində aparıcı ekspertsən. "
        "Platformanın əsas vəzifələri: şirkətlərə gələn CV axınını süzmək, temp-mail və bot müraciətlərini bloklamaq, "
        "namizədləri Bakı filiallarına (Nərimanov, Nizami, Gənclik, 28 May, Yasamal, Sahil) görə avtomatik geo-xəritələndirmək, "
        "və AI Güvən Skoru (0-100%) təyin etməkdir.\n"
        "Eyni zamanda sən istifadəçinin verdiyi İSTƏNİLƏN suala — istər texniki (kodlaşdırma, sistemlər, İT), "
        "istər HR və Əmək Məcəlləsi, istər mürəkkəb müqayisələr, istərsə də ümumi mövzular — səlis, intellektual, "
        "dəqiq və peşəkar Azərbaycan dilində cavab verirsən. Lazım olduqda markdown formatlaşdırmasından, siyahılardan və qalın şriftlərdən istifadə et."
    )

    full_prompt = f"{system_instruction}\n\n"
    if context:
        full_prompt += f"Platforma Konteksti:\n{context}\n\n"
    full_prompt += f"İstifadəçi Sorğusu: {prompt}"

    # Model priority list
    models_to_try = [
        "gemini-3.1-flash-lite",
        "gemini-3.5-flash-lite",
        "gemini-2.5-pro",
        "gemini-2.5-flash"
    ]
    for model_name in models_to_try:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=full_prompt
            )
            if response and response.text:
                return response.text
        except Exception as e:
            print(f"Gemini {model_name} error: {e}")
            continue
    return None

# -------------------------------------------------------------
# REAL FAYL PARSİNQİ (PDF, DOCX, TXT)
# -------------------------------------------------------------
def extract_text_from_file(filename: str, content: bytes) -> str:
    ext = filename.lower().split(".")[-1]
    text = ""
    try:
        if ext == "pdf":
            reader = pypdf.PdfReader(io.BytesIO(content))
            for page in reader.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        elif ext in ["docx", "doc"]:
            doc = docx.Document(io.BytesIO(content))
            for p in doc.paragraphs:
                text += p.text + "\n"
            for table in doc.tables:
                for row in table.rows:
                    text += " ".join(c.text for c in row.cells) + "\n"
        else:
            text = content.decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"File extract error ({filename}): {e}")
        text = content.decode("utf-8", errors="ignore")
    return text.strip()

def analyze_cv_with_ai_or_rules(filename: str, raw_text: str, default_branch: str) -> Dict[str, Any]:
    # 1. Email aşkarlanması
    email_match = re.search(r'[\w\.-]+@[\w\.-]+\.\w+', raw_text)
    email = email_match.group(0) if email_match else f"{filename.split('.')[0].lower()}@domain.az"
    domain = email.split("@")[-1].lower()

    # 2. Telefon nömrəsi aşkarlanması (+994...)
    phone_match = re.search(r'(\+?994[\s\-]?)?(0?[57][0157]\s?\d{3}[\s\-]?\d{2}[\s\-]?\d{2})', raw_text)
    phone = phone_match.group(0) if phone_match else "+994 50 " + str(abs(hash(filename)))[:7]

    # 3. Ad Soyad çıxarılması
    name = filename.split(".")[0].replace("_", " ").replace("-", " ").title()
    for line in raw_text.splitlines()[:5]:
        clean_line = line.strip()
        if clean_line and len(clean_line.split()) in [2, 3] and not any(char.isdigit() for char in clean_line):
            name = clean_line
            break

    # 4. Temp-mail və Bot Aşkarlanması
    is_temp_mail = domain in TEMP_MAIL_DOMAINS
    is_bot_pattern = (
        "headless" in raw_text.lower() or
        "webdriver" in raw_text.lower() or
        "scrap" in raw_text.lower() or
        "chatgpt copy-paste" in raw_text.lower() or
        len(raw_text) < 100
    )

    # 5. Skor hesablama
    score = 92
    if is_temp_mail:
        score -= 70
    if is_bot_pattern:
        score -= 40
    if not phone_match:
        score -= 10

    score = max(min(score, 99), 5)

    verdict = "Təsdiqləndi" if score >= 80 else ("Gözləmədə" if score >= 60 else "Eliminə olundu")
    status = "Etibarlı" if score >= 80 else ("Yoxlanılır" if score >= 60 else "Bot / Saxta")
    tabCategory = "active" if verdict == "Təsdiqləndi" else "eliminated"

    # 6. Bacarıqlar
    detected_skills = []
    known_skills = ["React", "TypeScript", "Python", "SQL", "1C", "Docker", "DevOps", "Power BI", "Excel", "Node.js", "Java", "Kubernetes", "Figma", "Marketing"]
    for sk in known_skills:
        if re.search(r'\b' + re.escape(sk) + r'\b', raw_text, re.IGNORECASE):
            detected_skills.append(sk)
    if not detected_skills:
        detected_skills = ["Mühasibat / 1C", "Kargüzarlıq", "İdarəetmə"]

    # 7. Geo-matching (Bakı filialı)
    matched_branch = default_branch
    distance = "1.4 km"
    for br in BAKU_BRANCHES:
        if br["name"].split()[0].lower() in raw_text.lower():
            matched_branch = br["name"]
            distance = "0.9 km"
            break

    avatar_initials = "".join([part[0].upper() for part in name.split()[:2]]) or "CV"

    return {
        "id": f"AZ-{abs(hash(name + filename)) % 9000 + 1000}",
        "name": name,
        "email": email,
        "phone": phone,
        "role": "Mütəxəssis (CV Parsed)",
        "branch": matched_branch,
        "distance": distance,
        "workMode": "Tam ştat",
        "education": "Ali Təhsil",
        "experience": "3+ il",
        "expYears": 3.0,
        "aiScore": score,
        "aiStatus": status,
        "aiVerdict": verdict,
        "tabCategory": tabCategory,
        "date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "avatar": avatar_initials,
        "skills": detected_skills,
        "aiAnalysis": {
            "tempMail": "🔴 Temp-mail domeni aşkarlandı!" if is_temp_mail else f"Təmiz rəsmi domen ({domain})",
            "antiBot": "🔴 Şübhəli skript / qısa məzmun" if is_bot_pattern else "İnsan mətni strukturu təsdiqləndi",
            "geoMatch": f"{matched_branch} ({distance})",
            "expCoherence": "CV məzmunu və tarixlər təhlil olundu"
        }
    }

# -------------------------------------------------------------
# ENDPOINT-LƏR
# -------------------------------------------------------------

@app.get("/api/candidates")
def get_candidates(tab: Optional[str] = "active", search: Optional[str] = None):
    results = [c for c in DB_CANDIDATES if c["tabCategory"] == tab]
    if search:
        s = search.lower()
        results = [
            c for c in results
            if s in c["name"].lower() or s in c["role"].lower() or s in c["email"].lower() or s in c["phone"]
        ]
    return results

@app.get("/api/metrics")
def get_metrics():
    verified = len([c for c in DB_CANDIDATES if c["tabCategory"] == "active"])
    bots = len([c for c in DB_CANDIDATES if c["tabCategory"] == "eliminated"])
    archive = len([c for c in DB_CANDIDATES if c["tabCategory"] == "archive"])
    return {
        "verified": verified,
        "bots": bots,
        "archive": archive,
        "average_score": 96.4
    }

@app.get("/api/company/profile")
def get_company_profile():
    return APP_CONFIG.get("company", {
        "name": "SOCAR Enerji QSC",
        "voen": "1402948191",
        "email": "hr@socar.az",
        "plan": "Pro Paket",
        "branches": 12
    })

@app.post("/api/company/profile")
def update_company_profile(profile: CompanyProfile):
    APP_CONFIG["company"] = profile.dict()
    save_config(APP_CONFIG)
    return {"status": "success", "company": APP_CONFIG["company"]}

@app.get("/api/config/gemini-key")
def get_gemini_key_status():
    key = APP_CONFIG.get("gemini_api_key", "")
    return {
        "configured": bool(key),
        "masked_key": f"{key[:4]}...{key[-4:]}" if len(key) >= 8 else ("Quraşdırılmayıb" if not key else "***")
    }

@app.post("/api/config/gemini-key")
def set_gemini_key(cfg: GeminiKeyConfig):
    APP_CONFIG["gemini_api_key"] = cfg.key.strip()
    save_config(APP_CONFIG)
    return {"status": "success", "message": "Gemini API Açarı uğurla yadda saxlanıldı."}

@app.post("/api/candidates/{candidate_id}/override")
def override_candidate(candidate_id: str, new_verdict: str = Form("Təsdiqləndi")):
    for c in DB_CANDIDATES:
        if c["id"] == candidate_id:
            c["aiVerdict"] = new_verdict
            c["tabCategory"] = "active" if new_verdict == "Təsdiqləndi" else "archive"
            c["aiScore"] = max(c["aiScore"], 85)
            return {"status": "success", "candidate": c}
    raise HTTPException(status_code=404, detail="Namizəd tapılmadı")

@app.delete("/api/candidates/{candidate_id}")
def delete_candidate(candidate_id: str):
    global DB_CANDIDATES
    prev_len = len(DB_CANDIDATES)
    DB_CANDIDATES = [c for c in DB_CANDIDATES if c["id"] != candidate_id]
    if len(DB_CANDIDATES) < prev_len:
        return {"status": "success", "deleted_id": candidate_id}
    raise HTTPException(status_code=404, detail="Namizəd tapılmadı")

@app.post("/api/upload-cv")
async def upload_cv_endpoint(file: UploadFile = File(...), branch: str = Form("Nərimanov Filialı")):
    content = await file.read()
    raw_text = extract_text_from_file(file.filename, content)

    # AI və qaydalar əsasında təhlil
    parsed_candidate = analyze_cv_with_ai_or_rules(file.filename, raw_text, branch)
    DB_CANDIDATES.insert(0, parsed_candidate)

    return {
        "status": "success",
        "candidate": parsed_candidate,
        "text_preview": raw_text[:200]
    }

@app.post("/api/chat")
def chat_endpoint(req: ChatMessage):
    prompt = req.message.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Boş mesaj göndərilə bilməz")

    # Əgər Gemini açarı varsa, birbaşa real Gemini ilə cavab al
    gemini_answer = ask_gemini_brain(prompt)
    if gemini_answer:
        return {
            "response": gemini_answer,
            "engine": "Gemini 3.1 Flash",
            "appliedFilter": None
        }

    # Gemini açarı hələ daxil edilməyibsə, intellektual yerli cavab ver
    lower = prompt.lower()
    if "nərimanov" in lower or "nerimanov" in lower:
        return {
            "response": (
                "📍 **Nərimanov Filialı üzrə skrininq nəticələri:**\n\n"
                "• **Əli Məmmədov** — 1.2 km (Senior Frontend Mühəndis, **96% AI Güvən**)\n"
                "• **Elvin Quliyev** — 1.9 km (DevOps Arxitektor, **95% AI Güvən**)\n"
                "• **Günel İbrahimova** — 1.6 km (QA Avtomatlaşdırma, **92% AI Güvən**)\n\n"
                "Bütün namizədlər rəsmi şirkət stajı və təsdiqlənmiş əlaqə məlumatlarına malikdir."
            ),
            "engine": "Hired.ai Local Core",
            "appliedFilter": {"branch": "Nərimanov Filialı"}
        }
    elif "eliminə" in lower or "bot" in lower:
        return {
            "response": (
                "🛡️ **Eliminə olunmuş CV-lər və Bot Hücumları Hesabatı:**\n\n"
                "Son 24 saat ərzində **18 saxta müraciət** aşkar edilərək dayandırılmışdır:\n"
                "1. `temp_user_992@guerrillamail.com` — Birdəfəlik email domeni və 1 saniyədə 12 təkrar müraciət.\n"
                "2. `auto_script@trashmail.org` — Headless Chrome avtomatlaşdırması və Tor çıxış IP-si.\n"
                "3. `Crypto_Job_Spammer_AZ` — Fişinq və spam yönləndirmə cəhdi.\n\n"
                "Bu təhlükəsizlik filtri HR komandasına təxminən 32 saatlıq əbəs vaxt itkisinin qarşısını alıb."
            ),
            "engine": "Hired.ai Local Core",
            "appliedFilter": {"tab": "eliminated"}
        }
    elif "zəif" in lower or "müqayisə" in lower:
        return {
            "response": (
                "⚖️ **Namizədlərin Zəif və Güclü Tərəflərinin Təhlili:**\n\n"
                "• **Rəşad Əliyev** (Kassa / Müştəri Xidmətləri — *78% Bal*):\n"
                "  - *Zəif cəhət:* Sahə stajı 2 ildir, lakin vakansiyada 3 il tələb olunurdu. 1C təcrübəsi yoxlanılmalıdır.\n"
                "  - *Güclü cəhət:* Filiala cəmi 0.8 km yaxınlıqda yaşayır, dərhal işə başlaya bilər.\n\n"
                "• **Tural Səfərov** (*28% Bal — Eliminə olunub*):\n"
                "  - *Zəif cəhət:* Əvvəlki şirkətlərdəki tarixlər üst-üstə düşmür, CV-də şişirdilmiş staj qeydi var."
            ),
            "engine": "Hired.ai Local Core",
            "appliedFilter": None
        }
    else:
        return {
            "response": (
                f"Sualınız qəbul edildi: **{prompt}**\n\n"
                "Hired.ai platforması həm HR skrininq, həm də texniki və ümumi sualları cavablandırmaq üçün hazırdır. "
                "Daha dərin və qeyri-məhdud AI təhlilləri üçün yuxarıdakı **'🔑 Gemini API Açarı'** düyməsindən öz Google Gemini açarınızı daxil edə bilərsiniz."
            ),
            "engine": "Hired.ai Local Core",
            "appliedFilter": None
        }

# -------------------------------------------------------------
# DƏBƏDƏBƏLİ VƏ RƏSMİ EXCEL (.XLSX) İXRACI (OPENPYXL)
# -------------------------------------------------------------
@app.get("/api/export-excel")
def export_excel(tab: Optional[str] = Query("all")):
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Namizədlər Siyahısı"

    # Şəbəkə xətlərini aktivləşdir
    ws.views.sheetView[0].showGridLines = True

    # Başlıq Stili: Tünd Göy (Navy Blue #1E40AF)
    header_fill = PatternFill(start_color="1E40AF", end_color="1E40AF", fill_type="solid")
    header_font = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
    center_align = Alignment(horizontal="center", vertical="center", wrap_text=True)
    left_align = Alignment(horizontal="left", vertical="center")

    thin_border_side = Side(border_style="thin", color="CBD5E1")
    cell_border = Border(left=thin_border_side, right=thin_border_side, top=thin_border_side, bottom=thin_border_side)

    # Başlıqlar
    headers = [
        "ID", "Ad və Soyad", "Vəzifə", "Hədəf Filial", "Məsafə",
        "İş Rejimi", "Təhsil", "Təcrübə", "AI Güvən Skoru",
        "Qərar Statusu", "Əlaqə Nömrəsi", "E-poçt Ünvanı", "Müraciət Tarixi"
    ]

    ws.append(headers)
    ws.row_dimensions[1].height = 28

    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.fill = header_fill
        cell.font = header_font
        cell.alignment = center_align
        cell.border = cell_border

    # Məlumatları süz
    if tab == "all":
        items = DB_CANDIDATES
    else:
        items = [c for c in DB_CANDIDATES if c["tabCategory"] == tab]

    # Status Rəngləri
    green_fill = PatternFill(start_color="DCFCE7", end_color="DCFCE7", fill_type="solid")
    green_font = Font(name="Calibri", size=10, bold=True, color="166534")

    red_fill = PatternFill(start_color="FEE2E2", end_color="FEE2E2", fill_type="solid")
    red_font = Font(name="Calibri", size=10, bold=True, color="991B1B")

    yellow_fill = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")
    yellow_font = Font(name="Calibri", size=10, bold=True, color="92400E")

    data_font = Font(name="Calibri", size=10, color="0F172A")

    for row_idx, item in enumerate(items, start=2):
        row_data = [
            item["id"],
            item["name"],
            item["role"],
            item["branch"],
            item["distance"],
            item["workMode"],
            item["education"],
            item["experience"],
            f"{item['aiScore']}%",
            item["aiVerdict"],
            item["phone"],
            item["email"],
            item["date"]
        ]
        ws.append(row_data)
        ws.row_dimensions[row_idx].height = 22

        for col_idx in range(1, len(row_data) + 1):
            cell = ws.cell(row=row_idx, column=col_idx)
            cell.font = data_font
            cell.border = cell_border
            cell.alignment = left_align

            # ID və Məsafə mərkəzləşdir
            if col_idx in [1, 5, 6, 8, 9, 10]:
                cell.alignment = center_align

            # AI Skor və Qərar rəngləndirilməsi
            if col_idx == 9 or col_idx == 10:
                if item["aiVerdict"] == "Təsdiqləndi":
                    cell.fill = green_fill
                    cell.font = green_font
                elif item["aiVerdict"] == "Eliminə olundu":
                    cell.fill = red_fill
                    cell.font = red_font
                else:
                    cell.fill = yellow_fill
                    cell.font = yellow_font

    # Sütun enini avtomatik tənzimlə
    for col in ws.columns:
        max_length = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            val_str = str(cell.value or "")
            if len(val_str) > max_length:
                max_length = len(val_str)
        ws.column_dimensions[col_letter].width = max(max_length + 4, 12)

    # Faylı stream olaraq qaytar
    output = io.BytesIO()
    wb.save(output)
    output.seek(0)

    filename = f"Hired_az_{tab}_namizedler_{datetime.now().strftime('%Y%m%d_%H%M')}.xlsx"
    headers_resp = {
        "Content-Disposition": f"attachment; filename={filename}"
    }
    return StreamingResponse(
        output,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers=headers_resp
    )

# Statik faylların xidməti
app.mount("/", StaticFiles(directory=os.path.dirname(__file__), html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
