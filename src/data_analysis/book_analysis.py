import pandas as pd
import django
import os
import sys
import ast


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
sys.path.append(BACKEND_DIR)
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "project.settings")
django.setup()

from app.models import Book 


df = pd.read_csv("book_analysis.csv")


for _, row in df.iterrows():
    try:
        sub_emotion = row["sub_emotion"]
        if isinstance(sub_emotion, str):
            sub_emotion = ast.literal_eval(sub_emotion)

        Book.objects.create(
            title=row["TITLE_NM"],
            auth=row.get("AUTHR_NM", "미상"),
            main_emotion=row.get("main_emotion", "기타"),
            sub_emotion=sub_emotion if isinstance(sub_emotion, list) else []
        )
    except Exception as e:
        print(f"저장 실패: {row.get('TITLE_NM')} - {e}")

