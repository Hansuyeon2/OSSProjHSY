from transformers import pipeline
import re
from collections import Counter

sentiment_pipeline = pipeline(
    "text-classification",
    model="hun3359/klue-bert-base-sentiment",
    tokenizer="hun3359/klue-bert-base-sentiment",
    return_all_scores=True
)
#긍정감정 하나 추가하면 좋을듯.
emotion_mapping = {
    '기쁨': ['기쁨','감사하는', '신뢰하는', '만족스러운', '흥분', '신이 난', '자신하는','편안한', '느긋', '안도'],
    '당황': ['당황','고립된', '남의 시선을 의식하는', '열등감', '부끄러운', '혼란스러운'],
    '분노': ['분노','툴툴대는', '좌절한', '짜증내는', '방어적인', '악의적인', '안달하는', '구역질 나는', '노여워하는', '성가신'],
    '불안': ['불안','두려운', '스트레스 받는', '취약한', '혼란스러운', '당혹스러운', '회의적인', '걱정스러운', '조심스러운', '초조한'],
    '상처': ['상처', '질투하는', '배신당한', '고립된', '충격 받은', '가난한 불우한', '희생된', '억울한', '괴로워하는', '버려진'],
    '슬픔': ['슬픔', '실망한', '비통한', '후회되는', '우울한', '마비된', '염세적인', '눈물이 나는', '낙담한', '환멸을 느끼는', '외로운', '죄책감의']
}

def find_main_emotion(detail_emotion):
    for main, details in emotion_mapping.items():
        if detail_emotion in details:
            return main
    return "기타"

def split_sentences(text):
    sentences = re.split(r'(?<=[.!?])+', text)
    return [s.strip() for s in sentences if s.strip()]

def sentiment(content, accuracy=0.1):
    sentences = split_sentences(content)
    
    main_emotions = []  #6개감정
    sub_emotions = []   #상세감정
    
    for sentence in sentences:
        result = sentiment_pipeline(sentence)
        print(result)  
        #리스트 중에서 score가 가장 높은 항목
        best_result = max(result[0], key=lambda x: x['score'])
        #감정명
        best_label = best_result['label']
        #점수
        best_score = best_result['score']

        #6개 감정 선별
        main_emotion = find_main_emotion(best_label)
        if best_score >= accuracy:
            main_emotions.append(main_emotion)
        #상세감정
        sub_emotions.append(best_label)
    
    #최빈값 찾기
    result_main_emotions = [e for e in main_emotions if e != "기타"]

    if result_main_emotions:
        emotion_counter = Counter(result_main_emotions)
        most_common = emotion_counter.most_common()

        top_count = most_common[0][1]
        result_emotion = [emotion for emotion, count in most_common if count == top_count]

        if len(result_emotion) == 1:
            most_common_emotion = result_emotion[0]
        else:
            print("Tie")
            best_score = -1
            best_emotion = None
            for sentence in sentences:
                result = sentiment_pipeline(sentence)
                best_result = max(result[0], key=lambda x: x['score'])
                best_label = best_result['label']
                best_score_candidate = best_result['score']
                main_emotion_candidate = find_main_emotion(best_label)

                if main_emotion_candidate in result_emotion and best_score_candidate > best_score:
                    best_score = best_score_candidate
                    best_emotion = main_emotion_candidate

            most_common_emotion = best_emotion                                
    else:
        return {
            'status': 'success',
            'main_emotion': '기타',
    }

    return {
        'status': 'success',
        'main_emotion': most_common_emotion,
    }
