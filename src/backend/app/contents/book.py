import requests, random
from app.models import Book
from ai.sentiment_analysis import sentiment

overcome_emotion_map = {
    "고립된": ["기쁨", "신뢰하는", "만족스러운"],
    "열등감": ["자신하는", "감사하는", "기쁨"],
    "부끄러운": ["신뢰하는", "안도", "자신하는"],
    "가난한 불우한": ["감사하는", "만족스러운", "기쁨"],
    "슬픔": ["기쁨", "편안한", "감사하는"],
    "실망한": ["신뢰하는", "기쁨", "만족스러운"],
    "비통한": ["감사하는", "안도", "기쁨"],
    "후회되는": ["자신하는", "신뢰하는", "만족스러운"],
    "우울한": ["기쁨", "만족스러운", "감사하는"],
    "마비된": ["신이 난", "흥분", "자신하는"],
    "염세적인": ["기쁨", "신뢰하는", "안도"],
    "눈물이 나는": ["기쁨", "감사하는", "편안한"],
    "낙담한": ["자신하는", "신뢰하는", "감사하는"],
    "환멸을 느끼는": ["신뢰하는", "기쁨", "만족스러운"],
    "외로운": ["신뢰하는", "감사하는", "기쁨"],
    "죄책감의": ["감사하는", "편안한", "기쁨"],
    "상처": ["기쁨", "신뢰하는", "감사하는"],
    "분노": ["편안한", "감사하는", "만족스러운"],
    "툴툴대는": ["신뢰하는", "안도", "기쁨"],
    "좌절한": ["자신하는", "기쁨", "만족스러운"],
    "짜증내는": ["안도", "편안한", "신이 난"],
    "방어적인": ["신뢰하는", "감사하는", "안도"],
    "악의적인": ["감사하는", "기쁨", "신뢰하는"],
    "안달하는": ["편안한", "만족스러운", "신뢰하는"],
    "구역질 나는": ["감사하는", "편안한", "기쁨"],
    "노여워하는": ["안도", "신뢰하는", "만족스러운"],
    "성가신": ["감사하는", "안도", "기쁨"],
    "질투하는": ["자신하는", "감사하는", "신뢰하는"],
    "배신당한": ["신뢰하는", "감사하는", "편안한"],
    "억울한": ["기쁨", "자신하는", "감사하는"],
    "괴로워하는": ["신뢰하는", "기쁨", "편안한"],
    "불안": ["안도", "편안한", "신뢰하는"],
    "두려운": ["감사하는", "편안한", "신뢰하는"],
    "스트레스 받는": ["기쁨", "신이 난", "흥분"],
    "취약한": ["신뢰하는", "감사하는", "기쁨"],
    "혼란스러운": ["안도", "편안한", "신뢰하는"],
    "당혹스러운": ["안도", "신뢰하는", "감사하는"],
    "회의적인": ["신뢰하는", "만족스러운", "감사하는"],
    "걱정스러운": ["기쁨", "안도", "편안한"],
    "조심스러운": ["신뢰하는", "감사하는", "기쁨"],
    "초조한": ["편안한", "신뢰하는", "기쁨"],
    "희생된": ["감사하는", "신뢰하는", "기쁨"],
    "버려진": ["신뢰하는", "감사하는", "기쁨"],
    "남의 시선을 의식하는": ["자신하는", "감사하는", "신뢰하는"]
}

def recommend_books(sub_emotion: list, recommend_type: str = "maintain"):
    matched_books = []

    for book in Book.objects.all():
        if not isinstance(book.sub_emotion, list):
            continue

        if recommend_type == "maintain":
            if any(sub in book.sub_emotion for sub in sub_emotion):
                matched_books.append(book)
        elif recommend_type == "overcome":
            alt_emotions = []
            for sub in sub_emotion:
                alt_emotions.extend(overcome_emotion_map.get(sub, []))
            if any(emotion in book.sub_emotion for emotion in alt_emotions):
                matched_books.append(book)

    if not matched_books:
        return []

    sampled_books = random.sample(matched_books, min(10, len(matched_books)))

    return [
        {
            "title": book.title,
            "sub": book.auth,
        }
        for book in sampled_books
    ]