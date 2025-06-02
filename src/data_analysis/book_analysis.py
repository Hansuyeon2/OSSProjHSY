import os
import sys
import django
import json
import time
import requests

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
sys.path.append(BACKEND_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()

from app.models import Book
from ai.sentiment_analysis import sentiment


KDC_PREFIX = "8"  
SAVE_PATH = "books_raw_data.json"

def book_data(page_no):
    url = "https://www.nl.go.kr/seoji/SearchApi.do"
    params = {
        "cert_key": "4d1db8b0e410e0fe98e773ce325984228932421bc80cc94fe9091e1421501606",
        "result_style": "json",
        "page_no": page_no,
        "page_size": 100,
    }

    try:
        response = requests.get(url, params=params, timeout=10)
        response.raise_for_status()
        data = response.json()
        return data.get("docs", [])
    except Exception as e:
        print(f"[ERROR] Page {page_no}: {e}")
        return []


def fetch_all_literature_books(max_pages=1000):
    all_books = []
    for page in range(1, max_pages + 1):
        books = book_data(page)
        if not books:
            break

        literature_books = [
            book for book in books if book.get("KDC", "").startswith(KDC_PREFIX)
        ]

        all_books.extend(literature_books)
        print(f"[INFO] Page {page}: 수집된 문학 도서 {len(literature_books)}권")
        time.sleep(0.2)

    with open(SAVE_PATH, "w", encoding="utf-8") as f:
        json.dump(all_books, f, ensure_ascii=False, indent=2)
    print(f"[COMPLETE] 총 {len(all_books)}권 저장 완료 → {SAVE_PATH}")


def book_analysis():
    existing_books = set(Book.objects.values_list("title", "auth"))
    page = 1
    total_saved = 0

    while True:
        books = book_data(page)
        if not books:
            break

        for book in books:
            title = book.get("TITLE")
            auth = book.get("AUTHOR") or "미상"
            description = book.get("BOOK_SUMMARY")

            if not title or not description or (title, auth) in existing_books:
                continue

            result = sentiment(description)

            if result.get("status") == "success" and result.get("main_emotion"):
                Book.objects.create(
                    title=title,
                    auth=auth,
                    main_emotion=result["main_emotion"],
                    sub_emotions=result.get("sub_emotion", []),
                )
                print(f"[SAVED] {title} / {result['main_emotion']}")
                total_saved += 1

        page += 1

    print(f"[COMPLETE] 총 {total_saved}건의 도서 감정 분석 및 저장 완료.")


if __name__ == "__main__":
    mode = sys.argv[1] if len(sys.argv) > 1 else "analyze"

    if mode == "fetch":
        fetch_all_literature_books()
    elif mode == "analyze":
        book_analysis()
    else:
        print("[ERROR] 잘못된 모드입니다. 'fetch' 또는 'analyze'를 입력하세요.")
