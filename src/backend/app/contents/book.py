import requests
import pandas as pd
from sentiment_analysis import sentiment

# 1. 책 요약 + 제목 + 저자 가져오기
def get_book_info(api_key, isbn):
    url = "https://www.nl.go.kr/NL/search/openApi/search.do"
    params = {
        "key": api_key,
        "apiType": "json",
        "srchTarget": "total",
        "kwd": isbn,
    }
    response = requests.get(url, params=params)
    response.raise_for_status()
    data = response.json()

    try:
        first_doc = data['response']['docs'][0]
        title = first_doc.get('titleInfo', '')
        author = first_doc.get('authorInfo', '')
        summary = first_doc.get('description', '')
        return {
            "title": title,
            "author": author,
            "summary": summary
        }
    except (KeyError, IndexError):
        return None

# 2. 여러 ISBN 처리
def analyze_books(api_key, isbn_list, output_csv='book_emotions_with_title_author.csv'):
    results = []

    for isbn in isbn_list:
        print(f"분석 중... ISBN: {isbn}")
        info = get_book_info(api_key, isbn)
        
        if info and info['summary']:
            analysis = sentiment(info['summary'])
            results.append({
                'ISBN': isbn,
                'Title': info.get('title', 'Unknown'),
                'Author': info.get('author', 'Unknown'),
                'Main Emotion': analysis.get('main_emotion', 'Unknown'),
                'Sub Emotions': ', '.join(analysis.get('sub_emotion', []))
            })
        else:
            results.append({
                'ISBN': isbn,
                'Title': info.get('title', 'Unknown') if info else 'Unknown',
                'Author': info.get('author', 'Unknown') if info else 'Unknown',
                'Main Emotion': 'No Summary',
                'Sub Emotions': ''
            })
    
    df = pd.DataFrame(results)
    df.to_csv(output_csv, index=False, encoding='utf-8-sig')
    print(f"CSV 저장 완료: {output_csv}")

api_key = "너의_API_KEY"  # 네 오픈API 인증키 입력
isbn_list = [
    "9788956055464",  # 예시 ISBN들
    "9788972756194",
    "9788936434267",
]

analyze_books(api_key, isbn_list)
