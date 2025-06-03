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

from app.models import Movie

# 1. 기존 데이터 삭제
Movie.objects.all().delete()
print("기존 Movie 데이터 삭제 완료.")

# 2. CSV 로드
df = pd.read_csv("movie_analysis.csv")

count = 0  # 생성 개수 카운터

# 3. 데이터 삽입
for _, row in df.iterrows():
    try:
        sub_emotion = row["sub_emotion"]
        if isinstance(sub_emotion, str):
            sub_emotion = ast.literal_eval(sub_emotion)

        Movie.objects.create(
            title=row["영화명"],
            director=row.get("감독", "미상"),
            main_emotion=row.get("main_emotion", "기타"),
            sub_emotion=sub_emotion if isinstance(sub_emotion, list) else []
        )
        count += 1
    except Exception as e:
        print(f"저장 실패: {row.get('영화명')} - {e}")

# 4. 생성 개수 출력
print(f"{count}건의 데이터를 생성했습니다.")
