import os
import sys
import django
import requests
import time
import json

# Django 설정
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
sys.path.append(BACKEND_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()

# Django 모델 및 감정 분석 불러오기
from app.models import Movie
from ai.sentiment_analysis import sentiment

# API 키 가져오기
API_KEY = os.getenv("KMDB_API_KEY")
SAVE_PATH = "movies_raw_data.json"

def fetch_movies_by_page(page=1):
    url = "https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp"
    params = {
        "collection": "kmdb_new",
        "detail": "Y",
        "ServiceKey": API_KEY,
        "listCount": 100,
        "startCount": (page - 1) * 100 + 1,
        "sort": "prodYear,1",
        "releaseDts": "20230101"  
    }

    try:
        response = requests.get(url, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()

        if "Data" in data and len(data["Data"]) > 0:
            return data["Data"][0].get("Result", [])
        else:
            print(f"[WARNING] Page {page}: Data가 비어 있음")
            return []
    except Exception as e:
        print(f"[ERROR] Page {page}: {e}")
        return []

def fetch_all_movies(max_pages=30):
    all_movies = []
    for page in range(1, max_pages + 1):
        movies = fetch_movies_by_page(page)
        if not movies:
            break
        all_movies.extend(movies)
        print(f"[INFO] Page {page}: 수집된 영화 {len(movies)}편")
        time.sleep(0.3)

    with open(SAVE_PATH, "w", encoding="utf-8") as f:
        json.dump(all_movies, f, ensure_ascii=False, indent=2)
    print(f"[COMPLETE] 총 {len(all_movies)}편 저장 완료 → {SAVE_PATH}")

def analyze_and_save_movies():
    existing = set(Movie.objects.values_list("title", "director"))
    page = 1
    total_saved = 0

    while True:
        movies = fetch_movies_by_page(page)
        if not movies:
            break

        for m in movies:
            title = m.get("title", "").replace("<b>", "").replace("</b>", "").strip()
            director_list = m.get("directors", {}).get("director", [])
            director = director_list[0].get("directorNm", "미상") if director_list else "미상"
            plot = m.get("plots", {}).get("plot", [{}])[0].get("plotText", "").strip()

            if not title or not plot or (title, director) in existing:
                continue

            result = sentiment(plot)

            if result.get("status") == "success" and result.get("main_emotion"):
                Movie.objects.create(
                    title=title,
                    director=director,
                    plot=plot,
                    main_emotion=result["main_emotion"],
                    sub_emotions=result.get("sub_emotion", [])
                )
                print(f"[SAVED] {title} / {result['main_emotion']}")
                total_saved += 1

        page += 1

    print(f"[COMPLETE] 총 {total_saved}편의 영화 감정 분석 및 저장 완료.")

if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "analyze"

    if mode == "fetch":
        fetch_all_movies()
    elif mode == "analyze":
        analyze_and_save_movies()
