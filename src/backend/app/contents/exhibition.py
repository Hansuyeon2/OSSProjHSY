from app.models import Exhibition
import random

emotion_to_genres = {
    "행복": {
        "maintain": ["뮤지컬", "대중음악"],
    },
    "우울": {
        "maintain": ["연극", "한국음악(국악)"],
        "overcome": ["뮤지컬", "대중음악"]
    },
    "분노": {
        "maintain": ["연극"],
        "overcome": ["서양음악(클래식)", "한국음악(국악)"]
    },
    "평온": {
        "maintain": ["서양음악(클래식)", "한국음악(국악)"]
    },
    "놀람": {
        "maintain": ["서커스/마술"]
    },
    "두려움": {
    "maintain": ["서커스/마술", "연극"],  
    "overcome": ["서양음악(클래식)", "대중음악"] 
}
}

def recommend_exhibitions(main_emotion, recommend_type="maintain", limit=10):
    genres = emotion_to_genres.get(main_emotion, {}).get(recommend_type, [])
    if not genres:
        return []

    queryset = Exhibition.objects.filter(genre__in=genres)
    exhibitions = list(queryset)
    random.shuffle(exhibitions)  
    sampled = exhibitions[:limit]

    return [
        {
            "title": exhibition.title,
            "sub": exhibition.location  
        }
        for exhibition in sampled
    ]
