from transformers import pipeline
import re
from collections import Counter, defaultdict


sentiment_pipeline = pipeline(
    "text-classification",
    model="hun3359/klue-bert-base-sentiment",
    tokenizer="hun3359/klue-bert-base-sentiment",
    return_all_scores=True
)

emotion_mapping = {
    '행복': ['기쁨', '감사하는', '신뢰하는', '만족스러운', '흥분', '신이 난', '자신하는'],
    '놀람': ['당황', '고립된(당황한)', '남의 시선을 의식하는', '열등감', '부끄러운', '혼란스러운(당황한)'],
    '화남': ['분노', '툴툴대는', '좌절한', '짜증내는', '방어적인', '악의적인', '안달하는', '구역질 나는', '노여워하는', '성가신', '질투하는', '억울한', '혐오스러운', '한심한'],
    '평온': ['편안한', '느긋', '안도'],
    '우울함': ['슬픔', '실망한', '비통한', '후회되는', '우울한', '마비된', '염세적인','눈물이 나는', '낙담한', '환멸을 느끼는', '상처', '배신당한', '고립된', '충격 받은', '가난한 불우한', '희생된', '괴로워하는', '버려진', '외로운', '죄책감의'],
    '두려움': ['불안', '두려운', '스트레스 받는', '취약한', '혼란스러운', '당혹스러운','회의적인', '걱정스러운', '조심스러운', '초조한']
}

def find_main_emotion(detail_emotion):
    for main, details in emotion_mapping.items():
        if detail_emotion in details:
            return main
    return "기타"

def split_sentences(text):
    sentences = re.split(r'(?<=[.!?])+', text)
    return [s.strip() for s in sentences if s.strip()]

def sentiment(content, accuracy=0.2):
    sentences = split_sentences(content)
    
    main_emotions = []  # 6개 감정
    sub_emotions = []   # 상세 감정

    for sentence in sentences:
        result = sentiment_pipeline(sentence)
        best_result = max(result[0], key=lambda x: x['score'])
        best_label = best_result['label']
        best_score = best_result['score']

        sub_emotions.append(best_label)

        if best_score >= accuracy:
            main_emotion = find_main_emotion(best_label)
            if main_emotion != "기타":
                main_emotions.append(main_emotion)

    if not main_emotions:
        return {
            'status': 'success',
            'main_emotion': '기타',
            'sub_emotion': sub_emotions,
        }

    emotion_count = defaultdict(int)
    emotion_last_index = {}

    for idx, emo in enumerate(main_emotions):
        emotion_count[emo] += 1
        emotion_last_index[emo] = idx  

    sorted_emotions = sorted(
        emotion_count.items(),
        key=lambda x: (-x[1], -emotion_last_index[x[0]])  
    )

    most_common_emotion = sorted_emotions[0][0]

    return {
        'status': 'success',
        'main_emotion': most_common_emotion,
        'sub_emotion': sub_emotions,
    }


if __name__ == "__main__":
    print("감정 분석을 시작합니다. 종료하려면 'exit'을 입력하세요.\n")

    while True:
        test_text = input("일기 내용을 입력하세요:\n> ")

        if test_text.lower() == "exit":
            print("감정 분석을 종료합니다.")
            break

        result = sentiment(test_text)

        print("\n[감정 분석 결과]")
        print(f"대표 감정 (main_emotion): {result['main_emotion']}")
        print(f"세부 감정들 (sub_emotion): {', '.join(result['sub_emotion'])}")
        print("\n---\n")
