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

from app.models import Exhibition 


df = pd.read_csv("exhibition_analysis.csv")


for _, row in df.iterrows():
    try:
        Exhibition.objects.create(
            title=row["공연명"],
            location=row.get("공연시설", "-"),
            genre=row.get("장르", "기타"),
        )
    except Exception as e:
        print(f"저장 실패: {row.get('공연명')} - {e}")

